/**
 * Capture HELIX gallery section into storefront presentation videos.
 *
 * Full UI capture (no separate BG film composite) — section stage is solid gray
 * with WebGL cards. High quality, full pin journey. No size/length thrift.
 *
 * Usage:
 *   node scripts/capture-helix-preview.mjs
 *   node scripts/capture-helix-preview.mjs http://127.0.0.1:3004/demo/cleanroom-helix
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
  process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-helix";
const OUT_DIR = path.join(root, "tmp", "helix-preview-frames");
const OUT_VIDEO = path.join(
  root,
  "public",
  "assets",
  "videos",
  "helix-gallery-preview-v1.mp4",
);
const OUT_VIDEO_FS = path.join(
  root,
  "public",
  "assets",
  "videos",
  "helix-gallery-preview-fs-v1.mp4",
);
const OUT_POSTER = path.join(
  root,
  "public",
  "assets",
  "posters",
  "helix-gallery-preview-v1.webp",
);
const OUT_THUMB = path.join(root, "public", "thumbnails", "MS-SEC-HELI01.webp");

/** Full pin journey presentation — quality over file size */
const FPS = 30;
const DURATION_S = 28;
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
  const r = spawnSync(ffmpeg, args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error(`ffmpeg failed: ${args.slice(0, 8).join(" ")}…`);
  }
  return r;
}

/**
 * Ease scroll through pin: hold start briefly, travel helix, soft settle at end
 * when titles have exited (matches product pin end).
 */
function progressForFrame(i, total) {
  const t = i / Math.max(total - 1, 1);
  // slight ease-in-out so cards don't slam
  const s = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  // leave a hair of head/tail so first/last frames aren't empty
  return Math.min(0.995, Math.max(0.002, s * 0.995));
}

async function capturePass(viewport, outDir) {
  cleanDir(outDir);
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({
    viewport,
    deviceScaleFactor: 1,
  });

  console.log(`→ ${URL} @ ${viewport.width}×${viewport.height}`);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 });
  // Let R3F + textures + Lenis settle
  await page.waitForTimeout(2500);
  await page.waitForSelector("#helix-gallery", { timeout: 30000 });
  await page.waitForSelector("canvas", { timeout: 30000 });

  // Pin distance ≈ 5 * vh desktop (matches section pinMetrics)
  const scrollMax = await page.evaluate(() => {
    const pin = document.querySelector("#helix-gallery [class*='h-dvh'], #helix-gallery > div");
    const vh = window.innerHeight;
    // scroll height after pin spacer
    return Math.max(
      document.documentElement.scrollHeight - vh,
      vh * 5,
    );
  });

  console.log(`  scrollMax≈${Math.round(scrollMax)}px  frames=${TOTAL_FRAMES}`);

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const p = progressForFrame(i, TOTAL_FRAMES);
    const y = Math.round(p * scrollMax);
    await page.evaluate((yy) => {
      window.scrollTo(0, yy);
      // nudge Lenis if present
      const l = window.__msLenis;
      if (l && typeof l.scrollTo === "function") {
        l.scrollTo(yy, { immediate: true });
      }
    }, y);
    // allow ScrollTrigger + R3F frame
    await page.waitForTimeout(i === 0 ? 400 : 55);
    const file = path.join(outDir, `f-${String(i).padStart(5, "0")}.png`);
    await page.screenshot({ path: file, type: "png" });
    if (i % 30 === 0) {
      process.stdout.write(`  frame ${i}/${TOTAL_FRAMES}\r`);
    }
  }
  process.stdout.write("\n");
  await browser.close();
}

function encodeFromFrames(outDir, outMp4, w, h) {
  console.log(`encode → ${path.relative(root, outMp4)}`);
  // High quality presentation encode — CRF 16, slow, faststart
  runFfmpeg([
    "-y",
    "-framerate",
    String(FPS),
    "-i",
    path.join(outDir, "f-%05d.png"),
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
  if (!fs.existsSync(ffmpeg) && ffmpeg !== "ffmpeg") {
    console.warn("ffmpeg-static missing, trying PATH ffmpeg");
  }

  // Page preview
  const dirPage = path.join(OUT_DIR, "page");
  await capturePass(VIEWPORT, dirPage);
  encodeFromFrames(dirPage, OUT_VIDEO, VIEWPORT.width, VIEWPORT.height);

  // Fullscreen preview
  const dirFs = path.join(OUT_DIR, "fs");
  await capturePass(VIEWPORT_FS, dirFs);
  encodeFromFrames(dirFs, OUT_VIDEO_FS, VIEWPORT_FS.width, VIEWPORT_FS.height);

  // Poster + thumb from mid-journey frame (cards + titles in play)
  const mid = path.join(dirPage, `f-${String(Math.floor(TOTAL_FRAMES * 0.42)).padStart(5, "0")}.png`);
  ensureDir(path.dirname(OUT_POSTER));
  ensureDir(path.dirname(OUT_THUMB));
  runFfmpeg([
    "-y",
    "-i",
    mid,
    "-frames:v",
    "1",
    "-c:v",
    "libwebp",
    "-quality",
    "90",
    OUT_POSTER,
  ]);
  runFfmpeg([
    "-y",
    "-i",
    mid,
    "-frames:v",
    "1",
    "-vf",
    "scale=640:-1",
    "-c:v",
    "libwebp",
    "-quality",
    "88",
    OUT_THUMB,
  ]);

  for (const f of [OUT_VIDEO, OUT_VIDEO_FS, OUT_POSTER, OUT_THUMB]) {
    const st = fs.statSync(f);
    console.log(`✓ ${path.relative(root, f)}  ${(st.size / 1024 / 1024).toFixed(2)} MB`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
