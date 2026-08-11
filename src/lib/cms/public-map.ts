/**
 * Map CMS entities → public product/gallery shapes used by the marketing site.
 */
import type { CmsGenre, CmsProduct } from "./types";
import {
  DEMO_SLUG_BY_ID,
  shortTitle,
  typeLabel,
  resolvePreviewVideoFullscreen,
  isScrollExperienceProduct,
} from "@/lib/gallery-utils";
import type { ProductPrompt, RelatedProductCard } from "@/lib/product-prompt";
import type { GalleryPrompt } from "@/lib/gallery-utils";

export function genreLabelMap(genres: CmsGenre[]): Map<string, string> {
  return new Map(genres.map((g) => [g.id, g.label]));
}

/**
 * Free plan may unlock only `priceTier: free` listings (quota: plans.free.limits.promptsPerMonth).
 * `starter` is a paid plan tier for catalog SKUs that are still entry-level paid.
 * `pro` / `agency` listings require paid membership — never free-copy on the product page.
 */
export function isFreeListingTier(priceTier: string): boolean {
  return priceTier === "free";
}

export function cmsProductToPublic(
  p: CmsProduct,
  genres: CmsGenre[]
): ProductPrompt {
  const labels = genreLabelMap(genres);
  const categoryLabel = labels.get(p.genreId) ?? p.genreId;
  // Only true free-tier SKUs are copyable without paywall. Starter/Pro/Agency = paid.
  const isFree = isFreeListingTier(p.priceTier);
  const demoSlug = DEMO_SLUG_BY_ID[p.id];
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    shortTitle: shortTitle(p.title),
    description: p.description,
    type: p.type,
    typeLabel: typeLabel(p.type),
    category: p.genreId,
    categoryLabel,
    // Prefer CMS genre label over static taxonomy (admin may rename genres).
    genreLine: `${typeLabel(p.type)} · ${categoryLabel}`,
    styleTags: p.styleTags,
    motionIntensity: p.motionIntensity,
    priceTier: p.priceTier,
    difficulty: p.difficulty,
    thumbnail: p.thumbnail || p.poster,
    previewVideo: p.previewVideo || undefined,
    previewVideoFullscreen: resolvePreviewVideoFullscreen(p.id, {
      previewVideo: p.previewVideo || undefined,
    }),
    poster: p.poster || p.thumbnail,
    liveDemoHref: demoSlug ? `/demo/${demoSlug}` : undefined,
    aiTools: p.aiTools.length ? p.aiTools : ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
    fullPromptText: buildPromptText(p),
    body: p.body,
    likes: p.likes,
    isFree,
    isScrollExperience: isScrollExperienceProduct(p.id),
  };
}

function buildPromptText(p: CmsProduct): string {
  return [
    `# ${p.title}`,
    ``,
    `Type: ${p.type} · Genre: ${p.genreId}`,
    p.description ? `Overview: ${p.description}` : "",
    `Tools: ${p.aiTools.join(", ")}`,
    ``,
    `---`,
    ``,
    `You are an expert front-end engineer. Build this design EXACTLY as specified.`,
    `Do not invent a different aesthetic. Do not apply Liquid Glass / Triada / MS shell styles`,
    `unless this specification explicitly requires them for THIS design.`,
    `Produce a single production-ready React + TypeScript + Tailwind component (or page).`,
    `Support prefers-reduced-motion. Mobile-first responsive.`,
    ``,
    p.body.trim(),
    ``,
    `---`,
    `When done: one self-contained component file, default export, ready to paste into Cursor,`,
    `Claude, Codex, Grok Build, Lovable, or Bolt.`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

export function cmsProductToGallery(p: CmsProduct): GalleryPrompt {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    type: p.type,
    category: p.genreId,
    styleTags: p.styleTags,
    motionIntensity: p.motionIntensity,
    priceTier: p.priceTier,
    thumbnail: p.thumbnail || p.poster,
    previewVideo: p.previewVideo || undefined,
  };
}

export function toRelated(p: ProductPrompt): RelatedProductCard {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    shortTitle: p.shortTitle,
    type: p.type,
    typeLabel: p.typeLabel,
    category: p.category,
    categoryLabel: p.categoryLabel,
    genreLine: p.genreLine,
    thumbnail: p.thumbnail || p.poster,
    previewVideo: p.previewVideo,
    priceTier: p.priceTier,
  };
}
