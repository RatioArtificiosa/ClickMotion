import { ensureCmsSeeded } from "./seed";
import { readStore, updateStore } from "./store";
import type {
  CmsCollection,
  CmsCollectionInput,
  CmsGenre,
  CmsGenreInput,
  CmsProduct,
  CmsProductInput,
  CmsStore,
  ProductStatus,
} from "./types";
import { newId, slugify, uniqueSlug } from "./slug";

function nowIso(): string {
  return new Date().toISOString();
}

function sortByOrder<T extends { sortOrder: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder || 0);
}

const PRODUCT_TYPES = new Set(["hero", "section", "landing-page", "special"]);
const PRICE_TIERS = new Set(["free", "starter", "pro", "agency"]);
const PRODUCT_STATUSES = new Set(["draft", "review", "published", "archived"]);
const MOTION = new Set(["subtle", "medium", "aggressive", "extreme"]);
const DIFFICULTY = new Set(["beginner", "intermediate", "advanced", "expert"]);

function asEnum<T extends string>(value: unknown, allowed: Set<string>, fallback: T): T {
  if (typeof value === "string" && allowed.has(value)) return value as T;
  return fallback;
}

export async function getCmsStore(): Promise<CmsStore> {
  await ensureCmsSeeded(false);
  return readStore();
}

// ── Genres ──────────────────────────────────────────────────────────────

export async function listGenres(includeHidden = true): Promise<CmsGenre[]> {
  const s = await getCmsStore();
  const list = sortByOrder(s.genres);
  return includeHidden ? list : list.filter((g) => g.visible);
}

export async function createGenre(input: CmsGenreInput): Promise<CmsGenre> {
  const t = nowIso();
  let created!: CmsGenre;
  await updateStore((draft) => {
    const ids = new Set(draft.genres.map((g) => g.id));
    let id = input.id ? slugify(input.id) : slugify(input.label);
    if (ids.has(id)) id = uniqueSlug(id, ids);
    const maxOrder = draft.genres.reduce((m, g) => Math.max(m, g.sortOrder), -1);
    created = {
      id,
      label: input.label.trim(),
      description: input.description?.trim() ?? "",
      icon: input.icon?.trim() || "Tag",
      sortOrder: input.sortOrder ?? maxOrder + 1,
      visible: input.visible ?? true,
      createdAt: t,
      updatedAt: t,
    };
    draft.genres.push(created);
  });
  return created;
}

export async function updateGenre(id: string, input: Partial<CmsGenreInput>): Promise<CmsGenre> {
  let updated!: CmsGenre;
  await updateStore((draft) => {
    const idx = draft.genres.findIndex((g) => g.id === id);
    if (idx < 0) throw Object.assign(new Error("Genre not found"), { status: 404 });
    const cur = draft.genres[idx];
    updated = {
      ...cur,
      label: input.label?.trim() ?? cur.label,
      description: input.description !== undefined ? input.description.trim() : cur.description,
      icon: input.icon?.trim() || cur.icon,
      visible: input.visible ?? cur.visible,
      sortOrder: input.sortOrder ?? cur.sortOrder,
      updatedAt: nowIso(),
    };
    draft.genres[idx] = updated;
  });
  return updated;
}

export async function deleteGenre(id: string, reassignTo?: string): Promise<void> {
  await updateStore((draft) => {
    if (!draft.genres.some((g) => g.id === id)) {
      throw Object.assign(new Error("Genre not found"), { status: 404 });
    }
    const fallback =
      reassignTo && draft.genres.some((g) => g.id === reassignTo)
        ? reassignTo
        : draft.genres.find((g) => g.id !== id)?.id;
    if (!fallback) {
      throw Object.assign(new Error("Cannot delete the last genre"), { status: 400 });
    }
    for (const p of draft.products) {
      if (p.genreId === id) p.genreId = fallback;
    }
    draft.genres = draft.genres.filter((g) => g.id !== id);
  });
}

export async function reorderGenres(orderedIds: string[]): Promise<CmsGenre[]> {
  await updateStore((draft) => {
    const map = new Map(draft.genres.map((g) => [g.id, g]));
    orderedIds.forEach((id, i) => {
      const g = map.get(id);
      if (g) {
        g.sortOrder = i;
        g.updatedAt = nowIso();
      }
    });
    // Any missing ids keep relative order at end
    const seen = new Set(orderedIds);
    let i = orderedIds.length;
    for (const g of sortByOrder(draft.genres)) {
      if (!seen.has(g.id)) {
        g.sortOrder = i++;
      }
    }
  });
  return listGenres(true);
}

// ── Products ────────────────────────────────────────────────────────────

export async function listProducts(opts?: {
  includeUnpublished?: boolean;
}): Promise<CmsProduct[]> {
  const s = await getCmsStore();
  let list = sortByOrder(s.products);
  if (!opts?.includeUnpublished) {
    list = list.filter((p) => p.status === "published");
  }
  return list;
}

export async function getProductBySlugOrId(slugOrId: string): Promise<CmsProduct | null> {
  const s = await getCmsStore();
  return (
    s.products.find((p) => p.slug === slugOrId || p.id === slugOrId) ?? null
  );
}

export async function createProduct(input: CmsProductInput): Promise<CmsProduct> {
  const t = nowIso();
  let created!: CmsProduct;
  await updateStore((draft) => {
    if (draft.genres.length === 0) {
      throw Object.assign(new Error("Create a genre first"), { status: 400 });
    }
    const genreId =
      input.genreId && draft.genres.some((g) => g.id === input.genreId)
        ? input.genreId
        : draft.genres[0].id;
    const taken = new Set(draft.products.map((p) => p.slug));
    const slug = uniqueSlug(input.slug || input.title, taken);
    const maxOrder = draft.products.reduce((m, p) => Math.max(m, p.sortOrder), -1);
    created = {
      id: newId("MS"),
      slug,
      title: input.title.trim(),
      description: input.description?.trim() ?? "",
      type: asEnum(input.type, PRODUCT_TYPES, "hero"),
      genreId,
      styleTags: Array.isArray(input.styleTags)
        ? input.styleTags.map(String).filter(Boolean)
        : [],
      motionIntensity: asEnum(input.motionIntensity, MOTION, "medium"),
      difficulty: asEnum(input.difficulty, DIFFICULTY, "intermediate"),
      priceTier: asEnum(input.priceTier, PRICE_TIERS, "pro"),
      status: asEnum(input.status, PRODUCT_STATUSES, "published"),
      body: input.body ?? "## Design\n\nDescribe the component fully.\n",
      thumbnail: input.thumbnail ?? "",
      poster: input.poster ?? input.thumbnail ?? "",
      previewVideo: input.previewVideo ?? "",
      aiTools: Array.isArray(input.aiTools)
        ? input.aiTools.map(String).filter(Boolean)
        : ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
      sortOrder: input.sortOrder ?? maxOrder + 1,
      likes: typeof input.likes === "number" && Number.isFinite(input.likes) ? input.likes : 0,
      createdAt: t,
      updatedAt: t,
    };
    draft.products.push(created);
  });
  return created;
}

export async function updateProduct(
  id: string,
  input: Partial<CmsProductInput> & { slug?: string }
): Promise<CmsProduct> {
  let updated!: CmsProduct;
  await updateStore((draft) => {
    const idx = draft.products.findIndex((p) => p.id === id);
    if (idx < 0) throw Object.assign(new Error("Product not found"), { status: 404 });
    const cur = draft.products[idx];
    let slug = cur.slug;
    if (input.slug && input.slug !== cur.slug) {
      const taken = new Set(draft.products.filter((p) => p.id !== id).map((p) => p.slug));
      slug = uniqueSlug(input.slug, taken);
    }
    if (input.genreId && !draft.genres.some((g) => g.id === input.genreId)) {
      throw Object.assign(new Error("Unknown genre"), { status: 400 });
    }
    updated = {
      ...cur,
      title: input.title?.trim() ?? cur.title,
      slug,
      description: input.description !== undefined ? input.description.trim() : cur.description,
      type: input.type !== undefined ? asEnum(input.type, PRODUCT_TYPES, cur.type) : cur.type,
      genreId: input.genreId ?? cur.genreId,
      styleTags: Array.isArray(input.styleTags)
        ? input.styleTags.map(String).filter(Boolean)
        : cur.styleTags,
      motionIntensity:
        input.motionIntensity !== undefined
          ? asEnum(input.motionIntensity, MOTION, cur.motionIntensity)
          : cur.motionIntensity,
      difficulty:
        input.difficulty !== undefined
          ? asEnum(input.difficulty, DIFFICULTY, cur.difficulty)
          : cur.difficulty,
      priceTier:
        input.priceTier !== undefined
          ? asEnum(input.priceTier, PRICE_TIERS, cur.priceTier)
          : cur.priceTier,
      status:
        input.status !== undefined
          ? asEnum(input.status, PRODUCT_STATUSES, cur.status)
          : cur.status,
      body: input.body ?? cur.body,
      thumbnail: input.thumbnail !== undefined ? input.thumbnail : cur.thumbnail,
      poster: input.poster !== undefined ? input.poster : cur.poster,
      previewVideo:
        input.previewVideo !== undefined ? input.previewVideo : cur.previewVideo,
      aiTools: Array.isArray(input.aiTools)
        ? input.aiTools.map(String).filter(Boolean)
        : cur.aiTools,
      sortOrder: input.sortOrder ?? cur.sortOrder,
      likes:
        typeof input.likes === "number" && Number.isFinite(input.likes)
          ? input.likes
          : cur.likes,
      updatedAt: nowIso(),
    };
    draft.products[idx] = updated;
  });
  return updated;
}

export async function deleteProduct(id: string): Promise<void> {
  await updateStore((draft) => {
    if (!draft.products.some((p) => p.id === id)) {
      throw Object.assign(new Error("Product not found"), { status: 404 });
    }
    draft.products = draft.products.filter((p) => p.id !== id);
    for (const c of draft.collections) {
      c.productIds = c.productIds.filter((pid) => pid !== id);
    }
  });
}

export async function reorderProducts(orderedIds: string[]): Promise<CmsProduct[]> {
  await updateStore((draft) => {
    const map = new Map(draft.products.map((p) => [p.id, p]));
    orderedIds.forEach((id, i) => {
      const p = map.get(id);
      if (p) {
        p.sortOrder = i;
        p.updatedAt = nowIso();
      }
    });
    const seen = new Set(orderedIds);
    let i = orderedIds.length;
    for (const p of sortByOrder(draft.products)) {
      if (!seen.has(p.id)) p.sortOrder = i++;
    }
  });
  return listProducts({ includeUnpublished: true });
}

// ── Collections ─────────────────────────────────────────────────────────

export async function listCollections(includeHidden = true): Promise<CmsCollection[]> {
  const s = await getCmsStore();
  const list = sortByOrder(s.collections);
  return includeHidden ? list : list.filter((c) => c.visible);
}

export async function createCollection(input: CmsCollectionInput): Promise<CmsCollection> {
  const t = nowIso();
  let created!: CmsCollection;
  await updateStore((draft) => {
    const taken = new Set(draft.collections.map((c) => c.slug));
    const slug = uniqueSlug(input.slug || input.title, taken);
    const maxOrder = draft.collections.reduce((m, c) => Math.max(m, c.sortOrder), -1);
    const productIds = (input.productIds ?? []).filter((id) =>
      draft.products.some((p) => p.id === id)
    );
    created = {
      id: newId("COL"),
      slug,
      title: input.title.trim(),
      description: input.description?.trim() ?? "",
      coverImage: input.coverImage ?? "",
      productIds,
      priceTier: input.priceTier ?? "pro",
      isFeatured: input.isFeatured ?? false,
      sortOrder: input.sortOrder ?? maxOrder + 1,
      visible: input.visible ?? true,
      createdAt: t,
      updatedAt: t,
    };
    draft.collections.push(created);
  });
  return created;
}

export async function updateCollection(
  id: string,
  input: Partial<CmsCollectionInput>
): Promise<CmsCollection> {
  let updated!: CmsCollection;
  await updateStore((draft) => {
    const idx = draft.collections.findIndex((c) => c.id === id);
    if (idx < 0) throw Object.assign(new Error("Collection not found"), { status: 404 });
    const cur = draft.collections[idx];
    let slug = cur.slug;
    if (input.slug && input.slug !== cur.slug) {
      const taken = new Set(draft.collections.filter((c) => c.id !== id).map((c) => c.slug));
      slug = uniqueSlug(input.slug, taken);
    }
    const productIds =
      input.productIds !== undefined
        ? input.productIds.filter((pid) => draft.products.some((p) => p.id === pid))
        : cur.productIds;
    updated = {
      ...cur,
      title: input.title?.trim() ?? cur.title,
      slug,
      description:
        input.description !== undefined ? input.description.trim() : cur.description,
      coverImage: input.coverImage !== undefined ? input.coverImage : cur.coverImage,
      productIds,
      priceTier: input.priceTier ?? cur.priceTier,
      isFeatured: input.isFeatured ?? cur.isFeatured,
      sortOrder: input.sortOrder ?? cur.sortOrder,
      visible: input.visible ?? cur.visible,
      updatedAt: nowIso(),
    };
    draft.collections[idx] = updated;
  });
  return updated;
}

export async function deleteCollection(id: string): Promise<void> {
  await updateStore((draft) => {
    if (!draft.collections.some((c) => c.id === id)) {
      throw Object.assign(new Error("Collection not found"), { status: 404 });
    }
    draft.collections = draft.collections.filter((c) => c.id !== id);
  });
}

export async function reorderCollections(orderedIds: string[]): Promise<CmsCollection[]> {
  await updateStore((draft) => {
    const map = new Map(draft.collections.map((c) => [c.id, c]));
    orderedIds.forEach((id, i) => {
      const c = map.get(id);
      if (c) {
        c.sortOrder = i;
        c.updatedAt = nowIso();
      }
    });
    // Missing ids keep relative order after the explicit list (parity with products/genres)
    const seen = new Set(orderedIds);
    let i = orderedIds.length;
    for (const c of sortByOrder(draft.collections)) {
      if (!seen.has(c.id)) {
        c.sortOrder = i++;
        c.updatedAt = nowIso();
      }
    }
  });
  return listCollections(true);
}
