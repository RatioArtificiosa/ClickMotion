"use client";

/**
 * HELM — MS-SEC-FAQS03
 * Op-signal FAQ. Not Docket accordion. Not Veil haze.
 * Enter: hard-cut. Signature after land: crop-punch.
 * Language: op-signal · Theme: zebra-salon · Primitive: crop-punch
 * Pair: Helix, Vertex, Terra Nova.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./helm-faq.css";

export type HelmItem = {
  id: string;
  index: string;
  question: string;
  answer: string;
};

const DEFAULT_ITEMS: HelmItem[] = [
  {
    id: "kids",
    index: "01",
    question: "Can I bring my six-year-old Saturday?",
    answer:
      "Yes. Saturday morning is first haircuts and school pictures, and we keep a booster behind the register. Bring a snack. If he wants to sit on your lap for the first two minutes, that is fine.",
  },
  {
    id: "late",
    index: "02",
    question: "What if I am stuck on the bridge?",
    answer:
      "Call from the car. If you are more than fifteen minutes out, we give the chair to whoever is already standing here. We have heard the Kennedy Bridge story three times this week.",
  },
  {
    id: "beard",
    index: "03",
    question: "Is Ryan in on Monday?",
    answer:
      "No. Beards are Tuesday through Friday, hot towel. Monday he is off. If you book a beard on Monday you will get me, and I will tell you to come back Tuesday.",
  },
];

const CUT = getEnter("hard-cut");

type Props = {
  items?: HelmItem[];
  brand?: string;
  place?: string;
};

export default function HelmFaqSection({
  items = DEFAULT_ITEMS,
  brand = "Helm",
  place = "Bardstown Road, Louisville",
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
    count: items.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-FAQS03",
    virtualViewports: 2.4,
  });
  const [punch, setPunch] = useState(reduced);
  const item = items[chapter] ?? items[0]!;

  useEffect(() => {
    if (reduced) {
      setPunch(true);
      return;
    }
    if (!ready) return;
    setPunch(false);
    const t = window.setTimeout(() => setPunch(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="helm-root helm-root--pin"
      aria-label="Helm questions"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-punch={punch ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="helm-stage">
        <header className="helm-masthead helm-enter">
          <div className="helm-brand">{brand}</div>
          <div className="helm-meta">
            {item.index} / {String(items.length).padStart(2, "0")}
          </div>
        </header>

        <div className="helm-body helm-enter">
          <div className="helm-punch">
            <h2 className="helm-question">{item.question}</h2>
          </div>
          <p className="helm-answer">{item.answer}</p>
        </div>

        <div className="helm-foot helm-enter">
          <p className="helm-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
