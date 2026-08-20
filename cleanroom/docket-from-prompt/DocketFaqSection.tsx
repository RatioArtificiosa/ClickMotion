"use client";

/**
 * DOCKET — MS-SEC-FAQS01
 * Typographic FAQ. One open question. Height-staged answer.
 * Enter: click-in (aggressive clerk). Signature after land: accordion-stage.
 * Language: calm-fintech · Theme: orbit-trust-dark · Primitive: accordion-stage
 * Pair: Orbit, Axiom, Nexus.
 */

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { enterPose, getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import "./docket-faq.css";

export type DocketItem = {
  id: string;
  index: string;
  question: string;
  answer: string[];
};

const DEFAULT_ITEMS: DocketItem[] = [
  {
    id: "keys",
    index: "01",
    question: "Who actually holds the keys?",
    answer: [
      "You do. Seats go to named people, not to \"the team.\" We will watch you rotate them. We will not keep a spare copy in a drawer here.",
      "If someone leaves, the seat is reissued. The history stays. The keys do not get forwarded in Slack.",
    ],
  },
  {
    id: "sit",
    index: "02",
    question: "Where does our data live?",
    answer: [
      "In the region you name in the contract. We do not spin up a replica in another country because it was convenient for us.",
      "If you need a second region, we write that down first. It is not assumed.",
    ],
  },
  {
    id: "desk",
    index: "03",
    question: "How long until someone can actually work?",
    answer: [
      "Ten business days after your counsel has signed and your login is ready.",
      "We do not start that clock from a slide deck. We start it when the first named person can sign in.",
    ],
  },
  {
    id: "incident",
    index: "04",
    question: "What happens when something breaks?",
    answer: [
      "You get one channel and a named person on our side. Status in writing within the hour.",
      "Your committee does not find out from Twitter. They hear it from the desk that holds the seat.",
    ],
  },
  {
    id: "paper",
    index: "05",
    question: "Can we run this on our own paper?",
    answer: [
      "Yes. Private cloud, or on-prem if that is what your board requires. Same product. Your envelope.",
      "That is a letter, not a checkbox on a pricing page.",
    ],
  },
  {
    id: "seat",
    index: "06",
    question: "What is a seat, in plain language?",
    answer: [
      "One named person, one book, one desk that picks up. Not a login shared across a floor.",
      "If that person leaves, we reissue the seat. The history stays. The keys do not wander.",
    ],
  },
];

const CLICK = getEnter("click-in");

type Props = {
  items?: DocketItem[];
  kicker?: string;
  heading?: string;
};

export default function DocketFaqSection({
  items = DEFAULT_ITEMS,
  kicker = "Questions",
  heading = "Ask us in writing.",
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const baseId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const { entered, landed } = useSectionEnter(rootRef, CLICK.landMs);
  const [openId, setOpenId] = useState("");

  const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
  const heightMs = reduced ? 0 : 0.42;
  const inkMs = reduced ? 0 : 0.2;

  useEffect(() => {
    if (!landed) return;
    setOpenId((current) => current || items[0]?.id || "");
  }, [landed, items]);

  return (
    <section
      ref={rootRef}
      className="docket-root"
      aria-label="Docket questions"
      data-entered={entered ? "true" : "false"}
      data-landed={landed ? "true" : "false"}
    >
      <div className="docket-stage">
        <header className="docket-masthead">
          <motion.div
            className="docket-brand"
            initial={false}
            animate={enterPose(entered, CLICK)}
            transition={{ ...CLICK.transition, delay: 0 }}
          >
            Docket
          </motion.div>
          <motion.div
            className="docket-meta"
            initial={false}
            animate={enterPose(entered, CLICK)}
            transition={{ ...CLICK.transition, delay: 0.04 }}
          >
            House counsel
          </motion.div>
          <motion.span
            className="docket-masthead-rule"
            aria-hidden
            initial={false}
            animate={{ scaleX: entered ? 1 : 0 }}
            transition={{ duration: 0.38, ease: [0.2, 0.12, 0.18, 1], delay: 0.02 }}
          />
        </header>

        <motion.p
          className="docket-kicker"
          initial={false}
          animate={enterPose(entered, CLICK)}
          transition={{ ...CLICK.transition, delay: 0.08 }}
        >
          {kicker}
        </motion.p>
        <motion.h2
          className="docket-heading"
          initial={false}
          animate={enterPose(entered, CLICK)}
          transition={{ ...CLICK.transition, delay: 0.12 }}
        >
          {heading}
        </motion.h2>

        <ul className="docket-list">
          {items.map((item, i) => {
            const open = openId === item.id;
            const panelId = `${baseId}-${item.id}`;
            const btnId = `${panelId}-btn`;
            return (
              <motion.li
                key={item.id}
                className="docket-item"
                data-open={open ? "true" : "false"}
                initial={false}
                animate={enterPose(entered, CLICK)}
                transition={{ ...CLICK.transition, delay: 0.2 + i * CLICK.stagger }}
              >
                <button
                  id={btnId}
                  type="button"
                  className="docket-q"
                  aria-expanded={open}
                  aria-controls={panelId}
                  tabIndex={landed ? undefined : -1}
                  onClick={() => {
                    if (!landed) return;
                    setOpenId(open ? "" : item.id);
                  }}
                >
                  <span className="docket-num">{item.index}</span>
                  <span className="docket-title">{item.question}</span>
                </button>
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="docket-a"
                  initial={false}
                  animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                  transition={{
                    height: { duration: heightMs, ease },
                    opacity: { duration: inkMs, ease },
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="docket-a-inner">
                    <span className="docket-rule" aria-hidden />
                    <div className="docket-body">
                      {item.answer.map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
