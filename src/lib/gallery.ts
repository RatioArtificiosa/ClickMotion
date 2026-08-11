import {
  DEMO_SLUG_BY_ID,
  resolvePreviewVideo,
  type GalleryPrompt,
  type GallerySearchParams,
} from "@/lib/gallery-utils";

export type { GalleryPrompt, GallerySearchParams };
export {
  REAL_PREVIEW_VIDEOS,
  shortTitle,
  categoryLabel,
  resolvePreviewVideo,
  demoHref,
} from "@/lib/gallery-utils";

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

      if (sp.type) filtered = filtered.filter((p) => p.type === sp.type);
      if (sp.category) filtered = filtered.filter((p) => p.category === sp.category);
      if (sp.intensity) filtered = filtered.filter((p) => p.motionIntensity === sp.intensity);
      if (sp.style) filtered = filtered.filter((p) => p.styleTags.includes(sp.style!));
      if (sp.q) {
        const q = sp.q.toLowerCase();
        filtered = filtered.filter((p) =>
          `${p.title} ${p.category} ${p.styleTags.join(" ")}`.toLowerCase().includes(q)
        );
      }
      if (sp.sort === "oldest") filtered = [...filtered].reverse();
      return filtered;
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
        return data.map((p: Record<string, unknown>) => {
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
    if (sp.type) filtered = filtered.filter((p) => p.type === sp.type);
    if (sp.category) filtered = filtered.filter((p) => p.category === sp.category);
    if (sp.intensity) filtered = filtered.filter((p) => p.motionIntensity === sp.intensity);
    if (sp.style) filtered = filtered.filter((p) => p.styleTags.includes(sp.style!));
    if (sp.q) {
      const q = sp.q.toLowerCase();
      filtered = filtered.filter((p) =>
        `${p.title} ${p.category} ${p.styleTags.join(" ")}`.toLowerCase().includes(q)
      );
    }

    if (sp.sort === "oldest") {
      filtered = [...filtered].reverse();
    }

    return filtered.map((p) => ({
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
    }));
  } catch {
    return [];
  }
}
