"use client";

/**
 * TILT — MS-SEC-CTAS06
 * Arcade-atelier close. One chrome bead. Not Helix. Not HitCounter.
 * Enter: pop-in. Signature after land: orbit-trinket (once, 12px path).
 * Language: arcade-atelier · Theme: chrome-bubblegum · Primitive: orbit-trinket
 * Pair: Verve, Actually!, Dopamine.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import "./tilt-cta.css";

const POP = getEnter("pop-in");

type Props = {
  brand?: string;
  kicker?: string;
  headline?: string;
  period?: string;
  place?: string;
  ctaLabel?: string;
  doneLabel?: string;
};

export default function TiltCtaSection({
  brand = "Tilt",
  kicker = "After ten",
  headline = "The machines are on after ten.",
  period = "If you have been walking Bedford looking for something that is not another bar, this is the room with the pinball and the cheap beer. We turn the floor on at ten. Come if you want to play.",
  place = "Williamsburg, Brooklyn",
  ctaLabel = "I'll come by",
  doneLabel = "See you after ten",
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
  const [orbit, setOrbit] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const ready = landed || reduced;
  const label = confirmed ? doneLabel : ctaLabel;

  useEffect(() => {
    if (reduced) {
      setOrbit(false);
      return;
    }
    if (!landed) return;
    setOrbit(true);
    const t = window.setTimeout(() => setOrbit(false), 2400);
    return () => window.clearTimeout(t);
  }, [landed, reduced]);

  const confirm = () => {
    if (!ready || confirmed) return;
    setConfirmed(true);
    if (!reduced) {
      setOrbit(true);
      window.setTimeout(() => setOrbit(false), 2400);
    }
  };

  return (
    <section
      ref={rootRef}
      className="tilt-root"
      aria-label="Tilt tonight"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-orbit={orbit ? "true" : "false"}
      data-confirmed={confirmed ? "true" : "false"}
    >
      <div className="tilt-stage">
        <header className="tilt-masthead tilt-enter">
          <div className="tilt-brand">{brand}</div>
          <div className="tilt-meta">{kicker}</div>
        </header>

        <div className="tilt-body tilt-enter">
          <h2 className="tilt-headline">{headline}</h2>
          <p className="tilt-period">{period}</p>
          <p className="tilt-place">{place}</p>
        </div>

        <div className="tilt-foot tilt-enter">
          <div className="tilt-orbit">
            <button
              type="button"
              className="tilt-cta"
              aria-label={label}
              tabIndex={ready ? undefined : -1}
              onClick={confirm}
            >
              {label}
            </button>
            <span className="tilt-path" aria-hidden>
              <span className="tilt-trinket" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
