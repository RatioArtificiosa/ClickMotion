"use client";

/**
 * DEW — MS-SEC-CTAS01
 * Organic waitlist close. Not three pills. Not a Mailchimp bar.
 * Enter: hem-lift. Signature after land: hold-to-confirm.
 * Language: organic · Theme: wellness-warm · Primitive: hold-to-confirm
 * Pair: Acne Secret, Aether, STILL.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getEnter, useSectionEnter } from "../_ms-section-enter/useSectionEnter";
import "./dew-cta.css";

const HEM = getEnter("hem-lift");
const HOLD_MS = 850;

type Props = {
  brand?: string;
  kicker?: string;
  headline?: string;
  period?: string;
  place?: string;
  ctaLabel?: string;
  doneLabel?: string;
};

export default function DewCtaSection({
  brand = "Dew",
  kicker = "This week",
  headline = "We only take twelve a week.",
  period = "That is how many faces we can actually do well. We write names in the late afternoon, when the light in Ojai stops being so hard.",
  place = "Ojai, California",
  ctaLabel = "Put my name down",
  doneLabel = "You're on the list",
}: Props) {
  const reduced = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLElement>(null);
  const { entered, landed } = useSectionEnter(rootRef, HEM.landMs);
  const [progress, setProgress] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const confirmedRef = useRef(false);
  const holdingRef = useRef(false);
  const holdRef = useRef<{ pulse: number; snap: number; end: () => void } | null>(null);

  const stopHold = useCallback((commit: boolean) => {
    const hold = holdRef.current;
    if (hold) {
      window.clearInterval(hold.pulse);
      window.clearTimeout(hold.snap);
      window.removeEventListener("pointerup", hold.end);
      window.removeEventListener("pointercancel", hold.end);
      window.removeEventListener("blur", hold.end);
      holdRef.current = null;
    }
    holdingRef.current = false;
    if (commit) {
      confirmedRef.current = true;
      setProgress(1);
      setConfirmed(true);
      return;
    }
    if (!confirmedRef.current) setProgress(0);
  }, []);

  const startHold = useCallback(() => {
    if (confirmedRef.current || holdingRef.current) return;
    if (reduced) {
      confirmedRef.current = true;
      setProgress(1);
      setConfirmed(true);
      return;
    }
    if (!landed) return;
    holdingRef.current = true;
    const t0 = performance.now();
    const end = () => stopHold(false);
    const step = () => {
      const t = Math.min(1, (performance.now() - t0) / HOLD_MS);
      setProgress(t);
    };
    step();
    const pulse = window.setInterval(step, 32);
    const snap = window.setTimeout(() => stopHold(true), HOLD_MS);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
    window.addEventListener("blur", end);
    holdRef.current = { pulse, snap, end };
  }, [landed, reduced, stopHold]);

  useEffect(() => () => stopHold(false), [stopHold]);

  const ready = landed || reduced;
  const label = confirmed ? doneLabel : ctaLabel;

  return (
    <section
      ref={rootRef}
      className="dew-root"
      aria-label="Dew list"
      data-entered={entered || reduced ? "true" : "false"}
      data-landed={ready ? "true" : "false"}
      data-confirmed={confirmed ? "true" : "false"}
    >
      <div className="dew-crop">
        <div className="dew-stage">
          <header className="dew-masthead">
            <div className="dew-brand">{brand}</div>
            <div className="dew-meta">{kicker}</div>
          </header>

          <div className="dew-body">
            <h2 className="dew-headline">{headline}</h2>
            <p className="dew-period">{period}</p>
            <p className="dew-place">{place}</p>
          </div>

          <div className="dew-foot">
            <button
              type="button"
              className="dew-cta"
              aria-label={label}
              aria-pressed={confirmed}
              aria-disabled={confirmed || !ready}
              aria-live="polite"
              style={{ ["--dew-hold" as string]: String(progress) }}
              onClick={() => {
                if (reduced) startHold();
              }}
              onPointerDown={(e) => {
                if (e.button !== 0) return;
                e.preventDefault();
                (e.currentTarget as HTMLButtonElement).focus();
                startHold();
              }}
              onPointerUp={() => stopHold(false)}
              onPointerLeave={() => stopHold(false)}
              onPointerCancel={() => stopHold(false)}
              onKeyDown={(e) => {
                if (e.key !== " " && e.key !== "Enter") return;
                e.preventDefault();
                startHold();
              }}
              onKeyUp={(e) => {
                if (e.key !== " " && e.key !== "Enter") return;
                e.preventDefault();
                stopHold(false);
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              <span className="dew-cta-fill" aria-hidden />
              <span className="dew-cta-ghost" aria-hidden>
                {label}
              </span>
              <span className="dew-cta-label dew-cta-label--rest" aria-hidden>
                {label}
              </span>
              <span className="dew-cta-label dew-cta-label--over" aria-hidden>
                {label}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
