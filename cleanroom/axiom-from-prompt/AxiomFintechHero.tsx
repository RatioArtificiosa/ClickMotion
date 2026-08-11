"use client";

/**
 * AXIOM — Institutional fintech inverted-markets hero (MS-HERO-AXIO01)
 *
 * High-end fintech hero. Full uncut inverted NYC film free-plays.
 * Thesis: markets invert; Axiom holds the line.
 *
 * Signature: fixed TRUE NORTH horizon - a level gold hairline that never
 * tilts while the inverted city plays. Scroll only drifts type; never seeks film.
 *
 * Direction: private-bank density x golden-hour film · no neon crypto kitsch.
 * Mode: free-play full film (never scroll-scrub).
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/** Client HD only - never storefront preview burn */
const VIDEO_SRC = "/assets/videos/axiom-upside-v1.mp4";

const NAV = [
  { label: "Platform", href: "#platform" },
  { label: "Markets", href: "#markets" },
  { label: "Research", href: "#research" },
  { label: "Access", href: "#access" },
] as const;

const PROOFS = [
  { value: "12µs", label: "Median decision path" },
  { value: "99.99%", label: "Matching uptime" },
  { value: "0 noise", label: "Signal policy" },
] as const;

export type AxiomFintechHeroProps = {
  brand?: string;
  backgroundSrc?: string;
};

export default function AxiomFintechHero({
  brand = "AXIOM",
  backgroundSrc = VIDEO_SRC,
}: AxiomFintechHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const [filmP, setFilmP] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduced) return;
    const onMeta = () => setDuration(v.duration || 0);
    const onTime = () => {
      if (v.duration) setFilmP(v.currentTime / v.duration);
    };
    const tryPlay = () => {
      v.play().catch(() => {});
    };
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("canplay", tryPlay);
    tryPlay();
    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("canplay", tryPlay);
    };
  }, [reduced]);

  const copyY = useTransform(scrollYProgress, [0, 0.55], [0, -14]);
  const copyOp = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.92]);
  const trackHeight = reduced ? "auto" : "175vh";

  const filmBarStyle: CSSProperties = {
    transform: `scaleX(${Math.min(1, Math.max(0, filmP))})`,
  };

  return (
    <section
      ref={trackRef}
      className="axiom-root"
      style={{ height: trackHeight }}
      aria-label={`${brand} fintech hero`}
      id="top"
    >
      <div className={`axiom-stage${reduced ? " axiom-stage--static" : ""}`}>
        {/* Full film — free-play, uncut, never scroll-scrubbed */}
        <div className="axiom-bg" aria-hidden>
          {!reduced ? (
            <video
              ref={videoRef}
              className="axiom-bg-video"
              src={backgroundSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <div className="axiom-bg-fallback" />
          )}
          <div className="axiom-bg-veil" />
          <div className="axiom-vignette" />
        </div>

        {/* Signature: level horizon — order while the world inverts */}
        <div className="axiom-horizon" aria-hidden>
          <div className="axiom-horizon-line" />
          <div className="axiom-horizon-badge">
            <span className="axiom-horizon-dot" />
            True north
          </div>
        </div>

        <nav className="axiom-nav" aria-label="Primary">
          <a className="axiom-brand" href="#top">
            {brand}
          </a>
          <ul className="axiom-nav-links">
            {NAV.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <a className="axiom-nav-cta" href="#access">
            Request access
          </a>
        </nav>

        <div className="axiom-layout">
          <motion.div
            className="axiom-copy"
            style={reduced ? undefined : { y: copyY, opacity: copyOp }}
          >
            <p className="axiom-kicker">Institutional markets · New York</p>
            <h1 className="axiom-title">
              <span>When markets</span>
              <span>turn upside down,</span>
              <span className="axiom-title-accent">we still know up.</span>
            </h1>
            <p className="axiom-lead">
              Axiom turns inverted noise into a single decision path.
              <br />
              Chaos stays in the frame. Clarity stays in the system.
            </p>

            <div className="axiom-proofs" role="list">
              {PROOFS.map((p) => (
                <div key={p.label} className="axiom-proof" role="listitem">
                  <span className="axiom-proof-value">{p.value}</span>
                  <span className="axiom-proof-label">{p.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <footer className="axiom-footer">
            <div className="axiom-film-meta">
              <span className="axiom-film-label">Axiom</span>
              <span className="axiom-film-time" aria-hidden>
                {duration
                  ? `${(filmP * duration).toFixed(1)}s · ${duration.toFixed(1)}s`
                  : "0.0s"}
              </span>
            </div>
            <div className="axiom-progress" aria-hidden>
              <div className="axiom-progress-track">
                <div className="axiom-progress-fill" style={filmBarStyle} />
              </div>
              <p className="axiom-progress-note">
                Wise, precise and tactical positions maintain the calm.
              </p>
            </div>
            <div className="axiom-footer-row">
              <p className="axiom-active">Order in inverted markets</p>
              <a className="axiom-cta" href="#access" id="access">
                Read the thesis
                <span aria-hidden>→</span>
              </a>
            </div>
          </footer>
        </div>
      </div>

      <style jsx global>{`
        .axiom-root {
          position: relative;
          width: 100%;
          background: #07090f;
          color: #eef2f7;
        }
        .axiom-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          min-height: 680px;
          overflow: hidden;
        }
        .axiom-stage--static {
          position: relative;
          height: auto;
          min-height: 100vh;
          padding-bottom: 3rem;
        }

        /* ── Film ── */
        .axiom-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .axiom-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          transform: scale(1.02);
        }
        .axiom-bg-fallback {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 50% 55%, #3d4a5c 0%, transparent 60%),
            linear-gradient(180deg, #1a2433 0%, #07090f 100%);
        }
        /* Left bias for type; keep vertical road + sun readable */
        .axiom-bg-veil {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(7, 9, 15, 0.78) 0%,
              rgba(7, 9, 15, 0.42) 26%,
              rgba(7, 9, 15, 0.08) 48%,
              rgba(7, 9, 15, 0.18) 72%,
              rgba(7, 9, 15, 0.45) 100%
            ),
            linear-gradient(
              180deg,
              rgba(7, 9, 15, 0.4) 0%,
              transparent 22%,
              transparent 62%,
              rgba(7, 9, 15, 0.72) 100%
            );
        }
        .axiom-vignette {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 140px 48px rgba(7, 9, 15, 0.45);
        }

        /* ── True north horizon (signature) ── */
        .axiom-horizon {
          position: absolute;
          left: 0;
          right: 0;
          top: 48%;
          z-index: 3;
          pointer-events: none;
          display: flex;
          align-items: center;
        }
        .axiom-horizon-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(212, 175, 106, 0.15) 8%,
            rgba(212, 175, 106, 0.55) 22%,
            rgba(212, 175, 106, 0.35) 50%,
            rgba(212, 175, 106, 0.55) 78%,
            rgba(212, 175, 106, 0.15) 92%,
            transparent 100%
          );
        }
        .axiom-horizon-badge {
          position: absolute;
          left: clamp(1.35rem, 4.5vw, 3.5rem);
          top: 50%;
          transform: translateY(-50%);
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.28rem 0.65rem 0.28rem 0.45rem;
          background: rgba(7, 9, 15, 0.55);
          border: 0.5px solid rgba(212, 175, 106, 0.35);
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
          font-family: var(--font-axiom-sans), system-ui, sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(238, 242, 247, 0.82);
        }
        .axiom-horizon-dot {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: #d4af6a;
          box-shadow: 0 0 10px rgba(212, 175, 106, 0.7);
        }

        /* ── Nav ── */
        .axiom-nav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 1.3rem clamp(1.25rem, 4vw, 3rem);
          pointer-events: none;
        }
        .axiom-nav a {
          pointer-events: auto;
          text-decoration: none;
          color: rgba(238, 242, 247, 0.92);
        }
        .axiom-brand {
          font-family: var(--font-axiom-sans), system-ui, sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          justify-self: start;
        }
        .axiom-nav-links {
          display: flex;
          gap: clamp(1.15rem, 2.4vw, 2rem);
          list-style: none;
          margin: 0;
          padding: 0;
          justify-self: center;
        }
        .axiom-nav-links a {
          font-family: var(--font-axiom-sans), system-ui, sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(238, 242, 247, 0.55);
          transition: color 0.3s ease;
        }
        .axiom-nav-links a:hover {
          color: #d4af6a;
        }
        .axiom-nav-cta {
          justify-self: end;
          font-family: var(--font-axiom-sans), system-ui, sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(238, 242, 247, 0.9);
          border-bottom: 1px solid rgba(212, 175, 106, 0.5);
          padding-bottom: 0.2rem;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .axiom-nav-cta:hover {
          color: #d4af6a;
          border-color: #d4af6a;
        }

        /* ── Layout ── */
        .axiom-layout {
          position: relative;
          z-index: 4;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding:
            clamp(5rem, 12vh, 6.5rem)
            clamp(1.35rem, 4.5vw, 3.5rem)
            clamp(1.35rem, 3.2vh, 2.2rem);
          box-sizing: border-box;
          max-width: 1480px;
          margin: 0 auto;
        }

        .axiom-copy {
          max-width: min(100%, 34rem);
          margin-bottom: clamp(1.5rem, 4vh, 2.75rem);
        }
        .axiom-kicker {
          margin: 0 0 0.85rem;
          font-family: var(--font-axiom-sans), system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #d4af6a;
        }
        .axiom-title {
          margin: 0;
          font-family: var(--font-axiom-display), "Times New Roman", serif;
          font-weight: 400;
          font-size: clamp(2.35rem, 5vw, 3.85rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #f4f7fb;
          text-shadow: 0 2px 36px rgba(0, 0, 0, 0.4);
        }
        .axiom-title span {
          display: block;
        }
        .axiom-title-accent {
          color: #f0e6d0;
          font-style: italic;
        }
        .axiom-lead {
          margin: 1.15rem 0 0;
          max-width: 56ch;
          font-family: var(--font-axiom-sans), system-ui, sans-serif;
          font-size: clamp(0.92rem, 1.2vw, 1.05rem);
          font-weight: 400;
          line-height: 1.55;
          color: rgba(238, 242, 247, 0.72);
        }

        .axiom-proofs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          margin-top: 1.6rem;
        }
        .axiom-proof {
          min-width: 7.5rem;
          padding: 0.7rem 0.85rem;
          background: rgba(10, 14, 22, 0.48);
          border: 0.5px solid rgba(212, 175, 106, 0.22);
          backdrop-filter: blur(16px) saturate(150%);
          -webkit-backdrop-filter: blur(16px) saturate(150%);
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .axiom-proof-value {
          font-family: var(--font-axiom-display), "Times New Roman", serif;
          font-size: 1.25rem;
          font-weight: 500;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
          color: #f4f7fb;
        }
        .axiom-proof-label {
          font-family: var(--font-axiom-sans), system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(238, 242, 247, 0.48);
        }

        /* ── Footer ── */
        .axiom-footer {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          width: 100%;
          max-width: 40rem;
        }
        .axiom-film-meta {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-family: var(--font-axiom-sans), system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(238, 242, 247, 0.4);
        }
        .axiom-film-label {
          color: rgba(212, 175, 106, 0.92);
        }
        .axiom-progress-track {
          height: 1px;
          width: 100%;
          background: rgba(238, 242, 247, 0.12);
          overflow: hidden;
        }
        .axiom-progress-fill {
          height: 100%;
          width: 100%;
          transform-origin: left center;
          background: linear-gradient(90deg, #d4af6a, #f0e0b8);
          transition: transform 0.08s linear;
        }
        .axiom-progress-note {
          margin: 0.4rem 0 0;
          font-family: var(--font-axiom-sans), system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.05em;
          color: rgba(238, 242, 247, 0.38);
        }
        .axiom-footer-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 0.2rem;
        }
        .axiom-active {
          margin: 0;
          font-family: var(--font-axiom-sans), system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(238, 242, 247, 0.48);
        }
        .axiom-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-axiom-sans), system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          color: #07090f;
          background: linear-gradient(180deg, #f4efe4 0%, #e4d2a8 100%);
          border: 0.5px solid rgba(212, 175, 106, 0.4);
          padding: 0.85rem 1.3rem;
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);
        }
        .axiom-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.34);
        }
        .axiom-cta span {
          transition: transform 0.3s ease;
        }
        .axiom-cta:hover span {
          transform: translateX(3px);
        }

        @media (max-width: 900px) {
          .axiom-nav {
            grid-template-columns: 1fr auto;
          }
          .axiom-nav-links {
            display: none;
          }
          .axiom-title {
            font-size: clamp(2rem, 8vw, 2.85rem);
          }
          .axiom-horizon {
            top: 44%;
          }
        }
        @media (max-width: 560px) {
          .axiom-proofs {
            width: 100%;
          }
          .axiom-proof {
            flex: 1 1 calc(50% - 0.4rem);
          }
          .axiom-footer-row {
            flex-direction: column;
            align-items: flex-start;
          }
          .axiom-cta {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
