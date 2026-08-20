"use client";

import { useEffect, useState, type MouseEvent, type RefObject } from "react";
import { Copy, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Gap between buttons = inset from video top = inset from video right. */
export const CHROME_INSET = "0.375rem";

/**
 * object-contain letterbox inside the card (previews are often 1440×900 in a 16:9 frame).
 * Chrome must inset from the VIDEO edges, not the black box.
 */
export function useContainLetterbox(containerRef: RefObject<HTMLElement | null>) {
  const [box, setBox] = useState({ top: 0, right: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const media = el.querySelector("video, img") as
        | HTMLVideoElement
        | HTMLImageElement
        | null;
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      let mw = 0;
      let mh = 0;
      if (media instanceof HTMLVideoElement) {
        mw = media.videoWidth;
        mh = media.videoHeight;
      } else if (media instanceof HTMLImageElement) {
        mw = media.naturalWidth;
        mh = media.naturalHeight;
      }
      if (!cw || !ch || !mw || !mh) {
        setBox({ top: 0, right: 0 });
        return;
      }
      const scale = Math.min(cw / mw, ch / mh);
      const dw = mw * scale;
      const dh = mh * scale;
      setBox({
        top: Math.max(0, (ch - dh) / 2),
        right: Math.max(0, (cw - dw) / 2),
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.addEventListener("loadedmetadata", measure, true);
    el.addEventListener("loadeddata", measure, true);
    el.addEventListener("load", measure, true);
    return () => {
      ro.disconnect();
      el.removeEventListener("loadedmetadata", measure, true);
      el.removeEventListener("loadeddata", measure, true);
      el.removeEventListener("load", measure, true);
    };
  }, [containerRef]);

  return box;
}

export function goCardLogin(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  window.location.assign("/login");
}

/** Hover-only crown + copy boxes, pinned to the contained video edges. */
export function CardHoverChrome({
  hovered,
  isPro,
  letterbox,
  compact,
}: {
  hovered: boolean;
  isPro: boolean;
  letterbox: { top: number; right: number };
  /** Rail cards: slightly smaller hit targets */
  compact?: boolean;
}) {
  const box = compact ? "h-6 w-6 rounded-[7px]" : "h-7 w-7 rounded-[8px]";
  const icon = compact ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <div
      className={cn(
        "absolute z-[2] flex items-center transition-opacity duration-160",
        hovered
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
      style={{
        top: `calc(${letterbox.top}px + ${CHROME_INSET})`,
        right: `calc(${letterbox.right}px + ${CHROME_INSET})`,
        gap: CHROME_INSET,
      }}
    >
      {isPro && (
        <span
          className={cn(
            "flex items-center justify-center border border-[var(--hairline)] bg-black/50 text-amber-300/90 backdrop-blur-sm",
            box
          )}
          title="Pro"
          aria-hidden
        >
          <Crown className={icon} />
        </span>
      )}
      <button
        type="button"
        onClick={goCardLogin}
        aria-label="Sign in or sign up"
        title="Sign in"
        className={cn(
          "flex items-center justify-center border border-[var(--hairline)] bg-black/50 text-white/90 backdrop-blur-sm hover:bg-black/70",
          box
        )}
      >
        <Copy className={icon} />
      </button>
    </div>
  );
}
