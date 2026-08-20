"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { shortTitle, categoryLabel } from "@/lib/gallery-utils";
import { isVideoUrl, stillPosterForVideo } from "@/lib/media-url";
import { MediaFill } from "@/components/media/MediaFill";
import { CardHoverChrome, useContainLetterbox } from "@/components/gallery/CardHoverChrome";
import { cn } from "@/lib/utils";

/**
 * Gallery card media:
 * - Always loops (no hover required)
 * - Prefer preview video when set; else thumbnail (image / gif / mp4)
 * - No poster flash: stills only if video cannot load
 * - Hover only reveals crown / sign-in chrome
 *
 * Chrome is NOT nested inside the product Link (invalid interactive nesting).
 * Product navigation uses an absolute stretch link under the chrome.
 */
export function PreviewHoverCard({
  slug,
  title,
  category,
  styleTags: _styleTags,
  motionIntensity: _motionIntensity,
  thumbnail,
  previewVideo,
  priceTier,
  href,
}: {
  slug: string;
  title: string;
  category: string;
  styleTags?: string[];
  motionIntensity?: string;
  thumbnail: string;
  previewVideo?: string;
  priceTier: string;
  /** Override default /browse/[slug] - e.g. live /demo/[slug] */
  href?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const letterbox = useContainLetterbox(frameRef);

  const displayTitle = shortTitle(title);
  const cat = categoryLabel(category);
  const isPro = priceTier !== "free";
  const link = href ?? `/browse/${slug}`;

  // Prefer full preview capture; fall back to thumbnail (may be gif/mp4/still)
  const motionSrc = previewVideo || thumbnail || "";
  const useVideoEl = Boolean(previewVideo) || isVideoUrl(thumbnail);
  // Still only for true failure - never as HTML video poster
  const failureStill = stillPosterForVideo(thumbnail, undefined);

  return (
    <div
      className="group outline-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setHovered(false);
        }
      }}
    >
      <article className="flex flex-col">
        <div
          ref={frameRef}
          className={cn(
            // 16:9 frame; contain so type/CTAs never crop (previews often 1440×900)
            "relative aspect-video overflow-hidden rounded-[14px]",
            "bg-black border border-[var(--hairline)]",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_24px_rgba(0,0,0,0.35)]",
            "transition-transform duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:-translate-y-0.5 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_16px_40px_rgba(0,0,0,0.45)]"
          )}
        >
          {motionSrc ? (
            <MediaFill
              src={motionSrc}
              alt={displayTitle}
              className="pointer-events-none absolute inset-0"
              fit="contain"
              fallbackStill={useVideoEl ? failureStill : undefined}
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--well)]" />
          )}

          {/* Product hit target under chrome (full card media). */}
          <Link
            href={link}
            className="absolute inset-0 z-[1] rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)]"
            aria-label={displayTitle}
          />

          <CardHoverChrome hovered={hovered} isPro={isPro} letterbox={letterbox} />
        </div>

        <Link
          href={link}
          className="mt-2.5 block min-w-0 px-0.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <h3 className="truncate text-[13.5px] font-semibold tracking-tight text-[var(--text-primary)]">
            {displayTitle}
          </h3>
          <p className="mt-0.5 truncate text-[12px] text-[var(--text-tertiary)]">{cat}</p>
        </Link>
      </article>
    </div>
  );
}
