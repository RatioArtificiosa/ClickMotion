/**
 * Browse gallery ordering — daily seeded shuffle (stable within a day).
 *
 * - Default / Discover: Fisher–Yates with seed `browse:{UTC date}:{visitorId}`
 *   so the same visitor sees a stable order all day, a new order every day,
 *   and different visitors get different decks (when visitorId is present).
 * - Oldest: reverse of CMS sortOrder (catalog chronology), no shuffle.
 *
 * Product-page related scoring is separate (product-prompt.ts).
 */

/** Long-lived visitor salt cookie (set by middleware). */
export const GALLERY_VID_COOKIE = "cm_gallery_vid";
/** Request header middleware injects so first paint has the id. */
export const GALLERY_VID_HEADER = "x-cm-gallery-vid";

/** UTC calendar day key — rotates the deck once per day worldwide. */
export function galleryDayKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

/** FNV-1a 32-bit hash → mulberry32 seed. */
export function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Deterministic Fisher–Yates shuffle (does not mutate input). */
export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  const a = items.slice();
  if (a.length <= 1) return a;
  const rand = mulberry32(hashSeed(seed));
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = a[i]!;
    a[i] = a[j]!;
    a[j] = tmp;
  }
  return a;
}

/**
 * Build the seed string for browse shuffle.
 * @param visitorId stable per browser (cookie); falls back to "anon"
 */
export function browseShuffleSeed(
  visitorId: string | undefined | null,
  day: string = galleryDayKey()
): string {
  const vid =
    visitorId && /^[a-zA-Z0-9_-]{6,64}$/.test(visitorId) ? visitorId : "anon";
  return `browse:${day}:${vid}`;
}

/**
 * Apply public browse order after filters.
 * Input should already be sorted by CMS sortOrder ascending when sort=oldest.
 */
export function applyBrowseGalleryOrder<T>(
  items: readonly T[],
  sort: string | undefined,
  seed: string
): T[] {
  if (items.length <= 1) return items.slice();
  // Explicit catalog order (admin sortOrder, reversed)
  if (sort === "oldest") {
    return items.slice().reverse();
  }
  // Default / "recent" / Discover — daily + visitor seeded shuffle
  return seededShuffle(items, seed);
}

/**
 * Split scored related products: rail takes first N, gallery takes the rest.
 * Guarantees no overlap between rail and bottom gallery.
 */
export function splitRelatedRailAndGallery<T extends { id: string }>(
  related: readonly T[],
  railCount: number
): { rail: T[]; gallery: T[] } {
  const n = Math.max(0, Math.floor(railCount));
  return {
    rail: related.slice(0, n) as T[],
    gallery: related.slice(n) as T[],
  };
}
