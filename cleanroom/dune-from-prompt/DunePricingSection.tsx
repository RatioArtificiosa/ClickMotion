"use client";

/**
 * DUNE — MS-SEC-PRIC04
 * Desert inn nights. Not Heat dinner. Not Sol lunch. Not Gilda sittings.
 * Enter: match-cut. Signature after land: vitrine-sweep.
 * Language: solar-gilt · Theme: desert-leaf · Primitive: vitrine-sweep
 * Pair: Elyse, Nomad, Meridian.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./dune-pricing.css";

export type DuneRow = { label: string; value: string };

export type DuneNight = {
  id: string;
  index: string;
  name: string;
  price: string;
  period: string;
  rows: DuneRow[];
};

const DEFAULT_NIGHTS: DuneNight[] = [
  {
    id: "courtyard",
    index: "01",
    name: "Courtyard",
    price: "180",
    period:
      "62 is loud until eleven. After that it is quiet enough that I use this room myself when the others are taken.",
    rows: [
      { label: "Nights", value: "One is fine" },
      { label: "Sleeps", value: "Two" },
      { label: "Book", value: "Call Thursday" },
    ],
  },
  {
    id: "pool",
    index: "02",
    name: "Pool house",
    price: "340",
    period:
      "The water is gone in July. It goes green if I leave it. You get the house, the shade, and a second bed for whoever shows up without calling.",
    rows: [
      { label: "Nights", value: "Two if you can" },
      { label: "Sleeps", value: "Four" },
      { label: "Book", value: "April" },
    ],
  },
  {
    id: "dark",
    index: "03",
    name: "Dark",
    price: "520",
    period:
      "I unplug the internet. Two nights, because one night you just lie there thinking about your phone. I only have one of these.",
    rows: [
      { label: "Nights", value: "Two" },
      { label: "Sleeps", value: "Two" },
      { label: "Book", value: "Ask" },
    ],
  },
];

const CUT = getEnter("match-cut");

type Props = {
  nights?: DuneNight[];
  brand?: string;
  place?: string;
  hours?: string;
};

export default function DunePricingSection({
  nights = DEFAULT_NIGHTS,
  brand = "Dune",
  place = "Highway 62, Twentynine Palms",
  hours = "Check-in after four. Out by eleven.",
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
  const { entered, landed } = useSectionEnter(rootRef, CUT.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: nights.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-PRIC04",
    virtualViewports: 2.4,
  });
  const [sweep, setSweep] = useState(false);
  const night = nights[chapter] ?? nights[0]!;

  useEffect(() => {
    if (reduced) {
      setSweep(false);
      return;
    }
    if (!ready) return;
    setSweep(false);
    const t = window.setTimeout(() => setSweep(true), 40);
    const stop = window.setTimeout(() => setSweep(false), 980);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(stop);
    };
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="dune-root dune-root--pin"
      aria-label="Dune nights"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-sweep={sweep ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="dune-stage">
        <header className="dune-masthead dune-enter">
          <div className="dune-brand">{brand}</div>
          <div className="dune-meta">
            {night.index} / {String(nights.length).padStart(2, "0")}
          </div>
        </header>

        <div className="dune-body dune-enter">
          <h2 className="dune-name">{night.name}</h2>
          <p className="dune-price">
            <span className="dune-price-num">{night.price}</span>
            <span className="dune-sheen" aria-hidden />
          </p>
          <p className="dune-period">{night.period}</p>
          <ul className="dune-rows">
            {night.rows.map((row) => (
              <li key={row.label}>
                <span>{row.label}</span>
                <span>{row.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="dune-foot dune-enter">
          <p className="dune-place">{place}</p>
          <p className="dune-hours">{hours}</p>
        </div>
      </div>
    </section>
  );
}
