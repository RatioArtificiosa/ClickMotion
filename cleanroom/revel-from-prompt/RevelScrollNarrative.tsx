"use client";

/**
 * REVEL — Scroll-as-narrative fashion commerce hero
 * Video currentTime scrubbed by scroll progress. Built from BUYER_PROMPT.md only.
 * Signature: light pearl studio canvas · rose-gold type · phone-break chapters.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = "/assets/videos/revel-breakout-v1.mp4";
const POSTER_SRC = "/assets/posters/revel-breakout-v1.webp";

/** Chapters mapped to film beats (0–1 progress = full video duration). */
const CHAPTERS = [
  {
    id: "feed",
    range: [0, 0.28] as const,
    index: "01",
    eyebrow: "Chapter one  ·  The feed",
    titleLines: ["She lived", "inside the glow."],
    body: "A golden phone. A perfect profile. Infinite hearts orbiting a life that never quite left the glass.",
  },
  {
    id: "break",
    range: [0.28, 0.58] as const,
    index: "02",
    eyebrow: "Chapter two  ·  The break",
    titleLines: ["Then something", "had to give."],
    body: "A sole through the screen. Glass fractures. The feed cannot hold what wants to be real.",
  },
  {
    id: "shatter",
    range: [0.58, 0.82] as const,
    index: "03",
    eyebrow: "Chapter three  ·  The shatter",
    titleLines: ["Shards of", "attention fall."],
    body: "Likes, rings, icons - suspended midair. The stage is a studio of pearl light and rose silk. Everything is in motion.",
  },
  {
    id: "arrival",
    range: [0.82, 1.01] as const,
    index: "04",
    eyebrow: "Chapter four  ·  The arrival",
    titleLines: ["Now she", "owns the room."],
    body: "Out of the phone. Into the world. Revel is fashion commerce for brands that break the scroll - and keep the attention.",
  },
] as const;

function chapterIndex(progress: number) {
  for (let i = 0; i < CHAPTERS.length; i++) {
    const [a, b] = CHAPTERS[i].range;
    if (progress >= a && progress < b) return i;
  }
  return CHAPTERS.length - 1;
}

export default function RevelScrollNarrative() {
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
  }, []);

  // Keep chapters in sync when currentTime is scrubbed externally (storefront capture / QA).
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
      scrub: 0.5,
      onUpdate: (self) => applyProgress(self.progress),
    });

    applyProgress(0);

    return () => {
      st.kill();
    };
  }, [ready, reduced, applyProgress]);

  // Reduced motion: show final chapter, still frame mid-break
  useEffect(() => {
    if (!ready || !reduced) return;
    applyProgress(0.45);
  }, [ready, reduced, applyProgress]);

  const chapter = CHAPTERS[activeChapter];
  const showScrollCue = !reduced && progress < 0.05;
  const isFinale = activeChapter === CHAPTERS.length - 1;

  return (
    <div
      className="revel-root bg-[#F7F4F1] text-[#1A1614]"
      style={{
        fontFamily: "var(--font-revel-sans), system-ui, sans-serif",
      }}
    >
      {/* Tall scroll track; sticky cinema stage */}
      <div
        ref={pinRef}
        className="relative"
        style={{ height: reduced ? "100vh" : "480vh" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#F7F4F1]">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
            // no autoplay — scroll owns time
            aria-hidden
          />

          {/* Light-mode scrims: pearl top chrome + strong bottom veil for cream type */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                linear-gradient(180deg, rgba(247,244,241,0.78) 0%, rgba(247,244,241,0.12) 22%, transparent 42%, rgba(26,22,20,0.42) 68%, rgba(26,22,20,0.78) 100%),
                linear-gradient(90deg, rgba(26,22,20,0.28) 0%, transparent 38%, transparent 72%, rgba(247,244,241,0.15) 100%)
              `,
            }}
          />
          {/* Soft vignette matching gold studio frame energy */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: "inset 0 0 120px rgba(196,165,116,0.12)",
            }}
          />

          {/* NAV */}
          <header className="absolute left-0 right-0 top-0 z-30">
            <div className="mx-auto flex h-[4.5rem] w-full max-w-[1400px] items-center justify-between px-8 sm:px-10 md:px-14 lg:px-16">
              <div className="flex items-center gap-3">
                <span
                  className="text-[15px] font-medium tracking-[0.32em] text-[#1A1614]"
                  style={{
                    fontFamily:
                      "var(--font-revel-display), 'Instrument Serif', Georgia, serif",
                  }}
                >
                  REVEL
                </span>
                <span className="hidden h-3 w-px bg-[#C4A574]/55 sm:block" />
                <span className="hidden text-[10px] font-medium uppercase tracking-[0.24em] text-[#1A1614]/55 sm:inline">
                  Fashion Commerce
                </span>
              </div>

              <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
                {["Collections", "Lookbook", "Campaigns", "Journal"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#atelier"
                      className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#1A1614]/65 transition hover:text-[#1A1614]"
                      onClick={(e) => e.preventDefault()}
                    >
                      {item}
                    </a>
                  )
                )}
              </nav>

              <a
                href="#atelier"
                onClick={(e) => e.preventDefault()}
                className="group inline-flex items-center gap-2 border border-[#C4A574]/50 bg-white/40 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1A1614] backdrop-blur-md transition hover:border-[#C4A574] hover:bg-white/70"
              >
                Enter atelier
                <span
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </a>
            </div>
            {/* Rose-gold progress */}
            <div className="h-px w-full bg-[#1A1614]/10">
              <div
                ref={progressBarRef}
                className="h-full origin-left bg-gradient-to-r from-[#C4A574] via-[#E8B4B8] to-[#C4A574]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </header>

          {/* CHAPTER COPY — bottom-left safe zone over film */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 pb-16 pt-28 sm:px-10 md:px-14 md:pb-20 lg:px-16">
            <div className="mx-auto w-full max-w-[1400px]">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
                <div className="min-w-0 max-w-[42rem] lg:col-span-8 lg:max-w-none">
                  <p
                    key={`eye-${chapter.id}`}
                    className="mb-4 max-w-full text-[11px] font-medium uppercase tracking-[0.24em] text-[#C4A574] sm:tracking-[0.28em]"
                    style={{
                      animation: reduced
                        ? undefined
                        : "revelFade 0.65s ease both",
                    }}
                  >
                    {chapter.eyebrow}
                  </p>

                  <h1
                    key={`title-${chapter.id}`}
                    className="max-w-full break-words text-[clamp(2.5rem,6.4vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.03em] text-[#F7F4F1] drop-shadow-[0_2px_28px_rgba(26,22,20,0.45)]"
                    style={{
                      fontFamily:
                        "var(--font-revel-display), 'Instrument Serif', Georgia, serif",
                      animation: reduced
                        ? undefined
                        : "revelRise 0.85s cubic-bezier(0.22,1,0.36,1) both",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {chapter.titleLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h1>

                  <p
                    key={`body-${chapter.id}`}
                    className="mt-6 max-w-xl pr-2 text-[15px] font-light leading-[1.7] text-[#F7F4F1]/88 md:text-[17px]"
                    style={{
                      textShadow: "0 1px 18px rgba(26,22,20,0.4)",
                      animation: reduced
                        ? undefined
                        : "revelFade 0.85s 0.06s ease both",
                    }}
                  >
                    {chapter.body}
                  </p>

                  {isFinale && (
                    <div
                      className="mt-9 flex flex-wrap items-center gap-4"
                      style={{
                        animation: reduced
                          ? undefined
                          : "revelFade 0.8s 0.12s ease both",
                      }}
                    >
                      <a
                        href="#atelier"
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center gap-2 bg-[#1A1614] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#F7F4F1] transition hover:bg-black"
                      >
                        Shop the drop
                      </a>
                      <a
                        href="#atelier"
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center gap-2 border border-white/40 bg-white/10 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-[#F7F4F1] backdrop-blur-sm transition hover:border-white/70 hover:bg-white/20"
                      >
                        Watch campaign
                      </a>
                    </div>
                  )}
                </div>

                {/* Chapter index — right rail */}
                <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end lg:pr-1 lg:text-right">
                  <div className="flex items-center gap-3 lg:flex-col lg:items-end lg:gap-3">
                    {CHAPTERS.map((c, i) => (
                      <div key={c.id} className="flex items-center gap-2">
                        <span
                          className={`h-px transition-all duration-500 ${
                            i === activeChapter
                              ? "w-10 bg-[#C4A574]"
                              : "w-4 bg-white/35"
                          }`}
                        />
                        <span
                          className={`text-[10px] uppercase tracking-[0.22em] transition-colors duration-500 ${
                            i === activeChapter
                              ? "text-[#C4A574]"
                              : "text-white/40"
                          }`}
                        >
                          {c.index}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="hidden max-w-[12rem] text-[11px] font-light leading-relaxed text-white/50 lg:block">
                    Scroll to advance the film. Each chapter owns a beat of the
                    breakout.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {showScrollCue && (
            <div
              data-ms-scroll-cue
              className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#1A1614]/55">
                Scroll
              </span>
              <span className="h-11 w-px origin-top animate-pulse bg-gradient-to-b from-[#C4A574] to-transparent" />
            </div>
          )}

          {reduced && (
            <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-[11px] tracking-wide text-[#1A1614]/45">
              Motion reduced · static chapter view
            </div>
          )}
        </div>
      </div>

      {/* Closing band — proves site beyond the film */}
      <section
        id="atelier"
        className="relative border-t border-[#1A1614]/10 bg-[#F7F4F1] px-8 py-24 sm:px-10 md:px-14 md:py-32 lg:px-16"
      >
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-[#C4A574]">
              The atelier
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#1A1614]"
              style={{
                fontFamily:
                  "var(--font-revel-display), 'Instrument Serif', Georgia, serif",
              }}
            >
              Fashion that breaks
              <br />
              the scroll.
            </h2>
            <p className="mt-6 max-w-md text-[15px] font-light leading-[1.7] text-[#1A1614]/70">
              Revel is built for brands who refuse to live only inside a feed.
              Campaign film. Product truth. Commerce that feels like a runway
              moment - not another carousel ad.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { k: "Drop cadence", v: "Weekly IRL + digital" },
                { k: "Film system", v: "Scroll owns the timeline" },
                { k: "Audience", v: "Fashion · beauty · lifestyle" },
                { k: "Stack", v: "React · GSAP · pure MP4" },
              ].map((row) => (
                <div
                  key={row.k}
                  className="border border-[#1A1614]/10 bg-white/50 px-5 py-4 backdrop-blur-sm"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C4A574]">
                    {row.k}
                  </p>
                  <p className="mt-2 text-[14px] font-medium text-[#1A1614]">
                    {row.v}
                  </p>
                </div>
              ))}
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex w-fit items-center gap-2 border border-[#1A1614] bg-[#1A1614] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#F7F4F1] transition hover:bg-black"
            >
              Request a campaign kit
            </a>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes revelFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes revelRise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `,
        }}
      />
    </div>
  );
}
