"use client";

/**
 * DATUM — MS-SEC-CONT01
 * Swiss inquiry letter. Not Phobia. Not a floating-label kit.
 * Enter: rule-draw. Signature after land: field-focus-lift.
 * Language: swiss-minimal · Theme: swiss-light · Primitive: field-focus-lift
 * Pair: Terra Nova, Apex Quantum, Vertex.
 */

import { useRef, useState, type FormEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import "./datum-contact.css";

const RULE = getEnter("rule-draw");

type Field = {
  id: string;
  name: string;
  label: string;
  kind: "text" | "email" | "area";
};

const DEFAULT_FIELDS: Field[] = [
  { id: "name", name: "name", label: "Name", kind: "text" },
  { id: "mail", name: "mail", label: "Mail", kind: "email" },
  { id: "note", name: "note", label: "Note", kind: "area" },
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

export default function DatumContactSection({
  brand = "Datum",
  kicker = "The lot",
  headline = "Send the survey, not a pitch.",
  period = "If you have a lot in Troy and a sketch on tracing paper, we will read it. If you want to get on a call and talk vision, we are the wrong desk.",
  place = "Troy, New York",
  fields = DEFAULT_FIELDS,
  ctaLabel = "Send the drawings",
  doneLabel = "We have it",
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLElement>(null);
  const { entered, landed } = useSectionEnter(rootRef, RULE.landMs);
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
      className="datum-root"
      aria-label="Datum inquiry"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-sent={sent ? "true" : "false"}
    >
      <div className="datum-stage">
        <header className="datum-masthead">
          <div className="datum-brand datum-type">{brand}</div>
          <div className="datum-meta datum-type">{kicker}</div>
          <span className="datum-rule datum-masthead-rule" aria-hidden />
        </header>

        <div className="datum-body">
          <div className="datum-copy">
            <h2 className="datum-headline datum-type">{headline}</h2>
            <p className="datum-period datum-type">{period}</p>
            <p className="datum-place datum-type">{place}</p>
          </div>

          <form className="datum-form" onSubmit={onSubmit} noValidate>
            {fields.map((field, i) => (
              <label
                key={field.id}
                className="datum-field"
                style={{ ["--datum-i" as string]: String(i) }}
              >
                <span className="datum-label datum-type">{field.label}</span>
                {field.kind === "area" ? (
                  <textarea
                    name={field.name}
                    rows={2}
                    tabIndex={ready ? undefined : -1}
                    readOnly={sent}
                    autoComplete="off"
                  />
                ) : (
                  <input
                    type={field.kind}
                    name={field.name}
                    tabIndex={ready ? undefined : -1}
                    readOnly={sent}
                    autoComplete={field.kind === "email" ? "email" : "name"}
                  />
                )}
                <span className="datum-rule datum-rule--rest" aria-hidden />
                <span className="datum-rule datum-rule--focus" aria-hidden />
              </label>
            ))}

            <div className="datum-foot">
              <button
                type="submit"
                className="datum-cta datum-type"
                tabIndex={ready ? undefined : -1}
                aria-pressed={sent}
                aria-disabled={!ready || sent}
              >
                {sent ? doneLabel : ctaLabel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
