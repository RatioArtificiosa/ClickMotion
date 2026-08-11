import { Suspense } from "react";
import { FilterChips } from "@/components/gallery/FilterChips";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { loadGalleryPrompts, type GallerySearchParams } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export const metadata = { title: "Browse - MS" };

/**
 * Full library - same motionsites gallery structure as home, without big hero.
 */
export default async function BrowsePage({
 searchParams,
}: {
 searchParams: Promise<GallerySearchParams>;
}) {
 const sp = await searchParams;
 const prompts = await loadGalleryPrompts(sp);

 return (
 <div className="bg-[var(--canvas)]">
 <div className="w-full px-1 py-8 sm:px-1.5 lg:px-2">
 <div className="mb-5 px-2 sm:px-3">
 <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Library</h1>
 <p className="mt-1 text-sm text-[var(--text-tertiary)]">
 {prompts.length} prompt{prompts.length === 1 ? "" : "s"} · Filter to find your next hero
 </p>
 </div>

 <Suspense
 fallback={<div className="mb-5 h-8 w-full animate-pulse rounded-full bg-white/[0.04]" />}
 >
 <FilterChips className="mb-5 px-1" />
 </Suspense>

 <GalleryGrid prompts={prompts} />
 </div>
 </div>
 );
}
