"use client";

/**
 * HEAT — MS-SEC-CTAS05
 * Solar-gilt close. Not crypto foil. Not Facet jewel.
 * Enter: fade-hold. Signature after land: foil-stamp.
 * Language: solar-gilt · Theme: desert-leaf · Primitive: foil-stamp
 * Pair: Elyse, Nomad, Meridian.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import "./heat-cta.css";

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

export default function HeatCtaSection({
  brand = "Heat",
  kicker = "Sundown",
  headline = "We cook for twenty-two.",
  period = "Sundown seating on Canyon Road. If you are driving up from Albuquerque, leave by four. The table is set for two unless you tell us otherwise.",
  place = "Santa Fe, New Mexico",
  ctaLabel = "Hold a table",
  doneLabel = "We'll hold it",
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
  const [stamped, setStamped] = useState(reduced);
  const [hit, setHit] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const ready = landed || reduced;
  const label = confirmed ? doneLabel : ctaLabel;

  useEffect(() => {
    if (reduced) {
      setStamped(true);
      return;
    }
    if (!landed) return;
    setStamped(false);
    const t = window.setTimeout(() => setStamped(true), 40);
    return () => window.clearTimeout(t);
  }, [landed, reduced]);

  const confirm = () => {
    if (!ready || confirmed) return;
    setConfirmed(true);
    if (reduced) return;
    setHit(true);
    window.setTimeout(() => setHit(false), 340);
  };

  return (
    <section
      ref={rootRef}
      className="heat-root"
      aria-label="Heat dinner"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-stamped={stamped ? "true" : "false"}
      data-hit={hit ? "true" : "false"}
      data-confirmed={confirmed ? "true" : "false"}
    >
      <div className="heat-stage">
        <header className="heat-masthead heat-enter">
          <div className="heat-brand">{brand}</div>
          <div className="heat-meta">{kicker}</div>
        </header>

        <div className="heat-body heat-enter">
          <h2 className="heat-headline">{headline}</h2>
          <p className="heat-period">{period}</p>
          <p className="heat-place">{place}</p>
        </div>

        <div className="heat-foot heat-enter">
          <button
            type="button"
            className="heat-cta"
            aria-label={label}
            tabIndex={ready ? undefined : -1}
            onClick={confirm}
          >
            {label}
          </button>
        </div>
      </div>
    </section>
  );
}
