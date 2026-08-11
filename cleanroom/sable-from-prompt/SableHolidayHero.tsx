"use client";

/**
 * SABLE — Cleanroom demo (not production)
 *
 * Luxury fashion holiday campaign hero.
 * Film plays the FULL walk uncut (free-play loop). Scroll is a short pin
 * for atmosphere only — never seeks the video.
 *
 * Direction: minimal · pearl/champagne · private-house editorial.
 * Film is the product. Type is sparse.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/** Locked client HD (buyer pack). Storefront previews are separate captures. */
const VIDEO_SRC = "/assets/videos/sable-winter-v1.mp4";

const NAV = [
  { label: "Collection", href: "#collection" },
  { label: "Look", href: "#look" },
  { label: "House", href: "#house" },
  { label: "Reserve", href: "#reserve" },
] as const;

export type SableHolidayHeroProps = {
  brand?: string;
  backgroundSrc?: string;
};

export default function SableHolidayHero({
  brand = "SABLE",
  backgroundSrc = VIDEO_SRC,
}: SableHolidayHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const [filmP, setFilmP] = useState(0);
  const [duration, setDuration] = useState(0);

  // Film owns time — full uncut loop. Never scroll-scrub.
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

  const introY = useTransform(scrollYProgress, [0, 0.5], [0, -8]);
  const trackHeight = reduced ? "auto" : "180vh";

  const filmBarStyle: CSSProperties = {
    transform: `scaleX(${Math.min(1, Math.max(0, filmP))})`,
  };

  return (
    <section
      ref={trackRef}
      className="sable-root"
      style={{ height: trackHeight }}
      aria-label={`${brand} holiday campaign hero`}
      id="top"
    >
      <div className={`sable-stage${reduced ? " sable-stage--static" : ""}`}>
        {/* Full film — free-playing, never cut or seeked by scroll */}
        <div className="sable-bg" aria-hidden>
          {!reduced ? (
            <video
              ref={videoRef}
              className="sable-bg-video"
              src={backgroundSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : (
            <div className="sable-bg-fallback" />
          )}
          <div className="sable-bg-veil" />
          <div className="sable-vignette" />
        </div>

        <nav className="sable-nav" aria-label="Primary">
          <a className="sable-brand" href="#top">
            {brand}
            <span className="sable-brand-mark" aria-hidden>
              .
            </span>
          </a>
          <ul className="sable-nav-links">
            {NAV.map((item) => (
              <li key={item.label}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <a className="sable-nav-cta" href="#reserve">
            Book private view
          </a>
        </nav>

        <div className="sable-layout" id="look">
          {!reduced ? (
            <motion.div
              className="sable-intro"
              style={{ y: introY }}
            >
              <p className="sable-season">Holiday 2026</p>
              <p className="sable-house">Maison Sable · Private collection</p>
            </motion.div>
          ) : (
            <div className="sable-intro">
              <p className="sable-season">Holiday 2026</p>
              <p className="sable-house">Maison Sable · Private collection</p>
            </div>
          )}

          {/* Spacer keeps subject clear — no mid-frame marketing copy */}
          <div className="sable-deck" aria-hidden />

          <footer className="sable-footer">
            <div className="sable-film-meta">
              <span className="sable-film-label">Maison Sable</span>
              <span className="sable-film-time" aria-hidden>
                {duration
                  ? `${Math.floor(filmP * duration)
                      .toString()
                      .padStart(2, "0")}s · ${Math.round(duration)}s`
                  : "—"}
              </span>
            </div>
            <div className="sable-progress" aria-hidden>
              <div className="sable-progress-track">
                <div className="sable-progress-fill" style={filmBarStyle} />
              </div>
              <p className="sable-progress-note">
                The holiday season is a time for love and luxury.
              </p>
            </div>
            <div className="sable-footer-row">
              <p className="sable-active">
                Holiday · Private collection
              </p>
              <a className="sable-cta" href="#reserve" id="reserve">
                Discover the collection
                <span aria-hidden>→</span>
              </a>
            </div>
          </footer>
        </div>
      </div>

      <style jsx global>{`
        .sable-root {
          position: relative;
          width: 100%;
          background: #0c0b0a;
          color: #f7f3ec;
        }
        .sable-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          min-height: 680px;
          overflow: hidden;
        }
        .sable-stage--static {
          position: relative;
          height: auto;
          min-height: 100vh;
          padding-bottom: 4rem;
        }

        .sable-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .sable-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 42%;
          transform: scale(1.01);
        }
        .sable-bg-fallback {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 50% 50% at 50% 40%, #3a4658 0%, transparent 55%),
            linear-gradient(180deg, #1a2230 0%, #0c0b0a 100%);
        }
        .sable-bg-veil {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(12, 11, 10, 0.55) 0%,
              rgba(12, 11, 10, 0.12) 28%,
              rgba(12, 11, 10, 0.05) 55%,
              rgba(12, 11, 10, 0.28) 100%
            ),
            linear-gradient(
              180deg,
              rgba(12, 11, 10, 0.42) 0%,
              transparent 28%,
              transparent 58%,
              rgba(12, 11, 10, 0.62) 100%
            );
        }
        .sable-vignette {
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 120px 40px rgba(12, 11, 10, 0.35);
          pointer-events: none;
        }

        .sable-nav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 20;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 1.35rem clamp(1.25rem, 4vw, 3rem);
          pointer-events: none;
        }
        .sable-nav a {
          pointer-events: auto;
          text-decoration: none;
          color: rgba(247, 243, 236, 0.92);
        }
        .sable-brand {
          font-family: var(--font-sable-display), "Times New Roman", serif;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          justify-self: start;
        }
        .sable-brand-mark {
          color: #c4a574;
          letter-spacing: 0;
          margin-left: 0.05em;
        }
        .sable-nav-links {
          display: flex;
          gap: clamp(1.2rem, 2.5vw, 2rem);
          list-style: none;
          margin: 0;
          padding: 0;
          justify-self: center;
        }
        .sable-nav-links a {
          font-family: var(--font-sable-sans), system-ui, sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(247, 243, 236, 0.62);
          transition: color 0.35s ease;
        }
        .sable-nav-links a:hover {
          color: #c4a574;
        }
        .sable-nav-cta {
          justify-self: end;
          font-family: var(--font-sable-sans), system-ui, sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(247, 243, 236, 0.88);
          border-bottom: 1px solid rgba(196, 165, 116, 0.55);
          padding-bottom: 0.2rem;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .sable-nav-cta:hover {
          color: #c4a574;
          border-color: #c4a574;
        }

        .sable-layout {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding:
            clamp(5rem, 12vh, 6.5rem)
            clamp(1.35rem, 4.5vw, 3.5rem)
            clamp(1.4rem, 3.5vh, 2.4rem);
          box-sizing: border-box;
          max-width: 1480px;
          margin: 0 auto;
        }

        .sable-intro {
          position: absolute;
          top: clamp(5.2rem, 12vh, 6.8rem);
          left: clamp(1.35rem, 4.5vw, 3.5rem);
        }
        .sable-season {
          margin: 0;
          font-family: var(--font-sable-sans), system-ui, sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #c4a574;
        }
        .sable-house {
          margin: 0.45rem 0 0;
          font-family: var(--font-sable-display), "Times New Roman", serif;
          font-size: clamp(0.95rem, 1.4vw, 1.15rem);
          font-weight: 400;
          letter-spacing: 0.08em;
          color: rgba(247, 243, 236, 0.72);
        }

        /* Open stage — film is the message */
        .sable-deck {
          flex: 1;
          min-height: clamp(8rem, 35vh, 18rem);
          pointer-events: none;
        }

        .sable-footer {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          max-width: 42rem;
        }
        .sable-film-meta {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-family: var(--font-sable-sans), system-ui, sans-serif;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(247, 243, 236, 0.42);
        }
        .sable-film-label {
          color: rgba(196, 165, 116, 0.9);
        }
        .sable-progress-track {
          height: 1px;
          width: 100%;
          background: rgba(247, 243, 236, 0.14);
          overflow: hidden;
        }
        .sable-progress-fill {
          height: 100%;
          width: 100%;
          transform-origin: left center;
          background: linear-gradient(90deg, #c4a574, #e8d5b0);
          transition: transform 0.08s linear;
        }
        .sable-progress-note {
          margin: 0.45rem 0 0;
          font-family: var(--font-sable-sans), system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.06em;
          color: rgba(247, 243, 236, 0.38);
        }
        .sable-footer-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 0.25rem;
        }
        .sable-active {
          margin: 0;
          font-family: var(--font-sable-sans), system-ui, sans-serif;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(247, 243, 236, 0.5);
        }
        .sable-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-sable-sans), system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          text-decoration: none;
          color: #0c0b0a;
          background: linear-gradient(180deg, #f4efe4 0%, #e8dcc8 100%);
          border: 0.5px solid rgba(196, 165, 116, 0.45);
          padding: 0.85rem 1.35rem;
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            background 0.35s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
        }
        .sable-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.28);
          background: linear-gradient(180deg, #faf6ee 0%, #edd9b8 100%);
        }
        .sable-cta span {
          font-size: 0.85em;
          transition: transform 0.3s ease;
        }
        .sable-cta:hover span {
          transform: translateX(3px);
        }

        @media (max-width: 860px) {
          .sable-nav {
            grid-template-columns: 1fr auto;
            gap: 0.5rem;
          }
          .sable-nav-links {
            display: none;
          }
          .sable-nav-cta {
            justify-self: end;
          }
          .sable-footer-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 520px) {
          .sable-cta {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
