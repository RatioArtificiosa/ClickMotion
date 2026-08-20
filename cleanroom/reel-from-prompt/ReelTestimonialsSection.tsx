"use client";

/**
 * REEL — MS-SEC-TEST04
 * Ceramic darkroom proof. Not Ember kiln. Not Kiln bowls. Not Port nights.
 * Enter: blackout-lift. Signature after land: polaroid-develop.
 * Language: ceramic-gloss · Theme: oxblood-glaze · Primitive: polaroid-develop
 * Pair: Elyse, STILL, Aether.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./reel-testimonials.css";

export type ReelVoice = {
  id: string;
  name: string;
  city: string;
  quote: string;
};

const DEFAULT_VOICES: ReelVoice[] = [
  {
    id: "tom",
    name: "Tom Keller",
    city: "Tombstone",
    quote:
      "The wedding roll sat in my glove box for a month. I was sure it was cooked. Tuesday they called. Every frame came up.",
  },
  {
    id: "sarah",
    name: "Sarah Nguyen",
    city: "Sierra Vista",
    quote:
      "I still shoot the shop on film because the digital ones look like every other shop on the highway. I pick up on Fridays before they close.",
  },
  {
    id: "david",
    name: "David Brooks",
    city: "Douglas",
    quote:
      "They wrote my name on the envelope in pencil. I have been coming since the lab was in the back of the camera store, and the pencil has not changed.",
  },
];

const LIFT = getEnter("blackout-lift");

type Props = {
  voices?: ReelVoice[];
  brand?: string;
  place?: string;
};

export default function ReelTestimonialsSection({
  voices = DEFAULT_VOICES,
  brand = "Reel",
  place = "Main Street, Bisbee",
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
  const { entered, landed } = useSectionEnter(rootRef, LIFT.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: voices.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-TEST04",
    virtualViewports: 2.4,
  });
  const [develop, setDevelop] = useState(reduced);
  const voice = voices[chapter] ?? voices[0]!;

  useEffect(() => {
    if (reduced) {
      setDevelop(true);
      return;
    }
    if (!ready) return;
    setDevelop(false);
    const t = window.setTimeout(() => setDevelop(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="reel-root reel-root--pin"
      aria-label="Reel nights"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-develop={develop ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="reel-stage">
        <header className="reel-masthead reel-enter">
          <div className="reel-brand">{brand}</div>
          <div className="reel-meta">
            {String(chapter + 1).padStart(2, "0")} / {String(voices.length).padStart(2, "0")}
          </div>
        </header>

        <div className="reel-body reel-enter">
          <h2 className="reel-quote">{voice.quote}</h2>
          <p className="reel-who">
            {voice.name}
            <span>{voice.city}</span>
          </p>
        </div>

        <div className="reel-foot reel-enter">
          <p className="reel-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
