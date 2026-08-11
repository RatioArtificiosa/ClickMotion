/**
 * Burn Vertex scroll-narrative UI into a gallery/product preview.
 * Programmatic scroll scrub (no mouse) → frame sequence → H.264.
 * Viewport is 16:9 so product object-cover does not crop left/right type.
 *
 * Usage:
 *   node scripts/capture-vertex-preview.mjs
 *   node scripts/capture-vertex-preview.mjs http://127.0.0.1:3004/demo/cleanroom-vertex
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const URL =
  process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-vertex";
const OUT_DIR = path.join(root, "tmp", "vertex-preview-frames");
const OUT_VIDEO = path.join(
  root,
  "public",
  "assets",
  "videos",
  "vertex-preview-v1.mp4"
);
const OUT_VIDEO_FS = path.join(
  root,
  "public",
  "assets",
  "videos",
  "vertex-preview-fs-v1.mp4"
);
const OUT_POSTER = path.join(
  root,
  "public",
  "assets",
  "posters",
  "vertex-preview-v1.webp"
);
const OUT_THUMB = path.join(root, "public", "thumbnails", "MS-HERO-VERT01.webp");
const FPS = 24;
const DURATION_S = 12;
const TOTAL_FRAMES = FPS * DURATION_S;
// 16:9 matches gallery aspect-video → less edge crop than 1440x900
const VIEWPORT = { width: 1600, height: 900 };

const ffmpeg =
  process.env.FFMPEG_PATH ||
  path.join(root, "node_modules", "ffmpeg-static", "ffmpeg.exe");

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
    throw new Error(`ffmpeg failed: ${args.join(" ")}`);
  }
}

async function main() {
  if (!fs.existsSync(ffmpeg)) {
    throw new Error(`ffmpeg not found at ${ffmpeg}`);
  }

  cleanDir(OUT_DIR);
  ensureDir(path.dirname(OUT_VIDEO));
  ensureDir(path.dirname(OUT_POSTER));
  ensureDir(path.dirname(OUT_THUMB));

  console.log("Launching browser…", URL);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 90_000 });

  await page.waitForFunction(
    () => {
      const v = document.querySelector("video");
      return v && v.readyState >= 1 && v.duration > 0;
    },
    { timeout: 60_000 }
  );
  await page.waitForTimeout(900);

  // Strip burnt Scroll cue — product law: badge is HTML overlay on storefront only
  await page.addStyleTag({
    content: `[data-ms-scroll-cue] { display: none !important; }`,
  });

  const maxScroll = await page.evaluate(() => {
    const track = document.querySelector(".vertex-root > div");
    if (!track) return document.body.scrollHeight - window.innerHeight;
    return Math.max(0, track.offsetHeight - window.innerHeight);
  });

  console.log(
    `Capturing ${TOTAL_FRAMES} frames @ ${FPS}fps over ${DURATION_S}s (scroll 0…${maxScroll}px)`
  );

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const t = i / (TOTAL_FRAMES - 1);
    // Hold early/late chapters a beat so burnt copy is readable
    const eased =
      t < 0.1
        ? t * 0.55
        : t > 0.9
          ? 0.9 + (t - 0.9) * 1.2
          : 0.055 + ((t - 0.1) * (0.9 - 0.055)) / 0.8;
    const progress = Math.min(1, Math.max(0, eased));
    const y = progress * maxScroll;

    await page.evaluate((scrollY) => {
      window.scrollTo(0, scrollY);
    }, y);

    await page.evaluate(
      () =>
        new Promise((resolve) => {
          const v = document.querySelector("video");
          if (!v) {
            resolve();
            return;
          }
          const done = () => {
            v.removeEventListener("seeked", done);
            resolve();
          };
          requestAnimationFrame(() => {
            if (v.seeking) v.addEventListener("seeked", done, { once: true });
            else setTimeout(resolve, 16);
          });
        })
    );
    await page.waitForTimeout(24);

    const file = path.join(
      OUT_DIR,
      `frame-${String(i + 1).padStart(4, "0")}.png`
    );
    await page.screenshot({ path: file, type: "png" });

    if (i % 24 === 0 || i === TOTAL_FRAMES - 1) {
      console.log(
        `  frame ${i + 1}/${TOTAL_FRAMES} progress=${progress.toFixed(3)}`
      );
    }
  }

  const posterFrame = path.join(OUT_DIR, "frame-0036.png");
  const midFrame = path.join(OUT_DIR, "frame-0144.png");

  await browser.close();

  console.log("Encoding page preview + fullscreen (1920×1080)…");
  runFfmpeg([
    "-y",
    "-framerate",
    String(FPS),
    "-i",
    path.join(OUT_DIR, "frame-%04d.png"),
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "20",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    OUT_VIDEO,
  ]);
  runFfmpeg([
    "-y",
    "-framerate",
    String(FPS),
    "-i",
    path.join(OUT_DIR, "frame-%04d.png"),
    "-vf",
    "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:black",
    "-c:v",
    "libx264",
    "-preset",
    "medium",
    "-crf",
    "18",
    "-pix_fmt",
    "yuv420p",
    "-movflags",
    "+faststart",
    "-an",
    OUT_VIDEO_FS,
  ]);

  const stillSrc = fs.existsSync(posterFrame) ? posterFrame : midFrame;
  runFfmpeg([
    "-y",
    "-i",
    stillSrc,
    "-frames:v",
    "1",
    "-update",
    "1",
    OUT_POSTER,
  ]);
  fs.copyFileSync(OUT_POSTER, OUT_THUMB);

  const sizeMb = (fs.statSync(OUT_VIDEO).size / (1024 * 1024)).toFixed(2);
  const sizeFsMb = (fs.statSync(OUT_VIDEO_FS).size / (1024 * 1024)).toFixed(2);
  console.log(
    JSON.stringify(
      {
        ok: true,
        video: path.relative(root, OUT_VIDEO).replace(/\\/g, "/"),
        videoFullscreen: path.relative(root, OUT_VIDEO_FS).replace(/\\/g, "/"),
        poster: path.relative(root, OUT_POSTER).replace(/\\/g, "/"),
        thumbnail: path.relative(root, OUT_THUMB).replace(/\\/g, "/"),
        frames: TOTAL_FRAMES,
        fps: FPS,
        durationS: DURATION_S,
        sizeMb,
        sizeFsMb,
      },
      null,
      2
    )
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
