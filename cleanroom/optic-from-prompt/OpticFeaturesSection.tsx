"use client";

/**
 * OPTIC — MS-SEC-FEAT06
 * Op-signal features. Black and white only. Not a stripe kit. Not infinite loop.
 * Enter: hard-cut. Signature after land: moire-shift (once).
 * Language: op-signal · Theme: moire-gallery · Primitive: moire-shift
 * Pair: Helix, Vertex, Terra Nova.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./optic-features.css";

export type OpticRoom = {
  id: string;
  index: string;
  name: string;
  period: string;
};

const DEFAULT_ROOMS: OpticRoom[] = [
  {
    id: "front",
    index: "01",
    name: "Front room",
    period:
      "Two paintings in the front room right now, both facing the street so you see them before you decide to come in. That is on purpose.",
  },
  {
    id: "side",
    index: "02",
    name: "Side wall",
    period:
      "Works on paper live on the side wall, out of the sun. If you want to look at them, ask. We will take them down.",
  },
  {
    id: "yard",
    index: "03",
    name: "Yard",
    period:
      "The yard stays open until the light goes, which in June is late. We do not put sculpture out there in August. It cooks.",
  },
];

const CUT = getEnter("hard-cut");

type Props = {
  rooms?: OpticRoom[];
  brand?: string;
  place?: string;
};

export default function OpticFeaturesSection({
  rooms = DEFAULT_ROOMS,
  brand = "Optic",
  place = "Marfa, Texas",
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
    count: rooms.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-FEAT06",
    virtualViewports: 2.4,
  });
  const [shift, setShift] = useState(0);
  const room = rooms[chapter] ?? rooms[0]!;

  useEffect(() => {
    if (reduced || !ready) return;
    setShift((n) => n + 1);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="optic-root optic-root--pin"
      aria-label="Optic rooms"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="optic-bands" aria-hidden />
      {shift > 0 && !reduced ? (
        <div key={shift} className="optic-moire" aria-hidden />
      ) : null}
      <div className="optic-stage">
        <header className="optic-masthead optic-enter">
          <div className="optic-brand">{brand}</div>
          <div className="optic-meta">
            {room.index} / {String(rooms.length).padStart(2, "0")}
          </div>
        </header>

        <div className="optic-body optic-enter">
          <h2 className="optic-name">{room.name}</h2>
          <p className="optic-period">{room.period}</p>
        </div>

        <div className="optic-foot optic-enter">
          <p className="optic-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
