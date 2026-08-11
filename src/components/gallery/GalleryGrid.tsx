import { PreviewHoverCard } from "@/components/gallery/PreviewHoverCard";
import type { GalleryPrompt } from "@/lib/gallery-utils";

export function GalleryGrid({ prompts }: { prompts: GalleryPrompt[] }) {
 if (prompts.length === 0) {
 return (
 <div className="flex flex-col items-center py-20 text-center">
 <p className="text-lg font-medium tracking-tight">No prompts match</p>
 <p className="mt-1 text-sm text-[var(--text-tertiary)]">
 Try another filter - more drops ship weekly.
 </p>
 </div>
 );
 }

 return (
 <div className="grid grid-cols-1 gap-x-3 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
 {prompts.map((p) => (
 <PreviewHoverCard
 key={p.id}
 slug={p.slug}
 title={p.title}
 category={p.category}
 styleTags={p.styleTags}
 motionIntensity={p.motionIntensity}
 thumbnail={p.thumbnail}
 previewVideo={p.previewVideo}
 priceTier={p.priceTier}
 /* Product page: true preview + copy (Motionsites pattern, MS shell) */
 href={`/browse/${p.slug}`}
 />
 ))}
 </div>
 );
}
