"use client";

/**
 * PRESS — MS-SEC-STAT02
 * Kinetic-poster proof. Not Tally desks. Not four stat cards.
 * Enter: offset-print. Signature after land: scale-crash.
 * Language: kinetic-poster · Theme: poster-night · Primitive: scale-crash
 * Pair: Revel, Helix, Verve.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./press-stats.css";

export type PressMetric = {
  id: string;
  index: string;
  figure: string;
  name: string;
  period: string;
};

const DEFAULT_METRICS: PressMetric[] = [
  {
    id: "sheets",
    index: "01",
    figure: "1,200",
    name: "Sheets last Friday",
    period:
      "We ran until the yellow ran out. The floor still smelled like ink on Saturday when I came in for coffee.",
  },
  {
    id: "presses",
    index: "02",
    figure: "2",
    name: "Presses that still run",
    period:
      "The Heidelberg on the street side. The proof press in the back. The third one is a table now.",
  },
  {
    id: "start",
    index: "03",
    figure: "4am",
    name: "When we start",
    period:
      "If the job is for Saturday night, the paper is on the bed before the buses, because once the buses start you are already late.",
  },
];

const OFFSET = getEnter("offset-print");

type Props = {
  metrics?: PressMetric[];
  brand?: string;
  place?: string;
};

export default function PressStatsSection({
  metrics = DEFAULT_METRICS,
  brand = "Press",
  place = "Third Ward, Milwaukee",
}: Props) {
  const framerReduced = useReducedMotion() ?? false;
  const [mqReduced, setMqReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMqReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  const reduced = framerReduced || mqReduced;
  const rootRef = useRef<HTMLElement>(null);
  const { entered, landed } = useSectionEnter(rootRef, OFFSET.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: metrics.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-STAT02",
    virtualViewports: 2.4,
  });
  const [crash, setCrash] = useState(reduced);
  const metric = metrics[chapter] ?? metrics[0]!;

  useEffect(() => {
    if (reduced) {
      setCrash(true);
      return;
    }
    if (!ready) return;
    setCrash(false);
    const t = window.setTimeout(() => setCrash(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="press-root press-root--pin"
      aria-label="Press figures"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-crash={crash ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="press-sheet">
        <header className="press-masthead">
          <div className="press-brand">{brand}</div>
          <div className="press-meta">
            {metric.index} / {String(metrics.length).padStart(2, "0")}
          </div>
        </header>

        <div className="press-lockup">
          <p className="press-figure">{metric.figure}</p>
          <h2 className="press-name">{metric.name}</h2>
          <p className="press-period">{metric.period}</p>
        </div>

        <div className="press-foot">
          <p className="press-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
