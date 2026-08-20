"use client";

/**
 * Pin-until-complete chapter drive for mid-page sections.
 * Wheel / trackpad / touch / arrows advance virtual progress 0→1.
 * Large type restages. No tiny click-index as the method.
 * Law: docs/PRODUCT_LAW.md → Scroll narrative pin law.
 */

import { useEffect, useRef, useState, type RefObject } from "react";
import { useMotionValue, useMotionValueEvent, useSpring } from "framer-motion";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function chapterFromProgress(p: number, count: number) {
  if (count <= 1) return 0;
  return Math.min(count - 1, Math.max(0, Math.floor(p * count - 1e-6)));
}

type Opts = {
  count: number;
  landed: boolean;
  reduced: boolean;
  productId: string;
  virtualViewports?: number;
};

export function useChapterPin(
  ref: RefObject<HTMLElement | null>,
  { count, landed, reduced, productId, virtualViewports = 2.4 }: Opts,
) {
  const touchYRef = useRef<number | null>(null);
  const raw = useMotionValue(0);
  const sprung = useSpring(raw, { stiffness: 110, damping: 26, restDelta: 0.0008 });
  const [pNow, setPNow] = useState(0);

  // Raw keeps chapters alive if a spring is frozen (e.g. after reduced-motion emulation).
  useMotionValueEvent(raw, "change", (v) => setPNow(v));
  useMotionValueEvent(sprung, "change", (v) => setPNow(v));

  useEffect(() => {
    if (!reduced) return;
    raw.set(0);
    setPNow(0);
  }, [reduced, raw]);

  const chapter = chapterFromProgress(pNow, count);

  const setChapter = (i: number) => {
    if (count <= 1) return;
    const next = Math.max(0, Math.min(count - 1, i));
    raw.set(clamp01((next + 0.5) / count));
  };

  useEffect(() => {
    if (reduced) return;
    const api = {
      setProgress: (p: number) => raw.set(clamp01(p)),
      getProgress: () => raw.get(),
      productId,
    };
    const w = window as Window & { __msScrollNarrative?: typeof api };
    w.__msScrollNarrative = api;
    return () => {
      if (w.__msScrollNarrative === api) delete w.__msScrollNarrative;
    };
  }, [raw, reduced, productId]);

  useEffect(() => {
    if (reduced) return;
    const root = ref.current;
    if (!root) return;

    const virtualDistance = () => {
      const vh = window.innerHeight || 800;
      return Math.max(vh * 2, virtualViewports * vh);
    };

    const sectionInView = () => {
      const r = root.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      return r.top < mid && r.bottom > mid * 0.35;
    };

    const applyDelta = (deltaPx: number) => {
      if (!deltaPx || !Number.isFinite(deltaPx)) return false;
      const p = raw.get();
      if (p <= 0.0005 && deltaPx < 0) return false;
      if (p >= 0.9995 && deltaPx > 0) return false;
      raw.set(clamp01(p + deltaPx / virtualDistance()));
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (!landed) return;
      if (!sectionInView()) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaY) < 1) return;
      if (applyDelta(e.deltaY)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!landed) return;
      if (!sectionInView() || e.touches.length !== 1) return;
      touchYRef.current = e.touches[0]!.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!sectionInView() || e.touches.length !== 1) return;
      const y = e.touches[0]!.clientY;
      const prev = touchYRef.current;
      touchYRef.current = y;
      if (prev == null) return;
      if (applyDelta(prev - y)) e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!landed) return;
      if (!sectionInView()) return;
      const step = virtualDistance() * 0.08;
      let delta = 0;
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        delta = e.key === "PageDown" ? step * 2 : step;
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        delta = e.key === "PageUp" ? -step * 2 : -step;
      } else return;
      if (applyDelta(delta)) e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", () => {
      touchYRef.current = null;
    });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [raw, reduced, virtualViewports, landed, ref]);

  return { progress: pNow, chapter, setChapter };
}
