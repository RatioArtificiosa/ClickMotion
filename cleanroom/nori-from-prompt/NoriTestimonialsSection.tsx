"use client";

/**
 * NORI — MS-SEC-TEST03
 * Candy-couture proof. Not Port nights. Not Witness takeover.
 * Enter: pop-in. Signature after land: jelly-morph.
 * Language: candy-couture · Theme: pistachio-salon · Primitive: jelly-morph
 * Pair: Revel, Verve, Dopamine.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./nori-testimonials.css";

export type NoriVoice = {
  id: string;
  name: string;
  city: string;
  quote: string;
};

const DEFAULT_VOICES: NoriVoice[] = [
  {
    id: "lisa",
    name: "Lisa Park",
    city: "Ann Arbor",
    quote:
      "My daughter has swim at 4:15 on Thursdays. We come here after, and she orders the same pistachio every time. I stopped pretending I would talk her into anything else.",
  },
  {
    id: "tom",
    name: "Tom Harris",
    city: "Ypsilanti",
    quote:
      "I work two blocks over. If I have twelve minutes and I do not want to eat at my desk, this is where those minutes go.",
  },
  {
    id: "nina",
    name: "Nina Brooks",
    city: "Dexter",
    quote:
      "We ate it in the car in August because she would not wait. It was already running down her wrist before I started the engine.",
  },
];

const POP = getEnter("pop-in");

type Props = {
  voices?: NoriVoice[];
  brand?: string;
  place?: string;
};

export default function NoriTestimonialsSection({
  voices = DEFAULT_VOICES,
  brand = "Nori",
  place = "Kerrytown, Ann Arbor",
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
  const { entered, landed } = useSectionEnter(rootRef, POP.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: voices.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-TEST03",
    virtualViewports: 2.4,
  });
  const [jelly, setJelly] = useState(reduced);
  const voice = voices[chapter] ?? voices[0]!;

  useEffect(() => {
    if (reduced) {
      setJelly(true);
      return;
    }
    if (!ready) return;
    setJelly(false);
    const t = window.setTimeout(() => setJelly(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="nori-root nori-root--pin"
      aria-label="Nori nights"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-jelly={jelly ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="nori-stage">
        <header className="nori-masthead nori-enter">
          <div className="nori-brand">{brand}</div>
          <div className="nori-meta">
            {String(chapter + 1).padStart(2, "0")} / {String(voices.length).padStart(2, "0")}
          </div>
        </header>

        <div className="nori-body nori-enter">
          <h2 className="nori-quote">{voice.quote}</h2>
          <p className="nori-who">
            {voice.name}
            <span>{voice.city}</span>
          </p>
        </div>

        <div className="nori-foot nori-enter">
          <p className="nori-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
