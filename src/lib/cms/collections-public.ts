import { ensureCmsSeeded } from "./seed";
import { readStore } from "./store";
import type { CmsCollection } from "./types";
import { collections as staticCollections } from "@/config/collections";

/** Public collection shape used by marketing pages. */
export type PublicCollection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  promptIds: string[];
  isFeatured: boolean;
  priceTier: "free" | "starter" | "pro" | "agency";
  badge?: string;
};

function mapCms(c: CmsCollection): PublicCollection {
  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    description: c.description,
    cover: c.coverImage,
    promptIds: c.productIds,
    isFeatured: c.isFeatured,
    priceTier: c.priceTier,
  };
}

export async function loadPublicCollections(): Promise<PublicCollection[]> {
  try {
    await ensureCmsSeeded(false);
    const store = readStore();
    const cmsLive =
      Boolean(store.seededAt) ||
      store.collections.length > 0 ||
      store.products.length > 0 ||
      store.genres.length > 0;
    // Once CMS is live, empty/hidden collections stay empty — no static resurrection.
    if (cmsLive) {
      return store.collections
        .filter((c) => c.visible)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(mapCms);
    }
  } catch {
    /* fall through */
  }
  return staticCollections.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    description: c.description,
    cover: c.cover,
    promptIds: c.promptIds,
    isFeatured: c.isFeatured,
    priceTier: c.priceTier,
    badge: c.badge,
  }));
}

export async function getPublicCollection(slug: string): Promise<PublicCollection | null> {
  const all = await loadPublicCollections();
  return all.find((c) => c.slug === slug) ?? null;
}
