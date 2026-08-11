#!/usr/bin/env tsx
/** Seeds Supabase prompts table from content/prompts MDX */
import { createClient } from "@supabase/supabase-js";
import { loadAllPrompts } from "../src/lib/prompt-loader";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in env.");
  process.exit(1);
}

const supabase = createClient(url, key);
const prompts = loadAllPrompts();

console.log(`Seeding ${prompts.length} prompts...`);

for (const { frontmatter, body } of prompts) {
  const row = {
    id: frontmatter.id,
    title: frontmatter.title,
    slug: frontmatter.slug,
    description: frontmatter.description,
    type: frontmatter.type,
    category: frontmatter.category,
    subcategory: frontmatter.subcategory,
    style_tags: frontmatter.styleTags,
    motion_intensity: frontmatter.motionIntensity,
    difficulty: frontmatter.difficulty,
    price_tier: frontmatter.priceTier,
    status: frontmatter.status,
    content: body,
    metadata: frontmatter,
    preview_video: frontmatter.previewVideo ?? null,
    preview_gif: frontmatter.previewGif ?? null,
    thumbnail: frontmatter.thumbnail,
    live_demo_url: frontmatter.liveDemo ?? null,
    frameworks_supported: frontmatter.frameworksSupported,
    ai_tools_rating: frontmatter.aiToolsRating ?? {},
    dependencies: frontmatter.dependencies,
    estimated_tokens: frontmatter.estimatedTokens,
    compatible_with: frontmatter.compatibleWith,
  };

  const { error } = await supabase.from("prompts").upsert(row, { onConflict: "id" });
  if (error) {
    console.error(`✗ ${frontmatter.id}: ${error.message}`);
  } else {
    console.log(`✓ ${frontmatter.id} — ${frontmatter.title}`);
  }
}

console.log("Done.");
