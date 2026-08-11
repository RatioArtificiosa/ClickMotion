import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { BotanicalIcon } from "../components/BotanicalIcon";
import { Can3D } from "../components/can/Can3D";
import {
  BLEND_TOTAL_MG,
  INSIDE_INGREDIENTS,
} from "../data/ingredients";
import { canvasDpr } from "../lib/hooks";
import { drawSvgPaths } from "../lib/drawSvg";
import { getLenis } from "../lib/lenis";
import { splitChars } from "../lib/splitFallback";
import { useInView } from "../lib/useInView";

gsap.registerPlugin(ScrollTrigger);

function formatMg(n: number) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CameraLookAt() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return null;
}

function InsideCan({
  yaw,
  inView,
}: {
  yaw: number;
  inView: boolean;
}) {
  return (
    <Canvas
      shadows
      dpr={canvasDpr()}
      frameloop={inView ? "always" : "never"}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      camera={{ position: [0, 0.4, 7.2], fov: 28 }}
      className="!absolute !inset-0"
    >
      <CameraLookAt />
      <Environment files="/hdri/studio_small_03_1k.hdr" background={false} />
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[4, 6, 5]}
        intensity={1.4}
        color="#ffffff"
        castShadow
      />
      <directionalLight position={[-4, 2, 3]} intensity={0.5} />
      <directionalLight position={[0, 4, -5]} intensity={1.2} />
      <Can3D
        skuNumber="01"
        controlledRotationY={yaw}
        controlledTiltX={0.2}
        enableParallax
        targetHeight={2.2}
      />
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.32}
        scale={4}
        blur={2}
        far={2}
        resolution={512}
        color="#1a1b1d"
      />
    </Canvas>
  );
}

/**
 * #inside — desktop pin +=4*vh snap 5 stops; mobile horizontal deck.
 * Can yaw = π/2 * active; botanical drawSVG + dose bar on stage change.
 */
export function Inside() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const sciRowRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const botSvgRef = useRef<SVGSVGElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const doseNumRef = useRef<HTMLSpanElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const firstMobile = useRef(true);
  const splitCleanup = useRef<(() => void) | null>(null);

  const { ref: canInViewRef, inView } = useInView("1600px");

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);

  // ── Headline "Inside." entrance ──────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    const h = headlineRef.current;
    if (!section || !h) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(h, { opacity: 1, y: 0 });
      return;
    }

    if (window.matchMedia("(max-width: 767px)").matches) {
      const tw = gsap.fromTo(
        h,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        },
      );
      return () => {
        tw.scrollTrigger?.kill();
        tw.kill();
      };
    }

    // Desktop: char rise yPercent 22
    const original = h.textContent ?? "Inside.";
    gsap.set(h, { opacity: 1 });
    const chars = splitChars(h);
    const tw = gsap.fromTo(
      chars,
      { yPercent: 22, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.022,
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      },
    );
    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
      h.textContent = original;
    };
  }, []);

  // ── Desktop pin + snap ───────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !window.matchMedia("(min-width: 768px)").matches) return;

    const ctx = gsap.context(() => {
      stRef.current = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${4 * window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        snap: {
          snapTo: [0, 0.25, 0.5, 0.75, 1],
          duration: { min: 0.2, max: 0.5 },
          ease: "power2.inOut",
          directional: false,
          delay: 0.1,
        },
        invalidateOnRefresh: true,
        refreshPriority: 0,
        onUpdate: (self) => {
          // +eps so exact snap stops (0.25/0.5/0.75) land on stages 1/2/3
          const idx = Math.min(
            3,
            Math.max(0, Math.floor(4 * self.progress + 1e-4)),
          );
          setActiveIndex((prev) => (prev !== idx ? idx : prev));
        },
      });
      // After hero + flavors pins exist, remeasure
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, section);

    return () => {
      ctx.revert();
      stRef.current = null;
    };
  }, []);

  // ── Halo color on active ─────────────────────────────────────
  useEffect(() => {
    const el = haloRef.current;
    if (!el) return;
    gsap.to(el, {
      backgroundColor: INSIDE_INGREDIENTS[activeIndex].haloColor,
      duration: 0.5,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  }, [activeIndex]);

  // ── Copy out → commit displayIndex ───────────────────────────
  useEffect(() => {
    if (activeIndex === displayIndex) return;
    const group = [nameRef.current, sciRowRef.current, metaRef.current].filter(
      Boolean,
    ) as HTMLElement[];
    if (!group.length) {
      setDisplayIndex(activeIndex);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayIndex(activeIndex);
      return;
    }
    const tw = gsap.to(group, {
      opacity: 0,
      y: -26,
      duration: 0.22,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => setDisplayIndex(activeIndex),
    });
    return () => {
      tw.kill();
    };
  }, [activeIndex, displayIndex]);

  // ── Copy in + name chars + drawSVG + dose bar ────────────────
  useEffect(() => {
    const group = [nameRef.current, sciRowRef.current, metaRef.current].filter(
      Boolean,
    ) as HTMLElement[];
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const stage = INSIDE_INGREDIENTS[displayIndex];
    const tweens: gsap.core.Tween[] = [];

    if (reduce) {
      gsap.set(group, { opacity: 1, y: 0 });
      if (barRef.current) {
        gsap.set(barRef.current, {
          scaleX: stage.dosageMg / BLEND_TOTAL_MG,
          backgroundColor: stage.haloColor,
        });
      }
      if (doseNumRef.current) {
        doseNumRef.current.textContent = String(stage.dosageMg);
      }
      return;
    }

    if (group.length) {
      tweens.push(
        gsap.fromTo(
          group,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            delay: 0.1,
            ease: "power3.out",
            stagger: 0.05,
            overwrite: "auto",
          },
        ),
      );
    }

    // Name chars
    splitCleanup.current?.();
    splitCleanup.current = null;
    const nameEl = nameRef.current;
    if (nameEl) {
      const original = nameEl.innerHTML;
      const lineEls = nameEl.querySelectorAll("[data-name-line]");
      let chars: HTMLElement[] = [];
      if (lineEls.length) {
        lineEls.forEach((line) => {
          chars = chars.concat(splitChars(line as HTMLElement));
        });
      } else {
        chars = splitChars(nameEl);
      }
      tweens.push(
        gsap.fromTo(
          chars,
          { yPercent: 60, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.028,
            delay: 0.12,
            overwrite: "auto",
          },
        ),
      );
      splitCleanup.current = () => {
        nameEl.innerHTML = original;
      };
    }

    if (haloRef.current) {
      tweens.push(
        gsap.fromTo(
          haloRef.current,
          { scale: 1.45 },
          { scale: 1.6, duration: 0.9, ease: "power2.out", overwrite: "auto" },
        ),
      );
    }

    if (botSvgRef.current) {
      const d = drawSvgPaths(botSvgRef.current.querySelectorAll("[data-bot]"), {
        from: "0%",
        to: "100%",
        duration: 0.9,
        ease: "power1.inOut",
        stagger: 0.08,
        delay: 0.15,
      });
      if (d) tweens.push(d);
    }

    if (barRef.current) {
      gsap.set(barRef.current, { backgroundColor: stage.haloColor });
      tweens.push(
        gsap.fromTo(
          barRef.current,
          { scaleX: 0 },
          {
            scaleX: stage.dosageMg / BLEND_TOTAL_MG,
            duration: 0.8,
            delay: 0.25,
            ease: "power2.inOut",
            overwrite: "auto",
          },
        ),
      );
    }
    if (doseNumRef.current) {
      const prev = parseFloat(doseNumRef.current.textContent || "0") || 0;
      const proxy = { val: prev };
      const el = doseNumRef.current;
      const target = stage.dosageMg;
      tweens.push(
        gsap.to(proxy, {
          val: target,
          duration: 0.8,
          delay: 0.25,
          ease: "power2.out",
          overwrite: true,
          onUpdate: () => {
            el.textContent = String(Math.round(proxy.val));
          },
          onComplete: () => {
            el.textContent = String(target);
          },
        }),
      );
    }

    return () => {
      tweens.forEach((t) => t.kill());
      splitCleanup.current?.();
      splitCleanup.current = null;
    };
  }, [displayIndex]);

  // ── Botanical rock idle ──────────────────────────────────────
  useEffect(() => {
    const el = botSvgRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const tw = gsap.fromTo(
      el,
      { rotation: -3.5, transformOrigin: "50% 50%" },
      {
        rotation: 3.5,
        duration: 5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      },
    );
    return () => {
      tw.kill();
    };
  }, [displayIndex]);

  // ── Name hover: amplify halo + redraw bot ────────────────────
  const onNameEnter = useCallback(() => {
    if (haloRef.current) {
      gsap.to(haloRef.current, {
        opacity: 0.7,
        scale: 1.75,
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (botSvgRef.current) {
      drawSvgPaths(botSvgRef.current.querySelectorAll("[data-bot]"), {
        from: "0%",
        to: "100%",
        duration: 0.7,
        ease: "power1.inOut",
        stagger: 0.06,
      });
    }
  }, []);

  const onNameLeave = useCallback(() => {
    if (haloRef.current) {
      gsap.to(haloRef.current, {
        opacity: 0.5,
        scale: 1.6,
        duration: 0.7,
        ease: "power2.inOut",
        overwrite: "auto",
      });
    }
  }, []);

  const goTo = useCallback((i: number) => {
    // Optimistic UI — scroll ST will reaffirm
    setActiveIndex(i);
    const st = stRef.current;
    if (!st) return;
    const t = 0.25 * i;
    const target = st.start + (st.end - st.start) * t;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  // Keyboard while section in view
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const section = sectionRef.current;
      if (!section) return;
      const r = section.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      // Prefer desktop pin path
      if (window.matchMedia("(max-width: 767px)").matches) return;
      e.preventDefault();
      if (e.key === "ArrowRight") goTo(Math.min(3, activeIndex + 1));
      else goTo(Math.max(0, activeIndex - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, goTo]);

  // ── Mobile deck scroll → index ───────────────────────────────
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
          const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - mid);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        setActiveIndex((prev) => (prev === best ? prev : best));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const animateMobileCard = useCallback((index: number) => {
    const title = titleRefs.current[index];
    const article = title?.closest("article");
    if (!title || !article) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([title, ...article.querySelectorAll("[data-deck-item]")], {
        opacity: 1,
      });
      return;
    }
    const chars = title.querySelectorAll("[data-char]");
    if (chars.length) {
      gsap.fromTo(
        chars,
        { yPercent: 108 },
        {
          yPercent: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.02,
          overwrite: "auto",
        },
      );
      gsap.set(title, { opacity: 1 });
    } else {
      gsap.fromTo(
        title,
        { yPercent: 108, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        },
      );
    }
    gsap.fromTo(
      article.querySelectorAll("[data-deck-item]"),
      { opacity: 0, y: 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.07,
        delay: 0.08,
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
        if (!firstMobile.current) return;
        firstMobile.current = false;
        animateMobileCard(0);
      },
    });
    return () => st.kill();
  }, [animateMobileCard]);

  const prevMobile = useRef(0);
  useEffect(() => {
    // Mobile card transitions only when mobile layout is active
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const prev = prevMobile.current;
    if (prev === activeIndex) return;
    prevMobile.current = activeIndex;
    firstMobile.current = false;
    const title = titleRefs.current[prev];
    const article = title?.closest("article");
    if (title && article) {
      gsap.to([title, ...article.querySelectorAll("[data-deck-item]")], {
        opacity: 0,
        duration: 0.12,
        ease: "power1.out",
        overwrite: "auto",
      });
    }
    animateMobileCard(activeIndex);
    // Keep display in sync on mobile (no out/in lag for desktop copy)
    setDisplayIndex(activeIndex);
  }, [activeIndex, animateMobileCard]);

  const stage = INSIDE_INGREDIENTS[displayIndex];
  const yaw = (Math.PI / 2) * activeIndex;

  return (
    <section
      ref={sectionRef}
      id="inside"
      data-active={activeIndex}
      data-display={displayIndex}
      className="relative w-full bg-ink md:overflow-hidden flex flex-col md:min-h-screen md:h-screen pt-10 pb-4 md:py-0"
    >
      {/* Header */}
      <div
        className="shrink-0 pb-2 z-20 flex flex-col items-center pointer-events-none"
        style={{
          paddingTop: "calc(var(--nav-h) + clamp(8px, 1.6vh, 24px))",
        }}
      >
        <div
          className="font-sans uppercase text-bone/50"
          style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.4em" }}
        >
          <span className="text-bone">03</span>
          <span className="mx-2 text-bone/30">·</span>
          Functional ingredients
        </div>
        <h2
          ref={headlineRef}
          className="mt-3 font-display italic text-bone tracking-[-0.01em]"
          style={{
            fontSize: "clamp(36px, 4.4vw, 56px)",
            fontWeight: 300,
            lineHeight: 1.2,
            opacity: 0,
          }}
        >
          Inside.
        </h2>

        {/* Desktop pills */}
        <div
          className="mt-4 hidden md:flex flex-wrap justify-center gap-2 md:gap-3 pointer-events-auto"
          style={{ maxWidth: "min(820px, calc(100vw - 48px))" }}
        >
          {INSIDE_INGREDIENTS.map((ing, i) => {
            const on = i === activeIndex;
            return (
              <button
                key={ing.id}
                type="button"
                onClick={() => goTo(i)}
                className="font-sans uppercase transition-colors duration-300 ease-out flex items-center justify-center"
                style={{
                  flex: "0 1 auto",
                  minWidth: 120,
                  maxWidth: 180,
                  height: 38,
                  padding: "0 18px",
                  borderRadius: 19,
                  border: `1px solid ${on ? "var(--color-bone)" : "rgba(239,237,230,0.35)"}`,
                  backgroundColor: on ? "var(--color-bone)" : "transparent",
                  color: on ? "var(--color-ink)" : "var(--color-bone)",
                  opacity: on ? 1 : 0.65,
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.32em",
                  whiteSpace: "nowrap",
                  paddingLeft: "calc(18px + 0.32em)",
                }}
                aria-current={on ? "true" : undefined}
              >
                {ing.pillLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage grid */}
      <div className="flex-1 flex items-center min-h-0 w-full">
        <div className="mx-auto w-full max-w-[1440px] px-[clamp(24px,4vw,48px)]">
          <div className="mt-2 md:mt-0 grid grid-cols-5 md:grid-cols-12 items-center gap-y-4 md:gap-y-0 gap-x-3 md:gap-x-[clamp(16px,2.4vw,48px)]">
            {/* Left — name + botanical (desktop) */}
            <div
              className="hidden md:block md:col-span-4 z-10 min-w-0 md:text-left"
              style={{ containerType: "inline-size" }}
            >
              <div
                onPointerEnter={onNameEnter}
                onPointerLeave={onNameLeave}
                className="inline-block cursor-default"
              >
                <h3
                  ref={nameRef}
                  key={displayIndex}
                  className="font-wordmark text-bone leading-[0.9] uppercase max-w-full text-[clamp(26px,7vw,38px)] md:text-[clamp(20px,8.6cqw,44px)]"
                  style={{
                    fontWeight: 900,
                    letterSpacing: "-0.03em",
                    wordBreak: "keep-all",
                    opacity: 0,
                  }}
                >
                  <span className="block md:hidden whitespace-nowrap">
                    {stage.pillLabel}
                  </span>
                  <span className="hidden md:block">
                    {stage.displayLines.map((line) => (
                      <span
                        key={line}
                        data-name-line
                        className="block overflow-hidden"
                      >
                        {line}
                      </span>
                    ))}
                  </span>
                </h3>
              </div>
              <div
                ref={sciRowRef}
                className="mt-4 flex items-center justify-center md:justify-start gap-4"
                style={{ opacity: 0 }}
              >
                <svg
                  ref={botSvgRef}
                  viewBox="0 0 48 48"
                  width={56}
                  height={56}
                  aria-hidden
                >
                  <BotanicalIcon stage={displayIndex} />
                </svg>
                <p
                  className="font-serif italic text-bone/60"
                  style={{ fontSize: 15 }}
                >
                  {stage.scientificName}
                </p>
              </div>
            </div>

            {/* Center — can + halo */}
            <div
              ref={canInViewRef as MutableRefObject<HTMLDivElement | null>}
              className="col-span-5 md:col-span-4 relative flex items-center justify-center min-w-0 h-[218px] md:h-[clamp(320px,56vh,600px)]"
            >
              <div
                ref={haloRef}
                aria-hidden
                className="absolute rounded-full"
                style={{
                  backgroundColor: stage.haloColor,
                  width: "60%",
                  height: "60%",
                  filter: "blur(120px)",
                  opacity: 0.5,
                  transform: "scale(1.6)",
                }}
              />
              <InsideCan yaw={yaw} inView={inView} />
            </div>

            {/* Right — meta (desktop) */}
            <div
              ref={metaRef}
              className="hidden md:block md:col-span-4 z-10 min-w-0 text-left"
              style={{ opacity: 0 }}
            >
              <div
                className="font-sans uppercase text-bone/50"
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  letterSpacing: "0.4em",
                }}
              >
                {stage.counter}
              </div>
              <p
                className="mt-3 md:mt-4 text-bone"
                style={{
                  fontSize: 16,
                  lineHeight: 1.55,
                  maxWidth: "min(360px, 100%)",
                  fontWeight: 400,
                }}
              >
                {stage.description}
              </p>
              <div
                className="mt-5 md:mt-7 flex flex-col"
                style={{ maxWidth: "min(360px, 100%)" }}
              >
                <div className="flex items-baseline justify-between border-t border-bone/15 pt-3">
                  <span className="font-sans text-[10px] tracking-[0.24em] uppercase text-bone/60">
                    Source
                  </span>
                  <span className="font-sans text-[13px] text-bone">
                    {stage.source}
                  </span>
                </div>
                <div className="mt-3 flex items-baseline justify-between border-t border-bone/15 pt-3">
                  <span className="font-sans text-[10px] tracking-[0.24em] uppercase text-bone/60">
                    Role
                  </span>
                  <span className="font-sans text-[13px] text-bone">
                    {stage.role}
                  </span>
                </div>
                <div className="mt-3 border-t border-bone/15 pt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[10px] tracking-[0.24em] uppercase text-bone/60">
                      Dose
                    </span>
                    <span className="font-display tabular-nums text-bone text-[17px] leading-none">
                      {/* empty — value written by GSAP so React re-renders don't reset it */}
                      <span ref={doseNumRef} />
                      <span className="ml-1 font-sans text-[10px] tracking-[0.18em] uppercase text-bone/60">
                        mg of {formatMg(BLEND_TOTAL_MG)}
                      </span>
                    </span>
                  </div>
                  <div className="mt-3 h-px w-full bg-bone/15">
                    <div
                      ref={barRef}
                      className="h-full origin-left"
                      style={{
                        backgroundColor: stage.haloColor,
                        transform: "scaleX(0)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile deck */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          className="flex gap-[5vw] overflow-x-auto snap-x snap-mandatory px-[9vw] pt-2 pb-1 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {INSIDE_INGREDIENTS.map((ing, i) => (
            <article
              key={ing.id}
              className="w-[82vw] shrink-0 snap-center rounded-[3px]"
              style={{
                backgroundColor: "rgba(239,237,230,0.05)",
                border: "1px solid rgba(239,237,230,0.14)",
                padding: "18px 18px 22px",
              }}
            >
              <div className="flex items-baseline justify-between">
                <h3
                  ref={(el) => {
                    titleRefs.current[i] = el;
                  }}
                  className="font-wordmark text-bone uppercase leading-none overflow-hidden"
                  style={{
                    opacity: 0,
                    fontSize: "clamp(24px, 7vw, 32px)",
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {ing.pillLabel.split("").map((ch, ci) => (
                    <span
                      key={`${ch}-${ci}`}
                      data-char
                      className="inline-block"
                      style={{ whiteSpace: ch === " " ? "pre" : undefined }}
                    >
                      {ch}
                    </span>
                  ))}
                </h3>
                <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-bone/60">
                  {ing.counter}
                </span>
              </div>
              <p
                data-deck-item
                className="mt-2 font-serif italic text-bone/60"
                style={{ fontSize: 14, opacity: 0 }}
              >
                {ing.scientificName}
              </p>
              <p
                data-deck-item
                className="mt-3 text-bone"
                style={{ fontSize: 15, lineHeight: 1.6, opacity: 0 }}
              >
                {ing.description}
              </p>
              <div
                data-deck-item
                style={{ opacity: 0 }}
                className="mt-5 flex flex-col"
              >
                <div className="flex items-baseline justify-between border-t border-bone/15 pt-3">
                  <span className="font-sans text-[10px] tracking-[0.24em] uppercase text-bone/60">
                    Source
                  </span>
                  <span className="font-sans text-[13px] text-bone">
                    {ing.source}
                  </span>
                </div>
                <div className="mt-3 flex items-baseline justify-between border-t border-bone/15 pt-3">
                  <span className="font-sans text-[10px] tracking-[0.24em] uppercase text-bone/60">
                    Role
                  </span>
                  <span className="font-sans text-[13px] text-bone">
                    {ing.role}
                  </span>
                </div>
                <div className="mt-3 border-t border-bone/15 pt-3">
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-[10px] tracking-[0.24em] uppercase text-bone/60">
                      Dose
                    </span>
                    <span className="font-display tabular-nums text-bone text-[16px] leading-none">
                      {ing.dosageMg}
                      <span className="ml-1 font-sans text-[10px] tracking-[0.18em] uppercase text-bone/60">
                        mg of {formatMg(BLEND_TOTAL_MG)}
                      </span>
                    </span>
                  </div>
                  <div className="mt-3 h-px w-full bg-bone/15">
                    <div
                      className="h-full origin-left"
                      style={{
                        backgroundColor: ing.haloColor,
                        transform: `scaleX(${ing.dosageMg / BLEND_TOTAL_MG})`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="flex items-center justify-center gap-7 pt-5">
          {INSIDE_INGREDIENTS.map((ing, i) => (
            <button
              key={ing.id}
              type="button"
              aria-label={`Go to ${ing.pillLabel}`}
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
              className="font-sans text-[12px] tracking-[0.18em] uppercase tabular-nums transition-colors duration-300"
              style={{
                color:
                  i === activeIndex
                    ? "var(--color-bone)"
                    : "rgba(239,237,230,0.35)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>

      {/* Footer tagline */}
      <div className="shrink-0 mt-8 md:mt-0 pt-2 md:pt-0 pb-8 md:pb-[clamp(40px,5vh,80px)] z-20 text-center pointer-events-none">
        <div
          className="font-sans uppercase text-bone/60 text-[11px] md:text-[13px]"
          style={{ fontWeight: 500, letterSpacing: "0.4em" }}
        >
          FOUR FUNCTIONAL INPUTS. CLINICAL DOSES. NOTHING ELSE.
        </div>
      </div>
    </section>
  );
}
