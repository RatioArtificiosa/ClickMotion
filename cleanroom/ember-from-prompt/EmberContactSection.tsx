"use client";

/**
 * EMBER — MS-SEC-CONT02
 * Ceramic-gloss kiln note. Not Datum swiss. Not a floating-label kit.
 * Enter: silk-slip. Signature after land: lacquer-pour.
 * Language: ceramic-gloss · Theme: oxblood-glaze · Primitive: lacquer-pour
 * Pair: Elyse, STILL, Aether.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import "./ember-contact.css";

const SLIP = getEnter("silk-slip");

type Field = {
  id: string;
  name: string;
  label: string;
  kind: "text" | "email" | "area";
};

const DEFAULT_FIELDS: Field[] = [
  { id: "name", name: "name", label: "Name", kind: "text" },
  { id: "mail", name: "mail", label: "Mail", kind: "email" },
  { id: "fire", name: "fire", label: "What to fire", kind: "area" },
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

export default function EmberContactSection({
  brand = "Ember",
  kicker = "Kiln note",
  headline = "Tell us what to fire.",
  period = "The kiln is booked through October. Write anyway. If it is a small thing we can sometimes slide it onto a leftover shelf. If it is a whole set, you are looking at Lexington in November.",
  place = "Lexington Avenue, Asheville",
  fields = DEFAULT_FIELDS,
  ctaLabel = "Send the note",
  doneLabel = "We'll write back",
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
      className="ember-root"
      aria-label="Ember kiln note"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-pour={sent ? "true" : "false"}
    >
      <div className="ember-stage">
        <header className="ember-masthead ember-enter">
          <div className="ember-brand">{brand}</div>
          <div className="ember-meta">{kicker}</div>
        </header>

        <div className="ember-body ember-enter">
          <div>
            <h2 className="ember-headline">{headline}</h2>
            <p className="ember-period">{period}</p>
            <p className="ember-place">{place}</p>
          </div>

          <form className="ember-form" onSubmit={onSubmit} noValidate>
            {fields.map((field) => (
              <label key={field.id} className="ember-field">
                <span className="ember-label">{field.label}</span>
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
            <button
              className="ember-cta"
              type="submit"
              disabled={!ready || sent}
            >
              <span className="ember-cta-fill" aria-hidden />
              <span className="ember-cta-label">{sent ? doneLabel : ctaLabel}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
