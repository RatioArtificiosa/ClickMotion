"use client";

/**
 * SLIP — MS-SEC-FAQS04
 * Celadon tile FAQ. Not Kiln bowls. Not Helm barber. Not Ember kiln notes.
 * Enter: typeset-rise. Signature after land: mercury-morph.
 * Language: ceramic-gloss · Theme: celadon-wet · Primitive: mercury-morph
 * Pair: Elyse, STILL, Aether.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./slip-faq.css";

export type SlipItem = {
  id: string;
  index: string;
  question: string;
  answer: string;
};

const DEFAULT_ITEMS: SlipItem[] = [
  {
    id: "hex",
    index: "01",
    question: "Can you match the green in my grandmother's bath?",
    answer:
      "Bring a piece. A corner is enough. I mix until I can't tell hers from mine when they are sitting together. That is usually two test plates.",
  },
  {
    id: "floors",
    index: "02",
    question: "I was going to put it on the kitchen floor.",
    answer:
      "It looks beautiful for a year and then it does not. I learned that the expensive way. Walls. The hearth if you have one.",
  },
  {
    id: "dozen",
    index: "03",
    question: "It's only a dozen tiles.",
    answer:
      "That is alright. It still has to wait on the kiln, so six weeks is real. Once in a while a bigger job leaves extras. When that happens I call.",
  },
];

const RISE = getEnter("typeset-rise");

type Props = {
  items?: SlipItem[];
  brand?: string;
  place?: string;
};

export default function SlipFaqSection({
  items = DEFAULT_ITEMS,
  brand = "Slip",
  place = "Marshall Street, North Adams",
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
  const { entered, landed } = useSectionEnter(rootRef, RISE.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: items.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-FAQS04",
    virtualViewports: 2.4,
  });
  const [morph, setMorph] = useState(reduced);
  const item = items[chapter] ?? items[0]!;

  useEffect(() => {
    if (reduced) {
      setMorph(true);
      return;
    }
    if (!ready) return;
    setMorph(false);
    const t = window.setTimeout(() => setMorph(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="slip-root slip-root--pin"
      aria-label="Slip questions"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-morph={morph ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="slip-stage">
        <header className="slip-masthead slip-enter">
          <div className="slip-brand">{brand}</div>
          <div className="slip-meta">
            {item.index} / {String(items.length).padStart(2, "0")}
          </div>
        </header>

        <div className="slip-body">
          <div className="slip-rise">
            <h2 className="slip-question">{item.question}</h2>
          </div>
          <div className="slip-plate">
            <p className="slip-answer">{item.answer}</p>
          </div>
        </div>

        <div className="slip-foot slip-enter">
          <p className="slip-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
