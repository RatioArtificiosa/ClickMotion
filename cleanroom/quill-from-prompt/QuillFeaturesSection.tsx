"use client";

/**
 * QUILL — MS-SEC-FEAT08
 * Ink-riot features. Not Mark colophon. Not Kern collision.
 * Enter: offset-print. Signature after land: smoke-script.
 * Language: ink-riot · Theme: sumi-slash · Primitive: smoke-script
 * Pair: Revel, Helix, Verve.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./quill-features.css";

export type QuillPiece = {
  id: string;
  index: string;
  name: string;
  period: string;
};

const DEFAULT_PIECES: QuillPiece[] = [
  {
    id: "posters",
    index: "01",
    name: "Posters",
    period:
      "The lost-dog poster from May is still on a pole on Ledoux. People come in and ask if she made it home. She did. We still have the extra sheets.",
  },
  {
    id: "menus",
    index: "02",
    name: "Menus",
    period:
      "The taco truck on Paseo texts when the salsa changes. We reprint Thursday night so Friday lunch is not lying.",
  },
  {
    id: "marks",
    index: "03",
    name: "Marks",
    period:
      "A baker on Camino wanted a stamp that would still read through flour. It does. Everything in that shop has a dusting of it anyway.",
  },
];

const OFFSET = getEnter("offset-print");

type Props = {
  pieces?: QuillPiece[];
  brand?: string;
  place?: string;
};

export default function QuillFeaturesSection({
  pieces = DEFAULT_PIECES,
  brand = "Quill",
  place = "Ledoux Street, Taos",
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
  const { entered, landed } = useSectionEnter(rootRef, OFFSET.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: pieces.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-FEAT08",
    virtualViewports: 2.4,
  });
  const [smoke, setSmoke] = useState(reduced);
  const piece = pieces[chapter] ?? pieces[0]!;

  useEffect(() => {
    if (reduced) {
      setSmoke(true);
      return;
    }
    if (!ready) return;
    setSmoke(false);
    const t = window.setTimeout(() => setSmoke(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="quill-root quill-root--pin"
      aria-label="Quill work"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-smoke={smoke ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="quill-sheet">
        <header className="quill-masthead">
          <div className="quill-brand">{brand}</div>
          <div className="quill-meta">
            {piece.index} / {String(pieces.length).padStart(2, "0")}
          </div>
        </header>

        <div className="quill-lockup">
          <h2 className="quill-name">{piece.name}</h2>
          <p className="quill-period">{piece.period}</p>
        </div>

        <div className="quill-foot">
          <p className="quill-place">{place}</p>
        </div>
      </div>
    </section>
  );
}
