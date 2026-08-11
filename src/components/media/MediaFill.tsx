"use client";

import { useEffect, useRef } from "react";
import { isVideoUrl } from "@/lib/media-url";
import { cn } from "@/lib/utils";

/**
 * Full-bleed media fill for cards / product frames.
 * - mp4/webm → muted looping video (autoplay, always-on while mounted/in view)
 * - gif/webp/png/jpg → img (gif loops natively as soon as it loads)
 *
 * Prefer fit="contain" for burnt UI previews so type/CTAs never crop.
 * Use fit="cover" only for abstract fills (gradients, lifestyle stills).
 */
export function MediaFill({
  src,
  alt = "",
  className,
  priority,
  fit = "contain",
}: {
  src: string;
  alt?: string;
  className?: string;
  /** When true, load eagerly (above-the-fold product hero). */
  priority?: boolean;
  /** How media sits in the frame. Default contain (no crop). */
  fit?: "contain" | "cover";
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const objectFit = fit === "cover" ? "object-cover" : "object-contain";

  useEffect(() => {
    if (!isVideoUrl(src)) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const tryPlay = () => void el.play().catch(() => {});
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);
    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
    };
  }, [src]);

  if (!src) return null;

  if (isVideoUrl(src)) {
    return (
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        controls={false}
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        onContextMenu={(e) => e.preventDefault()}
        preload={priority ? "auto" : "auto"}
        className={cn(
          "pointer-events-none h-full w-full object-center",
          objectFit,
          className
        )}
        aria-hidden={alt ? undefined : true}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      className={cn("h-full w-full object-center", objectFit, className)}
    />
  );
}
