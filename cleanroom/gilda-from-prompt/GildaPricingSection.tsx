"use client";

/**
 * GILDA — MS-SEC-PRIC03
 * Candy-couture sittings. Not Rouge lips. Not Cairn jewels. Not three kit cards.
 * Enter: hop-in. Signature after land: stack-shuffle.
 * Language: candy-couture · Theme: cherry-lacquer · Primitive: stack-shuffle
 * Pair: Revel, Verve, Dopamine.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./gilda-pricing.css";

export type GildaRow = { label: string; value: string };

export type GildaSitting = {
  id: string;
  index: string;
  name: string;
  price: string;
  period: string;
  rows: GildaRow[];
};

const DEFAULT_SITTINGS: GildaSitting[] = [
  {
    id: "window",
    index: "01",
    name: "Window",
    price: "45",
    period:
      "You sit by the glass on Ocean. Twenty minutes. No book. If nobody is in the window, it is yours.",
    rows: [
      { label: "When", value: "Tuesday to Saturday, after two" },
      { label: "Takes", value: "Twenty minutes" },
      { label: "Book", value: "Walk in" },
    ],
  },
  {
    id: "evening",
    index: "02",
    name: "Evening",
    price: "160",
    period:
      "Come at five. We do the whole face. You leave for dinner on Ocean and we do not see you again until you send a picture from the table.",
    rows: [
      { label: "When", value: "Friday and Saturday, five" },
      { label: "Takes", value: "An hour" },
      { label: "Book", value: "Call Thursday" },
    ],
  },
  {
    id: "inn",
    index: "03",
    name: "Inn",
    price: "420",
    period:
      "We come to the Pine Inn. Two hours. I only take one Saturday in June, because June here is already too much.",
    rows: [
      { label: "When", value: "One Saturday in June" },
      { label: "Takes", value: "Two hours at the inn" },
      { label: "Book", value: "Write in March" },
    ],
  },
];

const HOP = getEnter("hop-in");

type Props = {
  sittings?: GildaSitting[];
  brand?: string;
  place?: string;
  hours?: string;
};

export default function GildaPricingSection({
  sittings = DEFAULT_SITTINGS,
  brand = "Gilda",
  place = "Ocean Avenue, Carmel",
  hours = "Tuesday to Saturday. Closed Sunday.",
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
  const { entered, landed } = useSectionEnter(rootRef, HOP.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: sittings.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-PRIC03",
    virtualViewports: 2.4,
  });
  const [shuffle, setShuffle] = useState(reduced);
  const sitting = sittings[chapter] ?? sittings[0]!;

  useEffect(() => {
    if (reduced) {
      setShuffle(true);
      return;
    }
    if (!ready) return;
    setShuffle(false);
    const t = window.setTimeout(() => setShuffle(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="gilda-root gilda-root--pin"
      aria-label="Gilda sittings"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-shuffle={shuffle ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="gilda-stage">
        <header className="gilda-masthead gilda-enter">
          <div className="gilda-brand">{brand}</div>
          <div className="gilda-meta">
            {sitting.index} / {String(sittings.length).padStart(2, "0")}
          </div>
        </header>

        <div className="gilda-body gilda-enter">
          <div className="gilda-stack" aria-hidden>
            <span className="gilda-ghost gilda-ghost--2" />
            <span className="gilda-ghost gilda-ghost--1" />
          </div>
          <div className="gilda-plate">
            <h2 className="gilda-name">{sitting.name}</h2>
            <p className="gilda-price">{sitting.price}</p>
            <p className="gilda-period">{sitting.period}</p>
            <ul className="gilda-rows">
              {sitting.rows.map((row) => (
                <li key={row.label}>
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gilda-foot gilda-enter">
          <p className="gilda-place">{place}</p>
          <p className="gilda-hours">{hours}</p>
        </div>
      </div>
    </section>
  );
}
