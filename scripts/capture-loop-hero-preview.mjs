/**
 * Burn designed UI onto a presentation loop for gallery/product previews.
 * Pauses the hero video and scrubs currentTime per frame so playback speed
 * matches wall-clock encode rate (not wall-clock sampling of a free-running video).
 *
 * Usage:
 *   node scripts/capture-loop-hero-preview.mjs <url> <outVideoRel> [seconds] [fps]
 *
 * Example:
 *   node scripts/capture-loop-hero-preview.mjs http://127.0.0.1:3004/demo/cleanroom-aether public/assets/videos/aether-preview-v1.mp4 12 24
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const URL = process.argv[2];
const OUT_REL = process.argv[3];
const DURATION_S = Number(process.argv[4] || 12);
const FPS = Number(process.argv[5] || 24);

if (!URL || !OUT_REL) {
  console.error(
    "Usage: node scripts/capture-loop-hero-preview.mjs <url> <outVideoRel> [seconds] [fps]"
  );
  process.exit(1);
}

const OUT_VIDEO = path.isAbsolute(OUT_REL) ? OUT_REL : path.join(root, OUT_REL);
const base = path.basename(OUT_VIDEO, path.extname(OUT_VIDEO));
const OUT_DIR = path.join(root, "tmp", `${base}-frames`);
const OUT_POSTER = path.join(
  root,
  "public",
  "assets",
  "posters",
  `${base}.webp`
);
const OUT_THUMB = path.join(root, "public", "thumbnails", `${base}.webp`);
const TOTAL = Math.max(12, Math.round(DURATION_S * FPS));
const VIEWPORT = {
  width: Number(process.env.CAPTURE_WIDTH || 1440),
  height: Number(process.env.CAPTURE_HEIGHT || 900),
};
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
    throw new Error("ffmpeg failed");
  }
}

async function seekVideo(page, time) {
  await page.evaluate((t) => {
    const v = document.querySelector("video");
    if (!v) return;
    v.pause();
    v.muted = true;
    // Nudge if already at same time so seeked still fires when needed
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
          // Safety timeout if seek never completes
          setTimeout(done, 400);
        } else {
          requestAnimationFrame(() => resolve());
        }
      })
  );
  await page.waitForTimeout(16);
}

async function main() {
  if (!fs.existsSync(ffmpeg)) {
    throw new Error(`ffmpeg not found at ${ffmpeg}`);
  }

  cleanDir(OUT_DIR);
  ensureDir(path.dirname(OUT_VIDEO));
  ensureDir(path.dirname(OUT_POSTER));
  ensureDir(path.dirname(OUT_THUMB));

  console.log({ URL, OUT_VIDEO, TOTAL, FPS, DURATION_S });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
  });

  // Kill Next.js dev chrome BEFORE first paint so it never lands in frames:
  // pink "N error" toast + white static-route circle (nextjs-portal / badge).
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
  await page.addInitScript({ content: STRIP_DEV_CHROME });

  // load (not networkidle): long video preload can prevent idle forever
  await page.goto(URL, { waitUntil: "load", timeout: 90_000 });
  await page.waitForTimeout(800);
  await page.evaluate(STRIP_DEV_CHROME);

  await page.waitForFunction(
    () => {
      const v = document.querySelector("video");
      return !v || (v.readyState >= 2 && v.duration > 0);
    },
    { timeout: 60_000 }
  ).catch(() => {});

  // Pause free-running playback; we scrub currentTime ourselves
  const mediaDuration = await page.evaluate(() => {
    const v = document.querySelector("video");
    if (!v) return 0;
    v.muted = true;
    v.loop = true;
    v.pause();
    return Number.isFinite(v.duration) ? v.duration : 0;
  });

  // Capture duration: prefer source length so waves read at real speed.
  // FULL_MAP=1 maps wall-clock preview across the FULL film (long scroll SKUs).
  const fullMap = process.env.FULL_MAP === "1" || process.env.FULL_MAP === "true";
  const scrubDuration =
    mediaDuration > 0.5
      ? fullMap
        ? mediaDuration
        : Math.min(DURATION_S, mediaDuration)
      : DURATION_S;

  console.log(
    `Media duration ${mediaDuration.toFixed(2)}s, scrub ${scrubDuration.toFixed(2)}s fullMap=${fullMap}`
  );

  // Hold first frame while Framer entrance settles with full text visible
  await seekVideo(page, 0);
  await page.waitForTimeout(2400);

  for (let i = 0; i < TOTAL; i++) {
    const t = TOTAL <= 1 ? 0 : i / (TOTAL - 1);
    // Stay slightly inside end to avoid loop flash
    const time = Math.min(scrubDuration * 0.995, t * scrubDuration);
    if (mediaDuration > 0) {
      await seekVideo(page, time);
    }

    // Re-strip immediately before each frame (portals can re-inject)
    await page.evaluate(() => {
      document
        .querySelectorAll(
          "nextjs-portal, [data-nextjs-toast], [data-nextjs-dialog-overlay], [data-nextjs-dialog], [data-next-badge-root], [data-nextjs-dev-overlay], #__next-build-watcher"
        )
        .forEach((el) => el.remove());
    });

    const file = path.join(
      OUT_DIR,
      `frame-${String(i + 1).padStart(4, "0")}.png`
    );
    await page.screenshot({ path: file, type: "png" });
    if (i % FPS === 0 || i === TOTAL - 1) {
      console.log(`  frame ${i + 1}/${TOTAL} @ ${time.toFixed(2)}s`);
    }
  }

  await browser.close();

  console.log("Encoding…");
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

  // Poster + product thumb from ~mid frame (text fully in)
  const midIdx = Math.min(TOTAL, Math.max(1, Math.floor(TOTAL * 0.35)));
  const mid = path.join(
    OUT_DIR,
    `frame-${String(midIdx).padStart(4, "0")}.png`
  );
  runFfmpeg(["-y", "-i", mid, "-frames:v", "1", "-update", "1", OUT_POSTER]);
  runFfmpeg(["-y", "-i", mid, "-frames:v", "1", "-update", "1", OUT_THUMB]);

  // Product-specific thumbs when capturing known flagship previews
  const productThumbMap = {
    aether: "MS-HERO-AETH01.webp",
    vertex: "MS-HERO-VERT01.webp",
    "neon-forge": "MS-HERO-NEON01.webp",
    meridian: "MS-HERO-MERI01.webp",
    lumina: "MS-HERO-LUMI01.webp",
    terra: "MS-HERO-TERR01.webp",
    apex: "MS-HERO-APEX01.webp",
    revel: "MS-HERO-REVL01.webp",
    prism: "MS-HERO-PRSM01.webp",
  };
  for (const [key, thumbName] of Object.entries(productThumbMap)) {
    if (!base.includes(key)) continue;
    const productThumb = path.join(root, "public", "thumbnails", thumbName);
    runFfmpeg([
      "-y",
      "-i",
      mid,
      "-frames:v",
      "1",
      "-update",
      "1",
      productThumb,
    ]);
  }

  const sizeMb = (fs.statSync(OUT_VIDEO).size / (1024 * 1024)).toFixed(2);
  console.log(
    JSON.stringify(
      {
        ok: true,
        video: path.relative(root, OUT_VIDEO).replace(/\\/g, "/"),
        poster: path.relative(root, OUT_POSTER).replace(/\\/g, "/"),
        frames: TOTAL,
        scrubDuration,
        sizeMb,
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
