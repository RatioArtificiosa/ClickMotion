"use client";

import {
  useEffect,
  useRef,
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
const VIDEO_SRC = "/assets/videos/lumina-dolly-v1.mp4";
const POSTER_SRC = "/assets/posters/lumina-dolly-v1.webp";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const NAV_LINKS = ["Work", "Films", "Studio", "Careers", "Contact"] as const;

const liquidGlassStrong: CSSProperties = {
  background: "rgba(254,243,199,0.05)",
  backdropFilter: "blur(50px)",
  WebkitBackdropFilter: "blur(50px)",
  boxShadow: "inset 0 1px 1px rgba(254,243,199,0.12)",
};

/**
 * LUMINA STUDIOS cleanroom hero — built from BUYER_PROMPT.md only.
 * Signature: full-viewport warm film dolly + soft entrance + desktop parallax.
 */
export default function LuminaHeroSection() {
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
      className="relative h-screen min-h-[100dvh] overflow-hidden bg-[#1E140A] text-[#FEF3C7]"
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
              linear-gradient(90deg, rgba(30,20,10,0.78) 0%, rgba(30,20,10,0.35) 50%, rgba(30,20,10,0.25) 100%),
              linear-gradient(180deg, rgba(30,20,10,0.5) 0%, transparent 35%, rgba(30,20,10,0.6) 100%)
            `,
          }}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-8 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-2">
          <span
            className="text-sm font-medium tracking-[0.12em] text-[#FEF3C7]"
            style={{
              fontFamily: "var(--font-display), Playfair Display, Georgia, serif",
            }}
          >
            LUMINA
          </span>
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#F59E0B]"
            style={{ boxShadow: "0 0 12px #F59E0B" }}
            aria-hidden
          />
        </div>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="rounded-full px-4 py-2 text-sm text-[#FEF3C7]/70 transition hover:text-[#F59E0B]"
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
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-[#FEF3C7] transition hover:brightness-110"
            style={liquidGlassStrong}
          >
            <Play className="h-3.5 w-3.5" aria-hidden />
            Showreel
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center rounded-full bg-[#F59E0B] px-4 py-2 text-sm font-medium text-[#1E140A] transition hover:brightness-110"
          >
            Start a Project
          </a>
        </div>
      </header>

      <div className="relative z-10 flex h-full max-w-[42rem] flex-col items-start justify-center px-8 md:px-16 lg:px-16">
        <motion.p
          {...fade(0, -16)}
          className="mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-[#F59E0B]/90"
        >
          Film Production Studio
        </motion.p>

        <motion.h1
          {...fade(0.18, 36)}
          className="text-[clamp(2.75rem,8vw,7rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#FEF3C7]"
          style={{
            fontFamily: "var(--font-display), Playfair Display, Georgia, serif",
          }}
        >
          STORIES THAT
        </motion.h1>
        <motion.p
          {...fade(0.28, 28)}
          className="mt-1 text-[clamp(2.4rem,7vw,6rem)] font-bold leading-[0.9] tracking-[-0.03em] text-[#F59E0B]"
          style={{
            fontFamily: "var(--font-display), Playfair Display, Georgia, serif",
          }}
        >
          MOVE.
        </motion.p>

        <motion.p
          {...fade(0.38, 24)}
          className="mt-6 max-w-xl text-[15px] font-light leading-[1.65] text-[#FEF3C7]/65 md:text-base"
        >
          Award-minded film and commercial craft. From treatment to final grade,
          we light stories the audience feels in their chest.
        </motion.p>

        <motion.div
          {...fade(0.48, 16)}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center gap-2 rounded-full bg-[#F59E0B] px-7 py-3.5 text-sm font-semibold text-[#1E140A] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]/40"
          >
            View the Reel
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-medium text-[#FEF3C7] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]/40"
            style={liquidGlassStrong}
          >
            Book a Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
