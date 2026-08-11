import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollIlluminate } from "../components/ScrollIlluminate";
import {
  CHAPTER_COUNT,
  STORY_CHAPTERS,
  STORY_INTRO,
} from "../data/story";
import { getLenis } from "../lib/lenis";
import { splitChars, splitWords } from "../lib/splitFallback";

gsap.registerPlugin(ScrollTrigger);

const C = CHAPTER_COUNT;

/**
 * #story — desktop pin += (c-0.4)*vh with intro fade + chapter hysteresis;
 * mobile sticky 440svh with clip-path photo scrub + word illuminate.
 */
export function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  // Mobile intro
  const mEyebrowRef = useRef<HTMLDivElement>(null);
  const mTitleRef = useRef<HTMLHeadingElement>(null);

  // Desktop pin
  const pinRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const ghostRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const prevActive = useRef(0);

  // Mobile sticky
  const mobileRootRef = useRef<HTMLDivElement>(null);
  const mGhostRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mPhotoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mTitleBodyRef = useRef<HTMLHeadingElement>(null);
  const mParaRef = useRef<HTMLParagraphElement>(null);
  const mWordsRef = useRef<HTMLElement[]>([]);
  const mLocalProgress = useRef(0);
  const mStRef = useRef<ScrollTrigger | null>(null);
  const [mActive, setMActive] = useState(0);
  const [mDisplay, setMDisplay] = useState(0);
  const mPrevActive = useRef(0);

  // ── Mobile intro entrance ────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const eye = mEyebrowRef.current;
      if (eye) {
        gsap.fromTo(
          eye,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const title = mTitleRef.current;
      if (title) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          gsap.set(title, { opacity: 1 });
        } else {
          const original = title.textContent ?? "";
          gsap.set(title, { opacity: 1 });
          const chars = splitChars(title);
          gsap.fromTo(
            chars,
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.016,
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                once: true,
              },
            },
          );
          cleanups.push(() => {
            title.textContent = original;
          });
        }
      }
    }, section);

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  // ── Desktop pin ──────────────────────────────────────────────
  useEffect(() => {
    const pin = pinRef.current;
    if (!pin || !window.matchMedia("(min-width: 768px)").matches) return;

    const t = Array.from({ length: C }, (_, i) => i / (C - 1));
    const ctx = gsap.context(() => {
      stRef.current = ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: () => `+=${window.innerHeight * (C - 0.4)}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        snap: {
          snapTo: [0, ...t.map((e) => 0.1 + e * 0.9)],
          duration: { min: 0.25, max: 0.55 },
          ease: "power2.inOut",
        },
        invalidateOnRefresh: true,
        refreshPriority: -1,
        onUpdate: (self) => {
          const p = self.progress;
          const intro = introRef.current;
          if (intro) {
            const e = Math.min(1, Math.max(0, p / 0.08));
            intro.style.opacity = String(1 - e);
            intro.style.transform = `translateY(${-40 * e}px)`;
          }
          const stage = stageRef.current;
          if (stage) {
            const e = Math.min(1, Math.max(0, (p - 0.04) / 0.08));
            stage.style.opacity = String(e);
          }
          const n = Math.min(1, Math.max(0, (p - 0.1) / 0.9));
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleY(${n})`;
          }
          // Hysteresis chapter index on progress n
          const r = 1 / (C - 1);
          setActiveIndex((prev) => {
            let t = prev;
            while (t < C - 1 && n > (t + 0.5) * r + 0.05) t += 1;
            while (t > 0 && n < (t - 0.5) * r - 0.05) t -= 1;
            return t;
          });
        },
      });
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, pin);

    return () => {
      ctx.revert();
      stRef.current = null;
    };
  }, []);

  // ── Desktop chapter image/ghost crossfade ────────────────────
  useEffect(() => {
    const prev = prevActive.current;
    if (prev === activeIndex) return;
    const goingUp = activeIndex > prev;
    prevActive.current = activeIndex;

    frameRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === activeIndex) {
        gsap.fromTo(
          el,
          {
            scale: goingUp ? 0.86 : 1.14,
            opacity: 0,
            y: goingUp ? 46 : -46,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
            delay: 0.08,
            overwrite: "auto",
            force3D: true,
          },
        );
      } else {
        gsap.to(el, {
          scale: i < activeIndex ? 1.14 : 0.86,
          opacity: 0,
          y: i < activeIndex ? -46 : 46,
          duration: 0.6,
          ease: "power2.in",
          overwrite: "auto",
          force3D: true,
        });
      }
    });

    ghostRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        opacity: i === activeIndex ? 1 : 0,
        y: i === activeIndex ? 0 : goingUp ? -60 : 60,
        duration: 0.9,
        ease: "power2.inOut",
        overwrite: "auto",
        force3D: true,
      });
    });
  }, [activeIndex]);

  // ── Desktop body out → display ───────────────────────────────
  useEffect(() => {
    if (activeIndex === displayIndex) return;
    const el = bodyRef.current;
    if (!el) {
      setDisplayIndex(activeIndex);
      return;
    }
    const tw = gsap.to(el, {
      y: -24,
      opacity: 0,
      duration: 0.22,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => setDisplayIndex(activeIndex),
    });
    return () => {
      tw.kill();
    };
  }, [activeIndex, displayIndex]);

  // ── Desktop body in ──────────────────────────────────────────
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-story-item]");
    gsap.fromTo(
      el,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", overwrite: "auto" },
    );
    gsap.fromTo(
      items,
      { y: 16, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.05,
        delay: 0.05,
        overwrite: "auto",
      },
    );
  }, [displayIndex]);

  const goToYear = useCallback((i: number) => {
    setActiveIndex(i);
    const st = stRef.current;
    if (!st) return;
    const n = 0.1 + (i / (C - 1)) * 0.9;
    const target = st.start + (st.end - st.start) * n;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  // ── Mobile sticky scrub ──────────────────────────────────────
  useEffect(() => {
    const root = mobileRootRef.current;
    if (!root || !window.matchMedia("(max-width: 767px)").matches) return;

    const ctx = gsap.context(() => {
      mStRef.current = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const t = self.progress;
          const n = Math.min(4, Math.floor(5 * t));
          mLocalProgress.current = Math.min(1, Math.max(0, 5 * t - n));
          setMActive((prev) => (prev === n ? prev : n));
          // Apply progress to current photo
          const photo = mPhotoRefs.current[n];
          if (photo) {
            const e = mLocalProgress.current;
            const ease = Math.min(1, e / 0.42);
            const r = Math.min(1, e / 0.55);
            photo.style.clipPath = `inset(0% 0% ${(1 - ease) * 92}% 0%)`;
            photo.style.opacity = String(0.4 + 0.6 * ease);
            const img = photo.querySelector("img");
            if (img) img.style.transform = `scale(${1.12 - 0.12 * r})`;
          }
          const words = mWordsRef.current;
          if (words.length) {
            const e = mLocalProgress.current;
            const tt = Math.min(1, Math.max(0, (e - 0.3) / 0.55));
            for (let i = 0; i < words.length; i++) {
              words[i].style.opacity = String(
                Math.min(1, Math.max(0.24, tt * (words.length + 3) - i)),
              );
            }
          }
        },
      });
    }, root);

    return () => {
      ctx.revert();
      mStRef.current = null;
    };
  }, []);

  // Mobile chapter change
  useEffect(() => {
    const prev = mPrevActive.current;
    if (prev === mActive) return;
    const dir = mActive > prev ? 1 : -1;
    mPrevActive.current = mActive;

    mGhostRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === mActive) {
        gsap.fromTo(
          el,
          { opacity: 0, yPercent: 7 * dir },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          },
        );
      } else {
        gsap.to(el, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
    });

    mPhotoRefs.current.forEach((el, i) => {
      if (el && i !== mActive) {
        gsap.to(el, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          overwrite: "auto",
        });
      }
    });

    const group = [mTitleBodyRef.current, mParaRef.current].filter(
      Boolean,
    ) as HTMLElement[];
    gsap.to(group, {
      opacity: 0,
      y: -12,
      duration: 0.16,
      ease: "power2.in",
      overwrite: "auto",
      onComplete: () => setMDisplay(mActive),
    });
  }, [mActive]);

  // Mobile body in + char title + word dim
  useEffect(() => {
    const title = mTitleBodyRef.current;
    const para = mParaRef.current;
    if (!title || !para) return;

    gsap.set([title, para], { opacity: 1, y: 0 });

    // Split para words for illuminate
    const paraOriginal = para.innerHTML;
    const words = splitWords(para);
    words.forEach((w) => {
      w.style.opacity = "0.24";
    });
    mWordsRef.current = words;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const titleOriginal = title.innerHTML;
      const chars = splitChars(title);
      gsap.fromTo(
        chars,
        { yPercent: 105 },
        {
          yPercent: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.013,
          overwrite: "auto",
        },
      );
      // Restore title structure is lost after splitChars — keep as-is for anim

      // Apply current local progress
      const e = mLocalProgress.current;
      const photo = mPhotoRefs.current[mDisplay];
      if (photo) {
        const n = Math.min(1, e / 0.42);
        const r = Math.min(1, e / 0.55);
        photo.style.clipPath = `inset(0% 0% ${(1 - n) * 92}% 0%)`;
        photo.style.opacity = String(0.4 + 0.6 * n);
        photo.style.display = "";
        gsap.set(photo, { opacity: 0.4 + 0.6 * n });
        const img = photo.querySelector("img");
        if (img) img.style.transform = `scale(${1.12 - 0.12 * r})`;
      }
      const tt = Math.min(1, Math.max(0, (e - 0.3) / 0.55));
      words.forEach((w, i) => {
        w.style.opacity = String(
          Math.min(1, Math.max(0.24, tt * (words.length + 3) - i)),
        );
      });

      return () => {
        // don't restore title if we remount via key
        void titleOriginal;
        void paraOriginal;
      };
    }
  }, [mDisplay]);

  const goToMobileYear = useCallback((i: number) => {
    const st = mStRef.current;
    if (!st) return;
    const target = st.start + (st.end - st.start) * ((i + 0.72) / 5);
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 0.9 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  const chapter = STORY_CHAPTERS[displayIndex];
  const mChapter = STORY_CHAPTERS[mDisplay];

  return (
    <section ref={sectionRef} id="story" className="relative w-full bg-bone">
      {/* ── Mobile intro ───────────────────────────────────────── */}
      <div className="md:hidden relative mx-auto w-full max-w-[880px] px-5 pt-20 pb-12 text-center">
        <div
          ref={mEyebrowRef}
          className="font-sans uppercase text-mist mb-8"
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.6em",
            opacity: 0,
          }}
        >
          <span className="text-ink">04</span>
          <span className="mx-2 text-mist/50">/</span>
          STORY
        </div>
        <h2
          ref={mTitleRef}
          className="font-display text-ink leading-[1.05]"
          style={{
            fontSize: "clamp(44px, 6.4vw, 72px)",
            fontWeight: 300,
            letterSpacing: "-0.01em",
            opacity: 0,
          }}
        >
          Quietly built over five years.
        </h2>
        <ScrollIlluminate
          as="p"
          className="relative z-10 mx-auto mt-8 text-ink"
          style={{
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: 560,
          }}
        >
          {STORY_INTRO}
        </ScrollIlluminate>
      </div>

      {/* ── Desktop pin stage ──────────────────────────────────── */}
      <div
        ref={pinRef}
        className="relative hidden md:block h-screen overflow-hidden"
      >
        {/* Intro overlay */}
        <div
          ref={introRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-8 pointer-events-none"
        >
          <div
            className="font-sans uppercase text-mist"
            style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.6em" }}
          >
            <span className="text-ink">04</span>
            <span className="mx-2 text-mist/50">/</span>
            STORY
          </div>
          <h2
            className="mt-7 font-display text-ink leading-[1.05]"
            style={{
              fontSize: "clamp(40px, 5.6vw, 68px)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
              maxWidth: 820,
            }}
          >
            Quietly built over five years.
          </h2>
          <p
            className="mt-7 text-ink"
            style={{
              fontSize: 17,
              fontWeight: 400,
              lineHeight: 1.55,
              maxWidth: 540,
            }}
          >
            {STORY_INTRO}
          </p>
          <div
            className="mt-9 flex flex-col items-center gap-2"
            aria-hidden
          >
            <span
              className="font-sans uppercase text-mist"
              style={{ fontSize: 10, letterSpacing: "0.28em" }}
            >
              Scroll
            </span>
            <span className="block w-px h-8 bg-ink/30" />
          </div>
        </div>

        {/* Chapter stage */}
        <div ref={stageRef} className="absolute inset-0" style={{ opacity: 0 }}>
          {/* Ghost years */}
          {STORY_CHAPTERS.map((ch, i) => (
            <span
              key={`ghost-${ch.year}`}
              ref={(el) => {
                ghostRefs.current[i] = el;
              }}
              aria-hidden
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none font-wordmark will-change-transform"
              style={{
                opacity: i === 0 ? 1 : 0,
                fontSize: "clamp(340px, 40vw, 640px)",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(26, 27, 29, 0.07)",
              }}
            >
              {ch.year.slice(2)}
            </span>
          ))}

          {/* Photo frames */}
          {STORY_CHAPTERS.map((ch, i) => (
            <div
              key={`frame-${ch.year}`}
              ref={(el) => {
                frameRefs.current[i] = el;
              }}
              className="absolute inset-0 flex items-center justify-end pr-[clamp(48px,9vw,160px)] pointer-events-none will-change-transform"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div style={{ width: "clamp(320px, 28vw, 440px)" }}>
                <figure
                  className="relative w-full overflow-hidden bg-ink/[0.045]"
                  style={{
                    aspectRatio: "4 / 5",
                    border: "1px solid rgba(26, 27, 29, 0.12)",
                  }}
                >
                  <img
                    src={ch.imageSrc}
                    alt={ch.imageCaption}
                    className="absolute inset-0 h-full w-full object-cover"
                    draggable={false}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </figure>
                <div className="mt-3 flex items-center gap-3">
                  <span
                    aria-hidden
                    className="inline-block shrink-0"
                    style={{
                      width: 5,
                      height: 5,
                      backgroundColor: "var(--color-alpine)",
                    }}
                  />
                  <span
                    className="font-sans uppercase text-mist"
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.24em",
                      lineHeight: 1.6,
                    }}
                  >
                    FIG. {String(i + 1).padStart(2, "0")} · {ch.imageCaption}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Chapter body (left) */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-[clamp(24px,7vw,120px)]">
            <div ref={bodyRef} style={{ width: "min(34vw, 460px)" }}>
              <div
                data-story-item
                className="font-sans text-[11px] tracking-[0.24em] uppercase text-mist"
              >
                Chapter {String(displayIndex + 1).padStart(2, "0")}
                <span className="mx-2 text-mist/50">·</span>
                <span className="text-ink">{chapter.year}</span>
              </div>
              <h3
                data-story-item
                className="mt-5 font-display font-[300] leading-[1.1] tracking-[-0.01em] text-ink"
                style={{ fontSize: "clamp(26px, 2.6vw, 40px)" }}
              >
                {chapter.chapterTitle}
              </h3>
              <div
                data-story-item
                className="mt-6 h-px w-[64px]"
                style={{ backgroundColor: "var(--color-alpine)" }}
              />
              <p
                data-story-item
                className="mt-6 text-[15px] leading-[1.7] text-ink"
              >
                {chapter.paragraph}
              </p>
            </div>
          </div>

          {/* Year rail (right) */}
          <div className="absolute right-[clamp(20px,3vw,52px)] top-1/2 -translate-y-1/2 flex items-center gap-5">
            <span
              aria-hidden
              className="relative block overflow-hidden bg-ink/10"
              style={{ width: 1, height: 180 }}
            >
              <span
                ref={progressBarRef}
                className="absolute inset-0 origin-top"
                style={{
                  backgroundColor: "var(--color-alpine)",
                  transform: "scaleY(0)",
                }}
              />
            </span>
            <ul className="flex flex-col gap-4">
              {STORY_CHAPTERS.map((ch, i) => (
                <li key={ch.year}>
                  <button
                    type="button"
                    onClick={() => goToYear(i)}
                    className="font-sans tabular-nums transition-colors duration-300"
                    style={{
                      fontSize: 12,
                      letterSpacing: "0.16em",
                      color:
                        i === activeIndex
                          ? "var(--color-ink)"
                          : "var(--color-mist)",
                    }}
                  >
                    {ch.year}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky chapters ─────────────────────────────── */}
      <div
        ref={mobileRootRef}
        className="md:hidden relative"
        style={{ height: "440svh" }}
      >
        <div className="sticky top-0 h-[100svh] overflow-hidden bg-bone">
          {STORY_CHAPTERS.map((ch, i) => (
            <span
              key={`m-ghost-${ch.year}`}
              ref={(el) => {
                mGhostRefs.current[i] = el;
              }}
              aria-hidden
              className="absolute inset-x-0 top-[8svh] flex items-start justify-center pointer-events-none select-none font-wordmark will-change-transform"
              style={{
                opacity: i === 0 ? 1 : 0,
                fontSize: "min(60vw, 42svh)",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(26, 27, 29, 0.09)",
              }}
            >
              {ch.year.slice(2)}
            </span>
          ))}

          {STORY_CHAPTERS.map((ch, i) => (
            <div
              key={`m-photo-${ch.year}`}
              ref={(el) => {
                mPhotoRefs.current[i] = el;
              }}
              className="absolute left-1/2 overflow-hidden bg-ink/[0.045] will-change-transform"
              style={{
                top: "16svh",
                width: "min(80vw, 350px)",
                height: "min(52vw, 228px)",
                transform: "translateX(-50%)",
                border: "1px solid rgba(26,27,29,0.12)",
                opacity: i === 0 ? 0.4 : 0,
                clipPath:
                  i === 0 ? "inset(0% 0% 92% 0%)" : "inset(0% 0% 0% 0%)",
              }}
            >
              <img
                src={ch.imageSrc}
                alt={ch.imageCaption}
                draggable={false}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
                style={{ transform: "scale(1.12)" }}
              />
            </div>
          ))}

          <div
            className="absolute inset-x-0 px-6"
            style={{ top: "calc(16svh + min(52vw, 228px) + 22px)" }}
          >
            <div className="font-sans text-[11px] tracking-[0.24em] uppercase text-mist">
              Chapter {String(mDisplay + 1).padStart(2, "0")}
              <span className="mx-2 text-mist/50">·</span>
              <span className="text-ink">{mChapter.year}</span>
            </div>
            <h3
              ref={mTitleBodyRef}
              key={`m-title-${mDisplay}`}
              className="mt-2 font-display font-[300] leading-[1.12] tracking-[-0.01em] text-ink overflow-hidden"
              style={{
                fontSize: "clamp(22px, 6vw, 28px)",
                opacity: 0,
              }}
            >
              {mChapter.chapterTitle}
            </h3>
            <p
              ref={mParaRef}
              key={`m-para-${mDisplay}`}
              className="mt-3 font-sans text-ink"
              style={{ fontSize: 13, lineHeight: 1.55, opacity: 0 }}
            >
              {mChapter.paragraph}
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-5">
            {STORY_CHAPTERS.map((ch, i) => (
              <button
                key={`m-year-${ch.year}`}
                type="button"
                onClick={() => goToMobileYear(i)}
                aria-label={`Go to ${ch.year}`}
                className="font-sans text-[11px] tracking-[0.14em] tabular-nums transition-colors duration-300"
                style={{
                  color:
                    i === mActive
                      ? "var(--color-ink)"
                      : "var(--color-mist)",
                }}
              >
                {ch.year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
