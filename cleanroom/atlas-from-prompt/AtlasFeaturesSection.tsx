"use client";

/**
 * ATLAS — MS-SEC-FEAT01
 * Swiss capability board. Not a bento. Not three icon cards.
 * Enter: paper-slide. Signature after land: text-split-reveal.
 * Language: swiss-minimal · Theme: swiss-light · Primitive: text-split-reveal
 * Pair: Terra Nova, Apex Quantum, Nexus.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { enterPose, getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./atlas-features.css";

export type AtlasRow = { label: string; value: string };

export type AtlasSystem = {
  id: string;
  index: string;
  name: string;
  figure: string;
  period: string;
  rows: AtlasRow[];
};

const DEFAULT_SYSTEMS: AtlasSystem[] = [
  {
    id: "survey",
    index: "01",
    name: "Site survey",
    figure: "22.4 ac",
    period: "We measured the Linden lot in February, before anyone started arguing about inverters. If the plat is wrong, everything after it is expensive.",
    rows: [
      { label: "Lot", value: "Linden, New Jersey" },
      { label: "Instrument", value: "LiDAR and ground control" },
      { label: "Paper", value: "Union County plat" },
    ],
  },
  {
    id: "storage",
    index: "02",
    name: "Battery yard",
    figure: "16 MWh",
    period: "The packs sit on a pad in Elizabeth, outdoors, the way the fire marshal wrote it. This is not a slide with a pretty box on it.",
    rows: [
      { label: "Yard", value: "Elizabeth, New Jersey" },
      { label: "Chemistry", value: "LFP, outdoor rated" },
      { label: "Fire", value: "NFPA 855, written" },
    ],
  },
  {
    id: "grid",
    index: "03",
    name: "Grid feed",
    figure: "69 kV",
    period: "One line to Public Service at 69 kV. One drawing. If your counsel wants a second interconnect story, we do not have one.",
    rows: [
      { label: "Utility", value: "Public Service Electric and Gas" },
      { label: "Voltage", value: "69 kV at the fence" },
      { label: "Study", value: "System impact, on file" },
    ],
  },
  {
    id: "permit",
    index: "04",
    name: "County paper",
    figure: "Type II",
    period: "Union County will not let steel on the lot until the drawing matches. We have watched people try to reverse that. It does not reverse.",
    rows: [
      { label: "County", value: "Union County, New Jersey" },
      { label: "Shell", value: "Type II steel and deck" },
      { label: "Hold", value: "Permit before steel" },
    ],
  },
];

const SLIDE = getEnter("paper-slide");
const SPLIT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Props = {
  systems?: AtlasSystem[];
  brand?: string;
  kicker?: string;
  ctaLabel?: string;
};

function SplitName({
  text,
  play,
  reduced,
}: {
  text: string;
  play: number;
  reduced: boolean;
}) {
  const words = text.split(" ");
  return (
    <h2 className="atlas-name">
      {words.map((word, i) => (
        <span key={`${play}-${word}-${i}`} className="atlas-name-mask">
          <motion.span
            className="atlas-name-word"
            initial={reduced ? false : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: reduced ? 0 : 0.7,
              delay: reduced ? 0 : i * 0.028,
              ease: SPLIT_EASE,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

export default function AtlasFeaturesSection({
  systems = DEFAULT_SYSTEMS,
  brand = "Atlas",
  kicker = "Systems",
  ctaLabel = "Send me the drawing",
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLElement>(null);
  const { entered, landed } = useSectionEnter(rootRef, SLIDE.landMs);
  const { progress, chapter } = useChapterPin(rootRef, {
    count: systems.length,
    landed,
    reduced,
    productId: "MS-SEC-FEAT01",
    virtualViewports: 2.8,
  });
  const [play, setPlay] = useState(0);
  const system = systems[chapter] ?? systems[0]!;
  const enterFrom = reduced ? false : SLIDE.from;

  useEffect(() => {
    if (!landed) return;
    setPlay((n) => n + 1);
  }, [chapter, landed]);

  return (
    <section
      ref={rootRef}
      className="atlas-root atlas-root--pin"
      aria-label="Atlas systems"
      data-entered={entered ? "true" : "false"}
      data-landed={landed ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="atlas-stage">
        <header className="atlas-masthead">
          <motion.div
            className="atlas-brand"
            initial={enterFrom}
            animate={enterPose(entered, SLIDE)}
            transition={{ ...SLIDE.transition, delay: 0 }}
          >
            {brand}
          </motion.div>
          <motion.div
            className="atlas-meta"
            initial={enterFrom}
            animate={enterPose(entered, SLIDE)}
            transition={{ ...SLIDE.transition, delay: 0.06 }}
          >
            {String(chapter + 1).padStart(2, "0")} / {String(systems.length).padStart(2, "0")}
          </motion.div>
          <motion.span
            className="atlas-masthead-rule"
            aria-hidden
            initial={reduced ? false : { scaleX: 0 }}
            animate={{ scaleX: entered ? 1 : 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.04 }}
          />
        </header>

        <div className="atlas-body">
          <div className="atlas-legend">
            <motion.p
              className="atlas-kicker"
              initial={enterFrom}
              animate={enterPose(entered, SLIDE)}
              transition={{ ...SLIDE.transition, delay: 0.1 }}
            >
              {kicker}
            </motion.p>
          </div>

          <div className="atlas-main">
            <div className="atlas-display" aria-live="polite">
              <div className="atlas-plate">
                <SplitName
                  key={`${system.id}-${play}-${entered ? "in" : "pre"}`}
                  text={system.name}
                  play={play}
                  reduced={reduced || !entered}
                />
                <motion.p
                  key={`${system.id}-fig-${play}`}
                  className="atlas-figure"
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{
                    duration: reduced ? 0 : 0.55,
                    delay: reduced ? 0 : 0.12,
                    ease: SPLIT_EASE,
                  }}
                >
                  {system.figure}
                </motion.p>
                <motion.p
                  key={`${system.id}-period-${play}`}
                  className="atlas-period"
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{
                    duration: reduced ? 0 : 0.5,
                    delay: reduced ? 0 : 0.2,
                    ease: SPLIT_EASE,
                  }}
                >
                  {system.period}
                </motion.p>
              </div>
            </div>

            <motion.div
              className="atlas-rule"
              aria-hidden
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: entered ? 1 : 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            />

            <dl className="atlas-rows">
              {system.rows.map((row, i) => (
                <motion.div
                  key={`${system.id}-${row.label}`}
                  className="atlas-row"
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: "0px" }}
                  transition={{
                    duration: reduced ? 0 : 0.38,
                    delay: reduced ? 0 : 0.08 + i * 0.05,
                    ease: SPLIT_EASE,
                  }}
                >
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </motion.div>
              ))}
            </dl>

            <div className="atlas-foot">
              <motion.button
                type="button"
                className="atlas-cta"
                initial={enterFrom}
                animate={enterPose(entered, SLIDE)}
                transition={{ ...SLIDE.transition, delay: 0.48 }}
                whileTap={landed && !reduced ? { scale: 0.98 } : undefined}
                tabIndex={landed ? undefined : -1}
              >
                {ctaLabel}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
