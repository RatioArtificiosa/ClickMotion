"use client";

/**
 * ELYSE — Luxury wellness retreat scroll-as-narrative hero (MS-HERO-ELYS01)
 *
 * Full nature sanctuary film scrubbed by scroll. Scroll owns time.
 * Thesis: private retreats in the most beautiful places on earth.
 *
 * Direction: Aman / Six Senses restraint x private-bank type density x
 * golden-hour earth film. Not spa cream SaaS. Not climate-tech green.
 * Mode: scroll-as-narrative (GSAP ScrollTrigger scrub) - never free-play primary.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Client HD only - never storefront preview burn */
const VIDEO_SRC = "/assets/videos/elyse-nature-v1.mp4";
const POSTER_SRC = "/assets/posters/elyse-nature-v1.webp";

/** Chapters mapped to film progress (0–1 = full duration). */
const CHAPTERS = [
  {
    id: "call",
    range: [0, 0.24] as const,
    index: "01",
    eyebrow: "Chapter one  ·  The call",
    titleLines: ["The earth is", "still waiting."],
    body: "Beyond the noise, there are places where light moves slower. Elyse finds them - and holds them for the few who are ready to arrive.",
  },
  {
    id: "land",
    range: [0.24, 0.5] as const,
    index: "02",
    eyebrow: "Chapter two  ·  The land",
    titleLines: ["Sanctuaries,", "not destinations."],
    body: "Remote valleys. Quiet coasts. Forests that remember. Every site is chosen for silence, beauty, and the way the day opens.",
  },
  {
    id: "ritual",
    range: [0.5, 0.76] as const,
    index: "03",
    eyebrow: "Chapter three  ·  The practice",
    titleLines: ["Days shaped", "by intention."],
    body: "Guided rest. Bodywork. Table and trail. A private rhythm of ritual and restoration - never a schedule that owns you.",
  },
  {
    id: "return",
    range: [0.76, 1.01] as const,
    index: "04",
    eyebrow: "Chapter four  ·  The return",
    titleLines: ["Leave whole.", "Return clear."],
    body: "You do not escape life here. You meet it again - quieter, stronger, and on your own terms. That is the work of a true retreat.",
  },
] as const;

function chapterIndex(progress: number) {
  for (let i = 0; i < CHAPTERS.length; i++) {
    const [a, b] = CHAPTERS[i].range;
    if (progress >= a && progress < b) return i;
  }
  return CHAPTERS.length - 1;
}

export type ElyseScrollNarrativeProps = {
  brand?: string;
  backgroundSrc?: string;
  posterSrc?: string;
};

export default function ElyseScrollNarrative({
  brand = "ELYSE",
  backgroundSrc = VIDEO_SRC,
  posterSrc = POSTER_SRC,
}: ElyseScrollNarrativeProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const progressRef = useRef(0);

  const applyProgress = useCallback((p: number) => {
    const clamped = Math.min(1, Math.max(0, p));
    progressRef.current = clamped;
    setProgress(clamped);
    setActiveChapter(chapterIndex(clamped));

    const video = videoRef.current;
    if (video && video.duration && Number.isFinite(video.duration)) {
      const t = clamped * video.duration;
      if (Math.abs(video.currentTime - t) > 0.016) {
        try {
          video.currentTime = t;
        } catch {
          /* seek race before metadata */
        }
      }
    }

    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${clamped})`;
    }
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onMeta = () => {
      video.pause();
      video.currentTime = 0;
      setReady(true);
    };

    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);

    return () => video.removeEventListener("loadedmetadata", onMeta);
  }, [backgroundSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready) return;
    const onSeeked = () => {
      if (!video.duration || !Number.isFinite(video.duration)) return;
      applyProgress(video.currentTime / video.duration);
    };
    video.addEventListener("seeked", onSeeked);
    return () => video.removeEventListener("seeked", onSeeked);
  }, [ready, applyProgress]);

  useEffect(() => {
    if (!ready || reduced) return;
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!pin || !video) return;

    video.pause();

    const st = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.55,
      onUpdate: (self) => applyProgress(self.progress),
    });

    applyProgress(0);

    return () => {
      st.kill();
    };
  }, [ready, reduced, applyProgress]);

  useEffect(() => {
    if (!ready || !reduced) return;
    applyProgress(0.42);
  }, [ready, reduced, applyProgress]);

  const chapter = CHAPTERS[activeChapter];
  const showScrollCue = !reduced && progress < 0.045;
  const isFinale = activeChapter === CHAPTERS.length - 1;

  return (
    <div
      className="elyse-root"
      style={{
        fontFamily: "var(--font-elyse-sans), system-ui, sans-serif",
      }}
    >
      {/* Tall scroll track; sticky cinema stage */}
      <div
        ref={pinRef}
        className="elyse-pin"
        style={{ height: reduced ? "100vh" : "460vh" }}
      >
        <div className="elyse-stage">
          <video
            ref={videoRef}
            className="elyse-video"
            src={backgroundSrc}
            poster={posterSrc}
            muted
            playsInline
            preload="auto"
            // no autoplay — scroll owns time
            aria-hidden
          />

          {/* Veils: keep dual faces + sun luminous; type zone soft dark */}
          <div className="elyse-veil" aria-hidden />
          <div className="elyse-vignette" aria-hidden />

          {/* Signature: soft gold filament between the faces (metaphor of meeting) */}
          <div className="elyse-filament" aria-hidden>
            <span className="elyse-filament-dot" />
          </div>

          <header className="elyse-nav">
            <div className="elyse-nav-inner">
              <div className="elyse-brand-row">
                <a className="elyse-brand" href="#top" id="top">
                  {brand}
                </a>
                <span className="elyse-brand-rule" aria-hidden />
                <span className="elyse-brand-line">Private Wellness Retreats</span>
              </div>

              <nav className="elyse-nav-links" aria-label="Primary">
                {["Retreats", "Places", "Practice", "Membership"].map((item) => (
                  <a key={item} href="#request" onClick={(e) => e.preventDefault()}>
                    {item}
                  </a>
                ))}
              </nav>

              <a
                className="elyse-nav-cta"
                href="#request"
                onClick={(e) => e.preventDefault()}
              >
                Request invitation
                <span aria-hidden>→</span>
              </a>
            </div>
            <div className="elyse-progress-track">
              <div
                ref={progressBarRef}
                className="elyse-progress-fill"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </header>

          <div className="elyse-copy-wrap">
            <div className="elyse-copy-grid">
              <div className="elyse-copy">
                <p
                  key={`eye-${chapter.id}`}
                  className="elyse-eyebrow"
                  style={{
                    animation: reduced ? undefined : "elyseFade 0.7s ease both",
                  }}
                >
                  {chapter.eyebrow}
                </p>

                <h1
                  key={`title-${chapter.id}`}
                  className="elyse-title"
                  style={{
                    animation: reduced
                      ? undefined
                      : "elyseRise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
                  }}
                >
                  {chapter.titleLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h1>

                <p
                  key={`body-${chapter.id}`}
                  className="elyse-body"
                  style={{
                    animation: reduced
                      ? undefined
                      : "elyseFade 0.9s 0.08s ease both",
                  }}
                >
                  {chapter.body}
                </p>

                {isFinale && (
                  <div
                    className="elyse-cta-row"
                    style={{
                      animation: reduced
                        ? undefined
                        : "elyseFade 0.85s 0.14s ease both",
                    }}
                  >
                    <a
                      className="elyse-cta-primary"
                      href="#request"
                      onClick={(e) => e.preventDefault()}
                    >
                      Begin a private inquiry
                    </a>
                    <a
                      className="elyse-cta-ghost"
                      href="#request"
                      onClick={(e) => e.preventDefault()}
                    >
                      View the calendar
                    </a>
                  </div>
                )}
              </div>

              <div className="elyse-chapters" aria-hidden>
                <div className="elyse-chapter-list">
                  {CHAPTERS.map((c, i) => (
                    <div
                      key={c.id}
                      className={`elyse-chapter-item${
                        i === activeChapter ? " is-active" : ""
                      }`}
                    >
                      <span className="elyse-chapter-bar" />
                      <span className="elyse-chapter-num">{c.index}</span>
                    </div>
                  ))}
                </div>
                <p className="elyse-chapter-note">
                  Scroll to advance the film. Each chapter owns a beat of the land.
                </p>
              </div>
            </div>
          </div>

          {showScrollCue && (
            <div className="elyse-scroll-cue" data-ms-scroll-cue>
              <span>Scroll</span>
              <span className="elyse-scroll-line" />
            </div>
          )}

          {reduced && (
            <div className="elyse-reduced-note">
              Motion reduced · static chapter view
            </div>
          )}
        </div>
      </div>

      {/* Closing band — proves site beyond the film */}
      <section className="elyse-band" id="request">
        <div className="elyse-band-grid">
          <div>
            <p className="elyse-band-kicker">Membership</p>
            <h2 className="elyse-band-title">
              For those who measure
              <br />
              wealth in stillness.
            </h2>
            <p className="elyse-band-body">
              Elyse is a private house of wellness retreats - not a hotel brand,
              not a spa chain. Places are released by invitation. Guests arrive
              by introduction, not by algorithm.
            </p>
          </div>
          <div className="elyse-band-side">
            <div className="elyse-stats">
              {[
                { v: "12", k: "Active sanctuaries" },
                { v: "6", k: "Continents" },
                { v: "8", k: "Guests max" },
              ].map((s) => (
                <div key={s.k} className="elyse-stat">
                  <span className="elyse-stat-v">{s.v}</span>
                  <span className="elyse-stat-k">{s.k}</span>
                </div>
              ))}
            </div>
            <a
              className="elyse-band-cta"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Request an introduction
            </a>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .elyse-root {
          background: #0b0907;
          color: #f4ede3;
        }
        .elyse-pin {
          position: relative;
          width: 100%;
        }
        .elyse-stage {
          position: sticky;
          top: 0;
          height: 100vh;
          min-height: 640px;
          width: 100%;
          overflow: hidden;
          background: #0b0907;
        }
        .elyse-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 48%;
          transform: scale(1.02);
        }
        .elyse-veil {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(
              180deg,
              rgba(11, 9, 7, 0.72) 0%,
              rgba(11, 9, 7, 0.18) 28%,
              rgba(11, 9, 7, 0.08) 48%,
              rgba(11, 9, 7, 0.42) 72%,
              rgba(11, 9, 7, 0.88) 100%
            ),
            linear-gradient(
              90deg,
              rgba(11, 9, 7, 0.55) 0%,
              transparent 32%,
              transparent 68%,
              rgba(11, 9, 7, 0.4) 100%
            );
        }
        .elyse-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow: inset 0 0 140px 50px rgba(11, 9, 7, 0.42);
        }

        /* Soft gold breath at the meeting of the faces */
        .elyse-filament {
          position: absolute;
          left: 50%;
          top: 46%;
          z-index: 3;
          width: min(18vw, 220px);
          height: 1px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(201, 164, 106, 0.15) 20%,
            rgba(240, 217, 168, 0.55) 50%,
            rgba(201, 164, 106, 0.15) 80%,
            transparent 100%
          );
          opacity: 0.7;
        }
        .elyse-filament-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 5px;
          height: 5px;
          border-radius: 999px;
          transform: translate(-50%, -50%);
          background: #f0d9a8;
          box-shadow: 0 0 18px rgba(240, 217, 168, 0.85);
        }

        .elyse-nav {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          z-index: 30;
        }
        .elyse-nav-inner {
          margin: 0 auto;
          max-width: 1400px;
          height: 4.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(1.35rem, 4.5vw, 4rem);
          box-sizing: border-box;
        }
        .elyse-brand-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          min-width: 0;
        }
        .elyse-brand {
          font-family: var(--font-elyse-display), Georgia, serif;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: #f4ede3;
          text-decoration: none;
        }
        .elyse-brand-rule {
          display: none;
          width: 1px;
          height: 0.75rem;
          background: rgba(201, 164, 106, 0.5);
        }
        .elyse-brand-line {
          display: none;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(232, 213, 176, 0.7);
          white-space: nowrap;
        }
        @media (min-width: 640px) {
          .elyse-brand-rule,
          .elyse-brand-line {
            display: block;
          }
        }
        .elyse-nav-links {
          display: none;
          gap: 2rem;
        }
        @media (min-width: 900px) {
          .elyse-nav-links {
            display: flex;
          }
        }
        .elyse-nav-links a {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(244, 237, 227, 0.68);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .elyse-nav-links a:hover {
          color: #f4ede3;
        }
        .elyse-nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.15rem;
          border: 0.5px solid rgba(201, 164, 106, 0.45);
          background: rgba(201, 164, 106, 0.1);
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #f4ede3;
          text-decoration: none;
          transition:
            border-color 0.3s ease,
            background 0.3s ease;
        }
        .elyse-nav-cta:hover {
          border-color: #c9a46a;
          background: rgba(201, 164, 106, 0.2);
        }
        .elyse-nav-cta span {
          transition: transform 0.3s ease;
        }
        .elyse-nav-cta:hover span {
          transform: translateX(2px);
        }

        .elyse-progress-track {
          height: 1px;
          width: 100%;
          background: rgba(255, 255, 255, 0.1);
        }
        .elyse-progress-fill {
          height: 100%;
          width: 100%;
          transform-origin: left center;
          background: linear-gradient(
            90deg,
            #c9a46a 0%,
            #f0d9a8 55%,
            #c9a46a 100%
          );
        }

        .elyse-copy-wrap {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding:
            7rem
            clamp(1.35rem, 4.5vw, 4rem)
            clamp(1.5rem, 4vh, 3.25rem);
          box-sizing: border-box;
          pointer-events: none;
        }
        .elyse-copy-wrap a {
          pointer-events: auto;
        }
        .elyse-copy-grid {
          margin: 0 auto;
          width: 100%;
          max-width: 1400px;
          display: grid;
          gap: 2.5rem;
        }
        @media (min-width: 1024px) {
          .elyse-copy-grid {
            grid-template-columns: 1fr minmax(10rem, 14rem);
            align-items: end;
            gap: 3rem;
          }
        }
        .elyse-copy {
          min-width: 0;
          max-width: 40rem;
        }
        .elyse-eyebrow {
          margin: 0 0 1.1rem;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: #c9a46a;
        }
        .elyse-title {
          margin: 0;
          font-family: var(--font-elyse-display), Georgia, serif;
          font-weight: 500;
          font-size: clamp(2.4rem, 6.2vw, 5.35rem);
          line-height: 1.02;
          letter-spacing: -0.025em;
          color: #f7f1e8;
          text-shadow: 0 2px 40px rgba(0, 0, 0, 0.4);
        }
        .elyse-title span {
          display: block;
        }
        .elyse-body {
          margin: 1.4rem 0 0;
          max-width: 34rem;
          font-size: clamp(0.95rem, 1.15vw, 1.08rem);
          font-weight: 300;
          line-height: 1.7;
          color: rgba(244, 237, 227, 0.78);
          text-shadow: 0 1px 18px rgba(0, 0, 0, 0.35);
        }
        .elyse-cta-row {
          margin-top: 2rem;
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
        }
        .elyse-cta-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.95rem 1.75rem;
          background: #f4ede3;
          color: #0b0907;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .elyse-cta-primary:hover {
          background: #fff;
          transform: translateY(-1px);
        }
        .elyse-cta-ghost {
          display: inline-flex;
          align-items: center;
          padding: 0.95rem 1.75rem;
          border: 0.5px solid rgba(255, 255, 255, 0.28);
          color: rgba(244, 237, 227, 0.92);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          transition: border-color 0.25s ease, background 0.25s ease;
        }
        .elyse-cta-ghost:hover {
          border-color: rgba(255, 255, 255, 0.55);
          background: rgba(255, 255, 255, 0.06);
        }

        .elyse-chapters {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          align-items: flex-start;
        }
        @media (min-width: 1024px) {
          .elyse-chapters {
            align-items: flex-end;
            text-align: right;
          }
        }
        .elyse-chapter-list {
          display: flex;
          flex-direction: row;
          gap: 0.85rem;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .elyse-chapter-list {
            flex-direction: column;
            align-items: flex-end;
            gap: 0.75rem;
          }
        }
        .elyse-chapter-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .elyse-chapter-bar {
          display: block;
          height: 1px;
          width: 1rem;
          background: rgba(255, 255, 255, 0.25);
          transition: width 0.5s ease, background 0.5s ease;
        }
        .elyse-chapter-item.is-active .elyse-chapter-bar {
          width: 2.25rem;
          background: #c9a46a;
        }
        .elyse-chapter-num {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
          transition: color 0.5s ease;
        }
        .elyse-chapter-item.is-active .elyse-chapter-num {
          color: #c9a46a;
        }
        .elyse-chapter-note {
          display: none;
          margin: 0;
          max-width: 12rem;
          font-size: 11px;
          font-weight: 300;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.45);
        }
        @media (min-width: 1024px) {
          .elyse-chapter-note {
            display: block;
          }
        }

        .elyse-scroll-cue {
          position: absolute;
          bottom: 1.75rem;
          left: 50%;
          z-index: 30;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.45rem;
          pointer-events: none;
        }
        .elyse-scroll-cue span:first-child {
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.55);
        }
        .elyse-scroll-line {
          display: block;
          width: 1px;
          height: 2.6rem;
          background: linear-gradient(
            180deg,
            #c9a46a 0%,
            transparent 100%
          );
          animation: elysePulse 1.8s ease-in-out infinite;
        }
        .elyse-reduced-note {
          position: absolute;
          bottom: 1.75rem;
          left: 50%;
          z-index: 30;
          transform: translateX(-50%);
          font-size: 11px;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.45);
        }

        .elyse-band {
          position: relative;
          border-top: 0.5px solid rgba(255, 255, 255, 0.1);
          background: #0b0907;
          padding:
            clamp(3.5rem, 8vh, 6.5rem)
            clamp(1.35rem, 4.5vw, 4rem);
        }
        .elyse-band-grid {
          margin: 0 auto;
          max-width: 1400px;
          display: grid;
          gap: 3.5rem;
        }
        @media (min-width: 1024px) {
          .elyse-band-grid {
            grid-template-columns: 1.15fr 1fr;
            gap: 4rem;
            align-items: end;
          }
        }
        .elyse-band-kicker {
          margin: 0 0 1rem;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #c9a46a;
        }
        .elyse-band-title {
          margin: 0;
          font-family: var(--font-elyse-display), Georgia, serif;
          font-weight: 500;
          font-size: clamp(2rem, 4vw, 3.35rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #f4ede3;
        }
        .elyse-band-body {
          margin: 1.4rem 0 0;
          max-width: 28rem;
          font-size: 15px;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.58);
        }
        .elyse-band-side {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .elyse-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.25rem;
          border-top: 0.5px solid rgba(255, 255, 255, 0.1);
          padding-top: 1.75rem;
        }
        .elyse-stat-v {
          display: block;
          font-family: var(--font-elyse-display), Georgia, serif;
          font-size: clamp(1.6rem, 2.5vw, 2.1rem);
          color: #f4ede3;
        }
        .elyse-stat-k {
          display: block;
          margin-top: 0.35rem;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
        }
        .elyse-band-cta {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          padding: 1rem 1.85rem;
          border: 0.5px solid rgba(201, 164, 106, 0.5);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #f4ede3;
          text-decoration: none;
          transition: background 0.3s ease;
        }
        .elyse-band-cta:hover {
          background: rgba(201, 164, 106, 0.14);
        }

        @keyframes elyseFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes elyseRise {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes elysePulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scaleY(0.85);
          }
          50% {
            opacity: 1;
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
}
