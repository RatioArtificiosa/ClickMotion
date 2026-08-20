"use client";

/**
 * BOLT — MS-SEC-STAT04
 * Optical press figures. Not Optic bands. Not Helm punch. Not Press crash.
 * Enter: shear-slice. Signature after land: duotone-knockout.
 * Language: op-signal · Theme: moire-gallery · Primitive: duotone-knockout
 * Pair: Helix, Vertex, Terra Nova.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./bolt-stats.css";

export type BoltMetric = {
  id: string;
  index: string;
  figure: string;
  name: string;
  period: string;
};

const DEFAULT_METRICS: BoltMetric[] = [
  {
    id: "screen",
    index: "01",
    figure: "175",
    name: "How it looks from the lot",
    period:
      "Tighter than this and the ink fills in. Then your name looks tired before anyone gets close. I checked it from the parking spots we use. This is the number that still reads.",
  },
  {
    id: "pass",
    index: "02",
    figure: "8",
    name: "Minutes a color",
    period:
      "That is once I have a real file. If you are still rendering, get a coffee. Walk it over when it is done.",
  },
  {
    id: "inks",
    index: "03",
    figure: "2",
    name: "Colors on the shelf",
    period:
      "Black, and one I mixed Tuesday because the first pass looked dead on this stock. That is the whole shelf. Two covers most of what comes in.",
  },
];

const SHEAR = getEnter("shear-slice");

type Props = {
  metrics?: BoltMetric[];
  brand?: string;
  place?: string;
};

export default function BoltStatsSection({
  metrics = DEFAULT_METRICS,
  brand = "Bolt",
  place = "San Francisco Street, Flagstaff",
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
  const { entered, landed } = useSectionEnter(rootRef, SHEAR.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: metrics.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-STAT04",
    virtualViewports: 2.4,
  });
  const [knock, setKnock] = useState(reduced);
  const metric = metrics[chapter] ?? metrics[0]!;

  useEffect(() => {
    if (reduced) {
      setKnock(true);
      return;
    }
    if (!ready) return;
    setKnock(false);
    const t = window.setTimeout(() => setKnock(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="bolt-root bolt-root--pin"
      aria-label="Bolt figures"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-knock={knock ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="bolt-stage">
        <header className="bolt-masthead bolt-enter">
          <div className="bolt-brand">{brand}</div>
          <div className="bolt-meta">
            {metric.index} / {String(metrics.length).padStart(2, "0")}
          </div>
        </header>

        <div className="bolt-lockup bolt-enter">
          <div className="bolt-figure-wrap">
            <p className="bolt-knock" aria-hidden>
              {metric.figure}
            </p>
            <p className="bolt-figure">{metric.figure}</p>
          </div>
          <h2 className="bolt-name">{metric.name}</h2>
          <p className="bolt-period">{metric.period}</p>
        </div>

        <div className="bolt-foot bolt-enter">
          <p className="bolt-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
