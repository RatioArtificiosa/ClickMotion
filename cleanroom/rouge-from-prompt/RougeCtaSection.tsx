"use client";

/**
 * ROUGE — MS-SEC-CTAS02
 * Candy-couture close. Not Dew hold. Not three pills.
 * Enter: pop-in. Signature after land: lipstick-swipe.
 * Language: candy-couture · Theme: cherry-lacquer · Primitive: lipstick-swipe
 * Pair: Revel, Verve, Dopamine.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import "./rouge-cta.css";

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

export default function RougeCtaSection({
  brand = "Rouge",
  kicker = "After eight",
  headline = "If you want your lips done, come after eight.",
  period = "Dinner on Palm Canyon, and you do not want to do this in a car visor. It is lipstick, a chair, and twenty minutes. We are not an appointment book.",
  place = "Palm Springs, California",
  ctaLabel = "I'll be there",
  doneLabel = "See you tonight",
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
  const [titleSwiped, setTitleSwiped] = useState(reduced);
  const [hover, setHover] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const ready = landed || reduced;
  const buttonSwiped = confirmed || (hover && ready && !reduced);
  const label = confirmed ? doneLabel : ctaLabel;

  useEffect(() => {
    if (reduced) {
      setTitleSwiped(true);
      return;
    }
    if (!landed) return;
    const t = window.setTimeout(() => setTitleSwiped(true), 40);
    return () => window.clearTimeout(t);
  }, [landed, reduced]);

  const confirm = () => {
    if (!ready || confirmed) return;
    setConfirmed(true);
  };

  return (
    <section
      ref={rootRef}
      className="rouge-root"
      aria-label="Rouge tonight"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-title-swiped={titleSwiped ? "true" : "false"}
      data-confirmed={confirmed ? "true" : "false"}
    >
      <div className="rouge-stage">
        <header className="rouge-masthead rouge-enter">
          <div className="rouge-brand">{brand}</div>
          <div className="rouge-meta">{kicker}</div>
        </header>

        <div className="rouge-body">
          <h2 className="rouge-headline rouge-enter">
            <span className="rouge-headline-rest" aria-hidden>
              {headline}
            </span>
            <span className="rouge-headline-swipe">{headline}</span>
          </h2>
          <p className="rouge-period rouge-enter">{period}</p>
          <p className="rouge-place rouge-enter">{place}</p>
        </div>

        <div className="rouge-foot rouge-enter">
          <button
            type="button"
            className="rouge-cta"
            data-swiped={buttonSwiped ? "true" : "false"}
            aria-label={label}
            tabIndex={ready ? undefined : -1}
            onClick={confirm}
            onPointerEnter={() => {
              if (ready && !reduced) setHover(true);
            }}
            onMouseEnter={() => {
              if (ready && !reduced) setHover(true);
            }}
            onPointerLeave={() => {
              if (!confirmed) setHover(false);
            }}
            onMouseLeave={() => {
              if (!confirmed) setHover(false);
            }}
          >
            <span className="rouge-cta-fill" aria-hidden>
              {label}
            </span>
            <span className="rouge-cta-ink">{label}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
