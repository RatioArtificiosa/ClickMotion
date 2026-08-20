"use client";

/**
 * Section enter: play once when the slice meets the viewport.
 * Support motion only. Signature (pin, accordion, takeover) starts after land.
 * Recipes: sidecar/sections/libraries/enter-recipes.json (56) · ENTER.md
 * Never print how-to copy. Reduced motion → rest state immediately.
 */

import { useEffect, useState, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";
import { ENTER, enterPose, enterTransition, getEnter } from "./enterCatalog";
import type { EnterRecipe, EnterTemperament, Pose } from "./enterCatalog";

export type { EnterRecipe, EnterTemperament, Pose };
export type EnterRecipeId = string;
export { ENTER, enterPose, enterTransition, getEnter };

export function useSectionEnter(
  ref: RefObject<HTMLElement | null>,
  landMs: number,
): { entered: boolean; landed: boolean; reduced: boolean } {
  const reduced = useReducedMotion() ?? false;
  const [entered, setEntered] = useState(reduced);
  const [landed, setLanded] = useState(reduced);

  useEffect(() => {
    if (reduced) {
      setEntered(true);
      setLanded(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      setEntered(true);
    };

    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      return r.top < vh * 0.9 && r.bottom > vh * 0.1;
    };

    if (inView()) {
      fire();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          fire();
          io.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, ref]);

  useEffect(() => {
    if (!entered || reduced) return;
    const t = window.setTimeout(() => setLanded(true), landMs);
    return () => window.clearTimeout(t);
  }, [entered, reduced, landMs]);

  return { entered, landed, reduced };
}
