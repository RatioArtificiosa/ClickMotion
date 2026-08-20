"use client";

/**
 * KILN — MS-SEC-FEAT04
 * Ceramic-gloss features. Not a bento. Not mint SaaS.
 * Enter: silk-slip. Signature after land: glaze-drip.
 * Language: ceramic-gloss · Theme: celadon-wet · Primitive: glaze-drip
 * Pair: Elyse, STILL, Aether.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./kiln-features.css";

export type KilnPiece = {
  id: string;
  index: string;
  name: string;
  period: string;
};

const DEFAULT_PIECES: KilnPiece[] = [
  {
    id: "bowls",
    index: "01",
    name: "Bowls",
    period:
      "These are the bowls we use at home, which is the only test I trust. They go in the dishwasher. They do not chip on the rim the first month.",
  },
  {
    id: "cups",
    index: "02",
    name: "Cups",
    period:
      "Coffee in the morning, wine at night, same cup. The handle does not get too hot if you pour like a normal person.",
  },
  {
    id: "lamps",
    index: "03",
    name: "Lamps",
    period:
      "A hallway lamp for a house on Main Street. She wanted it dim enough that it does not wake the baby, bright enough that you do not walk into the wall.",
  },
];

const SLIP = getEnter("silk-slip");

type Props = {
  pieces?: KilnPiece[];
  brand?: string;
  place?: string;
};

export default function KilnFeaturesSection({
  pieces = DEFAULT_PIECES,
  brand = "Kiln",
  place = "Seagrove, North Carolina",
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
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: pieces.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-FEAT04",
    virtualViewports: 2.4,
  });
  const [drip, setDrip] = useState(reduced);
  const piece = pieces[chapter] ?? pieces[0]!;

  useEffect(() => {
    if (reduced) {
      setDrip(true);
      return;
    }
    if (!ready) return;
    setDrip(false);
    const t = window.setTimeout(() => setDrip(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="kiln-root kiln-root--pin"
      aria-label="Kiln pieces"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-drip={drip ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="kiln-stage">
        <header className="kiln-masthead kiln-enter">
          <div className="kiln-brand">{brand}</div>
          <div className="kiln-meta">
            {piece.index} / {String(pieces.length).padStart(2, "0")}
          </div>
        </header>

        <div className="kiln-body kiln-enter">
          <h2 className="kiln-name">
            {piece.name}
            <span className="kiln-drip" aria-hidden />
          </h2>
          <p className="kiln-period">{piece.period}</p>
        </div>

        <div className="kiln-foot kiln-enter">
          <p className="kiln-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
