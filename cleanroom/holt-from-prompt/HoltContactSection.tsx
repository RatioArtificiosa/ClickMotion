"use client";

/**
 * HOLT — MS-SEC-CONT03
 * Resin commission desk. Not Cast objects. Not Ember kiln. Not Datum swiss.
 * Enter: hang-rail. Signature after land: magnet-snap.
 * Language: resin-object · Theme: resin-amber · Primitive: magnet-snap
 * Pair: Prism, Mirage, Verve.
 */

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import "./holt-contact.css";

const RAIL = getEnter("hang-rail");

type Field = {
  id: string;
  name: string;
  label: string;
  kind: "text" | "email" | "area";
};

const DEFAULT_FIELDS: Field[] = [
  { id: "name", name: "name", label: "Name", kind: "text" },
  { id: "mail", name: "mail", label: "Mail", kind: "email" },
  { id: "make", name: "make", label: "What to make", kind: "area" },
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

export default function HoltContactSection({
  brand = "Holt",
  kicker = "Commission",
  headline = "Tell us what belongs on the desk.",
  period = "Lamps are wait-listed through September. A tray we can usually do in three weeks, if you are not picky about the amber going a little darker.",
  place = "Main Street, Beacon",
  fields = DEFAULT_FIELDS,
  ctaLabel = "Send the drawing",
  doneLabel = "It snapped in",
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
  const { entered, landed } = useSectionEnter(rootRef, RAIL.landMs);
  const [sent, setSent] = useState(false);
  const [snap, setSnap] = useState(reduced);
  const ready = landed || reduced;

  useEffect(() => {
    if (reduced) {
      setSnap(true);
      return;
    }
    if (!landed) return;
    setSnap(false);
    const t = window.setTimeout(() => setSnap(true), 40);
    return () => window.clearTimeout(t);
  }, [landed, reduced]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!ready || sent) return;
    setSent(true);
  };

  return (
    <section
      ref={rootRef}
      className="holt-root"
      aria-label="Holt commission"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-snap={snap ? "true" : "false"}
      data-dock={sent ? "true" : "false"}
    >
      <div className="holt-stage">
        <header className="holt-masthead holt-enter">
          <div className="holt-brand">{brand}</div>
          <div className="holt-meta">{kicker}</div>
        </header>

        <div className="holt-body holt-enter">
          <div>
            <h2 className="holt-headline">{headline}</h2>
            <p className="holt-period">{period}</p>
            <p className="holt-place">{place}</p>
          </div>

          <form className="holt-form" onSubmit={onSubmit} noValidate>
            {fields.map((field) => (
              <label key={field.id} className="holt-field">
                <span className="holt-label">{field.label}</span>
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
            <button className="holt-cta" type="submit" disabled={!ready || sent}>
              {sent ? doneLabel : ctaLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
