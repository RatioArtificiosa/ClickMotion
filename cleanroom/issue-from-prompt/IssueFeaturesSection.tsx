"use client";

/**
 * ISSUE — MS-SEC-FEAT02
 * Editorial capability spread. Not a bento. Not Helix. Not Witness quotes.
 * Enter: crop-reveal. Signature after land: paper-pivot.
 * Language: luxury-editorial · Theme: editorial-board-gray · Primitive: paper-pivot
 * Pair: Revel, Sable, Helix, Dopamine.
 */

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import { useChapterPin } from "../_ms-section-enter/useChapterPin";
import "../_ms-section-enter/chapter-pin.css";
import "./issue-features.css";

export type IssueRow = { label: string; value: string };

export type IssueStory = {
  id: string;
  index: string;
  name: string;
  figure: string;
  period: string;
  rows: IssueRow[];
};

const DEFAULT_STORIES: IssueStory[] = [
  {
    id: "pattern",
    index: "01",
    name: "Pattern room",
    figure: "12 hands",
    period: "West 38th. Twelve people on the table, muslin, and a season that does not have a name yet. We cut anyway.",
    rows: [
      { label: "Floor", value: "West 38th Street, New York" },
      { label: "Hands", value: "Twelve on the table" },
      { label: "Paper", value: "Markers and muslin" },
    ],
  },
  {
    id: "mill",
    index: "02",
    name: "Cloth mill",
    figure: "480 gsm",
    period: "Passaic weighs the wool. 480 gsm. If a lookbook says heavy and the mill says 320, we do not print the lookbook.",
    rows: [
      { label: "Mill", value: "Passaic, New Jersey" },
      { label: "Weight", value: "480 gsm wool" },
      { label: "Finish", value: "Piece dyed" },
    ],
  },
  {
    id: "last",
    index: "03",
    name: "Sample last",
    figure: "8 weeks",
    period: "Greenpoint. Eight weeks on the last before a sample walks. If you want it sooner, you are buying someone else's last.",
    rows: [
      { label: "Room", value: "Greenpoint, Brooklyn" },
      { label: "Last", value: "Eight weeks on file" },
      { label: "Size", value: "Women 8, men 9" },
    ],
  },
  {
    id: "press",
    index: "04",
    name: "Press check",
    figure: "2 inks",
    period: "Tenth Avenue. Black and one spot. The sheet has to match the cloth in the room, or we stop the run.",
    rows: [
      { label: "Press", value: "Tenth Avenue, New York" },
      { label: "Inks", value: "Black and one spot" },
      { label: "Hold", value: "Signed sheet before run" },
    ],
  },
];

const CROP = getEnter("crop-reveal");

type Props = {
  stories?: IssueStory[];
  brand?: string;
  kicker?: string;
  ctaLabel?: string;
};

export default function IssueFeaturesSection({
  stories = DEFAULT_STORIES,
  brand = "Issue",
  kicker = "The book",
  ctaLabel = "Ask for this season",
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLElement>(null);
  const { entered, landed } = useSectionEnter(rootRef, CROP.landMs);
  const { progress, chapter } = useChapterPin(rootRef, {
    count: stories.length,
    landed,
    reduced,
    productId: "MS-SEC-FEAT02",
    virtualViewports: 2.8,
  });
  const [play, setPlay] = useState(0);
  const story = stories[chapter] ?? stories[0]!;

  useEffect(() => {
    if (!landed) return;
    setPlay((n) => n + 1);
  }, [chapter, landed]);

  return (
    <section
      ref={rootRef}
      className="issue-root issue-root--pin"
      aria-label="Issue capabilities"
      data-entered={entered ? "true" : "false"}
      data-landed={landed ? "true" : "false"}
      style={{ ["--pin-p" as string]: String(progress) }}
    >
      <div className="ms-chapter-progress" aria-hidden>
        <span />
      </div>
      <div className="issue-crop">
        <div className="issue-stage">
          <header className="issue-masthead">
            <div className="issue-brand">{brand}</div>
            <div className="issue-meta">
              {String(chapter + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
            </div>
          </header>

          <div className="issue-body">
            <div className="issue-legend">
              <p className="issue-kicker">{kicker}</p>
            </div>

            <div className="issue-spread">
              <article
                key={`${story.id}-${play}`}
                className={play > 0 ? "issue-sheet issue-sheet--pivot" : "issue-sheet"}
                aria-live="polite"
              >
                <h2 className="issue-name">{story.name}</h2>
                <p className="issue-figure">{story.figure}</p>
                <p className="issue-period">{story.period}</p>
                <dl className="issue-rows">
                  {story.rows.map((row) => (
                    <div key={row.label} className="issue-row">
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>

              <div className="issue-foot">
                <button
                  type="button"
                  className="issue-cta"
                  tabIndex={landed ? undefined : -1}
                >
                  {ctaLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
