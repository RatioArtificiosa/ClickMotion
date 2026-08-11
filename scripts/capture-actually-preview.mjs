/**
 * Capture ACTUALLY! hero storefront presentation videos.
 *
 * Uses the SAME interactive choreography as the lab demo the buyer loved:
 *   Act 1 — pointer moves the circular clip "window" over the can
 *   Act 2 — grab + drag the 3D can
 *   Act 3 — scroll the pin journey (capped — never empty ink tail)
 *   Act 4 — mid-pin re-grab
 *   Act 5 — finish pin to formula composition and HOLD
 *
 * Dual passes: 1440×900 page + 1920×1080 fullscreen via Playwright recordVideo.
 * No thrift: full interaction, high CRF encode.
 *
 * Usage:
 *   node scripts/capture-actually-preview.mjs
 *   node scripts/capture-actually-preview.mjs http://127.0.0.1:3004/demo/cleanroom-actually
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
  process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-actually";

const OUT_VIDEO = path.join(
  root,
  "public",
  "assets",
  "videos",
  "actually-hero-preview-v1.mp4",
);
const OUT_VIDEO_FS = path.join(
  root,
  "public",
  "assets",
  "videos",
  "actually-hero-preview-fs-v1.mp4",
);
const OUT_POSTER = path.join(
  root,
  "public",
  "assets",
  "posters",
  "actually-hero-preview-v1.webp",
);
const OUT_THUMB = path.join(root, "public", "thumbnails", "MS-HERO-ACTU01.webp");
const WORK = path.join(root, "tmp", "actually-interactive-capture");

const VIEWPORT = { width: 1440, height: 900 };
const VIEWPORT_FS = { width: 1920, height: 1080 };

/** Pin is +=120% — hard-cap scroll so we never enter empty tail. */
const PIN_SCROLL_VH = 1.18;
/** Never go past this fraction of measured max either. */
const SCROLL_CAP = 0.92;

const ffmpeg =
  process.env.FFMPEG_PATH ||
  (() => {
    try {
      return require("ffmpeg-static");
    } catch {
      return path.join(root, "node_modules", "ffmpeg-static", "ffmpeg.exe");
    }
  })();

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function ensureDir(d) {
  fs.mkdirSync(d, { recursive: true });
}

function cleanDir(d) {
  if (fs.existsSync(d)) fs.rmSync(d, { recursive: true, force: true });
  ensureDir(d);
}

function runFfmpeg(args) {
  const r = spawnSync(ffmpeg, args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error(`ffmpeg failed: ${args.slice(0, 8).join(" ")}…`);
  }
  return r;
}

async function movePath(page, points, stepsPer = 12, pause = 18) {
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    for (let s = 0; s <= stepsPer; s++) {
      const t = s / stepsPer;
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      await page.mouse.move(x0 + (x1 - x0) * e, y0 + (y1 - y0) * e);
      await sleep(pause);
    }
  }
}

async function scrollToY(page, y) {
  await page.evaluate((yy) => {
    window.scrollTo(0, yy);
    const l = window.__msLenis || window.__orionLenis;
    if (l?.scrollTo) l.scrollTo(yy, { immediate: true });
  }, y);
}

/**
 * Measure pin journey only — never document bottom (empty ink tail).
 */
async function pinScrollMax(page) {
  return page.evaluate((pinVh) => {
    const vh = window.innerHeight;
    const pin = Math.round(vh * pinVh);
    const doc = Math.max(0, document.documentElement.scrollHeight - vh);
    // Prefer pin length; if doc is shorter use that; always leave headroom
    return Math.min(pin, doc > 0 ? doc : pin);
  }, PIN_SCROLL_VH);
}

async function runChoreography(page, viewport) {
  const cx = viewport.width / 2;
  const cy = viewport.height * 0.48;

  // Wait loader + can entrance
  await page.waitForSelector("#hero", { timeout: 30000 });
  await page.waitForSelector("canvas", { timeout: 60000 });
  await sleep(3800);

  // ── Act 1: pointer window tour (THE signature the buyer loved) ──
  console.log("  Act 1 · pointer window tour");
  await movePath(
    page,
    [
      [cx, cy],
      [cx + 240, cy - 90],
      [cx - 200, cy + 50],
      [cx + 170, cy + 130],
      [cx - 120, cy - 110],
      [cx + 80, cy + 40],
      [cx, cy],
    ],
    14,
    20,
  );
  await sleep(450);

  // ── Act 2: grab + spin the can through the window ──
  console.log("  Act 2 · grab + drag can");
  await page.mouse.move(cx, cy + 16);
  await sleep(220);
  await page.mouse.down();
  await movePath(
    page,
    [
      [cx, cy + 16],
      [cx + 200, cy - 50],
      [cx + 240, cy + 90],
      [cx - 140, cy + 70],
      [cx - 50, cy - 40],
      [cx + 90, cy + 20],
      [cx, cy + 10],
    ],
    12,
    22,
  );
  await page.mouse.up();
  await sleep(550);

  // ── Act 3: scroll pin (capped) while window still follows ──
  console.log("  Act 3 · scroll pin journey (capped)");
  const scrollMax = await pinScrollMax(page);
  const endY = Math.round(scrollMax * SCROLL_CAP);
  console.log(`  pin scrollMax=${scrollMax}px  endY=${endY}px (cap ${SCROLL_CAP})`);

  const steps = 52;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // ease-in-out into pin, stop at endY — never full document
    const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const y = Math.round(endY * e);
    await scrollToY(page, y);
    // figure-eight so window keeps living during scroll
    const ang = t * Math.PI * 2;
    const px = cx + Math.cos(ang) * (150 * (1 - t * 0.55));
    const py = cy + Math.sin(ang) * (70 * (1 - t * 0.55));
    await page.mouse.move(px, py);
    await sleep(68);
  }
  await sleep(500);

  // ── Act 4: mid-pin re-engage can (before full lock) ──
  console.log("  Act 4 · mid-pin re-grab");
  const midY = Math.round(endY * 0.48);
  await scrollToY(page, midY);
  await sleep(400);
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await movePath(
    page,
    [
      [cx, cy],
      [cx - 210, cy + 35],
      [cx + 170, cy - 55],
      [cx + 40, cy + 25],
      [cx, cy + 10],
    ],
    11,
    24,
  );
  await page.mouse.up();
  await sleep(450);

  // ── Act 5: finish to formula composition and HOLD (no overscroll) ──
  console.log("  Act 5 · finish to formula hold");
  const finishSteps = 28;
  for (let i = 0; i <= finishSteps; i++) {
    const t = 0.48 + (0.52 * i) / finishSteps;
    // hard stop at SCROLL_CAP — never past endY
    const y = Math.round(endY * Math.min(t, 1));
    await scrollToY(page, y);
    // settle pointer toward center as support copy owns the frame
    const blend = Math.min(1, (t - 0.48) / 0.52);
    await page.mouse.move(cx + 60 * (1 - blend), cy - 20 * (1 - blend));
    await sleep(55);
  }

  // Park at final composition: can + formula support, not empty ink
  await scrollToY(page, endY);
  await page.mouse.move(cx * 0.55, cy); // off can a bit so support reads
  await sleep(1400);

  return { endY, scrollMax };
}

async function recordPass(viewport, label) {
  const outDir = path.join(WORK, label);
  cleanDir(outDir);

  console.log(`\n→ ${URL} @ ${viewport.width}×${viewport.height}`);
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--ignore-gpu-blocklist"],
  });
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    hasTouch: false,
    recordVideo: {
      dir: outDir,
      size: viewport,
    },
  });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 });
  await runChoreography(page, viewport);

  // Final composition still — stay here; do NOT scroll back to top while recording
  // (rewinding to 0 for a poster was burning a bad ending into the storefront cut).
  const finalPng = path.join(outDir, "final.png");
  await page.screenshot({ path: finalPng, type: "png" });
  await sleep(200);

  // Close page first so recordVideo finalizes WITHOUT a rewind-to-top tail
  await page.close();
  await context.close();
  await browser.close();

  const webms = fs
    .readdirSync(outDir)
    .filter((f) => f.endsWith(".webm"))
    .map((f) => path.join(outDir, f));
  if (!webms.length) throw new Error(`No webm for ${label}`);
  return { webm: webms[0], finalPng };
}

/** Hard max storefront length — choreography ends; any rewind/tail is cut. */
const MAX_DURATION_S = 23;

function encodeWebm(webm, outMp4, w, h) {
  console.log(`encode → ${path.relative(root, outMp4)} (max ${MAX_DURATION_S}s)`);
  runFfmpeg([
    "-y",
    "-i",
    webm,
    "-t",
    String(MAX_DURATION_S),
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "16",
    "-pix_fmt",
    "yuv420p",
    "-profile:v",
    "high",
    "-level",
    "4.2",
    "-movflags",
    "+faststart",
    "-vf",
    `scale=${w}:${h}:flags=lanczos`,
    outMp4,
  ]);
}

async function main() {
  ensureDir(path.dirname(OUT_VIDEO));
  ensureDir(path.dirname(OUT_POSTER));
  ensureDir(path.dirname(OUT_THUMB));
  cleanDir(WORK);

  // Page interactive record
  const pageRec = await recordPass(VIEWPORT, "page");
  encodeWebm(pageRec.webm, OUT_VIDEO, VIEWPORT.width, VIEWPORT.height);

  // Fullscreen interactive record
  const fsRec = await recordPass(VIEWPORT_FS, "fs");
  encodeWebm(fsRec.webm, OUT_VIDEO_FS, VIEWPORT_FS.width, VIEWPORT_FS.height);

  // Poster/thumb from signature window beat (~6s into cut) — never by rewinding the live record
  const posterSrc = path.join(WORK, "poster-src.png");
  runFfmpeg([
    "-y",
    "-ss",
    "6",
    "-i",
    OUT_VIDEO,
    "-frames:v",
    "1",
    posterSrc,
  ]);
  runFfmpeg([
    "-y",
    "-i",
    posterSrc,
    "-frames:v",
    "1",
    "-c:v",
    "libwebp",
    "-quality",
    "92",
    OUT_POSTER,
  ]);
  runFfmpeg([
    "-y",
    "-i",
    posterSrc,
    "-frames:v",
    "1",
    "-vf",
    "scale=640:-1",
    "-c:v",
    "libwebp",
    "-quality",
    "90",
    OUT_THUMB,
  ]);

  for (const f of [OUT_VIDEO, OUT_VIDEO_FS, OUT_POSTER, OUT_THUMB]) {
    const st = fs.statSync(f);
    console.log(
      `✓ ${path.relative(root, f)}  ${(st.size / 1024 / 1024).toFixed(2)} MB`,
    );
  }
  console.log("\nInteractive storefront capture complete (window + grab + capped pin).");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
