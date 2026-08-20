"use client";

/**
 * BRINE — MS-SEC-FOOT02
 * Arcade-atelier close. Not Clear desks. Not a neon city.
 * Enter: pop-in. Signature after land: neon-ignite.
 * Language: arcade-atelier · Theme: ice-silver · Primitive: neon-ignite
 * Pair: Verve, Actually!, Dopamine.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./brine-footer.css";

export type BrineRoom = {
  id: string;
  index: string;
  name: string;
  period: string;
};

const DEFAULT_ROOMS: BrineRoom[] = [
  {
    id: "penn",
    index: "01",
    name: "Penn Avenue",
    period:
      "Friday the last dozen is usually gone by 8:30. We do not pull extras out of a freezer and pretend they just arrived.",
  },
  {
    id: "smallman",
    index: "02",
    name: "Smallman",
    period:
      "If you are coming for stew after work, park behind the produce sheds. The meters on Smallman start writing tickets at six, and they do not care that you were only going to be ten minutes.",
  },
  {
    id: "sixteenth",
    index: "03",
    name: "Sixteenth Street",
    period:
      "Sunday the back TV is the Steelers. The stew does not change because there is a game. If you want wings, there is a place two blocks up.",
  },
];

const DEFAULT_LINKS = [
  { id: "hours", label: "Hours" },
  { id: "oysters", label: "Oysters" },
  { id: "parking", label: "Parking" },
];

const POP = getEnter("pop-in");

type Props = {
  rooms?: BrineRoom[];
  links?: { id: string; label: string }[];
  brand?: string;
  kicker?: string;
  legal?: string;
  ctaLabel?: string;
};

export default function BrineFooterSection({
  rooms = DEFAULT_ROOMS,
  links = DEFAULT_LINKS,
  brand = "Brine",
  kicker = "Open",
  legal = "Closed Mondays. Oysters Wednesday through Saturday.",
  ctaLabel = "This week's oysters",
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
  const { entered, landed } = useSectionEnter(rootRef, POP.landMs);
  const ready = landed || reduced;
  const { progress, chapter } = useChapterPin(rootRef, {
    count: rooms.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-FOOT02",
    virtualViewports: 2.4,
  });
  const [ignite, setIgnite] = useState(reduced);
  const room = rooms[chapter] ?? rooms[0]!;

  useEffect(() => {
    if (reduced) {
      setIgnite(true);
      return;
    }
    if (!ready) return;
    setIgnite(false);
    const t = window.setTimeout(() => setIgnite(true), 40);
    return () => window.clearTimeout(t);
  }, [ready, chapter, reduced]);

  return (
    <footer
      ref={rootRef}
      className="brine-root brine-root--pin"
      aria-label="Brine close"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-ignite={ignite ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="brine-stage">
        <header className="brine-masthead brine-enter">
          <div className="brine-brand">
            {brand}
            <span className="brine-tube" aria-hidden />
          </div>
          <div className="brine-meta">
            {room.index} / {String(rooms.length).padStart(2, "0")}
          </div>
        </header>

        <div className="brine-body brine-enter">
          <h2 className="brine-name">{room.name}</h2>
          <p className="brine-period">{room.period}</p>
        </div>

        <div className="brine-foot brine-enter">
          <nav className="brine-nav" aria-label="House">
            {links.map((link) => (
              <a key={link.id} href={`#${link.id}`} tabIndex={ready ? undefined : -1}>
                {link.label}
              </a>
            ))}
          </nav>
          <button type="button" className="brine-cta" tabIndex={ready ? undefined : -1}>
            {ctaLabel}
          </button>
        </div>

        <p className="brine-legal brine-enter">{legal}</p>
      </div>
    </footer>
  );
}
