import { z } from "zod";
import { categoryIds, styleTagIds, technicalTags } from "@/config/taxonomy";

// ── Helpers ─────────────────────────────────────────────────────────────
const idPattern = /^MS-(HERO|SEC|LP|SPC)-[A-Z0-9]{3,8}$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// ── Video asset ─────────────────────────────────────────────────────────
export const videoAssetSchema = z.object({
  file: z.string().min(1),
  format: z.enum(["mp4", "webm", "hls"]),
  duration: z.string().regex(/^\d+s$/, "Duration must be like '12s'"),
  loop: z.boolean(),
  sizeMb: z.number().positive().max(50),
  poster: z.string().optional(),
});

// ── Dependency ──────────────────────────────────────────────────────────
export const dependencySchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1), // e.g. "^11.0.0" or "latest"
  required: z.boolean(),
});

// ── Motion configs ──────────────────────────────────────────────────────
export const motionConfigSchema = z.object({
  target: z.string().min(1),
  type: z.enum(["framer-motion", "gsap"]),
  properties: z.record(z.any()),
  duration: z.number().positive().max(10),
  delay: z.number().min(0).max(10),
  easing: z.string().min(1),
  stagger: z.number().min(0).max(2).optional(),
});

export const scrollTriggerConfigSchema = z.object({
  trigger: z.string().min(1),
  start: z.string().min(1),
  end: z.string().min(1),
  scrub: z.union([z.boolean(), z.number()]),
  pin: z.boolean().optional(),
  animation: motionConfigSchema,
});

export const parallaxConfigSchema = z.object({
  target: z.string().min(1),
  speed: z.number().min(-2).max(2),
  direction: z.enum(["vertical", "horizontal"]),
});

// ── Full prompt frontmatter schema ─────────────────────────────────────
export const promptFrontmatterSchema = z.object({
  id: z.string().regex(idPattern, "ID must match MS-(HERO|SEC|LP|SPC)-XXX"),
  title: z.string().min(5).max(80),
  slug: z.string().regex(slugPattern, "Slug must be kebab-case"),
  // PRODUCT_LAW: storefront description soft ≤160, hard ≤180
  description: z.string().min(20).max(180),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  created: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  author: z.string().min(1),
  status: z.enum(["draft", "review", "published", "archived"]),

  type: z.enum(["hero", "section", "landing-page", "special"]),
  category: z.string().refine((v) => categoryIds.includes(v), { message: "Invalid category id" }),
  subcategory: z.string().min(1),
  styleTags: z.array(z.string().refine((v) => (styleTagIds as string[]).includes(v), { message: "Invalid styleTag" })).min(1).max(4),
  motionIntensity: z.enum(["subtle", "medium", "aggressive", "extreme"]),
  difficulty: z.enum(["beginner", "intermediate", "advanced", "expert"]),
  priceTier: z.enum(["free", "starter", "pro", "agency"]),
  technicalTags: z.array(z.string().refine((v) => (technicalTags as readonly string[]).includes(v), { message: "Invalid technicalTag" })).optional(),

  aiToolsRating: z.record(z.number().min(1).max(5)).optional(),
  frameworksSupported: z.array(z.enum(["react", "vue", "svelte", "html"])).min(1),
  previewVideo: z.string().optional(),
  previewGif: z.string().optional(),
  thumbnail: z.string().min(1),
  liveDemo: z.string().optional(),

  videoBackgrounds: z.array(videoAssetSchema).max(3).default([]),
  dependencies: z.array(dependencySchema).min(1),
  estimatedTokens: z.number().int().positive().max(20000),
  useCases: z.array(z.string()).min(1),
  compatibleWith: z.array(z.string()).default([]),
  positionInPage: z.enum(["top", "middle", "bottom", "full"]),
});

export type PromptFrontmatter = z.infer<typeof promptFrontmatterSchema>;

// ── Content body requirements ─────────────────────────────────────────
export const requiredSections = [
  "Design System",
  "Layout Structure",
  "Motion Specification",
  "Responsive Behavior",
  "Accessibility",
  "Performance Notes",
  "AI Tool Instructions",
  "Expected Output",
] as const;

export function validateBodySections(markdown: string): string[] {
  const missing: string[] = [];
  for (const section of requiredSections) {
    if (!markdown.includes(`## ${section}`)) missing.push(section);
  }
  return missing;
}
