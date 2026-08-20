"use client";

/**
 * FOLIO — Scroll-pivot liquid glass section (standalone product)
 * One-way paper journey: edge-below → face-on → edge-above (hidden deck).
 * True translucent glass over motion video — Super Frontend LG stack.
 * Dense enterprise content. Not a hero. Not Prism.
 *
 * Pin-until-complete (PRODUCT_LAW): fixed stage, virtual progress 0→1 from
 * wheel/trackpad/touch/keys. No tall multi-vh document scrollbar UX.
 * Client embed: pin while journey runs; release at ends. After release at
 * the end, the PAGE owns the wheel until the stage docks (top >= -2).
 * Pointer on the next sibling never drives the cards.
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

export type FolioRow = { label: string; value: string; note?: string };
export type FolioChip = { label: string; tone?: "neutral" | "accent" | "success" };
export type FolioBlock =
  | { type: "metrics"; items: { label: string; value: string; delta?: string }[] }
  | { type: "rows"; items: FolioRow[] }
  | { type: "list"; items: string[] }
  | { type: "chips"; items: FolioChip[] }
  | { type: "quote"; text: string; by: string; role: string }
  | { type: "split"; left: FolioRow[]; right: FolioRow[] };

export type FolioSheet = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  lead: string;
  blocks: FolioBlock[];
};

/** Enterprise operating system — board-ready narrative, five dense sheets. */
const DEFAULT_SHEETS: FolioSheet[] = [
  {
    id: "mandate",
    index: "01",
    eyebrow: "Mandate",
    title: "Align the enterprise on a single growth thesis.",
    lead: "Leadership, product, and GTM share one definition of value — before a dollar of media or engineering is spent.",
    blocks: [
      {
        type: "metrics",
        items: [
          { label: "ARR focus", value: "$48M", delta: "FY target" },
          { label: "TAM in scope", value: "$2.1B", delta: "Serviceable" },
          { label: "Priority markets", value: "6", delta: "Regions" },
          { label: "Exec sponsors", value: "4", delta: "C-suite" },
        ],
      },
      {
        type: "rows",
        items: [
          {
            label: "North star",
            value: "Net new ARR from enterprise segments",
            note: "Board KPI",
          },
          {
            label: "Constraint",
            value: "Payback ≤ 12 months on acquired ARR",
            note: "Finance",
          },
          {
            label: "Non-goal",
            value: "Vanity traffic and unattributed brand spend",
            note: "Cut list",
          },
        ],
      },
      {
        type: "chips",
        items: [
          { label: "Board-aligned", tone: "success" },
          { label: "Q1 lock", tone: "accent" },
          { label: "Cross-functional", tone: "neutral" },
        ],
      },
    ],
  },
  {
    id: "insight",
    index: "02",
    eyebrow: "Insight",
    title: "See the buyers who convert — and the ones who never will.",
    lead: "Evidence over opinion. We size intent, map decision units, and retire segments that cannot pay for themselves.",
    blocks: [
      {
        type: "split",
        left: [
          { label: "High-intent ICP", value: "34% of traffic", note: "62% of pipeline" },
          { label: "Expansion ready", value: "18% of accounts", note: "NRR 124%" },
          { label: "Strategic whitespace", value: "9 verticals", note: "Uncovered" },
        ],
        right: [
          { label: "Dead weight", value: "41% of spend", note: "Reallocated" },
          { label: "Avg. deal cycle", value: "67 days", note: "−19 days YoY" },
          { label: "Win rate (target ICP)", value: "38%", note: "+11 pts" },
        ],
      },
      {
        type: "list",
        items: [
          "Primary buying committee: CRO, RevOps, Security — single narrative deck.",
          "Trigger events: funding round, platform migration, compliance deadline.",
          "Disqualify freemium browsers with no commercial pathway in 14 days.",
        ],
      },
    ],
  },
  {
    id: "system",
    index: "03",
    eyebrow: "System",
    title: "Build the operating system, not a campaign of the week.",
    lead: "Message architecture, product packaging, and channel rules live in one system so every team ships the same truth.",
    blocks: [
      {
        type: "rows",
        items: [
          {
            label: "Narrative spine",
            value: "Outcome → proof → path → risk removed",
            note: "All surfaces",
          },
          {
            label: "Offer ladder",
            value: "Pilot → platform → enterprise suite",
            note: "3 SKUs",
          },
          {
            label: "Proof library",
            value: "42 assets mapped to stage & persona",
            note: "Versioned",
          },
          {
            label: "Channel rules",
            value: "Paid only where payback model clears hurdle",
            note: "Weekly",
          },
          {
            label: "Handoff SLA",
            value: "MQL → SQL in ≤ 4 business hours",
            note: "RevOps",
          },
        ],
      },
      {
        type: "chips",
        items: [
          { label: "Brand system", tone: "neutral" },
          { label: "Product marketing", tone: "accent" },
          { label: "Demand ops", tone: "neutral" },
          { label: "Enablement", tone: "success" },
        ],
      },
    ],
  },
  {
    id: "execution",
    index: "04",
    eyebrow: "Execution",
    title: "Run a 90-day plan with owners, gates, and kill criteria.",
    lead: "What ships, who owns it, and what stops if the numbers miss. No theater. No open loops.",
    blocks: [
      {
        type: "metrics",
        items: [
          { label: "Days 1–30", value: "Foundation", delta: "Data + narrative" },
          { label: "Days 31–60", value: "Activation", delta: "Channels live" },
          { label: "Days 61–90", value: "Scale", delta: "Optimize + expand" },
          { label: "Gate reviews", value: "Bi-weekly", delta: "Steering" },
        ],
      },
      {
        type: "rows",
        items: [
          {
            label: "Workstream A",
            value: "Enterprise site + demo path redesign",
            note: "PMM + Design",
          },
          {
            label: "Workstream B",
            value: "ABM for 120 named accounts",
            note: "Demand + SDR",
          },
          {
            label: "Workstream C",
            value: "Partner co-sell enablement pack",
            note: "Alliances",
          },
          {
            label: "Kill criteria",
            value: "CAC payback > 14 mo for two consecutive gates",
            note: "Hard stop",
          },
        ],
      },
    ],
  },
  {
    id: "outcomes",
    index: "05",
    eyebrow: "Outcomes",
    title: "Report the numbers the board already asked for.",
    lead: "Pipeline quality, efficiency, and retention — presented the way finance reads them, not as marketing vanity.",
    blocks: [
      {
        type: "metrics",
        items: [
          { label: "Pipeline created", value: "$18.4M", delta: "+42% vs prior" },
          { label: "CAC payback", value: "8.1 mo", delta: "Target ≤ 12" },
          { label: "Win rate", value: "36%", delta: "+9 pts" },
          { label: "NRR", value: "119%", delta: "Expansion led" },
        ],
      },
      {
        type: "quote",
        text: "For the first time, growth, product, and finance argued from the same dashboard. That is how we unlocked the second half of the year.",
        by: "Elena Voss",
        role: "Chief Revenue Officer",
      },
      {
        type: "chips",
        items: [
          { label: "Board ready", tone: "success" },
          { label: "Audit trail", tone: "neutral" },
          { label: "Quarterly cadence", tone: "accent" },
        ],
      },
    ],
  },
];

/** Client HD film (buyer pack). Loop wallpaper under glass - not scroll scrub. */
const BG_SRC = "/assets/videos/folio-blurry-v1.mp4";

type FolioPivotSectionProps = {
  sheets?: FolioSheet[];
  kicker?: string;
  heading?: string;
  /**
   * Virtual journey length multiplier (same effort as old tall-track: total × vhPerSheet viewports).
   * Higher = more wheel/trackpad distance to finish the five sheets.
   */
  vhPerSheet?: number;
  backgroundSrc?: string;
};

const MAX_SHEETS = 5;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/**
 * Map global journey progress (0–1) → local 0–1 for each sheet.
 * Wider overlap = next sheet eases in while previous is still leaving (no hard cut).
 */
function useLocalProgress(
  journeyProgress: MotionValue<number>,
  index: number,
  total: number
) {
  const span = 1 / total;
  // ~18% of a span on each side — continuous handoff, less “jump”
  const pad = span * 0.18;
  const start = Math.max(0, index * span - pad);
  const end = Math.min(1, (index + 1) * span + pad);
  // Ease local progress so motion spends more time near face-on
  return useTransform(journeyProgress, [start, end], [0, 1], {
    clamp: true,
    // smoothstep-ish: slow at ends of the segment, soft middle
    ease: (t: number) => t * t * (3 - 2 * t),
  });
}

/**
 * One-way paper arc — denser keyframes + softer travel for natural scroll flow.
 * Less extreme angles, longer readable plateau, gradual opacity (no pop).
 */
function useSheetMotion(local: MotionValue<number>, isLast: boolean) {
  // More keyframes = denser animation samples along the scroll
  // Milder max tilt (~72°) reduces the “snap” feel of ±84°
  const rotateX = useTransform(
    local,
    isLast
      ? [0, 0.08, 0.18, 0.32, 0.48, 0.72, 0.86, 0.94, 1]
      : [0, 0.08, 0.18, 0.32, 0.5, 0.68, 0.82, 0.92, 1],
    isLast
      ? [72, 48, 28, 10, 0, 0, -18, -42, -72]
      : [72, 48, 28, 10, 0, -10, -28, -48, -72]
  );

  // Long full-opacity plateau; long soft ramps in/out
  const opacity = useTransform(
    local,
    isLast
      ? [0, 0.06, 0.14, 0.22, 0.78, 0.88, 0.96, 1]
      : [0, 0.06, 0.14, 0.22, 0.78, 0.88, 0.96, 1],
    isLast
      ? [0, 0.25, 0.65, 1, 1, 0.65, 0.25, 0]
      : [0, 0.25, 0.65, 1, 1, 0.65, 0.25, 0]
  );

  // Subtle scale — barely noticeable, no zoom jump
  const scale = useTransform(
    local,
    isLast
      ? [0, 0.2, 0.4, 0.75, 0.9, 1]
      : [0, 0.2, 0.5, 0.8, 1],
    isLast
      ? [0.96, 0.985, 1, 1, 0.985, 0.97]
      : [0.96, 0.985, 1, 0.985, 0.96]
  );

  // Shorter Y travel — glides, doesn’t leap
  const y = useTransform(
    local,
    isLast
      ? [0, 0.2, 0.4, 0.75, 0.9, 1]
      : [0, 0.2, 0.5, 0.8, 1],
    isLast
      ? [36, 16, 0, 0, -14, -32]
      : [36, 16, 0, -16, -36]
  );

  // Gentle depth — less z thrash
  const z = useTransform(
    local,
    isLast
      ? [0, 0.25, 0.45, 0.8, 1]
      : [0, 0.25, 0.5, 0.75, 1],
    isLast
      ? [-48, -16, 0, 0, -36]
      : [-48, -16, 0, -16, -48]
  );

  const glow = useTransform(
    local,
    isLast
      ? [0, 0.2, 0.4, 0.75, 0.9, 1]
      : [0, 0.2, 0.5, 0.8, 1],
    isLast
      ? [0.15, 0.55, 1, 1, 0.55, 0.15]
      : [0.15, 0.55, 1, 0.55, 0.15]
  );
  const boxShadow = useTransform(
    glow,
    (g) =>
      `0 ${16 + g * 24}px ${48 + g * 36}px -16px rgba(0,0,0,${0.32 + g * 0.18}),
       0 ${4 + g * 6}px ${16 + g * 14}px -4px rgba(0,0,0,${0.16 + g * 0.08}),
       0 0 ${16 + g * 32}px rgba(160, 200, 255, ${0.06 + g * 0.12}),
       inset 0 1px 0 rgba(255,255,255,${0.5 + g * 0.25}),
       inset 0 -1px 0 rgba(255,255,255,${0.06 + g * 0.06})`
  );

  // Content readable through most of the face window; soft fade at edges
  const contentOpacity = useTransform(
    local,
    isLast
      ? [0, 0.12, 0.22, 0.78, 0.9, 1]
      : [0, 0.12, 0.22, 0.78, 0.9, 1],
    isLast
      ? [0, 0.35, 1, 1, 0.35, 0]
      : [0, 0.35, 1, 1, 0.35, 0]
  );
  return { rotateX, opacity, scale, y, z, boxShadow, contentOpacity };
}

/* ── Dense content blocks ── */

function BlockMetrics({
  items,
}: {
  items: { label: string; value: string; delta?: string }[];
}) {
  return (
    <div className="folio-metrics">
      {items.map((item) => (
        <div key={item.label} className="folio-metric">
          <span className="folio-metric-label">{item.label}</span>
          <span className="folio-metric-value">{item.value}</span>
          {item.delta ? (
            <span className="folio-metric-delta">{item.delta}</span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function BlockRows({ items }: { items: FolioRow[] }) {
  return (
    <div className="folio-rows">
      {items.map((row) => (
        <div key={row.label} className="folio-row">
          <div className="folio-row-main">
            <span className="folio-row-label">{row.label}</span>
            <span className="folio-row-value">{row.value}</span>
          </div>
          {row.note ? <span className="folio-row-note">{row.note}</span> : null}
        </div>
      ))}
    </div>
  );
}

function BlockList({ items }: { items: string[] }) {
  return (
    <ul className="folio-list">
      {items.map((item) => (
        <li key={item}>
          <span className="folio-list-mark" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BlockChips({ items }: { items: FolioChip[] }) {
  return (
    <div className="folio-chips">
      {items.map((c) => (
        <span
          key={c.label}
          className={`folio-chip folio-chip--${c.tone ?? "neutral"}`}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

function BlockQuote({
  text,
  by,
  role,
}: {
  text: string;
  by: string;
  role: string;
}) {
  return (
    <blockquote className="folio-quote">
      <p className="folio-quote-text">“{text}”</p>
      <footer className="folio-quote-foot">
        <span className="folio-quote-by">{by}</span>
        <span className="folio-quote-role">{role}</span>
      </footer>
    </blockquote>
  );
}

function BlockSplit({
  left,
  right,
}: {
  left: FolioRow[];
  right: FolioRow[];
}) {
  return (
    <div className="folio-split">
      <div className="folio-split-col">
        {left.map((r) => (
          <div key={r.label} className="folio-split-item">
            <span className="folio-split-label">{r.label}</span>
            <span className="folio-split-value">{r.value}</span>
            {r.note ? <span className="folio-split-note">{r.note}</span> : null}
          </div>
        ))}
      </div>
      <div className="folio-split-rule" aria-hidden />
      <div className="folio-split-col">
        {right.map((r) => (
          <div key={r.label} className="folio-split-item">
            <span className="folio-split-label">{r.label}</span>
            <span className="folio-split-value">{r.value}</span>
            {r.note ? <span className="folio-split-note">{r.note}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function SheetBlocks({ blocks }: { blocks: FolioBlock[] }) {
  return (
    <div className="folio-blocks">
      {blocks.map((b, i) => {
        const key = `${b.type}-${i}`;
        switch (b.type) {
          case "metrics":
            return <BlockMetrics key={key} items={b.items} />;
          case "rows":
            return <BlockRows key={key} items={b.items} />;
          case "list":
            return <BlockList key={key} items={b.items} />;
          case "chips":
            return <BlockChips key={key} items={b.items} />;
          case "quote":
            return (
              <BlockQuote key={key} text={b.text} by={b.by} role={b.role} />
            );
          case "split":
            return <BlockSplit key={key} left={b.left} right={b.right} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

function GlassSheet({
  sheet,
  local,
  reduced,
  staticMode,
  isActive,
  isLast,
}: {
  sheet: FolioSheet;
  local: MotionValue<number>;
  reduced: boolean;
  staticMode: boolean;
  isActive: boolean;
  isLast: boolean;
}) {
  const sheetMotion = useSheetMotion(local, isLast);

  const layers = (
    <>
      <div className="folio-lg-fill" aria-hidden />
      <div className="folio-lg-iridescence" aria-hidden />
      <div className="folio-lg-specular" aria-hidden />
      <div className="folio-lg-edge" aria-hidden />
    </>
  );

  const body: ReactNode = (
    <div className="folio-sheet-content">
      <header className="folio-sheet-head">
        <div className="folio-sheet-meta">
          <span className="folio-sheet-index">{sheet.index}</span>
          <span className="folio-sheet-rule" aria-hidden />
          <span className="folio-sheet-eyebrow">{sheet.eyebrow}</span>
        </div>
        <h3 className="folio-sheet-title">{sheet.title}</h3>
        <p className="folio-sheet-lead">{sheet.lead}</p>
      </header>
      <SheetBlocks blocks={sheet.blocks} />
    </div>
  );

  if (staticMode || reduced) {
    return (
      <article className="folio-sheet folio-sheet--static">
        {layers}
        {body}
      </article>
    );
  }

  return (
    <motion.article
      className="folio-sheet"
      data-active={isActive ? "true" : "false"}
      style={{
        rotateX: sheetMotion.rotateX,
        opacity: sheetMotion.opacity,
        scale: sheetMotion.scale,
        y: sheetMotion.y,
        z: sheetMotion.z,
        boxShadow: sheetMotion.boxShadow,
        transformPerspective: 1600,
        transformOrigin: "center center",
        zIndex: isActive ? 3 : 1,
      }}
    >
      {layers}
      <motion.div
        style={{ opacity: sheetMotion.contentOpacity, height: "100%" }}
      >
        {body}
      </motion.div>
    </motion.article>
  );
}

export default function FolioPivotSection({
  sheets = DEFAULT_SHEETS,
  kicker = "Enterprise growth system",
  heading = "Five decisions that turn strategy into revenue.",
  // Virtual journey length: total × vhPerSheet viewports of wheel/trackpad effort
  vhPerSheet = 1.55,
  backgroundSrc = BG_SRC,
}: FolioPivotSectionProps) {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchYRef = useRef<number | null>(null);
  const pageOwnsRef = useRef(false);
  const reduced = useReducedMotion() ?? false;
  const total = Math.min(sheets.length, MAX_SHEETS);
  const list = sheets.slice(0, total);

  /** 0→1 journey progress (pin-until-complete virtual scroll). */
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

  // Capture API for storefront burns + operator tooling
  useEffect(() => {
    if (reduced) return;
    const api = {
      setProgress: (p: number) => journeyProgress.set(clamp01(p)),
      getProgress: () => journeyProgress.get(),
      getTarget: () => journeyProgress.get(),
      pageOwns: () => pageOwnsRef.current,
      productId: "MS-SEC-FOLI01",
    };
    const w = window as Window & {
      __msScrollNarrative?: typeof api;
    };
    w.__msScrollNarrative = api;
    return () => {
      if (w.__msScrollNarrative === api) delete w.__msScrollNarrative;
    };
  }, [journeyProgress, reduced]);

  /**
   * Pin-until-complete: wheel / touch / keys write virtual progress.
   * Release at 0 + up or 1 + down. After release at the end, the PAGE
   * owns the wheel until the stage docks at the top again. Pointer on
   * the next sibling never drives the cards.
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
      root.dataset.folioOwns = owns ? "page" : "pin";
    };
    setPageOwns(false);

    const applyDelta = (deltaPx: number) => {
      if (!deltaPx || !Number.isFinite(deltaPx)) return false;
      const p = journeyProgress.get();
      if (p <= 0.0005 && deltaPx < 0) return false;
      if (p >= 0.9995 && deltaPx > 0) return false;
      const next = clamp01(p + deltaPx / virtualDistance());
      journeyProgress.set(next);
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
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [journeyProgress, reduced, total, vhPerSheet]);

  // Keep video playing
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

  const activeSheet = list[activeIdx] ?? list[0];

  return (
    <section
      ref={rootRef}
      id="folio-pivot"
      className={`folio-root${reduced ? "" : " folio-root--pin"}`}
      data-folio-pin="true"
      data-folio-drive="pin"
      data-folio-progress={activeIdx}
      aria-label={heading}
    >
      <div className={`folio-stage${reduced ? " folio-stage--static" : ""}`}>
        {/* Motion video background — glass must refract this */}
        <div className="folio-bg" aria-hidden>
          {!reduced ? (
            <video
              ref={videoRef}
              className="folio-bg-video"
              src={backgroundSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <div className="folio-bg-fallback" />
          )}
          <div className="folio-bg-veil" />
        </div>

        <div className="folio-stage-inner">
          <header className="folio-header">
            <p className="folio-kicker">{kicker}</p>
            <h2 className="folio-heading">{heading}</h2>
          </header>

          <div className="folio-deck" style={{ perspective: 1600 }}>
            {list.map((sheet, i) => (
              <GlassSheet
                key={sheet.id}
                sheet={sheet}
                local={locals[i]!}
                reduced={!!reduced}
                staticMode={!!reduced}
                isActive={activeIdx === i}
                isLast={i === total - 1}
              />
            ))}
          </div>

          {!reduced && (
            <div className="folio-footer">
              <div className="folio-step" aria-live="polite">
                <span className="folio-step-num">{activeSheet?.index}</span>
                <span className="folio-step-label">{activeSheet?.eyebrow}</span>
              </div>
              <div className="folio-dots" aria-hidden>
                {list.map((s, i) => (
                  <span
                    key={s.id}
                    className="folio-dot"
                    data-active={activeIdx === i ? "true" : "false"}
                  />
                ))}
              </div>
              <div className="folio-progress" aria-hidden>
                <motion.div
                  className="folio-progress-fill"
                  style={{ scaleX: progressScale }}
                />
              </div>
              <p className="folio-hint">Scroll to continue</p>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .folio-root {
          position: relative;
          width: 100%;
          background: #0a0c12;
        }
        /* Pin-until-complete: one viewport stage, no tall multi-vh track */
        .folio-root--pin {
          height: 100dvh;
          min-height: 100vh;
          max-height: 100dvh;
          overflow: hidden;
          /* Sticky keeps stage locked while host page would otherwise move;
             virtual progress (not document height) drives the sheets. */
        }
        .folio-stage {
          position: relative;
          top: 0;
          height: 100dvh;
          min-height: 680px;
          max-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .folio-root--pin .folio-stage {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100dvh;
          max-height: 100dvh;
          min-height: min(680px, 100dvh);
        }
        .folio-stage--static {
          position: relative !important;
          height: auto;
          min-height: 0;
          max-height: none;
          padding: 4rem 0 3.5rem;
        }

        /* ── Video background ── */
        .folio-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .folio-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.04);
        }
        .folio-bg-fallback {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse 80% 60% at 40% 30%,
              #3b2a6b 0%,
              transparent 55%
            ),
            radial-gradient(
              ellipse 70% 50% at 80% 70%,
              #0e4a5c 0%,
              transparent 50%
            ),
            #12141c;
        }
        /* Soft veil so type stays legible; glass still reads video through */
        .folio-bg-veil {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse 70% 60% at 50% 45%,
              rgba(8, 10, 16, 0.15) 0%,
              rgba(8, 10, 16, 0.45) 100%
            ),
            linear-gradient(
              180deg,
              rgba(8, 10, 16, 0.35) 0%,
              rgba(8, 10, 16, 0.2) 40%,
              rgba(8, 10, 16, 0.5) 100%
            );
        }

        .folio-stage-inner {
          position: relative;
          z-index: 1;
          width: min(1080px, 94vw);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(0.75rem, 1.8vh, 1.35rem);
        }
        .folio-header {
          text-align: center;
          color: #fff;
          max-width: 28ch;
        }
        .folio-kicker {
          margin: 0 0 0.45rem;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.35);
        }
        .folio-heading {
          margin: 0;
          font-family: var(--font-folio-display), system-ui, sans-serif;
          font-size: clamp(1.55rem, 3.1vw, 2.35rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.12;
          color: #fff;
          text-shadow: 0 2px 24px rgba(0, 0, 0, 0.4);
        }

        .folio-deck {
          position: relative;
          width: min(980px, 100%);
          height: min(560px, 64vh);
          transform-style: preserve-3d;
          isolation: isolate;
        }
        .folio-stage--static .folio-deck {
          height: auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* ── True liquid glass (ref: iridescent pill + glass morphism) ── */
        .folio-sheet {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          isolation: isolate;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform, opacity;
          transform-style: preserve-3d;
          transition: none; /* scroll-driven only */
        }
        .folio-sheet--static {
          position: relative;
          inset: auto;
          transform: none !important;
          opacity: 1 !important;
          box-shadow:
            0 28px 70px -18px rgba(0, 0, 0, 0.45),
            inset 0 1px 0 rgba(255, 255, 255, 0.55);
        }

        /* Translucent fill — video MUST show through (ref: glass morphism) */
        .folio-lg-fill {
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(
            155deg,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(255, 255, 255, 0.08) 40%,
            rgba(180, 200, 240, 0.1) 100%
          );
          -webkit-backdrop-filter: blur(26px) saturate(185%);
          backdrop-filter: blur(26px) saturate(185%);
        }
        /* Iridescent rim wash (ref: clear glass pill — cyan / violet / rose) */
        .folio-lg-iridescence {
          position: absolute;
          inset: 0;
          z-index: 1;
          border-radius: inherit;
          pointer-events: none;
          opacity: 1;
          background:
            linear-gradient(
              120deg,
              rgba(100, 210, 255, 0.38) 0%,
              transparent 22%,
              transparent 78%,
              rgba(255, 170, 210, 0.32) 100%
            ),
            linear-gradient(
              200deg,
              rgba(200, 170, 255, 0.12) 0%,
              transparent 45%,
              rgba(120, 255, 220, 0.1) 100%
            );
          mix-blend-mode: screen;
        }
        /* Specular edge catch (SF LG — not full-card wash) */
        .folio-lg-specular {
          position: absolute;
          inset: 0;
          z-index: 2;
          border-radius: inherit;
          pointer-events: none;
          box-shadow:
            inset 0 1.5px 0 rgba(255, 255, 255, 0.72),
            inset 0 -1px 0 rgba(0, 0, 0, 0.15),
            inset 1.5px 0 0 rgba(140, 220, 255, 0.25),
            inset -1.5px 0 0 rgba(255, 180, 220, 0.2);
          background: linear-gradient(
            165deg,
            rgba(255, 255, 255, 0.32) 0%,
            rgba(255, 255, 255, 0.06) 30%,
            rgba(255, 255, 255, 0) 50%
          );
        }
        .folio-lg-edge {
          position: absolute;
          inset: 0;
          z-index: 3;
          border-radius: inherit;
          pointer-events: none;
          box-shadow:
            inset 0 0 0 1px rgba(255, 255, 255, 0.42),
            inset 0 0 0 0.5px rgba(150, 210, 255, 0.45),
            0 0 40px -8px rgba(160, 200, 255, 0.25);
        }

        .folio-sheet[data-active="true"]::after {
          content: "";
          position: absolute;
          inset: -30% -50%;
          z-index: 5;
          pointer-events: none;
          background: linear-gradient(
            105deg,
            transparent 44%,
            rgba(255, 255, 255, 0.12) 49%,
            rgba(255, 255, 255, 0.22) 50.5%,
            rgba(180, 220, 255, 0.1) 52%,
            transparent 58%
          );
          animation: folio-sheen 7s ease-in-out infinite;
          mix-blend-mode: soft-light;
        }
        @keyframes folio-sheen {
          0%,
          100% {
            transform: translateX(-18%);
            opacity: 0.3;
          }
          50% {
            transform: translateX(18%);
            opacity: 0.85;
          }
        }

        /* ── Sheet content — dense, professional ── */
        .folio-sheet-content {
          position: relative;
          z-index: 4;
          height: 100%;
          padding: clamp(1.4rem, 2.6vw, 2.15rem) clamp(1.4rem, 2.8vw, 2.35rem);
          display: flex;
          flex-direction: column;
          gap: clamp(0.75rem, 1.4vh, 1rem);
          justify-content: space-between;
          color: #fff;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.28);
          overflow: hidden;
        }
        .folio-sheet-head {
          flex-shrink: 0;
        }
        .folio-sheet-meta {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.65rem;
        }
        .folio-sheet-index {
          font-family: var(--font-folio-display), system-ui, sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(186, 210, 255, 0.95);
        }
        .folio-sheet-rule {
          width: 18px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(186, 210, 255, 0.7),
            rgba(255, 255, 255, 0.15)
          );
        }
        .folio-sheet-eyebrow {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
        }
        .folio-sheet-title {
          margin: 0 0 0.55rem;
          font-family: var(--font-folio-display), system-ui, sans-serif;
          font-size: clamp(1.3rem, 2.3vw, 1.75rem);
          font-weight: 600;
          line-height: 1.18;
          letter-spacing: -0.025em;
          color: #fff;
          max-width: 28ch;
        }
        .folio-sheet-lead {
          margin: 0;
          font-size: clamp(13px, 1.15vw, 15px);
          line-height: 1.55;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.78);
          max-width: 58ch;
        }

        .folio-blocks {
          flex: 1;
          min-height: 0;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          justify-content: flex-end;
        }

        /* Metrics strip */
        .folio-metrics {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.5rem;
        }
        .folio-metric {
          padding: 0.7rem 0.75rem;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.08);
          border: 0.5px solid rgba(255, 255, 255, 0.18);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          min-width: 0;
        }
        .folio-metric-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
        }
        .folio-metric-value {
          font-family: var(--font-folio-display), system-ui, sans-serif;
          font-size: clamp(1.05rem, 1.6vw, 1.35rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
          color: #fff;
          line-height: 1.15;
        }
        .folio-metric-delta {
          font-size: 10px;
          font-weight: 500;
          color: rgba(180, 230, 210, 0.9);
        }

        /* Dense rows */
        .folio-rows {
          display: flex;
          flex-direction: column;
          border-radius: 14px;
          overflow: hidden;
          border: 0.5px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.05);
        }
        .folio-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.75rem;
          align-items: center;
          padding: 0.65rem 0.9rem;
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.08);
        }
        .folio-row:last-child {
          border-bottom: none;
        }
        .folio-row-main {
          display: flex;
          flex-direction: column;
          gap: 0.12rem;
          min-width: 0;
        }
        .folio-row-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.48);
        }
        .folio-row-value {
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.92);
          line-height: 1.35;
        }
        .folio-row-note {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(186, 210, 255, 0.85);
          white-space: nowrap;
        }

        /* List */
        .folio-list {
          margin: 0;
          padding: 0.65rem 0.85rem;
          list-style: none;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 0.5px solid rgba(255, 255, 255, 0.12);
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .folio-list li {
          display: flex;
          gap: 0.65rem;
          align-items: flex-start;
          font-size: 13px;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.85);
        }
        .folio-list-mark {
          flex-shrink: 0;
          width: 6px;
          height: 6px;
          margin-top: 0.4em;
          border-radius: 50%;
          background: linear-gradient(135deg, #8ec5ff, #c4b5fd);
          box-shadow: 0 0 8px rgba(140, 180, 255, 0.5);
        }

        /* Chips */
        .folio-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .folio-chip {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.4rem 0.7rem;
          border-radius: 999px;
          border: 0.5px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.8);
        }
        .folio-chip--accent {
          background: rgba(120, 160, 255, 0.18);
          border-color: rgba(160, 190, 255, 0.35);
          color: #d6e4ff;
        }
        .folio-chip--success {
          background: rgba(80, 200, 160, 0.15);
          border-color: rgba(120, 220, 180, 0.3);
          color: #c8f5e4;
        }

        /* Quote */
        .folio-quote {
          margin: 0;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.06);
          border: 0.5px solid rgba(255, 255, 255, 0.14);
          border-left: 2px solid rgba(160, 190, 255, 0.55);
        }
        .folio-quote-text {
          margin: 0 0 0.65rem;
          font-size: 13.5px;
          line-height: 1.5;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.9);
          font-style: italic;
        }
        .folio-quote-foot {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem 0.75rem;
          align-items: baseline;
        }
        .folio-quote-by {
          font-size: 12px;
          font-weight: 600;
          color: #fff;
        }
        .folio-quote-role {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Split columns */
        .folio-split {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 0.75rem;
          padding: 0.75rem;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.05);
          border: 0.5px solid rgba(255, 255, 255, 0.12);
        }
        .folio-split-rule {
          width: 1px;
          background: linear-gradient(
            180deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
        }
        .folio-split-col {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          min-width: 0;
        }
        .folio-split-item {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }
        .folio-split-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
        }
        .folio-split-value {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          font-variant-numeric: tabular-nums;
        }
        .folio-split-note {
          font-size: 11px;
          color: rgba(180, 230, 210, 0.85);
        }

        /* Footer */
        .folio-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
          width: min(300px, 70vw);
        }
        .folio-step {
          display: flex;
          align-items: baseline;
          gap: 0.45rem;
        }
        .folio-step-num {
          font-family: var(--font-folio-display), system-ui, sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(186, 210, 255, 0.95);
        }
        .folio-step-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
        }
        .folio-dots {
          display: flex;
          gap: 0.4rem;
          align-items: center;
        }
        .folio-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.22);
          transition:
            width 0.3s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.3s ease;
        }
        .folio-dot[data-active="true"] {
          width: 20px;
          background: linear-gradient(90deg, #a5b4fc, #7dd3fc);
          box-shadow: 0 0 12px rgba(125, 211, 252, 0.45);
        }
        .folio-progress {
          width: 100%;
          height: 2px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          overflow: hidden;
        }
        .folio-progress-fill {
          height: 100%;
          width: 100%;
          transform-origin: left center;
          background: linear-gradient(90deg, #a78bfa, #7dd3fc, #6ee7b7);
        }
        .folio-hint {
          margin: 0;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
        }

        @media (prefers-reduced-transparency: reduce) {
          .folio-lg-fill {
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            background: rgba(22, 24, 36, 0.94) !important;
          }
          .folio-lg-iridescence {
            opacity: 0.25;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .folio-sheet[data-active="true"]::after {
            animation: none !important;
            display: none;
          }
        }

        @media (max-width: 900px) {
          .folio-deck {
            height: min(640px, 72vh);
          }
          .folio-metrics {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .folio-split {
            grid-template-columns: 1fr;
          }
          .folio-split-rule {
            width: 100%;
            height: 1px;
          }
          .folio-row {
            grid-template-columns: 1fr;
            gap: 0.25rem;
          }
          .folio-row-note {
            white-space: normal;
          }
          .folio-sheet-content {
            padding: 1.2rem 1.15rem;
            overflow-y: auto;
          }
        }
      `}</style>
    </section>
  );
}
