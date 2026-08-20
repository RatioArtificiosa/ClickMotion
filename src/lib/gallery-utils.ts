import { categories } from "@/config/taxonomy";

/**
 * Optional known on-disk preview videos keyed by prompt id.
 * Prefer content frontmatter (`previewVideo` / `videoBackgrounds`) when present.
 * Drop new files under public/ and point frontmatter at them - no code change needed.
 */
export const REAL_PREVIEW_VIDEOS: Record<string, string> = {
  "MS-HERO-AETH01": "/assets/videos/aether-preview-v1.mp4",
  "MS-HERO-VERT01": "/assets/videos/vertex-preview-v1.mp4",
  "MS-HERO-MERI01": "/assets/videos/meridian-scroll-preview-v1.mp4",
  "MS-HERO-NEON01": "/assets/videos/neon-forge-preview-v1.mp4",
  "MS-HERO-LUMI01": "/assets/videos/lumina-preview-v1.mp4",
  "MS-HERO-TERR01": "/assets/videos/terra-preview-v1.mp4",
  "MS-HERO-APEX01": "/assets/videos/apex-preview-v1.mp4",
  "MS-HERO-REVL01": "/assets/videos/revel-scroll-preview-v1.mp4",
  "MS-HERO-PRSM01": "/assets/videos/prism-scroll-preview-v1.mp4",
  "MS-SEC-FOLI01": "/assets/videos/folio-scroll-preview-v1.mp4",
  "MS-HERO-MIRA01": "/assets/videos/mirage-scroll-preview-v1.mp4",
  "MS-HERO-SABL01": "/assets/videos/sable-holiday-preview-v1.mp4",
  "MS-HERO-AXIO01": "/assets/videos/axiom-fintech-preview-v1.mp4",
  "MS-HERO-ELYS01": "/assets/videos/elyse-scroll-preview-v1.mp4",
  "MS-HERO-NEXU01": "/assets/videos/nexus-enterprise-preview-v1.mp4",
  "MS-SEC-HELI01": "/assets/videos/helix-gallery-preview-v1.mp4",
  "MS-HERO-ACTU01": "/assets/videos/actually-hero-preview-v1.mp4",
  "MS-SEC-LINE01": "/assets/videos/lineup-reveal-preview-v1.webm",
  "MS-SEC-STUDIO01": "/assets/videos/studio-sequence-preview-v1.webm",
  "MS-SEC-PHOB01": "/assets/videos/phobia-forms-preview-v1.webm",
  "MS-SEC-DOPA01": "/assets/videos/dopamine-footer-preview-v1.webm",
  "MS-HERO-ROAD01": "/assets/videos/roadster-studio-drive-preview-v1.mp4",
  "MS-HERO-NOMA01": "/assets/videos/nomad-preview-v1.mp4",
  // Operator screenshot WebM (law: page + browse/gallery stay WebM — never re-encode to mp4)
  "MS-HERO-STIL01": "/assets/videos/still-preview-v1.webm",
  // Agent capture; operator did not supply screenshot WebM for this SKU
  "MS-HERO-BLOM01": "/assets/videos/bloom-preview-v1.mp4",
  "MS-HERO-ACNE01": "/assets/videos/acne-secret-preview-v1.mp4",
  "MS-HERO-VERV01": "/assets/videos/verve-preview-v1.mp4",
  "MS-HERO-ORBI01": "/assets/videos/orbit-preview-v1.mp4",
  // Operator screenshot WebM (law: page + browse/gallery stay WebM — never re-encode to mp4)
  "MS-HERO-ZERO01": "/assets/videos/zero-energy-preview-v1.webm",
  // Operator Premiere GrokBot-VEGAS.webm — FULL 63.76s on product page AND gallery
  "MS-HERO-GROK01": "/assets/videos/grokbot-preview-v1.webm",
  "MS-HERO-SKYS01": "/assets/videos/skyspires-preview-v1.mp4",
};

/**
 * Larger / anti-theft fullscreen product previews (1920×1080 target).
 * Falls back to REAL_PREVIEW_VIDEOS when missing.
 * Cursor arrow + glass chrome are HTML overlays (not burnt into these files).
 */
export const REAL_PREVIEW_FULLSCREEN_VIDEOS: Record<string, string> = {
  "MS-HERO-VERT01": "/assets/videos/vertex-preview-fs-v1.mp4",
  "MS-HERO-MERI01": "/assets/videos/meridian-scroll-preview-fs-v1.mp4",
  "MS-HERO-AETH01": "/assets/videos/aether-preview-fs-v1.mp4",
  "MS-HERO-NEON01": "/assets/videos/neon-forge-preview-fs-v1.mp4",
  "MS-HERO-LUMI01": "/assets/videos/lumina-preview-fs-v1.mp4",
  "MS-HERO-TERR01": "/assets/videos/terra-preview-fs-v1.mp4",
  "MS-HERO-APEX01": "/assets/videos/apex-preview-fs-v1.mp4",
  "MS-HERO-REVL01": "/assets/videos/revel-scroll-preview-fs-v1.mp4",
  "MS-HERO-PRSM01": "/assets/videos/prism-scroll-preview-fs-v1.mp4",
  "MS-SEC-FOLI01": "/assets/videos/folio-scroll-preview-fs-v1.mp4",
  "MS-HERO-MIRA01": "/assets/videos/mirage-scroll-preview-fs-v1.mp4",
  "MS-HERO-SABL01": "/assets/videos/sable-holiday-preview-fs-v1.mp4",
  "MS-HERO-AXIO01": "/assets/videos/axiom-fintech-preview-fs-v1.mp4",
  "MS-HERO-ELYS01": "/assets/videos/elyse-scroll-preview-fs-v1.mp4",
  "MS-HERO-NEXU01": "/assets/videos/nexus-enterprise-preview-fs-v1.mp4",
  "MS-SEC-HELI01": "/assets/videos/helix-gallery-preview-fs-v1.mp4",
  "MS-HERO-ACTU01": "/assets/videos/actually-hero-preview-fs-v1.mp4",
  "MS-SEC-LINE01": "/assets/videos/lineup-reveal-preview-fs-v1.mp4",
  "MS-SEC-STUDIO01": "/assets/videos/studio-sequence-preview-fs-v1.mp4",
  "MS-SEC-PHOB01": "/assets/videos/phobia-forms-preview-fs-v1.mp4",
  "MS-SEC-DOPA01": "/assets/videos/dopamine-footer-preview-fs-v1.mp4",
  "MS-HERO-ROAD01": "/assets/videos/roadster-studio-drive-preview-fs-v1.mp4",
  "MS-HERO-NOMA01": "/assets/videos/nomad-preview-fs-v1.mp4",
  "MS-HERO-STIL01": "/assets/videos/still-preview-fs-v1.mp4",
  "MS-HERO-BLOM01": "/assets/videos/bloom-preview-fs-v1.mp4",
  "MS-HERO-ACNE01": "/assets/videos/acne-secret-preview-fs-v1.mp4",
  "MS-HERO-VERV01": "/assets/videos/verve-preview-fs-v1.mp4",
  "MS-HERO-ORBI01": "/assets/videos/orbit-preview-fs-v1.mp4",
  "MS-HERO-ZERO01": "/assets/videos/zero-energy-preview-fs-v1.mp4",
  "MS-HERO-GROK01": "/assets/videos/grokbot-preview-fs-v1.mp4",
  "MS-HERO-SKYS01": "/assets/videos/skyspires-preview-fs-v1.mp4",
};

/** Scroll-as-narrative products: show Scroll cue badge on product previews. */
export const SCROLL_EXPERIENCE_PRODUCT_IDS = new Set([
  "MS-HERO-MERI01",
  "MS-HERO-VERT01",
  "MS-HERO-REVL01",
  "MS-HERO-PRSM01",
  "MS-SEC-FOLI01",
  "MS-HERO-MIRA01",
  "MS-HERO-ELYS01",
  "MS-SEC-HELI01",
  "MS-HERO-ACTU01",
  "MS-SEC-LINE01",
  "MS-SEC-STUDIO01",
  "MS-HERO-ROAD01",
  "MS-HERO-STIL01",
  "MS-HERO-ZERO01",
  "MS-HERO-GROK01",
  "MS-HERO-SKYS01",
]);

export function resolvePreviewVideoFullscreen(
  id: string,
  options?: { previewVideoFullscreen?: string; previewVideo?: string }
): string | undefined {
  const owned = [
    options?.previewVideoFullscreen,
    REAL_PREVIEW_FULLSCREEN_VIDEOS[id],
    options?.previewVideo,
    REAL_PREVIEW_VIDEOS[id],
  ].filter(Boolean) as string[];
  for (const src of owned) {
    if (src.startsWith("/assets/videos/") || src.startsWith("/assets/previews/")) {
      return src;
    }
  }
  return undefined;
}

export function isScrollExperienceProduct(id: string): boolean {
  return SCROLL_EXPERIENCE_PRODUCT_IDS.has(id);
}

/** Short demo route slugs (reference builds). Product pages use video, not these embeds. */
export const DEMO_SLUG_BY_ID: Record<string, string> = {
  "MS-HERO-NEON01": "cleanroom-neon",
  "MS-HERO-AETH01": "cleanroom-aether",
  "MS-HERO-VERT01": "cleanroom-vertex",
  "MS-HERO-LUMI01": "cleanroom-lumina",
  "MS-HERO-TERR01": "cleanroom-terra",
  "MS-HERO-APEX01": "cleanroom-apex",
  "MS-HERO-REVL01": "cleanroom-revel",
  "MS-HERO-PRSM01": "cleanroom-prism",
  "MS-SEC-FOLI01": "cleanroom-folio",
  "MS-HERO-MIRA01": "cleanroom-mirage",
  "MS-HERO-SABL01": "cleanroom-sable",
  "MS-HERO-AXIO01": "cleanroom-axiom",
  "MS-HERO-ELYS01": "cleanroom-elyse",
  "MS-HERO-VERV01": "cleanroom-verve",
  "MS-HERO-ORBI01": "cleanroom-orbit",
  "MS-HERO-NOMA01": "cleanroom-nomad",
  "MS-HERO-NEXU01": "cleanroom-nexus",
  "MS-SEC-HELI01": "cleanroom-helix",
  "MS-HERO-ACTU01": "cleanroom-actually",
  "MS-SEC-LINE01": "cleanroom-lineup",
  "MS-SEC-STUDIO01": "cleanroom-studio",
  "MS-SEC-PHOB01": "cleanroom-phobia",
  "MS-SEC-DOPA01": "cleanroom-dopamine",
  "MS-HERO-ROAD01": "cleanroom-roadster",
  "MS-HERO-MERI01": "scroll-narrative",
  "MS-HERO-STIL01": "cleanroom-still",
  "MS-HERO-BLOM01": "cleanroom-bloom",
  "MS-HERO-ACNE01": "cleanroom-acne",
  "MS-HERO-ZERO01": "cleanroom-zero",
  "MS-HERO-GROK01": "cleanroom-grokbot",
  "MS-HERO-SKYS01": "cleanroom-skyspires",
};

export type GalleryPrompt = {
  id: string;
  slug: string;
  title: string;
  type: string;
  /** Extra type memberships for multi-type browse filters (optional). */
  types?: string[];
  category: string;
  styleTags: string[];
  motionIntensity: string;
  priceTier: string;
  thumbnail: string;
  previewVideo?: string;
  demoSlug?: string;
};

export type GallerySearchParams = {
  type?: string;
  category?: string;
  style?: string;
  intensity?: string;
  q?: string;
  sort?: string;
};

/** Brand name before subtitle separator - matches motionsites card titles. */
export function shortTitle(title: string): string {
  const head = (title.split(/\s+[\u2014\u2013-]\s+/)[0] ?? title).trim();
  return head
    .split(" ")
    .map((w) => {
      if (w.length <= 3 && w === w.toUpperCase()) return w;
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(" ");
}

export function categoryLabel(id: string): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export function typeLabel(type: string): string {
  if (type === "hero") return "Hero Section";
  if (type === "landing-page") return "Landing Page";
  if (type === "section") return "Section";
  if (type === "special") return "Special";
  return type.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Browse type filter match: primary `type` or optional multi-type list.
 * Mirrors how type + genre already let a product sit under Hero and Agency.
 */
export function productMatchesType(
  p: { type: string; types?: string[] | null },
  filterType: string
): boolean {
  if (!filterType) return true;
  if (p.type === filterType) return true;
  if (Array.isArray(p.types) && p.types.includes(filterType)) return true;
  return false;
}

/** All distinct type ids for a product (primary first). */
export function productTypeIds(p: {
  type: string;
  types?: string[] | null;
}): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const t of [p.type, ...(Array.isArray(p.types) ? p.types : [])]) {
    if (!t || seen.has(t)) continue;
    seen.add(t);
    out.push(t);
  }
  return out;
}

/** Multi-type label e.g. "Hero Section · Landing Page" */
export function typeLabelsJoined(p: {
  type: string;
  types?: string[] | null;
}): string {
  return productTypeIds(p).map(typeLabel).join(" · ");
}

/** Genre line shown on product cards and product pages: "Hero Section · Tech & Startup" */
export function genreLine(type: string, categoryId: string): string {
  return [typeLabel(type), categoryLabel(categoryId)].filter(Boolean).join(" · ");
}

/** Genre line with multi-type support when product has types[]. */
export function genreLineForProduct(
  p: { type: string; types?: string[] | null; genreId?: string; category?: string },
  categoryId?: string
): string {
  const cat = categoryId ?? p.genreId ?? p.category ?? "";
  return [typeLabelsJoined(p), categoryLabel(cat)].filter(Boolean).join(" · ");
}

/**
 * Resolve product preview video path (public URL).
 * Prefer real captures under /assets/videos (or known map), then explicit frontmatter
 * under /previews once you upload there. Scaffold .mp4 stubs without a file still resolve
 * as paths - the player falls back to poster if the file 404s.
 *
 * Upload workflow: put file in public/assets/videos/{name}.mp4 and set either
 * previewVideo or videoBackgrounds[0].file in the product MDX.
 */
export function resolvePreviewVideo(
  id: string,
  options?: {
    previewVideo?: string;
    videoBackgroundFile?: string;
  }
): string | undefined {
  // Storefront capture first. Never let client HD (videoBackgrounds) beat
  // an explicit previewVideo / operator WebM.
  const owned = [
    REAL_PREVIEW_VIDEOS[id],
    options?.previewVideo,
    options?.videoBackgroundFile,
  ].filter(Boolean) as string[];

  for (const src of owned) {
    if (!src.startsWith("/")) continue;
    if (src.startsWith("/assets/videos/") || src.startsWith("/assets/previews/")) {
      return src;
    }
  }

  // Explicit /previews/{id}.mp4 after you drop files there
  const pv = options?.previewVideo;
  if (pv?.startsWith("/previews/") && /\.(mp4|webm)$/i.test(pv)) {
    return pv;
  }

  return undefined;
}

export function resolvePoster(
  thumbnail?: string,
  videoBackgroundPoster?: string
): string {
  if (videoBackgroundPoster?.startsWith("/")) return videoBackgroundPoster;
  if (thumbnail?.startsWith("/")) return thumbnail;
  return "";
}

export function demoHref(id: string, fallbackSlug: string): string {
  const demo = DEMO_SLUG_BY_ID[id];
  return demo ? `/demo/${demo}` : `/browse/${fallbackSlug}`;
}

/** Reverse map: short demo slug → prompt id */
export function promptIdFromDemoSlug(demoSlug: string): string | undefined {
  return Object.entries(DEMO_SLUG_BY_ID).find(([, s]) => s === demoSlug)?.[0];
}

/** Public AI tool labels for product meta (never include v0). */
export const DEFAULT_AI_TOOLS = [
  "Cursor",
  "Claude",
  "Codex",
  "Grok Build",
  "Lovable",
  "Bolt",
] as const;

const AI_TOOL_LABELS: Record<string, string> = {
  cursor: "Cursor",
  claude: "Claude",
  codex: "Codex",
  "grok-build": "Grok Build",
  lovable: "Lovable",
  bolt: "Bolt",
  replit: "Replit",
  windsurf: "Windsurf",
};

/** Build tools list from aiToolsRating frontmatter; falls back to defaults. Never includes v0. */
export function resolveAiTools(aiToolsRating?: Record<string, number>): string[] {
  if (!aiToolsRating || typeof aiToolsRating !== "object") {
    return [...DEFAULT_AI_TOOLS];
  }
  const ranked = Object.entries(aiToolsRating)
    .filter(([key, score]) => key !== "v0" && typeof score === "number" && score >= 3)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => AI_TOOL_LABELS[key] ?? key.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));

  return ranked.length > 0 ? ranked : [...DEFAULT_AI_TOOLS];
}
