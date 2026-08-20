"use client";

/**
 * PRISM - Creative identity studio hero (MS-HERO-PRSM01)
 *
 * Dual process: PSAVE + No Scroller (pin-until-complete).
 * Faces film center stage; Aether liquid-glass panels float on both sides.
 * Art, panels, tiers, and the atelier band stay. The 520vh sticky
 * GSAP ScrollTrigger seek-scrub is gone.
 *
 * PSAVE - Perfect Scroll Video Engine:
 *   Scroll aims a destination on a 12-viewport track (47.63s even faces film).
 *   Down-scroll plays the film forward (native play at 1.2x, leftover dest
 *   + rate ease on lift). Up-scroll walks the live video backward one
 *   3-frame step at a time. Never seek to the stop point.
 *   Glass panels, moment pill, and the violet bar follow the picture.
 *   Release only when the picture has arrived at 0 (up) or 1 (down).
 */

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type CSSProperties,
  type ReactNode,
} from "react";

export const VIDEO_SRC = "/assets/videos/prism-faces-v1.mp4";
export const POSTER_SRC = "/assets/posters/prism-faces-v1.webp";

/**
 * 47.63s even multi-face film, three acts (Atelier / Proof / Invite).
 * Two flicks on 3.6 dump dest into watching a video. Starting earn is
 * Revel/Still-class 12. Operator locks feel. Family leftovers stay.
 */
const VIRTUAL_VIEWPORTS = 12;

const PSAVE_RATE = 1.2;
const PSAVE_FRAME = 1 / 24;
const PSAVE_REV_STRIDE = 3;
const PSAVE_REV_STEP = PSAVE_FRAME * PSAVE_REV_STRIDE;
const PSAVE_LIVE_MS = 280;
const PSAVE_COAST_SEC = 0.55;
const PSAVE_EASE_SEC = 0.55;
const PSAVE_FLIP_DEADZONE_PX = 32;

type PanelKind = "feature" | "stat" | "quote" | "chip" | "profile" | "cta" | "metric";

type GlassPanelDef = {
  id: string;
  kind: PanelKind;
  range: [number, number];
  side: "left" | "right";
  top: number;
  inset: number;
  width: number;
  height?: number;
  fade?: number;
  /** Aether liquid tiers: silk (soft chip) | ice (standard) | mercury (deep refraction) */
  tier: "silk" | "ice" | "mercury";
  eyebrow?: string;
  title?: string;
  body?: string;
  metric?: string;
  metricLabel?: string;
  cta?: string;
  tag?: string;
  name?: string;
  role?: string;
};

/**
 * Studio-facing copy only. Show PRISM as a real creative identity studio.
 * No product meta, no "chapter scaffold", no implementation language.
 */
const PANELS: GlassPanelDef[] = [
  // ── Opening: studio presence ───────────────────────────────────────
  {
    id: "chip-live",
    kind: "chip",
    range: [0.02, 0.3],
    side: "left",
    top: 17,
    inset: 2.2,
    width: 168,
    tier: "silk",
    tag: "Now booking",
  },
  {
    id: "metric-brands",
    kind: "metric",
    range: [0.04, 0.32],
    side: "right",
    top: 15,
    inset: 2.4,
    width: 152,
    tier: "silk",
    metric: "48",
    metricLabel: "Brands shaped",
  },
  {
    id: "feature-open",
    kind: "feature",
    range: [0.0, 0.34],
    side: "left",
    top: 34,
    inset: 1.6,
    width: 318,
    height: 208,
    tier: "mercury",
    eyebrow: "Identity studio",
    title: "Your brand has more than one face.",
    body: "We design systems that hold every expression of you - campaign, product, and culture - without losing the core.",
  },
  {
    id: "stat-cities",
    kind: "stat",
    range: [0.08, 0.36],
    side: "right",
    top: 40,
    inset: 2.2,
    width: 196,
    height: 128,
    tier: "ice",
    metric: "12",
    metricLabel: "Cities",
    body: "Global campaign launches",
  },

  // ── Mid: team + proof ──────────────────────────────────────────────
  {
    id: "quote-client",
    kind: "quote",
    range: [0.28, 0.58],
    side: "right",
    top: 18,
    inset: 1.8,
    width: 300,
    height: 170,
    tier: "mercury",
    title: "They saw every side of us.",
    body: "Prism built a visual language our audience finally recognized as whole - fierce, soft, and unmistakably ours.",
  },
  {
    id: "profile-iris",
    kind: "profile",
    range: [0.3, 0.58],
    side: "left",
    top: 16,
    inset: 2,
    width: 262,
    height: 118,
    tier: "ice",
    name: "Iris Vale",
    role: "Creative Director",
    tag: "Prism Atelier",
  },
  {
    id: "chip-drop",
    kind: "chip",
    range: [0.34, 0.62],
    side: "left",
    top: 60,
    inset: 2.8,
    width: 158,
    tier: "silk",
    tag: "Spring drop live",
  },
  {
    id: "chip-awards",
    kind: "chip",
    range: [0.36, 0.64],
    side: "right",
    top: 56,
    inset: 3,
    width: 148,
    tier: "silk",
    tag: "Awwwards jury",
  },
  {
    id: "stat-retention",
    kind: "stat",
    range: [0.4, 0.64],
    side: "left",
    top: 72,
    inset: 2,
    width: 188,
    height: 110,
    tier: "ice",
    metric: "94%",
    metricLabel: "Client return",
    body: "Year-over-year retainers",
  },
  {
    id: "feature-mid",
    kind: "feature",
    range: [0.42, 0.68],
    side: "right",
    top: 66,
    inset: 1.8,
    width: 292,
    height: 172,
    tier: "mercury",
    eyebrow: "What we ship",
    title: "Systems, not one-offs.",
    body: "Brand films, digital experiences, and identity kits built to scale from first look to global rollout.",
  },

  // ── Close: invitation ──────────────────────────────────────────────
  {
    id: "metric-years",
    kind: "metric",
    range: [0.64, 0.94],
    side: "left",
    top: 15,
    inset: 2.2,
    width: 148,
    tier: "silk",
    metric: "9",
    metricLabel: "Years open",
  },
  {
    id: "feature-close",
    kind: "feature",
    range: [0.66, 1.01],
    side: "left",
    top: 32,
    inset: 1.5,
    width: 308,
    height: 196,
    tier: "mercury",
    eyebrow: "Next season",
    title: "Bring your story into the light.",
    body: "Limited studio slots for brands ready to show every face of who they are - with clarity and courage.",
  },
  {
    id: "quote-close",
    kind: "quote",
    range: [0.64, 0.96],
    side: "right",
    top: 16,
    inset: 2,
    width: 280,
    height: 148,
    tier: "ice",
    title: "Quiet confidence.",
    body: "The work does not shout. It holds the room - and invites people closer.",
  },
  {
    id: "cta-book",
    kind: "cta",
    range: [0.7, 1.01],
    side: "right",
    top: 54,
    inset: 1.8,
    width: 268,
    height: 176,
    tier: "mercury",
    eyebrow: "Start a project",
    title: "Book a studio intro",
    body: "Thirty minutes. Your brief. Our eyes on the work.",
    cta: "Request a slot",
  },
  {
    id: "chip-nyc",
    kind: "chip",
    range: [0.76, 1.01],
    side: "left",
    top: 76,
    inset: 2.5,
    width: 154,
    tier: "silk",
    tag: "NYC · remote",
  },
  {
    id: "stat-weeks",
    kind: "stat",
    range: [0.78, 1.01],
    side: "right",
    top: 80,
    inset: 3,
    width: 176,
    height: 96,
    tier: "silk",
    metric: "6 wk",
    metricLabel: "Avg. kickoff",
    body: "From brief to first film",
  },
];

function panelOpacity(progress: number, range: [number, number], fade = 0.045): number {
  const [a, b] = range;
  if (progress < a - fade || progress > b + fade) return 0;
  if (progress < a) return Math.max(0, (progress - (a - fade)) / fade);
  if (progress > b) return Math.max(0, 1 - (progress - b) / fade);
  return 1;
}

function panelTranslate(
  progress: number,
  range: [number, number],
  side: "left" | "right",
  fade = 0.045
): string {
  const o = panelOpacity(progress, range, fade);
  if (o >= 0.999) return "translate3d(0,0,0)";
  const dir = side === "left" ? -1 : 1;
  return `translate3d(${(1 - o) * 36 * dir}px, ${(1 - o) * 10}px, 0)`;
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function wheelDeltaPx(e: WheelEvent) {
  let y = e.deltaY;
  if (!Number.isFinite(y) || y === 0) return 0;
  if (e.deltaMode === 1) y *= 16;
  else if (e.deltaMode === 2) {
    y *= typeof window !== "undefined" ? window.innerHeight || 800 : 800;
  }
  return y;
}

type ScrollNarrativeApi = {
  setProgress: (p: number) => void;
  getProgress: () => number;
  getTarget: () => number;
  productId: string;
};

function momentFromProgress(progress: number) {
  if (progress < 0.34) return "Atelier";
  if (progress < 0.66) return "Proof";
  return "Invite";
}

/**
 * Aether liquid-glass shell (AGENT.md / generateLiquidGlass).
 * Host isolation + ::before tint/inner rim + ::after frost blur + SVG distortion.
 * Content sits above with white type + soft text-shadow.
 */
function LiquidGlass({
  tier,
  children,
  className = "",
  style,
  interactive,
}: {
  tier: "silk" | "ice" | "mercury";
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  interactive?: boolean;
}) {
  return (
    <div
      className={`liquid-glass-card liquid-glass--${tier} ${className}`}
      style={style}
      data-interactive={interactive ? "true" : undefined}
    >
      {/* Dedicated FX layer (more reliable than only ::after in some engines) */}
      <div className="liquid-glass-fx" aria-hidden />
      {/* Glassmorphism dual reflections for morphic 3D rim */}
      <div className="liquid-glass-reflect-a" aria-hidden />
      <div className="liquid-glass-reflect-b" aria-hidden />
      <div className="liquid-glass-content">{children}</div>
    </div>
  );
}

function PanelBody(p: GlassPanelDef) {
  switch (p.kind) {
    case "chip":
      return (
        <div className="flex h-full items-center gap-2.5 px-3.5 py-2.5">
          <span className="prism-dot" aria-hidden />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
            {p.tag}
          </span>
        </div>
      );
    case "metric":
      return (
        <div className="flex h-full flex-col justify-center px-4 py-3">
          <span
            className="text-[1.7rem] font-semibold leading-none tracking-tight text-white"
            style={{ fontFamily: "var(--font-prism-display), system-ui, sans-serif" }}
          >
            {p.metric}
          </span>
          <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
            {p.metricLabel}
          </span>
        </div>
      );
    case "stat":
      return (
        <div className="flex h-full flex-col justify-between p-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/75">
            {p.metricLabel}
          </span>
          <span
            className="text-[2.2rem] font-semibold leading-none text-white"
            style={{ fontFamily: "var(--font-prism-display), system-ui, sans-serif" }}
          >
            {p.metric}
          </span>
          {p.body && (
            <span className="text-[12px] leading-snug text-white/70">{p.body}</span>
          )}
        </div>
      );
    case "profile":
      return (
        <div className="flex h-full items-center gap-3.5 p-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-sky-400/80 bg-white/10">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="text-sky-300"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-white">{p.name}</p>
            <p className="truncate text-[12px] text-white/65">{p.role}</p>
            {p.tag && (
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-violet-200/90">
                {p.tag}
              </p>
            )}
          </div>
        </div>
      );
    case "quote":
      return (
        <div className="flex h-full flex-col justify-between p-5">
          <span className="text-[26px] leading-none text-white/30" aria-hidden>
            “
          </span>
          <div>
            <h3
              className="text-[16px] font-semibold leading-snug tracking-tight text-white"
              style={{ fontFamily: "var(--font-prism-display), system-ui, sans-serif" }}
            >
              {p.title}
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/75">{p.body}</p>
          </div>
        </div>
      );
    case "feature":
      return (
        <div className="flex h-full flex-col justify-between p-5">
          {p.eyebrow && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-200">
              {p.eyebrow}
            </p>
          )}
          <div className="mt-auto">
            <h3
              className="text-[clamp(1.12rem,1.35vw,1.32rem)] font-semibold leading-[1.15] tracking-tight text-white"
              style={{ fontFamily: "var(--font-prism-display), system-ui, sans-serif" }}
            >
              {p.title}
            </h3>
            <p className="mt-2.5 text-[13px] leading-relaxed text-white/75">{p.body}</p>
          </div>
        </div>
      );
    case "cta":
      return (
        <div className="flex h-full flex-col justify-between p-5">
          {p.eyebrow && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200">
              {p.eyebrow}
            </p>
          )}
          <div>
            <h3
              className="text-[1.22rem] font-semibold tracking-tight text-white"
              style={{ fontFamily: "var(--font-prism-display), system-ui, sans-serif" }}
            >
              {p.title}
            </h3>
            <p className="mt-2 text-[13px] text-white/75">{p.body}</p>
          </div>
          <button
            type="button"
            className="glass-button mt-3 w-full"
            onClick={(e) => e.preventDefault()}
          >
            {p.cta ?? "Continue"}
          </button>
        </div>
      );
    default:
      return null;
  }
}

export default function PrismLiquidGlass() {
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const touchYRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const progressRef = useRef(0);

  const paintPlayheadUi = useCallback((p: number) => {
    const clamped = clamp01(p);
    progressRef.current = clamped;
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${clamped})`;
    }
    const root = pinRef.current?.parentElement;
    if (root instanceof HTMLElement) {
      root.dataset.prismPlayhead = clamped.toFixed(3);
      root.dataset.prismTarget = targetProgressRef.current.toFixed(3);
    }
    setProgress((prev) => (Math.abs(prev - clamped) > 0.0008 ? clamped : prev));
  }, []);

  const snapPlayhead = useCallback((p: number) => {
    const clamped = clamp01(p);
    targetProgressRef.current = clamped;
    const video = videoRef.current;
    if (video && video.duration && Number.isFinite(video.duration)) {
      video.pause();
      try {
        video.currentTime = clamped * video.duration;
      } catch {
        /* seek race before metadata */
      }
    }
    progressRef.current = clamped;
    setProgress(clamped);
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${clamped})`;
    }
  }, []);

  const setTargetProgress = useCallback(
    (next: number, immediate = false) => {
      const clamped = clamp01(next);
      targetProgressRef.current = clamped;
      if (immediate) snapPlayhead(clamped);
    },
    [snapPlayhead]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let settled = false;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;
    let onSeeked: (() => void) | null = null;

    const cleanupSeek = () => {
      if (onSeeked) {
        video.removeEventListener("seeked", onSeeked);
        onSeeked = null;
      }
      if (safetyTimer != null) {
        clearTimeout(safetyTimer);
        safetyTimer = null;
      }
    };

    const markReady = () => {
      if (cancelled || settled) return;
      settled = true;
      cleanupSeek();
      video.pause();
      setReady(true);
    };

    const paintStartFrame = () => {
      if (cancelled || settled) return;
      video.pause();
      cleanupSeek();
      const target = 0;
      let kicked = false;
      onSeeked = () => {
        if (cancelled || settled) return;
        if (!kicked) {
          kicked = true;
          try {
            video.currentTime = target;
          } catch {
            markReady();
          }
          return;
        }
        markReady();
      };
      video.addEventListener("seeked", onSeeked);
      try {
        video.currentTime = target + 0.04;
      } catch {
        markReady();
        return;
      }
      safetyTimer = setTimeout(() => {
        if (cancelled) return;
        try {
          if (Math.abs(video.currentTime - target) > 0.02) {
            video.currentTime = target;
          }
        } catch {
          /* ignore */
        }
        if (video.readyState >= 2) markReady();
      }, 800);
    };

    const onMeta = () => paintStartFrame();
    const onLoadedData = () => paintStartFrame();

    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("loadeddata", onLoadedData);

    return () => {
      cancelled = true;
      cleanupSeek();
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("loadeddata", onLoadedData);
    };
  }, []);

  useEffect(() => {
    if (reduced) return;
    const api: ScrollNarrativeApi = {
      setProgress: (p: number) => setTargetProgress(p, true),
      getProgress: () => progressRef.current,
      getTarget: () => targetProgressRef.current,
      productId: "MS-HERO-PRSM01",
    };
    const w = window as Window & {
      __msScrollNarrative?: ScrollNarrativeApi;
    };
    w.__msScrollNarrative = api;
    return () => {
      if (w.__msScrollNarrative === api) delete w.__msScrollNarrative;
    };
  }, [reduced, setTargetProgress]);

  /**
   * Dual process: No Scroller pin + PSAVE chase.
   * Gestures aim on 12 vh. Film plays. Page does not physically scroll.
   */
  useEffect(() => {
    if (!ready || reduced) return;
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!pin || !video) return;

    video.pause();
    video.loop = false;
    snapPlayhead(0);

    const rootEl = pin.parentElement;
    const setDir = (dir: "fwd" | "rev" | "idle") => {
      if (rootEl) rootEl.dataset.prismDir = dir;
    };
    setDir("idle");

    const virtualDistance = () => {
      const vh = window.innerHeight || 800;
      return VIRTUAL_VIEWPORTS * vh;
    };

    const sectionInView = () => {
      const r = pin.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      return r.top < mid && r.bottom > mid * 0.35;
    };

    const pinDocked = () => pin.getBoundingClientRect().top >= -2;

    let pageOwns = false;

    const eventOnPin = (e: Event) => {
      if (e.target instanceof Node && pin.contains(e.target)) return true;
      if (e instanceof WheelEvent) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el && pin.contains(el)) return true;
      }
      return false;
    };

    const touchOnPin = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0];
      if (!t) return false;
      if (e.target instanceof Node && pin.contains(e.target)) return true;
      const el = document.elementFromPoint(t.clientX, t.clientY);
      return Boolean(el && pin.contains(el));
    };

    let lastUpAt = 0;
    let lastDownAt = 0;
    let lastIntentSign = 0;
    let coastApplied = false;
    let revHead = 0;
    let revArmed = false;
    let revAcc = 0;
    let revBusy = false;
    let revClear: (() => void) | null = null;
    let revSafety: ReturnType<typeof setTimeout> | null = null;

    const clearRevWait = () => {
      if (revClear) {
        video.removeEventListener("seeked", revClear);
        revClear = null;
      }
      if (revSafety != null) {
        clearTimeout(revSafety);
        revSafety = null;
      }
      revBusy = false;
    };

    const markIntent = (deltaPx: number) => {
      const now = performance.now();
      if (deltaPx < 0) lastUpAt = now;
      if (deltaPx > 0) lastDownAt = now;
      lastIntentSign = deltaPx > 0 ? 1 : -1;
      coastApplied = false;
    };

    const pictureAtStart = () => {
      if (progressRef.current <= 0.0005) return true;
      const d = video.duration;
      return Boolean(d && Number.isFinite(d) && video.currentTime <= 0.04);
    };
    const pictureAtEnd = () => {
      if (progressRef.current >= 0.9995) return true;
      const d = video.duration;
      return Boolean(d && Number.isFinite(d) && video.currentTime >= d - 0.08);
    };

    const applyDelta = (deltaPx: number) => {
      if (!deltaPx || !Number.isFinite(deltaPx)) return false;
      const playhead = progressRef.current;
      let target = targetProgressRef.current;
      if (pictureAtStart() && deltaPx < 0) return false;
      if (pictureAtEnd() && deltaPx > 0) return false;
      if (target <= 0.0005 && deltaPx < 0) return true;
      if (target >= 0.9995 && deltaPx > 0) return true;

      const thisSign = deltaPx > 0 ? 1 : -1;
      const now = performance.now();
      const lastAt = Math.max(lastUpAt, lastDownAt);
      const flipIsBounce =
        lastIntentSign !== 0 &&
        thisSign !== lastIntentSign &&
        Math.abs(deltaPx) < PSAVE_FLIP_DEADZONE_PX &&
        now - lastAt < PSAVE_LIVE_MS + 120;
      if (flipIsBounce) return true;

      markIntent(deltaPx);
      if (deltaPx < 0 && target > playhead) target = playhead;
      if (deltaPx > 0 && target < playhead) target = playhead;
      targetProgressRef.current = clamp01(target + deltaPx / virtualDistance());
      if (rootEl) {
        rootEl.dataset.prismTarget = targetProgressRef.current.toFixed(3);
        rootEl.dataset.prismDir = deltaPx > 0 ? "fwd" : "rev";
      }
      return true;
    };

    let wheelPending = 0;
    let wheelRaf = 0;
    let chaseRaf = 0;
    let lastTs = 0;

    const flushWheel = () => {
      wheelRaf = 0;
      const pending = wheelPending;
      wheelPending = 0;
      if (pending) applyDelta(pending);
    };

    const onEnded = () => {
      video.pause();
      video.loop = false;
      if (video.duration && Number.isFinite(video.duration)) {
        try {
          video.currentTime = Math.max(0, video.duration - 0.001);
        } catch {
          /* ignore */
        }
      }
      paintPlayheadUi(1);
    };

    const issueReverseStep = (targetT: number) => {
      if (revBusy) return false;
      const next = Math.max(targetT, revHead - PSAVE_REV_STEP);
      if (next >= revHead - 0.0005) return false;
      revHead = next;
      revBusy = true;
      if (!video.paused) video.pause();
      video.playbackRate = 1;
      revClear = () => {
        clearRevWait();
      };
      video.addEventListener("seeked", revClear);
      revSafety = setTimeout(() => {
        clearRevWait();
      }, 200);
      try {
        video.currentTime = revHead;
      } catch {
        clearRevWait();
        return false;
      }
      return true;
    };

    const chase = (ts: number) => {
      chaseRaf = requestAnimationFrame(chase);
      const duration = video.duration;
      if (!duration || !Number.isFinite(duration)) return;

      const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 1 / 60;
      lastTs = ts;

      const liveUp = ts - lastUpAt < PSAVE_LIVE_MS && lastUpAt >= lastDownAt;
      const liveDown = ts - lastDownAt < PSAVE_LIVE_MS && lastDownAt > lastUpAt;
      const settle = PSAVE_FRAME * 0.6;

      if (!liveUp && !liveDown && !coastApplied && lastIntentSign !== 0) {
        coastApplied = true;
        const playT = video.currentTime;
        const destT = targetProgressRef.current * duration;
        const atEnd = playT >= duration - 0.08 || progressRef.current >= 0.9995;
        const atStart = playT <= 0.04 || progressRef.current <= 0.0005;
        if (lastIntentSign > 0 && !atEnd && destT < playT + PSAVE_COAST_SEC) {
          targetProgressRef.current = clamp01(
            (playT + PSAVE_COAST_SEC) / duration
          );
        } else if (
          lastIntentSign < 0 &&
          !atStart &&
          destT > playT - PSAVE_COAST_SEC
        ) {
          targetProgressRef.current = clamp01(
            (playT - PSAVE_COAST_SEC) / duration
          );
        }
        if (rootEl) {
          rootEl.dataset.prismTarget = targetProgressRef.current.toFixed(3);
        }
      }

      const targetT = targetProgressRef.current * duration;

      if (liveUp) {
        if (!revArmed) {
          revHead = video.currentTime;
          revArmed = true;
          revAcc = PSAVE_REV_STEP;
        }
        if (!video.paused) video.pause();
        video.playbackRate = 1;
        setDir("rev");
        if (revHead > targetT + settle && !revBusy) {
          issueReverseStep(targetT);
        }
        paintPlayheadUi(clamp01(revHead / duration));
        return;
      }

      if (revArmed && revHead > targetT + settle) {
        setDir("rev");
        if (!video.paused) video.pause();
        video.playbackRate = 1;
        if (!revBusy) {
          revAcc += PSAVE_RATE * dt;
          if (revAcc >= PSAVE_REV_STEP) {
            revAcc -= PSAVE_REV_STEP;
            issueReverseStep(targetT);
          }
        }
        paintPlayheadUi(clamp01(revHead / duration));
        return;
      }

      if (revArmed && revHead <= targetT + settle) {
        revArmed = false;
        revAcc = 0;
        clearRevWait();
      }

      const cur = revArmed ? revHead : video.currentTime;
      const err = targetT - cur;

      if (Math.abs(err) <= settle) {
        if (!video.paused) video.pause();
        clearRevWait();
        revArmed = false;
        revAcc = 0;
        setDir("idle");
        const atFilmEnd = targetT >= duration - 0.08 || cur >= duration - 0.08;
        const atFilmStart = targetT <= 0.04 && cur <= 0.04;
        if (atFilmEnd) {
          try {
            video.currentTime = Math.max(0, duration - 0.001);
          } catch {
            /* ignore */
          }
          paintPlayheadUi(1);
        } else if (atFilmStart) {
          try {
            video.currentTime = 0;
          } catch {
            /* ignore */
          }
          paintPlayheadUi(0);
        } else {
          paintPlayheadUi(clamp01(cur / duration));
        }
        return;
      }

      if (err > 0 && !liveUp) {
        clearRevWait();
        revArmed = false;
        revAcc = 0;
        setDir("fwd");
        if (cur >= duration - 0.08) {
          if (!video.paused) video.pause();
          try {
            video.currentTime = duration - 0.001;
          } catch {
            /* ignore */
          }
          paintPlayheadUi(1);
          return;
        }
        if (liveDown || !liveUp) {
          const remain = Math.max(0, err);
          video.playbackRate =
            remain < PSAVE_EASE_SEC
              ? Math.max(0.42, PSAVE_RATE * (remain / PSAVE_EASE_SEC))
              : PSAVE_RATE;
          if (video.paused) {
            const attempt = video.play();
            if (attempt && typeof attempt.catch === "function") {
              attempt.catch(() => {
                try {
                  video.currentTime = Math.min(
                    duration - 0.001,
                    cur + Math.min(err, PSAVE_RATE * dt, PSAVE_FRAME)
                  );
                } catch {
                  /* ignore */
                }
              });
            }
          }
        }
        paintPlayheadUi(clamp01(video.currentTime / duration));
        return;
      }

      if (!video.paused) video.pause();
      video.playbackRate = 1;
      if (!revArmed) {
        revHead = video.currentTime;
        revArmed = true;
        revAcc = PSAVE_REV_STEP;
      }
      setDir("rev");
      if (!revBusy) issueReverseStep(targetT);
      paintPlayheadUi(clamp01(revHead / duration));
    };

    const onWheel = (e: WheelEvent) => {
      if (pinDocked()) pageOwns = false;
      if (pageOwns) return;
      if (!sectionInView()) return;
      if (!eventOnPin(e)) return;
      if (e.ctrlKey || e.metaKey) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaY) < 1) {
        return;
      }
      const raw = wheelDeltaPx(e);
      if (!raw) return;

      const releasing =
        (pictureAtStart() && raw < 0) || (pictureAtEnd() && raw > 0);
      if (releasing) {
        if (pictureAtEnd() && raw > 0) pageOwns = true;
        return;
      }

      const thisSign = raw > 0 ? 1 : -1;
      const now = performance.now();
      const lastAt = Math.max(lastUpAt, lastDownAt);
      const flipIsBounce =
        lastIntentSign !== 0 &&
        thisSign !== lastIntentSign &&
        Math.abs(raw) < PSAVE_FLIP_DEADZONE_PX &&
        now - lastAt < PSAVE_LIVE_MS + 120;
      if (!flipIsBounce) {
        wheelPending += raw;
        if (!wheelRaf) wheelRaf = requestAnimationFrame(flushWheel);
      }
      e.preventDefault();
      e.stopPropagation();
    };

    const onTouchStart = (e: TouchEvent) => {
      if (pinDocked()) pageOwns = false;
      if (pageOwns || !sectionInView() || e.touches.length !== 1) return;
      if (!touchOnPin(e)) return;
      touchYRef.current = e.touches[0]!.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (pinDocked()) pageOwns = false;
      if (pageOwns || !sectionInView() || e.touches.length !== 1) return;
      if (!touchOnPin(e)) return;
      const y = e.touches[0]!.clientY;
      const prev = touchYRef.current;
      touchYRef.current = y;
      if (prev == null) return;
      const deltaY = prev - y;
      const consumed = applyDelta(deltaY);
      if (!consumed && pictureAtEnd() && deltaY > 0) pageOwns = true;
      if (consumed) e.preventDefault();
    };

    const onTouchEnd = () => {
      touchYRef.current = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (pinDocked()) pageOwns = false;
      if (pageOwns || !sectionInView()) return;
      const el = e.target as HTMLElement | null;
      if (
        el &&
        el.closest(
          "a, button, input, textarea, select, [contenteditable='true']"
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
      if (!consumed && pictureAtEnd() && delta > 0) pageOwns = true;
      if (consumed) e.preventDefault();
    };

    video.addEventListener("ended", onEnded);
    chaseRaf = requestAnimationFrame(chase);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      if (wheelRaf) cancelAnimationFrame(wheelRaf);
      if (chaseRaf) cancelAnimationFrame(chaseRaf);
      clearRevWait();
      video.removeEventListener("ended", onEnded);
      video.pause();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [ready, reduced, paintPlayheadUi, snapPlayhead]);

  useEffect(() => {
    if (!ready || !reduced) return;
    snapPlayhead(0.42);
  }, [ready, reduced, snapPlayhead]);

  const showScrollCue = !reduced && progress < 0.06;
  const momentLabel = momentFromProgress(progress);

  return (
    <div
      className="prism-root"
      style={{
        fontFamily: "var(--font-prism-sans), system-ui, sans-serif",
        background: "#E8EAEF",
      }}
      data-prism-drive="psave"
      data-prism-pin={reduced ? "false" : "true"}
    >
      {/* Aether SVG filter once. Ice Ripple baseFrequency/scale; seed 92 */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter
            id="glass-distortion"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.025 0.025"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="65"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          {/* Deeper refraction for mercury tier */}
          <filter
            id="glass-distortion-mercury"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.008"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="120"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div
        ref={pinRef}
        className="relative h-[100dvh] min-h-screen w-full overflow-hidden bg-[#E8EAEF]"
      >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
            aria-hidden
          />

          {/*
            Side atmosphere: richer color + depth under panels so liquid glass has something
            to refract (Aether demos use vivid gradients; pure gray kills the material).
          */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 46% 64% at 50% 48%, transparent 0%, transparent 38%, rgba(14,16,22,0.12) 72%, rgba(14,16,22,0.4) 100%),
                linear-gradient(180deg, rgba(14,16,22,0.55) 0%, transparent 18%, transparent 78%, rgba(14,16,22,0.5) 100%),
                linear-gradient(90deg,
                  rgba(40, 24, 72, 0.55) 0%,
                  rgba(20, 28, 56, 0.28) 14%,
                  transparent 28%,
                  transparent 72%,
                  rgba(20, 36, 64, 0.28) 86%,
                  rgba(28, 20, 64, 0.55) 100%
                )
              `,
            }}
          />

          {/* NAV */}
          <header className="absolute left-0 right-0 top-0 z-40">
            <div className="mx-auto flex h-[4.25rem] w-full max-w-[1480px] items-center justify-between px-5 sm:px-8 md:px-12 lg:px-14">
              <div className="flex items-center gap-3">
                <span
                  className="text-[15px] font-semibold tracking-[0.28em] text-white"
                  style={{
                    fontFamily: "var(--font-prism-display), system-ui, sans-serif",
                    textShadow: "0 1px 3px rgba(0,0,0,0.35)",
                  }}
                >
                  PRISM
                </span>
                <span className="hidden h-3 w-px bg-white/35 sm:block" />
                <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-white/75 sm:inline">
                  Identity studio
                </span>
              </div>

              <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
                {["Work", "Approach", "Atelier", "Journal"].map((item) => (
                  <a
                    key={item}
                    href="#atelier"
                    className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/75 transition hover:text-white"
                    style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
                    onClick={(e) => e.preventDefault()}
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <a
                href="#atelier"
                onClick={(e) => e.preventDefault()}
                className="liquid-glass-pill inline-flex items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
              >
                Book intro
                <span aria-hidden>→</span>
              </a>
            </div>
            <div className="h-px w-full bg-white/20">
              <div
                ref={progressBarRef}
                className="h-full origin-left bg-gradient-to-r from-[#A78BFA] via-[#F0ABFC] to-[#67E8F9]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </header>

          <div className="pointer-events-none absolute left-1/2 top-[5.25rem] z-30 -translate-x-1/2">
            <div className="liquid-glass-pill px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
              {momentLabel}
            </div>
          </div>

          {/* Multi-panel field */}
          <div className="absolute inset-0 z-20">
            {PANELS.map((panel) => {
              const fade = panel.fade ?? 0.045;
              const o = reduced
                ? panel.range[0] <= 0.42 && panel.range[1] >= 0.42
                  ? 1
                  : panelOpacity(0.42, panel.range, fade)
                : panelOpacity(progress, panel.range, fade);
              if (o < 0.02) return null;

              const style: CSSProperties = {
                position: "absolute",
                top: `${panel.top}%`,
                width: panel.width,
                height: panel.height,
                opacity: o,
                transform: reduced
                  ? "none"
                  : panelTranslate(progress, panel.range, panel.side, fade),
                willChange: "opacity, transform",
                pointerEvents: o > 0.5 ? "auto" : "none",
                ...(panel.side === "left"
                  ? { left: `${panel.inset}%` }
                  : { right: `${panel.inset}%` }),
              };

              return (
                <div key={panel.id} style={style} className="hidden sm:block">
                  <LiquidGlass
                    tier={panel.tier}
                    interactive={panel.kind === "cta"}
                    style={{
                      width: "100%",
                      height: panel.height ?? "auto",
                      minHeight:
                        panel.kind === "chip" || panel.kind === "metric"
                          ? 48
                          : undefined,
                    }}
                  >
                    <PanelBody {...panel} />
                  </LiquidGlass>
                </div>
              );
            })}

            <div className="absolute inset-x-0 bottom-0 z-20 p-4 pb-8 sm:hidden">
              <LiquidGlass tier="mercury" style={{ width: "100%" }}>
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200">
                    {momentLabel}
                  </p>
                  <h2
                    className="mt-2 text-[1.4rem] font-semibold leading-tight text-white"
                    style={{
                      fontFamily: "var(--font-prism-display), system-ui, sans-serif",
                    }}
                  >
                    {progress < 0.34
                      ? "Your brand has more than one face."
                      : progress < 0.66
                        ? "Systems, not one-offs."
                        : "Bring your story into the light."}
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/75">
                    Prism is an identity studio for brands ready to show every side of who they
                    are.
                  </p>
                </div>
              </LiquidGlass>
            </div>
          </div>

          {showScrollCue && (
            <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
              <span
                className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/75"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.35)" }}
              >
                Scroll to explore
              </span>
              <span className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
            </div>
          )}
      </div>

      <section
        id="atelier"
        className="relative border-t border-white/5 bg-[#0E1016] px-6 py-24 text-white sm:px-10"
      >
        <div className="mx-auto grid max-w-[1100px] gap-10 md:grid-cols-2 md:items-end">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#A78BFA]">
              Prism Atelier
            </p>
            <h2
              className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tight"
              style={{
                fontFamily: "var(--font-prism-display), system-ui, sans-serif",
              }}
            >
              Identity for brands
              <br />
              with many faces.
            </h2>
          </div>
          <div>
            <p className="text-[15px] leading-relaxed text-white/65">
              From first film to full system - we craft the visual language your audience will
              recognize in every room, market, and season. Based in New York. Working worldwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#atelier"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#0E1016] transition hover:bg-white/90"
              >
                Book a studio intro
              </a>
              <a
                href="#atelier"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md transition hover:bg-white/10"
              >
                View selected work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/*
        Aether liquid-glass CSS (generateLiquidGlass + Ice Ripple / Mercury / Silk presets).
        Host: isolation + outer glow shadow.
        ::before: tint + inset rim (alpha 0.7).
        ::after: frost blur + url(#glass-distortion), z-index -1.
        Content: white + text-shadow. Light-film adaptation: soft dark tint for AA contrast.
      */}
      <style jsx global>{`
        /* Aether Ice Ripple liquid-glass (near-clear tint, white type, refraction) */
        .liquid-glass-card {
          position: relative;
          border-radius: 28px;
          isolation: isolate;
          box-shadow: 0 0 28px -6px rgba(255, 255, 255, 0.38);
          cursor: default;
          transform: translateZ(0);
        }
        .liquid-glass-card[data-interactive="true"] {
          cursor: pointer;
        }
        /* Tint + inner rim (Aether ::before) */
        .liquid-glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          pointer-events: none;
          background-color: rgba(255, 255, 255, 0.04);
          box-shadow: inset 0 0 14px -2px rgba(255, 255, 255, 0.72);
        }
        /* FX layer = frost + distortion (must sit under content, z=0 not -1) */
        .liquid-glass-fx {
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          pointer-events: none;
          isolation: isolate;
          background: linear-gradient(
            165deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(20, 16, 40, 0.18) 48%,
            rgba(12, 18, 40, 0.22) 100%
          );
          backdrop-filter: blur(10px) saturate(160%);
          -webkit-backdrop-filter: blur(10px) saturate(160%);
          filter: url(#glass-distortion);
          -webkit-filter: url(#glass-distortion);
          box-shadow:
            inset 0 0 18px -2px rgba(255, 255, 255, 0.55),
            inset 0 1px 0 rgba(255, 255, 255, 0.45);
        }
        .liquid-glass-reflect-a {
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(
            to left top,
            rgba(255, 255, 255, 0.18) 0%,
            transparent 50%
          );
        }
        .liquid-glass-reflect-b {
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.12) 0%,
            transparent 40%
          );
        }
        .liquid-glass--silk {
          border-radius: 18px;
          box-shadow: 0 0 20px -6px rgba(255, 255, 255, 0.32);
        }
        .liquid-glass--silk .liquid-glass-fx {
          backdrop-filter: blur(14px) saturate(150%);
          -webkit-backdrop-filter: blur(14px) saturate(150%);
          background: linear-gradient(
            165deg,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(20, 16, 40, 0.16) 100%
          );
        }
        .liquid-glass--ice .liquid-glass-fx {
          backdrop-filter: blur(10px) saturate(165%);
          -webkit-backdrop-filter: blur(10px) saturate(165%);
        }
        .liquid-glass--mercury .liquid-glass-fx {
          backdrop-filter: blur(14px) saturate(180%);
          -webkit-backdrop-filter: blur(14px) saturate(180%);
          filter: url(#glass-distortion-mercury);
          -webkit-filter: url(#glass-distortion-mercury);
          background: linear-gradient(
            165deg,
            rgba(255, 255, 255, 0.12) 0%,
            rgba(24, 18, 48, 0.22) 55%,
            rgba(12, 20, 44, 0.26) 100%
          );
        }
        .liquid-glass-content {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          color: #fff;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
        }
        .prism-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(135deg, #c4b5fd, #67e8f9);
          box-shadow: 0 0 12px rgba(167, 139, 250, 0.85);
          flex-shrink: 0;
        }
        .glass-button {
          width: 100%;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.35);
          color: #fff;
          padding: 10px 16px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          box-shadow:
            0 4px 14px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.35);
          transition:
            background 0.2s ease,
            transform 0.15s ease;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
        }
        .glass-button:hover {
          background: rgba(255, 255, 255, 0.26);
        }
        .glass-button:active {
          transform: translateY(1px) scale(0.985);
        }
        .glass-button:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 3px;
        }
        .liquid-glass-pill {
          border-radius: 999px;
          isolation: isolate;
          position: relative;
          background: transparent;
          box-shadow:
            0 0 18px -6px rgba(255, 255, 255, 0.35),
            0 0 0 1px rgba(255, 255, 255, 0.22);
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }
        .liquid-glass-pill::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: 999px;
          background-color: rgba(8, 10, 18, 0.16);
          box-shadow: inset 0 0 10px -2px rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px) saturate(160%);
          -webkit-backdrop-filter: blur(12px) saturate(160%);
        }
        @media (prefers-reduced-transparency: reduce) {
          .liquid-glass-fx {
            filter: none !important;
            -webkit-filter: none !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            background: rgba(18, 20, 28, 0.9) !important;
            z-index: 0 !important;
          }
          .liquid-glass-card::before {
            background-color: rgba(18, 20, 28, 0.85) !important;
          }
          .liquid-glass-pill::before {
            backdrop-filter: none !important;
            background-color: rgba(18, 20, 28, 0.92) !important;
          }
        }
      `}</style>
    </div>
  );
}
