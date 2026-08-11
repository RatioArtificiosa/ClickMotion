/**
 * Burn ELYSE scroll-narrative hero into storefront preview videos (page + fullscreen).
 *
 * Meridian-style full UI burn: programmatic scroll scrub of the pin track
 * so chapters + film advance together (scroll owns time).
 *
 * Usage:
 *   node scripts/capture-elyse-preview.mjs
 *   node scripts/capture-elyse-preview.mjs http://127.0.0.1:3004/demo/cleanroom-elyse
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
  process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-elyse";
const OUT_DIR = path.join(root, "tmp", "elyse-preview-frames");
const OUT_VIDEO = path.join(
  root,
  "public",
  "assets",
  "videos",
  "elyse-scroll-preview-v1.mp4"
);
const OUT_VIDEO_FS = path.join(
  root,
  "public",
  "assets",
  "videos",
  "elyse-scroll-preview-fs-v1.mp4"
);
const OUT_POSTER = path.join(
  root,
  "public",
  "assets",
  "posters",
  "elyse-scroll-preview-v1.webp"
);
const OUT_THUMB = path.join(root, "public", "thumbnails", "MS-HERO-ELYS01.webp");

const FPS = 24;
/** Match full film length (~10.04s) */
const DURATION_S = 10;
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
}

/** Slight ease so chapter 1 and finale hold a readable beat */
function progressForFrame(i, totalFrames) {
  const t = i / (totalFrames - 1);
  if (t < 0.08) return t * 0.55;
  if (t > 0.92) return 0.9 + (t - 0.92) * 1.25;
  return 0.044 + ((t - 0.08) * (0.9 - 0.044)) / 0.84;
}

async function captureAt(viewport, framesDir) {
  cleanDir(framesDir);

  console.log("Launching capture…", URL, viewport);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport,
    deviceScaleFactor: 1,
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForSelector(".elyse-root", { timeout: 60_000 });
  await page.waitForFunction(
    () => {
      const v = document.querySelector(".elyse-video, .elyse-stage video, video");
      return v && v.readyState >= 1 && v.duration > 0;
    },
    { timeout: 60_000 }
  );
  await page.waitForTimeout(900);

  // Product law: scroll cue is HTML overlay on storefront - strip from burn
  await page.addStyleTag({
    content: `[data-ms-scroll-cue], .elyse-scroll-cue { display: none !important; }`,
  });

  const maxScroll = await page.evaluate(() => {
    const pin = document.querySelector(".elyse-pin");
    if (!pin) return document.body.scrollHeight - window.innerHeight;
    return Math.max(0, pin.offsetHeight - window.innerHeight);
  });

  console.log(
    `Capturing ${TOTAL_FRAMES} frames @ ${FPS}fps over 0…${maxScroll}px (full film)`
  );

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const progress = Math.min(1, Math.max(0, progressForFrame(i, TOTAL_FRAMES)));
    const y = Math.round(progress * maxScroll);

    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);

    await page.evaluate(
      () =>
        new Promise((resolve) => {
          const v = document.querySelector("video");
          if (!v) {
            resolve();
            return;
          }
          requestAnimationFrame(() => {
            if (v.seeking) {
              v.addEventListener("seeked", () => resolve(), { once: true });
            } else {
              setTimeout(resolve, 16);
            }
          });
        })
    );
    await page.waitForTimeout(18);

    const file = path.join(
      framesDir,
      `frame-${String(i + 1).padStart(4, "0")}.png`
    );
    await page.screenshot({ path: file, type: "png" });

    if (i % 48 === 0 || i === TOTAL_FRAMES - 1) {
      console.log(
        `  frame ${i + 1}/${TOTAL_FRAMES} progress=${progress.toFixed(3)}`
      );
    }
  }

  await browser.close();
  return TOTAL_FRAMES;
}

function encodeFromFrames(framesDir, outVideo, width, height) {
  ensureDir(path.dirname(outVideo));
  const pattern = path.join(framesDir, "frame-%04d.png");
  const args = [
    "-y",
    "-framerate",
    String(FPS),
    "-i",
    pattern,
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    width >= 1920 ? "18" : "20",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
  ];
  if (width === 1920 && height === 1080) {
    // native FS capture already 1920x1080 when viewport is FS
  }
  args.push(outVideo);
  runFfmpeg(args);
  console.log("Wrote", outVideo);
}

function writeStills(framesDir, outPoster, outThumb) {
  // ~chapter 1 hold (~12%) then mid for thumb fallback
  const posterFrame = path.join(framesDir, "frame-0030.png");
  const midFrame = path.join(framesDir, "frame-0120.png");
  const stillSrc = fs.existsSync(posterFrame) ? posterFrame : midFrame;
  ensureDir(path.dirname(outPoster));
  runFfmpeg([
    "-y",
    "-i",
    stillSrc,
    "-frames:v",
    "1",
    "-vf",
    "scale=1440:-1",
    "-q:v",
    "70",
    outPoster,
  ]);
  console.log("Wrote", outPoster);
  if (outThumb) {
    ensureDir(path.dirname(outThumb));
    runFfmpeg([
      "-y",
      "-i",
      stillSrc,
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

async function main() {
  console.log("ELYSE storefront burn — scroll scrub full UI");
  console.log("  Duration:", DURATION_S, "s (full film)");

  await captureAt(VIEWPORT, OUT_DIR);
  encodeFromFrames(OUT_DIR, OUT_VIDEO, VIEWPORT.width, VIEWPORT.height);
  writeStills(OUT_DIR, OUT_POSTER, OUT_THUMB);

  const fsDir = path.join(root, "tmp", "elyse-preview-frames-fs");
  await captureAt(VIEWPORT_FS, fsDir);
  encodeFromFrames(fsDir, OUT_VIDEO_FS, VIEWPORT_FS.width, VIEWPORT_FS.height);
  writeStills(
    fsDir,
    path.join(
      root,
      "public",
      "assets",
      "posters",
      "elyse-scroll-preview-fs-v1.webp"
    ),
    null
  );

  console.log("ELYSE capture complete");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
