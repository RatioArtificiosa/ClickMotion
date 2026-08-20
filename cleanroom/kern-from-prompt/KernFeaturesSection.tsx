"use client";

/**
 * KERN — MS-SEC-FEAT03
 * Kinetic poster features. Not a bento. Not Issue. Not Magic UI type kit.
 * Enter: offset-print. Signature after land: type-collision.
 * Language: kinetic-poster · Theme: poster-day · Primitive: type-collision
 * Pair: Revel, Helix, Verve.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./kern-features.css";

export type KernLockup = {
  id: string;
  index: string;
  a: string;
  b: string;
  name: string;
  place: string;
  period: string;
};

const DEFAULT_LOCKUPS: KernLockup[] = [
  {
    id: "paste",
    index: "01",
    a: "Tuesday",
    b: "Night",
    name: "On the avenue",
    place: "Echo Park, Los Angeles",
    period:
      "New posters went up on the avenue this week. They come down Sunday, because by then someone will have pasted over them anyway.",
  },
  {
    id: "ink",
    index: "02",
    a: "Black",
    b: "Red",
    name: "At the press",
    place: "Frenchmen Street, New Orleans",
    period:
      "Every sheet is two colors, black and a red that scuffs if you stack it wet. We wait. If you want it tomorrow, you want a different shop.",
  },
  {
    id: "type",
    index: "03",
    a: "Hand",
    b: "Set",
    name: "In the shop",
    place: "Hampden, Baltimore",
    period:
      "Every title is set by hand on Falls Road. If you want it faster, you want a printer, not this shop.",
  },
];

const OFFSET = getEnter("offset-print");

type Props = {
  lockups?: KernLockup[];
  brand?: string;
};

export default function KernFeaturesSection({
  lockups = DEFAULT_LOCKUPS,
  brand = "Kern",
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
    count: lockups.length,
    landed: ready,
    reduced,
    productId: "MS-SEC-FEAT03",
    virtualViewports: 2.4,
  });
  const [slam, setSlam] = useState(reduced);
  const lock = lockups[chapter] ?? lockups[0]!;

  useEffect(() => {
    if (reduced) {
      setSlam(true);
      return;
    }
    if (!ready) return;
    setSlam(false);
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setSlam(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [ready, chapter, reduced]);

  return (
    <section
      ref={rootRef}
      className="kern-root kern-root--pin"
      aria-label="Kern poster"
      data-entered={entered || reduced ? "true" : "false"}
      data-slam={slam ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="kern-sheet">
        <header className="kern-masthead">
          <div className="kern-brand">{brand}</div>
          <div className="kern-meta">
            {lock.index} / {String(lockups.length).padStart(2, "0")}
          </div>
        </header>

        <div className="kern-lockup" aria-live="polite">
          <span className="kern-word kern-a">{lock.a}</span>
          <span className="kern-word kern-b">{lock.b}</span>
        </div>

        <div className="kern-foot">
          <p className="kern-kicker">{lock.name}</p>
          <p className="kern-place">{lock.place}</p>
          <p className="kern-period">{lock.period}</p>
        </div>
      </div>
    </section>
  );
}
