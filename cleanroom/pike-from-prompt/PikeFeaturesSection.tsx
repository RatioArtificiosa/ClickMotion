"use client";

/**
 * PIKE — MS-SEC-FEAT09
 * Arcade-atelier machines. Not Tilt floor CTA. Not Brine oysters. Not Helix.
 * Enter: wobble-land. Signature after land: kaleido-fold (once).
 * Language: arcade-atelier · Theme: chrome-bubblegum · Primitive: kaleido-fold
 * Pair: Verve, Actually!, Dopamine.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./pike-features.css";

export type PikePiece = {
  id: string;
  index: string;
  name: string;
  period: string;
};

const DEFAULT_PIECES: PikePiece[] = [
  {
    id: "gottlieb",
    index: "01",
    name: "Gottlieb",
    period:
      "The Gottlieb on the boardwalk side still tilts if you lean on it. We leave it that way. People who have been coming since the nineties would notice if we fixed it.",
  },
  {
    id: "booth",
    index: "02",
    name: "Booth",
    period:
      "The photo booth eats dollar coins. We keep a roll in the cigar box under the register. If you only have a five, we will make change, and we will not be quick about it.",
  },
  {
    id: "cyclone",
    index: "03",
    name: "Cyclone",
    period:
      "If the cyclone is down, it is down. We do not put a sign over a machine that is waiting on a coil from Pennsylvania. Come back Friday.",
  },
];

const WOBBLE = getEnter("wobble-land");

type Props = {
  pieces?: PikePiece[];
  brand?: string;
  place?: string;
};

export default function PikeFeaturesSection({
  pieces = DEFAULT_PIECES,
  brand = "Pike",
  place = "Boardwalk, Asbury Park",
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
  const { entered, landed } = useSectionEnter(rootRef, WOBBLE.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: pieces.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-FEAT09",
    virtualViewports: 2.4,
  });
  const [fold, setFold] = useState(reduced);
  const piece = pieces[chapter] ?? pieces[0]!;

  useEffect(() => {
    if (reduced) {
      setFold(true);
      return;
    }
    if (!ready) return;
    setFold(false);
    const t = window.setTimeout(() => setFold(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="pike-root pike-root--pin"
      aria-label="Pike machines"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-fold={fold ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="pike-stage">
        <header className="pike-masthead pike-enter">
          <div className="pike-brand">{brand}</div>
          <div className="pike-meta">
            {piece.index} / {String(pieces.length).padStart(2, "0")}
          </div>
        </header>

        <div className="pike-body pike-enter">
          <h2 className="pike-name">{piece.name}</h2>
          <p className="pike-period">{piece.period}</p>
        </div>

        <div className="pike-foot pike-enter">
          <p className="pike-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
