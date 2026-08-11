#!/usr/bin/env tsx
/**
 * Generates public/manifest.json from all prompt frontmatter.
 * Used for client-side filtering without hitting Supabase.
 */
import fs from "node:fs";
import path from "node:path";
import { loadAllPrompts } from "../src/lib/prompt-loader";

const prompts = loadAllPrompts().map(({ frontmatter }) => ({
  id: frontmatter.id,
  slug: frontmatter.slug,
  title: frontmatter.title,
  type: frontmatter.type,
  category: frontmatter.category,
  styleTags: frontmatter.styleTags,
  motionIntensity: frontmatter.motionIntensity,
  priceTier: frontmatter.priceTier,
  thumbnail: frontmatter.thumbnail,
  previewVideo: frontmatter.previewVideo,
}));

const out = path.join(process.cwd(), "public/manifest.json");
fs.writeFileSync(out, JSON.stringify({ generatedAt: new Date().toISOString(), count: prompts.length, prompts }, null, 2));
console.log(`✓ Wrote ${prompts.length} prompts to ${out}`);
