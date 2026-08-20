"use client";

/**
 * PORT — MS-SEC-TEST02
 * Velvet-nocturne proof. Not Witness takeover. Not a quote carousel.
 * Enter: silk-slip. Signature after land: spotlight-park.
 * Language: velvet-nocturne · Theme: club-bordeaux · Primitive: spotlight-park
 * Pair: Revel, Sable, Dopamine.
 */

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./port-testimonials.css";

export type PortVoice = {
  id: string;
  name: string;
  city: string;
  quote: string;
};

const DEFAULT_VOICES: PortVoice[] = [
  {
    id: "sarah",
    name: "Sarah Bell",
    city: "Austin",
    quote:
      "I told myself I would stay for two songs. They turned the lights up and I was still there, holding a glass I should have put down an hour earlier.",
  },
  {
    id: "james",
    name: "James Reed",
    city: "Houston",
    quote:
      "The band started forty minutes late and nobody left. That is the only review that matters in this room.",
  },
  {
    id: "maria",
    name: "Maria Lopez",
    city: "San Antonio",
    quote:
      "We drove up on a Friday because someone at work said the room was worth it. We were back the next Friday. I do not have a better way to say it.",
  },
];

const SLIP = getEnter("silk-slip");

type Props = {
  voices?: PortVoice[];
  brand?: string;
  kicker?: string;
  place?: string;
};

export default function PortTestimonialsSection({
  voices = DEFAULT_VOICES,
  brand = "Port",
  kicker = "Friday",
  place = "South Congress, Austin",
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
    count: voices.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-TEST02",
    virtualViewports: 2.4,
  });
  const [spot, setSpot] = useState({ x: 42, y: 38 });
  const [parked, setParked] = useState(false);
  const voice = voices[chapter] ?? voices[0]!;

  useEffect(() => {
    setSpot({ x: 38, y: 42 });
    setParked(true);
    if (reduced) return;
    const t = window.setTimeout(() => setParked(false), 420);
    return () => window.clearTimeout(t);
  }, [chapter, reduced]);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!ready || reduced || parked) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      ref={rootRef}
      className="port-root port-root--pin"
      aria-label="Port nights"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-parked={parked ? "true" : "false"}
      onPointerMove={onMove}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div
        className="port-spot"
        aria-hidden
        style={{
          background: `radial-gradient(circle 200px at ${spot.x}% ${spot.y}%, rgba(232, 213, 163, 0.28), transparent 70%)`,
        }}
      />
      <div className="port-stage">
        <header className="port-masthead port-enter">
          <div className="port-brand">{brand}</div>
          <div className="port-meta">{kicker}</div>
        </header>

        <blockquote className="port-quote port-enter" aria-live="polite">
          {voice.quote}
        </blockquote>

        <div className="port-foot port-enter">
          <p className="port-who">
            {voice.name}
            <span className="port-city">{voice.city}</span>
          </p>
          <p className="port-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
