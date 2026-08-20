"use client";

/**
 * LEDGER — MS-SEC-PRIC01
 * Pin-until-complete investment board. Not three pricing cards.
 * Signature: virtual progress 0→1 restages one typeset plate (Meridian pace).
 * Enter: stamp-settle (elegant letterpress). Signature after land: pin-until-complete.
 * Language: calm-fintech · Theme: print-ledger · Pair: Axiom, Orbit, Nexus.
 *
 * Operator demo only. Public catalog remains video.
 */

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import { enterPose, getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import "./ledger-pricing.css";

const STAMP = getEnter("stamp-settle");

export type LedgerRow = { label: string; value: string };

export type LedgerPlan = {
  id: string;
  index: string;
  name: string;
  price: string;
  period: string;
  recommended?: boolean;
  rows: LedgerRow[];
};

const DEFAULT_PLANS: LedgerPlan[] = [
  {
    id: "studio",
    index: "01",
    name: "Studio",
    price: "0",
    period: "Fake money, one builder, until you trust the rail. That is the point.",
    rows: [
      { label: "Clearing", value: "Sandbox rails, delayed print" },
      { label: "Operators", value: "One builder seat" },
      { label: "Settlement", value: "T+2 simulated" },
      { label: "Audit", value: "Self-serve logs" },
      { label: "Support", value: "Library hours" },
    ],
  },
  {
    id: "firm",
    index: "02",
    name: "Firm",
    price: "480",
    period: "A working team. Three named people. Live rails. Billed monthly.",
    rows: [
      { label: "Clearing", value: "Live rails, firm overlay" },
      { label: "Operators", value: "Three named seats" },
      { label: "Settlement", value: "T+1 internal" },
      { label: "Audit", value: "Monthly pack you can hand to finance" },
      { label: "Support", value: "Desk hours, same region" },
    ],
  },
  {
    id: "seat",
    index: "03",
    name: "Seat",
    price: "2,400",
    period: "Your name on the house ledger, a desk that answers, and the pack when audit asks.",
    recommended: true,
    rows: [
      { label: "Clearing", value: "Included on the house book" },
      { label: "Operators", value: "Named desk, one primary" },
      { label: "Settlement", value: "T+0 internal" },
      { label: "Audit", value: "SOC 2 Type II pack" },
      { label: "Support", value: "Priority desk, 24×5" },
      { label: "Terms", value: "Annual seat, 30-day notice" },
    ],
  },
  {
    id: "house",
    index: "04",
    name: "House",
    price: "Letter",
    period: "Dedicated instance, your committee, your cutoff. This is a letter, not a page on the website.",
    rows: [
      { label: "Clearing", value: "Dedicated instance" },
      { label: "Operators", value: "Your committee, mapped" },
      { label: "Settlement", value: "Your cutoff, our rails" },
      { label: "Audit", value: "On-prem or private cloud pack" },
      { label: "Support", value: "Named partners, 24×7" },
      { label: "Terms", value: "By letter. Board review." },
    ],
  },
];

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

/** Map global 0–1 to intro (0) then plans 0–3 with dwell on Seat. */
function chapterFromProgress(p: number): { kind: "intro" | "plan"; plan: number; local: number } {
  if (p < 0.1) return { kind: "intro", plan: 0, local: p / 0.1 };
  const windows: [number, number][] = [
    [0.1, 0.3],
    [0.3, 0.5],
    [0.5, 0.78],
    [0.78, 1],
  ];
  for (let i = 0; i < windows.length; i++) {
    const [a, b] = windows[i]!;
    if (p <= b || i === windows.length - 1) {
      const local = clamp01((p - a) / (b - a));
      return { kind: "plan", plan: i, local };
    }
  }
  return { kind: "plan", plan: 3, local: 1 };
}

type Props = {
  plans?: LedgerPlan[];
  kicker?: string;
  introLine?: string;
  ctaLabel?: string;
  /** Wheel distance in viewports (Meridian gold = 3.2). */
  virtualViewports?: number;
};

export default function LedgerPricingSection({
  plans = DEFAULT_PLANS,
  kicker = "Investment",
  introLine = "What it costs to sit here.",
  ctaLabel = "Ask about a seat",
  virtualViewports = 3.2,
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const touchYRef = useRef<number | null>(null);
  const reduced = useReducedMotion() ?? false;
  const { entered, landed } = useSectionEnter(rootRef, STAMP.landMs);
  const live = landed;

  const raw = useMotionValue(reduced ? 0.64 : 0);
  const progress = useSpring(raw, { stiffness: 88, damping: 28, restDelta: 0.0008 });

  const fill = useTransform(progress, [0, 1], [0, 1]);
  const [pNow, setPNow] = useState(reduced ? 0.64 : 0);

  useMotionValueEvent(progress, "change", (v) => setPNow(v));

  const ch = chapterFromProgress(pNow);
  const activePlan = ch.kind === "plan" ? ch.plan : 0;
  const intro = ch.kind === "intro";
  const plan = plans[activePlan] ?? plans[0]!;

  useEffect(() => {
    if (reduced) return;
    const api = {
      setProgress: (p: number) => raw.set(clamp01(p)),
      getProgress: () => raw.get(),
      productId: "MS-SEC-PRIC01",
    };
    const w = window as Window & { __msScrollNarrative?: typeof api };
    w.__msScrollNarrative = api;
    return () => {
      if (w.__msScrollNarrative === api) delete w.__msScrollNarrative;
    };
  }, [raw, reduced]);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    const virtualDistance = () => {
      const vh = window.innerHeight || 800;
      return Math.max(vh * 2.4, virtualViewports * vh);
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
      const step = virtualDistance() * 0.045;
      let delta = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        delta = e.key === "PageDown" ? step * 2.2 : step;
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        delta = e.key === "PageUp" ? -step * 2.2 : -step;
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
  }, [raw, reduced, virtualViewports, landed]);

  const jumpToPlan = (i: number) => {
    if (!live) return;
    const starts = [0.18, 0.38, 0.62, 0.88];
    raw.set(starts[i] ?? 0.62);
  };

  const meta = intro
      ? "The house"
      : `${plan.index} of ${String(plans.length).padStart(2, "0")} · ${plan.recommended ? "Recommended" : "Schedule"}`;

  const formatPrice = (price: string) => {
    if (price === "Letter") return "Letter";
    if (price === "0") return "0";
    return (
      <>
        <span className="ledger-price-sym">$</span>
        {price}
      </>
    );
  };

  return (
    <section
      ref={rootRef}
      className={`ledger-root${reduced ? " ledger-root--static" : " ledger-root--pin"}`}
      data-ledger-pin={reduced ? "false" : "true"}
      data-entered={entered ? "true" : "false"}
      data-landed={landed ? "true" : "false"}
      aria-label="Ledger investment board"
    >
      <div className="ledger-grain" aria-hidden />
      <div className="ledger-progress" aria-hidden>
        <motion.span className="ledger-progress-fill" style={{ scaleX: fill }} />
      </div>

      <div className="ledger-stage">
        <header className="ledger-masthead">
          <motion.div
            className="ledger-brand"
            initial={false}
            animate={enterPose(entered, STAMP)}
            transition={{ ...STAMP.transition, delay: 0 }}
          >
            Ledger
          </motion.div>
          <motion.div
            className="ledger-meta"
            initial={false}
            animate={enterPose(entered, STAMP)}
            transition={{ ...STAMP.transition, delay: 0.06 }}
          >
            {meta}
          </motion.div>
          <motion.span
            className="ledger-masthead-rule"
            aria-hidden
            initial={false}
            animate={{ scaleX: entered ? 1 : 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
          />
        </header>

        <div className="ledger-body">
          <nav className="ledger-index" aria-label="Plans">
            {plans.map((pl, i) => (
              <motion.button
                key={pl.id}
                type="button"
                data-active={!intro && activePlan === i ? "true" : "false"}
                onClick={() => jumpToPlan(i)}
                tabIndex={live ? undefined : -1}
                initial={false}
                animate={enterPose(entered, STAMP)}
                transition={{ ...STAMP.transition, delay: 0.14 + i * STAMP.stagger }}
              >
                {pl.index} {pl.name}
              </motion.button>
            ))}
          </nav>

          <div className="ledger-main">
            <motion.p
              className="ledger-kicker"
              initial={false}
              animate={enterPose(entered, STAMP)}
              transition={{ ...STAMP.transition, delay: 0.12 }}
            >
              {intro ? kicker : plan.recommended ? `${kicker} · recommended` : kicker}
            </motion.p>

            <div className="ledger-display" aria-live="polite">
              <motion.div
                className="ledger-plan-slot"
                aria-hidden={!intro}
                initial={false}
                animate={{
                  opacity: entered && intro ? 1 : 0,
                  y: entered && intro ? 0 : intro ? 22 : -12,
                  scale: entered && intro ? 1 : 0.988,
                }}
                transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: entered ? 0.18 : 0 }}
                style={{ pointerEvents: intro ? "auto" : "none" }}
              >
                <h2 className="ledger-name">{introLine}</h2>
                <p className="ledger-period">Four seats. Terms on paper.</p>
              </motion.div>
              {plans.map((pl, i) => {
                const on = !intro && activePlan === i;
                return (
                  <motion.div
                    key={pl.id}
                    className="ledger-plan-slot"
                    aria-hidden={!on}
                    initial={false}
                    animate={{
                      opacity: on ? 1 : 0,
                      y: on ? 0 : 18,
                    }}
                    transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                    style={{ pointerEvents: on ? "auto" : "none" }}
                  >
                    <h2 className="ledger-name">
                      {pl.name}
                      {pl.recommended ? (
                        <span className="ledger-recommended">Recommended</span>
                      ) : null}
                    </h2>
                    <p className="ledger-price">{formatPrice(pl.price)}</p>
                    <p className="ledger-period">{pl.period}</p>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="ledger-rule"
              aria-hidden
              style={{ scaleX: intro ? fill : 1 }}
            />

            <dl className="ledger-rows">
              {(intro ? [] : plan.rows).map((row, i) => (
                <motion.div
                  key={`${plan.id}-${row.label}`}
                  className="ledger-row"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.38,
                    delay: Math.min(i * 0.05, 0.24),
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </motion.div>
              ))}
            </dl>

            <div className="ledger-foot">
              <div className="ledger-rail" role="tablist" aria-label="Seat schedule">
                {plans.map((pl, i) => (
                  <motion.button
                    key={pl.id}
                    type="button"
                    role="tab"
                    aria-selected={!intro && activePlan === i}
                    data-active={!intro && activePlan === i ? "true" : "false"}
                    onClick={() => jumpToPlan(i)}
                    tabIndex={live ? undefined : -1}
                    initial={false}
                    animate={enterPose(entered, STAMP)}
                    transition={{ ...STAMP.transition, delay: 0.28 + i * 0.05 }}
                  >
                    {pl.name}
                    <span className="ledger-rail-price">
                      {pl.price === "Letter" ? "Letter" : pl.price === "0" ? "0" : `$${pl.price}`}
                    </span>
                  </motion.button>
                ))}
              </div>
              <motion.button
                type="button"
                className="ledger-cta"
                initial={false}
                animate={enterPose(entered, STAMP)}
                transition={{ ...STAMP.transition, delay: 0.42 }}
                whileTap={live && !reduced ? { scale: 0.98 } : undefined}
                tabIndex={live ? undefined : -1}
              >
                {ctaLabel}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
