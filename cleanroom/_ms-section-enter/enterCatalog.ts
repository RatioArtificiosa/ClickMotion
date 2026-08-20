"use client";

/**
 * Runtime enter catalog. Source of truth for agents:
 * sidecar/sections/libraries/enter-recipes.json and ENTER.md
 */

import type { Transition } from "framer-motion";
import catalog from "../../sidecar/sections/libraries/enter-recipes.json";

export type EnterTemperament = "elegant" | "aggressive" | "rebellion" | "fun";

export type Pose = {
  opacity?: number;
  x?: number | string;
  y?: number | string;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: number;
  rotateX?: number | string;
  rotateY?: number | string;
  skewX?: number;
  letterSpacing?: string;
  filter?: string;
  clipPath?: string;
};

export type EnterRecipe = {
  id: string;
  temperament: EnterTemperament;
  method: string;
  from: Pose;
  to: Pose;
  duration: number;
  stagger: number;
  landMs: number;
  transition: Transition;
  origin?: string;
};

const ORIGIN: Record<string, string> = {
  "rule-draw": "0% 50%",
  "underline-grow": "0% 50%",
  "bindery-clamp": "50% 0%",
  "blinds-cascade": "50% 0%",
  "unfold-panel": "50% 0%",
  "corner-fold": "0% 0%",
  "garment-zip": "50% 0%",
  "hem-lift": "50% 100%",
  "clamp-shut": "50% 50%",
};

type JsonPose = {
  opacity?: number;
  x?: number;
  y?: number;
  yPercent?: number;
  scale?: number;
  scaleX?: number;
  scaleY?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
  skewX?: number;
  letterSpacing?: string;
  filter?: string;
  clipPath?: string;
};

function toPose(p: JsonPose): Pose {
  const { yPercent, ...rest } = p;
  const out: Pose = { ...rest };
  if (typeof yPercent === "number") out.y = `${yPercent}%`;
  // Motion skips numeric 0 on later animate targets; rest must be explicit.
  if (out.x === 0) out.x = "0px";
  if (out.y === 0) out.y = "0px";
  if (out.rotateX === 0) out.rotateX = "0deg";
  if (out.rotateY === 0) out.rotateY = "0deg";
  return out;
}

function toTransition(numbers: {
  durationMs?: number;
  delayMs?: number;
  ease?: number[];
  stiffness?: number;
  damping?: number;
}): Transition {
  if (typeof numbers.stiffness === "number") {
    return {
      type: "spring",
      stiffness: numbers.stiffness,
      damping: numbers.damping ?? 22,
      delay: (numbers.delayMs ?? 0) / 1000,
    };
  }
  const ease = (numbers.ease ?? [0.22, 1, 0.36, 1]) as [number, number, number, number];
  return {
    duration: (numbers.durationMs ?? 600) / 1000,
    ease,
    delay: (numbers.delayMs ?? 0) / 1000,
  };
}

export const ENTER: Record<string, EnterRecipe> = Object.fromEntries(
  catalog.items.map((item) => {
    const numbers = item.numbers as {
      durationMs?: number;
      staggerMs?: number;
      landMs: number;
      delayMs?: number;
      ease?: number[];
      stiffness?: number;
      damping?: number;
    };
    const recipe: EnterRecipe = {
      id: item.id,
      temperament: item.temperament as EnterTemperament,
      method: item.method,
      from: toPose(item.from as JsonPose),
      to: toPose(item.to as JsonPose),
      duration: (numbers.durationMs ?? 600) / 1000,
      stagger: (numbers.staggerMs ?? 60) / 1000,
      landMs: numbers.landMs,
      transition: toTransition(numbers),
      origin: ORIGIN[item.id],
    };
    return [item.id, recipe];
  }),
);

export function getEnter(id: string): EnterRecipe {
  const recipe = ENTER[id];
  if (!recipe) {
    throw new Error(`Unknown enterRecipe "${id}". See sidecar/sections/libraries/ENTER.md`);
  }
  return recipe;
}

export function enterPose(entered: boolean, recipe: EnterRecipe): Pose {
  return entered ? recipe.to : recipe.from;
}

export function enterTransition(recipe: EnterRecipe, delay = 0): Transition {
  return { ...recipe.transition, delay: ((recipe.transition.delay as number) || 0) + delay };
}
