"use client";

/**
 * VERVE SOCIAL - Creator social platform hero (MS-HERO-VERV01)
 *
 * Free-play culture film + bold two-line lockup + infinite social marquee.
 * Desktop soft film scale parallax. Never scrub video.currentTime.
 */

import {
  useEffect,
  useRef,
  type CSSProperties,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const VERVE_VIDEO_SRC = "/assets/videos/verve-presence-v1.mp4";
export const VERVE_POSTER_SRC = "/assets/posters/verve-presence-v1.webp";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const NAV = ["Feed", "People", "Live", "Join"] as const;

const MARQUEE = [
  "#nightsout",
  "@crew",
  "live now",
  "your people",
  "stay late",
  "real faces",
  "soft chaos",
  "belong",
  "be present",
  "small circles",
] as const;

const displayFont: CSSProperties = {
  fontFamily:
    "var(--font-verve-display), Syne, ui-sans-serif, system-ui, sans-serif",
};

const bodyFont: CSSProperties = {
  fontFamily:
    "var(--font-verve-body), Inter, ui-sans-serif, system-ui, sans-serif",
};

export default function VerveSocialHero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
        scale: 1.06,
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

  const fade = (delay: number, y: number) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.72, delay, ease: EASE },
        };

  const marqueeRow = (keyPrefix: string) => (
    <div
      key={keyPrefix}
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden
    >
      {MARQUEE.map((t) => (
        <span
          key={`${keyPrefix}-${t}`}
          className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.22em] text-[#FDF7FA]/55 sm:text-[13px]"
        >
          <span className="mr-1 text-[#EC4899]" aria-hidden>
            ·
          </span>
          {t}
        </span>
      ))}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden bg-[#1A0A14] text-[#FDF7FA]"
      style={bodyFont}
      aria-label="Verve Social creator platform hero"
    >
      {/* Film */}
      <div ref={videoWrapRef} className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={VERVE_VIDEO_SRC}
          poster={VERVE_POSTER_SRC}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
        {/* Plum scrims - left/lower voids for type; never grey-wash mid frame */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(105deg, rgba(26,10,20,0.92) 0%, rgba(26,10,20,0.55) 38%, rgba(26,10,20,0.18) 62%, rgba(26,10,20,0.45) 100%),
              linear-gradient(180deg, rgba(26,10,20,0.5) 0%, transparent 36%, rgba(26,10,20,0.78) 100%)
            `,
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 30% 100%, rgba(236,72,153,0.16) 0%, transparent 65%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 top-1/4 h-64 w-64 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(245,158,11,0.22) 0%, transparent 70%)",
          }}
          aria-hidden
        />
      </div>

      {/* Top chrome - minimal, not Motionsites pill dock identity */}
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 md:px-12">
          <a
            href="#verve"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/50"
            style={displayFont}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#EC4899]/35 bg-[#EC4899]/10 text-[#EC4899]">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </span>
            <span className="text-[13px] font-bold tracking-[0.28em] text-[#FDF7FA]">
              VERVE
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
                className="rounded-full px-3.5 py-2 text-[12px] font-medium tracking-wide text-[#FDF7FA]/55 transition hover:text-[#FDF7FA]"
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hidden rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[12px] font-medium text-[#FDF7FA] backdrop-blur-md transition hover:bg-white/[0.08] sm:inline-flex"
            >
              Sign in
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center rounded-full bg-[#EC4899] px-4 py-2 text-[12px] font-bold text-[#1A0A14] transition hover:brightness-110"
            >
              Join free
            </a>
          </div>
        </div>
      </header>

      {/* Lockup */}
      <div
        id="verve"
        className="relative z-20 flex h-full max-w-[48rem] flex-col justify-center px-5 pb-28 pt-24 sm:px-8 md:px-12 lg:px-16"
      >
        <motion.p
          {...fade(0.05, -12)}
          className="mb-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#F59E0B]"
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#F59E0B]"
            style={{ boxShadow: "0 0 16px #F59E0B" }}
            aria-hidden
          />
          New · creator social
        </motion.p>

        <motion.h1
          {...fade(0.16, 36)}
          className="text-[clamp(2.75rem,9vw,6.75rem)] font-extrabold leading-[0.88] tracking-[-0.04em] text-[#FDF7FA]"
          style={displayFont}
        >
          BE PRESENT.
        </motion.h1>
        <motion.p
          {...fade(0.28, 28)}
          className="mt-1 text-[clamp(2.2rem,7.5vw,5.25rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-[#EC4899]"
          style={displayFont}
        >
          BE TOGETHER.
        </motion.p>

        <motion.p
          {...fade(0.4, 18)}
          className="mt-7 max-w-md text-[15px] font-normal leading-[1.65] text-[#FDF7FA]/68 md:text-[16px]"
        >
          A social network built for nights out, small circles, and the people
          who make your week feel alive - not ads dressed as friends.
        </motion.p>

        <motion.div
          {...fade(0.52, 14)}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-[#EC4899] px-7 text-[13px] font-bold uppercase tracking-[0.1em] text-[#1A0A14] shadow-[0_12px_40px_rgba(236,72,153,0.35)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EC4899]/50"
          >
            Join free
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="inline-flex h-12 items-center rounded-full border border-white/12 bg-white/[0.05] px-7 text-[13px] font-semibold text-[#FDF7FA] backdrop-blur-md transition hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]/40"
          >
            See how it works
          </a>
        </motion.div>

        <motion.div
          {...fade(0.64, 10)}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-6"
        >
          {[
            { k: "2M", v: "Weekly presence" },
            { k: "180", v: "Cities" },
            { k: "0", v: "Fake reach" },
          ].map((s) => (
            <div key={s.v} className="min-w-[5rem]">
              <p
                className="text-[1.4rem] font-bold tracking-tight text-[#FDF7FA]"
                style={displayFont}
              >
                {s.k}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#FDF7FA]/40">
                {s.v}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Infinite social marquee - signature, not film text */}
      <div
        className="absolute inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#1A0A14]/55 py-3.5 backdrop-blur-md"
        aria-hidden={reduceMotion ? undefined : true}
      >
        {reduceMotion ? (
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-4">
            {MARQUEE.slice(0, 6).map((t) => (
              <span
                key={t}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FDF7FA]/5"
              >
                {t}
              </span>
            ))}
          </div>
        ) : (
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, #000 6%, #000 94%, transparent 100%)",
            }}
          >
            <div
              data-verve-marquee-track
              className="flex w-max will-change-transform"
              style={{
                animation: "verve-marquee 42s linear infinite",
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden",
              }}
            >
              {marqueeRow("a")}
              {marqueeRow("b")}
            </div>
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes verve-marquee {
              from { transform: translate3d(0, 0, 0); }
              to { transform: translate3d(-50%, 0, 0); }
            }
            @media (prefers-reduced-motion: reduce) {
              [data-verve-marquee-track] { animation: none !important; }
            }
          `,
        }}
      />
    </section>
  );
}
