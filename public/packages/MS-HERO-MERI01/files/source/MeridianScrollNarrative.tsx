"use client";

/**
 * MERIDIAN — Scroll-as-narrative hero (gold standard scroll native)
 * Video currentTime scrubbed by virtual progress. Clean-room of BUYER_PROMPT.md.
 *
 * Pin-until-complete (PRODUCT_LAW): fixed 100dvh stage, virtual progress 0→1 from
 * wheel/trackpad/touch/keys. No tall multi-vh document scrollbar UX.
 * Gold motion preserved:
 *   - Virtual effort ≡ old 420vh sticky track (ST end bottom-bottom → 3.2 viewports)
 *   - Scrub lag 0.45s (GSAP tween, same feel as ScrollTrigger scrub: 0.45)
 *   - Chapter ranges, seek threshold, copy, layout unchanged
 * Client embed: pin while journey runs; release at ends so page can continue.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

const VIDEO_SRC = "/assets/videos/sequence-01.mp4";
const POSTER_SRC = "/assets/posters/sequence-01.webp";

/**
 * Gold virtual distance: old track height 420vh with sticky 100vh + ST
 * start "top top" / end "bottom bottom" → scroll distance = 320vh = 3.2 viewports.
 * Do not change without operator approval — this is the Meridian gold pace.
 */
const VIRTUAL_VIEWPORTS = 3.2;

/** Matches legacy ScrollTrigger scrub: 0.45 — lag only, not journey length. */
const SCRUB_LAG = 0.45;

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

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export default function MeridianScrollNarrative() {
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const touchYRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const proxyRef = useRef({ p: 0 });
  const scrubTweenRef = useRef<gsap.core.Tween | null>(null);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const progressRef = useRef(0);

  const applyProgress = useCallback((p: number) => {
    const clamped = clamp01(p);
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

  /** Smooth display progress toward target (gold scrub lag 0.45). */
  const setTargetProgress = useCallback(
    (next: number, immediate = false) => {
      const clamped = clamp01(next);
      targetProgressRef.current = clamped;
      if (immediate) {
        scrubTweenRef.current?.kill();
        scrubTweenRef.current = null;
        proxyRef.current.p = clamped;
        applyProgress(clamped);
        return;
      }
      scrubTweenRef.current?.kill();
      scrubTweenRef.current = gsap.to(proxyRef.current, {
        p: clamped,
        duration: SCRUB_LAG,
        ease: "none",
        overwrite: true,
        onUpdate: () => applyProgress(proxyRef.current.p),
      });
    },
    [applyProgress]
  );

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

    // Poster = film frame 0 (same 1920x1080 crop). Mark ready once we have a
    // decoded frame at t=0. Never hang if seeked never fires (already at 0).
    let cancelled = false;
    let settled = false;
    let safetyTimer: ReturnType<typeof setTimeout> | null = null;
    let onSeeked: (() => void) | null = null;

    const cleanupSeek = () => {
      if (onSeeked) {
        video.removeEventListener("seeked", onSeeked);
        onSeeked = null;
      }
      if (safetyTimer != null) {
        clearTimeout(safetyTimer);
        safetyTimer = null;
      }
    };

    const markReady = () => {
      if (cancelled || settled) return;
      settled = true;
      cleanupSeek();
      video.pause();
      setReady(true);
    };

    const paintFrame0 = () => {
      if (cancelled || settled) return;
      video.pause();
      const hasFrame = video.readyState >= 2;

      if (hasFrame && video.currentTime <= 0.001 && !video.seeking) {
        requestAnimationFrame(markReady);
        return;
      }

      cleanupSeek();
      onSeeked = () => markReady();
      video.addEventListener("seeked", onSeeked);
      try {
        // Nudge then back to 0 so seeked fires when already at start
        if (video.currentTime <= 0.001 && hasFrame) {
          video.currentTime = 0.001;
        }
        video.currentTime = 0;
      } catch {
        markReady();
        return;
      }
      safetyTimer = setTimeout(() => {
        if (!cancelled && video.readyState >= 2) markReady();
      }, 500);
    };

    const onMeta = () => paintFrame0();
    const onLoadedData = () => paintFrame0();

    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("loadeddata", onLoadedData);

    return () => {
      cancelled = true;
      cleanupSeek();
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("loadeddata", onLoadedData);
    };
  }, []);

  // Capture API for storefront burns + operator tooling
  useEffect(() => {
    if (reduced) return;
    const api = {
      setProgress: (p: number) => setTargetProgress(p, true),
      getProgress: () => progressRef.current,
      productId: "MS-HERO-MERI01",
    };
    const w = window as Window & {
      __msScrollNarrative?: typeof api;
    };
    w.__msScrollNarrative = api;
    return () => {
      if (w.__msScrollNarrative === api) delete w.__msScrollNarrative;
    };
  }, [reduced, setTargetProgress]);

  /**
   * Pin-until-complete input: wheel / touch / keys advance virtual progress.
   * Virtual distance = 3.2 × vh (gold: old 420vh track effort).
   * At progress 0 + scroll up, or progress 1 + scroll down → release (page continues).
   */
  useEffect(() => {
    if (!ready || reduced) return;
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!pin || !video) return;

    video.pause();
    applyProgress(0);

    const virtualDistance = () => {
      const vh = window.innerHeight || 800;
      return VIRTUAL_VIEWPORTS * vh;
    };

    const sectionInView = () => {
      const r = pin.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      return r.top < mid && r.bottom > mid * 0.35;
    };

    const applyDelta = (deltaPx: number) => {
      if (!deltaPx || !Number.isFinite(deltaPx)) return false;
      const p = targetProgressRef.current;
      // Release at ends so host page (membership band) can continue
      if (p <= 0.0005 && deltaPx < 0) return false;
      if (p >= 0.9995 && deltaPx > 0) return false;
      const next = clamp01(p + deltaPx / virtualDistance());
      setTargetProgress(next, false);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (!sectionInView()) return;
      // Ignore pure horizontal trackpad
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaY) < 1) {
        return;
      }
      const consumed = applyDelta(e.deltaY);
      if (consumed) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (!sectionInView() || e.touches.length !== 1) return;
      touchYRef.current = e.touches[0]!.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!sectionInView() || e.touches.length !== 1) return;
      const y = e.touches[0]!.clientY;
      const prev = touchYRef.current;
      touchYRef.current = y;
      if (prev == null) return;
      // Finger up → content down (negative) → advance journey (positive delta like wheel)
      const deltaY = prev - y;
      const consumed = applyDelta(deltaY);
      if (consumed) e.preventDefault();
    };

    const onTouchEnd = () => {
      touchYRef.current = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (!sectionInView()) return;
      const step = virtualDistance() * 0.045;
      let delta = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        delta = e.key === "PageDown" ? step * 2.2 : step;
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        delta = e.key === "PageUp" ? -step * 2.2 : -step;
      } else {
        return;
      }
      const consumed = applyDelta(delta);
      if (consumed) e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      scrubTweenRef.current?.kill();
      scrubTweenRef.current = null;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [ready, reduced, applyProgress, setTargetProgress]);

  const chapter = CHAPTERS[activeChapter];
  const showScrollCue = !reduced && progress < 0.04;

  return (
    <div
      className={`meridian-root bg-[#0c0a08] text-[#f7f1e8]${reduced ? "" : " meridian-root--pin"}`}
      data-meridian-pin={reduced ? "false" : "true"}
      data-meridian-progress={activeChapter}
      style={{ fontFamily: "var(--font-meridian-sans), system-ui, sans-serif" }}
    >
      {/* Pin-until-complete: one viewport stage; virtual progress drives film (not tall track) */}
      <div
        ref={pinRef}
        className={`relative w-full overflow-hidden${
          reduced ? " h-screen" : " meridian-pin-stage"
        }`}
      >
        <div className="relative h-screen w-full overflow-hidden">
          {/* VIDEO — poster = exact film frame 0 (same 1920×1080 crop; no jump) */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
            // no autoplay - virtual progress owns time
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
        /* Pin-until-complete: one viewport stage, no tall multi-vh track */
        .meridian-root--pin .meridian-pin-stage {
          height: 100dvh;
          min-height: 100vh;
          max-height: 100dvh;
        }
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
