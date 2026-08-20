"use client";

/**
 * PEARL — MS-SEC-STAT03
 * Jewel-chrome proof. Not Facet try-on. Not Tally desks. Not Press crash.
 * Enter: pin-drop. Signature after land: sequin-burst (12 dots, once).
 * Language: jewel-chrome · Theme: vitrine-platinum · Primitive: sequin-burst
 * Pair: Prism, Mirage, Elyse.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./pearl-stats.css";

export type PearlMetric = {
  id: string;
  index: string;
  figure: string;
  name: string;
  period: string;
};

const DEFAULT_METRICS: PearlMetric[] = [
  {
    id: "strands",
    index: "01",
    figure: "14",
    name: "Strands that left this week",
    period:
      "Fourteen went out the door on Thames. I do not count the ones people try on and put back. Those are still here.",
  },
  {
    id: "clasps",
    index: "02",
    figure: "3",
    name: "Clasps we rebuilt",
    period:
      "Salt air eats the little ones. Three came back this month. We rebuild them. We do not tell people to stop swimming.",
  },
  {
    id: "aunt",
    index: "03",
    figure: "1",
    name: "Aunt's necklace, Tuesday",
    period:
      "The silk had gone brown. She brought it in a handkerchief. We restrung it Tuesday and called her before lunch.",
  },
];

const DOTS = Array.from({ length: 12 }, (_, i) => i);
const DROP = getEnter("pin-drop");

type Props = {
  metrics?: PearlMetric[];
  brand?: string;
  place?: string;
};

export default function PearlStatsSection({
  metrics = DEFAULT_METRICS,
  brand = "Pearl",
  place = "Thames Street, Newport",
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
  const { entered, landed } = useSectionEnter(rootRef, DROP.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: metrics.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-STAT03",
    virtualViewports: 2.4,
  });
  const [burst, setBurst] = useState(false);
  const metric = metrics[chapter] ?? metrics[0]!;

  useEffect(() => {
    if (reduced) {
      setBurst(false);
      return;
    }
    if (!ready) return;
    setBurst(false);
    const t = window.setTimeout(() => setBurst(true), 40);
    const stop = window.setTimeout(() => setBurst(false), 520);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(stop);
    };
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="pearl-root pearl-root--pin"
      aria-label="Pearl figures"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-burst={burst ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="pearl-stage">
        <header className="pearl-masthead pearl-enter">
          <div className="pearl-brand">{brand}</div>
          <div className="pearl-meta">
            {metric.index} / {String(metrics.length).padStart(2, "0")}
          </div>
        </header>

        <div className="pearl-lockup pearl-enter">
          <div className="pearl-figure-wrap">
            <p className="pearl-figure">{metric.figure}</p>
            <div className="pearl-burst" aria-hidden>
              {DOTS.map((i) => (
                <span
                  key={i}
                  className="pearl-dot"
                  style={{ ["--a" as string]: `${i * 30}deg`, ["--i" as string]: String(i) }}
                />
              ))}
            </div>
          </div>
          <h2 className="pearl-name">{metric.name}</h2>
          <p className="pearl-period">{metric.period}</p>
        </div>

        <div className="pearl-foot pearl-enter">
          <p className="pearl-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
