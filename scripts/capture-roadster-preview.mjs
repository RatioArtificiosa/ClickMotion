/**
 * Capture Roadster Studio Drive (MS-HERO-ROAD01) full designed page
 * into storefront dual previews — not bare film.
 *
 * Burns: soft open → scroll cards → film finishes front pose → pull-up sheet + 3D.
 *
 * Hybrid capture law (storefront only — product runtime never scrubs film):
 *   - Film: PAUSED + seek currentTime to presentation time (1×)
 *   - UI scroll: panels for almost the full film; sheet starts ~1s before film end
 *     so the studio car is seen in its front pose again before the black card rises
 *   - GLB spin: window.__MS_CAPTURE_CLOCK = presentation seconds so useFrame
 *     drives absolute angle (1×). Free-running RAF dt during settle waits was 3–5× fast.
 *
 * Usage:
 *   node scripts/capture-roadster-preview.mjs
 *   node scripts/capture-roadster-preview.mjs http://127.0.0.1:3004/demo/cleanroom-roadster
 *   CAPTURE_PASS=page|fs|both  (default both)
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
  process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-roadster";
const PASS = (process.env.CAPTURE_PASS || "both").toLowerCase();

const OUT_VIDEO = path.join(
  root,
  "public",
  "assets",
  "videos",
  "roadster-studio-drive-preview-v1.mp4",
);
const OUT_VIDEO_FS = path.join(
  root,
  "public",
  "assets",
  "videos",
  "roadster-studio-drive-preview-fs-v1.mp4",
);
const OUT_POSTER = path.join(
  root,
  "public",
  "assets",
  "posters",
  "roadster-studio-drive-v1.webp",
);
const OUT_THUMB = path.join(root, "public", "thumbnails", "MS-HERO-ROAD01.webp");
const FRAME_ROOT = path.join(root, "tmp", "roadster-preview-frames");

/** Premium presentation encode */
const FPS = 24;
const VIEWPORT = { width: 1440, height: 900 };
const VIEWPORT_FS = { width: 1920, height: 1080 };

/** Track fractions from product (12 panel + 1.3 sheet virtual viewports). */
const PANEL_END = 12 / 13.3;

/** Timeline (seconds of encode) — sheet only after film nears front/end pose. */
const SOFT_OPEN_S = 1.0;
/** Start raising sheet this many seconds before film end. */
const SHEET_LEAD_S = 1.0;
/** Encode time for sheet pull-up (ease). */
const SHEET_PULL_S = 4.0;
/** Hold docked sheet + 1× spin. */
const SHEET_HOLD_S = 5.5;

const ffmpeg =
  process.env.FFMPEG_PATH ||
  (() => {
    try {
      return require("ffmpeg-static");
    } catch {
      return path.join(root, "node_modules", "ffmpeg-static", "ffmpeg.exe");
    }
  })();

const STRIP_DEV_CHROME = `
(() => {
  const CSS = \`
    nextjs-portal,
    [data-nextjs-toast],
    [data-nextjs-dialog-overlay],
    [data-nextjs-dialog],
    [data-next-badge-root],
    [data-nextjs-dev-overlay],
    #__next-build-watcher {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
      opacity: 0 !important;
    }
  \`;
  const inject = () => {
    if (!document.getElementById("__ms_strip_dev_chrome")) {
      const s = document.createElement("style");
      s.id = "__ms_strip_dev_chrome";
      s.textContent = CSS;
      (document.head || document.documentElement).appendChild(s);
    }
    document
      .querySelectorAll(
        "nextjs-portal, [data-nextjs-toast], [data-nextjs-dialog-overlay], [data-nextjs-dialog], [data-next-badge-root], [data-nextjs-dev-overlay], #__next-build-watcher"
      )
      .forEach((el) => el.remove());
  };
  inject();
  const obs = new MutationObserver(() => inject());
  obs.observe(document.documentElement, { childList: true, subtree: true });
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
    throw new Error(`ffmpeg failed: ${args.slice(0, 8).join(" ")}…`);
  }
  return r;
}

function easeInOut(t) {
  const x = Math.min(1, Math.max(0, t));
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

/**
 * Build encode timeline from source film length.
 * Panels run for almost the full film; sheet starts at filmEnd - SHEET_LEAD_S.
 */
function buildTimeline(mediaDuration) {
  const film =
    mediaDuration > 0.5 ? mediaDuration : 30;
  // Film plays 0 → (end - lead) during panel phase; then holds near end
  const filmPanelEnd = Math.max(2, film - SHEET_LEAD_S);
  const panelPhaseS = filmPanelEnd; // 1× film under panels
  const totalS =
    SOFT_OPEN_S + panelPhaseS + SHEET_PULL_S + SHEET_HOLD_S;
  const totalFrames = Math.round(totalS * FPS);
  const filmHold = Math.min(film * 0.995, film - 0.04);

  return {
    film,
    filmPanelEnd,
    filmHold,
    panelPhaseS,
    totalS,
    totalFrames,
    softOpenFrames: Math.round(SOFT_OPEN_S * FPS),
    panelEndFrame: Math.round((SOFT_OPEN_S + panelPhaseS) * FPS),
    sheetEndFrame: Math.round(
      (SOFT_OPEN_S + panelPhaseS + SHEET_PULL_S) * FPS,
    ),
  };
}

/**
 * Per-frame sample: scroll progress 0–1 of full track, film time, spin clock, phase.
 */
function sampleFrame(i, tl) {
  const wall = i / FPS;
  const softEnd = SOFT_OPEN_S;
  const panelEnd = softEnd + tl.panelPhaseS;
  const sheetEnd = panelEnd + SHEET_PULL_S;

  // Spin always follows presentation wall (1× rad/s * SPIN_SPEED in product)
  const spinT = wall;

  if (wall <= softEnd) {
    return {
      wall,
      scrollP: 0,
      filmT: 0,
      spinT,
      phase: "open",
    };
  }

  if (wall <= panelEnd) {
    // Map wall → panel progress only (0 → PANEL_END). Sheet stays fully down.
    const u = (wall - softEnd) / tl.panelPhaseS;
    const eased = easeInOut(u);
    return {
      wall,
      scrollP: eased * PANEL_END * 0.999,
      filmT: Math.min(tl.filmPanelEnd, u * tl.filmPanelEnd),
      spinT,
      phase: u < 0.04 ? "cue" : "panels",
    };
  }

  if (wall <= sheetEnd) {
    // Sheet pull-up: raw progress PANEL_END → 1. Film holds front/end pose.
    const u = (wall - panelEnd) / SHEET_PULL_S;
    const eased = easeInOut(u);
    const scrollP = PANEL_END + eased * (1 - PANEL_END);
    // Optional micro-nudge of last second of film as sheet starts (still near front)
    const filmT =
      tl.filmPanelEnd +
      Math.min(SHEET_LEAD_S * 0.9, eased * SHEET_LEAD_S * 0.9);
    return {
      wall,
      scrollP: Math.min(0.998, scrollP),
      filmT: Math.min(tl.filmHold, filmT),
      spinT,
      phase: "sheet",
    };
  }

  // Hold docked sheet; film frozen on front/end pose; spin keeps turning 1×
  return {
    wall,
    scrollP: 0.998,
    filmT: tl.filmHold,
    spinT,
    phase: "hold",
  };
}

async function stripChrome(page) {
  await page.evaluate(() => {
    document
      .querySelectorAll(
        "nextjs-portal, [data-nextjs-toast], [data-nextjs-dialog-overlay], [data-nextjs-dialog], [data-next-badge-root], [data-nextjs-dev-overlay], #__next-build-watcher"
      )
      .forEach((el) => el.remove());
  });
}

async function setProgress(page, g) {
  await page.evaluate((p) => {
    const api = window.__msScrollNarrative;
    if (api && typeof api.setProgress === "function") {
      api.setProgress(p);
      return;
    }
    window.scrollTo(0, 0);
  }, g);
}

async function seekFilm(page, time) {
  await page.evaluate((t) => {
    const v = document.querySelector("video");
    if (!v) return;
    v.muted = true;
    v.loop = true;
    v.pause();
    if (Math.abs((v.currentTime || 0) - t) < 0.001) {
      v.currentTime = Math.max(0, t - 0.001);
    }
    v.currentTime = t;
  }, time);

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
  await page.waitForTimeout(12);
}

/** Drive GLB spin at 1× via product capture clock + force a few rAF ticks. */
async function setCaptureClock(page, seconds) {
  await page.evaluate((t) => {
    window.__MS_CAPTURE_CLOCK = t;
  }, seconds);
  // Give R3F useFrame a beat to apply absolute rotation
  await page.evaluate(
    () =>
      new Promise((r) => {
        requestAnimationFrame(() => requestAnimationFrame(() => r()));
      }),
  );
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
  await page.addInitScript({ content: STRIP_DEV_CHROME });
  // Ensure capture clock exists before any Canvas mounts
  await page.addInitScript({
    content: `window.__MS_CAPTURE_CLOCK = 0;`,
  });

  console.log(`→ ${URL} @ ${viewport.width}×${viewport.height}`);
  await page.goto(URL, { waitUntil: "load", timeout: 120000 });
  await page.evaluate(STRIP_DEV_CHROME);

  await page
    .waitForFunction(
      () => {
        const v = document.querySelector("video");
        return v && v.readyState >= 2 && v.duration > 0;
      },
      { timeout: 90000 },
    )
    .catch(() => {});
  await page.waitForTimeout(1800);
  await stripChrome(page);

  await page
    .waitForSelector(".tesla-roadster-root, video", { timeout: 30000 })
    .catch(() => {});

  await page
    .waitForFunction(() => window.__msScrollNarrative, { timeout: 20000 })
    .catch(() => {});
  const scrollMax = 0;

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
    return Number.isFinite(v.duration) ? v.duration : 0;
  });

  const tl = buildTimeline(mediaDuration);
  console.log(
    JSON.stringify(
      {
        scrollMax: Math.round(scrollMax),
        film: +tl.film.toFixed(2),
        filmPanelEnd: +tl.filmPanelEnd.toFixed(2),
        totalS: +tl.totalS.toFixed(2),
        frames: tl.totalFrames,
        sheetStartsAtFilm: +tl.filmPanelEnd.toFixed(2),
      },
      null,
      0,
    ),
  );

  // Kill product autoplay resume during capture
  await page.evaluate(() => {
    const v = document.querySelector("video");
    if (!v) return;
    try {
      v.pause();
    } catch {
      /* ignore */
    }
    v.play = () => Promise.resolve();
    v.autoplay = false;
    window.__MS_CAPTURE_CLOCK = 0;
  });

  let lastY = 0;
  let lastPhase = "";

  for (let i = 0; i < tl.totalFrames; i++) {
    const s = sampleFrame(i, tl);
    const y = s.scrollP;

    // 1) Film 1x (storefront burn only; client runtime never seeks)
    if (tl.film > 0.5) await seekFilm(page, s.filmT);

    // 2) Drive No Scroller virtual progress
    await setProgress(page, y);

    // 3) GLB spin 1× (presentation clock)
    await setCaptureClock(page, s.spinT);

    const jump = Math.abs(y - lastY);
    lastY = y;
    const settle =
      i === 0
        ? 450
        : s.phase === "sheet" && jump > 2
          ? 110
          : s.phase === "hold"
            ? 55
            : jump > scrollMax * 0.03
              ? 130
              : 75;
    await page.waitForTimeout(settle);

    // Extra settle when sheet first appears (WebGL mount)
    if (s.phase === "sheet" && lastPhase !== "sheet") {
      await page.waitForTimeout(700);
      await setCaptureClock(page, s.spinT);
    }
    lastPhase = s.phase;

    await page.evaluate(() => {
      const v = document.querySelector("video");
      if (v && !v.paused) v.pause();
    });

    await stripChrome(page);
    const file = path.join(outDir, `f-${String(i).padStart(5, "0")}.png`);
    await page.screenshot({ path: file, type: "png" });

    if (i % FPS === 0 || i === tl.totalFrames - 1) {
      process.stdout.write(
        `  frame ${i + 1}/${tl.totalFrames}  film=${s.filmT.toFixed(2)}s  p=${s.scrollP.toFixed(3)}  ${s.phase}   \r`,
      );
    }
  }
  process.stdout.write("\n");

  // Polish last frames: fully docked sheet, front film, advancing spin
  const endY = Math.round(0.998 * scrollMax);
  await setScroll(page, endY);
  await page.waitForTimeout(800);
  for (let k = 0; k < 12; k++) {
    const idx = tl.totalFrames - 12 + k;
    if (idx < 0) continue;
    const s = sampleFrame(idx, tl);
    if (tl.film > 0.5) await seekFilm(page, tl.filmHold);
    await setCaptureClock(page, s.spinT);
    await page.waitForTimeout(50);
    await stripChrome(page);
    const file = path.join(outDir, `f-${String(idx).padStart(5, "0")}.png`);
    await page.screenshot({ path: file, type: "png" });
  }

  await browser.close();
  return tl;
}

function encodeFromFrames(outDir, outMp4, w, h) {
  console.log(`encode → ${path.relative(root, outMp4)}`);
  ensureDir(path.dirname(outMp4));
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
    "15",
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

  ensureDir(FRAME_ROOT);
  const doPage = PASS === "both" || PASS === "page";
  const doFs = PASS === "both" || PASS === "fs";

  let dirPage = path.join(FRAME_ROOT, "page");
  let tl = null;

  if (doPage) {
    tl = await capturePass(VIEWPORT, dirPage);
    encodeFromFrames(dirPage, OUT_VIDEO, VIEWPORT.width, VIEWPORT.height);
  }

  if (doFs) {
    const dirFs = path.join(FRAME_ROOT, "fs");
    tl = await capturePass(VIEWPORT_FS, dirFs);
    encodeFromFrames(dirFs, OUT_VIDEO_FS, VIEWPORT_FS.width, VIEWPORT_FS.height);
  }

  // Poster from hero card mid-panel (~25% into panel phase)
  if (doPage && fs.existsSync(dirPage) && tl) {
    const midIdx = Math.min(
      tl.totalFrames - 1,
      Math.floor((SOFT_OPEN_S + tl.panelPhaseS * 0.12) * FPS),
    );
    const mid = path.join(dirPage, `f-${String(midIdx).padStart(5, "0")}.png`);
    if (fs.existsSync(mid)) {
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
        "92",
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
        "90",
        OUT_THUMB,
      ]);
    }

    // QA stills: front pose just before sheet + mid sheet + docked
    const samples = [
      { i: tl.panelEndFrame - 2, name: "roadster-qa-front-before-sheet" },
      {
        i: Math.floor((tl.panelEndFrame + tl.sheetEndFrame) / 2),
        name: "roadster-qa-sheet-rising",
      },
      { i: tl.totalFrames - 8, name: "roadster-qa-sheet-docked" },
    ];
    for (const { i, name } of samples) {
      const src = path.join(
        dirPage,
        `f-${String(Math.max(0, Math.min(tl.totalFrames - 1, i))).padStart(5, "0")}.png`,
      );
      if (!fs.existsSync(src)) continue;
      const dst = path.join(root, "tmp", `${name}.webp`);
      runFfmpeg([
        "-y",
        "-i",
        src,
        "-frames:v",
        "1",
        "-c:v",
        "libwebp",
        "-quality",
        "88",
        dst,
      ]);
      console.log(`  qa → ${path.relative(root, dst)}`);
    }
  }

  for (const f of [OUT_VIDEO, OUT_VIDEO_FS, OUT_POSTER, OUT_THUMB]) {
    if (!fs.existsSync(f)) continue;
    const st = fs.statSync(f);
    console.log(
      `✓ ${path.relative(root, f)}  ${(st.size / 1024 / 1024).toFixed(2)} MB`,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
