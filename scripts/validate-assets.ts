#!/usr/bin/env tsx
/**
 * Validates asset naming conventions and checks that referenced assets exist.
 * Usage: npm run validate:assets
 */
import fs from "node:fs";
import path from "node:path";
import { loadAllPrompts } from "../src/lib/prompt-loader";

const ASSET_ROOT = path.join(process.cwd(), "public/assets");

let errors = 0;

for (const { frontmatter, filePath } of loadAllPrompts()) {
  for (const va of frontmatter.videoBackgrounds ?? []) {
    const assetPath = path.join(process.cwd(), "public", va.file);
    if (!fs.existsSync(assetPath)) {
      console.error(`✗ Missing asset: ${va.file} (referenced in ${filePath})`);
      errors++;
    }
    if (va.sizeMb > 10) {
      console.warn(`⚠ Large asset: ${va.file} is ${va.sizeMb}MB (recommend <5MB)`);
    }
  }
  // Check preview/thumbnail existence if local
  for (const key of ["previewVideo", "previewGif", "thumbnail"] as const) {
    const val = frontmatter[key];
    if (val && val.startsWith("/") && !val.startsWith("http")) {
      const p = path.join(process.cwd(), "public", val);
      if (!fs.existsSync(p)) {
        console.error(`✗ Missing ${key}: ${val} in ${filePath}`);
        errors++;
      }
    }
  }
}

// Naming convention check for files under public/assets
if (fs.existsSync(ASSET_ROOT)) {
  const checkDir = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) checkDir(full);
      else if (!/^[a-z0-9-]+\.(mp4|webm|webp|jpg|png|svg)$/.test(entry.name)) {
        console.warn(`⚠ Naming: ${full} should be kebab-case with valid extension`);
      }
    }
  };
  checkDir(ASSET_ROOT);
}

if (errors === 0) console.log("✓ All asset references valid.");
else console.log(`\n${errors} asset error(s).`);
process.exit(errors > 0 ? 1 : 0);
