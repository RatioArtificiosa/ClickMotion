"use client";

/**
 * HELIX - helical design gallery carousel section (MS-SEC-HELI01).
 *
 * No Scroller (pin-until-complete). Not PSAVE: there is no reverse-played film.
 * WebGL cylindrical card helix, crossing "Design in" / "motion" titles,
 * ClickMotion wordmark lockup. Art, helix math, and title mapping stay.
 *
 * Wheel / trackpad / touch / keys aim virtual progress on
 * 3 viewports mobile / 5 desktop. Titles + helix follow that
 * progress 1:1. At 0+up or 1+down the pin releases. After release
 * at the end, the PAGE owns the wheel until the stage docks
 * (top >= -2). Pointer on the next sibling never drives the helix.
 */

import { useEffect, useRef } from "react";
import { OrbitHelix } from "./OrbitHelix";

const TITLE_PEAK_G = 0.18;
const SUBTITLE_FADE_G = 0.55;

function clamp01(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function mapRange(
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  v: number,
) {
  const t = (v - inMin) / (inMax - inMin || 1);
  return outMin + clamp01(t) * (outMax - outMin);
}

/** Virtual earn: 3 viewports mobile, 5 desktop. Not page height. */
function virtualViewports() {
  return window.innerWidth < 768 ? 3 : 5;
}

export default function HelixGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const topWordRef = useRef<HTMLDivElement>(null);
  const bottomWordRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const helixProgress = useRef(0);
  const destRef = useRef(0);
  const touchYRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const setTitles = (g: number) => {
      const titleT =
        g <= TITLE_PEAK_G
          ? mapRange(0, TITLE_PEAK_G, 0, 0.5, g)
          : mapRange(TITLE_PEAK_G, 1, 0.5, 1, Math.min(g, 1));
      if (topWordRef.current) {
        topWordRef.current.style.transform = `translate3d(${-100 + titleT * 200}vw, 0, 0)`;
      }
      if (bottomWordRef.current) {
        bottomWordRef.current.style.transform = `translate3d(${100 - titleT * 200}vw, 0, 0)`;
      }
    };

    const applyVisual = (g: number) => {
      const p = clamp01(g);
      helixProgress.current = p;
      destRef.current = p;
      setTitles(p);
      if (subtitleRef.current) {
        const H = clamp01((p - SUBTITLE_FADE_G) / (1 - SUBTITLE_FADE_G || 1));
        subtitleRef.current.style.opacity = String(Math.max(0, 1 - 4 * H));
      }
    };

    if (topWordRef.current) {
      topWordRef.current.style.transform = "translate3d(-100vw, 0, 0)";
    }
    if (bottomWordRef.current) {
      bottomWordRef.current.style.transform = "translate3d(100vw, 0, 0)";
    }

    const attachCapture = (pageOwnsFn: () => boolean) => {
      const api = {
        setProgress: (p: number) => applyVisual(p),
        getProgress: () => helixProgress.current,
        getTarget: () => destRef.current,
        pageOwns: pageOwnsFn,
        productId: "MS-SEC-HELI01",
      };
      const w = window as Window & { __msScrollNarrative?: typeof api };
      w.__msScrollNarrative = api;
      return () => {
        if (w.__msScrollNarrative === api) delete w.__msScrollNarrative;
      };
    };

    if (reduce) {
      applyVisual(0.45);
      section.dataset.helixOwns = "pin";
      return attachCapture(() => false);
    }

    applyVisual(0);

    const virtualDistance = () =>
      virtualViewports() * (window.innerHeight || 800);

    const sectionInView = () => {
      const r = section.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      return r.top < mid && r.bottom > mid * 0.35;
    };

    const applyDelta = (deltaPx: number) => {
      if (!deltaPx || !Number.isFinite(deltaPx)) return false;
      const p = destRef.current;
      if (p <= 0.0005 && deltaPx < 0) return false;
      if (p >= 0.9995 && deltaPx > 0) return false;
      applyVisual(p + deltaPx / virtualDistance());
      return true;
    };

    const pinDocked = () => section.getBoundingClientRect().top >= -2;
    const journeyAtEnd = () => destRef.current >= 0.9995;
    let pageOwns = false;
    const setPageOwns = (owns: boolean) => {
      pageOwns = owns;
      section.dataset.helixOwns = owns ? "page" : "pin";
    };
    setPageOwns(false);

    const eventOnStage = (e: Event) => {
      if (e.target instanceof Node && section.contains(e.target)) return true;
      if (e instanceof WheelEvent) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el && section.contains(el)) return true;
      }
      return false;
    };

    const touchOnStage = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0];
      if (!t) return false;
      if (e.target instanceof Node && section.contains(e.target)) return true;
      const el = document.elementFromPoint(t.clientX, t.clientY);
      return Boolean(el && section.contains(el));
    };

    const detachCapture = attachCapture(() => pageOwns);

    const onWheel = (e: WheelEvent) => {
      if (pinDocked()) setPageOwns(false);
      if (pageOwns) return;
      if (!sectionInView()) return;
      if (!eventOnStage(e)) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaY) < 1) {
        return;
      }
      const consumed = applyDelta(e.deltaY);
      if (!consumed && journeyAtEnd() && e.deltaY > 0) setPageOwns(true);
      if (consumed) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (pinDocked()) setPageOwns(false);
      if (pageOwns || !sectionInView() || e.touches.length !== 1) return;
      if (!touchOnStage(e)) return;
      touchYRef.current = e.touches[0]!.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (pinDocked()) setPageOwns(false);
      if (pageOwns || !sectionInView() || e.touches.length !== 1) return;
      if (!touchOnStage(e)) return;
      const y = e.touches[0]!.clientY;
      const prev = touchYRef.current;
      touchYRef.current = y;
      if (prev == null) return;
      const deltaY = prev - y;
      const consumed = applyDelta(deltaY);
      if (!consumed && journeyAtEnd() && deltaY > 0) setPageOwns(true);
      if (consumed) e.preventDefault();
    };

    const onTouchEnd = () => {
      touchYRef.current = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (pinDocked()) setPageOwns(false);
      if (pageOwns || !sectionInView()) return;
      const el = e.target as HTMLElement | null;
      if (
        el &&
        el.closest(
          "a, button, input, textarea, select, [contenteditable='true']",
        )
      ) {
        return;
      }
      const step = virtualDistance() * 0.045;
      let delta = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        delta = e.key === "PageDown" ? step * 2.2 : step;
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        delta = e.key === "PageUp" ? -step * 2.2 : -step;
      } else {
        return;
      }
      const consumed = applyDelta(delta);
      if (!consumed && journeyAtEnd() && delta > 0) setPageOwns(true);
      if (consumed) e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      detachCapture();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="helix-gallery"
      data-product="MS-SEC-HELI01"
      data-helix-drive="pin"
      className="relative z-30 h-[100dvh] bg-[#C3C3C3] text-[#0a0a0a]"
      style={{ backgroundColor: "#C3C3C3" }}
    >
      <div
        ref={pinRef}
        className="relative z-30 h-[100dvh] min-h-dvh w-full overflow-hidden bg-[#C3C3C3] pt-20 pb-16 lg:py-20"
        style={{ isolation: "isolate", backgroundColor: "#C3C3C3" }}
      >
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-0 z-0 select-none overflow-visible"
        >
          <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 overflow-visible whitespace-nowrap">
            <div className="flex w-full flex-col items-center overflow-visible">
              <div
                ref={topWordRef}
                className="relative will-change-transform"
              >
                <h2
                  className="relative whitespace-nowrap font-[family-name:var(--font-helix-display)] text-[clamp(3.25rem,13vw,9.5rem)] uppercase leading-[0.8] tracking-[-0.04em] text-[#1a1a1a]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  Design in
                </h2>
              </div>

              <div
                ref={subtitleRef}
                className="relative mx-auto my-3 flex flex-col items-center text-center"
              >
                <p
                  className="mb-3"
                  aria-label="ClickMotion"
                  style={{
                    fontFamily: "var(--font-helix-wordmark), cursive",
                    fontSize: "clamp(1.85rem, 3.6vw, 2.75rem)",
                    fontWeight: 400,
                    color: "#0a0a0a",
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                  }}
                >
                  ClickMotion
                </p>
                <p className="font-[family-name:var(--font-helix-display)] text-[12px] uppercase tracking-[0.08em] text-[#1a1a1a] md:text-[13px]">
                  Exploring ideas through
                  <br />
                  daily design practice.
                </p>
              </div>

              <div
                ref={bottomWordRef}
                className="relative will-change-transform"
              >
                <h2
                  className="relative whitespace-nowrap font-[family-name:var(--font-helix-display)] text-[clamp(3.25rem,13vw,9.5rem)] uppercase leading-[0.8] tracking-[-0.04em] text-[#1a1a1a]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  motion
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto flex w-full max-w-[1440px] justify-start px-5 pb-10 md:px-10 md:pb-14">
          <p className="max-w-[16rem] text-left text-[13px] leading-relaxed text-[#0a0a0a]/80 md:text-[14px]">
            Concepts, explorations, and interface
            <br />
            experiments shared openly as part of
            <br />
            our creative process.
          </p>
        </div>

        <OrbitHelix
          progressRef={helixProgress}
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        />
      </div>
    </section>
  );
}
