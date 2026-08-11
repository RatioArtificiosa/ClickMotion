/**
 * Burn Meridian UI into a smooth presentation video for MS gallery/product previews.
 * Programmatic scroll scrub (no mouse) → frame sequence → H.264.
 *
 * Usage:
 *   node scripts/capture-meridian-preview.mjs
 *   node scripts/capture-meridian-preview.mjs http://127.0.0.1:3004/demo/scroll-narrative
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const URL =
  process.argv[2] || "http://127.0.0.1:3004/demo/scroll-narrative";
const OUT_DIR = path.join(root, "tmp", "meridian-preview-frames");
const OUT_VIDEO = path.join(
  root,
  "public",
  "assets",
  "videos",
  "meridian-scroll-preview-v1.mp4"
);
const OUT_VIDEO_FS = path.join(
  root,
  "public",
  "assets",
  "videos",
  "meridian-scroll-preview-fs-v1.mp4"
);
const OUT_POSTER = path.join(
  root,
  "public",
  "assets",
  "posters",
  "meridian-scroll-preview-v1.webp"
);
const OUT_THUMB = path.join(root, "public", "thumbnails", "MS-HERO-MERI01.webp");
const FPS = 24;
const DURATION_S = 12; // match source film length
const TOTAL_FRAMES = FPS * DURATION_S; // 288
const VIEWPORT = { width: 1440, height: 900 };

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

  // Wait for video metadata + ScrollTrigger ready
  await page.waitForFunction(
    () => {
      const v = document.querySelector("video");
      return v && v.readyState >= 1 && v.duration > 0;
    },
    { timeout: 60_000 }
  );
  await page.waitForTimeout(800);

  // Strip burnt Scroll cue — product law: badge is HTML overlay on storefront only
  await page.addStyleTag({
    content: `[data-ms-scroll-cue] { display: none !important; }`,
  });

  const maxScroll = await page.evaluate(() => {
    const track = document.querySelector(".meridian-root > div");
    if (!track) return document.body.scrollHeight - window.innerHeight;
    // ScrollTrigger end is bottom of track at bottom of viewport → distance = trackH - vh
    return Math.max(0, track.offsetHeight - window.innerHeight);
  });

  console.log(
    `Capturing ${TOTAL_FRAMES} frames @ ${FPS}fps over ${DURATION_S}s (scroll 0…${maxScroll}px)`
  );

  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const t = i / (TOTAL_FRAMES - 1); // 0..1
    // Ease slightly so early/late chapters hold a beat (readable burnt text)
    const eased =
      t < 0.08
        ? t * 0.6
        : t > 0.92
          ? 0.92 + (t - 0.92) * 1.25
          : 0.048 + (t - 0.08) * (0.92 - 0.048) / 0.84;
    const progress = Math.min(1, Math.max(0, eased));
    const y = progress * maxScroll;

    await page.evaluate((scrollY) => {
      window.scrollTo(0, scrollY);
    }, y);

    // Let ScrollTrigger + video seek settle
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
          // If already near target, resolve next frame
          requestAnimationFrame(() => {
            if (v.seeking) v.addEventListener("seeked", done, { once: true });
            else setTimeout(resolve, 16);
          });
        })
    );
    await page.waitForTimeout(20);

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

  // Hero poster frame (~12% - aerial + chapter 1 text)
  const posterFrame = path.join(OUT_DIR, "frame-0036.png");
  const midFrame = path.join(OUT_DIR, "frame-0144.png");

  await browser.close();

  console.log("Encoding page preview + fullscreen (1920×1080)…");
  // Page preview (native capture viewport)
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
  // Fullscreen target 1920×1080 (pad/scale, keep full UI)
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

  // Poster + thumbnail from burnt UI frames
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
