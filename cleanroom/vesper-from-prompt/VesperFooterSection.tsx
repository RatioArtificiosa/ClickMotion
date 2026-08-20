"use client";

/**
 * VESPER — MS-SEC-FOOT03
 * Velvet listening close. Not Port last call. Not Brine oysters. Not Veil perfume.
 * Enter: curtain-part. Signature after land: velvet-crush.
 * Language: velvet-nocturne · Theme: ultraviolet-silk · Primitive: velvet-crush
 * Pair: Revel, Sable, Dopamine.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./vesper-footer.css";

export type VesperRoom = {
  id: string;
  index: string;
  name: string;
  period: string;
};

const DEFAULT_ROOMS: VesperRoom[] = [
  {
    id: "front",
    index: "01",
    name: "Nine",
    period:
      "You're not late. Nothing much happens here until the boats quit for the night. Come in and set down whatever you carried.",
  },
  {
    id: "booth",
    index: "02",
    name: "Corner",
    period:
      "I keep the corner empty for people who arrived together. The table is small. A third person stands, and I'm not being cute about it.",
  },
  {
    id: "sunday",
    index: "03",
    name: "Three",
    period:
      "Sunday we open at three because mornings on this island are for grocery lines. The piano is the whole program. Stay as long as you want.",
  },
];

const DEFAULT_LINKS = [
  { id: "hours", label: "Hours" },
  { id: "records", label: "Records" },
  { id: "notes", label: "Notes" },
];

const CURTAIN = getEnter("curtain-part");

type Props = {
  rooms?: VesperRoom[];
  links?: { id: string; label: string }[];
  brand?: string;
  legal?: string;
  ctaLabel?: string;
  place?: string;
};

export default function VesperFooterSection({
  rooms = DEFAULT_ROOMS,
  links = DEFAULT_LINKS,
  brand = "Vesper",
  legal = "Closed Mondays. Doors at nine.",
  ctaLabel = "I'm coming tonight",
  place = "North Water Street, Edgartown",
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
  const { entered, landed } = useSectionEnter(rootRef, CURTAIN.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: rooms.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-FOOT03",
    virtualViewports: 2.4,
  });
  const [crush, setCrush] = useState(reduced);
  const room = rooms[chapter] ?? rooms[0]!;

  useEffect(() => {
    if (reduced) {
      setCrush(true);
      return;
    }
    if (!ready) return;
    setCrush(false);
    const t = window.setTimeout(() => setCrush(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <footer
      ref={rootRef}
      className="vesper-root vesper-root--pin"
      aria-label="Vesper close"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-crush={crush ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="vesper-stage">
        <header className="vesper-masthead vesper-enter">
          <div className="vesper-brand">{brand}</div>
          <div className="vesper-meta">
            {room.index} / {String(rooms.length).padStart(2, "0")}
          </div>
        </header>

        <div className="vesper-body vesper-enter">
          <h2 className="vesper-name">{room.name}</h2>
          <p className="vesper-period">{room.period}</p>
        </div>

        <div className="vesper-foot vesper-enter">
          <nav className="vesper-nav" aria-label="House">
            {links.map((link) => (
              <a key={link.id} href={`#${link.id}`} tabIndex={ready ? undefined : -1}>
                {link.label}
              </a>
            ))}
          </nav>
          <button type="button" className="vesper-cta" tabIndex={ready ? undefined : -1}>
            {ctaLabel}
          </button>
        </div>

        <div className="vesper-legal vesper-enter">
          <p>{legal}</p>
          <p>{place}</p>
        </div>
      </div>
    </footer>
  );
}
