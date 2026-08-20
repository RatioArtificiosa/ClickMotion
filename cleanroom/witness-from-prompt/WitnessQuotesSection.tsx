"use client";

/**
 * WITNESS — MS-SEC-TEST01
 * Editorial pull-quote takeover. Not avatar cards. Not a marquee of logos.
 * Enter: drop-drape (elegant). Signature after land: card-takeover.
 * Language: luxury-editorial · Theme: fashion-ink-light · Primitive: card-takeover
 * Pair: Revel, Sable, Helix, Dopamine.
 */

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { enterPose, getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./witness-quotes.css";

export type WitnessQuote = {
  id: string;
  name: string;
  house: string;
  role: string;
  quote: string;
};

const DEFAULT_QUOTES: WitnessQuote[] = [
  {
    id: "johnson",
    name: "Sarah Johnson",
    house: "Union Square",
    role: "Creative director",
    quote:
      "I wore the black coat to a dinner I was nervous about. Two people asked who made it before we sat down.",
  },
  {
    id: "wilson",
    name: "James Wilson",
    house: "Michigan Avenue",
    role: "Founder",
    quote:
      "I bought the navy because it looked like it would survive a real week. It did. I wore it Tuesday through a Thursday pitch and it still looked like I had not lived in it.",
  },
  {
    id: "garcia",
    name: "Maria Garcia",
    house: "Lincoln Park",
    role: "Brand director",
    quote:
      "The knit lives on the chair in my office. People touch it when they think I am not looking.",
  },
  {
    id: "miller",
    name: "David Miller",
    house: "Madison Avenue",
    role: "Managing partner",
    quote:
      "I do not shop like this, usually. I came in for a belt. I left with a coat I have worn every cold morning since.",
  },
];

const DROP = getEnter("drop-drape");

type Props = {
  quotes?: WitnessQuote[];
  kicker?: string;
};

export default function WitnessQuotesSection({
  quotes = DEFAULT_QUOTES,
  kicker = "In the room",
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLElement>(null);
  const { entered, landed } = useSectionEnter(rootRef, DROP.landMs);
  const { progress, chapter } = useChapterPin(rootRef, {
    count: quotes.length,
    landed,
    reduced,
    productId: "MS-SEC-TEST01",
    virtualViewports: 2.8,
  });
  const active = chapter;
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const ms = reduced ? 0 : 0.48;

  return (
    <section
      ref={rootRef}
      className="witness-root witness-root--pin"
      aria-label="Witness statements"
      data-entered={entered ? "true" : "false"}
      data-landed={landed ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="witness-stage">
        <header className="witness-masthead">
          <motion.div
            className="witness-brand"
            initial={false}
            animate={enterPose(entered, DROP)}
            transition={{ ...DROP.transition, delay: 0, duration: 0.7 }}
          >
            Witness
          </motion.div>
          <motion.div
            className="witness-meta"
            initial={false}
            animate={enterPose(entered, DROP)}
            transition={{ ...DROP.transition, delay: 0.08, duration: 0.7 }}
          >
            {String(active + 1).padStart(2, "0")} / {String(quotes.length).padStart(2, "0")}
          </motion.div>
          <motion.span
            className="witness-masthead-rule"
            aria-hidden
            initial={false}
            animate={{ scaleX: entered ? 1 : 0 }}
            transition={{ duration: 0.85, ease, delay: 0.06 }}
          />
        </header>
        <motion.p
          className="witness-kicker"
          initial={false}
          animate={enterPose(entered, DROP)}
          transition={{ ...DROP.transition, delay: 0.1, duration: 0.75 }}
        >
          {kicker}
        </motion.p>

        <div className="witness-body">
          <motion.div
            className="witness-plate"
            aria-live="polite"
            initial={false}
            animate={enterPose(entered, DROP)}
            transition={{ ...DROP.transition, delay: 0.22 }}
          >
            {quotes.map((item, i) => {
              const on = i === active;
              return (
                <motion.blockquote
                  key={item.id}
                  className="witness-quote-slot"
                  aria-hidden={!on}
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, y: on ? 0 : 16 }}
                  transition={{ duration: ms, ease }}
                  style={{ pointerEvents: on ? "auto" : "none" }}
                >
                  <p className="witness-mark" aria-hidden>
                    ”
                  </p>
                  <p className="witness-quote">{item.quote}</p>
                  <footer className="witness-who">
                    <div className="witness-who-name">{item.name}</div>
                    <span className="witness-who-role">
                      {item.role} · {item.house}
                    </span>
                  </footer>
                </motion.blockquote>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
