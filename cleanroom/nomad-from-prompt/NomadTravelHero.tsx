"use client";

/**
 * NOMAD TRAVEL — Luxury travel platform hero
 * MS-HERO-NOMA01
 *
 * Signature: full-viewport cinematic travel montage (free-play loop) +
 * warm terracotta editorial system + soft entrance + desktop video parallax.
 * Never scrub video.currentTime.
 */

import {
  useEffect,
  useRef,
  type CSSProperties,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Compass } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Client HD B-roll — pure film, no UI. */
export const NOMAD_VIDEO_SRC = "/assets/videos/nomad-montage-v1.mp4";
export const NOMAD_POSTER_SRC = "/assets/posters/nomad-montage-v1.webp";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const NAV_LINKS = [
  "Destinations",
  "Stays",
  "Journeys",
  "Concierge",
  "Journal",
] as const;

const glass: CSSProperties = {
  background: "rgba(254,243,199,0.08)",
  backdropFilter: "blur(48px)",
  WebkitBackdropFilter: "blur(48px)",
  boxShadow: "inset 0 1px 1px rgba(254,243,199,0.14)",
};

const displayFont = {
  fontFamily:
    "var(--font-nomad-display), 'Playfair Display', Georgia, 'Times New Roman', serif",
} as const;

const bodyFont = {
  fontFamily:
    "var(--font-nomad-body), Inter, ui-sans-serif, system-ui, sans-serif",
} as const;

/**
 * NOMAD TRAVEL cleanroom hero — from BUYER_PROMPT.md only.
 */
export default function NomadTravelHero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.1 },
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
          scrub: 1.25,
        },
      },
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
          transition: { duration: 0.75, delay, ease: EASE },
        };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[100dvh] overflow-hidden bg-[#1C140A] text-[#FEF3C7]"
      style={bodyFont}
      aria-label="Nomad Travel hero"
    >
      {/* Film stage */}
      <div ref={videoWrapRef} className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={NOMAD_VIDEO_SRC}
          poster={NOMAD_POSTER_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
        {/* Warm espresso grade — keep cream type legible, never grey wash mid-frame */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(105deg, rgba(28,20,10,0.88) 0%, rgba(28,20,10,0.42) 46%, rgba(28,20,10,0.22) 72%, rgba(28,20,10,0.55) 100%),
              linear-gradient(180deg, rgba(28,20,10,0.55) 0%, transparent 38%, rgba(28,20,10,0.72) 100%)
            `,
          }}
        />
        {/* Subtle terracotta rim light at horizon */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(193,122,74,0.18) 0%, transparent 70%)",
          }}
          aria-hidden
        />
      </div>

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-4 px-6 py-5 sm:px-8 md:px-12 lg:px-16">
        <a
          href="#hero"
          className="group flex min-w-0 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17A4A]/50"
          style={displayFont}
        >
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#FEF3C7]/20 bg-[#FEF3C7]/[0.06]">
            <Compass
              className="h-4 w-4 text-[#C17A4A] transition duration-500 group-hover:rotate-45"
              strokeWidth={1.5}
              aria-hidden
            />
          </span>
          <span className="truncate text-[13px] font-medium tracking-[0.22em] text-[#FEF3C7]">
            NOMAD
          </span>
        </a>

        <nav
          className="hidden items-center gap-0.5 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="rounded-full px-3.5 py-2 text-[12px] font-medium tracking-wide text-[#FEF3C7]/65 transition hover:text-[#FEF3C7]"
            >
              {l}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hidden items-center rounded-full px-4 py-2 text-[12px] font-medium text-[#FEF3C7] transition hover:brightness-110 sm:inline-flex"
            style={glass}
          >
            Sign in
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center rounded-full bg-[#C17A4A] px-4 py-2 text-[12px] font-semibold text-[#1C140A] transition hover:brightness-110"
          >
            Book a Stay
          </a>
        </div>
      </header>

      {/* Content */}
      <div
        id="hero"
        className="relative z-10 flex h-full max-w-[44rem] flex-col items-start justify-center px-6 pb-16 pt-24 sm:px-8 md:px-12 lg:px-16"
      >
        <motion.p
          {...fade(0.05, -14)}
          className="mb-6 flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#C17A4A]"
        >
          <span
            className="inline-block h-1 w-1 rounded-full bg-[#C17A4A]"
            style={{ boxShadow: "0 0 14px #C17A4A" }}
            aria-hidden
          />
          Curated luxury stays
        </motion.p>

        <motion.h1
          {...fade(0.18, 40)}
          className="text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.9] tracking-[-0.03em] text-[#FEF3C7]"
          style={displayFont}
        >
          Go beyond.
        </motion.h1>

        <motion.p
          {...fade(0.3, 32)}
          className="mt-1 text-[clamp(2.5rem,7.5vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.03em] text-[#C17A4A]"
          style={displayFont}
        >
          Stay forever.
        </motion.p>

        <motion.p
          {...fade(0.42, 22)}
          className="mt-7 max-w-lg text-[15px] font-light leading-[1.7] text-[#FEF3C7]/68 md:text-[16px]"
        >
          Curated luxury stays in the world&apos;s most extraordinary places.
          Private villas, cliffside hideaways, and journeys written for the few
          who never settle for ordinary.
        </motion.p>

        <motion.div
          {...fade(0.54, 16)}
          className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 rounded-full bg-[#C17A4A] px-7 py-3.5 text-[13px] font-semibold text-[#1C140A] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17A4A]/45"
          >
            Explore Stays
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[13px] font-medium text-[#FEF3C7] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C17A4A]/35"
            style={glass}
          >
            Watch Journey
          </a>
        </motion.div>

        {/* Quiet proof rail */}
        <motion.div
          {...fade(0.68, 12)}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#FEF3C7]/10 pt-6"
        >
          {[
            { k: "48", v: "Countries" },
            { k: "120+", v: "Private stays" },
            { k: "24/7", v: "Concierge" },
          ].map((s) => (
            <div key={s.v} className="min-w-[4.5rem]">
              <p
                className="text-[1.35rem] font-medium tracking-tight text-[#FEF3C7]"
                style={displayFont}
              >
                {s.k}
              </p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#FEF3C7]/40">
                {s.v}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      {!reduceMotion && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[9px] font-medium uppercase tracking-[0.32em] text-[#FEF3C7]/35">
            Scroll
          </span>
          <span className="h-9 w-px bg-gradient-to-b from-[#C17A4A]/50 to-transparent" />
        </div>
      )}
    </section>
  );
}
