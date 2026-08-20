"use client";

/**
 * MIRAGE (MS-HERO-MIRA01) - agency desert glass hero.
 *
 * No Scroller (pin-until-complete). Not PSAVE: desert film free-plays
 * (muted loop). Scroll only aims the five left-rail glass cards.
 *
 * Wheel / trackpad / touch / keys aim virtual progress on
 * total * vhPerSheet viewports (7.75 desktop at five sheets).
 * Cards follow that progress 1:1. At 0+up or 1+down the pin
 * releases. After release at the end, the PAGE owns the wheel
 * until the stage docks (top >= -2). Pointer on the next sibling
 * never drives the cards.
 *
 * Glass: morphic dark liquid-glass stack.
 *   shell → glass layers (fill + specular) → body (content above blur)
 * Dark translucent fill + blur + saturate - NOT white frosted.
 *
 * Do not add PSAVE. Do not restore a tall multi-vh sticky track.
 */

import { useRef, useMemo, useState, useEffect, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

/* ── Content model ── */

export type MirageBlock =
  | { type: "metrics"; items: { label: string; value: string; note?: string }[] }
  | { type: "rows"; items: { label: string; value: string }[] }
  | { type: "list"; items: string[] }
  | { type: "chips"; items: string[] }
  | { type: "quote"; text: string; by: string };

export type MirageSheet = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  blocks: MirageBlock[];
};

const NAV = [
  { label: "Work", href: "#work" },
  { label: "Method", href: "#method" },
  { label: "Clients", href: "#clients" },
  { label: "Culture", href: "#culture" },
  { label: "Contact", href: "#contact" },
] as const;

const DEFAULT_SHEETS: MirageSheet[] = [
  {
    id: "thesis",
    index: "01",
    eyebrow: "Brand thesis",
    title: "Find the idea that outlasts the feed.",
    lead: "We pressure-test positioning until only one truth remains, then every surface tells it.",
    blocks: [
      {
        type: "metrics",
        items: [
          { label: "Brand systems", value: "40+", note: "Live" },
          { label: "Avg. tenure", value: "3.2y", note: "Clients" },
          { label: "Launch score", value: "94", note: "Clarity" },
        ],
      },
      {
        type: "chips",
        items: ["Positioning", "Narrative", "Identity system"],
      },
    ],
  },
  {
    id: "craft",
    index: "02",
    eyebrow: "Creative systems",
    title: "Campaigns built like products, not one-offs.",
    lead: "Modular assets, locked craft rules, and a single visual language that scales from film to footfall.",
    blocks: [
      {
        type: "rows",
        items: [
          {
            label: "Format lattice",
            value: "16:9 · 9:16 · 1:1 · OOH · ambient",
          },
          {
            label: "Craft bar",
            value: "Director-grade stills + motion packs",
          },
          {
            label: "Versioning",
            value: "One source of truth, infinite cuts",
          },
        ],
      },
      {
        type: "list",
        items: [
          "Hero film + cutdowns shipped as one system.",
          "Social, DOOH, and retail share the same light grammar.",
        ],
      },
    ],
  },
  {
    id: "media",
    index: "03",
    eyebrow: "Media craft",
    title: "Put every dollar where attention is honest.",
    lead: "Channel rules live next to the creative, so media and craft never drift apart mid-flight.",
    blocks: [
      {
        type: "metrics",
        items: [
          { label: "Wasted spend", value: "−31%", note: "YoY" },
          { label: "Reach quality", value: "2.4×", note: "ICP" },
          { label: "Payback", value: "≤90d", note: "Median" },
        ],
      },
      {
        type: "chips",
        items: ["Paid social", "CTV", "Culture media"],
      },
    ],
  },
  {
    id: "content",
    index: "04",
    eyebrow: "Always-on",
    title: "A studio cadence, not a campaign panic.",
    lead: "Editorial calendars, talent pipelines, and production sprints that keep the brand present without burning the team.",
    blocks: [
      {
        type: "rows",
        items: [
          { label: "Sprint rhythm", value: "Bi-weekly ship · monthly film" },
          { label: "Asset bank", value: "1,200+ modular units" },
          { label: "Approval SLA", value: "48h creative · 24h media" },
        ],
      },
      {
        type: "quote",
        text: "They made our brand feel inevitable. Quiet, expensive, everywhere.",
        by: "CMO, global beauty house",
      },
    ],
  },
  {
    id: "proof",
    index: "05",
    eyebrow: "Growth proof",
    title: "Outcomes the board can audit.",
    lead: "Brand lift, pipeline, and efficiency reported as one story, not three decks fighting each other.",
    blocks: [
      {
        type: "metrics",
        items: [
          { label: "Brand lift", value: "+18pts", note: "Aided" },
          { label: "Pipeline", value: "$42M", note: "Attributed" },
          { label: "CPA", value: "−27%", note: "Blended" },
          { label: "NPS brand", value: "71", note: "Tracked" },
        ],
      },
      {
        type: "chips",
        items: ["Measurement", "Incrementality", "Board ready"],
      },
    ],
  },
];

const MAX_SHEETS = 5;
/** Locked client HD (buyer pack). Storefront previews are separate captures. */
const BG_SRC = "/assets/videos/mirage-desert-v1.mp4";

function clamp01(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

/* ── Journey progress → local sheet progress (rotateX / opacity / scale maps) ── */

function useLocalProgress(
  scrollYProgress: MotionValue<number>,
  index: number,
  total: number
) {
  const span = 1 / total;
  const pad = span * 0.16;
  const start = Math.max(0, index * span - pad);
  const end = Math.min(1, (index + 1) * span + pad);
  // Sheet 0 starts near face-on so the hero never opens on an empty rail
  const from = index === 0 ? 0.38 : 0;
  return useTransform(scrollYProgress, [start, end], [from, 1], {
    clamp: true,
    ease: (t: number) => t * t * (3 - 2 * t),
  });
}

function useSheetMotion(local: MotionValue<number>, isLast: boolean) {
  const rotateX = useTransform(
    local,
    isLast
      ? [0, 0.1, 0.22, 0.38, 0.55, 0.75, 0.88, 0.96, 1]
      : [0, 0.1, 0.22, 0.38, 0.5, 0.68, 0.82, 0.92, 1],
    isLast
      ? [64, 42, 22, 8, 0, 0, -14, -36, -64]
      : [64, 42, 22, 8, 0, -8, -24, -42, -64]
  );

  const opacity = useTransform(
    local,
    [0, 0.08, 0.16, 0.24, 0.76, 0.86, 0.94, 1],
    [0, 0.35, 0.75, 1, 1, 0.72, 0.3, 0]
  );

  const scale = useTransform(
    local,
    [0, 0.25, 0.5, 0.8, 1],
    [0.975, 0.992, 1, 0.992, 0.975]
  );

  const y = useTransform(local, [0, 0.25, 0.5, 0.8, 1], [26, 10, 0, -10, -26]);
  const z = useTransform(local, [0, 0.3, 0.5, 0.8, 1], [-36, -10, 0, -10, -36]);

  const contentOpacity = useTransform(
    local,
    [0, 0.14, 0.24, 0.76, 0.88, 1],
    [0, 0.45, 1, 1, 0.45, 0]
  );

  return { rotateX, opacity, scale, y, z, contentOpacity };
}

/* ── Nested glass chips (MAC input / bubble spirit) ── */

function SheetBlocks({ blocks }: { blocks: MirageBlock[] }) {
  return (
    <div className="mirage-blocks">
      {blocks.map((b, i) => {
        if (b.type === "metrics") {
          return (
            <div key={i} className="mirage-metrics">
              {b.items.map((m) => (
                <div key={m.label} className="mirage-chip-surface mirage-metric">
                  <span className="mirage-metric-label">{m.label}</span>
                  <span className="mirage-metric-value">{m.value}</span>
                  {m.note ? (
                    <span className="mirage-metric-note">{m.note}</span>
                  ) : null}
                </div>
              ))}
            </div>
          );
        }
        if (b.type === "rows") {
          return (
            <div key={i} className="mirage-rows">
              {b.items.map((r) => (
                <div key={r.label} className="mirage-chip-surface mirage-row">
                  <span className="mirage-row-label">{r.label}</span>
                  <span className="mirage-row-value">{r.value}</span>
                </div>
              ))}
            </div>
          );
        }
        if (b.type === "list") {
          return (
            <ul key={i} className="mirage-chip-surface mirage-list">
              {b.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          );
        }
        if (b.type === "chips") {
          return (
            <div key={i} className="mirage-chips">
              {b.items.map((c) => (
                <span key={c} className="mirage-chip">
                  {c}
                </span>
              ))}
            </div>
          );
        }
        return (
          <blockquote key={i} className="mirage-chip-surface mirage-quote">
            <p>“{b.text}”</p>
            <footer> - {b.by}</footer>
          </blockquote>
        );
      })}
    </div>
  );
}

/**
 * Triada/M.A.C. structure:
 *   shell (.mirage-sheet)
 *     → .mirage-glass (pointer-events none)
 *         → .mirage-glass-fill   (dark tint + blur + saturate)
 *         → .mirage-glass-specular (top catch — not a wash)
 *     → .mirage-body (z-index above glass — readable text)
 */
function GlassSheet({
  sheet,
  local,
  isActive,
  isLast,
  reduced,
}: {
  sheet: MirageSheet;
  local: MotionValue<number>;
  isActive: boolean;
  isLast: boolean;
  reduced: boolean;
}) {
  const m = useSheetMotion(local, isLast);

  const glassLayers = (
    <div className="mirage-glass" aria-hidden>
      <div className="mirage-glass-fill" />
      <div className="mirage-glass-specular" />
    </div>
  );

  const body: ReactNode = (
    <div className="mirage-body">
      <header className="mirage-sheet-head">
        <div className="mirage-sheet-meta">
          <span className="mirage-sheet-index">{sheet.index}</span>
          <span className="mirage-sheet-rule" aria-hidden />
          <span className="mirage-sheet-eyebrow">{sheet.eyebrow}</span>
        </div>
        <h3 className="mirage-sheet-title">{sheet.title}</h3>
        <p className="mirage-sheet-lead">{sheet.lead}</p>
      </header>
      <SheetBlocks blocks={sheet.blocks} />
    </div>
  );

  if (reduced) {
    return (
      <article className="mirage-sheet mirage-sheet--static">
        {glassLayers}
        {body}
      </article>
    );
  }

  return (
    <motion.article
      className="mirage-sheet"
      data-active={isActive ? "true" : "false"}
      style={{
        rotateX: m.rotateX,
        opacity: m.opacity,
        scale: m.scale,
        y: m.y,
        z: m.z,
        transformPerspective: 1600,
        transformOrigin: "center center",
        zIndex: isActive ? 3 : 1,
      }}
    >
      {glassLayers}
      <motion.div
        className="mirage-body-motion"
        style={{ opacity: m.contentOpacity, height: "100%" }}
      >
        {body}
      </motion.div>
    </motion.article>
  );
}

/* ── Hero ── */

export type MirageAgencyHeroProps = {
  sheets?: MirageSheet[];
  brand?: string;
  tagline?: string;
  backgroundSrc?: string;
  vhPerSheet?: number;
};

export default function MirageAgencyHero({
  sheets = DEFAULT_SHEETS,
  brand = "MIRAGE",
  tagline = "Creative that survives the heat.",
  backgroundSrc = BG_SRC,
  vhPerSheet = 1.55,
}: MirageAgencyHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchYRef = useRef<number | null>(null);
  const pageOwnsRef = useRef(false);
  const reduced = useReducedMotion() ?? false;
  const total = Math.min(sheets.length, MAX_SHEETS);
  const list = sheets.slice(0, total);

  /** 0→1 journey progress (pin-until-complete). Film is not on this clock. */
  const journeyProgress = useMotionValue(0);

  const local0 = useLocalProgress(journeyProgress, 0, total);
  const local1 = useLocalProgress(journeyProgress, 1, total);
  const local2 = useLocalProgress(journeyProgress, 2, total);
  const local3 = useLocalProgress(journeyProgress, 3, total);
  const local4 = useLocalProgress(journeyProgress, 4, total);
  const locals = useMemo(
    () => [local0, local1, local2, local3, local4].slice(0, total),
    [local0, local1, local2, local3, local4, total]
  );

  const progressScale = useTransform(journeyProgress, [0, 1], [0, 1]);
  const [activeIdx, setActiveIdx] = useState(0);

  useMotionValueEvent(journeyProgress, "change", (p) => {
    setActiveIdx(
      Math.min(total - 1, Math.max(0, Math.floor(p * total + 0.001)))
    );
  });
  useEffect(() => {
    const p = journeyProgress.get();
    setActiveIdx(
      Math.min(total - 1, Math.max(0, Math.floor(p * total + 0.001)))
    );
  }, [journeyProgress, total]);

  useEffect(() => {
    if (reduced) return;
    const api = {
      setProgress: (p: number) => journeyProgress.set(clamp01(p)),
      getProgress: () => journeyProgress.get(),
      getTarget: () => journeyProgress.get(),
      pageOwns: () => pageOwnsRef.current,
      productId: "MS-HERO-MIRA01",
    };
    const w = window as Window & { __msScrollNarrative?: typeof api };
    w.__msScrollNarrative = api;
    return () => {
      if (w.__msScrollNarrative === api) delete w.__msScrollNarrative;
    };
  }, [journeyProgress, reduced]);

  /**
   * Pin-until-complete: wheel / touch / keys write virtual progress.
   * Earn = total * vhPerSheet viewports (7.75 at five sheets).
   * Release at 0 + up or 1 + down. After release at the end, the PAGE
   * owns the wheel until the stage docks at the top again. Pointer on
   * the runway never drives the cards.
   */
  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    const virtualDistance = () => {
      const vh = window.innerHeight || 800;
      return Math.max(vh * 2.4, total * vhPerSheet * vh);
    };

    const sectionInView = () => {
      const r = root.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      return r.top < mid && r.bottom > mid * 0.35;
    };

    const pinDocked = () => root.getBoundingClientRect().top >= -2;

    const journeyAtEnd = () => journeyProgress.get() >= 0.9995;

    const eventOnStage = (e: Event) => {
      if (e.target instanceof Node && root.contains(e.target)) return true;
      if (e instanceof WheelEvent) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el && root.contains(el)) return true;
      }
      return false;
    };

    const touchOnStage = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0];
      if (!t) return false;
      if (e.target instanceof Node && root.contains(e.target)) return true;
      const el = document.elementFromPoint(t.clientX, t.clientY);
      return Boolean(el && root.contains(el));
    };

    const setPageOwns = (owns: boolean) => {
      pageOwnsRef.current = owns;
      root.dataset.mirageOwns = owns ? "page" : "pin";
    };
    setPageOwns(false);

    const applyDelta = (deltaPx: number) => {
      if (!deltaPx || !Number.isFinite(deltaPx)) return false;
      const p = journeyProgress.get();
      if (p <= 0.0005 && deltaPx < 0) return false;
      if (p >= 0.9995 && deltaPx > 0) return false;
      journeyProgress.set(clamp01(p + deltaPx / virtualDistance()));
      return true;
    };

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
    };
  }, [journeyProgress, reduced, total, vhPerSheet]);

  // Film plays on its own clock - never scroll-scrubbed, never PSAVE reverse
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    const tryPlay = () => {
      v.play().catch(() => {});
    };
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    return () => v.removeEventListener("canplay", tryPlay);
  }, [reduced]);

  const active = list[activeIdx] ?? list[0];

  return (
    <section
      ref={rootRef}
      id="mirage-hero"
      className={`mirage-root${reduced ? "" : " mirage-root--pin"}`}
      data-product="MS-HERO-MIRA01"
      data-mirage-drive="pin"
      data-mirage-progress={activeIdx}
      aria-label={`${brand} agency hero`}
    >
      <div className={`mirage-stage${reduced ? " mirage-stage--static" : ""}`}>
        {/* Film — free-running; subject held on the right */}
        <div className="mirage-bg" aria-hidden>
          {!reduced ? (
            <video
              ref={videoRef}
              className="mirage-bg-video"
              src={backgroundSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <div className="mirage-bg-fallback" />
          )}
          <div className="mirage-bg-veil" />
        </div>

        {/* Minimal text nav — no bar, no buttons */}
        <nav className="mirage-nav" aria-label="Primary">
          <a className="mirage-brand" href="#top">
            {brand}
          </a>
          <ul className="mirage-nav-links">
            {NAV.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mirage-layout">
          <div className="mirage-rail">
            <div className="mirage-rail-intro">
              <p className="mirage-kicker">Advertising · Brand · Growth</p>
              <h1 className="mirage-headline">
                <span className="mirage-headline-line">Creative that</span>
                <span className="mirage-headline-line">survives the heat.</span>
              </h1>
            </div>

            <div className="mirage-deck" style={{ perspective: 1600 }}>
              {list.map((sheet, i) => (
                <GlassSheet
                  key={sheet.id}
                  sheet={sheet}
                  local={locals[i]!}
                  isActive={i === activeIdx}
                  isLast={i === total - 1}
                  reduced={reduced}
                />
              ))}
            </div>

            {!reduced ? (
              <div className="mirage-footer">
                <div className="mirage-progress" aria-hidden>
                  <div className="mirage-progress-track">
                    <motion.div
                      className="mirage-progress-fill"
                      style={{ scaleX: progressScale }}
                    />
                  </div>
                  <div className="mirage-dots">
                    {list.map((s, i) => (
                      <span
                        key={s.id}
                        className={
                          i === activeIdx
                            ? "mirage-dot mirage-dot--on"
                            : "mirage-dot"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="mirage-active-label">
                  <span>{active.index}</span> {active.eyebrow}
                </p>
                <p className="mirage-hint">Scroll to continue</p>
              </div>
            ) : null}
          </div>

          <div className="mirage-subject-space" aria-hidden />
        </div>
      </div>

      <style jsx global>{`
        .mirage-root {
          position: relative;
          width: 100%;
          background: #07080f;
        }
        /* Pin-until-complete: one viewport. No tall multi-vh track. */
        .mirage-root--pin {
          height: 100dvh;
          min-height: 100vh;
          max-height: 100dvh;
          overflow: hidden;
        }
        .mirage-stage {
          position: relative;
          top: 0;
          height: 100dvh;
          min-height: 680px;
          max-height: 100dvh;
          overflow: hidden;
        }
        .mirage-root--pin .mirage-stage {
          position: relative;
          top: 0;
          width: 100%;
          height: 100dvh;
          max-height: 100dvh;
          min-height: min(680px, 100dvh);
        }
        .mirage-stage--static {
          position: relative;
          height: auto;
          min-height: 0;
          padding: 5rem 0 4rem;
        }

        /* ── Background film ── */
        .mirage-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .mirage-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 72% center;
          transform: scale(1.02);
        }
        .mirage-bg-fallback {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 50% 60% at 75% 40%, #3d2a1a 0%, transparent 55%),
            radial-gradient(900px 420px at 10% 20%, rgba(91, 141, 239, 0.14), transparent 55%),
            linear-gradient(180deg, #1a120c 0%, #07080f 100%);
        }
        /* Soft left scrim for type — film still shows through glass */
        .mirage-bg-veil {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(7, 8, 15, 0.38) 0%,
              rgba(7, 8, 15, 0.14) 36%,
              rgba(7, 8, 15, 0.02) 58%,
              rgba(7, 8, 15, 0.1) 100%
            ),
            linear-gradient(
              180deg,
              rgba(7, 8, 15, 0.32) 0%,
              transparent 26%,
              transparent 74%,
              rgba(7, 8, 15, 0.38) 100%
            );
        }

        /* ── Minimal text nav ── */
        .mirage-nav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.4rem clamp(1.25rem, 4vw, 3rem);
          pointer-events: none;
          background: transparent;
          border: none;
          box-shadow: none;
        }
        .mirage-nav a {
          pointer-events: auto;
          text-decoration: none;
        }
        .mirage-brand {
          font-family: var(--font-mirage-display), system-ui, sans-serif;
          font-weight: 600;
          font-size: 0.92rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.94);
          transition: color 0.35s ease, text-shadow 0.35s ease;
        }
        .mirage-brand:hover {
          color: #7dd3fc;
          text-shadow: 0 0 28px rgba(125, 211, 252, 0.5);
        }
        .mirage-nav-links {
          display: flex;
          align-items: center;
          gap: clamp(1.15rem, 2.5vw, 2.1rem);
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .mirage-nav-links a {
          font-family: var(--font-mirage-sans), system-ui, sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.58);
          transition:
            color 0.35s ease,
            text-shadow 0.35s ease,
            letter-spacing 0.35s ease;
        }
        .mirage-nav-links a:hover {
          color: #fde68a;
          text-shadow: 0 0 22px rgba(253, 230, 138, 0.4);
          letter-spacing: 0.22em;
        }

        /* ── Layout ── */
        .mirage-layout {
          position: relative;
          z-index: 2;
          height: 100%;
          display: grid;
          grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
          align-items: stretch;
          padding:
            clamp(4.6rem, 10vh, 5.6rem)
            clamp(1.25rem, 3.5vw, 2.75rem)
            clamp(1.25rem, 3vh, 2rem)
            clamp(1.6rem, 4.8vw, 3.75rem);
          gap: clamp(1rem, 2vw, 2rem);
          box-sizing: border-box;
        }
        /* Uniform 1.2× on the whole left composition (kicker → headline →
           glass card → footer). Same ratios/spacing as before — like scaling
           a snapshot from the corner, not redesigning each token. */
        .mirage-rail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(0.7rem, 1.5vh, 1.15rem);
          min-width: 0;
          max-width: 540px;
          width: 100%;
          zoom: 1.2;
        }
        .mirage-subject-space {
          min-height: 1px;
        }
        .mirage-rail-intro {
          /* Wide enough for large two-line headline */
          max-width: min(100%, 28rem);
        }
        .mirage-kicker {
          margin: 0 0 0.5rem;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(253, 230, 138, 0.78);
        }
        .mirage-headline {
          margin: 0;
          font-family: var(--font-mirage-display), system-ui, sans-serif;
          font-weight: 600;
          font-size: clamp(2.15rem, 4.4vw, 3.55rem);
          line-height: 0.92;
          letter-spacing: -0.04em;
          color: #faf8f5;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.4);
        }
        /* Explicit two-line break only — never auto-wrap to 3–4 lines */
        .mirage-headline-line {
          display: block;
          white-space: nowrap;
        }

        /* ── Deck ── */
        .mirage-deck {
          position: relative;
          width: 100%;
          height: min(430px, 50vh);
          min-height: 310px;
        }
        .mirage-stage--static .mirage-deck {
          height: auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* ═══════════════════════════════════════════════════
           Triada / M.A.C. Liquid Glass shell
           Source: Development/triada globals.css .os-widget*
           ═══════════════════════════════════════════════════ */
        .mirage-sheet {
          position: absolute;
          inset: 0;
          border-radius: 22px;
          overflow: hidden;
          isolation: isolate;
          transform-style: preserve-3d;
          will-change: transform, opacity;
          /* Shell rim + lift — exact M.A.C. language */
          border: 0.5px solid rgba(255, 255, 255, 0.2);
          box-shadow:
            0 12px 40px rgba(0, 0, 0, 0.28),
            0 2px 8px rgba(0, 0, 0, 0.12),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.22);
        }
        .mirage-sheet[data-active="true"] {
          box-shadow:
            0 18px 52px rgba(0, 0, 0, 0.34),
            0 4px 14px rgba(0, 0, 0, 0.16),
            0 0 0 0.5px rgba(125, 211, 252, 0.12),
            inset 0 0.5px 0 rgba(255, 255, 255, 0.28);
        }
        .mirage-sheet--static {
          position: relative;
          inset: auto;
          transform: none !important;
          opacity: 1 !important;
        }

        /* Glass stack — absolute, no pointer, never holds text */
        .mirage-glass {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          border-radius: inherit;
        }

        /* Morphic fill — DARK translucent + blur + chroma boost
           Canonical M.A.C.: rgba(28, 30, 42, 0.42) blur(36px) saturate(190%)
           Slightly open alpha so desert chroma reads through the panel */
        .mirage-glass-fill {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: rgba(28, 30, 42, 0.38);
          -webkit-backdrop-filter: blur(36px) saturate(190%) !important;
          backdrop-filter: blur(36px) saturate(190%) !important;
        }

        /* Specular — top-edge catch, NOT a white wash */
        .mirage-glass-specular {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 0 rgba(0, 0, 0, 0.15);
          background: linear-gradient(
            155deg,
            rgba(255, 255, 255, 0.16) 0%,
            rgba(255, 255, 255, 0.04) 36%,
            transparent 58%
          );
        }

        /* Content ABOVE glass — never on the blur node */
        .mirage-body-motion {
          position: relative;
          z-index: 1;
        }
        .mirage-body {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          padding: clamp(1.15rem, 2.2vh, 1.5rem) clamp(1.2rem, 2vw, 1.6rem);
          box-sizing: border-box;
          color: rgba(255, 255, 255, 0.94);
        }

        .mirage-sheet-meta {
          display: flex;
          align-items: center;
          gap: 0.55rem;
        }
        .mirage-sheet-index {
          font-family: var(--font-mirage-display), system-ui, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #7dd3fc;
        }
        .mirage-sheet-rule {
          width: 20px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(125, 211, 252, 0.85),
            transparent
          );
        }
        .mirage-sheet-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(253, 230, 138, 0.88);
        }
        .mirage-sheet-title {
          margin: 0.2rem 0 0;
          font-family: var(--font-mirage-display), system-ui, sans-serif;
          font-weight: 600;
          font-size: clamp(1.18rem, 2.05vw, 1.48rem);
          line-height: 1.16;
          letter-spacing: -0.028em;
          color: rgba(255, 255, 255, 0.98);
        }
        .mirage-sheet-lead {
          margin: 0.4rem 0 0;
          font-size: 13px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.72);
          max-width: 42ch;
        }

        .mirage-blocks {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          margin-top: auto;
          min-height: 0;
        }

        /* Nested glass-on-glass chips (MAC bubble / input spirit) */
        .mirage-chip-surface {
          background: rgba(255, 255, 255, 0.08);
          border: 0.5px solid rgba(255, 255, 255, 0.12);
          border-radius: 14px;
        }

        .mirage-metrics {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.45rem;
        }
        .mirage-metrics:has(.mirage-metric:nth-child(4)) {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .mirage-metric {
          padding: 0.55rem 0.65rem;
          display: flex;
          flex-direction: column;
          gap: 0.12rem;
        }
        .mirage-metric-label {
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.48);
        }
        .mirage-metric-value {
          font-family: var(--font-mirage-display), system-ui, sans-serif;
          font-weight: 700;
          font-size: 1.2rem;
          letter-spacing: -0.025em;
          font-variant-numeric: tabular-nums;
          color: rgba(255, 255, 255, 0.98);
        }
        .mirage-metric-note {
          font-size: 10px;
          color: rgba(125, 211, 252, 0.88);
        }

        .mirage-rows {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .mirage-row {
          display: grid;
          grid-template-columns: 7.6rem 1fr;
          gap: 0.5rem;
          padding: 0.5rem 0.65rem;
        }
        .mirage-row-label {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.46);
          align-self: center;
        }
        .mirage-row-value {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.92);
          line-height: 1.35;
        }

        .mirage-list {
          margin: 0;
          padding: 0.55rem 0.75rem 0.55rem 1.4rem;
          font-size: 12.5px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.84);
        }
        .mirage-list li + li {
          margin-top: 0.3rem;
        }

        .mirage-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .mirage-chip {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.38rem 0.7rem;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          border: 0.5px solid rgba(255, 255, 255, 0.14);
          color: rgba(255, 255, 255, 0.9);
        }

        .mirage-quote {
          margin: 0;
          padding: 0.75rem 0.9rem;
        }
        .mirage-quote p {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          font-style: italic;
          color: rgba(255, 255, 255, 0.92);
        }
        .mirage-quote footer {
          margin-top: 0.45rem;
          font-size: 11px;
          color: rgba(253, 230, 138, 0.82);
        }

        /* ── Footer — centered under the cards ── */
        .mirage-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.45rem;
          width: 100%;
          max-width: none;
          margin-top: 0.15rem;
        }
        .mirage-progress {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: min(220px, 70%);
        }
        .mirage-progress-track {
          height: 2px;
          width: 100%;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          overflow: hidden;
        }
        .mirage-progress-fill {
          height: 100%;
          width: 100%;
          transform-origin: left center;
          background: linear-gradient(90deg, #fde68a, #7dd3fc, #a5b4fc);
        }
        .mirage-dots {
          display: flex;
          justify-content: center;
          gap: 0.4rem;
          margin-top: 0.4rem;
        }
        .mirage-dot {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.22);
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .mirage-dot--on {
          background: #7dd3fc;
          transform: scale(1.28);
        }
        .mirage-active-label {
          margin: 0.1rem 0 0;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.52);
        }
        .mirage-active-label span {
          color: #7dd3fc;
          font-weight: 700;
          margin-right: 0.35rem;
        }
        .mirage-hint {
          margin: 0;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.3);
        }

        /*
         * Fallbacks:
         * - No backdrop-filter engine → solid-ish dark (can't morph).
         * - prefers-reduced-transparency: do NOT kill glass on this demo —
         *   Windows "Transparency effects: Off" sets that MQ and was making
         *   every card a near-opaque black slab (0.94 alpha, blur none).
         *   Keep morphic glass; product is liquid glass.
         */
        @supports not (
          (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))
        ) {
          .mirage-glass-fill {
            background: rgba(28, 30, 42, 0.82) !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
        }

        @media (max-width: 960px) {
          .mirage-layout {
            grid-template-columns: 1fr;
            padding-top: 4.5rem;
          }
          .mirage-subject-space {
            display: none;
          }
          .mirage-rail {
            max-width: none;
          }
          .mirage-bg-video {
            object-position: 60% center;
          }
          .mirage-nav-links {
            gap: 0.85rem;
          }
          .mirage-nav-links a {
            font-size: 0.65rem;
          }
        }
        @media (max-width: 640px) {
          .mirage-metrics {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .mirage-row {
            grid-template-columns: 1fr;
            gap: 0.15rem;
          }
          .mirage-nav {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}
