"use client";

/**
 * MERIDIAN - Scroll-as-narrative hero
 * Video currentTime scrubbed by scroll progress. Clean-room implementation of BUYER_PROMPT.md.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = "/assets/videos/sequence-01.mp4";
const POSTER_SRC = "/assets/posters/sequence-01.webp";

/** Chapter copy tied to scroll/video progress (0-1). */
const CHAPTERS = [
  {
    id: "arrive",
    range: [0, 0.32] as const,
    eyebrow: "Private Atlantic  ·  By Appointment",
    titleLines: ["The coastline", "belongs to few."],
    body: "A rare line of oceanfront residences where architecture, light, and silence are curated as carefully as capital.",
  },
  {
    id: "threshold",
    range: [0.32, 0.62] as const,
    eyebrow: "Interiors  ·  Bespoke",
    titleLines: ["Every ascent", "is intentional."],
    body: "Hand-finished stone. Warm mahogany. Soft architecture that leads the eye - and the guest - toward the horizon.",
  },
  {
    id: "horizon",
    range: [0.62, 1.01] as const,
    eyebrow: "The Arrival",
    titleLines: ["Where the day", "ends in gold."],
    body: "A private path from lawn to shore. Reserved for owners who measure success not in square feet, but in unbroken views.",
  },
] as const;

function chapterIndex(progress: number) {
  for (let i = 0; i < CHAPTERS.length; i++) {
    const [a, b] = CHAPTERS[i].range;
    if (progress >= a && progress < b) return i;
  }
  return CHAPTERS.length - 1;
}

export default function MeridianScrollNarrative() {
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
      // Avoid thrashing near the exact same frame
      if (Math.abs(video.currentTime - t) > 0.016) {
        try {
          video.currentTime = t;
        } catch {
          /* ignore seek race before metadata */
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

  useEffect(() => {
    if (!ready || reduced) return;
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!pin || !video) return;

    // Force decode readiness for scrub
    video.pause();

    const st = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.45,
      onUpdate: (self) => applyProgress(self.progress),
    });

    // Initial
    applyProgress(0);

    return () => {
      st.kill();
    };
  }, [ready, reduced, applyProgress]);

  const chapter = CHAPTERS[activeChapter];
  const showScrollCue = !reduced && progress < 0.04;

  return (
    <div
      className="meridian-root bg-[#0c0a08] text-[#f7f1e8]"
      style={{ fontFamily: "var(--font-meridian-sans), system-ui, sans-serif" }}
    >
      {/* Tall scroll track; sticky stage inside */}
      <div ref={pinRef} className="relative" style={{ height: reduced ? "100vh" : "420vh" }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* VIDEO */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
            // no autoplay - scroll owns time
          />

          {/* Cinematic scrims - keep type legible without killing gold hour */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(8,6,4,0.55) 0%, rgba(8,6,4,0.15) 38%, rgba(8,6,4,0.25) 62%, rgba(8,6,4,0.72) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(8,6,4,0.35) 100%)",
            }}
          />

          {/* NAV - safe horizontal inset (never flush to viewport edge) */}
          <header className="absolute left-0 right-0 top-0 z-30">
            <div className="mx-auto flex h-[4.5rem] w-full max-w-[1400px] items-center justify-between px-8 sm:px-10 md:px-14 lg:px-16">
              <div className="flex items-center gap-3">
                <span
                  className="text-[15px] font-medium tracking-[0.28em] text-[#f7f1e8]"
                  style={{ fontFamily: "var(--font-meridian-display), Georgia, serif" }}
                >
                  MERIDIAN
                </span>
                <span className="hidden h-3 w-px bg-[#c9a66b]/50 sm:block" />
                <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-[#e8d5b0]/70 sm:inline">
                  Private Residences
                </span>
              </div>

              <nav className="hidden items-center gap-8 md:flex">
                {["Residences", "Architecture", "Locations", "Concierge"].map((item) => (
                  <a
                    key={item}
                    href="#request"
                    className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#f7f1e8]/72 transition hover:text-[#f7f1e8]"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              <a
                href="#request"
                className="group inline-flex items-center gap-2 border border-[#c9a66b]/45 bg-[#c9a66b]/10 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#f7f1e8] backdrop-blur-md transition hover:border-[#c9a66b] hover:bg-[#c9a66b]/20"
              >
                Request Access
                <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                  →
                </span>
              </a>
            </div>
            {/* Thin progress under nav */}
            <div className="h-px w-full bg-white/10">
              <div
                ref={progressBarRef}
                className="h-full origin-left bg-gradient-to-r from-[#c9a66b] to-[#f0d9a8]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </header>

          {/* CHAPTER COPY - safe margins so type never clips at frame edges
              (gallery/product object-cover may crop ~5-8%; keep copy inside ~84% center) */}
          <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 pb-16 pt-28 sm:px-10 md:px-14 md:pb-20 lg:px-16">
            <div className="mx-auto w-full max-w-[1400px]">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
                <div className="min-w-0 max-w-[40rem] lg:col-span-8 lg:max-w-none">
                  <p
                    key={`eye-${chapter.id}`}
                    className="mb-5 max-w-full truncate text-[11px] font-medium uppercase tracking-[0.22em] text-[#c9a66b] sm:tracking-[0.28em]"
                    style={{
                      animation: reduced ? undefined : "meridianFade 0.7s ease both",
                    }}
                  >
                    {chapter.eyebrow}
                  </p>

                  <h1
                    key={`title-${chapter.id}`}
                    className="max-w-full break-words text-[clamp(2.35rem,6.2vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#f7f1e8]"
                    style={{
                      fontFamily: "var(--font-meridian-display), Georgia, serif",
                      textShadow: "0 2px 40px rgba(0,0,0,0.35)",
                      animation: reduced ? undefined : "meridianRise 0.85s cubic-bezier(0.22,1,0.36,1) both",
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
                    className="mt-6 max-w-xl pr-2 text-[15px] font-light leading-[1.7] text-[#f7f1e8]/78 md:text-[17px]"
                    style={{
                      animation: reduced
                        ? undefined
                        : "meridianFade 0.9s 0.08s ease both",
                    }}
                  >
                    {chapter.body}
                  </p>

                  {activeChapter === CHAPTERS.length - 1 && (
                    <div
                      className="mt-9 flex flex-wrap items-center gap-4"
                      style={{
                        animation: reduced
                          ? undefined
                          : "meridianFade 0.8s 0.15s ease both",
                      }}
                    >
                      <a
                        href="#request"
                        className="inline-flex items-center gap-2 bg-[#f7f1e8] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#0c0a08] transition hover:bg-white"
                      >
                        Schedule a private tour
                      </a>
                      <a
                        href="#request"
                        className="inline-flex items-center gap-2 border border-white/25 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-[#f7f1e8]/90 transition hover:border-white/50"
                      >
                        View the portfolio
                      </a>
                    </div>
                  )}
                </div>

                {/* Chapter index - stays inside right safe inset */}
                <div className="flex flex-col items-start gap-6 lg:col-span-4 lg:items-end lg:pr-1 lg:text-right">
                  <div className="flex items-center gap-3 lg:flex-col lg:items-end lg:gap-2">
                    {CHAPTERS.map((c, i) => (
                      <div key={c.id} className="flex items-center gap-2">
                        <span
                          className={`h-px transition-all duration-500 ${
                            i === activeChapter ? "w-8 bg-[#c9a66b]" : "w-4 bg-white/25"
                          }`}
                        />
                        <span
                          className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                            i === activeChapter ? "text-[#c9a66b]" : "text-white/35"
                          }`}
                        >
                          0{i + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll cue — storefront burns this out; product page re-adds HTML overlay */}
          {showScrollCue && (
            <div
              data-ms-scroll-cue
              className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2 opacity-80"
            >
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/60">Scroll</span>
              <span className="h-10 w-px origin-top animate-pulse bg-gradient-to-b from-[#c9a66b] to-transparent" />
            </div>
          )}

          {/* Reduced-motion: subtle play hint */}
          {reduced && (
            <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-[11px] tracking-wide text-white/50">
              Motion reduced - static chapter view
            </div>
          )}
        </div>
      </div>

      {/* Closing band - anchors CTAs, proves site not just hero film */}
      <section
        id="request"
        className="relative border-t border-white/10 bg-[#0c0a08] px-8 py-24 sm:px-10 md:px-14 md:py-32 lg:px-16"
      >
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-[#c9a66b]">
              Membership
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#f7f1e8]"
              style={{ fontFamily: "var(--font-meridian-display), Georgia, serif" }}
            >
              Reserved for those
              <br />
              who already have everything.
            </h2>
            <p className="mt-6 max-w-md text-[15px] font-light leading-relaxed text-white/60">
              Meridian is not listed. Access is extended through private introduction -
              family offices, advisors, and existing owners.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                { k: "Residences", v: "12" },
                { k: "Coastlines", v: "4" },
                { k: "Owners only", v: "100%" },
              ].map((s) => (
                <div key={s.k}>
                  <div
                    className="text-2xl font-medium text-[#f7f1e8] md:text-3xl"
                    style={{ fontFamily: "var(--font-meridian-display), Georgia, serif" }}
                  >
                    {s.v}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/40">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>
            <a
              href="mailto:access@meridian.example"
              className="inline-flex w-fit items-center gap-2 border border-[#c9a66b]/50 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#f7f1e8] transition hover:bg-[#c9a66b]/15"
            >
              Begin a conversation
            </a>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes meridianFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes meridianRise {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
