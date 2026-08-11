"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Client HD B-roll — pure film, no UI. */
const VIDEO_SRC = "/assets/videos/neon-forge-city-v1.mp4";
const POSTER_SRC = "/assets/posters/neon-forge-city-v1.webp";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const NAV_LINKS = ["Work", "Games", "Studio", "Careers", "Contact"] as const;

const liquidGlassStrong: CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(50px)",
  WebkitBackdropFilter: "blur(50px)",
  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)",
};

/**
 * NEON FORGE cleanroom hero — built from BUYER_PROMPT.md only.
 * Signature: full-viewport city film + glitch H1 + desktop parallax.
 */
export default function NeonForgeHeroSection() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

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
  }, []);

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
        scale: 1.06,
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

  useEffect(() => {
    if (reduceMotion) return;
    const t = window.setTimeout(() => setEntered(true), 900);
    return () => window.clearTimeout(t);
  }, [reduceMotion]);

  const fade = (delay: number, y: number) =>
    reduceMotion
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.4, delay },
        }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-5 md:px-12 lg:px-16">
        <a
          href="#top"
          className="flex min-w-0 items-center gap-2 font-[family-name:var(--font-display,system-ui,sans-serif)] text-lg font-bold tracking-tight text-[#00F0FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
        >
          <span
            className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#00F0FF]"
            style={{ boxShadow: "0 0 12px #00F0FF" }}
            aria-hidden
          />
          NEON FORGE
        </a>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:text-[#00F0FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
            style={liquidGlassStrong}
          >
            <Play className="h-4 w-4" aria-hidden />
            Play Demo
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-full bg-[#00F0FF] px-4 py-2 text-sm font-semibold text-black transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
          >
            Get Started
          </button>
        </div>
      </header>

      <section
        ref={sectionRef}
        id="top"
        className="relative h-screen overflow-hidden"
        aria-label="NEON FORGE hero"
      >
        <div
          ref={videoWrapRef}
          className="absolute inset-0 will-change-transform"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            aria-hidden
          />
        </div>

        {/* Dual scrim — type legibility without crushing the film */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background: [
              "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 48%, rgba(0,0,0,0.25) 100%)",
              "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, transparent 32%, rgba(0,0,0,0.55) 100%)",
            ].join(", "),
          }}
        />

        {/* Scanline + cyan vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          aria-hidden
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.02) 2px, rgba(0,240,255,0.02) 4px)",
            boxShadow: "inset 0 0 120px rgba(0,240,255,0.06)",
          }}
        />

        <div className="relative z-10 flex h-full max-w-[42rem] flex-col items-start justify-center px-8 md:px-12 lg:px-16">
          <motion.div
            {...fade(0, -16)}
            className="mb-4 inline-flex items-center gap-2 font-[family-name:var(--font-body,system-ui,sans-serif)] text-xs font-medium uppercase tracking-[0.2em] text-[#00F0FF]/85"
          >
            <span aria-hidden>✦</span>
            GAME DEVELOPMENT STUDIO
          </motion.div>

          <motion.h1
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 36 }}
            animate={
              reduceMotion
                ? { opacity: 1 }
                : entered
                  ? {
                      opacity: [1, 0.75, 1, 0.9, 1],
                      x: [0, -3, 2, -2, 0],
                      y: 0,
                      filter: [
                        "blur(0px)",
                        "blur(1px)",
                        "blur(0px)",
                        "blur(0.5px)",
                        "blur(0px)",
                      ],
                    }
                  : { opacity: 1, y: 0, x: 0, filter: "blur(0px)" }
            }
            transition={
              reduceMotion
                ? { duration: 0.4, delay: 0.18 }
                : entered
                  ? {
                      duration: 0.4,
                      times: [0, 0.25, 0.5, 0.75, 1],
                      repeat: 2,
                      ease: "linear",
                    }
                  : { duration: 0.75, delay: 0.18, ease: EASE }
            }
            className="min-w-0 break-words font-[family-name:var(--font-display,system-ui,sans-serif)] text-[clamp(2.75rem,8vw,7.5rem)] font-black leading-[0.88] tracking-[-0.04em] text-white"
          >
            BUILD WORLDS.
          </motion.h1>

          <motion.h2
            {...fade(0.28, 36)}
            className="-mt-1 min-w-0 break-words font-[family-name:var(--font-display,system-ui,sans-serif)] text-[clamp(1.85rem,5.5vw,4.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-[#FF006E]/[0.92] md:-mt-2"
          >
            PLAY GOD.
          </motion.h2>

          <motion.p
            {...fade(0.38, 24)}
            className="mt-6 max-w-xl font-[family-name:var(--font-body,system-ui,sans-serif)] text-base font-light leading-[1.65] text-white/65 md:text-lg"
          >
            We craft immersive gaming experiences that push interactive
            entertainment. From concept to launch, we build worlds players never
            want to leave.
          </motion.p>

          <motion.div {...fade(0.48, 16)} className="mt-8 flex flex-wrap gap-4">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-[#00F0FF] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
            >
              View Our Work
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#careers"
              className="inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-white transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00F0FF]"
              style={liquidGlassStrong}
            >
              Join The Team
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
