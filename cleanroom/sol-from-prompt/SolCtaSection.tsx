"use client";

/**
 * SOL — MS-SEC-CTAS07
 * Solar-gilt noon close. Not Heat foil. Not a crypto flash.
 * Enter: fade-hold. Signature after land: flash-pop (once).
 * Language: solar-gilt · Theme: noon-bleach · Primitive: flash-pop
 * Pair: Elyse, Nomad, Meridian.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import "./sol-cta.css";

const FADE = getEnter("fade-hold");

type Props = {
  brand?: string;
  kicker?: string;
  headline?: string;
  period?: string;
  place?: string;
  ctaLabel?: string;
  doneLabel?: string;
};

export default function SolCtaSection({
  brand = "Sol",
  kicker = "Lunch",
  headline = "Come in before the heat does.",
  period = "Iced coffee until we run out, which in July is about 1:40. The palo verde out front is the only shade on this block, so if you want a table, that is the one to take.",
  place = "Congress Street, Tucson",
  ctaLabel = "What's on lunch",
  doneLabel = "Sent you today's card",
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
  const [flash, setFlash] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const ready = landed || reduced;

  useEffect(() => {
    if (reduced) return;
    if (!landed) return;
    setFlash(true);
    const t = window.setTimeout(() => setFlash(false), 80);
    return () => window.clearTimeout(t);
  }, [landed, reduced]);

  const confirm = () => {
    if (!ready || confirmed) return;
    setConfirmed(true);
  };

  return (
    <section
      ref={rootRef}
      className="sol-root"
      aria-label="Sol porch"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-flash={flash ? "true" : "false"}
    >
      <div className="sol-flash" aria-hidden />
      <div className="sol-stage">
        <header className="sol-masthead sol-enter">
          <div className="sol-brand">{brand}</div>
          <div className="sol-meta">{kicker}</div>
        </header>

        <div className="sol-body sol-enter">
          <h2 className="sol-headline">{headline}</h2>
          <p className="sol-period">{period}</p>
        </div>

        <div className="sol-foot sol-enter">
          <p className="sol-place">{place}</p>
          <button
            type="button"
            className="sol-cta"
            onClick={confirm}
            disabled={!ready}
          >
            {confirmed ? doneLabel : ctaLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
