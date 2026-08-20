"use client";

/**
 * BLOOM - Kids & teen girls yoga course + app hero
 * MS-HERO-BLOM01
 *
 * Signature: free-play class film (loop) + Kids/Teens path restage +
 * module chips + dual CTAs (free class + get the app) + soft phone card.
 * Never scrub video.currentTime.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Flower2, Smartphone, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Client HD - pure class film, no UI. */
export const BLOOM_VIDEO_SRC = "/assets/videos/luna-yoga-v1.mp4";
export const BLOOM_POSTER_SRC = "/assets/posters/luna-yoga-v1.webp";

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const NAV = ["Classes", "App", "Ages", "Stories"] as const;

type AgePath = "kids" | "teens";

type Module = { id: string; label: string; minutes: number };

const PATHS: Record<
  AgePath,
  {
    badge: string;
    titleLines: readonly [string, string];
    body: string;
    whisper: string;
    ctaPrimary: string;
    ctaSecondary: string;
    modules: readonly Module[];
    appTitle: string;
    appMeta: string;
    accent: string;
  }
> = {
  kids: {
    badge: "For girls 7-12",
    titleLines: ["Soft strength.", "Big smiles."],
    body: "Short classes you can finish. Breathe, stretch, and feel proud in your own body.",
    whisper: "Join the circle",
    ctaPrimary: "Start free class",
    ctaSecondary: "Get the app",
    modules: [
      { id: "breathe", label: "Breathe", minutes: 5 },
      { id: "stretch", label: "Stretch", minutes: 8 },
      { id: "animals", label: "Animal flows", minutes: 10 },
      { id: "wind", label: "Wind-down", minutes: 7 },
    ],
    appTitle: "Morning stretch circle",
    appMeta: "8 min · Kids",
    accent: "#ffe8a3",
  },
  teens: {
    badge: "Course + app for teens",
    titleLines: ["Your calm.", "Your circle."],
    body: "Flows for busy school days, soft nights, and real confidence. No judgment. Just show up.",
    whisper: "Come as you are",
    ctaPrimary: "Join free",
    ctaSecondary: "Download app",
    modules: [
      { id: "focus", label: "Focus", minutes: 8 },
      { id: "flow", label: "Flow", minutes: 15 },
      { id: "soft", label: "Soft strength", minutes: 12 },
      { id: "sleep", label: "Sleep wind-down", minutes: 10 },
    ],
    appTitle: "After-school reset",
    appMeta: "12 min · Teens",
    accent: "#b8e0d2",
  },
};

const STATS = [
  { n: "120+", l: "interactive classes" },
  { n: "7-17", l: "ages welcome" },
  { n: "10 min", l: "starter flows" },
] as const;

const glass: CSSProperties = {
  background: "rgba(255,248,245,0.72)",
  backdropFilter: "blur(28px)",
  WebkitBackdropFilter: "blur(28px)",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.65), 0 12px 40px rgba(42,36,56,0.08)",
};

const displayFont: CSSProperties = {
  fontFamily:
    "var(--font-bloom-display), 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
};

const bodyFont: CSSProperties = {
  fontFamily:
    "var(--font-bloom-body), 'Plus Jakarta Sans', Inter, ui-sans-serif, system-ui, sans-serif",
};

export default function BloomYogaHero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [path, setPath] = useState<AgePath>("kids");
  const [activeModule, setActiveModule] = useState(0);

  const content = PATHS[path];

  const setAgePath = useCallback((next: AgePath) => {
    setPath(next);
    setActiveModule(0);
  }, []);

  // Free-play: pause when offscreen
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    if (reduceMotion) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.12 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [reduceMotion]);

  // Desktop-only soft scale parallax on film wrap (never scrub time)
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

  const fade = (delay: number, y = 22) =>
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
      className="relative min-h-[100dvh] overflow-hidden bg-[#fff8f5] text-[#2a2438]"
      style={bodyFont}
      aria-label="BLOOM yoga course hero"
    >
      {/* Film */}
      <div
        ref={videoWrapRef}
        className="absolute inset-0 will-change-transform"
      >
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={BLOOM_VIDEO_SRC}
          poster={BLOOM_POSTER_SRC}
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
        {/* Soft paper field left + bottom - never grey-wash the whole class */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
              linear-gradient(100deg, rgba(255,248,245,0.94) 0%, rgba(255,248,245,0.78) 28%, rgba(255,248,245,0.22) 52%, rgba(255,248,245,0.08) 68%, rgba(255,248,245,0.35) 100%),
              linear-gradient(180deg, rgba(255,248,245,0.55) 0%, transparent 28%, transparent 58%, rgba(255,248,245,0.82) 100%)
            `,
          }}
        />
        {/* Lilac rim glow */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%]"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 70% 100%, rgba(196,168,232,0.28) 0%, transparent 65%)",
          }}
          aria-hidden
        />
      </div>

      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex h-[4.5rem] w-full max-w-[1400px] items-center justify-between gap-4 px-6 sm:px-8 md:px-12 lg:px-16">
          <a
            href="#bloom"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a8e8]/60"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c4a8e8]/35 bg-[#fff8f5]/80 text-[#c4a8e8] shadow-sm"
              style={glass}
            >
              <Flower2 className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            </span>
            <span
              className="text-[15px] font-semibold tracking-[0.18em] text-[#2a2438]"
              style={displayFont}
            >
              BLOOM
            </span>
          </a>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {NAV.map((item) => (
              <a
                key={item}
                href="#bloom"
                className="rounded-full px-3.5 py-2 text-[12px] font-medium tracking-wide text-[#2a2438]/65 transition hover:text-[#2a2438]"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#bloom"
              className="hidden rounded-full border border-[#2a2438]/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#2a2438]/80 transition hover:bg-[#fff8f5]/80 sm:inline-flex"
              style={glass}
            >
              Sign in
            </a>
            <a
              href="#bloom"
              className="inline-flex rounded-full bg-[#ffb5a7] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2a2438] shadow-sm transition hover:brightness-105"
            >
              Get the app
            </a>
          </div>
        </div>
      </header>

      {/* Stage content */}
      <div
        id="bloom"
        className="relative z-20 mx-auto grid min-h-[100dvh] w-full max-w-[1400px] grid-cols-12 items-end gap-6 px-6 pb-10 pt-28 sm:px-8 sm:pb-12 md:items-center md:px-12 md:pb-16 lg:px-16"
      >
        <div className="col-span-12 md:col-span-7 lg:col-span-6">
          {/* Age path */}
          <motion.div
            {...fade(0.05, 12)}
            className="mb-6 inline-flex rounded-full border border-[#2a2438]/10 p-1"
            style={glass}
            role="tablist"
            aria-label="Age path"
          >
            {(
              [
                { id: "kids" as const, label: "Kids" },
                { id: "teens" as const, label: "Teens" },
              ] as const
            ).map((tab) => {
              const on = path === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setAgePath(tab.id)}
                  className="relative min-h-[44px] min-w-[5.5rem] rounded-full px-5 text-[12px] font-semibold uppercase tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a8e8]/55"
                  style={{
                    color: on ? "#2a2438" : "rgba(42,36,56,0.55)",
                    background: on
                      ? path === "kids"
                        ? "rgba(255,232,163,0.95)"
                        : "rgba(184,224,210,0.95)"
                      : "transparent",
                    boxShadow: on
                      ? "0 6px 18px rgba(42,36,56,0.08)"
                      : "none",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={path}
              initial={
                reduceMotion ? false : { opacity: 0, y: 16 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <p className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#c4a8e8]">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
                {content.badge}
              </p>

              <h1
                className="text-balance text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.03em] text-[#2a2438]"
                style={displayFont}
              >
                <span className="block">{content.titleLines[0]}</span>
                <span className="block text-[#c4a8e8]">
                  {content.titleLines[1]}
                </span>
              </h1>

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#2a2438]/72 sm:text-[16px]">
                {content.body}
              </p>

              <p
                className="mt-3 text-[11px] font-medium uppercase tracking-[0.28em]"
                style={{ color: content.accent === "#ffe8a3" ? "#c4a060" : "#5a9a88" }}
              >
                {content.whisper}
              </p>

              {/* Modules */}
              <div className="mt-7 flex flex-wrap gap-2">
                {content.modules.map((m, i) => {
                  const on = i === activeModule;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setActiveModule(i)}
                      className="min-h-[44px] rounded-full border px-3.5 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a8e8]/50"
                      style={{
                        borderColor: on
                          ? "rgba(196,168,232,0.65)"
                          : "rgba(42,36,56,0.1)",
                        background: on
                          ? "rgba(255,248,245,0.92)"
                          : "rgba(255,248,245,0.55)",
                        boxShadow: on
                          ? "0 8px 24px rgba(196,168,232,0.22)"
                          : "none",
                      }}
                    >
                      <span className="block text-[12px] font-semibold text-[#2a2438]">
                        {m.label}
                      </span>
                      <span className="block text-[10px] uppercase tracking-[0.14em] text-[#2a2438]/45">
                        {m.minutes} min
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#bloom"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#ffb5a7] px-7 py-3 text-[13px] font-semibold tracking-wide text-[#2a2438] shadow-[0_10px_30px_rgba(255,181,167,0.45)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb5a7]/60"
                >
                  {content.ctaPrimary}
                </a>
                <a
                  href="#bloom"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-[#2a2438]/12 px-7 py-3 text-[13px] font-medium text-[#2a2438] transition hover:bg-[#fff8f5]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c4a8e8]/50"
                  style={glass}
                >
                  <Smartphone className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  {content.ctaSecondary}
                </a>
              </div>

              {/* Proof */}
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#2a2438]/10 pt-6">
                {STATS.map((s) => (
                  <div key={s.l}>
                    <div
                      className="text-[22px] font-semibold tracking-tight text-[#2a2438]"
                      style={displayFont}
                    >
                      {s.n}
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-[#2a2438]/45">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[12px] text-[#2a2438]/50">
                Made for girls. Easy for parents to start.
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phone glass card */}
        <motion.div
          {...fade(0.35, 28)}
          className="col-span-12 mb-2 md:col-span-5 md:col-start-8 md:mb-0 lg:col-span-4 lg:col-start-9"
        >
          <div
            className="mx-auto w-full max-w-[280px] rounded-[2rem] border border-white/60 p-3 shadow-[0_30px_80px_rgba(42,36,56,0.14)] md:ml-auto md:mr-0"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,248,245,0.88) 0%, rgba(255,248,245,0.62) 100%)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
            }}
          >
            <div className="rounded-[1.5rem] border border-[#2a2438]/06 bg-[#fff8f5]/90 p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c4a8e8]">
                  Today on BLOOM
                </span>
                <span
                  className="rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#2a2438]"
                  style={{ background: content.accent }}
                >
                  Live energy
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={path + activeModule}
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="mt-5"
                >
                  <p
                    className="text-[1.35rem] font-semibold leading-tight tracking-tight text-[#2a2438]"
                    style={displayFont}
                  >
                    {content.modules[activeModule]?.label ?? content.appTitle}
                  </p>
                  <p className="mt-1.5 text-[12px] text-[#2a2438]/55">
                    {content.modules[activeModule]
                      ? `${content.modules[activeModule].minutes} min · ${
                          path === "kids" ? "Kids" : "Teens"
                        }`
                      : content.appMeta}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-[#2a2438]/08">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${((activeModule + 1) / content.modules.length) * 100}%`,
                    background:
                      "linear-gradient(90deg, #c4a8e8 0%, #ffb5a7 100%)",
                  }}
                />
              </div>

              <div className="mt-5 flex items-center justify-between text-[11px] text-[#2a2438]/5">
                <span>Class {activeModule + 1} of {content.modules.length}</span>
                <span className="inline-flex items-center gap-1 font-medium text-[#2a2438]/7">
                  <Smartphone className="h-3.5 w-3.5" aria-hidden />
                  In the app
                </span>
              </div>

              <a
                href="#bloom"
                className="mt-5 flex min-h-[44px] w-full items-center justify-center rounded-full bg-[#2a2438] text-[12px] font-semibold tracking-wide text-[#fff8f5] transition hover:bg-[#3a3448]"
              >
                Open today&apos;s flow
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
