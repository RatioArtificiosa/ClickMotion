/**
 * Burn SkySpires HUD + full sunrise film into storefront preview videos.
 * Same method as Elyse / Vertex: frame loop + setProgress 0…1 over the
 * entire client film. No jump cuts. Next.js dev chrome is stripped
 * before first paint so it cannot land in the take.
 *
 * Usage:
 *   node scripts/capture-skyspires-preview.mjs
 *   node scripts/capture-skyspires-preview.mjs http://127.0.0.1:3008/demo/cleanroom-skyspires
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
  process.argv[2] || "http://127.0.0.1:3008/demo/cleanroom-skyspires";
const OUT_DIR = path.join(root, "tmp", "skyspires-preview-frames");
const OUT_VIDEO = path.join(
  root,
  "public",
  "assets",
  "videos",
  "skyspires-preview-v1.mp4",
);
const OUT_VIDEO_FS = path.join(
  root,
  "public",
  "assets",
  "videos",
  "skyspires-preview-fs-v1.mp4",
);
const OUT_POSTER = path.join(
  root,
  "public",
  "assets",
  "posters",
  "skyspires-preview-v1.webp",
);
const OUT_THUMB = path.join(root, "public", "thumbnails", "MS-HERO-SKYS01.webp");
const FPS = 24;
const VIEWPORT = { width: 1440, height: 900 };

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
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
      }
      [data-ms-scroll-cue] { display: none !important; }
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
  const r = spawnSync(ffmpeg, args, { encoding: "utf8" });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error(`ffmpeg failed: ${args.slice(0, 8).join(" ")}…`);
  }
}

function stripDevChrome(page) {
  return page.evaluate(() => {
    document
      .querySelectorAll(
        "nextjs-portal, [data-nextjs-toast], [data-nextjs-dialog-overlay], [data-nextjs-dialog], [data-next-badge-root], [data-nextjs-dev-overlay], #__next-build-watcher",
      )
      .forEach((el) => el.remove());
  });
}

async function main() {
  if (!fs.existsSync(ffmpeg)) {
    throw new Error(`ffmpeg not found at ${ffmpeg}`);
  }

  cleanDir(OUT_DIR);
  ensureDir(path.dirname(OUT_VIDEO));
  ensureDir(path.dirname(OUT_POSTER));
  ensureDir(path.dirname(OUT_THUMB));

  console.log("SkySpires storefront burn — full film, linear 0…1");
  console.log("  URL", URL);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
  });
  await page.addInitScript({ content: STRIP_DEV_CHROME });
  await page.goto(URL, { waitUntil: "load", timeout: 90_000 });
  await page.evaluate(STRIP_DEV_CHROME);

  await page.waitForFunction(
    () => {
      const v = document.querySelector("video");
      const api = window.__msScrollNarrative;
      return (
        v &&
        v.readyState >= 2 &&
        v.duration > 1 &&
        api &&
        typeof api.setProgress === "function"
      );
    },
    { timeout: 60_000 },
  );
  await page.waitForTimeout(900);
  await stripDevChrome(page);

  const mediaDuration = await page.evaluate(() => {
    const v = document.querySelector("video");
    if (!v) return 0;
    v.pause();
    v.muted = true;
    v.loop = false;
    return Number.isFinite(v.duration) ? v.duration : 0;
  });
  if (mediaDuration < 2) {
    throw new Error(`SkySpires film not ready (duration=${mediaDuration})`);
  }

  const durationS = mediaDuration;
  const totalFrames = Math.max(24, Math.round(durationS * FPS));
  console.log(
    `  film ${mediaDuration.toFixed(2)}s → ${totalFrames} frames @ ${FPS}fps`,
  );

  await page.evaluate(() => {
    window.__msScrollNarrative?.setProgress(0);
    window.__msScrollNarrative?.setHudClock?.(0);
    for (const anim of document.getAnimations()) {
      try {
        anim.pause();
        anim.currentTime = 0;
      } catch {
        /* ignore */
      }
    }
  });
  await page.waitForTimeout(400);
  await stripDevChrome(page);
  await page.screenshot({
    path: path.join(OUT_DIR, "preflight.png"),
    type: "png",
  });

  for (let i = 0; i < totalFrames; i++) {
    const t = totalFrames <= 1 ? 0 : i / (totalFrames - 1);
    const progress = Math.min(1, Math.max(0, t));

    const filmSec = progress * mediaDuration;
    await page.evaluate(
      ({ p, filmSec: seconds }) => {
        const api = window.__msScrollNarrative;
        api?.setProgress(p);
        api?.setHudClock?.(seconds);
        const tMs = seconds * 1000;
        for (const anim of document.getAnimations()) {
          try {
            anim.pause();
            const timing = anim.effect?.getComputedTiming?.();
            const dur =
              typeof timing?.duration === "number" && timing.duration > 0
                ? timing.duration
                : 0;
            anim.currentTime = dur > 0 ? tMs % dur : tMs;
          } catch {
            /* ignore unpausable animations */
          }
        }
      },
      { p: progress, filmSec },
    );

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
            if (v.seeking) {
              v.addEventListener("seeked", done, { once: true });
              setTimeout(done, 400);
            } else {
              setTimeout(resolve, 16);
            }
          });
        }),
    );
    await stripDevChrome(page);
    await page.waitForTimeout(18);

    const file = path.join(
      OUT_DIR,
      `frame-${String(i + 1).padStart(4, "0")}.png`,
    );
    await page.screenshot({ path: file, type: "png" });

    if (i % FPS === 0 || i === totalFrames - 1) {
      console.log(
        `  frame ${i + 1}/${totalFrames} progress=${progress.toFixed(3)}`,
      );
    }
  }

  await browser.close();

  console.log("Encoding page + fullscreen…");
  const pattern = path.join(OUT_DIR, "frame-%04d.png");
  runFfmpeg([
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
    "20",
    "-pix_fmt",
    "yuv420p",
    "-g",
    "48",
    "-keyint_min",
    "24",
    "-sc_threshold",
    "0",
    "-bf",
    "2",
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
    pattern,
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
    "-g",
    "48",
    "-keyint_min",
    "24",
    "-sc_threshold",
    "0",
    "-bf",
    "2",
    "-movflags",
    "+faststart",
    "-an",
    OUT_VIDEO_FS,
  ]);

  const midIdx = Math.min(
    totalFrames,
    Math.max(1, Math.floor(totalFrames * 0.35)),
  );
  const stillSrc = path.join(
    OUT_DIR,
    `frame-${String(midIdx).padStart(4, "0")}.png`,
  );
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
    OUT_POSTER,
  ]);
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
    OUT_THUMB,
  ]);

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
        frames: totalFrames,
        fps: FPS,
        durationS,
        sizeMb,
        sizeFsMb,
      },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
