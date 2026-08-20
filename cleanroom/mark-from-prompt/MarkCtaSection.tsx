"use client";

/**
 * MARK — MS-SEC-CTAS04
 * Ink-riot close. Not Kern collision. Not a scramble kit.
 * Enter: offset-print. Signature after land: glyph-cascade.
 * Language: ink-riot · Theme: vermilion-colophon · Primitive: glyph-cascade
 * Pair: Revel, Helix, Verve.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import "./mark-cta.css";

const OFFSET = getEnter("offset-print");

type Props = {
  brand?: string;
  kicker?: string;
  headline?: string;
  period?: string;
  place?: string;
  ctaLabel?: string;
  doneLabel?: string;
};

export default function MarkCtaSection({
  brand = "Mark",
  kicker = "Thursday",
  headline = "This Thursday.",
  period = "We printed eighty posters for the Flushing Avenue show. If you want to be in the room before it fills with people who heard about it on a story, get a ticket this week.",
  place = "Bushwick, Brooklyn",
  ctaLabel = "Get a ticket",
  doneLabel = "You're on the list",
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
  const { entered, landed } = useSectionEnter(rootRef, OFFSET.landMs);
  const [cascade, setCascade] = useState(reduced);
  const [confirmed, setConfirmed] = useState(false);
  const ready = landed || reduced;
  const label = confirmed ? doneLabel : ctaLabel;
  const glyphs = Array.from(headline);

  useEffect(() => {
    if (reduced) {
      setCascade(true);
      return;
    }
    if (!landed) return;
    setCascade(false);
    const t = window.setTimeout(() => setCascade(true), 40);
    return () => window.clearTimeout(t);
  }, [landed, reduced]);

  const confirm = () => {
    if (!ready || confirmed) return;
    setConfirmed(true);
  };

  return (
    <section
      ref={rootRef}
      className="mark-root"
      aria-label="Mark Thursday show"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-cascade={cascade ? "true" : "false"}
      data-confirmed={confirmed ? "true" : "false"}
    >
      <div className="mark-stage">
        <header className="mark-masthead mark-enter">
          <div className="mark-brand">{brand}</div>
          <div className="mark-meta">{kicker}</div>
        </header>

        <div className="mark-body">
          <h2 className="mark-headline" aria-label={headline}>
            {glyphs.map((ch, i) => (
              <span
                key={`${ch}-${i}`}
                className="mark-glyph"
                style={{ transitionDelay: cascade && !reduced ? `${i * 22}ms` : "0ms" }}
              >
                {ch === " " ? "\u00a0" : ch}
              </span>
            ))}
          </h2>
          <p className="mark-period mark-enter">{period}</p>
          <p className="mark-place mark-enter">{place}</p>
        </div>

        <div className="mark-foot mark-enter">
          <button
            type="button"
            className="mark-cta"
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
