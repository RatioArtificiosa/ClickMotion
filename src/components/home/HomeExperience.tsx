"use client";

import { useCallback, useEffect, useRef, useState, Suspense } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { FilterChips } from "@/components/gallery/FilterChips";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import type { GalleryPrompt } from "@/lib/gallery-utils";
import { syne } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const VIDEO_SRC = "/assets/videos/hero-bg-v2.mp4";
const INTRO_KEY = "ms-intro-played";

/**
 * MarkData-style sticky film + MS landing settle.
 *
 * 0 → A inset card grows → near-full
 * A → HOLD beat at max
 * HOLD → B hero absorbs into top band WHILE gallery sheet pulls up
 * underneath it - they meet and lock (no black void)
 * B → done collapse tall runway → normal page (header + hero + gallery)
 *
 * Progress = max(scroll, endMorph). Idle 10s → slow auto-roll.
 */

const PHASE_A_END = 0.22;
const PHASE_HOLD_END = 0.3;
/** Absorb + gallery rise finish here - settle immediately (no dead runway after). */
const PHASE_B_END = 0.92;

/** Shorter runway so manual scroll lands sooner, still enough for smooth scrub */
const STAGE_VH = 320;
const IDLE_AUTO_MS = 10_000;
const END_MORPH_DUR_MS = 3600;

/** Settle a hair before B_END so the last scroll tick always locks the page */
const SETTLE_AT = 0.9;

const FRAME = {
 sideStart: 18,
 sideEnd: 1.35,
 topStart: 14.75,
 topEnd: 5.85,
 bottomStart: 13,
 bottomEnd: 3.75,
 radiusStart: 22,
 radiusEnd: 18,
} as const;

function clamp(n: number, a: number, b: number) {
 return Math.min(b, Math.max(a, n));
}
function lerp(a: number, b: number, t: number) {
 return a + (b - a) * t;
}
function easeInOutCubic(t: number) {
 return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutCubic(t: number) {
 return 1 - Math.pow(1 - t, 3);
}

type RectPx = {
 top: number;
 right: number;
 bottom: number;
 left: number;
 radius: number;
};

function remPx(rem: number) {
 if (typeof window === "undefined") return rem * 16;
 const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
 return rem * root;
}

function finalRect(_vw: number, vh: number): RectPx {
 const bandH = Math.min(420, Math.max(300, vh * 0.4));
 return {
 top: 0,
 left: 0,
 right: 0,
 bottom: Math.max(0, vh - bandH),
 radius: 0,
 };
}

function startRect(vw: number, _vh: number): RectPx {
 return {
 top: remPx(FRAME.topStart),
 bottom: remPx(FRAME.bottomStart),
 left: (FRAME.sideStart / 100) * vw,
 right: (FRAME.sideStart / 100) * vw,
 radius: FRAME.radiusStart,
 };
}

function expandRect(vw: number, _vh: number): RectPx {
 return {
 top: remPx(FRAME.topEnd),
 bottom: remPx(FRAME.bottomEnd),
 left: (FRAME.sideEnd / 100) * vw,
 right: (FRAME.sideEnd / 100) * vw,
 radius: FRAME.radiusEnd,
 };
}

function lerpRect(a: RectPx, b: RectPx, t: number): RectPx {
 return {
 top: lerp(a.top, b.top, t),
 right: lerp(a.right, b.right, t),
 bottom: lerp(a.bottom, b.bottom, t),
 left: lerp(a.left, b.left, t),
 radius: lerp(a.radius, b.radius, t),
 };
}

type Visual = {
 rect: RectPx;
 vignette: number;
 ctaOp: number;
 showFrameChrome: boolean;
 /** 0 = sheet off-screen below, 1 = flush under hero band */
 sheetT: number;
};

function computeVisual(raw: number, vw: number, vh: number): Visual {
 const p = clamp(raw, 0, 1);
 const s = startRect(vw, vh);
 const e = expandRect(vw, vh);
 const f = finalRect(vw, vh);

 if (p <= PHASE_A_END) {
 const t = easeInOutCubic(p / PHASE_A_END);
 return {
 rect: lerpRect(s, e, t),
 vignette: lerp(0.4, 0.55, t),
 ctaOp: 0,
 showFrameChrome: true,
 sheetT: 0,
 };
 }

 if (p <= PHASE_HOLD_END) {
 return {
 rect: e,
 vignette: 0.55,
 ctaOp: 0,
 showFrameChrome: true,
 sheetT: 0,
 };
 }

 if (p <= PHASE_B_END) {
 const span = PHASE_B_END - PHASE_HOLD_END;
 const t = easeInOutCubic((p - PHASE_HOLD_END) / span);
 return {
 rect: lerpRect(e, f, t),
 vignette: lerp(0.55, 0.62, t),
 ctaOp: clamp((t - 0.35) / 0.5, 0, 1),
 showFrameChrome: t < 0.88,
 // Gallery rises in the same window the hero shrinks
 sheetT: t,
 };
 }

 return {
 rect: f,
 vignette: 0.62,
 ctaOp: 1,
 showFrameChrome: false,
 sheetT: 1,
 };
}

function applyLayer(el: HTMLElement | null, rect: RectPx) {
 if (!el) return;
 el.style.top = `${rect.top}px`;
 el.style.right = `${rect.right}px`;
 el.style.bottom = `${rect.bottom}px`;
 el.style.left = `${rect.left}px`;
 el.style.borderRadius = `${rect.radius}px`;
 el.style.transform = "scale(1)";
 el.style.opacity = "1";
}

/**
 * Gallery sheet rides under the current hero bottom edge.
 * sheetT 0 → fully below viewport; sheetT 1 → top flush with hero bottom.
 */
function applySheet(
 el: HTMLElement | null,
 rect: RectPx,
 sheetT: number,
 vh: number,
 hintEl: HTMLElement | null
) {
 if (!el) return;
 const heroBottom = Math.max(0, vh - rect.bottom);
 // Start slightly past bottom so first frames don't flash a sliver
 const from = vh + 48;
 const top = lerp(from, heroBottom, clamp(sheetT, 0, 1));
 const op = clamp((sheetT - 0.02) / 0.18, 0, 1);
 const radius = lerp(22, 0, clamp(sheetT, 0, 1));

 el.style.position = "fixed";
 el.style.left = "0";
 el.style.right = "0";
 el.style.bottom = "0";
 el.style.top = `${top}px`;
 el.style.zIndex = "30";
 el.style.opacity = String(op);
 // NEVER capture pointer/wheel during intro - interactive gallery steals
 // scroll, freezes progress before settle, and leaves the "almost final
 // but no header" mess. Page scroll owns the runway until settleToCompact.
 el.style.pointerEvents = "none";
 el.style.borderTopLeftRadius = `${radius}px`;
 el.style.borderTopRightRadius = `${radius}px`;
 el.style.transform = "translateZ(0)";
 el.style.willChange = "top, opacity";
 el.style.overflowY = "hidden";
 el.style.overscrollBehavior = "none";
 el.style.background = "var(--canvas, #0a0a0c)";
 el.style.boxShadow =
 sheetT > 0.08 ? "0 -16px 48px rgba(0,0,0,0.45), 0 -1px 0 rgba(255,255,255,0.06)" : "none";

 if (hintEl) {
 // Hide "Scroll" as soon as the sheet starts covering the void
 hintEl.style.opacity = sheetT > 0.08 ? "0" : "1";
 }
}

function clearSheetInline(el: HTMLElement | null) {
 if (!el) return;
 el.style.position = "";
 el.style.left = "";
 el.style.right = "";
 el.style.bottom = "";
 el.style.top = "";
 el.style.zIndex = "";
 el.style.opacity = "";
 el.style.pointerEvents = "";
 el.style.borderTopLeftRadius = "";
 el.style.borderTopRightRadius = "";
 el.style.transform = "";
 el.style.willChange = "";
 el.style.overflowY = "";
 el.style.overscrollBehavior = "";
 el.style.background = "";
 el.style.boxShadow = "";
}

function markIntroPlayed() {
 try {
 sessionStorage.setItem(INTRO_KEY, "1");
 } catch {
 /* ignore */
 }
}

/**
 * Main home always plays the MarkData intro (scroll grow → hold → absorb).
 * Only skip for prefers-reduced-motion. Session skip was removed so
 * localhost:3004 / production `/` match every entry (same as ?intro=1).
 */
function shouldSkipIntroClient(): boolean {
 if (typeof window === "undefined") return false;
 try {
 if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
 } catch {
 /* ignore */
 }
 return false;
}

export function HomeExperience({ prompts }: { prompts: GalleryPrompt[] }) {
 const reduce = useReducedMotion();
 const [compact, setCompact] = useState(shouldSkipIntroClient);
 // chromeReady reserved for header reveal side-effects via sendChrome
 const [, setChromeReady] = useState(shouldSkipIntroClient);

 const stageRef = useRef<HTMLElement>(null);
 const stickyRef = useRef<HTMLDivElement>(null);
 const videoRef = useRef<HTMLVideoElement>(null);
 const layerRef = useRef<HTMLDivElement>(null);
 const vigRef = useRef<HTMLDivElement>(null);
 const ctaRef = useRef<HTMLDivElement>(null);
 const sheetRef = useRef<HTMLElement>(null);
 const hintRef = useRef<HTMLParagraphElement>(null);

 const endMorphRef = useRef(0);
 const endMorphRafRef = useRef(0);
 const autoLatchedRef = useRef(false);
 const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
 const settledRef = useRef(false);
 const tickingRef = useRef(false);
 const bootRef = useRef(false);
 const chromeSentRef = useRef(false);

 const paint = useCallback((raw: number) => {
 const vw = window.innerWidth;
 const vh = window.innerHeight;
 const v = computeVisual(raw, vw, vh);
 applyLayer(layerRef.current, v.rect);
 if (layerRef.current) {
 layerRef.current.style.border = v.showFrameChrome
 ? "1px solid rgba(255,255,255,0.12)"
 : "1px solid transparent";
 layerRef.current.style.boxShadow = v.showFrameChrome
 ? "0 0 0 1px rgba(0,0,0,0.5) inset, 0 24px 80px rgba(0,0,0,0.65), 0 0 60px rgba(255,255,255,0.06)"
 : "none";
 }
 if (vigRef.current) vigRef.current.style.opacity = String(v.vignette);
 if (ctaRef.current) {
 ctaRef.current.style.opacity = String(v.ctaOp);
 ctaRef.current.style.transform = `translateY(${(1 - v.ctaOp) * 10}px)`;
 ctaRef.current.style.pointerEvents = v.ctaOp > 0.55 ? "auto" : "none";
 }
 if (!settledRef.current) {
 applySheet(sheetRef.current, v.rect, v.sheetT, vh, hintRef.current);
 }
 return v;
 }, []);

 const paintCompactFill = useCallback(() => {
 applyLayer(layerRef.current, { top: 0, right: 0, bottom: 0, left: 0, radius: 0 });
 if (layerRef.current) {
 layerRef.current.style.border = "1px solid transparent";
 layerRef.current.style.boxShadow = "none";
 }
 if (vigRef.current) vigRef.current.style.opacity = "0.62";
 if (ctaRef.current) {
 ctaRef.current.style.opacity = "1";
 ctaRef.current.style.transform = "translateY(0)";
 ctaRef.current.style.pointerEvents = "auto";
 }
 clearSheetInline(sheetRef.current);
 }, []);

 /** Pin scrollbar to absolute top (stage collapse can leave residual scrollY). */
 const pinScrollTop = useCallback(() => {
 window.scrollTo({ top: 0, left: 0, behavior: "auto" });
 document.documentElement.scrollTop = 0;
 document.body.scrollTop = 0;
 }, []);

 /**
 * Header only - called once at true end (not mid-absorb).
 * Marks session + fires pull-down via `ms:intro-complete`.
 */
 const sendChrome = useCallback((markPlayed: boolean) => {
 if (markPlayed) markIntroPlayed();
 setChromeReady(true);
 if (!chromeSentRef.current) {
 chromeSentRef.current = true;
 window.dispatchEvent(new CustomEvent("ms:intro-complete"));
 }
 }, []);

 /**
 * Snap to the finished page in one motion (same for scroll-end and 10s auto):
 * final hero band + gallery in flow + scrollY=0 + header pull-down.
 * Must be atomic - the messy mid-state was settle partial / header delayed /
 * gallery sheet eating wheel so progress never reached here.
 */
 const settleToCompact = useCallback(
 (markPlayed: boolean) => {
 if (settledRef.current) return;
 settledRef.current = true;
 autoLatchedRef.current = true;

 if (endMorphRafRef.current) {
 cancelAnimationFrame(endMorphRafRef.current);
 endMorphRafRef.current = 0;
 }
 if (idleTimerRef.current) {
 clearTimeout(idleTimerRef.current);
 idleTimerRef.current = null;
 }

 // 1) Visual final frame while still sticky
 paint(1);
 // 2) Drop runway + put gallery in document flow
 setCompact(true);
 // 3) Immediate pin (don't wait two frames - user saw "almost done" without chrome)
 pinScrollTop();
 document.documentElement.classList.remove("is-ms-intro");
 document.body.classList.remove("is-ms-intro");
 // 4) Header pull-down now (same moment as land)
 sendChrome(markPlayed);

 requestAnimationFrame(() => {
 paintCompactFill();
 pinScrollTop();
 requestAnimationFrame(() => {
 paintCompactFill();
 pinScrollTop();
 });
 });
 window.setTimeout(pinScrollTop, 80);
 window.setTimeout(pinScrollTop, 400);
 },
 [paint, paintCompactFill, pinScrollTop, sendChrome]
 );

 const getScrollProgress = useCallback(() => {
 const stage = stageRef.current;
 if (!stage) return 0;
 const total = stage.offsetHeight - window.innerHeight;
 if (total <= 0) return 0;
 const scrolled = -stage.getBoundingClientRect().top;
 return clamp(scrolled / total, 0, 1);
 }, []);

 const getEffectiveProgress = useCallback(() => {
 const scrollP = getScrollProgress();
 if (autoLatchedRef.current) return Math.max(scrollP, 1);
 const endMorph = endMorphRef.current;
 if (endMorph <= 0) return scrollP;
 // Idle morph 0→1 scrubs the full story (grow → hold → absorb + sheet rise)
 return Math.max(scrollP, endMorph);
 }, [getScrollProgress]);

 useEffect(() => {
 if (bootRef.current) return;
 bootRef.current = true;

 // Always run intro on main `/` unless reduced-motion (a11y).
 const skip = Boolean(reduce);

 if (skip) {
 settledRef.current = true;
 setCompact(true);
 setChromeReady(true);
 chromeSentRef.current = true;
 requestAnimationFrame(() => {
 paintCompactFill();
 window.dispatchEvent(new CustomEvent("ms:intro-complete"));
 });
 return;
 }

 document.documentElement.classList.add("is-ms-intro");
 document.body.classList.add("is-ms-intro");

 const video = videoRef.current;
 const unlockHandlers: Array<() => void> = [];
 if (video) {
 video.muted = true;
 video.defaultMuted = true;
 video.playsInline = true;
 video.loop = true;
 video.removeAttribute("controls");
 const tryPlay = () => void video.play().catch(() => {});
 tryPlay();
 const onLoaded = () => tryPlay();
 video.addEventListener("loadeddata", onLoaded);
 const unlock = () => {
 tryPlay();
 window.removeEventListener("pointerdown", unlock);
 };
 window.addEventListener("pointerdown", unlock, { once: true, passive: true });
 unlockHandlers.push(() => {
 video.removeEventListener("loadeddata", onLoaded);
 window.removeEventListener("pointerdown", unlock);
 });
 }

 paint(0);

 const startEndMorph = () => {
 if (reduce || autoLatchedRef.current || settledRef.current) return;
 if (endMorphRef.current >= 1) return;
 if (getScrollProgress() > PHASE_A_END * 0.9) return;

 const start = performance.now();
 const from = endMorphRef.current;
 // Drive progress 0→PHASE_B_END (full grow + absorb + sheet rise)
 const dur = END_MORPH_DUR_MS;

 const step = (now: number) => {
 if (settledRef.current) return;
 const t = clamp((now - start) / dur, 0, 1);
 // endMorph is 0→1; effective progress uses it as full 0→1 scrub
 endMorphRef.current = from + (1 - from) * easeOutCubic(t);
 const p = getEffectiveProgress();
 paint(p);

 if (p >= SETTLE_AT) {
 endMorphRef.current = 1;
 settleToCompact(true);
 return;
 }

 if (t < 1) {
 endMorphRafRef.current = requestAnimationFrame(step);
 } else {
 endMorphRef.current = 1;
 settleToCompact(true);
 }
 };
 endMorphRafRef.current = requestAnimationFrame(step);
 };

 const armIdleAuto = () => {
 if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
 idleTimerRef.current = setTimeout(() => {
 if (settledRef.current || autoLatchedRef.current) return;
 if (getScrollProgress() < PHASE_A_END * 0.85) {
 startEndMorph();
 }
 }, IDLE_AUTO_MS);
 };

 const onFrame = () => {
 tickingRef.current = false;
 if (settledRef.current) {
 paintCompactFill();
 return;
 }

 const p = getEffectiveProgress();
 paint(p);

 // Visual almost locked → same landing as the 10s auto path
 if (p >= SETTLE_AT) {
 settleToCompact(true);
 }
 };

 const onScrollOrResize = () => {
 if (tickingRef.current) return;
 tickingRef.current = true;
 requestAnimationFrame(onFrame);
 };

 const onUserScroll = () => {
 const sp = getScrollProgress();
 if (sp > 0.04 && idleTimerRef.current) {
 clearTimeout(idleTimerRef.current);
 idleTimerRef.current = null;
 }
 onScrollOrResize();
 };

 /**
 * Near the end, any further wheel finishes the intro immediately so the
 * user never sits in the "gallery up, no header, sticky void" limbo.
 */
 const onWheelFinish = (e: WheelEvent) => {
 if (settledRef.current) return;
 const p = getEffectiveProgress();
 if (p >= 0.82 && e.deltaY > 0) {
 settleToCompact(true);
 }
 };

 window.addEventListener("scroll", onUserScroll, { passive: true });
 window.addEventListener("resize", onScrollOrResize, { passive: true });
 window.addEventListener("wheel", onWheelFinish, { passive: true });
 armIdleAuto();

 return () => {
 if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
 if (endMorphRafRef.current) cancelAnimationFrame(endMorphRafRef.current);
 window.removeEventListener("scroll", onUserScroll);
 window.removeEventListener("resize", onScrollOrResize);
 window.removeEventListener("wheel", onWheelFinish);
 unlockHandlers.forEach((fn) => fn());
 document.documentElement.classList.remove("is-ms-intro");
 document.body.classList.remove("is-ms-intro");
 };
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 useEffect(() => {
 if (!compact) return;
 paintCompactFill();
 document.documentElement.classList.remove("is-ms-intro");
 document.body.classList.remove("is-ms-intro");
 }, [compact, paintCompactFill]);

 const layerStartStyle = compact
 ? {
 top: 0,
 right: 0,
 bottom: 0,
 left: 0,
 borderRadius: 0,
 border: "1px solid transparent" as const,
 boxShadow: "none" as const,
 }
 : {
 top: `${FRAME.topStart}rem`,
 right: `${FRAME.sideStart}%`,
 bottom: `${FRAME.bottomStart}rem`,
 left: `${FRAME.sideStart}%`,
 borderRadius: FRAME.radiusStart,
 border: "1px solid rgba(255,255,255,0.12)" as const,
 boxShadow:
 "0 0 0 1px rgba(0,0,0,0.5) inset, 0 24px 80px rgba(0,0,0,0.65), 0 0 60px rgba(255,255,255,0.06)" as const,
 };

 const galleryBody = (
 <>
 <Suspense
 fallback={
 <div className="mb-5 h-8 w-full animate-pulse rounded-full bg-white/[0.04]" />
 }
 >
 <FilterChips className="mb-4 px-1" />
 </Suspense>
 <GalleryGrid prompts={prompts} />
 </>
 );

 return (
 <div className="flex flex-col bg-[var(--canvas)]">
 <section
 ref={stageRef}
 className={cn(
 "relative z-0 w-full bg-black",
 compact
 ? "h-[clamp(300px,40vh,420px)] border-b border-[var(--hairline)]"
 : "ms-hero-stage"
 )}
 style={compact ? undefined : { height: `${STAGE_VH}vh` }}
 aria-label="Introduction"
 data-ms-home-hero
 >
 <div
 ref={stickyRef}
 className={cn(
 "overflow-hidden bg-black",
 compact ? "relative h-full w-full" : "sticky top-0 h-[100dvh] w-full"
 )}
 >
 <div className="absolute inset-0 bg-black" aria-hidden />

 <div
 ref={layerRef}
 className="absolute z-[1] overflow-hidden will-change-[top,right,bottom,left,border-radius] [transform-origin:center_center] [container-type:size]"
 style={{
 ...layerStartStyle,
 background:
 "radial-gradient(ellipse at 30% 20%, #1a1a22 0%, #0a0a0c 45%, #000 100%)",
 }}
 >
 <video
 ref={videoRef}
 src={VIDEO_SRC}
 muted
 loop
 playsInline
 autoPlay
 preload="auto"
 className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover"
 aria-hidden
 />
 <div
 className="pointer-events-none absolute inset-0 z-0"
 style={{
 background:
 "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%), repeating-linear-gradient(-12deg, transparent, transparent 40px, rgba(255,255,255,0.02) 40px, rgba(255,255,255,0.02) 41px)",
 }}
 aria-hidden
 />
 <div
 ref={vigRef}
 className="pointer-events-none absolute inset-0 z-[2]"
 style={{
 opacity: compact ? 0.62 : 0.45,
 background:
 "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.5) 100%)",
 }}
 aria-hidden
 />

 <div className="pointer-events-none absolute inset-0 z-[3] flex flex-col items-center justify-center px-[6%] text-center">
 <p
 className="mb-[0.55em] inline-flex items-center rounded-full border border-white/10 bg-black/35 px-[0.9em] py-[0.28em] font-medium uppercase text-white/75 backdrop-blur-sm"
 style={{
 fontSize: "clamp(8px, 2.4cqh, 11px)",
 letterSpacing: "0.14em",
 }}
 >
 Fresh Drops Daily
 </p>
 <h1
 className={cn(
 syne.className,
 "font-extrabold leading-[1.02] tracking-[-0.04em] text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.55)]"
 )}
 style={{
 fontSize: "clamp(1.25rem, 9.2cqh, 3.25rem)",
 }}
 >
 UNLOCK YOUR AI
 <br />
 DESIGN SUPERPOWERS
 </h1>
 <p
 className="mt-[0.65em] max-w-[34em] leading-relaxed text-white/75"
 style={{
 fontSize: "clamp(11px, 3.4cqh, 15px)",
 }}
 >
 Build beautiful landing pages in minutes with ready-to-use prompts. Just copy, paste,
 and launch.
 </p>

 <div
 ref={ctaRef}
 className="mt-[1em] flex flex-col items-center will-change-[opacity,transform]"
 style={{
 opacity: compact ? 1 : 0,
 transform: compact ? "translateY(0)" : "translateY(10px)",
 pointerEvents: compact ? "auto" : "none",
 }}
 >
 <Link
 href="/pricing"
 className="btn-primary pointer-events-auto gap-1.5"
 style={{
 fontSize: "clamp(12px, 1.9cqi, 14px)",
 minHeight: "clamp(36px, 5.5cqh, 44px)",
 paddingInline: "clamp(1.1rem, 3cqi, 1.5rem)",
 borderRadius: 12,
 }}
 >
 Unlimited Power
 <span aria-hidden>→</span>
 </Link>
 <p
 className="pointer-events-none mt-[0.65em] text-white/45"
 style={{ fontSize: "clamp(10px, 1.55cqi, 12px)" }}
 >
 · Cursor · Claude · Codex · Grok Build · Lovable · Bolt ·
 </p>
 </div>
 </div>
 </div>

 {!compact && (
 <p
 ref={hintRef}
 className="pointer-events-none absolute bottom-6 left-0 right-0 z-[4] text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white/35 transition-opacity duration-300"
 aria-hidden
 >
 Scroll
 </p>
 )}
 </div>
 </section>

 {/*
 One gallery instance:
 - Intro: fixed sheet, top scrubbed under the shrinking hero (applySheet)
 - Settled: normal document flow under compact hero
 */}
 <section
 ref={sheetRef}
 className={cn(
 "w-full px-1 pb-16 pt-2 sm:px-1.5 sm:pt-3 lg:px-2",
 compact && "relative z-0"
 )}
 style={
 compact
 ? undefined
 : {
 // Initial off-screen until first paint() - avoids flash
 position: "fixed",
 left: 0,
 right: 0,
 top: "100vh",
 bottom: 0,
 zIndex: 30,
 opacity: 0,
 pointerEvents: "none",
 background: "var(--canvas, #0a0a0c)",
 }
 }
 aria-label="Prompt gallery"
 >
 {galleryBody}
 </section>
 </div>
 );
}
