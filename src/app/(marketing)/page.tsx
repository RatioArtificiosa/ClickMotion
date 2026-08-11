import type { Metadata } from "next";
import { HomeExperience } from "@/components/home/HomeExperience";
import { loadGalleryPrompts, type GallerySearchParams } from "@/lib/gallery";
import { siteConfig } from "@/config/site";

/** CMS-backed gallery — never serve a build-time snapshot of the catalog. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
 title: `${siteConfig.name} - Premium AI Website Prompts & Motion Assets`,
 description: siteConfig.description,
};

/**
 * Home: MarkData-style video entrance → snap to hero → full-bleed gallery.
 * Gallery/filter data is server-loaded; entrance chrome is client-only.
 */
export default async function HomePage({
 searchParams,
}: {
 searchParams: Promise<GallerySearchParams>;
}) {
 const sp = await searchParams;
 const prompts = await loadGalleryPrompts(sp);

 return <HomeExperience prompts={prompts} />;
}
