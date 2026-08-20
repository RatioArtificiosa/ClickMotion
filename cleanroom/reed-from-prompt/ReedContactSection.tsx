"use client";

/**
 * REED — MS-SEC-CONT04
 * Letterpress wording desk. Not Mark tickets. Not Quill smoke. Not Holt resin.
 * Enter: letterpress-crush. Signature after land: chromatic-slip.
 * Language: ink-riot · Theme: vermilion-colophon · Primitive: chromatic-slip
 * Pair: Revel, Helix, Verve.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import "./reed-contact.css";

const CRUSH = getEnter("letterpress-crush");

type Field = {
  id: string;
  name: string;
  label: string;
  kind: "text" | "email" | "area";
};

const DEFAULT_FIELDS: Field[] = [
  { id: "name", name: "name", label: "Name", kind: "text" },
  { id: "mail", name: "mail", label: "Mail", kind: "email" },
  { id: "copy", name: "copy", label: "The note", kind: "area" },
];

type Props = {
  brand?: string;
  kicker?: string;
  headline?: string;
  period?: string;
  place?: string;
  fields?: Field[];
  ctaLabel?: string;
  doneLabel?: string;
};

export default function ReedContactSection({
  brand = "Reed",
  kicker = "Letterpress",
  headline = "You don't have to have it finished.",
  period = "Most of what I set starts as a note on a phone. Send that. I do invitations. Gold leaf waits until the Christmas cards are off the press, which is November, so if you were hoping for foil this month, skip it or wait. The names are what people keep anyway.",
  place = "East Market Street, Rhinebeck",
  fields = DEFAULT_FIELDS,
  ctaLabel = "Here's my note",
  doneLabel = "Got it",
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
  const { entered, landed } = useSectionEnter(rootRef, CRUSH.landMs);
  const [sent, setSent] = useState(false);
  const ready = landed || reduced;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!ready || sent) return;
    setSent(true);
  };

  return (
    <section
      ref={rootRef}
      className="reed-root"
      aria-label="Reed letterpress note"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-slip={sent && !reduced ? "true" : "false"}
      data-sent={sent ? "true" : "false"}
    >
      <div className="reed-stage">
        <header className="reed-masthead reed-enter">
          <div className="reed-brand">{brand}</div>
          <div className="reed-meta">{kicker}</div>
        </header>

        <div className="reed-body reed-enter">
          <div>
            <h2 className="reed-headline">{headline}</h2>
            <p className="reed-period">{period}</p>
            <p className="reed-place">{place}</p>
          </div>

          <form className="reed-form" onSubmit={onSubmit} noValidate>
            {fields.map((field) => (
              <label key={field.id} className="reed-field">
                <span className="reed-label">{field.label}</span>
                {field.kind === "area" ? (
                  <textarea
                    name={field.name}
                    rows={2}
                    tabIndex={ready ? undefined : -1}
                    readOnly={sent}
                  />
                ) : (
                  <input
                    name={field.name}
                    type={field.kind === "email" ? "email" : "text"}
                    autoComplete={field.kind === "email" ? "email" : "name"}
                    tabIndex={ready ? undefined : -1}
                    readOnly={sent}
                  />
                )}
              </label>
            ))}
            <button className="reed-cta" type="submit" disabled={!ready || sent}>
              <span className="reed-cta-label">{sent ? doneLabel : ctaLabel}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
