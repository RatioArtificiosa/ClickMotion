"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bloom } from "./Bloom";
import { FlavorsCanStage, InlineCan } from "./InlineCan";
import type { StageMotion } from "./Can3D";
import { ScrollReveal } from "./ScrollReveal";
import { TextReveal } from "./TextReveal";
import {
  FLAVORS,
  PRODUCTS,
  PRODUCT_COUNT,
  SECTION_META,
  SPEC_ROWS,
  tiltFor,
  type Flavor,
  type SpecRow,
} from "./lineup-data";
import { useIsMobile, usePrefersReducedMotion } from "./hooks";
import { getLenis } from "./lenis-bridge";

gsap.registerPlugin(ScrollTrigger);

/** Catalog length — pin, snap, tabs, and stage all follow this. */
const COUNT = Math.max(1, PRODUCT_COUNT || FLAVORS.length || PRODUCTS.length);

/**
 * Storefront capture mode (`?record=1`): disable snap so programmatic
 * scroll is buttery and can cross-fades are fully visible in previews.
 */
function isRecordMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return new URLSearchParams(window.location.search).has("record");
  } catch {
    return false;
  }
}

function formatMg(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Lead spec first, then the rest in catalog order. */
function orderedSpecs(leadId: string): SpecRow[] {
  const lead = SPEC_ROWS.find((i) => i.id === leadId);
  const rest = SPEC_ROWS.filter((i) => i.id !== leadId);
  return lead ? [lead, ...rest] : rest;
}

function makeMotionRefs(): MutableRefObject<StageMotion | null>[] {
  return FLAVORS.map((_, i) => ({
    current: {
      x: i === 0 ? 0 : 3 * tiltFor(i),
      y: 0,
      rotZ: 0,
      scale: i === 0 ? 1 : 0.94,
      opacity: i === 0 ? 1 : 0,
    },
  }));
}

function snapPoints(n: number): number[] {
  if (n <= 1) return [0, 1];
  const pts: number[] = [];
  for (let i = 0; i < n; i++) pts.push(i / n);
  pts.push(1);
  return pts;
}

function indexFromProgress(t: number, n: number): number {
  if (n <= 1) return 0;
  return Math.min(n - 1, Math.max(0, Math.floor(t * n + 1e-4)));
}

/* ───────────────────────────────────────────── Desktop ───────────────────────────────────────────── */

function FlavorsDesktop() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const bloomRefs = useRef<(HTMLDivElement | null)[]>([]);
  const haloRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ghostRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const [motionRefs] = useState(makeMotionRefs);
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const prevActive = useRef(0);
  const reduce = usePrefersReducedMotion();

  /**
   * Capture-driven can entrance. Playwright screenshots stall the main thread
   * so time-based GSAP jumps 0→1 between frames. Storefront capture calls
   * window.__lineupDriveEntrance(index, 0..1) once per frame for smooth motion.
   */
  useEffect(() => {
    if (!isRecordMode()) return;
    gsap.ticker.lagSmoothing(0);
    const drive = (index: number, p: number) => {
      const t = Math.min(1, Math.max(0, p));
      // smoothstep ease-out so the land reads premium
      const e = 1 - Math.pow(1 - t, 3);
      const tilt = tiltFor(index);
      motionRefs.forEach((ref, i) => {
        const m = ref.current;
        if (!m) return;
        if (i === index) {
          m.x = 4.2 * tilt * (1 - e);
          m.y = 0.22 * (1 - e);
          m.rotZ = -0.28 * tilt * (1 - e);
          m.scale = 0.86 + 0.14 * e;
          m.opacity = e;
        } else {
          // Fully hidden cans stay hidden — never wake SKU 03 during 01→02, etc.
          const wasHidden = (m.opacity ?? 0) < 0.05;
          if (wasHidden) {
            m.opacity = 0;
            m.scale = 0.94;
            m.x = 3 * tiltFor(i);
            m.y = 0;
            m.rotZ = 0;
            return;
          }
          // Outgoing (was visible): ease away as entrance progresses
          const out = Math.min(1, t * 1.35);
          const oe = out * out;
          const ot = tiltFor(i);
          m.x = -3.2 * ot * oe;
          m.y = -0.16 * oe;
          m.rotZ = 0.22 * ot * oe;
          m.scale = 1 - 0.1 * oe;
          m.opacity = 1 - oe;
        }
      });
    };
    (
      window as unknown as {
        __lineupDriveEntrance?: (index: number, p: number) => void;
      }
    ).__lineupDriveEntrance = drive;
    return () => {
      delete (
        window as unknown as {
          __lineupDriveEntrance?: (index: number, p: number) => void;
        }
      ).__lineupDriveEntrance;
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [motionRefs]);

  // Pin + snap + entrance
  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    if (reduce) {
      gsap.set([eyebrowRef.current, titleRef.current].filter(Boolean), {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const eye = eyebrowRef.current;
      const tit = titleRef.current;
      if (eye && tit) {
        gsap.set([eye, tit], { opacity: 0, y: 70 });
        gsap.fromTo(
          [eye, tit],
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: section,
              start: "top 55%",
              once: true,
            },
          },
        );
      }

      const record = isRecordMode();
      stRef.current = ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: () => `+=${COUNT * window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        // Smoother scrub lag in record mode so can cross-fades read clearly
        scrub: record ? 0.65 : 1,
        // Snap fights continuous capture scroll — off while recording
        ...(record
          ? {}
          : {
              snap: {
                snapTo: snapPoints(COUNT),
                duration: { min: 0.25, max: 0.55 },
                ease: "power2.inOut",
                directional: false,
                delay: 0.1,
              },
            }),
        invalidateOnRefresh: true,
        refreshPriority: 1,
        onUpdate: (self) => {
          const next = indexFromProgress(self.progress, COUNT);
          setActiveIndex((prev) => (prev === next ? prev : next));
        },
      });
    }, section);

    cleanups.push(() => ctx.revert());
    return () => {
      cleanups.forEach((fn) => fn());
      stRef.current = null;
    };
  }, [reduce]);

  // Cross-fade stage (cans, blooms, ghosts, counter) on activeIndex
  useEffect(() => {
    const prev = prevActive.current;
    if (prev === activeIndex) return;
    const goingUp = activeIndex > prev;
    prevActive.current = activeIndex;
    const tilt = tiltFor(activeIndex);
    const record = isRecordMode();
    const softDur = record ? 1.15 : 0.75;

    // Record mode: capture script drives can poses via __lineupDriveEntrance.
    // Only set the start pose here so the first frame is "off stage".
    if (record) {
      motionRefs.forEach((ref, i) => {
        const m = ref.current;
        if (!m) return;
        gsap.killTweensOf(m);
        if (i === activeIndex) {
          m.x = 4.2 * tilt;
          m.y = 0.22;
          m.rotZ = -0.28 * tilt;
          m.scale = 0.86;
          m.opacity = 0;
        }
        // leave outgoing as-is until drive() eases them out
      });
    } else {
      const inDur = 0.85;
      const outDur = 0.45;
      motionRefs.forEach((ref, i) => {
        const m = ref.current;
        if (!m) return;
        if (i === activeIndex) {
          gsap.fromTo(
            m,
            {
              x: 3.4 * tilt,
              y: 0.14,
              rotZ: -0.2 * tilt,
              scale: 0.9,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              rotZ: 0,
              scale: 1,
              opacity: 1,
              duration: inDur,
              ease: "power2.out",
              delay: 0.1,
              overwrite: "auto",
            },
          );
        } else {
          gsap.to(m, {
            x: -2.6 * tilt,
            y: -0.12,
            rotZ: 0.16 * tilt,
            scale: 0.9,
            opacity: 0,
            duration: outDur,
            ease: "power2.in",
            overwrite: "auto",
          });
        }
      });
    }

    haloRefs.current.forEach((el, i) => {
      if (el)
        gsap.to(el, {
          opacity: i === activeIndex ? 1 : 0,
          duration: softDur,
          ease: "power2.inOut",
          overwrite: "auto",
        });
    });
    bloomRefs.current.forEach((el, i) => {
      if (el)
        gsap.to(el, {
          opacity: i === activeIndex ? 1 : 0,
          duration: softDur,
          ease: "power2.inOut",
          overwrite: "auto",
        });
    });
    ghostRefs.current.forEach((el, i) => {
      if (el)
        gsap.to(el, {
          opacity: i === activeIndex ? 1 : 0,
          y: i === activeIndex ? 0 : goingUp ? -48 : 48,
          duration: softDur,
          ease: "power2.inOut",
          overwrite: "auto",
          force3D: true,
        });
    });
    if (counterRef.current) {
      counterRef.current.textContent = `${activeIndex + 1} / ${COUNT}`;
    }
  }, [activeIndex, motionRefs]);

  // Copy card out → swap displayIndex
  useEffect(() => {
    if (activeIndex === displayIndex) return;
    const el = copyRef.current;
    if (!el) {
      setDisplayIndex(activeIndex);
      return;
    }
    if (reduce) {
      setDisplayIndex(activeIndex);
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: -26,
        opacity: 0,
        duration: 0.25,
        ease: "power3.in",
        onComplete: () => setDisplayIndex(activeIndex),
      });
    });
    return () => ctx.revert();
  }, [activeIndex, displayIndex, reduce]);

  // Copy card in on displayIndex
  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    if (reduce) {
      gsap.set(el, { y: 0, opacity: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll("[data-stage-item]");
      gsap.fromTo(
        el,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
      );
      gsap.fromTo(
        items,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.05,
          delay: 0.05,
        },
      );
    });
    return () => ctx.revert();
  }, [displayIndex, reduce]);

  const goTo = useCallback(
    (i: number) => {
      const st = stRef.current;
      if (!st || reduce) {
        setActiveIndex(i);
        return;
      }
      const target = st.start + (st.end - st.start) * (i / COUNT);
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { duration: 1 });
      else window.scrollTo({ top: target, behavior: "smooth" });
    },
    [reduce],
  );

  // Keyboard arrows while section in view
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const section = sectionRef.current;
      if (!section) return;
      const r = section.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      e.preventDefault();
      if (e.key === "ArrowRight") goTo(Math.min(COUNT - 1, activeIndex + 1));
      else goTo(Math.max(0, activeIndex - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, goTo]);

  const flavor = FLAVORS[displayIndex] ?? FLAVORS[0];
  const rows = orderedSpecs(flavor.leadIngredient);

  return (
    <section
      ref={sectionRef}
      id="flavors"
      className="relative w-full bg-bone overflow-hidden"
    >
      <div ref={pinRef} className="relative h-screen flex flex-col">
        {FLAVORS.map((f, i) => (
          <div
            key={f.id}
            ref={(el) => {
              bloomRefs.current[i] = el;
            }}
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: i === 0 ? 1 : 0,
              background: `radial-gradient(72% 85% at 66% 52%, ${f.bloomColor}30 0%, ${f.bloomColor}14 42%, transparent 72%)`,
            }}
          />
        ))}

        {/* Header */}
        <div
          className="relative z-10 mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)] pb-[clamp(8px,2vh,20px)]"
          style={{
            paddingTop: "calc(var(--nav-h) + clamp(8px, 1.6vh, 24px))",
          }}
        >
          <div className="flex items-baseline justify-between gap-6 mb-3">
            <div
              ref={eyebrowRef}
              className="font-sans text-[12px] tracking-[0.2em] uppercase text-mist"
              style={{ opacity: 0 }}
            >
              <span className="text-ink">{SECTION_META.sectionIndex}</span>
              <span className="mx-2 text-mist/50">/</span>
              {SECTION_META.eyebrowLabel}
            </div>
            <div
              ref={counterRef}
              className="font-sans text-[12px] tracking-[0.2em] uppercase text-mist tabular-nums"
            >
              {`1 / ${COUNT}`}
            </div>
          </div>
          <h2
            ref={titleRef}
            className="font-display font-[300] leading-[1.0] tracking-[-0.02em] text-ink whitespace-nowrap"
            style={{
              opacity: 0,
              fontSize: "clamp(32px, min(4.6vw, 6.5vh), 64px)",
            }}
          >
            {SECTION_META.title}
          </h2>
        </div>

        {/* Body grid */}
        <div className="relative z-10 flex-1 min-h-0 mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)]">
          <div
            className="grid h-full items-center gap-x-[clamp(16px,3vw,56px)]"
            style={{
              gridTemplateColumns: "minmax(320px, 5fr) minmax(0, 7fr)",
            }}
          >
            {/* Copy */}
            <div className="min-w-0">
              <FlavorCopy
                ref={copyRef}
                flavor={flavor}
                rows={rows}
              />
            </div>

            {/* Can stage */}
            <div className="relative h-full min-h-0">
              {FLAVORS.map((f, i) => (
                <span
                  key={`ghost-${f.id}`}
                  ref={(el) => {
                    ghostRefs.current[i] = el;
                  }}
                  aria-hidden
                  className="absolute inset-0 flex items-center justify-end pr-[2%] pointer-events-none select-none font-wordmark"
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    fontSize: "clamp(260px, 26vw, 430px)",
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "transparent",
                    WebkitTextStroke: "1.5px rgba(26, 27, 29, 0.08)",
                  }}
                >
                  {f.skuNumber}
                </span>
              ))}

              <div className="absolute inset-0">
                {FLAVORS.map((f, i) => (
                  <div
                    key={`halo-${f.id}`}
                    ref={(el) => {
                      haloRefs.current[i] = el;
                    }}
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ opacity: i === 0 ? 1 : 0 }}
                  >
                    <div
                      aria-hidden
                      className="pointer-events-none"
                      style={{
                        width: "58vh",
                        height: "58vh",
                        opacity: 0.92,
                        transform: "scale(0.95)",
                        background: `radial-gradient(circle, ${f.bloomColor} 0%, ${f.bloomColor}ee 18%, ${f.bloomColor}b3 35%, ${f.bloomColor}66 55%, ${f.bloomColor}26 75%, ${f.bloomColor}00 92%)`,
                        filter: "blur(2px)",
                      }}
                    />
                  </div>
                ))}
                <FlavorsCanStage
                  motionRefs={motionRefs}
                  activeIndex={activeIndex}
                  skus={FLAVORS.map((f) => f.skuNumber)}
                  labelUrls={FLAVORS.map((f) => f.labelPath)}
                  meshUrls={FLAVORS.map((f) => f.meshPath)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)] pb-[clamp(24px,4vh,48px)] flex justify-end">
          <div className="flex items-center gap-5">
            {FLAVORS.map((f, i) => (
              <button
                key={f.id}
                type="button"
                onClick={() => goTo(i)}
                className="font-sans text-[12px] tracking-[0.18em] uppercase transition-colors duration-300 tabular-nums"
                style={{
                  color:
                    i === activeIndex
                      ? "var(--color-ink)"
                      : "var(--color-mist)",
                }}
                aria-label={`Go to ${f.name}`}
                aria-current={i === activeIndex ? "true" : undefined}
              >
                {f.skuNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FlavorCopy({
  ref,
  flavor,
  rows,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  flavor: Flavor;
  rows: SpecRow[];
}) {
  return (
    <div ref={ref}>
      <div
        data-stage-item
        className="flex items-baseline justify-between font-sans text-[11px] tracking-[0.22em] uppercase"
      >
        <span className="font-wordmark font-[800] tracking-[-0.03em] text-[15px] md:text-[17px] text-ink normal-case">
          {flavor.number}
        </span>
        <span className="text-mist">{flavor.descriptor}</span>
      </div>
      <h3
        data-stage-item
        className="mt-4 font-display font-[300] leading-[0.92] tracking-[-0.015em] text-ink"
        style={{ fontSize: "clamp(52px, min(7.6vw, 12vh), 128px)" }}
      >
        {flavor.name}
        <span style={{ color: flavor.bloomColor }}>.</span>
      </h3>
      <p
        data-stage-item
        className="mt-3 font-serif italic text-mist"
        style={{ fontSize: 16 }}
      >
        {flavor.flavorPair}
      </p>
      <p
        data-stage-item
        className="mt-[clamp(12px,2.5vh,24px)] text-[15px] leading-[1.65] text-ink max-w-[44ch]"
      >
        {flavor.pitch}
      </p>
      <div
        data-stage-item
        className="mt-7 h-px w-[72px]"
        style={{ backgroundColor: flavor.bloomColor }}
      />
      <ul data-stage-item className="mt-6 flex flex-col gap-[7px]">
        {rows.map((ing) => {
          const lead = ing.id === flavor.leadIngredient;
          return (
            <li
              key={ing.id}
              className="flex items-baseline gap-3 text-[12px]"
            >
              <span
                className={`font-display tabular-nums w-[56px] shrink-0 leading-none ${lead ? "text-ink" : "text-mist"}`}
                style={{ fontSize: 15 }}
              >
                {ing.dosageMg}
                <span className="ml-0.5 text-[9px] tracking-[0.18em] uppercase">
                  {ing.unit ?? SECTION_META.specUnit}
                </span>
              </span>
              <span className={lead ? "text-ink" : "text-mist"}>
                {ing.name}
              </span>
              {lead && (
                <span className="ml-auto font-sans text-[9px] tracking-[0.22em] uppercase text-ink/70">
                  {SECTION_META.leadBadge}
                </span>
              )}
            </li>
          );
        })}
      </ul>
      <div
        data-stage-item
        className="mt-6 flex items-baseline justify-between border-t border-ink/15 pt-3 max-w-[340px]"
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-mist">
          {SECTION_META.totalLabel}
        </span>
        <span className="font-display tabular-nums text-ink text-[17px] leading-none">
          {formatMg(SECTION_META.totalValue)}
          <span className="ml-1 text-[10px] tracking-[0.18em] uppercase text-mist">
            {SECTION_META.totalUnit}
          </span>
        </span>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────── Mobile ───────────────────────────────────────────── */

function FlavorsMobile() {
  const trackRef = useRef<HTMLDivElement>(null);
  const bloomRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const entered = useRef(false);
  const prevIndex = useRef(0);
  const [active, setActive] = useState(0);

  const animateCardIn = useCallback((index: number) => {
    const title = titleRefs.current[index];
    if (!title) return;
    const article = title.closest("article");
    if (!article) return;

    // Char rise on title (fallback: whole title)
    const chars = title.querySelectorAll("[data-char]");
    if (chars.length) {
      gsap.fromTo(
        chars,
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.03,
          overwrite: "auto",
        },
      );
    } else {
      gsap.fromTo(
        title,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.55,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }
    gsap.fromTo(
      article.querySelectorAll("[data-card-item]"),
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.05,
        delay: 0.1,
        overwrite: "auto",
      },
    );
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const st = ScrollTrigger.create({
      trigger: track,
      start: "top 85%",
      once: true,
      onEnter: () => {
        if (entered.current) return;
        entered.current = true;
        animateCardIn(0);
      },
    });
    return () => st.kill();
  }, [animateCardIn]);

  // Horizontal snap → active index
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const cards = Array.from(track.children) as HTMLElement[];
        if (!cards.length) return;
        const mid = track.scrollLeft + track.clientWidth / 2;
        let best = 0;
        let bestDist = Infinity;
        cards.forEach((card, i) => {
          const c = card.offsetLeft + card.offsetWidth / 2;
          const d = Math.abs(c - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActive(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    bloomRefs.current.forEach((el, i) => {
      if (el)
        gsap.to(el, {
          opacity: i === active ? 1 : 0,
          duration: 0.8,
          ease: "power2.inOut",
          overwrite: "auto",
        });
    });

    const prev = prevIndex.current;
    if (prev === active) return;
    prevIndex.current = active;
    if (!entered.current) {
      entered.current = true;
    }
    const title = titleRefs.current[prev];
    const article = title?.closest("article");
    if (title && article) {
      gsap.to([title, ...article.querySelectorAll("[data-card-item]")], {
        opacity: 0,
        duration: 0.12,
        ease: "power1.out",
        overwrite: "auto",
      });
    }
    animateCardIn(active);
  }, [active, animateCardIn]);

  return (
    <section
      id="flavors"
      className="relative w-full bg-bone overflow-hidden"
    >
      {FLAVORS.map((f, i) => (
        <div
          key={f.id}
          ref={(el) => {
            bloomRefs.current[i] = el;
          }}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: i === 0 ? 1 : 0,
            background: `radial-gradient(90% 70% at 50% 40%, ${f.bloomColor}33 0%, ${f.bloomColor}14 46%, transparent 78%)`,
          }}
        />
      ))}

      <div className="relative px-5 pt-16 pb-2">
        <ScrollReveal>
          <div className="font-sans text-[12px] tracking-[0.2em] uppercase text-mist">
            <span className="text-ink">{SECTION_META.sectionIndex}</span>
            <span className="mx-2 text-mist/50">/</span>
            {SECTION_META.eyebrowLabel}
          </div>
        </ScrollReveal>
        <TextReveal
          as="h2"
          split="lines"
          className="mt-3 font-display font-[300] leading-[1.0] tracking-[-0.02em] text-ink"
          style={{ fontSize: "clamp(40px, 11vw, 56px)" }}
        >
          {SECTION_META.title}
        </TextReveal>
        <ScrollReveal delay={0.2}>
          <p className="mt-3 font-sans text-[10px] tracking-[0.24em] uppercase text-mist">
            {SECTION_META.mobileSwipeHint}
          </p>
        </ScrollReveal>
      </div>

      <ScrollReveal className="relative">
        <div
          ref={trackRef}
          className="flex gap-[5vw] overflow-x-auto snap-x snap-mandatory px-[9vw] pt-4 pb-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {FLAVORS.map((f, i) => {
            const rows = orderedSpecs(f.leadIngredient);
            return (
              <article
                key={f.id}
                className="w-[82vw] shrink-0 snap-center flex flex-col rounded-[3px]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(26,27,29,0.12)",
                  boxShadow: "0 18px 40px -28px rgba(26,27,29,0.28)",
                  padding: "18px 18px 22px",
                }}
              >
                <div
                  className="relative w-full"
                  style={{ height: "clamp(230px, 34vh, 340px)" }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <Bloom color={f.bloomColor} size="72%" intensity="strong" />
                  </div>
                  <InlineCan
                    sku={f.skuNumber}
                    labelUrl={f.labelPath}
                    meshUrl={f.meshPath}
                    targetHeight={2.7}
                    active={i === active}
                  />
                </div>

                <div
                  data-card-item
                  className="mt-2 flex items-baseline justify-between font-sans text-[10px] tracking-[0.2em] uppercase"
                >
                  <span className="font-wordmark text-[14px] tracking-[-0.03em] text-ink normal-case">
                    {f.number}
                  </span>
                  <span className="text-mist">{f.descriptor}</span>
                </div>

                <h3
                  ref={(el) => {
                    titleRefs.current[i] = el;
                  }}
                  className="mt-2 font-display font-[300] leading-[0.95] tracking-[-0.015em] text-ink overflow-hidden"
                  style={{ fontSize: "clamp(40px, 12vw, 56px)" }}
                >
                  <CharSplit text={f.name} />
                  <span style={{ color: f.bloomColor }}>.</span>
                </h3>

                <p
                  data-card-item
                  className="mt-2 font-serif italic text-mist text-[15px]"
                >
                  {f.flavorPair}
                </p>
                <p
                  data-card-item
                  className="mt-3 text-[14px] leading-[1.6] text-ink"
                >
                  {f.pitch}
                </p>
                <div
                  data-card-item
                  className="mt-4 h-px w-[56px]"
                  style={{ backgroundColor: f.bloomColor }}
                />
                <ul data-card-item className="mt-4 flex flex-col gap-[6px]">
                  {rows.map((ing) => {
                    const lead = ing.id === f.leadIngredient;
                    return (
                      <li
                        key={ing.id}
                        className="flex items-baseline gap-2 text-[11px]"
                      >
                        <span
                          className={`font-display tabular-nums w-[48px] shrink-0 ${lead ? "text-ink" : "text-mist"}`}
                          style={{ fontSize: 14 }}
                        >
                          {ing.dosageMg}
                          <span className="ml-0.5 text-[8px] tracking-[0.18em] uppercase">
                            {ing.unit ?? SECTION_META.specUnit}
                          </span>
                        </span>
                        <span className={lead ? "text-ink" : "text-mist"}>
                          {ing.name}
                        </span>
                        {lead && (
                          <span className="ml-auto font-sans text-[8px] tracking-[0.2em] uppercase text-ink/70">
                            {SECTION_META.leadBadge}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <div
                  data-card-item
                  className="mt-4 flex items-baseline justify-between border-t border-ink/15 pt-2"
                >
                  <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-mist">
                    {SECTION_META.totalLabel}
                  </span>
                  <span className="font-display tabular-nums text-ink text-[15px]">
                    {formatMg(SECTION_META.totalValue)}
                    <span className="ml-1 text-[9px] tracking-[0.18em] uppercase text-mist">
                      {SECTION_META.totalUnit}
                    </span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </ScrollReveal>

      <div className="relative flex justify-center gap-4 py-6">
        {FLAVORS.map((f, i) => (
          <button
            key={f.id}
            type="button"
            onClick={() => {
              const track = trackRef.current;
              const card = track?.children[i] as HTMLElement | undefined;
              if (track && card) {
                track.scrollTo({
                  left:
                    card.offsetLeft -
                    (track.clientWidth - card.offsetWidth) / 2,
                  behavior: "smooth",
                });
              }
            }}
            className="font-sans text-[12px] tracking-[0.18em] uppercase transition-colors duration-300 tabular-nums"
            style={{
              color: i === active ? "var(--color-ink)" : "var(--color-mist)",
            }}
            aria-label={`Go to ${f.name}`}
          >
            {f.skuNumber}
          </button>
        ))}
      </div>
    </section>
  );
}

function CharSplit({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          data-char
          className="inline-block"
          style={{ whiteSpace: ch === " " ? "pre" : undefined }}
        >
          {ch}
        </span>
      ))}
    </>
  );
}

/* ───────────────────────────────────────────── Export ───────────────────────────────────────────── */

/**
 * LINEUP — scroll-pinned product reveal section (MS-SEC-LINE01).
 * Desktop: pin scrub + snap through PRODUCTS. Mobile: horizontal snap cards.
 */
export default function LineupSection() {
  const mobile = useIsMobile();
  return mobile ? <FlavorsMobile /> : <FlavorsDesktop />;
}

/** Named export for labs that import { Flavors } */
export function Flavors() {
  return <LineupSection />;
}
