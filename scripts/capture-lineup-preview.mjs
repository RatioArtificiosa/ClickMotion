/**
 * Capture LINEUP product reveal — natural can entrances (storefront).
 *
 * Choreography per SKU:
 *   1. HOLD settled product (readable beat)
 *   2. SLOW scroll across the index threshold
 *   3. SETTLE — stop scrolling; capture full GSAP can cross-fade
 *      (opacity + x + rot + scale into place)
 *   4. HOLD new product
 *
 * Ends on last SKU. Never rewinds to first (avoids loop jump-cut mid-file).
 *
 * Usage:
 *   node scripts/capture-lineup-preview.mjs              # page only (default)
 *   node scripts/capture-lineup-preview.mjs --page-only
 *   node scripts/capture-lineup-preview.mjs --all         # page + fullscreen
 *   node scripts/capture-lineup-preview.mjs --fs-only
 *   node scripts/capture-lineup-preview.mjs [url] [--page-only|--all|--fs-only]
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

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const flags = new Set(process.argv.slice(2).filter((a) => a.startsWith("--")));
const PAGE_ONLY = flags.has("--page-only") || (!flags.has("--all") && !flags.has("--fs-only"));
const FS_ONLY = flags.has("--fs-only");
const DO_PAGE = !FS_ONLY;
const DO_FS = flags.has("--all") || FS_ONLY;

const BASE = args[0] || "http://127.0.0.1:3004/demo/cleanroom-lineup";
const URL = BASE.includes("?")
  ? `${BASE}&record=1`
  : `${BASE}?record=1`;

const OUT_VIDEO = path.join(
  root,
  "public",
  "assets",
  "videos",
  "lineup-reveal-preview-v1.mp4",
);
const OUT_VIDEO_FS = path.join(
  root,
  "public",
  "assets",
  "videos",
  "lineup-reveal-preview-fs-v1.mp4",
);
const OUT_POSTER = path.join(
  root,
  "public",
  "assets",
  "posters",
  "lineup-reveal-preview-v1.webp",
);
const OUT_THUMB = path.join(root, "public", "thumbnails", "MS-SEC-LINE01.webp");
const WORK = path.join(root, "tmp", "lineup-premium-capture");

const VIEWPORT = { width: 1440, height: 900 };
const VIEWPORT_FS = { width: 1920, height: 1080 };

const PRODUCTS = 3;
/**
 * Pin progress centers — deep inside each third so index is stable.
 * Index flips at floor(progress * N): 0 | 0.333 | 0.666
 */
const HOLD_PROGRESS = [0.12, 0.45, 0.78];
/** Threshold where product index changes (i / N). */
const THRESHOLDS = [1 / 3, 2 / 3];

const CAPTURE_FPS = 30;
const FRAME_MS = Math.round(1000 / CAPTURE_FPS);

/**
 * Natural tasting pacing (ms).
 *
 * Critical: can entrance GSAP starts when index flips. If we keep scrolling
 * for 3s after the flip, the 1.45s entrance finishes off-camera. So we:
 *   1) Approach to just BEFORE threshold (still old product)
 *   2) Cross threshold quickly (index flips, entrance STARTS)
 *   3) STOP scroll and settle for the full entrance (can moves into place)
 *   4) Hold settled product
 */
const INTRO_HOLD_MS = 4500;
const HOLD_MS = 4000;
/** Drift toward threshold while still on current product. */
const APPROACH_MS = 2200;
const APPROACH_STEPS = 56;
/** Cross the flip point — short so entrance starts at settle. */
const CROSS_MS = 900;
const CROSS_STEPS = 28;
/**
 * Frame-driven can entrance via window.__lineupDriveEntrance.
 * ~66 frames of readable slide / fade / scale into place.
 */
const ENTRANCE_FRAMES = 66;
/** Short final beat on Dusk — no long dead tail. */
const OUTRO_HOLD_MS = 1600;

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

function runFfmpeg(argsList) {
  const r = spawnSync(ffmpeg, argsList, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error(`ffmpeg failed: ${argsList.slice(0, 12).join(" ")}`);
  }
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Let browser paint GSAP + WebGL (critical between screenshots). */
async function paint(page, frames = 2) {
  await page.evaluate(
    (n) =>
      new Promise((resolve) => {
        let i = 0;
        const step = () => {
          i += 1;
          if (i >= n) resolve();
          else requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }),
    frames,
  );
}

async function scrollToY(page, y) {
  await page.evaluate((yy) => {
    window.scrollTo(0, yy);
    const l = window.__msLenis;
    if (l?.scrollTo) l.scrollTo(yy, { immediate: true });
  }, y);
  await paint(page, 2);
}

async function measureScrollMax(page) {
  return page.evaluate(({ n }) => {
    const vh = window.innerHeight;
    const pin = vh * n;
    const doc = Math.max(0, document.documentElement.scrollHeight - vh);
    return Math.min(Math.round(pin * 1.02), doc > 0 ? doc : pin);
  }, { n: PRODUCTS });
}

async function waitForCanPainted(page) {
  await page.waitForSelector("#flavors canvas", { timeout: 90000 });
  await sleep(2200);
  for (let i = 0; i < 40; i++) {
    const ok = await page.evaluate(() => {
      const c = document.querySelector("#flavors canvas");
      if (!c) return false;
      const r = c.getBoundingClientRect();
      return r.width > 80 && r.height > 80 && c.width > 64;
    });
    if (ok) break;
    await sleep(200);
  }
  // First can fully in
  await sleep(1600);
}

function createRecorder(page, framesDir) {
  ensureDir(framesDir);
  let idx = 0;
  return {
    async frame() {
      // Always paint before shot so GSAP mid-tween is current
      await paint(page, 1);
      const file = path.join(
        framesDir,
        `f-${String(idx).padStart(5, "0")}.png`,
      );
      await page.screenshot({ path: file, type: "png", animations: "allow" });
      idx += 1;
    },
    get count() {
      return idx;
    },
  };
}

/**
 * Hold still — capture frames while WebGL keeps ticking.
 * Wall-clock paced to ~CAPTURE_FPS.
 */
async function captureHold(page, rec, ms, label) {
  const n = Math.max(1, Math.round(ms / FRAME_MS));
  console.log(`  ${label} · ${n} frames (~${(ms / 1000).toFixed(1)}s)`);
  for (let i = 0; i < n; i++) {
    const t0 = Date.now();
    await rec.frame();
    await sleep(Math.max(8, FRAME_MS - (Date.now() - t0)));
  }
}

/**
 * Drive can entrance pose 0→1 across N frames (deterministic, no GSAP lag).
 * This is what makes the can READABLY slide/fade/scale into the scene.
 */
async function captureCanEntrance(page, rec, productIndex, frames, label) {
  console.log(
    `  ${label} · ${frames} frames (driven entrance, product ${productIndex + 1})`,
  );
  for (let i = 0; i <= frames; i++) {
    const t = i / frames;
    const e = easeInOutCubic(t);
    await page.evaluate(
      ({ idx, p }) => {
        const fn = window.__lineupDriveEntrance;
        if (typeof fn === "function") fn(idx, p);
      },
      { idx: productIndex, p: e },
    );
    await paint(page, 2);
    await rec.frame();
    await sleep(10);
  }
  // Land fully settled
  await page.evaluate(({ idx }) => {
    window.__lineupDriveEntrance?.(idx, 1);
  }, { idx: productIndex });
  await paint(page, 2);
}

/**
 * Slow ease scroll from one hold progress to the next.
 * Index flips mid-way; can begins exiting then entering.
 */
async function captureEaseScroll(
  page,
  rec,
  scrollMax,
  fromP,
  toP,
  steps,
  totalMs,
) {
  const stepMs = Math.max(FRAME_MS, Math.round(totalMs / steps));
  const y0 = Math.round(fromP * scrollMax);
  const y1 = Math.round(toP * scrollMax);
  console.log(
    `  Scroll · ${fromP.toFixed(2)}→${toP.toFixed(2)} · ${steps} steps / ${(totalMs / 1000).toFixed(1)}s`,
  );
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const e = easeInOutCubic(t);
    await scrollToY(page, Math.round(y0 + (y1 - y0) * e));
    const t0 = Date.now();
    await rec.frame();
    await sleep(Math.max(6, stepMs - (Date.now() - t0)));
  }
}

async function capturePass(viewport, label) {
  const outDir = path.join(WORK, label);
  const framesDir = path.join(outDir, "frames");
  cleanDir(outDir);
  ensureDir(framesDir);
  const dawnStill = path.join(outDir, "dawn.png");

  console.log(`\n→ ${URL}`);
  console.log(`  ${viewport.width}×${viewport.height}  [${label}]`);

  const browser = await chromium.launch({
    headless: true,
    args: [
      "--use-gl=angle",
      "--ignore-gpu-blocklist",
      "--disable-dev-shm-usage",
      "--enable-webgl",
      "--use-angle=d3d11",
    ],
  });
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    hasTouch: false,
  });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForSelector("#flavors", { timeout: 60000 });
  await waitForCanPainted(page);

  const scrollMax = await measureScrollMax(page);
  const targets = HOLD_PROGRESS.map((p) => Math.min(0.9, Math.max(0.004, p)));
  console.log(
    `  scrollMax≈${scrollMax}px  holds ${targets.map((p) => p.toFixed(2)).join(" → ")}`,
  );

  const rec = createRecorder(page, framesDir);

  // ── Open on Clear, fully settled ──────────────────────────────
  await scrollToY(page, Math.round(targets[0] * scrollMax));
  await sleep(500);
  await captureHold(page, rec, INTRO_HOLD_MS, "① Hold Clear (settled)");

  for (let i = 0; i < PRODUCTS - 1; i++) {
    const from = targets[i];
    const to = targets[i + 1];
    const thr = THRESHOLDS[i];
    // Stay on current product until just before flip
    const preCross = Math.max(from + 0.02, thr - 0.035);
    // Land just past flip so activeIndex is the next product
    const postCross = Math.min(to, thr + 0.04);
    const nextLabel = i === 0 ? "Dawn" : "Dusk";

    // ── 1. Approach (still old product — can stays) ─────────────
    await captureEaseScroll(
      page,
      rec,
      scrollMax,
      from,
      preCross,
      APPROACH_STEPS,
      APPROACH_MS,
    );

    // ── 2. Cross threshold (index flips; start pose is off-stage) ──
    await captureEaseScroll(
      page,
      rec,
      scrollMax,
      preCross,
      postCross,
      CROSS_STEPS,
      CROSS_MS,
    );
    // Brief beat so React commits activeIndex + start pose
    await sleep(120);
    await paint(page, 3);

    // ── 3. STOP scroll — DRIVE can into place frame-by-frame ─────
    await captureCanEntrance(
      page,
      rec,
      i + 1,
      ENTRANCE_FRAMES,
      `② Can moves into place · ${nextLabel}`,
    );

    // Nudge to final hold progress (can already settled)
    await captureEaseScroll(
      page,
      rec,
      scrollMax,
      postCross,
      to,
      18,
      700,
    );

    if (i === 0) {
      await page.screenshot({ path: dawnStill, type: "png" });
      console.log(`  poster → ${path.relative(root, dawnStill)}`);
    }

    // ── 4. Settled product hold ─────────────────────────────────
    await captureHold(
      page,
      rec,
      HOLD_MS,
      `③ Hold ${nextLabel} (settled)`,
    );
  }

  // Short outro on Dusk only — never rewind to Clear
  await captureHold(page, rec, OUTRO_HOLD_MS, "④ Outro Dusk (end)");

  console.log(`  total frames ${rec.count} (~${(rec.count / CAPTURE_FPS).toFixed(1)}s)`);

  await page.close();
  await context.close();
  await browser.close();

  if (rec.count < CAPTURE_FPS * 10) {
    throw new Error(`Too few frames: ${rec.count}`);
  }

  return {
    framesDir,
    frameCount: rec.count,
    dawnStill: fs.existsSync(dawnStill) ? dawnStill : null,
  };
}

function encodeFrames(framesDir, outMp4, w, h) {
  console.log(`encode → ${path.relative(root, outMp4)}`);
  const n = fs
    .readdirSync(framesDir)
    .filter((f) => f.startsWith("f-") && f.endsWith(".png")).length;
  console.log(`  ${n} frames @ ${CAPTURE_FPS}fps ≈ ${(n / CAPTURE_FPS).toFixed(1)}s`);

  runFfmpeg([
    "-y",
    "-framerate",
    String(CAPTURE_FPS),
    "-i",
    path.join(framesDir, "f-%05d.png"),
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "12",
    "-pix_fmt",
    "yuv420p",
    "-profile:v",
    "high",
    "-tune",
    "animation",
    "-movflags",
    "+faststart",
    "-vf",
    `scale=${w}:${h}:flags=lanczos,setsar=1`,
    outMp4,
  ]);
}

async function main() {
  ensureDir(path.dirname(OUT_VIDEO));
  ensureDir(path.dirname(OUT_POSTER));
  ensureDir(path.dirname(OUT_THUMB));
  ensureDir(WORK);

  console.log(
    `Mode: ${DO_PAGE && DO_FS ? "page + fs" : DO_PAGE ? "PAGE ONLY (await approval before fs)" : "fs only"}`,
  );

  let pagePass = null;

  if (DO_PAGE) {
    pagePass = await capturePass(VIEWPORT, "page");
    encodeFrames(pagePass.framesDir, OUT_VIDEO, VIEWPORT.width, VIEWPORT.height);

    const still =
      pagePass.dawnStill && fs.existsSync(pagePass.dawnStill)
        ? pagePass.dawnStill
        : path.join(
            pagePass.framesDir,
            `f-${String(Math.floor(pagePass.frameCount * 0.4)).padStart(5, "0")}.png`,
          );

    runFfmpeg([
      "-y",
      "-i",
      still,
      "-frames:v",
      "1",
      "-c:v",
      "libwebp",
      "-quality",
      "95",
      OUT_POSTER,
    ]);
    runFfmpeg([
      "-y",
      "-i",
      still,
      "-frames:v",
      "1",
      "-vf",
      "scale=720:-1:flags=lanczos",
      "-c:v",
      "libwebp",
      "-quality",
      "92",
      OUT_THUMB,
    ]);

    const st = fs.statSync(OUT_VIDEO);
    console.log(
      `\n✓ PAGE ready: ${path.relative(root, OUT_VIDEO)}  ${(st.size / 1024 / 1024).toFixed(2)} MB`,
    );
    console.log(
      "  Review this video. If approved, run: node scripts/capture-lineup-preview.mjs --fs-only",
    );
  }

  if (DO_FS) {
    const fsPass = await capturePass(VIEWPORT_FS, "fs");
    encodeFrames(
      fsPass.framesDir,
      OUT_VIDEO_FS,
      VIEWPORT_FS.width,
      VIEWPORT_FS.height,
    );
    console.log(
      `✓ FS ready: ${path.relative(root, OUT_VIDEO_FS)}  ${(fs.statSync(OUT_VIDEO_FS).size / 1024 / 1024).toFixed(2)} MB`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
