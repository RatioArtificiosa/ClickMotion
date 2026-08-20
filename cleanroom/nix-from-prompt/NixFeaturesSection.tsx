"use client";

/**
 * NIX — MS-SEC-FEAT07
 * Resin-ice objects. Not Cast amber flip. Not a soda field.
 * Enter: fade-hold. Signature after land: bubble-loom.
 * Language: resin-object · Theme: resin-ice · Primitive: bubble-loom
 * Pair: Prism, Mirage, Verve.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./nix-features.css";

export type NixPiece = {
  id: string;
  index: string;
  name: string;
  period: string;
};

const DEFAULT_PIECES: NixPiece[] = [
  {
    id: "cuff",
    index: "01",
    name: "Cuff",
    period:
      "I wear it to the office. Security asked if it was glass. I told them to tap it. They did, and then they asked where I got it.",
  },
  {
    id: "comb",
    index: "02",
    name: "Comb",
    period:
      "It lives next to the keys. I grab it with one hand while the coffee is still too hot to drink, which is most mornings.",
  },
  {
    id: "disc",
    index: "03",
    name: "Disc",
    period:
      "Bills go under it so they do not blow off when the kitchen window is open. That is the whole job, and it does it.",
  },
];

const FADE = getEnter("fade-hold");

type Props = {
  pieces?: NixPiece[];
  brand?: string;
  place?: string;
};

export default function NixFeaturesSection({
  pieces = DEFAULT_PIECES,
  brand = "Nix",
  place = "Commercial Street, Portland, Maine",
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
  const { entered, landed } = useSectionEnter(rootRef, FADE.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: pieces.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-FEAT07",
    virtualViewports: 2.4,
  });
  const [loom, setLoom] = useState(reduced);
  const piece = pieces[chapter] ?? pieces[0]!;

  useEffect(() => {
    if (reduced) {
      setLoom(true);
      return;
    }
    if (!ready) return;
    setLoom(false);
    const t = window.setTimeout(() => setLoom(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="nix-root nix-root--pin"
      aria-label="Nix objects"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-loom={loom ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="nix-stage">
        <header className="nix-masthead nix-enter">
          <div className="nix-brand">{brand}</div>
          <div className="nix-meta">
            {piece.index} / {String(pieces.length).padStart(2, "0")}
          </div>
        </header>

        <div className="nix-body nix-enter">
          <div className="nix-ice" aria-hidden>
            <span className="nix-bubble" />
          </div>
          <div>
            <h2 className="nix-name">{piece.name}</h2>
            <p className="nix-period">{piece.period}</p>
          </div>
        </div>

        <div className="nix-foot nix-enter">
          <p className="nix-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
