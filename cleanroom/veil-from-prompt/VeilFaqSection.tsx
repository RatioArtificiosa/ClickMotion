"use client";

/**
 * VEIL — MS-SEC-FAQS02
 * Velvet-nocturne FAQ. Not Docket accordion. Not a click index.
 * Enter: silk-slip. Signature after land: perfume-haze.
 * Language: velvet-nocturne · Theme: ultraviolet-silk · Primitive: perfume-haze
 * Pair: Revel, Sable, Dopamine.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./veil-faq.css";

export type VeilItem = {
  id: string;
  index: string;
  question: string;
  answer: string;
};

const DEFAULT_ITEMS: VeilItem[] = [
  {
    id: "hours",
    index: "01",
    question: "When do you close on Saturday?",
    answer:
      "Six, unless a wedding is picking up boxes. Then we stay and tie them. If you need ribbon, it is in the drawer by the register. Call before you drive in from the islands.",
  },
  {
    id: "skin",
    index: "02",
    question: "Can I try it on my skin, not the paper?",
    answer:
      "Please do. Gardenia sits heavy in August, and paper in this humidity will lie to you. Give it five minutes on your wrist before you decide.",
  },
  {
    id: "ship",
    index: "03",
    question: "Will you ship a bottle in July?",
    answer:
      "Not glass. It cooks in the truck between here and Atlanta. Come get it, or wait until September. We will hold it.",
  },
];

const SLIP = getEnter("silk-slip");

type Props = {
  items?: VeilItem[];
  brand?: string;
  place?: string;
};

export default function VeilFaqSection({
  items = DEFAULT_ITEMS,
  brand = "Veil",
  place = "Broughton Street, Savannah",
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
  const { entered, landed } = useSectionEnter(rootRef, SLIP.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: items.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-FAQS02",
    virtualViewports: 2.4,
  });
  const [haze, setHaze] = useState(reduced);
  const item = items[chapter] ?? items[0]!;

  useEffect(() => {
    if (reduced) {
      setHaze(true);
      return;
    }
    if (!ready) return;
    setHaze(false);
    const t = window.setTimeout(() => setHaze(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="veil-root veil-root--pin"
      aria-label="Veil questions"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-haze={haze ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="veil-stage">
        <header className="veil-masthead veil-enter">
          <div className="veil-brand">{brand}</div>
          <div className="veil-meta">
            {item.index} / {String(items.length).padStart(2, "0")}
          </div>
        </header>

        <div className="veil-body veil-enter">
          <h2 className="veil-question">{item.question}</h2>
          <p className="veil-answer">{item.answer}</p>
        </div>

        <div className="veil-foot veil-enter">
          <p className="veil-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
