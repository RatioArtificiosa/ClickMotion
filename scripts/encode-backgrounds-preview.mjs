#!/usr/bin/env node
/**
 * Encode backgrounds-page ONLY previews (role: backgrounds).
 *
 * LAW:
 * - Output lives ONLY under public/assets/videos/backgrounds/
 * - Never overwrite client HD, masters, storefront, or site hero
 * - Small 640×360 16:9 H.264 silent loops for hover / free URL copy
 * - Protects buyer-pack film from full-res scrape + saves bandwidth
 *
 * Usage:
 *   node scripts/encode-backgrounds-preview.mjs
 *   node scripts/encode-backgrounds-preview.mjs --only aether-waves
 *
 * Checklist: docs/PRODUCTION_READY_CHECKLIST.md §2H
 * Pipeline:  docs/ASSET_PIPELINE.md (role: backgrounds)
 */

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const require = createRequire(import.meta.url);

const ffmpeg =
  process.env.FFMPEG_PATH ||
  (() => {
    try {
      return require("ffmpeg-static");
    } catch {
      return "ffmpeg";
    }
  })();

const OUT_DIR = path.join(root, "public", "assets", "videos", "backgrounds");

/** Source = approved pure film (not storefront UI captures). Output = small bg tile. */
const JOBS = [
  {
    id: "atlantic-residences",
    src: "public/assets/videos/sequence-01.mp4",
    out: "atlantic-residences-bg-v1.mp4",
  },
  {
    id: "aether-waves",
    src: "public/assets/videos/aether-waves-web-v1.mp4",
    out: "aether-waves-bg-v1.mp4",
  },
  {
    id: "vertex-globe",
    src: "public/assets/videos/vertex-globe-web-v1.mp4",
    out: "vertex-globe-bg-v1.mp4",
  },
  {
    id: "neon-forge",
    src: "public/assets/videos/neon-forge-city-v1.mp4",
    out: "neon-forge-bg-v1.mp4",
  },
  {
    id: "lumina-dolly",
    src: "public/assets/videos/lumina-dolly-v1.mp4",
    out: "lumina-dolly-bg-v1.mp4",
  },
  {
    id: "terra-aerial",
    src: "public/assets/videos/terra-aerial-v1.mp4",
    out: "terra-aerial-bg-v1.mp4",
  },
  {
    id: "apex-quantum",
    src: "public/assets/videos/apex-quantum-v1.mp4",
    out: "apex-quantum-bg-v1.mp4",
  },
  {
    id: "revel-breakout",
    src: "public/assets/videos/revel-breakout-v1.mp4",
    out: "revel-breakout-bg-v1.mp4",
  },
  {
    id: "prism-faces",
    src: "public/assets/videos/prism-faces-v1.mp4",
    out: "prism-faces-bg-v1.mp4",
  },
  {
    id: "folio-blurry",
    src: "public/assets/videos/folio-blurry-v1.mp4",
    out: "folio-blurry-bg-v1.mp4",
  },
  {
    id: "mirage-desert",
    src: "public/assets/videos/mirage-desert-v1.mp4",
    out: "mirage-desert-bg-v1.mp4",
  },
  {
    id: "sable-winter",
    src: "public/assets/videos/sable-winter-v1.mp4",
    out: "sable-winter-bg-v1.mp4",
  },
  {
    id: "axiom-upside",
    src: "public/assets/videos/axiom-upside-v1.mp4",
    out: "axiom-upside-bg-v1.mp4",
  },
  {
    id: "elyse-nature",
    src: "public/assets/videos/elyse-nature-v1.mp4",
    out: "elyse-nature-bg-v1.mp4",
  },
  {
    id: "nexus-neural",
    src: "public/assets/videos/nexus-neural-v1.mp4",
    out: "nexus-neural-bg-v1.mp4",
  },
  {
    id: "studio-surreal",
    // Pure Lab surreal film (no UI frames) — full length, never storefront previews
    src: "public/assets/videos/studio-surreal-v1.mp4",
    out: "studio-surreal-bg-v1.mp4",
  },
  {
    id: "nomad-montage",
    src: "public/assets/videos/nomad-montage-v1.mp4",
    out: "nomad-montage-bg-v1.mp4",
  },
  {
    id: "still-cosmos",
    src: "public/assets/videos/still-cosmos-v1.mp4",
    out: "still-cosmos-bg-v1.mp4",
  },
  {
    id: "luna-yoga",
    src: "public/assets/videos/luna-yoga-v1.mp4",
    out: "luna-yoga-bg-v1.mp4",
  },
  {
    id: "acne-secret",
    src: "public/assets/videos/acne-secret-v1.webm",
    out: "acne-secret-bg-v1.mp4",
  },
  {
    id: "grokbot-sphere",
    src: "public/assets/videos/grokbot-sphere-v1.mp4",
    out: "grokbot-sphere-bg-v1.mp4",
  },
  {
    id: "skyspires-sunrise",
    src: "public/assets/videos/skyspires-sunrise-v1.mp4",
    out: "skyspires-sunrise-bg-v1.mp4",
  },
];

const only = process.argv.includes("--only")
  ? process.argv[process.argv.indexOf("--only") + 1]
  : null;

fs.mkdirSync(OUT_DIR, { recursive: true });

const vf =
  "scale=640:360:force_original_aspect_ratio=decrease,pad=640:360:(ow-iw)/2:(oh-ih)/2,setsar=1";

let failed = 0;
for (const job of JOBS) {
  if (only && job.id !== only) continue;
  const input = path.join(root, job.src);
  const output = path.join(OUT_DIR, job.out);
  if (!fs.existsSync(input)) {
    console.error(`MISSING source: ${job.src}`);
    failed++;
    continue;
  }
  console.log(`→ ${job.out}  from  ${job.src}`);
  const r = spawnSync(
    ffmpeg,
    [
      "-y",
      "-i",
      input,
      "-vf",
      vf,
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "30",
      "-profile:v",
      "main",
      "-level",
      "3.1",
      "-pix_fmt",
      "yuv420p",
      "-an",
      "-movflags",
      "+faststart",
      "-g",
      "48",
      "-keyint_min",
      "48",
      output,
    ],
    { encoding: "utf8" }
  );
  if (r.status !== 0) {
    console.error(r.stderr?.slice(-800) || "ffmpeg failed");
    failed++;
    continue;
  }
  const kb = (fs.statSync(output).size / 1024).toFixed(1);
  console.log(`  OK ${kb} KB`);
}

if (failed) {
  console.error(`\n${failed} job(s) failed`);
  process.exit(1);
}
console.log("\nAll backgrounds previews encoded.");
console.log("Next (do not skip — production/sale gate):");
console.log("  1. Register tile in src/config/backgrounds.ts (src + productId + sourceFilm)");
console.log("  2. Set backgroundsPreview on product-packages.ts + owner-designs.ts");
console.log("  3. Confirm Admin → Backgrounds (/admin/backgrounds) shows the tile");
console.log("  4. Network on /backgrounds must NOT request client HD");
