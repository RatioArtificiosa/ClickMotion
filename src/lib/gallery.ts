import {
  DEMO_SLUG_BY_ID,
  resolvePreviewVideo,
  type GalleryPrompt,
  type GallerySearchParams,
} from "@/lib/gallery-utils";
import {
  applyBrowseGalleryOrder,
  browseShuffleSeed,
  GALLERY_VID_COOKIE,
  GALLERY_VID_HEADER,
} from "@/lib/gallery-order";

export type { GalleryPrompt, GallerySearchParams };
export {
  REAL_PREVIEW_VIDEOS,
  shortTitle,
  categoryLabel,
  resolvePreviewVideo,
  demoHref,
} from "@/lib/gallery-utils";

/** Resolve visitor salt for daily browse shuffle (middleware header or cookie). */
async function resolveGalleryVisitorId(): Promise<string> {
  try {
    const { headers, cookies } = await import("next/headers");
    const h = await headers();
    const fromHeader = h.get(GALLERY_VID_HEADER);
    if (fromHeader && /^[a-zA-Z0-9]{8,32}$/.test(fromHeader)) return fromHeader;
    const jar = await cookies();
    const fromCookie = jar.get(GALLERY_VID_COOKIE)?.value;
    if (fromCookie && /^[a-zA-Z0-9]{8,32}$/.test(fromCookie)) return fromCookie;
  } catch {
    /* non-request context */
  }
  return "anon";
}

async function orderForBrowse<T>(
  items: readonly T[],
  sort: string | undefined
): Promise<T[]> {
  const seed = browseShuffleSeed(await resolveGalleryVisitorId());
  return applyBrowseGalleryOrder(items, sort, seed);
}

/** Server-only prompt loader: CMS (admin) first, then Supabase, then manifest. */
export async function loadGalleryPrompts(sp: GallerySearchParams = {}): Promise<GalleryPrompt[]> {
  // CMS store (admin-controlled order + genres). Once bootstrapped, never
  // fall through to manifest — empty published set means empty gallery.
  try {
    const { ensureCmsSeeded } = await import("@/lib/cms/seed");
    const { readStore } = await import("@/lib/cms/store");
    const { cmsProductToGallery } = await import("@/lib/cms/public-map");
    await ensureCmsSeeded(false);
    const store = readStore();
    const cmsLive =
      Boolean(store.seededAt) || store.products.length > 0 || store.genres.length > 0;
    if (cmsLive) {
      let filtered = store.products
        .filter((p) => p.status === "published")
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map(cmsProductToGallery);

      if (sp.type) {
        const { productMatchesType } = await import("@/lib/gallery-utils");
        filtered = filtered.filter((p) => productMatchesType(p, sp.type!));
      }
      if (sp.category) filtered = filtered.filter((p) => p.category === sp.category);
      if (sp.intensity) filtered = filtered.filter((p) => p.motionIntensity === sp.intensity);
      if (sp.style) filtered = filtered.filter((p) => p.styleTags.includes(sp.style!));
      if (sp.q) {
        const q = sp.q.toLowerCase();
        filtered = filtered.filter((p) =>
          `${p.title} ${p.category} ${p.styleTags.join(" ")}`.toLowerCase().includes(q)
        );
      }
      // Discover (default): daily + visitor seeded shuffle. Oldest: reverse sortOrder.
      return orderForBrowse(filtered, sp.sort);
    }
  } catch {
    /* fall through */
  }

  // Only hit Supabase when configured — avoids next/headers / env noise in local.
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      let query = supabase
        .from("prompts")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(48);
      if (sp.type) query = query.eq("type", sp.type);
      if (sp.category) query = query.eq("category", sp.category);
      if (sp.intensity) query = query.eq("motion_intensity", sp.intensity);
      if (sp.style) query = query.contains("style_tags", [sp.style]);
      if (sp.q) query = query.textSearch("fts", sp.q);
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        const mapped = data.map((p: Record<string, unknown>) => {
          const id = String(p.id);
          return {
            id,
            slug: String(p.slug),
            title: String(p.title),
            type: String(p.type ?? "hero"),
            category: String(p.category),
            styleTags: (p.style_tags as string[]) ?? [],
            motionIntensity: String(p.motion_intensity ?? "medium"),
            priceTier: String(p.price_tier ?? "pro"),
            thumbnail: String(p.thumbnail ?? ""),
            previewVideo: resolvePreviewVideo(id, {
              previewVideo: typeof p.preview_video === "string" ? p.preview_video : undefined,
            }),
            demoSlug: DEMO_SLUG_BY_ID[id],
          };
        });
        // Supabase already newest-first; for oldest keep reverse of that list after order helper
        // Base list for oldest should be reverse chronological → sortOrder-like: reverse created_at desc = oldest first then oldest sort reverses again.
        // Normalize: pass ascending-like base for oldest path (reverse map = oldest first), then applyBrowseOrder.
        const base =
          sp.sort === "oldest" ? mapped.slice().reverse() : mapped;
        return orderForBrowse(base, sp.sort);
      }
    } catch {
      /* fall through to manifest */
    }
  }

  try {
    const { promises: fs } = await import("node:fs");
    const path = await import("node:path");
    const raw = await fs.readFile(path.join(process.cwd(), "public/manifest.json"), "utf-8");
    const { prompts } = JSON.parse(raw) as {
      prompts: Array<{
        id: string;
        slug: string;
        title: string;
        type: string;
        category: string;
        styleTags: string[];
        motionIntensity: string;
        priceTier: string;
        thumbnail: string;
        previewVideo?: string;
      }>;
    };

    let filtered = prompts;
    if (sp.type) {
      const { productMatchesType } = await import("@/lib/gallery-utils");
      filtered = filtered.filter((p) =>
        productMatchesType(
          { type: p.type, types: (p as { types?: string[] }).types },
          sp.type!
        )
      );
    }
    if (sp.category) filtered = filtered.filter((p) => p.category === sp.category);
    if (sp.intensity) filtered = filtered.filter((p) => p.motionIntensity === sp.intensity);
    if (sp.style) filtered = filtered.filter((p) => p.styleTags.includes(sp.style!));
    if (sp.q) {
      const q = sp.q.toLowerCase();
      filtered = filtered.filter((p) =>
        `${p.title} ${p.category} ${p.styleTags.join(" ")}`.toLowerCase().includes(q)
      );
    }

    return (
      await orderForBrowse(
        filtered.map((p) => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          type: p.type,
          category: p.category,
          styleTags: p.styleTags,
          motionIntensity: p.motionIntensity,
          priceTier: p.priceTier,
          thumbnail: p.thumbnail,
          previewVideo: resolvePreviewVideo(p.id, { previewVideo: p.previewVideo }),
          demoSlug: DEMO_SLUG_BY_ID[p.id],
        })),
        sp.sort
      )
    );
  } catch {
    return [];
  }
}
