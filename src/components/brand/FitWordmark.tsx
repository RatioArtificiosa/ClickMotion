"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { birthstone } from "@/lib/fonts";
import { cn } from "@/lib/utils";

type FitWordmarkProps = {
  text: string;
  /** Starting size in rem (desktop target). */
  maxRem?: number;
  /** Floor size in rem so it never becomes unreadable. */
  minRem?: number;
  className?: string;
};

/**
 * ClickMotion wordmark: Birthstone + white glow (docs/BRAND.md).
 * Font size always fits the container width — measures string, shrinks until
 * one line fits. Never truncates or wraps.
 */
export function FitWordmark({
  text,
  maxRem = 1.85,
  minRem = 1.05,
  className,
}: FitWordmarkProps) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [sizeRem, setSizeRem] = useState(maxRem);

  const fit = useCallback(() => {
    const box = boxRef.current;
    const measure = measureRef.current;
    if (!box || !measure) return;

    const maxW = box.clientWidth;
    if (maxW <= 0) return;

    // Binary search rem size so text width ≤ container
    let lo = minRem;
    let hi = maxRem;
    let best = minRem;

    for (let i = 0; i < 16; i++) {
      const mid = (lo + hi) / 2;
      measure.style.fontSize = `${mid}rem`;
      const w = measure.scrollWidth;
      if (w <= maxW) {
        best = mid;
        lo = mid;
      } else {
        hi = mid;
      }
    }

    // Final clamp: if even minRem overflows (tiny slot), still use minRem
    measure.style.fontSize = `${best}rem`;
    setSizeRem(Math.round(best * 1000) / 1000);
  }, [maxRem, minRem]);

  useEffect(() => {
    fit();
    const box = boxRef.current;
    if (!box || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => fit());
    ro.observe(box);
    return () => ro.disconnect();
  }, [fit, text]);

  return (
    <span
      ref={boxRef}
      className={cn("relative block w-full min-w-0 overflow-hidden", className)}
    >
      {/* Hidden measurer (same type metrics as visible) */}
      <span
        ref={measureRef}
        aria-hidden
        className={cn(
          birthstone.className,
          "pointer-events-none absolute left-0 top-0 whitespace-nowrap opacity-0"
        )}
        style={{ fontSize: `${sizeRem}rem` }}
      >
        {text}
      </span>
      <span
        className={cn(
          birthstone.className,
          "block whitespace-nowrap leading-none tracking-wide text-white",
          "transition-[text-shadow,font-size] duration-200",
          "[text-shadow:0_0_12px_rgba(255,255,255,0.55),0_0_28px_rgba(255,255,255,0.28),0_0_48px_rgba(255,255,255,0.12)]",
          "group-hover:[text-shadow:0_0_14px_rgba(255,255,255,0.7),0_0_32px_rgba(255,255,255,0.35),0_0_56px_rgba(255,255,255,0.16)]"
        )}
        style={{ fontSize: `${sizeRem}rem` }}
      >
        {text}
      </span>
    </span>
  );
}
