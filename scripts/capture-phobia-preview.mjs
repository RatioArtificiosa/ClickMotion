/**
 * Capture Phobia (MS-SEC-PHOB01) storefront presentation videos.
 *
 * Interactive pointer choreography on the cleanroom demo (or lab).
 * Outputs storefront page + FS + poster + thumb. NOT client media.
 *
 * Usage:
 *   node scripts/capture-phobia-preview.mjs
 *   node scripts/capture-phobia-preview.mjs http://127.0.0.1:3004/demo/cleanroom-phobia
 *   node scripts/capture-phobia-preview.mjs http://127.0.0.1:3032/lab/phobic-objects
 *
 * Writes first to tmp/ for approval; use --promote to copy into public/.
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
  process.argv[2] || "http://127.0.0.1:3004/demo/cleanroom-phobia";
const PROMOTE = process.argv.includes("--promote");

const TMP = path.join(root, "tmp", "phobia-preview");
const OUT_PAGE = path.join(TMP, "phobia-forms-preview-v1.mp4");
const OUT_FS = path.join(TMP, "phobia-forms-preview-fs-v1.mp4");
const OUT_POSTER = path.join(TMP, "phobia-forms-preview-v1.webp");
const OUT_THUMB = path.join(TMP, "MS-SEC-PHOB01.webp");

const PUBLIC = {
  page: path.join(root, "public", "assets", "videos", "phobia-forms-preview-v1.mp4"),
  fs: path.join(root, "public", "assets", "videos", "phobia-forms-preview-fs-v1.mp4"),
  poster: path.join(root, "public", "assets", "posters", "phobia-forms-preview-v1.webp"),
  thumb: path.join(root, "public", "thumbnails", "MS-SEC-PHOB01.webp"),
};

const VIEW = { width: 1440, height: 900 };
const VIEW_FS = { width: 1920, height: 1080 };

const ffmpeg =
  process.env.FFMPEG_PATH ||
  (() => {
    try {
      return require("ffmpeg-static");
    } catch {
      const alt = path.join(root, "node_modules", "ffmpeg-static", "ffmpeg.exe");
      return fs.existsSync(alt) ? alt : "ffmpeg";
    }
  })();

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function runFfmpeg(args) {
  const r = spawnSync(ffmpeg, args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error(`ffmpeg failed`);
  }
}

/** Human-ish eased polyline for pointer tour */
async function movePath(page, points, stepsPer = 14, pause = 16) {
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

async function recordOne(viewport, outMp4, label) {
  const recDir = path.join(TMP, `rec-${label}`);
  fs.rmSync(recDir, { recursive: true, force: true });
  fs.mkdirSync(recDir, { recursive: true });

  console.log(`\n[${label}] Recording ${viewport.width}×${viewport.height} → ${outMp4}`);
  console.log(`  URL: ${URL}`);

  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=angle", "--ignore-gpu-blocklist"],
  });

  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    recordVideo: { dir: recDir, size: viewport },
  });

  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForSelector("#phobia-section, #phobic-objects, [data-demo-root]", {
    timeout: 60000,
  });
  await sleep(1200);

  // Hide lab Menu chrome if present (NothChrome)
  await page.addStyleTag({
    content: `
      [data-noth-chrome], .noth-chrome, header.lab-chrome { display: none !important; }
    `,
  }).catch(() => {});

  const w = viewport.width;
  const h = viewport.height;
  const cx = w * 0.5;
  const cy = h * 0.48;

  // Act 1: idle spread (no pointer in section) — stay off-stage briefly
  await page.mouse.move(w * 0.02, h * 0.02);
  await sleep(900);

  // Act 2: enter from left → cluster settles then flees
  await movePath(
    page,
    [
      [w * 0.08, h * 0.55],
      [w * 0.28, h * 0.42],
      [cx, cy],
    ],
    18,
    14
  );
  await sleep(400);

  // Act 3: slow orbit around cluster (radial flee arcs)
  const orbit = [];
  const R = Math.min(w, h) * 0.22;
  for (let a = 0; a <= 360; a += 18) {
    const rad = (a * Math.PI) / 180;
    orbit.push([cx + Math.cos(rad) * R, cy + Math.sin(rad) * R * 0.85]);
  }
  await movePath(page, orbit, 8, 12);
  await sleep(300);

  // Act 4: dive through center then sweep letters
  await movePath(
    page,
    [
      [cx + R, cy],
      [cx, cy],
      [w * 0.62, h * 0.35],
      [w * 0.7, h * 0.55],
      [w * 0.55, h * 0.65],
      [w * 0.4, h * 0.5],
      [cx, cy * 0.9],
    ],
    12,
    15
  );
  await sleep(500);

  // Act 5: leave stage → elastic return / spread
  await movePath(page, [[cx, cy], [w * 0.95, h * 0.1]], 16, 14);
  await page.mouse.move(w * 0.98, h * 0.02);
  await sleep(1400);

  await context.close();
  await browser.close();

  const webms = fs.readdirSync(recDir).filter((f) => f.endsWith(".webm"));
  if (!webms.length) throw new Error("No webm recorded");
  const webm = path.join(recDir, webms[0]);

  runFfmpeg([
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
    outMp4,
  ]);
  console.log(`  encoded ${outMp4} (${(fs.statSync(outMp4).size / 1e6).toFixed(1)} MB)`);
  return outMp4;
}

async function stillsFromPage(pageMp4) {
  // Poster ~1.2s in (objects active), thumb later mid-orbit
  runFfmpeg([
    "-y",
    "-ss",
    "1.2",
    "-i",
    pageMp4,
    "-frames:v",
    "1",
    "-q:v",
    "2",
    OUT_POSTER.replace(/\.webp$/, ".jpg"),
  ]);
  // convert jpg → webp if possible, else keep jpg rename
  const jpg = OUT_POSTER.replace(/\.webp$/, ".jpg");
  try {
    runFfmpeg(["-y", "-i", jpg, "-quality", "82", OUT_POSTER]);
    fs.unlinkSync(jpg);
  } catch {
    fs.renameSync(jpg, OUT_POSTER.replace(/\.webp$/, ".jpg"));
  }

  runFfmpeg([
    "-y",
    "-ss",
    "4.5",
    "-i",
    pageMp4,
    "-frames:v",
    "1",
    "-vf",
    "scale=640:-1",
    "-q:v",
    "3",
    OUT_THUMB.replace(/\.webp$/, ".jpg"),
  ]);
  const tjpg = OUT_THUMB.replace(/\.webp$/, ".jpg");
  try {
    runFfmpeg(["-y", "-i", tjpg, "-quality", "80", OUT_THUMB]);
    fs.unlinkSync(tjpg);
  } catch {
    /* leave jpg */
  }
  console.log("Stills written to tmp/phobia-preview");
}

function promote() {
  fs.mkdirSync(path.dirname(PUBLIC.page), { recursive: true });
  fs.mkdirSync(path.dirname(PUBLIC.poster), { recursive: true });
  fs.mkdirSync(path.dirname(PUBLIC.thumb), { recursive: true });
  fs.copyFileSync(OUT_PAGE, PUBLIC.page);
  fs.copyFileSync(OUT_FS, PUBLIC.fs);
  if (fs.existsSync(OUT_POSTER)) fs.copyFileSync(OUT_POSTER, PUBLIC.poster);
  if (fs.existsSync(OUT_THUMB)) fs.copyFileSync(OUT_THUMB, PUBLIC.thumb);
  const tjpg = OUT_THUMB.replace(/\.webp$/, ".jpg");
  if (!fs.existsSync(OUT_THUMB) && fs.existsSync(tjpg)) {
    fs.copyFileSync(tjpg, PUBLIC.thumb.replace(/\.webp$/, ".jpg"));
  }
  console.log("Promoted to public/");
}

async function main() {
  fs.mkdirSync(TMP, { recursive: true });
  await recordOne(VIEW, OUT_PAGE, "page");
  await recordOne(VIEW_FS, OUT_FS, "fs");
  await stillsFromPage(OUT_PAGE);

  console.log("\n=== REVIEW (tmp only unless --promote) ===");
  console.log("  Page:", OUT_PAGE);
  console.log("  FS:  ", OUT_FS);
  console.log("  Poster/thumb under", TMP);
  if (PROMOTE) promote();
  else console.log("\nRe-run with --promote after approval to copy into public/.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
