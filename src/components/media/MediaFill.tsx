"use client";

import { useEffect, useRef, useState } from "react";
import { isVideoUrl } from "@/lib/media-url";
import { cn } from "@/lib/utils";

/**
 * Full-bleed media fill for cards / product frames.
 * - mp4/webm → muted looping video (autoplay, always-on while mounted/in view)
 * - gif/webp/png/jpg → img (gif loops natively as soon as it loads)
 *
 * No HTML `poster` on video — stills only appear when video cannot load
 * (`fallbackStill`), so galleries never flash a thumbnail before playback.
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
  fallbackStill,
}: {
  src: string;
  alt?: string;
  className?: string;
  /** When true, load eagerly (above-the-fold product hero). */
  priority?: boolean;
  /** How media sits in the frame. Default contain (no crop). */
  fit?: "contain" | "cover";
  /**
   * Still image used only if `src` is a video that errors / fails to load.
   * Never shown as a pre-play poster (avoids flash).
   */
  fallbackStill?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const objectFit = fit === "cover" ? "object-cover" : "object-contain";
  const safeStill =
    fallbackStill && !isVideoUrl(fallbackStill) ? fallbackStill : undefined;

  useEffect(() => {
    setVideoFailed(false);
  }, [src]);

  useEffect(() => {
    if (!isVideoUrl(src) || videoFailed) return;
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    const tryPlay = () => void el.play().catch(() => {});
    tryPlay();
    el.addEventListener("loadeddata", tryPlay);
    el.addEventListener("canplay", tryPlay);

    // Gallery cards: pause when well off-screen (saves decode/bandwidth)
    let io: IntersectionObserver | undefined;
    if (!priority && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((e) => e.isIntersecting);
          if (visible) tryPlay();
          else el.pause();
        },
        { rootMargin: "80px", threshold: 0.15 }
      );
      io.observe(el);
    }

    return () => {
      el.removeEventListener("loadeddata", tryPlay);
      el.removeEventListener("canplay", tryPlay);
      io?.disconnect();
    };
  }, [src, videoFailed, priority]);

  if (!src) return null;

  if (isVideoUrl(src) && !videoFailed) {
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
        onError={() => setVideoFailed(true)}
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

  // Video failed → optional still; otherwise image/gif path
  const imgSrc =
    isVideoUrl(src) && videoFailed
      ? safeStill
      : isVideoUrl(src)
        ? undefined
        : src;

  if (!imgSrc) {
    return (
      <div
        className={cn("h-full w-full bg-black", className)}
        aria-hidden
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imgSrc}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      className={cn("h-full w-full object-center", objectFit, className)}
    />
  );
}
