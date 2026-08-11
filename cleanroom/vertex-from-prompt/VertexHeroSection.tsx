"use client";

/**
 * VERTEX SECURITY - Scroll-as-narrative cybersecurity hero
 * Video currentTime scrubbed by scroll. No closing footer band.
 * Clean-room build for MS-HERO-VERT01.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = "/assets/videos/vertex-globe-web-v1.mp4";
const POSTER_SRC = "/assets/posters/vertex-globe-v1.webp";

const NAV = ["Platform", "Threat Intel", "Solutions", "Company"] as const;

/** Chapter copy tied to scroll / video progress (0-1). */
const CHAPTERS = [
  {
    id: "zero-trust",
    range: [0, 0.34] as const,
    eyebrow: "Zero Trust Architecture",
    titleLines: ["SECURITY.", "WITHOUT COMPROMISE."],
    body: "From zero-day threats to nation-state actors, we do not just detect intrusions - we prevent them. Built for security teams who refuse theater.",
    showCtas: false,
    showStats: false,
  },
  {
    id: "fabric",
    range: [0.34, 0.66] as const,
    eyebrow: "Global Threat Fabric",
    titleLines: ["Every packet", "is a signal."],
    body: "Live telemetry across cloud, endpoint, and identity. Correlate in milliseconds. Surface intent before lateral movement starts.",
    showCtas: false,
    showStats: false,
  },
  {
    id: "soc",
    range: [0.66, 1.01] as const,
    eyebrow: "Built for SOC teams",
    titleLines: ["Prevention", "is the product."],
    body: "Hard coverage numbers. Faster mean time to resolve. No vanity dashboards - only outcomes security leaders can defend.",
    showCtas: true,
    showStats: true,
  },
] as const;

function chapterIndex(progress: number) {
  for (let i = 0; i < CHAPTERS.length; i++) {
    const [a, b] = CHAPTERS[i].range;
    if (progress >= a && progress < b) return i;
  }
  return CHAPTERS.length - 1;
}

export default function VertexHeroSection() {
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

    video.pause();

    const st = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.45,
      onUpdate: (self) => applyProgress(self.progress),
    });

    applyProgress(0);

    return () => {
      st.kill();
    };
  }, [ready, reduced, applyProgress]);

  const chapter = CHAPTERS[activeChapter];
  const showScrollCue = !reduced && progress < 0.04;

  return (
    <div
      className="vertex-root bg-black text-white"
      style={{
        fontFamily: "var(--font-vertex-sans), Inter, system-ui, sans-serif",
      }}
    >
      {/* Tall scroll track; sticky stage inside. No footer after this. */}
      <div
        ref={pinRef}
        className="relative"
        style={{ height: reduced ? "100vh" : "420vh" }}
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
            // no autoplay - scroll owns time
            aria-hidden
          />

          {/* Hard dark scrims - brutalist, legible type */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.58) 42%, rgba(0,0,0,0.38) 100%)",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 28%, rgba(0,0,0,0.58) 100%)",
            }}
            aria-hidden
          />

          {/* NAV - deep safe insets so CTA never clips under gallery object-cover */}
          <header className="absolute left-0 right-0 top-0 z-30 border-b border-white/10 bg-black/55 backdrop-blur-md">
            <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-4 px-10 sm:px-12 md:px-16 lg:px-20">
              <a
                href="#hero"
                className="flex min-w-0 shrink-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span
                  className="text-[15px] font-bold tracking-[-0.03em] text-white"
                  style={{
                    fontFamily:
                      "var(--font-vertex-display), system-ui, sans-serif",
                  }}
                >
                  VERTEX
                </span>
                <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-white/45 sm:inline">
                  Security
                </span>
              </a>

              <nav
                className="hidden min-w-0 flex-1 items-center justify-center gap-6 lg:gap-8 md:flex"
                aria-label="Primary"
              >
                {NAV.map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                    className="shrink-0 text-[11px] font-medium uppercase tracking-[0.16em] text-white/55 transition hover:text-white"
                  >
                    {l}
                  </a>
                ))}
              </nav>

              <a
                href="#demo"
                className="shrink-0 whitespace-nowrap border border-white bg-white px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-transparent hover:text-white"
              >
                Request Demo
              </a>
            </div>
            {/* Thin progress under nav */}
            <div className="h-px w-full bg-white/10">
              <div
                ref={progressBarRef}
                className="h-full origin-left bg-white"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </header>

          {/*
            CHAPTER COPY - keep inside ~88% horizontal safe zone.
            Gallery / product previews use object-cover (often 16:9) and crop edges.
          */}
          <div
            id="hero"
            className="absolute inset-0 z-20 flex flex-col justify-center px-10 pb-20 pt-28 sm:px-12 md:px-16 md:pb-24 lg:px-20"
          >
            <div className="mx-auto w-full max-w-[1400px]">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
                <div className="min-w-0 max-w-[38rem] lg:col-span-8 lg:max-w-[42rem]">
                  <p
                    key={`eye-${chapter.id}`}
                    className="mb-6 max-w-full text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55"
                    style={{
                      animation: reduced
                        ? undefined
                        : "vertexFade 0.65s ease both",
                    }}
                  >
                    {chapter.eyebrow}
                  </p>

                  <h1
                    key={`title-${chapter.id}`}
                    className="max-w-full break-words text-[clamp(2.35rem,6vw,5.5rem)] font-bold leading-[0.92] tracking-[-0.04em] text-white"
                    style={{
                      fontFamily:
                        "var(--font-vertex-display), system-ui, sans-serif",
                      animation: reduced
                        ? undefined
                        : "vertexRise 0.8s cubic-bezier(0.22,1,0.36,1) both",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {chapter.titleLines.map((line, i) => (
                      <span
                        key={line}
                        className={`block ${
                          i === 1 && chapter.id === "zero-trust"
                            ? "mt-1 text-[clamp(1.2rem,3vw,2.45rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white/70"
                            : ""
                        }`}
                      >
                        {line}
                      </span>
                    ))}
                  </h1>

                  <p
                    key={`body-${chapter.id}`}
                    className="mt-7 max-w-xl pr-2 text-[15px] font-normal leading-[1.65] text-white/65 md:text-[17px]"
                    style={{
                      animation: reduced
                        ? undefined
                        : "vertexFade 0.85s 0.06s ease both",
                    }}
                  >
                    {chapter.body}
                  </p>

                  {chapter.showCtas && (
                    <div
                      className="mt-10 flex flex-wrap items-center gap-3"
                      style={{
                        animation: reduced
                          ? undefined
                          : "vertexFade 0.75s 0.12s ease both",
                      }}
                    >
                      <a
                        id="demo"
                        href="#demo"
                        className="inline-flex min-h-[48px] shrink-0 items-center justify-center whitespace-nowrap bg-white px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-white/90"
                      >
                        Request Demo
                      </a>
                      <a
                        href="#intel"
                        className="inline-flex min-h-[48px] shrink-0 items-center justify-center whitespace-nowrap border border-white/35 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:border-white"
                      >
                        View Threat Intel
                      </a>
                    </div>
                  )}

                  {chapter.showStats && (
                    <div
                      className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/15 pt-8"
                      style={{
                        animation: reduced
                          ? undefined
                          : "vertexFade 0.75s 0.16s ease both",
                      }}
                    >
                      {[
                        { k: "MTTR", v: "< 4m" },
                        { k: "Coverage", v: "99.99%" },
                        { k: "SOC teams", v: "2,400+" },
                      ].map((s) => (
                        <div key={s.k} className="min-w-0">
                          <div
                            className="text-xl font-bold tracking-tight text-white md:text-2xl"
                            style={{
                              fontFamily:
                                "var(--font-vertex-display), system-ui, sans-serif",
                            }}
                          >
                            {s.v}
                          </div>
                          <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                            {s.k}
                          </div>
                        </div>
                      ))}
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
                            i === activeChapter
                              ? "w-8 bg-white"
                              : "w-4 bg-white/25"
                          }`}
                        />
                        <span
                          className={`text-[10px] uppercase tracking-[0.2em] transition-colors duration-500 ${
                            i === activeChapter
                              ? "text-white"
                              : "text-white/35"
                          }`}
                        >
                          0{i + 1}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="hidden text-right md:block">
                    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
                      Global threat fabric
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-white/25">
                      v.zero-trust // live
                    </p>
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
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                Scroll
              </span>
              <span className="h-10 w-px origin-top animate-pulse bg-gradient-to-b from-white to-transparent" />
            </div>
          )}

          {reduced && (
            <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-[11px] tracking-wide text-white/50">
              Motion reduced - static chapter view
            </div>
          )}
        </div>
      </div>

      {/* Intentionally no footer / closing band - scroll narrative ends with the pin track. */}

      <style jsx global>{`
        @keyframes vertexFade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes vertexRise {
          from {
            opacity: 0;
            transform: translateY(16px);
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
