"use client";

/**
 * NEXUS AI — Enterprise intelligence layer hero (MS-HERO-NEXU01)
 *
 * Free listing · free-playing neural lattice film. Scroll never seeks the film.
 * Signature: left decision-path rail (Sense → Route → Compound) + sequential
 * per-letter blur melt on the rotating headline verb + live system strip.
 * Not metric glass cards, not gradient headlines, not SaaS pill stacks.
 *
 * Direction: Anthropic/OpenAI launch restraint × institutional density ×
 * cyan/magenta neural void. Not Apex cryostat. Not Neon rain city.
 *
 * Client HD: /assets/videos/nexus-neural-v1.mp4
 */

import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Client HD (buyer film) — full free-play neural lattice. Never storefront preview. */
const VIDEO_SRC = "/assets/videos/nexus-neural-v1.mp4";
/** Pure film poster (no UI chrome). */
const POSTER_SRC = "/assets/posters/nexus-neural-v1.webp";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const NAV = [
  { label: "Platform", href: "#platform" },
  { label: "Models", href: "#models" },
  { label: "Safety", href: "#safety" },
  { label: "Research", href: "#research" },
] as const;

/** Signature system - product metaphor of the lattice film */
const PATH = [
  { step: "01", label: "Sense", note: "Signals enter clean" },
  { step: "02", label: "Route", note: "Policy owns the path" },
  { step: "03", label: "Compound", note: "Outcomes accumulate" },
] as const;

const TAPE = [
  { k: "GRAPH", v: "LIVE" },
  { k: "NODES", v: "14.2k" },
  { k: "ROUTES", v: "48" },
  { k: "EVAL", v: "CONT." },
  { k: "REGION", v: "GLOBAL" },
] as const;

/**
 * Per-letter Gaussian blur melt (ref: “Designed to mean …”).
 *
 * - Prefix “That ” is static.
 * - Period is part of each word: “compounds.”
 * - Every character is an independent span; each gets its OWN random start time.
 * - STRICT sequence: outgoing letters must fully finish melting out before
 *   the next word’s letters begin melting in (no overlap).
 * - Slow, elegant — not a whole-word fade, not a left→right wave.
 * Driven by GSAP so delays cannot collapse into a single block tween.
 */
const CYCLE_WORDS = [
  "compounds",
  "decides",
  "scales",
  "routes",
  "multiplies",
] as const;

/** How long each letter takes to go sharp ↔ smudge */
const CHAR_DUR = 1.45;
/** Random start window — letters begin at different times within this */
const RANDOM_WINDOW = 1.55;
/** Peak blur (px) */
const BLUR_PX = 28;
/** Fully sharp hold before next melt */
const HOLD_S = 3.2;

function buildLetterSpans(layer: HTMLElement, word: string) {
  layer.replaceChildren();
  const text = `${word}.`;
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.className = "nexus-cycle-char";
    span.textContent = text[i];
    span.setAttribute("aria-hidden", "true");
    layer.appendChild(span);
  }
  return layer.querySelectorAll<HTMLElement>(".nexus-cycle-char");
}

/** Each letter tweens on its own random delay — never as one block */
function meltLetters(
  chars: NodeListOf<HTMLElement> | HTMLElement[],
  toVisible: boolean
): gsap.core.Timeline {
  const tl = gsap.timeline();
  const list = Array.from(chars);
  list.forEach((el) => {
    // Independent start: e.g. letter 3 at 0.1s, letter 0 at 1.4s, period at 0.6s…
    const delay = Math.random() * RANDOM_WINDOW;
    const fromBlur = toVisible ? BLUR_PX : 0;
    const toBlur = toVisible ? 0 : BLUR_PX;
    const fromOp = toVisible ? 0 : 1;
    const toOp = toVisible ? 1 : 0;

    // Proxy object so blur px and opacity each animate independently per letter
    const state = { blur: fromBlur, opacity: fromOp };
    el.style.opacity = String(fromOp);
    el.style.filter = `blur(${fromBlur}px)`;

    tl.to(
      state,
      {
        blur: toBlur,
        opacity: toOp,
        duration: CHAR_DUR,
        ease: "power2.inOut",
        onUpdate: () => {
          el.style.opacity = String(state.opacity);
          el.style.filter = `blur(${state.blur}px)`;
        },
      },
      delay
    );
  });
  return tl;
}

function waitTl(tl: gsap.core.Timeline): Promise<void> {
  return new Promise((resolve) => {
    if (tl.duration() === 0) {
      resolve();
      return;
    }
    tl.eventCallback("onComplete", () => resolve());
  });
}

function NexusBlurCycle({
  words = CYCLE_WORDS,
  reduceMotion,
}: {
  words?: readonly string[];
  reduceMotion: boolean | null;
}) {
  const layerARef = useRef<HTMLSpanElement>(null);
  const layerBRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const longestDisplay = useMemo(
    () =>
      `${words.reduce((a, b) => (a.length >= b.length ? a : b), words[0])}.`,
    [words]
  );

  useEffect(() => {
    if (reduceMotion) return;
    const layerA = layerARef.current;
    const layerB = layerBRef.current;
    const live = liveRef.current;
    if (!layerA || !layerB) return;

    let cancelled = false;
    const layers = [layerA, layerB] as const;
    const pending: gsap.core.Tween[] = [];

    const setLive = (word: string) => {
      if (live) live.textContent = `${word}.`;
    };

    const hold = (s: number) =>
      new Promise<void>((resolve) => {
        const t = gsap.delayedCall(s, () => {
          if (!cancelled) resolve();
          else resolve();
        });
        pending.push(t);
      });

    const run = async () => {
      let idx = 0;
      let front = 0; // which layer is currently showing

      // First word — each letter sharpens on its own random clock
      const first = layers[front];
      const firstChars = buildLetterSpans(first, words[idx]);
      first.style.zIndex = "2";
      layers[1 - front].style.zIndex = "1";
      layers[1 - front].replaceChildren();
      setLive(words[idx]);
      await waitTl(meltLetters(firstChars, true));
      if (cancelled) return;

      while (!cancelled) {
        await hold(HOLD_S);
        if (cancelled) return;

        const nextIdx = (idx + 1) % words.length;
        const outLayer = layers[front];
        const inLayer = layers[1 - front];
        const outChars = outLayer.querySelectorAll<HTMLElement>(
          ".nexus-cycle-char"
        );

        // 1) Current word melts out completely (per-letter random).
        //    Next word must not start until this is fully done.
        outLayer.style.zIndex = "2";
        inLayer.style.zIndex = "1";
        inLayer.replaceChildren();
        await waitTl(meltLetters(outChars, false));
        if (cancelled) return;

        outLayer.replaceChildren();

        // 2) Only then: build next word and melt letters in.
        const inChars = buildLetterSpans(inLayer, words[nextIdx]);
        inLayer.style.zIndex = "2";
        setLive(words[nextIdx]);
        await waitTl(meltLetters(inChars, true));
        if (cancelled) return;

        front = 1 - front;
        idx = nextIdx;
      }
    };

    void run();

    return () => {
      cancelled = true;
      pending.forEach((t) => t.kill());
      gsap.killTweensOf(layerA.querySelectorAll(".nexus-cycle-char"));
      gsap.killTweensOf(layerB.querySelectorAll(".nexus-cycle-char"));
      gsap.killTweensOf([layerA, layerB]);
    };
  }, [reduceMotion, words]);

  if (reduceMotion) {
    return (
      <span className="nexus-title-sub">
        That {words[0]}.
      </span>
    );
  }

  return (
    <span className="nexus-title-sub">
      That{" "}
      <span className="nexus-cycle">
        {/* Screen-reader / a11y: current word+period */}
        <span ref={liveRef} className="sr-only" aria-live="polite" />
        {/* Layout reserve: longest word + period */}
        <span className="nexus-cycle-sizer" aria-hidden>
          {longestDisplay}
        </span>
        <span
          ref={layerARef}
          className="nexus-cycle-word"
          aria-hidden
        />
        <span
          ref={layerBRef}
          className="nexus-cycle-word"
          aria-hidden
        />
      </span>
    </span>
  );
}

export type NexusAiHeroProps = {
  brand?: string;
  backgroundSrc?: string;
  posterSrc?: string;
};

export default function NexusAiHero({
  brand = "NEXUS",
  backgroundSrc = VIDEO_SRC,
  posterSrc = POSTER_SRC,
}: NexusAiHeroProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || reduceMotion) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 767px)").matches) return;

    const wrap = videoWrapRef.current;
    const section = sectionRef.current;
    if (!wrap || !section) return;

    const tween = gsap.fromTo(
      wrap,
      { scale: 1 },
      {
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduceMotion]);

  const fade = (delay: number, y: number) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: EASE },
        };

  return (
    <section
      ref={sectionRef}
      className="nexus-root"
      id="top"
      aria-label={`${brand} AI enterprise hero`}
      style={{
        fontFamily: "var(--font-nexus-sans), system-ui, sans-serif",
      }}
    >
      <div ref={videoWrapRef} className="nexus-video-wrap" aria-hidden>
        {!reduceMotion ? (
          <video
            ref={videoRef}
            className="nexus-video"
            src={backgroundSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <div
            className="nexus-video nexus-video--still"
            style={{ backgroundImage: `url(${posterSrc})` }}
          />
        )}
        <div className="nexus-veil" />
        <div className="nexus-vignette" />
      </div>

      {/* Constellation plate - floats in film space, not a metric card */}
      <motion.aside
        className="nexus-constellation"
        aria-hidden
        {...fade(0.5, 10)}
      >
        <span className="nexus-constellation-dot" />
        <div className="nexus-constellation-body">
          <span className="nexus-constellation-k">Active graph</span>
          <span className="nexus-constellation-v">Inference lattice · multi-region</span>
        </div>
      </motion.aside>

      <header className="nexus-nav">
        <div className="nexus-nav-inner">
          <a className="nexus-brand" href="#top">
            <span className="nexus-brand-name">{brand}</span>
            <span className="nexus-brand-ai">AI</span>
          </a>

          <nav className="nexus-nav-links" aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => e.preventDefault()}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nexus-nav-actions">
            <a
              className="nexus-nav-text"
              href="#docs"
              onClick={(e) => e.preventDefault()}
            >
              Documentation
            </a>
            <a
              className="nexus-nav-cta"
              href="#access"
              onClick={(e) => e.preventDefault()}
            >
              Request access
            </a>
          </div>
        </div>
      </header>

      <div className="nexus-layout">
        {/* Signature: decision path - Sense → Route → Compound */}
        <motion.aside
          className="nexus-path"
          aria-label="Intelligence path"
          {...fade(0.08, 18)}
        >
          <p className="nexus-path-label">Path</p>
          <div className="nexus-path-track">
            <span className="nexus-path-line" aria-hidden />
            {PATH.map((node, i) => (
              <div
                key={node.step}
                className={`nexus-path-node${i === PATH.length - 1 ? " is-last" : ""}`}
              >
                <span className="nexus-path-bullet" aria-hidden />
                <span className="nexus-path-step">{node.step}</span>
                <span className="nexus-path-name">{node.label}</span>
                <span className="nexus-path-note">{node.note}</span>
              </div>
            ))}
            {/* After nodes so pulse always paints on top of bullets */}
            <span className="nexus-path-travel" aria-hidden />
          </div>
        </motion.aside>

        <div className="nexus-copy">
          <motion.p {...fade(0.12, -8)} className="nexus-kicker">
            <span className="nexus-kicker-id">NX / 01</span>
            <span className="nexus-kicker-rule" aria-hidden />
            <span>Intelligence layer for production systems</span>
          </motion.p>

          <motion.h1 {...fade(0.22, 28)} className="nexus-title">
            <span className="nexus-title-main">Intelligence.</span>
            <NexusBlurCycle reduceMotion={reduceMotion} />
          </motion.h1>

          <motion.p {...fade(0.36, 18)} className="nexus-lead">
            One stack for models, agents, and evaluation - built for teams that
            put AI on the critical path, not the slide deck.
          </motion.p>

          <motion.div {...fade(0.48, 14)} className="nexus-cta-row">
            <a
              className="nexus-cta-primary"
              href="#access"
              id="access"
              onClick={(e) => e.preventDefault()}
            >
              Begin with Nexus
            </a>
            <a
              className="nexus-cta-link"
              href="#platform"
              onClick={(e) => e.preventDefault()}
            >
              Read the architecture
              <span aria-hidden className="nexus-cta-arrow">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Live system tape - institutional, not glass KPI cards */}
      <motion.footer className="nexus-tape" {...fade(0.62, 8)}>
        <div className="nexus-tape-inner">
          <span className="nexus-tape-live">
            <span className="nexus-tape-pulse" aria-hidden />
            System
          </span>
          {TAPE.map((row, i) => (
            <span key={row.k} className="nexus-tape-item">
              {i > 0 && <span className="nexus-tape-sep" aria-hidden />}
              <span className="nexus-tape-k">{row.k}</span>
              <span className="nexus-tape-v">{row.v}</span>
            </span>
          ))}
        </div>
      </motion.footer>

      <div id="platform" className="sr-only" aria-hidden>
        Platform
      </div>
      <div id="models" className="sr-only" aria-hidden>
        Models
      </div>
      <div id="safety" className="sr-only" aria-hidden>
        Safety
      </div>
      <div id="research" className="sr-only" aria-hidden>
        Research
      </div>
      <div id="docs" className="sr-only" aria-hidden>
        Docs
      </div>

      <style jsx global>{`
        .nexus-root {
          position: relative;
          height: 100vh;
          min-height: 100dvh;
          min-height: 700px;
          overflow: hidden;
          background: #07080f;
          color: #e8f0ff;
        }
        .nexus-video-wrap {
          position: absolute;
          inset: 0;
          will-change: transform;
        }
        .nexus-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 58% center;
          transform: scale(1.015);
        }
        .nexus-video--still {
          background-size: cover;
          background-position: 58% center;
        }
        .nexus-veil {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(
              90deg,
              rgba(7, 8, 15, 0.94) 0%,
              rgba(7, 8, 15, 0.78) 26%,
              rgba(7, 8, 15, 0.35) 48%,
              rgba(7, 8, 15, 0.22) 72%,
              rgba(7, 8, 15, 0.4) 100%
            ),
            linear-gradient(
              180deg,
              rgba(7, 8, 15, 0.62) 0%,
              transparent 28%,
              transparent 58%,
              rgba(7, 8, 15, 0.82) 100%
            );
        }
        .nexus-vignette {
          position: absolute;
          inset: 0;
          pointer-events: none;
          box-shadow: inset 0 0 130px 48px rgba(7, 8, 15, 0.5);
        }

        /* Constellation plate in the film field */
        .nexus-constellation {
          position: absolute;
          right: clamp(1.25rem, 5vw, 3.5rem);
          top: 46%;
          z-index: 8;
          display: none;
          align-items: center;
          gap: 0.75rem;
          max-width: 14rem;
          pointer-events: none;
        }
        @media (min-width: 1100px) {
          .nexus-constellation {
            display: flex;
          }
        }
        .nexus-constellation-dot {
          flex-shrink: 0;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #00d4ff;
          box-shadow:
            0 0 0 4px rgba(0, 212, 255, 0.12),
            0 0 18px rgba(0, 212, 255, 0.85),
            0 0 28px rgba(255, 0, 110, 0.25);
          animation: nexusBreathe 3.2s ease-in-out infinite;
        }
        .nexus-constellation-body {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 0.55rem 0 0.55rem 0.85rem;
          border-left: 0.5px solid rgba(0, 212, 255, 0.35);
        }
        .nexus-constellation-k {
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(0, 212, 255, 0.85);
        }
        .nexus-constellation-v {
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.01em;
          color: rgba(232, 240, 255, 0.58);
          line-height: 1.35;
        }

        /* Nav - text first, no pill chrome */
        .nexus-nav {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          z-index: 30;
        }
        .nexus-nav-inner {
          margin: 0 auto;
          max-width: 1480px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding: 1.45rem clamp(1.35rem, 4.5vw, 3.5rem) 1.1rem;
          box-sizing: border-box;
          border-bottom: 0.5px solid rgba(255, 255, 255, 0.06);
        }
        .nexus-brand {
          display: inline-flex;
          align-items: baseline;
          gap: 0.4rem;
          text-decoration: none;
          color: #e8f0ff;
        }
        .nexus-brand-name {
          font-family: var(--font-nexus-display), system-ui, sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.08em;
        }
        .nexus-brand-ai {
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          color: rgba(0, 212, 255, 0.9);
        }
        .nexus-nav-links {
          display: none;
          gap: 1.75rem;
        }
        @media (min-width: 900px) {
          .nexus-nav-links {
            display: flex;
          }
        }
        .nexus-nav-links a {
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(232, 240, 255, 0.5);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .nexus-nav-links a:hover {
          color: #e8f0ff;
        }
        .nexus-nav-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .nexus-nav-text {
          display: none;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(232, 240, 255, 0.55);
          text-decoration: none;
          transition: color 0.3s ease;
        }
        @media (min-width: 640px) {
          .nexus-nav-text {
            display: inline;
          }
        }
        .nexus-nav-text:hover {
          color: #e8f0ff;
        }
        .nexus-nav-cta {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #e8f0ff;
          text-decoration: none;
          border-bottom: 1px solid rgba(0, 212, 255, 0.55);
          padding-bottom: 0.2rem;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .nexus-nav-cta:hover {
          color: #00d4ff;
          border-color: #00d4ff;
        }

        /* Layout: path rail + copy */
        .nexus-layout {
          position: relative;
          z-index: 10;
          height: 100%;
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          gap: 2rem;
          padding:
            6.25rem
            clamp(1.35rem, 4.5vw, 3.5rem)
            5.5rem;
          box-sizing: border-box;
          max-width: 1480px;
          margin: 0 auto;
        }
        @media (min-width: 960px) {
          .nexus-layout {
            grid-template-columns: 11.5rem minmax(0, 34rem);
            gap: clamp(2rem, 4vw, 3.5rem);
            align-items: center;
          }
        }

        /* Decision path signature */
        .nexus-path {
          display: none;
        }
        @media (min-width: 960px) {
          .nexus-path {
            display: block;
            padding-top: 0.35rem;
          }
        }
        .nexus-path-label {
          margin: 0 0 1.35rem;
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          font-size: 9px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(232, 240, 255, 0.35);
        }
        /*
          Shared rail: line, bullets, and travel all share one center X
          via left: var(--rail-x) + translateX(-50%).
          Equal-height nodes (flex:1) so travel 0%→50%→100% lands on 01/02/03.
        */
        .nexus-path-track {
          --rail-x: 5px;
          --node-size: 10px;
          --bullet-top: 0.4rem;
          position: relative;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          min-height: 11.5rem;
        }
        .nexus-path-line {
          position: absolute;
          left: var(--rail-x);
          top: calc(var(--bullet-top) + var(--node-size) / 2);
          /* last bullet sits in the final third of equal-height rows */
          bottom: calc(33.333% - var(--bullet-top) - var(--node-size) / 2);
          width: 1px;
          z-index: 0;
          transform: translateX(-50%);
          background: linear-gradient(
            180deg,
            rgba(0, 212, 255, 0.55) 0%,
            rgba(255, 0, 110, 0.35) 100%
          );
          opacity: 0.7;
        }
        .nexus-path-travel {
          position: absolute;
          left: var(--rail-x);
          top: var(--bullet-top);
          width: 5px;
          height: 5px;
          margin-top: calc((var(--node-size) - 5px) / 2);
          border-radius: 999px;
          z-index: 6;
          pointer-events: none;
          background: #f2f8ff;
          box-shadow:
            0 0 0 1px rgba(0, 212, 255, 0.5),
            0 0 10px rgba(0, 212, 255, 0.95),
            0 0 20px rgba(255, 0, 110, 0.4);
          /* linear + equal rows ⇒ mid/end land exactly on bullets 2 & 3 */
          animation: nexusTravel 4.5s linear infinite;
          will-change: top, transform, opacity;
        }
        .nexus-path-node {
          position: relative;
          z-index: 1;
          flex: 1 1 0;
          min-height: 0;
          padding-left: 1.45rem;
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-rows: auto auto;
          column-gap: 0.55rem;
          row-gap: 0.15rem;
          align-content: start;
        }
        .nexus-path-bullet {
          position: absolute;
          left: var(--rail-x);
          top: var(--bullet-top);
          width: var(--node-size);
          height: var(--node-size);
          border-radius: 999px;
          z-index: 2;
          background: #07080f;
          border: 1px solid rgba(0, 212, 255, 0.55);
          box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
          transform: translateX(-50%);
          transform-origin: center;
          animation: nexusNodeHit1 4.5s linear infinite;
        }
        /* Track children: line, node×3, travel — nodes are 2, 3, 4 */
        .nexus-path-node:nth-child(2) .nexus-path-bullet {
          animation-name: nexusNodeHit1;
        }
        .nexus-path-node:nth-child(3) .nexus-path-bullet {
          animation-name: nexusNodeHit2;
        }
        .nexus-path-node:nth-child(4) .nexus-path-bullet {
          animation-name: nexusNodeHit3;
        }
        .nexus-path-node.is-last .nexus-path-bullet {
          border-color: rgba(255, 0, 110, 0.55);
        }
        .nexus-path-step {
          grid-column: 1;
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          font-size: 9px;
          letter-spacing: 0.12em;
          color: rgba(232, 240, 255, 0.35);
          padding-top: 0.15rem;
        }
        .nexus-path-name {
          grid-column: 2;
          font-family: var(--font-nexus-display), system-ui, sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #e8f0ff;
        }
        .nexus-path-note {
          grid-column: 2;
          font-size: 11px;
          font-weight: 300;
          color: rgba(232, 240, 255, 0.42);
          line-height: 1.35;
        }

        .nexus-copy {
          max-width: min(100%, 34rem);
          min-width: 0;
        }
        .nexus-kicker {
          margin: 0 0 1.25rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.65rem;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(232, 240, 255, 0.55);
        }
        .nexus-kicker-id {
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
          letter-spacing: 0.16em;
          color: rgba(0, 212, 255, 0.9);
        }
        .nexus-kicker-rule {
          width: 1.25rem;
          height: 1px;
          background: rgba(255, 255, 255, 0.22);
        }
        .nexus-title {
          margin: 0;
          font-family: var(--font-nexus-display), system-ui, sans-serif;
        }
        .nexus-title-main {
          display: block;
          font-weight: 600;
          font-size: clamp(2.75rem, 7.4vw, 5.6rem);
          line-height: 0.96;
          letter-spacing: -0.045em;
          color: #f2f6ff;
          text-shadow: 0 2px 48px rgba(0, 0, 0, 0.4);
        }
        .nexus-title-sub {
          display: block;
          margin-top: 0.12em;
          font-weight: 400;
          font-size: clamp(2.15rem, 5.6vw, 4.15rem);
          line-height: 1.02;
          letter-spacing: -0.035em;
          color: rgba(232, 240, 255, 0.78);
        }
        /* Per-letter random blur melt (GSAP-driven spans) */
        .nexus-cycle {
          position: relative;
          display: inline-block;
          vertical-align: baseline;
          min-width: 0;
        }
        .nexus-cycle-sizer {
          visibility: hidden;
          display: inline-block;
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
        }
        .nexus-cycle-word {
          position: absolute;
          left: 0;
          top: 0;
          display: inline-flex;
          white-space: nowrap;
          pointer-events: none;
        }
        .nexus-cycle-char {
          display: inline-block;
          will-change: filter, opacity;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .nexus-lead {
          margin: 1.5rem 0 0;
          max-width: 30rem;
          font-size: clamp(0.98rem, 1.15vw, 1.08rem);
          font-weight: 300;
          line-height: 1.7;
          color: rgba(232, 240, 255, 0.64);
        }
        .nexus-cta-row {
          margin-top: 2rem;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 1.35rem 1.75rem;
        }
        .nexus-cta-primary {
          display: inline-flex;
          align-items: center;
          padding: 0.95rem 1.55rem;
          background: #e8f0ff;
          color: #07080f;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          transition:
            background 0.25s ease,
            transform 0.25s ease;
        }
        .nexus-cta-primary:hover {
          background: #fff;
          transform: translateY(-1px);
        }
        .nexus-cta-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(232, 240, 255, 0.72);
          text-decoration: none;
          border-bottom: 0.5px solid rgba(232, 240, 255, 0.28);
          padding-bottom: 0.2rem;
          transition: color 0.25s ease, border-color 0.25s ease;
        }
        .nexus-cta-link:hover {
          color: #00d4ff;
          border-color: rgba(0, 212, 255, 0.55);
        }
        .nexus-cta-arrow {
          transition: transform 0.25s ease;
        }
        .nexus-cta-link:hover .nexus-cta-arrow {
          transform: translateX(3px);
        }

        /* System tape footer */
        .nexus-tape {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 20;
          border-top: 0.5px solid rgba(255, 255, 255, 0.07);
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(7, 8, 15, 0.72) 40%,
            rgba(7, 8, 15, 0.88) 100%
          );
          backdrop-filter: blur(10px) saturate(120%);
          -webkit-backdrop-filter: blur(10px) saturate(120%);
        }
        .nexus-tape-inner {
          margin: 0 auto;
          max-width: 1480px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.35rem 0.15rem;
          padding: 0.85rem clamp(1.35rem, 4.5vw, 3.5rem);
          box-sizing: border-box;
          font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
        }
        .nexus-tape-live {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          margin-right: 0.85rem;
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(232, 240, 255, 0.5);
        }
        .nexus-tape-pulse {
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: #00d4ff;
          box-shadow: 0 0 8px rgba(0, 212, 255, 0.9);
          animation: nexusBreathe 2.4s ease-in-out infinite;
        }
        .nexus-tape-item {
          display: inline-flex;
          align-items: baseline;
          gap: 0.4rem;
        }
        .nexus-tape-sep {
          display: inline-block;
          width: 1px;
          height: 0.7rem;
          margin: 0 0.85rem 0 0.55rem;
          background: rgba(255, 255, 255, 0.12);
          vertical-align: middle;
        }
        .nexus-tape-k {
          font-size: 9px;
          letter-spacing: 0.16em;
          color: rgba(232, 240, 255, 0.32);
        }
        .nexus-tape-v {
          font-size: 10px;
          letter-spacing: 0.08em;
          color: rgba(232, 240, 255, 0.78);
        }
        @media (max-width: 640px) {
          .nexus-tape-item:nth-child(n + 5) {
            display: none;
          }
        }

        @keyframes nexusBreathe {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(0.92);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        /*
          Equal-height rows (flex:1 × 3): bullets at bullet-top in each row.
          Travel top: node1 → node3 = bullet-top → calc(66.666% + bullet-top).
          Linear mid (50%) is exactly node2. Always translateX(-50%) for rail center.
          Small while moving (scale ~0.85), large on hit (scale ~2 → fills 10px node).
        */
        @keyframes nexusTravel {
          0% {
            top: var(--bullet-top);
            opacity: 0;
            transform: translateX(-50%) scale(0.7);
          }
          2% {
            opacity: 1;
            transform: translateX(-50%) scale(2.05);
          }
          8% {
            opacity: 1;
            transform: translateX(-50%) scale(0.85);
          }
          46% {
            top: calc(33.333% + var(--bullet-top));
            transform: translateX(-50%) scale(0.85);
          }
          50% {
            top: calc(33.333% + var(--bullet-top));
            transform: translateX(-50%) scale(2.05);
          }
          56% {
            transform: translateX(-50%) scale(0.85);
          }
          92% {
            top: calc(66.666% + var(--bullet-top));
            opacity: 1;
            transform: translateX(-50%) scale(0.85);
          }
          96% {
            top: calc(66.666% + var(--bullet-top));
            opacity: 1;
            transform: translateX(-50%) scale(2.05);
          }
          100% {
            top: calc(66.666% + var(--bullet-top));
            opacity: 0;
            transform: translateX(-50%) scale(1.1);
          }
        }

        /* Hit flashes locked to travel land: 2%, 50%, 96% */
        @keyframes nexusNodeHit1 {
          0%,
          0.5% {
            background: #07080f;
            border-color: rgba(0, 212, 255, 0.55);
            box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
            transform: translateX(-50%) scale(1);
          }
          2% {
            background: #e8fbff;
            border-color: #ffffff;
            box-shadow:
              0 0 0 3px rgba(0, 212, 255, 0.4),
              0 0 18px rgba(0, 212, 255, 1),
              0 0 36px rgba(0, 212, 255, 0.65);
            transform: translateX(-50%) scale(1.45);
          }
          10% {
            background: rgba(0, 212, 255, 0.5);
            border-color: rgba(126, 240, 255, 0.95);
            box-shadow:
              0 0 0 2px rgba(0, 212, 255, 0.25),
              0 0 12px rgba(0, 212, 255, 0.65);
            transform: translateX(-50%) scale(1.12);
          }
          18%,
          100% {
            background: #07080f;
            border-color: rgba(0, 212, 255, 0.55);
            box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
            transform: translateX(-50%) scale(1);
          }
        }
        @keyframes nexusNodeHit2 {
          0%,
          47% {
            background: #07080f;
            border-color: rgba(0, 212, 255, 0.55);
            box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
            transform: translateX(-50%) scale(1);
          }
          50% {
            background: #e8fbff;
            border-color: #ffffff;
            box-shadow:
              0 0 0 3px rgba(0, 212, 255, 0.4),
              0 0 18px rgba(0, 212, 255, 1),
              0 0 36px rgba(0, 212, 255, 0.65);
            transform: translateX(-50%) scale(1.45);
          }
          58% {
            background: rgba(0, 212, 255, 0.5);
            border-color: rgba(126, 240, 255, 0.95);
            box-shadow:
              0 0 0 2px rgba(0, 212, 255, 0.25),
              0 0 12px rgba(0, 212, 255, 0.65);
            transform: translateX(-50%) scale(1.12);
          }
          66%,
          100% {
            background: #07080f;
            border-color: rgba(0, 212, 255, 0.55);
            box-shadow: 0 0 8px rgba(0, 212, 255, 0.2);
            transform: translateX(-50%) scale(1);
          }
        }
        @keyframes nexusNodeHit3 {
          0%,
          93% {
            background: #07080f;
            border-color: rgba(255, 0, 110, 0.55);
            box-shadow: 0 0 8px rgba(255, 0, 110, 0.18);
            transform: translateX(-50%) scale(1);
          }
          96% {
            background: #ffe8f2;
            border-color: #ffffff;
            box-shadow:
              0 0 0 3px rgba(255, 0, 110, 0.4),
              0 0 18px rgba(255, 0, 110, 0.95),
              0 0 36px rgba(255, 0, 110, 0.55);
            transform: translateX(-50%) scale(1.45);
          }
          100% {
            background: #07080f;
            border-color: rgba(255, 0, 110, 0.55);
            box-shadow: 0 0 8px rgba(255, 0, 110, 0.18);
            transform: translateX(-50%) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nexus-path-travel,
          .nexus-path-bullet,
          .nexus-tape-pulse,
          .nexus-constellation-dot {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
