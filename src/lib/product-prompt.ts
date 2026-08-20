import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  DEMO_SLUG_BY_ID,
  resolvePreviewVideo,
  resolvePreviewVideoFullscreen,
  resolvePoster,
  resolveAiTools,
  shortTitle,
  categoryLabel,
  genreLine,
  typeLabel,
  isScrollExperienceProduct,
} from "@/lib/gallery-utils";
import { readStore } from "@/lib/cms/store";
import { ensureCmsSeeded, ensureCmsSeededSync } from "@/lib/cms/seed";
import { cmsProductToPublic, toRelated } from "@/lib/cms/public-map";

const CONTENT_ROOT = path.join(process.cwd(), "content/prompts");

/**
 * Product page data model - one shape for every prompt (hero / section / LP / special).
 * Primary source: CMS store (admin). Fallback: MDX + manifest.
 */
export type ProductPrompt = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  type: string;
  typeLabel: string;
  category: string;
  categoryLabel: string;
  genreLine: string;
  styleTags: string[];
  motionIntensity: string;
  priceTier: string;
  difficulty?: string;
  thumbnail: string;
  /** In-page product preview (downsized / card-scale capture). */
  previewVideo?: string;
  /** Fullscreen overlay preview (higher res when available). */
  previewVideoFullscreen?: string;
  poster: string;
  liveDemoHref?: string;
  aiTools: string[];
  fullPromptText: string;
  body: string;
  likes: number;
  isFree: boolean;
  /** Show Scroll experience badge on product previews. */
  isScrollExperience: boolean;
};

export type RelatedProductCard = {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  type: string;
  typeLabel: string;
  category: string;
  categoryLabel: string;
  genreLine: string;
  thumbnail: string;
  previewVideo?: string;
  priceTier: string;
};

function walkMdx(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkMdx(full, out);
    else if (entry.isFile() && entry.name.endsWith(".mdx") && !entry.name.startsWith("_")) {
      out.push(full);
    }
  }
  return out;
}

function buildCopyText(fm: Record<string, unknown>, body: string): string {
  const title = String(fm.title ?? "");
  const type = String(fm.type ?? "hero");
  const category = String(fm.category ?? "");
  const desc = String(fm.description ?? "");
  const tools = fm.frameworksSupported
    ? (fm.frameworksSupported as string[]).join(", ")
    : "React, Tailwind CSS, Framer Motion";

  return [
    `# ${title}`,
    ``,
    `Type: ${type} · Category: ${category}`,
    desc ? `Overview: ${desc}` : "",
    `Stack: ${tools}`,
    ``,
    `---`,
    ``,
    `You are an expert front-end engineer. Build this design EXACTLY as specified.`,
    `Do not invent a different aesthetic. Do not apply Liquid Glass / Triada / MS shell styles`,
    `unless this specification explicitly requires them for THIS design.`,
    `Produce a single production-ready React + TypeScript + Tailwind component (or page).`,
    `Support prefers-reduced-motion. Mobile-first responsive.`,
    ``,
    body.trim(),
    ``,
    `---`,
    `When done: one self-contained component file, default export, ready to paste into Cursor,`,
    `Claude, Codex, Grok Build, Lovable, or Bolt.`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");
}

/** Stable social-proof baseline in [250, 999] — never start public likes at 0. */
function socialProofLikes(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return 250 + (h % 750);
}

function firstVideoBg(fm: Record<string, unknown>): { file?: string; poster?: string } {
  const list = fm.videoBackgrounds;
  if (!Array.isArray(list) || list.length === 0) return {};
  const first = list[0] as Record<string, unknown>;
  return {
    file: typeof first.file === "string" ? first.file : undefined,
    poster: typeof first.poster === "string" ? first.poster : undefined,
  };
}

function toProduct(
  fm: Record<string, unknown>,
  body: string,
  slugFallback?: string
): ProductPrompt {
  const id = String(fm.id ?? "");
  const slug = String(fm.slug ?? slugFallback ?? id);
  const title = String(fm.title ?? id);
  const type = String(fm.type ?? "hero");
  const category = String(fm.category ?? "");
  const priceTier = String(fm.priceTier ?? "pro");
  // Only priceTier "free" is a free listing. starter/pro/agency are paid SKUs.
  const isFree = priceTier === "free";
  const demo = DEMO_SLUG_BY_ID[id];
  const thumb = String(fm.thumbnail ?? "");
  const vb = firstVideoBg(fm);
  const previewFromFm = typeof fm.previewVideo === "string" ? fm.previewVideo : undefined;
  const previewVideo = resolvePreviewVideo(id, {
    previewVideo: previewFromFm,
    videoBackgroundFile: vb.file,
  });
  const previewFsFromFm =
    typeof fm.previewVideoFullscreen === "string"
      ? fm.previewVideoFullscreen
      : undefined;
  const previewVideoFullscreen = resolvePreviewVideoFullscreen(id, {
    previewVideoFullscreen: previewFsFromFm,
    previewVideo,
  });
  const poster = resolvePoster(thumb, vb.poster);
  const rating =
    fm.aiToolsRating && typeof fm.aiToolsRating === "object"
      ? (fm.aiToolsRating as Record<string, number>)
      : undefined;

  return {
    id,
    slug,
    title,
    shortTitle: shortTitle(title),
    description: String(fm.description ?? ""),
    type,
    typeLabel: typeLabel(type),
    category,
    categoryLabel: categoryLabel(category),
    genreLine: genreLine(type, category),
    styleTags: (fm.styleTags as string[]) ?? [],
    motionIntensity: String(fm.motionIntensity ?? "medium"),
    priceTier,
    difficulty: fm.difficulty ? String(fm.difficulty) : undefined,
    thumbnail: thumb,
    previewVideo,
    previewVideoFullscreen,
    poster: poster || thumb,
    liveDemoHref: demo ? `/demo/${demo}` : undefined,
    aiTools: resolveAiTools(rating),
    fullPromptText: buildCopyText(fm, body),
    body,
    likes: socialProofLikes(id),
    isFree,
    isScrollExperience: isScrollExperienceProduct(id),
  };
}

function parseMdxFile(file: string): ProductPrompt | null {
  try {
    const raw = fs.readFileSync(file, "utf-8");
    const { data, content: body } = matter(raw);
    return toProduct(data as Record<string, unknown>, body);
  } catch {
    return null;
  }
}

/** True once CMS has been seeded or holds any catalog data. */
function cmsIsAuthoritative(store: {
  seededAt: string | null;
  products: unknown[];
  genres: unknown[];
}): boolean {
  return Boolean(store.seededAt || store.products.length > 0 || store.genres.length > 0);
}

/**
 * CMS-first load. Once the store is bootstrapped, CMS is the sole catalog source
 * (even if every product is draft / unpublished). Never fall back to MDX in that case
 * or admin unpublish/delete would silently resurrect static content.
 */
function loadFromCms(): ProductPrompt[] | null {
  try {
    const store = ensureCmsSeededSync(false);
    if (!cmsIsAuthoritative(store)) return null;
    const published = store.products
      .filter((p) => p.status === "published")
      .sort((a, b) => a.sortOrder - b.sortOrder);
    return published.map((p) => cmsProductToPublic(p, store.genres));
  } catch {
    return null;
  }
}

async function loadFromCmsAsync(): Promise<ProductPrompt[] | null> {
  try {
    await ensureCmsSeeded(false);
    const store = readStore();
    if (!cmsIsAuthoritative(store)) return null;
    return store.products
      .filter((p) => p.status === "published")
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((p) => cmsProductToPublic(p, store.genres));
  } catch {
    return null;
  }
}

function loadFromMdxAndManifest(): ProductPrompt[] {
  const out: ProductPrompt[] = [];
  const seen = new Set<string>();
  for (const file of walkMdx(CONTENT_ROOT)) {
    const p = parseMdxFile(file);
    if (!p || !p.slug || seen.has(p.slug)) continue;
    seen.add(p.slug);
    out.push(p);
  }
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "public/manifest.json"), "utf-8");
    const { prompts } = JSON.parse(raw) as { prompts: Array<Record<string, unknown>> };
    for (const row of prompts) {
      const slug = String(row.slug ?? "");
      if (!slug || seen.has(slug)) continue;
      const stubBody = `## Design\n\nBuild a production-ready ${String(row.type ?? "hero")} matching the title and category.\n`;
      const p = toProduct(row, stubBody, slug);
      seen.add(slug);
      out.push(p);
    }
  } catch {
    /* optional */
  }
  return out;
}

/** All published products - CMS first (admin order). MDX only if CMS never bootstrapped. */
export function loadAllProducts(): ProductPrompt[] {
  const cms = loadFromCms();
  // null = CMS not bootstrapped; [] = bootstrapped but nothing published
  if (cms !== null) return cms;
  return loadFromMdxAndManifest();
}

/** Async variant that guarantees CMS seed completes first. */
export async function loadAllProductsAsync(): Promise<ProductPrompt[]> {
  const cms = await loadFromCmsAsync();
  if (cms !== null) return cms;
  return loadFromMdxAndManifest();
}

export function loadProductBySlug(slug: string): ProductPrompt | null {
  try {
    const store = ensureCmsSeededSync(false);
    if (cmsIsAuthoritative(store)) {
      const raw = store.products.find((p) => p.slug === slug || p.id === slug);
      if (!raw || raw.status !== "published") return null;
      return cmsProductToPublic(raw, store.genres);
    }
  } catch {
    /* fall through to MDX */
  }

  for (const file of walkMdx(CONTENT_ROOT)) {
    const p = parseMdxFile(file);
    if (!p) continue;
    if (p.slug === slug || p.id === slug) return p;
  }

  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "public/manifest.json"), "utf-8");
    const { prompts } = JSON.parse(raw) as { prompts: Array<Record<string, unknown>> };
    const row = prompts.find((x) => String(x.slug) === slug || String(x.id) === slug);
    if (!row) return null;
    const stubBody = `## Design\n\nBuild a production-ready hero matching the title and category for this product.\n`;
    return toProduct(row, stubBody, slug);
  } catch {
    return null;
  }
}

export async function loadProductBySlugAsync(slug: string): Promise<ProductPrompt | null> {
  await ensureCmsSeeded(false);
  return loadProductBySlug(slug);
}

export function listProductSlugs(): string[] {
  return loadAllProducts().map((p) => p.slug).filter(Boolean);
}

export async function listProductSlugsAsync(): Promise<string[]> {
  const all = await loadAllProductsAsync();
  return all.map((p) => p.slug).filter(Boolean);
}

function toRelatedCard(p: ProductPrompt): RelatedProductCard {
  return toRelated(p);
}

/**
 * Scored related products for the product page.
 * - Excludes the current product.
 * - Ranked by type / category / style tags / intensity (not random).
 * - Caller splits: rail = first 2, bottom gallery = remainder (no repeats).
 */
export function loadRelatedProducts(current: ProductPrompt, limit = 10): RelatedProductCard[] {
  const all = loadAllProducts().filter((p) => p.id !== current.id);

  const scored = all.map((p) => {
    let score = 0;
    if (p.type === current.type) score += 40;
    if (p.category === current.category) score += 30;
    const shared = p.styleTags.filter((t) => current.styleTags.includes(t)).length;
    score += shared * 8;
    if (p.motionIntensity === current.motionIntensity) score += 5;
    return { p, score };
  });

  scored.sort((a, b) => b.score - a.score || a.p.shortTitle.localeCompare(b.p.shortTitle));
  const withSignal = scored.filter((x) => x.score > 0);
  const pool = withSignal.length >= Math.min(4, limit) ? withSignal : scored;
  // De-dupe by id (defensive; loadAllProducts should already be unique)
  const seen = new Set<string>();
  const unique: RelatedProductCard[] = [];
  for (const { p } of pool) {
    if (seen.has(p.id) || p.id === current.id) continue;
    seen.add(p.id);
    unique.push(toRelatedCard(p));
    if (unique.length >= limit) break;
  }
  return unique;
}
