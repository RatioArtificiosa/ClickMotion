/**
 * Burn SABLE holiday hero into storefront preview videos (page + fullscreen).
 *
 * Dual-track (same law as Folio / Mirage):
 *  1) Capture FG (nav, intro, footer) as RGBA — transparent, no live video paint
 *  2) Composite continuous full client HD underneath in ffmpeg (no browser seek)
 *
 * Film plays in FULL for the capture duration (~film length). Never cut.
 *
 * Usage:
 *   node scripts/capture-sable-preview.mjs
 *   node scripts/capture-sable-preview.mjs http://127.0.0.1:3004/demo/cleanroom-sable
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
  process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-sable";
const OUT_DIR = path.join(root, "tmp", "sable-preview-frames");
const OUT_VIDEO = path.join(
  root,
  "public",
  "assets",
  "videos",
  "sable-holiday-preview-v1.mp4"
);
const OUT_VIDEO_FS = path.join(
  root,
  "public",
  "assets",
  "videos",
  "sable-holiday-preview-fs-v1.mp4"
);
const OUT_POSTER = path.join(
  root,
  "public",
  "assets",
  "posters",
  "sable-holiday-preview-v1.webp"
);
const OUT_THUMB = path.join(root, "public", "thumbnails", "MS-HERO-SABL01.webp");

const BG_SRC = path.join(
  root,
  "public",
  "assets",
  "videos",
  "sable-winter-v1.mp4"
);

const FPS = 24;
/** Match full film length (~17.33s) — whole walk, uncut */
const DURATION_S = 17;
const TOTAL_FRAMES = FPS * DURATION_S;
const VIEWPORT = { width: 1440, height: 900 };
const VIEWPORT_FS = { width: 1920, height: 1080 };

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

/** Stay near pin start so intro lockup remains; film is continuous underlay */
function progressForFrame(i, totalFrames) {
  const t = i / (totalFrames - 1);
  // Gentle 0 → ~0.35 of track so pin feels alive without empty mid-copy
  return Math.min(0.35, Math.max(0, t * 0.35));
}

const CAPTURE_CSS = `
  html, body, #__next, [data-overlay-container],
  body > div, main, .min-h-screen {
    background: transparent !important;
    background-color: transparent !important;
  }
  body > div > header,
  [data-site-header],
  nav[class*="Header"],
  header:not(.sable-nav),
  footer:not(.sable-footer),
  [data-site-footer] {
    display: none !important;
  }
  .sable-nav,
  .sable-footer,
  .sable-intro {
    visibility: visible !important;
    opacity: 1 !important;
  }
  .sable-root,
  .sable-stage,
  .sable-bg,
  .sable-layout,
  .sable-deck {
    background: transparent !important;
    background-color: transparent !important;
  }
  .sable-bg-video,
  .sable-bg-fallback {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
  }
  .sable-bg-veil {
    background:
      linear-gradient(
        90deg,
        rgba(12, 11, 10, 0.5) 0%,
        rgba(12, 11, 10, 0.1) 28%,
        rgba(12, 11, 10, 0.04) 55%,
        rgba(12, 11, 10, 0.24) 100%
      ),
      linear-gradient(
        180deg,
        rgba(12, 11, 10, 0.38) 0%,
        transparent 28%,
        transparent 58%,
        rgba(12, 11, 10, 0.58) 100%
      ) !important;
  }
  .sable-vignette {
    box-shadow: inset 0 0 100px 32px rgba(12, 11, 10, 0.32) !important;
  }
`;

function encodeComposite(framesDir, outVideo, width, height, frameCount) {
  if (!fs.existsSync(BG_SRC)) {
    throw new Error(`Background source missing: ${BG_SRC}`);
  }
  const pattern = path.join(framesDir, "frame-%05d.png");
  // object-position ~ center 42% vertical
  const filter = [
    `[0:v]scale=${width}:${height}:force_original_aspect_ratio=increase,` +
      `crop=${width}:${height}:(iw-ow)/2:((ih-oh)*0.42),setsar=1,fps=${FPS},format=yuv420p,setpts=PTS-STARTPTS[bg]`,
    `[1:v]fps=${FPS},format=rgba,setpts=PTS-STARTPTS[fg]`,
    `[bg][fg]overlay=0:0:format=auto,format=yuv420p[v]`,
  ].join(";");

  console.log(
    `  compositing full BG (${path.basename(BG_SRC)}) under ${frameCount} FG frames → ${path.basename(outVideo)}`
  );

  runFfmpeg([
    "-y",
    "-stream_loop",
    "-1",
    "-i",
    BG_SRC,
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
  await page.waitForSelector(".sable-root", { timeout: 60_000 });
  await page.waitForTimeout(800);

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
    const root = document.querySelector(".sable-root");
    if (!root) return document.body.scrollHeight - window.innerHeight;
    return Math.max(0, root.offsetHeight - window.innerHeight);
  });

  console.log(
    `Capturing ${TOTAL_FRAMES} FG frames @ ${FPS}fps over 0…${maxScroll}px (full film length)`
  );

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const progress = progressForFrame(i, TOTAL_FRAMES);
    const y = Math.round(progress * maxScroll);

    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.evaluate(
      () =>
        new Promise((r) =>
          requestAnimationFrame(() => requestAnimationFrame(r))
        )
    );
    await page.waitForTimeout(12);

    const file = path.join(
      framesDir,
      `frame-${String(i).padStart(5, "0")}.png`
    );
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
  const t = (DURATION_S * 0.35).toFixed(3);
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
  if (!fs.existsSync(BG_SRC)) {
    throw new Error(`BG source not found: ${BG_SRC}`);
  }

  console.log("SABLE storefront burn — FG + full uncut winter walk composite");
  console.log("  BG source:", BG_SRC);
  console.log("  Duration:", DURATION_S, "s (full film)");

  await captureAt(VIEWPORT, OUT_DIR, OUT_VIDEO, OUT_POSTER, OUT_THUMB);
  await captureAt(
    VIEWPORT_FS,
    path.join(root, "tmp", "sable-preview-frames-fs"),
    OUT_VIDEO_FS,
    path.join(
      root,
      "public",
      "assets",
      "posters",
      "sable-holiday-preview-fs-v1.webp"
    ),
    null
  );
  console.log("SABLE capture complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
