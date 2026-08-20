/**
 * Capture BLOOM (MS-HERO-BLOM01) designed cleanroom into storefront dual previews.
 * Burns: free-play class film (seeked 1×) + Kids path → Teens restage mid-loop.
 *
 * Storefront only — product runtime never seeks from scroll.
 *
 * Usage:
 *   node scripts/capture-bloom-preview.mjs
 *   node scripts/capture-bloom-preview.mjs http://127.0.0.1:3004/demo/cleanroom-bloom
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
  process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-bloom";
const PASS = (process.env.CAPTURE_PASS || "both").toLowerCase();

const OUT_VIDEO = path.join(
  root,
  "public",
  "assets",
  "videos",
  "bloom-preview-v1.mp4",
);
const OUT_VIDEO_FS = path.join(
  root,
  "public",
  "assets",
  "videos",
  "bloom-preview-fs-v1.mp4",
);
const OUT_POSTER = path.join(
  root,
  "public",
  "assets",
  "posters",
  "bloom-preview-v1.webp",
);
const OUT_THUMB = path.join(root, "public", "thumbnails", "MS-HERO-BLOM01.webp");
const FRAME_ROOT = path.join(root, "tmp", "bloom-preview-frames");

const FPS = 24;
/** Presentation length — show Kids, then Teens restage (not full 45s film). */
const DURATION_S = 14;
const TEENS_AT_S = 7.0;
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

async function stripChrome(page) {
  await page.evaluate(() => {
    document
      .querySelectorAll(
        "nextjs-portal, [data-nextjs-toast], [data-nextjs-dialog-overlay], [data-nextjs-dialog], [data-next-badge-root], [data-nextjs-dev-overlay], #__next-build-watcher"
      )
      .forEach((el) => el.remove());
  });
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

async function clickTeens(page) {
  const tab = page.locator('button[role="tab"]', { hasText: /^Teens$/i });
  if ((await tab.count()) > 0) {
    await tab.first().click({ force: true });
    await page.waitForTimeout(450);
  }
}

async function clickKids(page) {
  const tab = page.locator('button[role="tab"]', { hasText: /^Kids$/i });
  if ((await tab.count()) > 0) {
    await tab.first().click({ force: true });
    await page.waitForTimeout(300);
  }
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
  await page.waitForTimeout(2000);
  await stripChrome(page);

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
    // Kill free-run so seek owns time
    v.play = () => Promise.resolve();
    v.autoplay = false;
    return Number.isFinite(v.duration) ? v.duration : 0;
  });

  const scrubLen =
    mediaDuration > 0.5
      ? Math.min(DURATION_S, mediaDuration * 0.95)
      : DURATION_S;
  const totalFrames = Math.round(DURATION_S * FPS);
  const teensAtFrame = Math.round(TEENS_AT_S * FPS);

  console.log(
    JSON.stringify({
      mediaDuration: +mediaDuration.toFixed(2),
      scrubLen: +scrubLen.toFixed(2),
      totalFrames,
      teensAtFrame,
    }),
  );

  // Start Kids path, hold first frame for entrance settle
  await clickKids(page);
  await seekFilm(page, 0);
  await page.waitForTimeout(2200);
  await stripChrome(page);

  let teensClicked = false;

  for (let i = 0; i < totalFrames; i++) {
    const wall = i / FPS;
    const t = totalFrames <= 1 ? 0 : i / (totalFrames - 1);
    const filmT = Math.min(scrubLen * 0.995, t * scrubLen);

    if (!teensClicked && i >= teensAtFrame) {
      await clickTeens(page);
      teensClicked = true;
      // Pick a middle module chip if present (showcase restage)
      const chips = page.locator("button").filter({ hasText: /Flow|Focus|Stretch/i });
      if ((await chips.count()) > 0) {
        await chips.first().click({ force: true }).catch(() => {});
        await page.waitForTimeout(200);
      }
    }

    await seekFilm(page, filmT);
    await stripChrome(page);

    const file = path.join(outDir, `f-${String(i).padStart(5, "0")}.png`);
    await page.screenshot({ path: file, type: "png" });

    if (i % FPS === 0 || i === totalFrames - 1) {
      process.stdout.write(
        `  frame ${i + 1}/${totalFrames}  film=${filmT.toFixed(2)}s  wall=${wall.toFixed(1)}s  ${teensClicked ? "teens" : "kids"}   \r`,
      );
    }
  }
  process.stdout.write("\n");

  await browser.close();
  return { totalFrames, scrubLen };
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
    "16",
    "-pix_fmt",
    "yuv420p",
    "-profile:v",
    "high",
    "-g",
    "48",
    "-keyint_min",
    "24",
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

  let dirPage = path.join(FRAME_ROOT, "page");
  let meta = null;

  if (doPage) {
    meta = await capturePass(VIEWPORT, dirPage);
    encodeFromFrames(dirPage, OUT_VIDEO, VIEWPORT.width, VIEWPORT.height);
  }

  if (doFs) {
    const dirFs = path.join(FRAME_ROOT, "fs");
    meta = await capturePass(VIEWPORT_FS, dirFs);
    encodeFromFrames(dirFs, OUT_VIDEO_FS, VIEWPORT_FS.width, VIEWPORT_FS.height);
  }

  if (doPage && fs.existsSync(dirPage) && meta) {
    // Mid Kids frame for thumb (before teens switch) — best product card
    const kidsMid = Math.min(
      meta.totalFrames - 1,
      Math.floor(TEENS_AT_S * 0.55 * FPS),
    );
    const mid = path.join(
      dirPage,
      `f-${String(kidsMid).padStart(5, "0")}.png`,
    );
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
