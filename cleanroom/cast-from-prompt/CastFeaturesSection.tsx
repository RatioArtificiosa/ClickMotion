"use client";

/**
 * CAST — MS-SEC-FEAT05
 * Resin-object features. Not a product grid. Not a 3D kit.
 * Enter: fade-hold. Signature after land: flip-clamshell.
 * Language: resin-object · Theme: resin-amber · Primitive: flip-clamshell
 * Pair: Prism, Mirage, Verve.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./cast-features.css";

export type CastObject = {
  id: string;
  index: string;
  name: string;
  period: string;
};

const DEFAULT_OBJECTS: CastObject[] = [
  {
    id: "lamp",
    index: "01",
    name: "Lamp",
    period:
      "It sits on the desk and gets warm, not hot. I leave it on when I go to the kitchen so the room is not dark when I come back.",
  },
  {
    id: "tray",
    index: "02",
    name: "Tray",
    period:
      "Keys, mail, the thing you were supposed to take upstairs. That is what it is for. It does not try to be a sculpture.",
  },
  {
    id: "clock",
    index: "03",
    name: "Clock",
    period:
      "You can hear it from the kitchen, which is why people buy it. Not because it looks like a clock in a catalog.",
  },
];

const FADE = getEnter("fade-hold");

type Props = {
  objects?: CastObject[];
  brand?: string;
  place?: string;
};

export default function CastFeaturesSection({
  objects = DEFAULT_OBJECTS,
  brand = "Cast",
  place = "Warren Street, Hudson",
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
  const { entered, landed } = useSectionEnter(rootRef, FADE.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: objects.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-FEAT05",
    virtualViewports: 2.4,
  });
  const [open, setOpen] = useState(reduced);
  const object = objects[chapter] ?? objects[0]!;

  useEffect(() => {
    if (reduced) {
      setOpen(true);
      return;
    }
    if (!ready) return;
    setOpen(false);
    const t = window.setTimeout(() => setOpen(true), 80);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="cast-root cast-root--pin"
      aria-label="Cast objects"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-open={open ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="cast-stage">
        <header className="cast-masthead cast-enter">
          <div className="cast-brand">{brand}</div>
          <div className="cast-meta">
            {object.index} / {String(objects.length).padStart(2, "0")}
          </div>
        </header>

        <button
          type="button"
          className="cast-shell cast-enter"
          aria-expanded={open}
          aria-label={open ? object.period : object.name}
          tabIndex={ready ? undefined : -1}
          onClick={() => ready && setOpen((v) => !v)}
        >
          <span className="cast-face">
            <span className="cast-name">{object.name}</span>
            <span className="cast-period">{object.period}</span>
          </span>
        </button>

        <div className="cast-foot cast-enter">
          <p className="cast-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
