"use client";

/**
 * TALLY — MS-SEC-STAT01
 * Desk proof board. Not four stat cards. Not a bouncing ticker.
 * Enter: settle-trade. Signature after land: count-on-scroll.
 * Language: calm-fintech · Theme: stripe-trust-light · Primitive: count-on-scroll
 * Pair: Axiom, Orbit, Nexus, Zero Energy.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./tally-stats.css";

export type TallyRow = { label: string; value: string };

export type TallyMetric = {
  id: string;
  index: string;
  name: string;
  target: number;
  decimals: number;
  prefix?: string;
  suffix: string;
  period: string;
  rows: TallyRow[];
};

const DEFAULT_METRICS: TallyMetric[] = [
  {
    id: "path",
    index: "01",
    name: "Decision path",
    target: 12,
    decimals: 0,
    suffix: "µs",
    period: "Secaucus. Twelve microseconds, median, last quarter. That is the number we will put on paper. The marketing number is faster and we do not use it.",
    rows: [
      { label: "Venue", value: "Secaucus, New Jersey" },
      { label: "Clock", value: "Median, last quarter" },
      { label: "Paper", value: "On the desk blotter" },
    ],
  },
  {
    id: "uptime",
    index: "02",
    name: "Match uptime",
    target: 99.99,
    decimals: 2,
    suffix: "%",
    period: "Mahwah. If the match cannot hold, it does not open. 99.99 is the year, not a slogan.",
    rows: [
      { label: "Venue", value: "Mahwah, New Jersey" },
      { label: "Clock", value: "Trailing twelve months" },
      { label: "Paper", value: "Written in the SOC pack" },
    ],
  },
  {
    id: "notional",
    index: "03",
    name: "Notional",
    target: 4.2,
    decimals: 1,
    prefix: "$",
    suffix: "B",
    period: "Chicago Loop. 4.2 billion cleared last session, on the house book at the end of the day. Not a press release.",
    rows: [
      { label: "Venue", value: "Chicago Loop" },
      { label: "Clock", value: "Cleared, last session" },
      { label: "Paper", value: "House book, end of day" },
    ],
  },
  {
    id: "seats",
    index: "04",
    name: "Floor seats",
    target: 18,
    decimals: 0,
    suffix: "desks",
    period: "Fulton Street. Eighteen named desks, one book. If someone leaves, the seat is reissued. It is not a login on a shared screen.",
    rows: [
      { label: "Floor", value: "Fulton Street, New York" },
      { label: "Seats", value: "Named, on the blotter" },
      { label: "Paper", value: "One primary, one relief" },
    ],
  },
];

const SETTLE = getEnter("settle-trade");
const COUNT_MS = 900;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function formatCount(value: number, metric: TallyMetric) {
  const n = metric.decimals === 0 ? Math.round(value) : Number(value.toFixed(metric.decimals));
  const body = metric.decimals === 0 ? String(n) : n.toFixed(metric.decimals);
  return `${metric.prefix ?? ""}${body}`;
}

function useCount(
  target: number,
  play: number,
  run: boolean,
  reduced: boolean,
) {
  const [value, setValue] = useState(reduced ? target : 0);
  const [progress, setProgress] = useState(reduced ? 1 : 0);

  useEffect(() => {
    if (!run || reduced) {
      setValue(target);
      setProgress(1);
      return;
    }
    let cancelled = false;
    setValue(0);
    setProgress(0);
    const t0 = performance.now();
    const step = () => {
      if (cancelled) return;
      const t = Math.min(1, (performance.now() - t0) / COUNT_MS);
      const eased = easeOutCubic(t);
      setValue(t >= 1 ? target : target * eased);
      setProgress(eased);
    };
    step();
    const pulse = window.setInterval(step, 32);
    const snap = window.setTimeout(() => {
      if (cancelled) return;
      window.clearInterval(pulse);
      setValue(target);
      setProgress(1);
    }, COUNT_MS);
    return () => {
      cancelled = true;
      window.clearInterval(pulse);
      window.clearTimeout(snap);
    };
  }, [target, play, run, reduced]);

  return { value, progress };
}

type Props = {
  metrics?: TallyMetric[];
  brand?: string;
  kicker?: string;
  ctaLabel?: string;
};

export default function TallyStatsSection({
  metrics = DEFAULT_METRICS,
  brand = "Tally",
  kicker = "Proof",
  ctaLabel = "Send me last quarter",
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLElement>(null);
  const { entered, landed } = useSectionEnter(rootRef, SETTLE.landMs);
  const { progress: pinP, chapter } = useChapterPin(rootRef, {
    count: metrics.length,
    landed,
    reduced,
    productId: "MS-SEC-STAT01",
    virtualViewports: 2.8,
  });
  const [play, setPlay] = useState(0);
  const metric = metrics[chapter] ?? metrics[0]!;
  const { value, progress } = useCount(metric.target, play, landed, reduced);

  useEffect(() => {
    if (!landed) return;
    setPlay((n) => n + 1);
  }, [chapter, landed]);

  return (
    <section
      ref={rootRef}
      className="tally-root tally-root--pin"
      aria-label="Tally proof"
      data-entered={entered ? "true" : "false"}
      data-landed={landed ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(pinP) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="tally-stage">
        <header className="tally-masthead tally-enter" style={{ transitionDelay: "0ms" }}>
          <div className="tally-brand">{brand}</div>
          <div className="tally-meta">
            {String(chapter + 1).padStart(2, "0")} / {String(metrics.length).padStart(2, "0")}
          </div>
        </header>

        <p className="tally-kicker tally-enter" style={{ transitionDelay: "55ms" }}>
          {kicker}
        </p>

        <div className="tally-plate tally-enter" style={{ transitionDelay: "110ms" }} aria-live="polite">
          <p className="tally-figure">
            <span className="tally-num">
              {formatCount(value, metric)}
              {metric.suffix === "%" ? "%" : ""}
            </span>
            {metric.suffix !== "%" ? <span className="tally-unit">{metric.suffix}</span> : null}
          </p>
          <span
            className="tally-count-rule"
            aria-hidden
            style={{ transform: `scaleX(${progress})` }}
          />
          <h2 className="tally-name">{metric.name}</h2>
          <p className="tally-period">{metric.period}</p>
          <dl className="tally-rows">
            {metric.rows.map((row) => (
              <div key={`${metric.id}-${row.label}`} className="tally-row">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="tally-foot tally-enter" style={{ transitionDelay: "220ms" }}>
          <button type="button" className="tally-cta" tabIndex={landed ? undefined : -1}>
            {ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
