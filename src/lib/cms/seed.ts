import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { categories } from "@/config/taxonomy";
import { collections as staticCollections } from "@/config/collections";
import {
  resolvePreviewVideo,
  resolvePoster,
  resolveAiTools,
} from "@/lib/gallery-utils";
import {
  readStore,
  updateStore,
  withStoreLockSync,
  writeStoreSnapshot,
  type CmsStore,
} from "./store";
import type { CmsCollection, CmsGenre, CmsProduct, ProductType, MotionIntensity, PriceTier, ProductStatus } from "./types";
import { newId, slugify } from "./slug";

const CONTENT_ROOT = path.join(process.cwd(), "content/prompts");

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

function nowIso(): string {
  return new Date().toISOString();
}

function genresFromTaxonomy(): CmsGenre[] {
  const t = nowIso();
  return categories.map((c, i) => ({
    id: c.id,
    label: c.label,
    description: c.description,
    icon: c.icon,
    sortOrder: i,
    visible: true,
    createdAt: t,
    updatedAt: t,
  }));
}

function productFromMdx(file: string, index: number): CmsProduct | null {
  try {
    const raw = fs.readFileSync(file, "utf-8");
    const { data, content: body } = matter(raw);
    const fm = data as Record<string, unknown>;
    const id = String(fm.id ?? newId("MS"));
    const title = String(fm.title ?? id);
    const type = String(fm.type ?? "hero") as ProductType;
    const genreId = String(fm.category ?? "saas");
    const thumb = String(fm.thumbnail ?? "");
    const list = Array.isArray(fm.videoBackgrounds) ? fm.videoBackgrounds : [];
    const first = (list[0] as Record<string, unknown> | undefined) ?? {};
    const vbFile = typeof first.file === "string" ? first.file : undefined;
    const vbPoster = typeof first.poster === "string" ? first.poster : undefined;
    const previewFromFm = typeof fm.previewVideo === "string" ? fm.previewVideo : undefined;
    const previewVideo =
      resolvePreviewVideo(id, {
        previewVideo: previewFromFm,
        videoBackgroundFile: vbFile,
      }) ?? "";
    const poster = resolvePoster(thumb, vbPoster);
    const rating =
      fm.aiToolsRating && typeof fm.aiToolsRating === "object"
        ? (fm.aiToolsRating as Record<string, number>)
        : undefined;
    const t = nowIso();
    return {
      id,
      slug: String(fm.slug ?? slugify(title)),
      title,
      description: String(fm.description ?? ""),
      type: (["hero", "section", "landing-page", "special"].includes(type)
        ? type
        : "hero") as ProductType,
      genreId,
      styleTags: Array.isArray(fm.styleTags) ? (fm.styleTags as string[]) : [],
      motionIntensity: String(fm.motionIntensity ?? "medium") as MotionIntensity,
      difficulty: (String(fm.difficulty ?? "intermediate") as CmsProduct["difficulty"]),
      priceTier: String(fm.priceTier ?? "pro") as PriceTier,
      // MDX "draft" means content QA state, not storefront visibility.
      // Catalog seeds as published so the public site works; unpublish in admin.
      status: (String(fm.status ?? "published") as ProductStatus) === "archived"
        ? "archived"
        : "published",
      body: body.trim(),
      thumbnail: thumb,
      poster: poster || thumb,
      previewVideo,
      aiTools: resolveAiTools(rating),
      sortOrder: index,
      likes: 250 + ((id.length * 97 + id.charCodeAt(0) * 13) % 750),
      createdAt: String(fm.created ?? t),
      updatedAt: String(fm.updated ?? t),
    };
  } catch {
    return null;
  }
}

function collectionsFromConfig(products: CmsProduct[]): CmsCollection[] {
  const byId = new Map(products.map((p) => [p.id, p]));
  const t = nowIso();
  return staticCollections.map((c, i) => ({
    id: c.id || newId("COL"),
    slug: c.slug,
    title: c.title,
    description: c.description,
    coverImage: c.cover ?? "",
    productIds: (c.promptIds ?? []).filter((id) => byId.has(id)),
    priceTier: (c.priceTier as PriceTier) ?? "pro",
    isFeatured: Boolean(c.isFeatured),
    sortOrder: i,
    visible: true,
    createdAt: t,
    updatedAt: t,
  }));
}

function buildSeedPayload(): {
  genres: CmsGenre[];
  products: CmsProduct[];
  collections: CmsCollection[];
} {
  const genres = genresFromTaxonomy();
  const files = walkMdx(CONTENT_ROOT);
  const products: CmsProduct[] = [];
  files.forEach((file, i) => {
    const p = productFromMdx(file, i);
    if (p) products.push(p);
  });

  if (products.length === 0) {
    try {
      const raw = fs.readFileSync(
        path.join(process.cwd(), "public", "manifest.json"),
        "utf-8"
      );
      const { prompts } = JSON.parse(raw) as {
        prompts: Array<Record<string, unknown>>;
      };
      prompts.forEach((row, i) => {
        const id = String(row.id ?? newId("MS"));
        const title = String(row.title ?? id);
        products.push({
          id,
          slug: String(row.slug ?? slugify(title)),
          title,
          description: "",
          type: String(row.type ?? "hero") as ProductType,
          genreId: String(row.category ?? "saas"),
          styleTags: Array.isArray(row.styleTags) ? (row.styleTags as string[]) : [],
          motionIntensity: String(row.motionIntensity ?? "medium") as MotionIntensity,
          difficulty: "intermediate",
          priceTier: String(row.priceTier ?? "pro") as PriceTier,
          status: "published",
          body: "## Design\n\nBuild this product exactly as specified.\n",
          thumbnail: String(row.thumbnail ?? ""),
          poster: String(row.thumbnail ?? ""),
          previewVideo:
            resolvePreviewVideo(id, {
              previewVideo:
                typeof row.previewVideo === "string" ? row.previewVideo : undefined,
            }) ?? "",
          aiTools: resolveAiTools(),
          sortOrder: i,
          likes: 100,
          createdAt: nowIso(),
          updatedAt: nowIso(),
        });
      });
    } catch {
      /* ignore */
    }
  }

  return {
    genres,
    products,
    collections: collectionsFromConfig(products),
  };
}

/**
 * Append MDX products that are missing from an already-seeded CMS store.
 * Does not overwrite admin edits or resurrect deleted products by title —
 * only adds when the product **id** is absent. Safe for every gallery load.
 */
function mergeMissingMdxProducts(draft: CmsStore): number {
  const have = new Set(draft.products.map((p) => p.id));
  const files = walkMdx(CONTENT_ROOT);
  let maxSort = draft.products.reduce(
    (m, p) => Math.max(m, p.sortOrder ?? 0),
    -1
  );
  let added = 0;
  for (const file of files) {
    const p = productFromMdx(file, maxSort + 1);
    if (!p || have.has(p.id)) continue;
    maxSort += 1;
    p.sortOrder = maxSort;
    draft.products.push(p);
    have.add(p.id);
    added += 1;
  }
  return added;
}

/**
 * Seed CMS from MDX + taxonomy if empty (or force=true).
 * Safe to call on every public request when empty - only writes once.
 *
 * seededAt alone is enough to skip re-seed: an empty product list after admin
 * deletes is intentional and must not resurrect MDX content.
 *
 * After seed, new MDX product ids (e.g. MS-SEC-STUDIO01) are **merged in**
 * without wiping admin order or drafts.
 */
export async function ensureCmsSeeded(force = false): Promise<CmsStore> {
  const current = readStore();
  if (!force && (current.products.length > 0 || current.seededAt)) {
    // Merge any new MDX SKUs that were added after the initial seed.
    // Only write when something was actually added (avoid thrashing store.json).
    return withStoreLockSync(() => {
      const draft: CmsStore = {
        version: 1,
        seededAt: current.seededAt,
        genres: current.genres.map((g) => ({ ...g })),
        products: current.products.map((p) => ({ ...p })),
        collections: current.collections.map((c) => ({
          ...c,
          productIds: [...c.productIds],
        })),
      };
      const added = mergeMissingMdxProducts(draft);
      if (added > 0) writeStoreSnapshot(draft);
      return added > 0 ? draft : current;
    });
  }

  return updateStore((draft) => {
    // Re-check under lock (TOCTOU): another request may have seeded already.
    if (!force && (draft.products.length > 0 || draft.seededAt)) {
      mergeMissingMdxProducts(draft);
      return;
    }
    const payload = buildSeedPayload();
    // force=true replaces store contents from MDX/taxonomy snapshot
    draft.genres = payload.genres;
    draft.products = payload.products;
    draft.collections = payload.collections;
    draft.seededAt = nowIso();
  });
}

/**
 * Sync seed for SSR paths that cannot await. Writes store.json when empty.
 * Uses the same file lock as updateStore so admin writes cannot interleave.
 */
export function ensureCmsSeededSync(force = false): CmsStore {
  return withStoreLockSync(() => {
    const current = readStore();
    if (!force && (current.products.length > 0 || current.seededAt)) {
      const draft: CmsStore = {
        ...current,
        products: [...current.products],
        genres: [...current.genres],
        collections: [...current.collections],
      };
      const added = mergeMissingMdxProducts(draft);
      if (added > 0) writeStoreSnapshot(draft);
      return added > 0 ? draft : current;
    }
    const payload = buildSeedPayload();
    const next: CmsStore = {
      version: 1,
      seededAt: nowIso(),
      genres: payload.genres,
      products: payload.products,
      collections: payload.collections,
    };
    writeStoreSnapshot(next);
    return next;
  });
}
