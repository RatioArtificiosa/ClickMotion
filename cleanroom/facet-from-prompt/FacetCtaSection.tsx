"use client";

/**
 * FACET — MS-SEC-CTAS03
 * Jewel-chrome close. Not Helix. Not a ring of orbiting stones.
 * Enter: iris-open. Signature after land: jewel-swing.
 * Language: jewel-chrome · Theme: vitrine-platinum · Primitive: jewel-swing
 * Pair: Prism, Mirage, Elyse.
 */

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import "./facet-cta.css";

const IRIS = getEnter("iris-open");

type Props = {
  brand?: string;
  kicker?: string;
  headline?: string;
  period?: string;
  place?: string;
  ctaLabel?: string;
  doneLabel?: string;
};

export default function FacetCtaSection({
  brand = "Facet",
  kicker = "Until six",
  headline = "Come try it on before we close.",
  period = "There is a ring in the Galena Street window that three people have asked about this week. It is still there. We close at six. If you want it on your hand, not in the glass, come before that.",
  place = "Aspen, Colorado",
  ctaLabel = "Hold it until six",
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
  const { entered, landed } = useSectionEnter(rootRef, IRIS.landMs);
  const [confirmed, setConfirmed] = useState(false);
  const [pull, setPull] = useState({ x: 0, y: 0, r: 0 });
  const ready = landed || reduced;
  const label = confirmed ? doneLabel : ctaLabel;

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!ready || reduced || confirmed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    const x = Math.max(-10, Math.min(10, nx * 20));
    const y = Math.max(-10, Math.min(10, ny * 20));
    const r = Math.max(-8, Math.min(8, nx * 16));
    setPull({ x, y, r });
  };

  const onLeave = () => {
    if (!confirmed) setPull({ x: 0, y: 0, r: 0 });
  };

  const confirm = () => {
    if (!ready || confirmed) return;
    setConfirmed(true);
    setPull({ x: 0, y: 0, r: 0 });
  };

  return (
    <section
      ref={rootRef}
      className="facet-root"
      aria-label="Facet viewing"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-confirmed={confirmed ? "true" : "false"}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="facet-iris">
        <div className="facet-stage">
          <header className="facet-masthead">
            <div className="facet-brand">{brand}</div>
            <div className="facet-meta">{kicker}</div>
          </header>

          <div className="facet-body">
            <h2 className="facet-headline">{headline}</h2>
            <p className="facet-period">{period}</p>
            <p className="facet-place">{place}</p>
          </div>

          <div className="facet-foot">
            <button
              type="button"
              className="facet-cta"
              aria-label={label}
              tabIndex={ready ? undefined : -1}
              onClick={confirm}
              style={{
                transform: `translate(${pull.x}px, ${pull.y}px) rotate(${pull.r}deg)`,
              }}
            >
              {label}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
