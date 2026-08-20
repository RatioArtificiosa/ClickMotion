"use client";

/**
 * Roadster - Studio Drive hybrid hero. MS-HERO-ROAD01.
 *
 * - Video: native autoplay / muted / loop. Never scroll-scrubbed. Not PSAVE.
 * - No Scroller: virtual progress on 13.3 viewports (same as old 1330vh track).
 * - Cards then specs sheet pull up over the still-pinned film.
 * - Pin freeing: page owns until dock after g = 1 + down.
 *
 * Client film: /assets/roadster/studio-drive.mp4
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import RoadsterSpecsSheet from "./RoadsterSpecsSheet";

const VIDEO_SRC = "/assets/roadster/studio-drive.mp4";

/**
 * Virtual earn matches the old 1200vh panel + 130vh sheet runway.
 * 13.3 is virtual only. Do not build a 13.3 vh document spacer.
 */
const PANEL_VH = 12;
const SHEET_VH = 1.3;
const VIRTUAL_VIEWPORTS = PANEL_VH + SHEET_VH;
const PANEL_END = PANEL_VH / VIRTUAL_VIEWPORTS;

/**
 * Trapezoid envelope (progress 0-1 fractions). Must pack under 1.0:
 * - enter: long fade-in  (~2× old sharp bell ramp in px of scroll)
 * - hold:  full opacity for a deliberate dwell (one solid scroll)
 * - exit:  long fade-out (~2×)
 * Quiet intro before first card; small gaps so cards never fight.
 *
 * Check: INTRO + 6*(ENTER+HOLD+EXIT) + 5*GAP ≈ 0.04+0.912+0.04 = 0.992
 */
const ENTER = 0.052;
const HOLD = 0.048;
const EXIT = 0.052;
const GAP = 0.008;
const INTRO = 0.04;

type Spec = { value: string; unit?: string; label: string };

type Timing = {
  /** Progress where fade-in begins */
  start: number;
  enter: number;
  hold: number;
  exit: number;
};

type Panel =
  | {
      id: string;
      kind: "hero";
      kicker: string;
      title: string;
      sub: string;
    } & Timing
  | {
      id: string;
      kind: "specs";
      kicker: string;
      specs: Spec[];
    } & Timing
  | {
      id: string;
      kind: "feature";
      side: "left" | "right";
      kicker: string;
      title: string;
      body: string;
      stat?: Spec;
      /** Hairline under body even when no stat */
      rule?: boolean;
    } & Timing
  | {
      id: string;
      kind: "close";
      kicker: string;
      title: string;
      sub: string;
    } & Timing;

function packTiming(index: number): Timing {
  const span = ENTER + HOLD + EXIT;
  const start = INTRO + index * (span + GAP);
  return { start, enter: ENTER, hold: HOLD, exit: EXIT };
}

/**
 * On-brand Tesla voice (homepage + Roadster page patterns):
 * short product name, giant numbers, one-line subs, Order / Learn / Reserve CTAs.
 * Default specs are illustrative EV supercar claims; restage for your brand.
 */
const PANELS: Panel[] = [
  {
    id: "hero",
    ...packTiming(0),
    kind: "hero",
    kicker: "Tesla",
    title: "Roadster",
    sub: "The quickest car in the world.",
  },
  {
    id: "specs",
    ...packTiming(1),
    kind: "specs",
    kicker: "Performance",
    specs: [
      { value: "1.9", unit: "s", label: "0-60 mph" },
      { value: "+250", unit: "mph", label: "Top Speed" },
      { value: "620", unit: "mi", label: "Range" },
    ],
  },
  {
    id: "drive",
    ...packTiming(2),
    kind: "feature",
    side: "left",
    kicker: "Drive",
    title: "Instant\ntorque.",
    body: "All-wheel drive. Ten thousand newton-meters at the wheels. No gears. No lag. Only arrival.",
    stat: { value: "10,000", unit: "Nm", label: "Wheel Torque" },
  },
  {
    id: "range",
    ...packTiming(3),
    kind: "feature",
    side: "right",
    kicker: "Freedom",
    title: "Go farther.",
    body: "Six hundred twenty miles of range. Cross states on a charge. Keep the road, lose the ritual.",
    stat: { value: "620", unit: "mi", label: "Mile Range" },
  },
  {
    id: "form",
    ...packTiming(4),
    kind: "feature",
    side: "left",
    kicker: "Design",
    title: "Built for\nthe air.",
    body: "A low, continuous silhouette. Four seats. Every surface tuned for speed and presence.",
    rule: true,
  },
  {
    id: "close",
    ...packTiming(5),
    kind: "close",
    kicker: "Reserve",
    title: "Roadster",
    sub: "Configure yours. Own the horizon.",
  },
];

/** Hard floor. Anything below is fully off (prevents ghost type on edges). */
const VIS_FLOOR = 0.03;

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

/**
 * Enter → hold → exit trapezoid.
 * Full opacity for the entire hold band so one swipe can't flash past a single peak.
 */
function panelVisibility(progress: number, panel: Timing) {
  const t0 = panel.start;
  const t1 = t0 + panel.enter;
  const t2 = t1 + panel.hold;
  const t3 = t2 + panel.exit;

  if (progress <= t0 || progress >= t3) return 0;
  if (progress >= t1 && progress <= t2) return 1;

  let v: number;
  if (progress < t1) {
    v = smoothstep((progress - t0) / panel.enter);
  } else {
    v = 1 - smoothstep((progress - t2) / panel.exit);
  }

  if (v < VIS_FLOOR) return 0;
  return (v - VIS_FLOOR) / (1 - VIS_FLOOR);
}

function panelOffset(
  kind: Panel["kind"],
  side: "left" | "right" | "center",
  v: number
) {
  const inv = 1 - v;
  if (kind === "hero" || kind === "specs" || kind === "close" || side === "center") {
    return { x: 0, y: 36 * inv };
  }
  if (side === "left") return { x: -56 * inv, y: 12 * inv };
  return { x: 56 * inv, y: 12 * inv };
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export default function TeslaRoadsterPromo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const destRef = useRef(0);
  const progressRef = useRef(0);
  const pageOwnsRef = useRef(false);
  const touchYRef = useRef<number | null>(null);
  const goToSheetRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  /** WebGL only while sheet is meaningfully on-screen (avoids context thrash). */
  const [sheetActive, setSheetActive] = useState(false);
  const sheetActiveRef = useRef(false);

  const paintPanels = useCallback((p: number) => {
    const clamped = Math.min(1, Math.max(0, p));
    if (barRef.current) {
      // Story bar only covers panel phase
      barRef.current.style.transform = `scaleX(${clamped})`;
    }
    PANELS.forEach((panel, i) => {
      const el = panelRefs.current[i];
      if (!el) return;
      const v = panelVisibility(clamped, panel);
      const side =
        panel.kind === "feature" ? panel.side : ("center" as const);
      const { x, y } = panelOffset(panel.kind, side, v);
      // Fully hide when off. visibility:hidden prevents subpixel ghosting
      if (v <= 0) {
        el.style.opacity = "0";
        el.style.visibility = "hidden";
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        el.style.pointerEvents = "none";
        el.setAttribute("aria-hidden", "true");
        return;
      }
      el.style.visibility = "visible";
      el.style.opacity = String(v);
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      el.style.pointerEvents = v > 0.55 ? "auto" : "none";
      el.setAttribute("aria-hidden", v < 0.12 ? "true" : "false");
    });
  }, []);

  /** sheetP 0 = fully below viewport, 1 = fully docked over film */
  const paintSheet = useCallback((sheetP: number) => {
    const p = Math.min(1, Math.max(0, sheetP));
    const sheet = sheetRef.current;
    if (sheet) {
      const y = (1 - p) * 100;
      sheet.style.transform = `translate3d(0, ${y}%, 0)`;
      sheet.style.pointerEvents = p > 0.08 ? "auto" : "none";
    }
    // Fade bottom rail as sheet rises
    if (railRef.current) {
      const railOp = 1 - Math.min(1, p * 1.6);
      railRef.current.style.opacity = String(railOp);
      railRef.current.style.pointerEvents = railOp < 0.15 ? "none" : "auto";
    }
    // Mount WebGL only once sheet is ~20% up (not while fully off-screen)
    const nextActive = p > 0.18;
    if (nextActive !== sheetActiveRef.current) {
      sheetActiveRef.current = nextActive;
      setSheetActive(nextActive);
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /** Video: always loop. Independent of cards / scroll. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startLoop = () => {
      setReady(true);
      if (reduced) {
        video.pause();
        try {
          video.currentTime = Math.min(2, video.duration || 2);
        } catch {
          /* ignore */
        }
        return;
      }
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      const play = video.play();
      if (play && typeof play.catch === "function") {
        play.catch(() => {
          /* autoplay policy. still show first frame */
        });
      }
    };

    if (video.readyState >= 2) startLoop();
    else {
      video.addEventListener("loadeddata", startLoop);
      video.addEventListener("canplay", startLoop);
    }

    // Re-assert loop if the browser ever pauses (tab switch, etc.)
    const onPause = () => {
      if (reduced) return;
      if (document.visibilityState === "visible") {
        video.play().catch(() => {});
      }
    };
    const onVis = () => {
      if (reduced || document.visibilityState !== "visible") return;
      if (video.paused) video.play().catch(() => {});
    };
    video.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      video.removeEventListener("loadeddata", startLoop);
      video.removeEventListener("canplay", startLoop);
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced]);

  /**
   * No Scroller: virtual g 0→1 on 13.3 viewports.
   * 0 → PANEL_END : narrative panels (film stays pinned, free-plays)
   * PANEL_END → 1 : specs sheet pulls up over the film
   * Never seeks video.currentTime. Not PSAVE.
   */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastReactAt = 0;

    const applyVisual = (g: number) => {
      const raw = clamp01(g);
      destRef.current = raw;
      progressRef.current = raw;
      let panelP = 0;
      let sheetP = 0;
      if (raw <= PANEL_END) {
        panelP = PANEL_END > 0 ? raw / PANEL_END : 0;
      } else {
        panelP = 1;
        const sheetSpan = 1 - PANEL_END;
        sheetP = sheetSpan > 0 ? (raw - PANEL_END) / sheetSpan : 1;
      }
      paintPanels(panelP);
      paintSheet(sheetP);
      const now = performance.now();
      const atEdge = raw <= 0.0005 || raw >= 0.9995;
      if (atEdge || now - lastReactAt > 80) {
        lastReactAt = now;
        setProgress(panelP);
      }
    };

    const attachCapture = (pageOwnsFn: () => boolean) => {
      const api = {
        setProgress: (p: number) => applyVisual(p),
        getProgress: () => progressRef.current,
        getTarget: () => destRef.current,
        pageOwns: pageOwnsFn,
        productId: "MS-HERO-ROAD01",
      };
      const w = window as Window & { __msScrollNarrative?: typeof api };
      w.__msScrollNarrative = api;
      return () => {
        if (w.__msScrollNarrative === api) delete w.__msScrollNarrative;
      };
    };

    const setPageOwns = (owns: boolean) => {
      pageOwnsRef.current = owns;
      section.dataset.roadsterOwns = owns ? "page" : "pin";
    };
    setPageOwns(false);
    section.dataset.roadsterDrive = "pin";
    section.dataset.product = "MS-HERO-ROAD01";

    if (reduced) {
      applyVisual(1);
      paintPanels(0.12);
      paintSheet(1);
      setProgress(0.12);
      destRef.current = 1;
      progressRef.current = 1;
      goToSheetRef.current = () => {
        applyVisual(1);
        paintPanels(0.12);
        paintSheet(1);
      };
      const detach = attachCapture(() => false);
      return () => {
        detach();
      };
    }

    applyVisual(0);
    goToSheetRef.current = () => applyVisual(1);

    const virtualDistance = () =>
      VIRTUAL_VIEWPORTS * (window.innerHeight || 800);

    const sectionInView = () => {
      const r = section.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      return r.top < mid && r.bottom > mid * 0.35;
    };
    const pinDocked = () => section.getBoundingClientRect().top >= -2;
    const journeyAtEnd = () => destRef.current >= 0.9995;

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

    const applyDelta = (deltaPx: number) => {
      if (!deltaPx || !Number.isFinite(deltaPx)) return false;
      const p = destRef.current;
      if (p <= 0.0005 && deltaPx < 0) return false;
      if (p >= 0.9995 && deltaPx > 0) return false;
      applyVisual(p + deltaPx / virtualDistance());
      return true;
    };

    const detachCapture = attachCapture(() => pageOwnsRef.current);

    const onWheel = (e: WheelEvent) => {
      if (pinDocked()) setPageOwns(false);
      if (pageOwnsRef.current) return;
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
      if (pageOwnsRef.current || !sectionInView() || e.touches.length !== 1) {
        return;
      }
      if (!touchOnStage(e)) return;
      touchYRef.current = e.touches[0]!.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (pinDocked()) setPageOwns(false);
      if (pageOwnsRef.current || !sectionInView() || e.touches.length !== 1) {
        return;
      }
      if (!touchOnStage(e)) return;
      const y = e.touches[0]!.clientY;
      const prev = touchYRef.current;
      touchYRef.current = y;
      if (prev == null) return;
      const consumed = applyDelta(prev - y);
      if (!consumed && journeyAtEnd() && prev - y > 0) setPageOwns(true);
      if (consumed) e.preventDefault();
    };

    const onTouchEnd = () => {
      touchYRef.current = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (pinDocked()) setPageOwns(false);
      if (pageOwnsRef.current || !sectionInView()) return;
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
  }, [reduced, paintPanels, paintSheet]);

  const onReserve = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    goToSheetRef.current();
  };

  // Cue until first card begins its enter ramp
  const showCue = !reduced && progress < INTRO;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="tesla-roadster-root relative w-full min-h-dvh overflow-hidden bg-[#f4f4f4] text-[#171a20] antialiased selection:bg-[#171a20]/10"
      data-roadster-hero
      data-roadster-drive="pin"
      data-product="MS-HERO-ROAD01"
    >
        {/* Studio-matched stage. High-key film stays clean. No tall spacer. */}
        <div className="relative h-[100dvh] w-full overflow-hidden bg-[#ececec]">
          {/* Looping film. Never scrubbed, never global-graded */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
          />

          {/*
            Chrome edges only. Protect header/rail.
            Mid-frame stays pure studio (no grey wash, no vignette).
          */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 sm:h-28"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 42%, transparent 100%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28 sm:h-32"
            style={{
              background:
                "linear-gradient(0deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.14) 48%, transparent 100%)",
            }}
            aria-hidden
          />

          {/* Top chrome. Dark type on bright studio (Tesla light UI) */}
          <header className="absolute left-0 right-0 top-0 z-40">
            <div className="mx-auto flex h-[3.75rem] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
              <div className="flex items-center gap-5">
                <span className="text-[14px] font-medium tracking-[0.48em] text-[#171a20]">
                  TESLA
                </span>
                <span
                  className="hidden h-3.5 w-px bg-[#171a20]/15 sm:block"
                  aria-hidden
                />
                <span className="hidden text-[11px] font-medium tracking-[0.22em] text-[#171a20]/45 sm:inline">
                  ROADSTER
                </span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <a
                  href="#reserve"
                  onClick={onReserve}
                  className="hidden text-[12px] font-medium tracking-wide text-[#171a20]/55 transition hover:text-[#171a20] sm:inline"
                >
                  Learn More
                </a>
                <a
                  href="#reserve"
                  onClick={onReserve}
                  className="rounded-sm bg-[#171a20] px-5 py-2 text-[12px] font-medium tracking-wide text-white transition hover:bg-black"
                >
                  Reserve Now
                </a>
              </div>
            </div>
            {/* Story progress. Ink to Tesla red tip */}
            <div className="h-[2px] w-full bg-[#171a20]/[0.08]">
              <div
                ref={barRef}
                className="h-full origin-left bg-gradient-to-r from-[#171a20] via-[#3a3a3a] to-[#e31937]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </header>

          {/* Narrative layers. Local white lift only (see TypeLift) */}
          <div className="pointer-events-none absolute inset-0 z-30">
            {PANELS.map((panel, i) => (
              <div
                key={panel.id}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className={panelShellClass(panel)}
                style={{
                  opacity: 0,
                  visibility: "hidden",
                  transform: "translate3d(0, 28px, 0)",
                }}
              >
                {panel.kind === "hero" && <HeroPanel panel={panel} />}
                {panel.kind === "specs" && <SpecsPanel panel={panel} />}
                {panel.kind === "feature" && <FeaturePanel panel={panel} />}
                {panel.kind === "close" && (
                  <ClosePanel panel={panel} onReserve={onReserve} />
                )}
              </div>
            ))}
          </div>

          {/* Bottom rail. Fades as specs sheet rises */}
          <div
            ref={railRef}
            className="absolute bottom-0 left-0 right-0 z-40 px-5 pb-6 sm:px-8 sm:pb-8 lg:px-12"
          >
            <div className="mx-auto flex max-w-[1440px] items-end justify-between gap-6">
              <div className="min-w-0">
                <p className="text-[11px] font-medium tracking-[0.28em] text-[#171a20]/40">
                  TESLA ROADSTER
                </p>
                <p className="mt-1.5 text-[13px] font-normal tracking-wide text-[#171a20]/70 sm:text-[14px]">
                  1.9 s · +250 mph · 620 mi
                </p>
              </div>
              <div className="hidden items-center gap-1.5 sm:flex" aria-hidden>
                {PANELS.map((p) => {
                  const v = panelVisibility(progress, p);
                  return (
                    <span
                      key={p.id}
                      className="h-[3px] rounded-full transition-[width,background] duration-300"
                      style={{
                        width: v > 0.35 ? 28 : 8,
                        background:
                          v > 0.35
                            ? "linear-gradient(90deg,#171a20,#e31937)"
                            : "rgba(23,26,32,0.18)",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {showCue && (
            <div className="pointer-events-none absolute bottom-[4.75rem] left-1/2 z-40 flex -translate-x-1/2 flex-col items-center gap-2.5 sm:bottom-24">
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#171a20]/40">
                Scroll
              </span>
              <span className="h-10 w-px bg-gradient-to-b from-[#171a20]/45 to-transparent" />
            </div>
          )}

          {reduced && (
            <div className="absolute bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-sm border border-[#171a20]/12 bg-white/70 px-4 py-2 text-[11px] tracking-wide text-[#171a20]/55 backdrop-blur-sm">
              Motion reduced
            </div>
          )}

          {!ready && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#ececec]">
              <p className="text-[12px] font-medium uppercase tracking-[0.4em] text-[#171a20]/30">
                Roadster
              </p>
            </div>
          )}

          {/*
            Specs sheet: absolute on the pinned stage.
            Starts translateY(100%) below; last 1.3 virtual viewports dock it over the film.
          */}
          <RoadsterSpecsSheet
            ref={sheetRef}
            reduced={reduced}
            turntableActive={sheetActive}
            style={{ transform: "translate3d(0, 100%, 0)", pointerEvents: "none" }}
          />
        </div>
    </section>
  );
}

/** Tesla light-UI ink on bright studio */
const INK = "#171a20";
const HEAD_SHADOW =
  "0 1px 0 rgba(255,255,255,0.95), 0 0 28px rgba(255,255,255,0.75), 0 0 56px rgba(255,255,255,0.45)";

function panelShellClass(panel: Panel) {
  const base = "absolute will-change-[opacity,transform]";
  if (panel.kind === "hero" || panel.kind === "specs" || panel.kind === "close") {
    return [
      base,
      "left-1/2 top-[44%] w-[min(94vw,52rem)] -translate-x-1/2 -translate-y-1/2 text-center",
      "sm:top-[42%]",
    ].join(" ");
  }
  if (panel.side === "left") {
    return [
      base,
      "left-5 top-[36%] w-[min(90vw,26rem)] sm:left-10 lg:left-16 lg:top-[38%]",
    ].join(" ");
  }
  return [
    base,
    "right-5 top-[36%] w-[min(90vw,26rem)] text-right sm:right-10 lg:right-16 lg:top-[38%]",
  ].join(" ");
}

/**
 * Soft white lift under type only. Keeps film pure, fixes contrast
 * when headlines cross the red body or bright floor.
 */
function TypeLift({
  children,
  side = "center",
  size = "lg",
}: {
  children: ReactNode;
  side?: "left" | "right" | "center";
  size?: "lg" | "md";
}) {
  const pos =
    side === "left"
      ? "40% 50%"
      : side === "right"
        ? "60% 50%"
        : "50% 48%";
  const spread = size === "lg" ? "78% 70%" : "88% 78%";

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[18%] sm:-inset-[22%]"
        style={{
          background: `radial-gradient(ellipse ${spread} at ${pos}, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.48) 38%, rgba(255,255,255,0.12) 62%, transparent 76%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function HeroPanel({
  panel,
}: {
  panel: Extract<Panel, { kind: "hero" }>;
}) {
  return (
    <TypeLift size="lg">
      <p
        className="mb-4 text-[11px] font-medium uppercase tracking-[0.42em] sm:mb-5 sm:text-[12px]"
        style={{ color: "rgba(23,26,32,0.42)" }}
      >
        {panel.kicker}
      </p>
      <h1
        className="font-medium"
        style={{
          color: INK,
          fontSize: "clamp(3.75rem, 14vw, 8.5rem)",
          lineHeight: 0.9,
          letterSpacing: "-0.045em",
          fontWeight: 500,
          textShadow: HEAD_SHADOW,
        }}
      >
        {panel.title}
      </h1>
      <p
        className="mx-auto mt-5 max-w-lg sm:mt-6"
        style={{
          color: "rgba(23,26,32,0.62)",
          fontSize: "clamp(1.05rem, 2.4vw, 1.5rem)",
          lineHeight: 1.25,
          letterSpacing: "-0.015em",
          fontWeight: 400,
          textShadow: "0 0 24px rgba(255,255,255,0.9)",
        }}
      >
        {panel.sub}
      </p>
    </TypeLift>
  );
}

function SpecsPanel({
  panel,
}: {
  panel: Extract<Panel, { kind: "specs" }>;
}) {
  return (
    <TypeLift size="lg">
      <p
        className="mb-8 text-[11px] font-medium uppercase tracking-[0.42em] sm:mb-10 sm:text-[12px]"
        style={{ color: "rgba(23,26,32,0.4)" }}
      >
        {panel.kicker}
      </p>
      <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-8 sm:gap-x-14 md:gap-x-20">
        {panel.specs.map((s) => (
          <div key={s.label} className="min-w-[5.5rem] text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span
                className="font-medium tabular-nums"
                style={{
                  color: INK,
                  fontSize: "clamp(2.75rem, 7.5vw, 5rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  textShadow: HEAD_SHADOW,
                }}
              >
                {s.value}
              </span>
              {s.unit && (
                <span
                  className="font-medium"
                  style={{
                    color: "rgba(23,26,32,0.72)",
                    fontSize: "clamp(0.95rem, 2vw, 1.35rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.unit}
                </span>
              )}
            </div>
            <p
              className="mt-2.5 text-[11px] font-medium tracking-[0.12em] sm:text-[12px]"
              style={{ color: "rgba(23,26,32,0.42)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </TypeLift>
  );
}

function FeaturePanel({
  panel,
}: {
  panel: Extract<Panel, { kind: "feature" }>;
}) {
  const align =
    panel.side === "right" ? "items-end text-right" : "items-start text-left";
  const bodyAlign = panel.side === "right" ? "ml-auto" : "";

  return (
    <TypeLift side={panel.side} size="md">
      <div className={`flex flex-col ${align}`}>
        <p
          className="mb-3 text-[10px] font-medium uppercase tracking-[0.36em] sm:text-[11px]"
          style={{ color: "rgba(23,26,32,0.4)" }}
        >
          {panel.kicker}
        </p>
        <h2
          className="whitespace-pre-line font-medium"
          style={{
            color: INK,
            fontSize: "clamp(2.25rem, 5.5vw, 3.75rem)",
            lineHeight: 0.98,
            letterSpacing: "-0.035em",
            textShadow: HEAD_SHADOW,
          }}
        >
          {panel.title}
        </h2>
        <p
          className={`mt-4 max-w-sm ${bodyAlign}`}
          style={{
            color: "rgba(23,26,32,0.58)",
            fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
            lineHeight: 1.55,
            letterSpacing: "-0.005em",
            textShadow: "0 0 20px rgba(255,255,255,0.85)",
          }}
        >
          {panel.body}
        </p>
        {panel.stat && (
          <div
            className={`mt-7 flex w-full max-w-sm gap-2.5 border-t border-solid pt-5 ${
              panel.side === "right" ? "ml-auto flex-row-reverse" : ""
            }`}
            style={{ borderColor: "rgba(23,26,32,0.12)" }}
          >
            <div className="flex items-baseline gap-1">
              <span
                className="font-medium tabular-nums"
                style={{
                  color: INK,
                  fontSize: "clamp(1.75rem, 3vw, 2.35rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  textShadow: HEAD_SHADOW,
                }}
              >
                {panel.stat.value}
              </span>
              {panel.stat.unit && (
                <span
                  className="text-[13px] font-medium"
                  style={{ color: "rgba(23,26,32,0.65)" }}
                >
                  {panel.stat.unit}
                </span>
              )}
            </div>
            <span
              className="self-end pb-0.5 text-[10px] font-medium uppercase tracking-[0.14em]"
              style={{ color: "rgba(23,26,32,0.38)" }}
            >
              {panel.stat.label}
            </span>
          </div>
        )}
        {/* Design panel: keep the segment line after body (no stat text) */}
        {panel.rule && !panel.stat && (
          <div
            className={`mt-7 w-full max-w-sm border-t border-solid pt-5 ${
              panel.side === "right" ? "ml-auto" : ""
            }`}
            style={{ borderColor: "rgba(23,26,32,0.12)" }}
            aria-hidden
          />
        )}
      </div>
    </TypeLift>
  );
}

function ClosePanel({
  panel,
  onReserve,
}: {
  panel: Extract<Panel, { kind: "close" }>;
  onReserve: (e: { preventDefault: () => void }) => void;
}) {
  return (
    <TypeLift size="lg">
      <p
        className="mb-4 text-[11px] font-medium uppercase tracking-[0.42em] sm:text-[12px]"
        style={{ color: "rgba(23,26,32,0.4)" }}
      >
        {panel.kicker}
      </p>
      <h2
        className="font-medium"
        style={{
          color: INK,
          fontSize: "clamp(3.25rem, 11vw, 6.5rem)",
          lineHeight: 0.92,
          letterSpacing: "-0.04em",
          textShadow: HEAD_SHADOW,
        }}
      >
        {panel.title}
      </h2>
      <p
        className="mx-auto mt-5 max-w-md"
        style={{
          color: "rgba(23,26,32,0.6)",
          fontSize: "clamp(1rem, 2vw, 1.3rem)",
          lineHeight: 1.3,
          letterSpacing: "-0.01em",
          textShadow: "0 0 24px rgba(255,255,255,0.9)",
        }}
      >
        {panel.sub}
      </p>
      <div className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#reserve"
          onClick={onReserve}
          className="inline-flex min-w-[9.5rem] items-center justify-center rounded-sm px-7 py-2.5 text-[12px] font-medium tracking-wide text-white transition hover:bg-black"
          style={{ backgroundColor: INK }}
        >
          Reserve Now
        </a>
        <a
          href="#reserve"
          onClick={onReserve}
          className="inline-flex min-w-[9.5rem] items-center justify-center rounded-sm border bg-white/50 px-7 py-2.5 text-[12px] font-medium tracking-wide transition hover:bg-white/80"
          style={{
            color: INK,
            borderColor: "rgba(23,26,32,0.22)",
          }}
        >
          Learn More
        </a>
      </div>
    </TypeLift>
  );
}
