/**
 * Burn FOLIO section into storefront preview videos (page + fullscreen).
 *
 * Pipeline (storefront demos ONLY — live demo component is untouched):
 *  1) Capture foreground only (cards / titles / chrome) as RGBA PNGs with
 *     transparent background — continuous open/face/close scroll curve.
 *  2) Composite a smoothly looping background film underneath in ffmpeg
 *     (continuous decode — no per-frame seek → no twitchy keyframe jumps).
 *
 * AUTHORITATIVE RUNBOOK (history, QA, tuning, do-not-regress):
 *   docs/prep/MS-SEC-FOLI01-PREVIEW-CAPTURE.md
 *
 * Usage:
 *   node scripts/capture-folio-preview.mjs
 *   node scripts/capture-folio-preview.mjs http://127.0.0.1:3004/demo/cleanroom-folio
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const require = createRequire(import.meta.url);

const URL =
  process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-folio";
const OUT_DIR = path.join(root, "tmp", "folio-preview-frames");
const OUT_VIDEO = path.join(
  root,
  "public",
  "assets",
  "videos",
  "folio-scroll-preview-v1.mp4"
);
const OUT_VIDEO_FS = path.join(
  root,
  "public",
  "assets",
  "videos",
  "folio-scroll-preview-fs-v1.mp4"
);
const OUT_POSTER = path.join(
  root,
  "public",
  "assets",
  "posters",
  "folio-scroll-preview-v1.webp"
);
const OUT_THUMB = path.join(root, "public", "thumbnails", "MS-SEC-FOLI01.webp");

/** Smooth continuous bg film used under the captured foreground */
const BG_SRC = path.join(
  root,
  "public",
  "assets",
  "videos",
  "folio-blurry-v1.mp4"
);

const FPS = 24;
/**
 * Slightly longer so open→face→close has enough frames for continuous flow
 * (no mid-open stall, no mid→gone jump).
 */
const DURATION_S = 18;
const TOTAL_FRAMES = FPS * DURATION_S;
const VIEWPORT = { width: 1440, height: 900 };
const VIEWPORT_FS = { width: 1920, height: 1080 };
const SHEET_COUNT = 5;

/**
 * Warp time-within-sheet → component local progress.
 * MUST be continuous on [0,1] with f(0)=0 and f(1)=1 so sheet handoffs
 * never skip scroll (the old 0.06→0.95 map jumped ~2% of the track each card).
 *
 * Linear pieces only — no smoothstep (stacked ease was the mid-open “pause”).
 * Short face beat; longer close so mid→exit is sampled densely.
 */
function warpLocal(u) {
  // time share within one sheet
  const OPEN_W = 0.36; // intro → face (steady, no stall)
  const FACE_W = 0.12; // brief readable beat only
  const CLOSE_W = 0.52; // face → exit (densest — kills mid→gone jumps)

  // component-local ranges (match rotateX keyframe zones roughly)
  const OPEN_END = 0.36; // ~edge → face-on
  const FACE_END = 0.58; // short upright window
  // close: 0.58 → 1.0

  if (u <= 0) return 0;
  if (u >= 1) return 1;

  if (u < OPEN_W) {
    return (u / OPEN_W) * OPEN_END;
  }
  if (u < OPEN_W + FACE_W) {
    return OPEN_END + ((u - OPEN_W) / FACE_W) * (FACE_END - OPEN_END);
  }
  return FACE_END + ((u - OPEN_W - FACE_W) / CLOSE_W) * (1 - FACE_END);
}

/**
 * Continuous global scroll for storefront burn.
 * Background is composited separately — this only drives card/title motion.
 */
function progressForFrame(i, totalFrames) {
  const t = i / (totalFrames - 1);

  // Keep a visible card at both ends (no blank gap on loop)
  const P_START = 0.022;
  const P_END = 0.96;
  const span = P_END - P_START;

  // Continuous 0 → SHEET_COUNT; warp only *within* each unit so
  // sheet+local never jumps at boundaries (…→ N+1.0 → (N+1)+0.0 →…).
  const sheetF = t * SHEET_COUNT;
  const sheet = Math.min(SHEET_COUNT - 1, Math.floor(sheetF));
  const local = Math.min(1, Math.max(0, sheetF - sheet));
  const localMapped = warpLocal(local);

  const p = P_START + ((sheet + localMapped) / SHEET_COUNT) * span;
  return Math.min(P_END, Math.max(P_START, p));
}

const ffmpeg =
  process.env.FFMPEG_PATH ||
  (() => {
    try {
      return require("ffmpeg-static");
    } catch {
      return path.join(root, "node_modules", "ffmpeg-static", "ffmpeg.exe");
    }
  })();

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function cleanDir(d) {
  if (fs.existsSync(d)) fs.rmSync(d, { recursive: true, force: true });
  ensureDir(d);
}

function runFfmpeg(args) {
  const r = spawnSync(ffmpeg, args, { encoding: "utf8" });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error(`ffmpeg failed: ${args.slice(0, 8).join(" ")}…`);
  }
  return r;
}

/**
 * Capture CSS: kill host chrome + hide motion bg + make page transparent
 * so Playwright can write true RGBA foreground plates.
 * Glass fill is slightly denser (capture-only) so cards stay readable without
 * live backdrop-filter sampling of the video.
 */
const CAPTURE_CSS = `
  html, body, #__next, [data-overlay-container],
  body > div, main, .min-h-screen {
    background: transparent !important;
    background-color: transparent !important;
  }
  body > div > header,
  [data-site-header],
  nav[class*="Header"],
  header:not(.folio-header):not(.folio-sheet-head),
  footer:not(.folio-footer),
  [data-site-footer] {
    display: none !important;
  }
  .folio-header,
  .folio-sheet-head {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
  }
  .folio-hint { opacity: 0.35 !important; }

  /* Transparent stage — FG only */
  .folio-root,
  .folio-stage,
  .folio-stage-inner,
  .folio-bg,
  .folio-deck {
    background: transparent !important;
    background-color: transparent !important;
  }
  .folio-bg-video,
  .folio-bg-fallback {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  /* Soft veil stays as alpha darken so type remains legible over composited film */
  .folio-bg-veil {
    background:
      radial-gradient(
        ellipse 70% 60% at 50% 45%,
        rgba(8, 10, 16, 0.12) 0%,
        rgba(8, 10, 16, 0.38) 100%
      ),
      linear-gradient(
        180deg,
        rgba(8, 10, 16, 0.28) 0%,
        rgba(8, 10, 16, 0.14) 40%,
        rgba(8, 10, 16, 0.42) 100%
      ) !important;
  }
  /* Capture-only glass density — approximates live look without bg blur sample */
  .folio-lg-fill {
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    background: linear-gradient(
      155deg,
      rgba(30, 34, 52, 0.78) 0%,
      rgba(16, 18, 30, 0.82) 42%,
      rgba(22, 28, 48, 0.76) 100%
    ) !important;
  }
`;

/**
 * Composite continuous bg film under RGBA foreground sequence.
 * Bg is decoded/looped smoothly by ffmpeg — never seek-scrubbed in the browser.
 */
function encodeComposite(framesDir, outVideo, width, height, frameCount) {
  if (!fs.existsSync(BG_SRC)) {
    throw new Error(`Background source missing: ${BG_SRC}`);
  }
  const pattern = path.join(framesDir, "frame-%05d.png");
  const filter = [
    // Smooth continuous bg: loop source, scale/crop to viewport, lock fps
    `[0:v]scale=${width}:${height}:force_original_aspect_ratio=increase,` +
      `crop=${width}:${height},setsar=1,fps=${FPS},format=yuv420p,setpts=PTS-STARTPTS[bg]`,
    // Foreground RGBA plate sequence
    `[1:v]fps=${FPS},format=rgba,setpts=PTS-STARTPTS[fg]`,
    // Overlay FG on smooth BG; cut to exact frame count via -frames:v
    `[bg][fg]overlay=0:0:format=auto,format=yuv420p[v]`,
  ].join(";");

  console.log(
    `  compositing smooth BG (${path.basename(BG_SRC)}) under ${frameCount} FG frames → ${path.basename(outVideo)}`
  );

  runFfmpeg([
    "-y",
    // Input 0: looping continuous background (smooth decode)
    "-stream_loop",
    "-1",
    "-i",
    BG_SRC,
    // Input 1: captured foreground plates (cards / titles)
    "-framerate",
    String(FPS),
    "-i",
    pattern,
    "-filter_complex",
    filter,
    "-map",
    "[v]",
    "-frames:v",
    String(frameCount),
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-preset",
    "medium",
    "-crf",
    "20",
    "-movflags",
    "+faststart",
    "-an",
    outVideo,
  ]);
  console.log("Wrote", outVideo);
}

async function captureForeground(viewport, framesDir) {
  cleanDir(framesDir);

  console.log("Launching FG capture…", URL, viewport);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport,
    deviceScaleFactor: 1,
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForSelector(".folio-root", { timeout: 60_000 });
  await page.waitForTimeout(800);

  // Pause/hide any video so it cannot paint into the FG plate
  await page.evaluate(() => {
    document.querySelectorAll("video").forEach((v) => {
      try {
        v.pause();
        v.removeAttribute("src");
        v.load();
      } catch {
        /* ignore */
      }
    });
  });
  await page.addStyleTag({ content: CAPTURE_CSS });
  await page.waitForTimeout(200);

  const maxScroll = await page.evaluate(() => {
    const root = document.querySelector(".folio-root");
    if (!root) return document.body.scrollHeight - window.innerHeight;
    return Math.max(0, root.offsetHeight - window.innerHeight);
  });

  console.log(
    `Capturing ${TOTAL_FRAMES} FG frames @ ${FPS}fps (cards only, transparent bg) over 0…${maxScroll}px`
  );

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const progress = progressForFrame(i, TOTAL_FRAMES);
    const y = Math.round(progress * maxScroll);

    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    // Let Framer Motion scroll transforms settle
    await page.evaluate(
      () =>
        new Promise((r) =>
          requestAnimationFrame(() => requestAnimationFrame(r))
        )
    );
    await page.waitForTimeout(16);

    const file = path.join(
      framesDir,
      `frame-${String(i).padStart(5, "0")}.png`
    );
    // True alpha so smooth BG can sit underneath in ffmpeg
    await page.screenshot({
      path: file,
      type: "png",
      omitBackground: true,
    });

    if (i % 48 === 0 || i === TOTAL_FRAMES - 1) {
      console.log(`  FG frame ${i}/${TOTAL_FRAMES} p=${progress.toFixed(3)}`);
    }
  }

  await browser.close();
  return TOTAL_FRAMES;
}

function writePosterFromComposite(videoPath, outPoster, outThumb, width) {
  // Pull a face-on-ish frame (~10% in) from the finished composite
  const t = (DURATION_S * 0.1).toFixed(3);
  if (outPoster) {
    runFfmpeg([
      "-y",
      "-ss",
      t,
      "-i",
      videoPath,
      "-frames:v",
      "1",
      "-vf",
      `scale=${width}:-1`,
      "-q:v",
      "70",
      outPoster,
    ]);
    console.log("Wrote", outPoster);
  }
  if (outThumb) {
    runFfmpeg([
      "-y",
      "-ss",
      t,
      "-i",
      videoPath,
      "-frames:v",
      "1",
      "-vf",
      "scale=800:-1",
      "-q:v",
      "72",
      outThumb,
    ]);
    console.log("Wrote", outThumb);
  }
}

async function captureAt(viewport, framesDir, outVideo, outPoster, outThumb) {
  ensureDir(path.dirname(outVideo));
  if (outPoster) ensureDir(path.dirname(outPoster));
  if (outThumb) ensureDir(path.dirname(outThumb));

  const n = await captureForeground(viewport, framesDir);
  encodeComposite(framesDir, outVideo, viewport.width, viewport.height, n);
  writePosterFromComposite(outVideo, outPoster, outThumb, viewport.width);
}

async function main() {
  if (!fs.existsSync(ffmpeg) && ffmpeg !== "ffmpeg") {
    console.warn("ffmpeg-static path missing, trying PATH ffmpeg");
  }
  if (!fs.existsSync(BG_SRC)) {
    throw new Error(`BG source not found: ${BG_SRC}`);
  }

  console.log("FOLIO storefront burn — FG capture + smooth BG composite");
  console.log("  BG source:", BG_SRC);
  console.log("  Card curve: continuous handoff, short face, dense close (no mid-stall)");

  await captureAt(VIEWPORT, OUT_DIR, OUT_VIDEO, OUT_POSTER, OUT_THUMB);
  await captureAt(
    VIEWPORT_FS,
    path.join(root, "tmp", "folio-preview-frames-fs"),
    OUT_VIDEO_FS,
    path.join(
      root,
      "public",
      "assets",
      "posters",
      "folio-scroll-preview-fs-v1.webp"
    ),
    null
  );
  console.log("FOLIO capture complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
