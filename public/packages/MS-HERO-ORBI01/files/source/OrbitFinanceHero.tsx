"use client";

/**
 * ORBIT FINANCE - Trustworthy premium neobank hero (MS-HERO-ORBI01)
 *
 * Free-play vault/wealth film + DM Serif lockup + gold orbital ring (UI only).
 * Desktop soft film scale parallax. Never scrub video.currentTime.
 */

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

export const ORBIT_VIDEO_SRC = "/assets/videos/orbit-vault-v1.mp4";
export const ORBIT_POSTER_SRC = "/assets/posters/orbit-vault-v1.webp";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const NAV = ["Products", "Wealth", "Cards", "Security"] as const;

const displayFont: CSSProperties = {
  fontFamily:
    "var(--font-orbit-display), 'DM Serif Display', Georgia, ui-serif, serif",
};

const bodyFont: CSSProperties = {
  fontFamily:
    "var(--font-orbit-body), Inter, ui-sans-serif, system-ui, sans-serif",
};

export default function OrbitFinanceHero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    if (reduceMotion) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
      return;
    }

    const tryPlay = () => void video.play().catch(() => {});
    tryPlay();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.1 },
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
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const ring = ringRef.current;
    if (!ring) return;

    const tween = gsap.to(ring, {
      rotation: 360,
      transformOrigin: "50% 50%",
      duration: 64,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [reduceMotion]);

  const fade = (delay: number, y: number) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.78, delay, ease: EASE },
        };

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden bg-[#0B1426] text-[#F7F4EC]"
      style={bodyFont}
      aria-label="Orbit Finance premium neobank hero"
    >
      {/* Film */}
      <div ref={videoWrapRef} className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={ORBIT_VIDEO_SRC}
          poster={ORBIT_POSTER_SRC}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
        {/* Navy scrims - left/lower voids for serif type */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(105deg, rgba(11,20,38,0.94) 0%, rgba(11,20,38,0.62) 36%, rgba(11,20,38,0.22) 58%, rgba(11,20,38,0.5) 100%),
              linear-gradient(180deg, rgba(11,20,38,0.55) 0%, transparent 32%, rgba(11,20,38,0.82) 100%)
            `,
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
          style={{
            background:
              "radial-gradient(ellipse 85% 70% at 28% 100%, rgba(201,168,76,0.12) 0%, transparent 62%)",
          }}
          aria-hidden
        />
      </div>

      {/* Signature orbital ring - UI geometry only */}
      <div
        className="pointer-events-none absolute right-[-8%] top-1/2 z-10 hidden h-[min(72vh,640px)] w-[min(72vh,640px)] -translate-y-1/2 md:block lg:right-[4%]"
        aria-hidden
      >
        <svg
          ref={ringRef}
          data-orbit-ring
          viewBox="0 0 400 400"
          className="h-full w-full"
          fill="none"
        >
          <circle
            cx="200"
            cy="200"
            r="168"
            stroke="rgba(201,168,76,0.22)"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="200"
            r="148"
            stroke="rgba(201,168,76,0.38)"
            strokeWidth="1"
            strokeDasharray="4 10"
          />
          <circle
            cx="200"
            cy="200"
            r="128"
            stroke="rgba(201,168,76,0.18)"
            strokeWidth="0.75"
          />
          {/* Orbital marker */}
          <circle cx="200" cy="32" r="3.5" fill="#C9A84C" opacity="0.9" />
          <circle cx="348" cy="248" r="2.5" fill="#C9A84C" opacity="0.55" />
        </svg>
      </div>

      {/* Top chrome - private bank bar, not Motionsites dock */}
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 md:px-12">
          <a
            href="#orbit"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50"
            style={bodyFont}
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#C9A84C]/40"
              aria-hidden
            >
              <span className="h-2 w-2 rounded-full bg-[#C9A84C]" />
            </span>
            <span className="text-[12px] font-bold tracking-[0.28em] text-[#F7F4EC]">
              ORBIT
            </span>
          </a>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {NAV.map((l) => (
              <a
                key={l}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="rounded-full px-3.5 py-2 text-[12px] font-medium tracking-wide text-[#F7F4EC]/55 transition hover:text-[#F7F4EC]"
              >
                {l}
              </a>
            ))}
          </nav>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex items-center rounded-full bg-[#C9A84C] px-4 py-2 text-[12px] font-semibold text-[#0B1426] transition hover:brightness-110"
          >
            Open account
          </a>
        </div>
      </header>

      {/* Lockup */}
      <div
        id="orbit"
        className="relative z-20 flex h-full max-w-[42rem] flex-col justify-center px-5 pb-20 pt-24 sm:px-8 md:px-12 lg:px-16"
      >
        <motion.p
          {...fade(0.06, -10)}
          className="mb-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#C9A84C]"
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#C9A84C]"
            style={{ boxShadow: "0 0 14px #C9A84C" }}
            aria-hidden
          />
          Trusted globally · Private by design
        </motion.p>

        <motion.h1
          {...fade(0.16, 32)}
          className="text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[0.95] tracking-[-0.03em] text-[#F7F4EC]"
          style={displayFont}
        >
          Money, elevated.
        </motion.h1>

        <motion.p
          {...fade(0.3, 18)}
          className="mt-6 max-w-md text-[15px] font-normal leading-[1.65] text-[#F7F4EC]/72 md:text-[16px]"
        >
          Banking without borders. Multi-currency wealth, quiet control, and a
          vault that never shouts.
        </motion.p>

        <motion.div
          {...fade(0.44, 14)}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#C9A84C] px-7 text-[13px] font-semibold tracking-[0.04em] text-[#0B1426] shadow-[0_12px_40px_rgba(201,168,76,0.28)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/50"
          >
            Open account
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex h-12 items-center rounded-full border border-white/12 bg-white/[0.04] px-7 text-[13px] font-medium text-[#F7F4EC] backdrop-blur-md transition hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C]/35"
          >
            How it works
          </a>
        </motion.div>

        <motion.div
          {...fade(0.58, 10)}
          className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-6"
        >
          {[
            { k: "2M+", v: "Clients worldwide" },
            { k: "140", v: "Currencies" },
            { k: "Bank-grade", v: "Encryption" },
          ].map((s) => (
            <div key={s.v} className="min-w-[5.5rem]">
              <p
                className="text-[1.35rem] font-normal tracking-tight text-[#F7F4EC]"
                style={displayFont}
              >
                {s.k}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#F7F4EC]/42">
                {s.v}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Soft card plate - synthetic chrome, no PAN/numbers */}
      <motion.div
        {...fade(0.7, 20)}
        className="pointer-events-none absolute bottom-10 right-6 z-20 hidden w-[220px] overflow-hidden rounded-2xl border border-[#C9A84C]/25 bg-[rgba(11,20,38,0.72)] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:block"
        aria-hidden
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-[0.22em] text-[#C9A84C]">
            ORBIT
          </span>
          <span className="h-6 w-9 rounded bg-gradient-to-br from-[#C9A84C]/80 to-[#A68B2E]/50" />
        </div>
        <div className="space-y-2">
          <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
          <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
        </div>
        <p className="mt-6 text-[11px] tracking-[0.18em] text-[#F7F4EC]/45">
          PRIVATE · GLOBAL
        </p>
      </motion.div>
    </section>
  );
}
