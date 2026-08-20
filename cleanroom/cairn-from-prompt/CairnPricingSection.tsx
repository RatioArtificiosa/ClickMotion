"use client";

/**
 * CAIRN — MS-SEC-PRIC02
 * Jewel-chrome sittings. Not Ledger desks. Not three pricing cards.
 * Enter: iris-open. Signature after land: wax-seal.
 * Language: jewel-chrome · Theme: carnelian-black · Primitive: wax-seal
 * Pair: Prism, Mirage, Elyse.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./cairn-pricing.css";

export type CairnRow = { label: string; value: string };

export type CairnSitting = {
  id: string;
  index: string;
  name: string;
  price: string;
  period: string;
  sealed?: boolean;
  rows: CairnRow[];
};

const DEFAULT_SITTINGS: CairnSitting[] = [
  {
    id: "look",
    index: "01",
    name: "Look",
    price: "No fee",
    period:
      "Tuesday is the quiet day. Bring whoever has to like it, because we have watched too many rings come back on Thursday. Nothing leaves the case unless you say so.",
    rows: [
      { label: "Hours", value: "Tuesday, 11 to 4" },
      { label: "With", value: "The floor, no appointment" },
      { label: "Takes", value: "The piece stays" },
    ],
  },
  {
    id: "keep",
    index: "02",
    name: "Keep",
    price: "420 to hold",
    period:
      "Four hundred twenty holds it in the drawer for ten days. We call you Wednesday so it does not sit there while you talk yourself out of it.",
    sealed: true,
    rows: [
      { label: "Hours", value: "Thursday, 11 to 5" },
      { label: "With", value: "A named sitting" },
      { label: "Takes", value: "Held ten days" },
    ],
  },
  {
    id: "make",
    index: "03",
    name: "Make",
    price: "On the bench",
    period:
      "You already picked the stone. Three weeks on the bench. We text when it is ready to pick up on Benefit, not before, because I will not promise a Friday if it is still in polish.",
    rows: [
      { label: "Hours", value: "By letter" },
      { label: "With", value: "The bench, one maker" },
      { label: "Takes", value: "Three weeks" },
    ],
  },
];

const IRIS = getEnter("iris-open");

type Props = {
  sittings?: CairnSitting[];
  brand?: string;
  place?: string;
  hours?: string;
};

export default function CairnPricingSection({
  sittings = DEFAULT_SITTINGS,
  brand = "Cairn",
  place = "Benefit Street, Providence",
  hours = "Tuesday try-on. Thursday hold.",
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
  const { entered, landed } = useSectionEnter(rootRef, IRIS.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: sittings.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-PRIC02",
    virtualViewports: 2.4,
  });
  const [seal, setSeal] = useState(false);
  const sitting = sittings[chapter] ?? sittings[0]!;
  const showSeal = Boolean(sitting.sealed);

  useEffect(() => {
    if (!showSeal) {
      setSeal(false);
      return;
    }
    if (reduced) {
      setSeal(true);
      return;
    }
    if (!ready) return;
    setSeal(false);
    const t = window.setTimeout(() => setSeal(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced, showSeal]);

  return (
    <section
      ref={rootRef}
      className="cairn-root cairn-root--pin"
      aria-label="Cairn sittings"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-seal={seal ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="cairn-iris">
        <div className="cairn-stage">
          <header className="cairn-masthead">
            <div className="cairn-brand">{brand}</div>
            <div className="cairn-meta">
              {sitting.index} / {String(sittings.length).padStart(2, "0")}
            </div>
          </header>

          <div className="cairn-body">
            <div className="cairn-name-row">
              <h2 className="cairn-name">{sitting.name}</h2>
              {showSeal ? (
                <div className="cairn-seal" aria-hidden>
                  <span>C</span>
                </div>
              ) : null}
            </div>
            <p className="cairn-price">{sitting.price}</p>
            <p className="cairn-period">{sitting.period}</p>
            <ul className="cairn-rows">
              {sitting.rows.map((row) => (
                <li key={row.label}>
                  <span>{row.label}</span>
                  <span>{row.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cairn-foot">
            <p className="cairn-place">{place}</p>
            <p className="cairn-hours">{hours}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
