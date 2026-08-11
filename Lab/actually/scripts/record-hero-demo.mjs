/**
 * Record ACTUALLY Hero lab demo (product-specific choreography):
 * - wait for loader
 * - move pointer so the clip "window" follows
 * - grab/drag the 3D can
 * - scroll into second half of pin + interact
 *
 * Project-agnostic pattern + notes:
 *   docs/INTERACTIVE_DEMO_RECORDING.md
 *   scripts/record-interactive-demo.mjs  (MS monorepo generalized)
 *
 * Usage:
 *   node scripts/record-hero-demo.mjs
 *   node scripts/record-hero-demo.mjs http://127.0.0.1:3011/lab/hero
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

const URL = process.argv[2] || "http://127.0.0.1:3011/lab/hero";
const OUT_DIR = path.join(root, "tmp", "hero-demo-record");
const OUT_MP4 = path.join(root, "tmp", "actually-hero-demo.mp4");
const VIEW = { width: 1440, height: 900 };

const ffmpeg =
  process.env.FFMPEG_PATH ||
  (() => {
    try {
      return require("ffmpeg-static");
    } catch {
      // fall back to MS monorepo ffmpeg-static if present
      const alt = path.join(
        root,
        "..",
        "..",
        "node_modules",
        "ffmpeg-static",
        "ffmpeg.exe",
      );
      if (fs.existsSync(alt)) return alt;
      return "ffmpeg";
    }
  })();

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function movePath(page, points, stepsPer = 8, pause = 16) {
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    for (let s = 0; s <= stepsPer; s++) {
      const t = s / stepsPer;
      // ease in-out
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const x = x0 + (x1 - x0) * e;
      const y = y0 + (y1 - y0) * e;
      await page.mouse.move(x, y);
      await sleep(pause);
    }
  }
}

async function main() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log("Recording:", URL);
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--ignore-gpu-blocklist"],
  });

  const context = await browser.newContext({
    viewport: VIEW,
    deviceScaleFactor: 1,
    hasTouch: false,
    recordVideo: {
      dir: OUT_DIR,
      size: VIEW,
    },
  });

  const page = await context.newPage();

  await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 });

  // Wait for loader to finish / hero canvas present
  await page.waitForSelector("canvas", { timeout: 60000 });
  // Loader soft-timeout ~2s on source; wait a bit more for entrance
  await sleep(2800);

  const cx = VIEW.width / 2;
  const cy = VIEW.height * 0.48;

  // ── Act 1: pointer follows — circle clip "window" moves with cursor ──
  console.log("Act 1 · pointer window tour");
  await movePath(
    page,
    [
      [cx, cy],
      [cx + 220, cy - 80],
      [cx - 180, cy + 40],
      [cx + 160, cy + 120],
      [cx - 100, cy - 100],
      [cx, cy],
    ],
    14,
    20,
  );
  await sleep(400);

  // ── Act 2: grab the can and spin it ──
  console.log("Act 2 · grab + drag can");
  await page.mouse.move(cx, cy + 20);
  await sleep(200);
  await page.mouse.down();
  await movePath(
    page,
    [
      [cx, cy + 20],
      [cx + 180, cy - 40],
      [cx + 220, cy + 80],
      [cx - 120, cy + 60],
      [cx - 40, cy - 30],
      [cx + 80, cy + 10],
    ],
    12,
    22,
  );
  await page.mouse.up();
  await sleep(500);

  // ── Act 3: scroll into pin second half (support copy / bone) ──
  console.log("Act 3 · scroll pin journey");
  // Pin end is +=120% of viewport → ~1.2 * height of scroll
  const scrollMax = await page.evaluate(() => {
    return Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      Math.round(window.innerHeight * 1.35),
    );
  });

  // Smooth scroll in steps while moving pointer (window + can scrub)
  const steps = 48;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = Math.round(scrollMax * t);
    await page.evaluate((yy) => {
      window.scrollTo(0, yy);
      const l = window.__msLenis || window.__orionLenis;
      // actually uses getLenis - try common exposures
      if (l?.scrollTo) l.scrollTo(yy, { immediate: true });
    }, y);
    // gentle figure-eight of pointer during scroll
    const ang = t * Math.PI * 2;
    const px = cx + Math.cos(ang) * 140;
    const py = cy + Math.sin(ang) * 70;
    await page.mouse.move(px, py);
    await sleep(70);
  }
  await sleep(600);

  // ── Act 4: mid-scroll interaction — drag again at ~55% ──
  console.log("Act 4 · mid-scroll re-engage can");
  await page.evaluate((yy) => {
    window.scrollTo(0, yy);
  }, Math.round(scrollMax * 0.55));
  await sleep(400);
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await movePath(
    page,
    [
      [cx, cy],
      [cx - 200, cy + 30],
      [cx + 160, cy - 50],
      [cx, cy + 20],
    ],
    10,
    24,
  );
  await page.mouse.up();
  await sleep(500);

  // ── Act 5: finish scroll to end ──
  console.log("Act 5 · finish scroll");
  for (let i = 0; i <= 20; i++) {
    const t = 0.55 + (0.45 * i) / 20;
    await page.evaluate((yy) => window.scrollTo(0, yy), Math.round(scrollMax * t));
    await page.mouse.move(cx + 80 * Math.sin(i / 3), cy - 40);
    await sleep(60);
  }
  await sleep(900);

  // hold final frame
  await sleep(800);

  await page.close();
  await context.close();
  await browser.close();

  // Playwright writes webm
  const webms = fs
    .readdirSync(OUT_DIR)
    .filter((f) => f.endsWith(".webm"))
    .map((f) => path.join(OUT_DIR, f));
  if (!webms.length) throw new Error("No webm recorded");
  const webm = webms[0];
  console.log("Raw video:", webm);

  // Encode to high-quality mp4
  const r = spawnSync(
    ffmpeg,
    [
      "-y",
      "-i",
      webm,
      "-c:v",
      "libx264",
      "-preset",
      "slow",
      "-crf",
      "17",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "-an",
      OUT_MP4,
    ],
    { encoding: "utf8" },
  );
  if (r.status !== 0) {
    console.error(r.stderr);
    // keep webm as fallback
    const fallback = path.join(root, "tmp", "actually-hero-demo.webm");
    fs.copyFileSync(webm, fallback);
    console.log("ffmpeg failed — raw webm at", fallback);
    process.exit(1);
  }

  const st = fs.statSync(OUT_MP4);
  console.log(
    `✓ Demo saved: ${OUT_MP4}  (${(st.size / 1024 / 1024).toFixed(2)} MB)`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
