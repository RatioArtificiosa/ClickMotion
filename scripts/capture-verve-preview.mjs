/**
 * Capture VERVE SOCIAL (MS-HERO-VERV01) storefront dual previews.
 * Free-play culture film seeked 1× presentation time.
 * Marquee is frame-scrubbed (not wall-clock CSS) so it flows linearly in the burn.
 *
 *   node scripts/capture-verve-preview.mjs
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
  process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-verve";
const PASS = (process.env.CAPTURE_PASS || "both").toLowerCase();

const OUT_VIDEO = path.join(
  root,
  "public/assets/videos/verve-preview-v1.mp4",
);
const OUT_VIDEO_FS = path.join(
  root,
  "public/assets/videos/verve-preview-fs-v1.mp4",
);
const OUT_THUMB = path.join(root, "public/thumbnails/MS-HERO-VERV01.webp");
const FRAME_ROOT = path.join(root, "tmp/verve-preview-frames");

const FPS = 24;
/** ~ full client film length for storefront (operator film is ~15s) */
const DURATION_S = 15;
/** Must match live hero keyframe period (one full loop of -50% track). */
const MARQUEE_PERIOD_S = 42;
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

async function rAF2(page) {
  await page.evaluate(
    () =>
      new Promise((r) => {
        requestAnimationFrame(() => requestAnimationFrame(() => r()));
      }),
  );
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

/**
 * Drive marquee position from presentation time (not wall clock).
 * CSS animation time between screenshots is uneven → stutter; scrub fixes it.
 */
async function scrubMarquee(page, wallS, periodS) {
  await page.evaluate(
    ({ wall, period }) => {
      const track = document.querySelector("[data-verve-marquee-track]");
      if (!track) return;

      // Kill CSS timeline so it cannot fight the transform
      try {
        track.getAnimations?.().forEach((a) => {
          try {
            a.cancel();
          } catch {
            /* ignore */
          }
        });
      } catch {
        /* ignore */
      }
      track.style.animation = "none";
      track.style.willChange = "transform";
      track.style.backfaceVisibility = "hidden";

      // Full loop is -50% of dual-row track (identical half loops)
      const phase = ((wall % period) + period) % period;
      const pct = (phase / period) * 50;
      track.style.transform = `translate3d(-${pct}%, 0, 0)`;
    },
    { wall: wallS, period: periodS },
  );
}

async function prepareCaptureUi(page) {
  await page.evaluate(() => {
    // Freeze Framer entrance so type is fully on for the whole burn
    document.querySelectorAll("[style*='opacity']").forEach(() => {});
    document.querySelectorAll("section *").forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      // Only lift opacity on motion shells that might still be mid-stagger
      const s = getComputedStyle(el);
      if (s.opacity !== "1" && el.closest("[class*='motion']") === null) {
        /* leave */
      }
    });
    // Pause any remaining CSS animations except we fully drive marquee
    try {
      document.getAnimations({ subtree: true }).forEach((anim) => {
        const name = String(anim.animationName || "");
        if (name.includes("verve-marquee") || name.includes("verveMarquee")) {
          anim.cancel();
        }
      });
    } catch {
      /* ignore */
    }
  });
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

  console.log(`→ ${URL} @ ${viewport.width}×${viewport.height}`);
  console.log(
    `  0–${DURATION_S}s free-play burn (1× film + linear marquee scrub ${MARQUEE_PERIOD_S}s loop)`,
  );

  await page.goto(URL, { waitUntil: "load", timeout: 120000 });
  await page.evaluate(STRIP);
  await page
    .waitForFunction(
      () => {
        const v = document.querySelector("video");
        const track = document.querySelector("[data-verve-marquee-track]");
        return v && v.readyState >= 2 && v.duration > 0 && !!track;
      },
      { timeout: 90000 },
    )
    .catch(() => {});
  // Let Framer entrance settle so type is fully visible for the burn
  await page.waitForTimeout(2200);
  await prepareCaptureUi(page);

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
    mediaDuration > 0.5 ? mediaDuration * 0.995 : DURATION_S;
  const totalFrames = Math.round(DURATION_S * FPS);
  let frame = 0;

  for (let i = 0; i < totalFrames; i++) {
    const wall = i / FPS;
    const filmT = Math.min(filmCap, wall);
    await seekFilm(page, filmT);
    await scrubMarquee(page, wall, MARQUEE_PERIOD_S);
    await rAF2(page);
    frame = await shot(page, outDir, frame);
    if (i % FPS === 0) {
      process.stdout.write(`  t ${wall.toFixed(1)}s / ${DURATION_S}s   \r`);
    }
  }
  process.stdout.write("\n");
  await browser.close();
  return { totalFrames: frame };
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
  let dirPage = path.join(FRAME_ROOT, "page");

  if (doPage) {
    await capturePass(VIEWPORT, dirPage);
    encode(dirPage, OUT_VIDEO, VIEWPORT.width, VIEWPORT.height);
  }
  if (doFs) {
    await capturePass(VIEWPORT_FS, path.join(FRAME_ROOT, "fs"));
    encode(
      path.join(FRAME_ROOT, "fs"),
      OUT_VIDEO_FS,
      VIEWPORT_FS.width,
      VIEWPORT_FS.height,
    );
  }

  if (doPage && fs.existsSync(dirPage)) {
    const mid = path.join(dirPage, `f-${String(Math.round(3 * FPS)).padStart(5, "0")}.png`);
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
