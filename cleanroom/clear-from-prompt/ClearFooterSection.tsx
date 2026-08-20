"use client";

/**
 * CLEAR — MS-SEC-FOOT01
 * Orbit-house close. Not Dopamine. Not four gray columns.
 * Enter: stamp-settle. Signature after land: desk-ink.
 * Language: calm-fintech · Theme: orbit-trust-dark · Primitive: desk-ink
 * Pair: Orbit, Axiom, Nexus.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./clear-footer.css";

export type ClearDesk = {
  id: string;
  index: string;
  name: string;
  place: string;
  period: string;
};

const DEFAULT_DESKS: ClearDesk[] = [
  {
    id: "charlotte",
    index: "01",
    name: "Charlotte",
    place: "Charlotte, North Carolina",
    period: "The Charlotte desk closes the books before anyone is allowed to talk about a wire. If you call at 4:50, you will get tomorrow.",
  },
  {
    id: "stamford",
    index: "02",
    name: "Stamford",
    place: "Stamford, Connecticut",
    period: "Stamford writes the blotter. That is a boring sentence on purpose. Boring is how money is supposed to move.",
  },
  {
    id: "jersey",
    index: "03",
    name: "Jersey City",
    place: "Jersey City, New Jersey",
    period: "One primary, one relief, and the clock on the river. If the primary is out, you still get a person, not a queue.",
  },
];

const DEFAULT_LINKS = [
  { id: "custody", label: "Custody" },
  { id: "clearing", label: "Clearing" },
  { id: "paper", label: "Paper" },
];

const STAMP = getEnter("stamp-settle");

type Props = {
  desks?: ClearDesk[];
  links?: { id: string; label: string }[];
  brand?: string;
  kicker?: string;
  legal?: string;
  ctaLabel?: string;
};

export default function ClearFooterSection({
  desks = DEFAULT_DESKS,
  links = DEFAULT_LINKS,
  brand = "Clear",
  kicker = "Close",
  legal = "Member of the clearing house. The rest is in the paper they will send you.",
  ctaLabel = "Talk to the desk",
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLElement>(null);
  const { entered, landed } = useSectionEnter(rootRef, STAMP.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: desks.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-FOOT01",
    virtualViewports: 2.4,
  });
  const [inkTick, setInkTick] = useState(0);
  const desk = desks[chapter] ?? desks[0]!;

  useEffect(() => {
    if (!ready || reduced) return;
    setInkTick((n) => n + 1);
  }, [chapter, ready, reduced]);

  return (
    <footer
      ref={rootRef}
      className="clear-root clear-root--pin"
      aria-label="Clear close"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="clear-stage">
        <header className="clear-masthead clear-enter">
          <div className="clear-brand">{brand}</div>
          <div className="clear-meta">{kicker}</div>
        </header>

        <div className="clear-body">
          <p className="clear-kicker clear-enter">Books open.</p>
          <h2
            key={`${desk.id}-place-${inkTick}`}
            className={`clear-place clear-enter${inkTick > 0 ? " is-ink" : ""}`}
            aria-live="polite"
          >
            {desk.place}
          </h2>
          <p
            key={`${desk.id}-period-${inkTick}`}
            className={`clear-period clear-enter${inkTick > 0 ? " is-ink" : ""}`}
          >
            {desk.period}
          </p>
        </div>

        <div className="clear-desk clear-enter">
          <p className="clear-desk-name">{desk.name}</p>
        </div>

        <div className="clear-foot clear-enter">
          <nav className="clear-nav" aria-label="House">
            {links.map((link) => (
              <a key={link.id} href={`#${link.id}`} tabIndex={ready ? undefined : -1}>
                {link.label}
              </a>
            ))}
          </nav>
          <button type="button" className="clear-cta" tabIndex={ready ? undefined : -1}>
            {ctaLabel}
          </button>
        </div>

        <p className="clear-legal clear-enter">{legal}</p>
      </div>
    </footer>
  );
}
