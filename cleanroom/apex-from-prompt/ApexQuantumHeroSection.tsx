"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Client HD B-roll — pure film, no UI. */
const VIDEO_SRC = "/assets/videos/apex-quantum-v1.mp4";
const POSTER_SRC = "/assets/posters/apex-quantum-v1.webp";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const NAV_LINKS = [
  "Platform",
  "Research",
  "Systems",
  "Labs",
  "Contact",
] as const;

const liquidGlassStrong: CSSProperties = {
  background: "rgba(0,212,255,0.08)",
  backdropFilter: "blur(50px)",
  WebkitBackdropFilter: "blur(50px)",
  boxShadow: "inset 0 1px 1px rgba(232,240,255,0.12)",
};

/**
 * APEX QUANTUM cleanroom hero — built from BUYER_PROMPT.md only.
 * Signature: full-viewport quantum lab / lattice film + soft entrance + desktop parallax.
 */
export default function ApexQuantumHeroSection() {
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
        scale: 1.04,
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
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[100dvh] overflow-hidden bg-[#070A1A] text-[#E8F0FF]"
      style={{
        fontFamily: "var(--font-body), Inter, system-ui, sans-serif",
      }}
    >
      <div ref={videoWrapRef} className="absolute inset-0 will-change-transform">
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
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, rgba(7,10,26,0.88) 0%, rgba(7,10,26,0.4) 48%, rgba(7,10,26,0.3) 100%),
              linear-gradient(180deg, rgba(7,10,26,0.55) 0%, transparent 35%, rgba(7,10,26,0.7) 100%)
            `,
          }}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-2">
          <span
            className="text-sm font-medium tracking-[-0.02em] text-[#E8F0FF]"
            style={{
              fontFamily: "var(--font-display), 'JetBrains Mono', monospace",
            }}
          >
            APEX
          </span>
          <span
            className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-[#00D4FF]/80 sm:inline"
            style={{
              fontFamily: "var(--font-display), 'JetBrains Mono', monospace",
            }}
          >
            Quantum
          </span>
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#00D4FF]"
            style={{ boxShadow: "0 0 12px #00D4FF" }}
            aria-hidden
          />
        </div>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="rounded-full px-4 py-2 text-sm text-[#E8F0FF]/70 transition hover:text-[#00D4FF]"
              onClick={(e) => e.preventDefault()}
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center rounded-full px-4 py-2 text-sm text-[#E8F0FF] transition hover:brightness-110"
            style={liquidGlassStrong}
          >
            Documentation
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center rounded-full bg-[#00D4FF] px-4 py-2 text-sm font-medium text-[#070A1A] transition hover:brightness-110"
          >
            Request Access
          </a>
        </div>
      </header>

      <div className="relative z-10 flex h-full max-w-[42rem] flex-col items-start justify-center px-8 md:px-16 lg:px-16">
        <motion.p
          {...fade(0, -16)}
          className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#00D4FF]/90"
        >
          Quantum Computing Platform
        </motion.p>

        <motion.h1
          {...fade(0.18, 36)}
          className="text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-[#E8F0FF]"
          style={{
            fontFamily: "var(--font-display), 'JetBrains Mono', monospace",
          }}
        >
          QUANTUM.
        </motion.h1>
        <motion.p
          {...fade(0.28, 28)}
          className="mt-1 text-[clamp(2.4rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-[#A855F7]"
          style={{
            fontFamily: "var(--font-display), 'JetBrains Mono', monospace",
          }}
        >
          REAL.
        </motion.p>

        <motion.p
          {...fade(0.38, 24)}
          className="mt-6 max-w-xl text-[15px] font-light leading-[1.65] text-[#E8F0FF]/65 md:text-base"
        >
          Error-corrected quantum systems for teams who are done waiting on
          classical limits. Hardware, software, and control - one stack.
        </motion.p>

        <motion.div
          {...fade(0.48, 16)}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 rounded-full bg-[#00D4FF] px-7 py-3.5 text-sm font-semibold text-[#070A1A] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]/40"
          >
            Access Quantum
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-medium text-[#E8F0FF] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]/40"
            style={liquidGlassStrong}
          >
            Read the Paper
          </a>
        </motion.div>
      </div>
    </section>
  );
}
