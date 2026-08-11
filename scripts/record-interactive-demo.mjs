/**
 * Project/product-agnostic interactive demo recording.
 *
 * Playwright recordVideo (WebM) → ffmpeg H.264 MP4 under tmp/.
 * Script default acts: wait → pointer tour → optional center drag → scroll journey.
 *
 * Product-specific rich acts (e.g. Actually! can grab choreography) live next to
 * the lab: Lab/actually/scripts/record-hero-demo.mjs
 *
 * Docs: docs/INTERACTIVE_DEMO_RECORDING.md
 *
 * Usage:
 *   node scripts/record-interactive-demo.mjs
 *   node scripts/record-interactive-demo.mjs http://127.0.0.1:3004/demo/cleanroom-actually actually-hero
 *   node scripts/record-interactive-demo.mjs http://127.0.0.1:3011/lab/hero lab-hero
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
  process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-actually";
const BASENAME = process.argv[3] || "interactive-demo";
const OUT_DIR = path.join(root, "tmp", `${BASENAME}-record`);
const OUT_MP4 = path.join(root, "tmp", `${BASENAME}.mp4`);
const VIEW = {
  width: Number(process.env.RECORD_W || 1440),
  height: Number(process.env.RECORD_H || 900),
};

const ffmpeg =
  process.env.FFMPEG_PATH ||
  (() => {
    try {
      return require("ffmpeg-static");
    } catch {
      const alt = path.join(root, "node_modules", "ffmpeg-static", "ffmpeg.exe");
      if (fs.existsSync(alt)) return alt;
      return "ffmpeg";
    }
  })();

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function movePath(page, points, stepsPer = 10, pause = 18) {
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    for (let s = 0; s <= stepsPer; s++) {
      const t = s / stepsPer;
      const e = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      await page.mouse.move(x0 + (x1 - x0) * e, y0 + (y1 - y0) * e);
      await sleep(pause);
    }
  }
}

async function main() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log("Recording:", URL);
  console.log("Output:", OUT_MP4);

  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--ignore-gpu-blocklist"],
  });

  const context = await browser.newContext({
    viewport: VIEW,
    deviceScaleFactor: 1,
    recordVideo: { dir: OUT_DIR, size: VIEW },
  });

  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 });

  // Prefer canvas (WebGL heroes); fall back to main landmark
  try {
    await page.waitForSelector("canvas", { timeout: 45000 });
  } catch {
    await page.waitForSelector("main, #hero, [data-demo-root]", {
      timeout: 30000,
    });
  }
  await sleep(2800);

  const cx = VIEW.width / 2;
  const cy = VIEW.height * 0.48;

  console.log("Act 1 · pointer tour");
  await movePath(
    page,
    [
      [cx, cy],
      [cx + 200, cy - 90],
      [cx - 160, cy + 50],
      [cx + 140, cy + 100],
      [cx, cy],
    ],
    12,
    18,
  );
  await sleep(350);

  console.log("Act 2 · center drag");
  await page.mouse.move(cx, cy + 10);
  await page.mouse.down();
  await movePath(
    page,
    [
      [cx, cy + 10],
      [cx + 160, cy - 30],
      [cx - 100, cy + 50],
      [cx, cy],
    ],
    10,
    22,
  );
  await page.mouse.up();
  await sleep(400);

  console.log("Act 3 · scroll journey");
  const scrollMax = await page.evaluate(() => {
    return Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      Math.round(window.innerHeight * 1.35),
    );
  });
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = Math.round(scrollMax * t);
    await page.evaluate((yy) => {
      window.scrollTo(0, yy);
      const l = window.__msLenis || window.__orionLenis;
      if (l?.scrollTo) l.scrollTo(yy, { immediate: true });
    }, y);
    const ang = t * Math.PI * 2;
    await page.mouse.move(cx + Math.cos(ang) * 120, cy + Math.sin(ang) * 60);
    await sleep(65);
  }
  await sleep(900);

  await page.close();
  await context.close();
  await browser.close();

  const webms = fs
    .readdirSync(OUT_DIR)
    .filter((f) => f.endsWith(".webm"))
    .map((f) => path.join(OUT_DIR, f));
  if (!webms.length) throw new Error("No webm recorded");
  const webm = webms[0];
  console.log("Raw:", webm);

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
    const fallback = path.join(root, "tmp", `${BASENAME}.webm`);
    fs.copyFileSync(webm, fallback);
    console.log("ffmpeg failed — webm at", fallback);
    process.exit(1);
  }

  const st = fs.statSync(OUT_MP4);
  console.log(`✓ ${OUT_MP4}  (${(st.size / 1024 / 1024).toFixed(2)} MB)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
