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
const VIDEO_SRC = "/assets/videos/terra-aerial-v1.mp4";
const POSTER_SRC = "/assets/posters/terra-aerial-v1.webp";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const NAV_LINKS = [
  "Solutions",
  "Impact",
  "Technology",
  "About",
  "Contact",
] as const;

const liquidGlassStrong: CSSProperties = {
  background: "rgba(123,165,143,0.1)",
  backdropFilter: "blur(50px)",
  WebkitBackdropFilter: "blur(50px)",
  boxShadow: "inset 0 1px 1px rgba(244,247,242,0.12)",
};

/**
 * TERRA NOVA cleanroom hero — built from BUYER_PROMPT.md only.
 * Signature: full-viewport aerial energy film + soft entrance + desktop parallax.
 */
export default function TerraNovaHeroSection() {
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
        scale: 1.05,
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
      className="relative h-screen min-h-[100dvh] overflow-hidden bg-[#0B1A14] text-[#F4F7F2]"
      style={{
        fontFamily: "var(--font-body), 'DM Sans', system-ui, sans-serif",
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
              linear-gradient(90deg, rgba(11,26,20,0.82) 0%, rgba(11,26,20,0.35) 48%, rgba(11,26,20,0.28) 100%),
              linear-gradient(180deg, rgba(11,26,20,0.5) 0%, transparent 35%, rgba(11,26,20,0.65) 100%)
            `,
          }}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium tracking-[0.08em] text-[#F4F7F2]">
            TERRA NOVA
          </span>
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#7BA58F]"
            style={{ boxShadow: "0 0 12px #7BA58F" }}
            aria-hidden
          />
        </div>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="rounded-full px-4 py-2 text-sm text-[#F4F7F2]/70 transition hover:text-[#7BA58F]"
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
            className="inline-flex items-center rounded-full px-4 py-2 text-sm text-[#F4F7F2] transition hover:brightness-110"
            style={liquidGlassStrong}
          >
            Our Impact
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center rounded-full bg-[#7BA58F] px-4 py-2 text-sm font-medium text-[#0B1A14] transition hover:brightness-110"
          >
            Talk to Us
          </a>
        </div>
      </header>

      <div className="relative z-10 flex h-full max-w-[42rem] flex-col items-start justify-center px-8 md:px-16 lg:px-16">
        <motion.p
          {...fade(0, -16)}
          className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#7BA58F]/90"
        >
          Clean Energy Platform
        </motion.p>

        <motion.h1
          {...fade(0.18, 36)}
          className="text-[clamp(2.75rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-[#F4F7F2]"
          style={{
            fontFamily: "var(--font-display), Fraunces, Georgia, serif",
          }}
        >
          POWER THE
        </motion.h1>
        <motion.p
          {...fade(0.28, 28)}
          className="mt-1 text-[clamp(2.4rem,7vw,6rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-[#E8B86D]"
          style={{
            fontFamily: "var(--font-display), Fraunces, Georgia, serif",
          }}
        >
          PLANET.
        </motion.p>

        <motion.p
          {...fade(0.38, 24)}
          className="mt-6 max-w-xl text-[15px] font-light leading-[1.65] text-[#F4F7F2]/68 md:text-base"
        >
          Utility-scale renewables and intelligent grids. We build clean power
          that communities can feel in the air they breathe.
        </motion.p>

        <motion.div
          {...fade(0.48, 16)}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 rounded-full bg-[#7BA58F] px-7 py-3.5 text-sm font-semibold text-[#0B1A14] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7BA58F]/40"
          >
            Explore Solutions
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-medium text-[#F4F7F2] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7BA58F]/40"
            style={liquidGlassStrong}
          >
            See the Impact
          </a>
        </motion.div>
      </div>
    </section>
  );
}
