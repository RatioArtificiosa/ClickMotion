"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Copy, Crown } from "lucide-react";
import { shortTitle, categoryLabel } from "@/lib/gallery-utils";
import { isVideoUrl, stillPosterForVideo } from "@/lib/media-url";
import { MediaFill } from "@/components/media/MediaFill";
import { cn } from "@/lib/utils";

/**
 * Gallery card media:
 * - Always loops (no hover required)
 * - Prefer preview video when set; else thumbnail (image / gif / mp4)
 * - Hover only reveals copy / pro chrome
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
  /** Override default /browse/[slug] — e.g. live /demo/[slug] */
  href?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRootRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayTitle = shortTitle(title);
  const cat = categoryLabel(category);
  const isPro = priceTier !== "free";
  const link = href ?? `/browse/${slug}`;

  // Prefer full preview capture; fall back to thumbnail (may be gif/mp4/still)
  const motionSrc = previewVideo || thumbnail || "";
  const useVideoEl = Boolean(previewVideo) || isVideoUrl(thumbnail);
  const stillPoster = stillPosterForVideo(thumbnail, undefined);

  // Keep muted loop running; re-try play when in view (autoplay policies)
  useEffect(() => {
    if (!useVideoEl || !motionSrc) return;
    const el = videoRef.current;
    const root = mediaRootRef.current;
    if (!el) return;

    const tryPlay = () => {
      el.muted = true;
      void el.play().catch(() => {});
    };

    tryPlay();

    if (!root || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((e) => e.isIntersecting);
        if (visible) tryPlay();
        else el.pause();
      },
      { rootMargin: "80px", threshold: 0.15 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [useVideoEl, motionSrc]);

  const onCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${link}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
  };

  return (
    <Link
      href={link}
      className="group block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--canvas)] rounded-[14px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <article className="flex flex-col">
        <div
          ref={mediaRootRef}
          className={cn(
            // 16:9 matches burnt previews; contain so type/CTAs never crop
            "relative aspect-video overflow-hidden rounded-[14px]",
            "bg-black border border-[var(--hairline)]",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_24px_rgba(0,0,0,0.35)]",
            "transition-transform duration-220 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "group-hover:-translate-y-0.5 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_16px_40px_rgba(0,0,0,0.45)]"
          )}
        >
          {useVideoEl && motionSrc ? (
            <video
              ref={videoRef}
              src={motionSrc}
              poster={stillPoster}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              controls={false}
              controlsList="nodownload noplaybackrate"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              className="pointer-events-none absolute inset-0 h-full w-full object-contain object-center"
              aria-hidden
            />
          ) : motionSrc ? (
            // gif / still — gif animates immediately
            <MediaFill
              src={motionSrc}
              alt={displayTitle}
              className="pointer-events-none absolute inset-0"
              fit="contain"
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--well)]" />
          )}

          <div
            className={cn(
              "absolute right-2 top-2 flex items-center gap-1.5 transition-opacity duration-160",
              hovered ? "opacity-100" : "opacity-0"
            )}
          >
            {isPro && (
              <span
                className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-[var(--hairline)] bg-black/50 text-amber-300/90 backdrop-blur-sm"
                title="Pro"
              >
                <Crown className="h-3.5 w-3.5" />
              </span>
            )}
            <button
              type="button"
              onClick={onCopy}
              aria-label={copied ? "Copied" : "Copy link"}
              className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-[var(--hairline)] bg-black/50 text-white/90 backdrop-blur-sm hover:bg-black/70"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-2.5 flex items-start justify-between gap-2 px-0.5">
          <div className="min-w-0">
            <h3 className="truncate text-[13.5px] font-semibold tracking-tight text-[var(--text-primary)]">
              {displayTitle}
            </h3>
            <p className="mt-0.5 truncate text-[12px] text-[var(--text-tertiary)]">{cat}</p>
          </div>
          {isPro && (
            <Crown
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400/70 opacity-70 transition-opacity group-hover:opacity-100"
              aria-label="Pro"
            />
          )}
        </div>
      </article>
    </Link>
  );
}
