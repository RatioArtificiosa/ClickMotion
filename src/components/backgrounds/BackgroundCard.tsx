"use client";

import { useRef, useState } from "react";
import type { BackgroundAsset } from "@/config/backgrounds";
import { cn } from "@/lib/utils";

/**
 * Showcase tile only — no download / copy / unlock actions.
 * Full films ship inside product packages, not from /backgrounds.
 */
export function BackgroundCard({ item }: { item: BackgroundAsset }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--well)]",
        "shadow-[0_8px_32px_rgba(0,0,0,0.28)] transition duration-300",
        "hover:border-white/15 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
      )}
      onMouseEnter={() => {
        setHover(true);
        void videoRef.current?.play().catch(() => undefined);
      }}
      onMouseLeave={() => {
        setHover(false);
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      }}
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {item.kind === "video" ? (
          <video
            ref={videoRef}
            src={item.src}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="metadata"
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: item.gradient }}
            aria-hidden
          />
        )}

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent transition-opacity",
            hover ? "opacity-100" : "opacity-80"
          )}
        />

        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="truncate text-sm font-medium text-white">{item.title}</h3>
          <p className="truncate text-[11px] text-white/55">
            {item.tags.slice(0, 3).join(" · ")}
          </p>
        </div>
      </div>
    </article>
  );
}
