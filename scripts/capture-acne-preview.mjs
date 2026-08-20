/**
 * Capture Acne Secret (MS-HERO-ACNE01) storefront dual previews.
 * Must match live demo:
 *   0–15s   cinema (centered ~50% width)
 *   ~1.05s  cubic-bezier dock ease to left + form (SCRUBBED — not a jump)
 *   +hold   docked form
 *
 * Uses __MS_CAPTURE_CLOCK for the full presentation timeline.
 * Hero scrubs dock layout from that clock (duration:0 poses) so slow
 * screenshots cannot skip the ease the way wall-time Framer sampling did.
 *
 *   node scripts/capture-acne-preview.mjs
 *   CAPTURE_PASS=page|fs|both
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
  process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-acne";
const PASS = (process.env.CAPTURE_PASS || "both").toLowerCase();

const OUT_VIDEO = path.join(
  root,
  "public/assets/videos/acne-secret-preview-v1.mp4",
);
const OUT_VIDEO_FS = path.join(
  root,
  "public/assets/videos/acne-secret-preview-fs-v1.mp4",
);
const OUT_THUMB = path.join(root, "public/thumbnails/MS-HERO-ACNE01.webp");
const FRAME_ROOT = path.join(root, "tmp/acne-preview-frames");

const FPS = 24;
/** Product CINEMA_S + Framer dock ease (~1.05s) + hold */
const CINEMA_S = 15;
const TRANSITION_S = 1.05; // matches DOCK_EASE duration in AcneSecretHero
const DOCK_HOLD_S = 6;
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

const STRIP = `
(() => {
  const CSS = \`nextjs-portal,[data-nextjs-toast],[data-nextjs-dialog-overlay],[data-nextjs-dialog],[data-next-badge-root],[data-nextjs-dev-overlay],#__next-build-watcher{display:none!important;visibility:hidden!important;pointer-events:none!important;opacity:0!important}\`;
  const inject = () => {
    if (!document.getElementById("__ms_strip")) {
      const s = document.createElement("style");
      s.id = "__ms_strip";
      s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
    document.querySelectorAll("nextjs-portal,[data-nextjs-toast],[data-next-badge-root]").forEach((el) => el.remove());
  };
  inject();
  new MutationObserver(inject).observe(document.documentElement, { childList: true, subtree: true });
})();
`;

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
    throw new Error("ffmpeg failed");
  }
}

async function setCaptureClock(page, seconds) {
  await page.evaluate((t) => {
    window.__MS_CAPTURE_CLOCK = t;
  }, seconds);
}

async function rAF2(page) {
  await page.evaluate(
    () =>
      new Promise((r) => {
        requestAnimationFrame(() => requestAnimationFrame(() => r()));
      }),
  );
}

/** Wait until hero has applied capture clock → dock scrub (React paint). */
async function waitDockScrub(page, clockS) {
  const expected =
    clockS < CINEMA_S
      ? 0
      : Math.min(1, (clockS - CINEMA_S) / TRANSITION_S);
  const rounded = Math.round(expected * 1000) / 1000;
  await page
    .waitForFunction(
      (want) => {
        const el = document.querySelector("[data-ms-capture-dock]");
        if (!el) return false;
        const got = Number(el.getAttribute("data-ms-capture-dock"));
        return Number.isFinite(got) && Math.abs(got - want) < 0.02;
      },
      rounded,
      { timeout: 5000 },
    )
    .catch(() => {});
  await rAF2(page);
}

async function seekFilm(page, t) {
  await page.evaluate((time) => {
    const v = document.querySelector("video");
    if (!v) return;
    v.muted = true;
    v.loop = true;
    try {
      v.pause();
    } catch {
      /* ignore */
    }
    if (Math.abs((v.currentTime || 0) - time) < 0.001) {
      v.currentTime = Math.max(0, time - 0.001);
    }
    v.currentTime = time;
  }, t);
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
        if (v.seeking) {
          v.addEventListener("seeked", done, { once: true });
          setTimeout(done, 400);
        } else {
          requestAnimationFrame(() => resolve());
        }
      }),
  );
}

async function strip(page) {
  await page.evaluate(STRIP);
}

async function shot(page, outDir, index) {
  await strip(page);
  const file = path.join(outDir, `f-${String(index).padStart(5, "0")}.png`);
  await page.screenshot({ path: file, type: "png" });
  return index + 1;
}

async function capturePass(viewport, outDir) {
  cleanDir(outDir);
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
  await page.addInitScript({ content: STRIP });
  await page.addInitScript({ content: `window.__MS_CAPTURE_CLOCK = 0;` });

  console.log(`→ ${URL} @ ${viewport.width}×${viewport.height}`);
  console.log(
    `  0–${CINEMA_S}s cinema · ${TRANSITION_S}s scrubbed dock ease · ${DOCK_HOLD_S}s hold`,
  );

  await page.goto(URL, { waitUntil: "load", timeout: 120000 });
  await page.evaluate(STRIP);
  await page
    .waitForFunction(
      () => {
        const v = document.querySelector("video");
        return v && v.readyState >= 2 && v.duration > 0;
      },
      { timeout: 90000 },
    )
    .catch(() => {});
  await page.waitForTimeout(1400);

  const mediaDuration = await page.evaluate(() => {
    const v = document.querySelector("video");
    if (!v) return 0;
    v.muted = true;
    v.loop = true;
    try {
      v.pause();
    } catch {
      /* ignore */
    }
    v.play = () => Promise.resolve();
    v.autoplay = false;
    return Number.isFinite(v.duration) ? v.duration : 0;
  });

  const filmCap =
    mediaDuration > 0.5 ? mediaDuration * 0.995 : CINEMA_S + TRANSITION_S + DOCK_HOLD_S;

  let frame = 0;
  const cinemaFrames = Math.round(CINEMA_S * FPS);
  const transitionFrames = Math.round(TRANSITION_S * FPS);
  const holdFrames = Math.round(DOCK_HOLD_S * FPS);

  // --- Phase A: cinema (presentation clock 0 → just under CINEMA_S) ---
  for (let i = 0; i < cinemaFrames; i++) {
    const wall = i / FPS;
    const filmT = Math.min(filmCap, wall);
    await setCaptureClock(page, wall);
    await waitDockScrub(page, wall);
    await seekFilm(page, filmT);
    frame = await shot(page, outDir, frame);
    if (i % FPS === 0) {
      process.stdout.write(`  cinema ${wall.toFixed(1)}s / ${CINEMA_S}s   \r`);
    }
  }
  process.stdout.write("\n");

  // --- Phase B: scrub dock ease via capture clock (hero interpolates poses) ---
  // wall time is irrelevant — each frame sets absolute presentation time so
  // intermediate left/width/form opacity are exact, not skipped by slow shots.
  for (let j = 0; j < transitionFrames; j++) {
    const wall = CINEMA_S + j / FPS;
    await setCaptureClock(page, wall);
    await waitDockScrub(page, wall);
    await seekFilm(page, Math.min(filmCap, wall));
    frame = await shot(page, outDir, frame);
    if (j % 6 === 0 || j === transitionFrames - 1) {
      process.stdout.write(
        `  transition ${((j / transitionFrames) * 100).toFixed(0)}%   \r`,
      );
    }
  }
  process.stdout.write("\n");

  // --- Phase C: docked hold ---
  for (let k = 0; k < holdFrames; k++) {
    const wall = CINEMA_S + TRANSITION_S + k / FPS;
    await setCaptureClock(page, wall);
    await waitDockScrub(page, wall);
    await seekFilm(page, Math.min(filmCap, wall));
    frame = await shot(page, outDir, frame);
    if (k % FPS === 0) {
      process.stdout.write(`  docked hold ${k / FPS}s   \r`);
    }
  }
  process.stdout.write("\n");

  await browser.close();
  return {
    totalFrames: frame,
    dockFrame: cinemaFrames,
    transitionFrames,
  };
}

function encode(outDir, outMp4, w, h) {
  ensureDir(path.dirname(outMp4));
  console.log(`encode → ${path.relative(root, outMp4)}`);
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
    "-g",
    "48",
    "-sc_threshold",
    "0",
    "-movflags",
    "+faststart",
    "-vf",
    `scale=${w}:${h}:flags=lanczos`,
    outMp4,
  ]);
}

async function main() {
  ensureDir(FRAME_ROOT);
  const doPage = PASS === "both" || PASS === "page";
  const doFs = PASS === "both" || PASS === "fs";
  let meta = null;
  let dirPage = path.join(FRAME_ROOT, "page");

  if (doPage) {
    meta = await capturePass(VIEWPORT, dirPage);
    encode(dirPage, OUT_VIDEO, VIEWPORT.width, VIEWPORT.height);
  }
  if (doFs) {
    meta = await capturePass(VIEWPORT_FS, path.join(FRAME_ROOT, "fs"));
    encode(
      path.join(FRAME_ROOT, "fs"),
      OUT_VIDEO_FS,
      VIEWPORT_FS.width,
      VIEWPORT_FS.height,
    );
  }

  // Thumb: fully docked (after transition)
  if (doPage && meta && fs.existsSync(dirPage)) {
    const idx = Math.min(
      meta.totalFrames - 1,
      meta.dockFrame + meta.transitionFrames + Math.round(1.5 * FPS),
    );
    const mid = path.join(dirPage, `f-${String(idx).padStart(5, "0")}.png`);
    if (fs.existsSync(mid)) {
      ensureDir(path.dirname(OUT_THUMB));
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
        "90",
        OUT_THUMB,
      ]);
    }
  }

  for (const f of [OUT_VIDEO, OUT_VIDEO_FS, OUT_THUMB]) {
    if (!fs.existsSync(f)) continue;
    console.log(
      `✓ ${path.relative(root, f)}  ${(fs.statSync(f).size / 1024 / 1024).toFixed(2)} MB`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
