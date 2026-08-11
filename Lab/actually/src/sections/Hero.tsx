import { useEffect, useRef, useState, type MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bloom } from "../components/Bloom";
import { LetterStack } from "../components/LetterStack";
import { Loader } from "../components/Loader";
import { ScrollHint } from "../components/ScrollHint";
import { ScrollIlluminate } from "../components/ScrollIlluminate";
import { ScrollReveal } from "../components/ScrollReveal";
import { TextReveal } from "../components/TextReveal";
import {
  Can3D,
  HeroContactShadow,
  StudioLights,
} from "../components/can/Can3D";
import { canvasDpr, useIsMobile } from "../lib/hooks";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

const CLEAR = "#bcd3d8";
const BLEND = 1150;

type Follow = { x: number; y: number; active: boolean };

type ClipK = {
  x: number;
  y: number;
  entrance: number;
  swell: number;
  breath: number;
  scrollBoost: number;
  hasPointer: boolean;
};

function HeroCanvas({
  startEntrance,
  pointerRotYRef,
  pointerFollowRef,
  lockBlendRef,
  dollyRef,
  scrollEl,
  // STILL hero sits ~2.2–2.3 world units; 2.5 read large vs ACTUALLY. wordmark
  targetHeight = 2.2,
  onDragStart,
  dprCap = 1.5,
}: {
  startEntrance: boolean;
  pointerRotYRef: MutableRefObject<number | null>;
  pointerFollowRef: MutableRefObject<Follow | null>;
  lockBlendRef: MutableRefObject<number | null>;
  dollyRef: MutableRefObject<number | null>;
  scrollEl: HTMLElement | null;
  targetHeight?: number;
  onDragStart?: () => void;
  dprCap?: number;
}) {
  const base = canvasDpr();
  const dpr: [number, number] = [base[0], Math.min(base[1], dprCap)];

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      camera={{ position: [0, 0.3, 8.0], fov: 26 }}
      className="!absolute !inset-0"
      style={{ pointerEvents: "auto" }}
    >
      <StudioLights />
      <Can3D
        skuNumber="01"
        heroMotion
        startEntrance={startEntrance}
        scrollTriggerEl={scrollEl}
        pointerRotYRef={pointerRotYRef}
        pointerFollowRef={pointerFollowRef}
        lockBlendRef={lockBlendRef}
        dollyRef={dollyRef}
        targetHeight={targetHeight}
        onDragStart={onDragStart}
      />
      <HeroContactShadow />
    </Canvas>
  );
}

/**
 * #hero — pin +=120% desktop, circle clip wipe, Can3D, support copy.
 * Brand: ACTUALLY. only (Still → ACTUALLY).
 */
export function Hero() {
  const mobile = useIsMobile();
  const [revealed, setRevealed] = useState(false);
  const [dragged, setDragged] = useState(false);
  const [sectionEl, setSectionEl] = useState<HTMLElement | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const haloWrapRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const boneRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const bloomParallaxRef = useRef<HTMLDivElement>(null);

  const clipK = useRef<ClipK>({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? 0.48 * window.innerHeight : 0,
    entrance: 0,
    swell: 0,
    breath: 0,
    scrollBoost: 0,
    hasPointer: false,
  });

  const pointerRotY = useRef<number | null>(0);
  const pointerFollow = useRef<Follow | null>({ x: 0, y: 0, active: false });
  const lockBlend = useRef<number | null>(0);
  const dolly = useRef<number | null>(0);
  const rotHold = useRef(0);
  const rotLocked = useRef(false);

  // Clip-path + pointer + breath (desktop fine pointer)
  useEffect(() => {
    if (!revealed || mobile || !window.matchMedia("(pointer: fine)").matches)
      return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const k = clipK.current;
    k.x = window.innerWidth / 2;
    k.y = 0.48 * window.innerHeight;

    const ctx = gsap.context(() => {
      const qx = gsap.quickTo(k, "x", { duration: 0.62, ease: "power2.out" });
      const qy = gsap.quickTo(k, "y", { duration: 0.62, ease: "power2.out" });
      gsap.to(k, {
        breath: 9,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      let lx = 0;
      let ly = 0;
      let lt = 0;
      const decay = gsap
        .delayedCall(0.3, () => {
          gsap.to(k, {
            swell: 0,
            duration: 1.1,
            ease: "power2.out",
            overwrite: "auto",
          });
        })
        .pause();

      const U = Math.PI * 0.7;

      const onMove = (o: PointerEvent) => {
        const u = performance.now();
        if (!k.hasPointer) {
          k.hasPointer = true;
          lx = o.clientX;
          ly = o.clientY;
          lt = u;
        }
        qx(o.clientX);
        qy(o.clientY);
        const c = Math.max(u - lt, 1);
        const h = Math.min(
          130,
          (Math.hypot(o.clientX - lx, o.clientY - ly) / c) *
            (1000 / 2200) *
            130,
        );
        if (h > k.swell + 1) {
          gsap.to(k, {
            swell: h,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
        decay.restart(true);
        lx = o.clientX;
        ly = o.clientY;
        lt = u;
        if (!reduce) {
          pointerRotY.current = (o.clientX / window.innerWidth - 0.5) * U;
          rotLocked.current = false;
        }
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const haloOff = { x: 0, y: 0 };

      const tick = () => {
        const clip = clipRef.current;
        if (!clip) return;
        const i = lockBlend.current ?? 0;

        if (i > 0.98 && !rotLocked.current) {
          rotLocked.current = true;
          k.hasPointer = false;
          qx(window.innerWidth / 2);
          qy(0.48 * window.innerHeight);
        }

        const follow = pointerFollow.current!;
        if (!rotLocked.current && i < 0.999) {
          const e = Math.max(
            -1,
            Math.min(1, (k.x / window.innerWidth) * 2 - 1),
          );
          const t = Math.max(
            -1,
            Math.min(1, -((k.y / window.innerHeight) * 2 - 1)),
          );
          const r = (1 - Math.min(i / 0.6, 1)) ** 3;
          follow.x = e * r;
          follow.y = t * r;
          follow.active = true;
        } else {
          follow.active = false;
        }

        if (i < 0.3 && !rotLocked.current) {
          rotHold.current =
            Math.round((pointerRotY.current ?? 0) / (2 * Math.PI)) *
            Math.PI *
            2;
        }
        const l = (1 - Math.min(i / 0.6, 1)) ** 3;
        if (pointerRotY.current != null) {
          pointerRotY.current = !rotLocked.current
            ? (pointerRotY.current as number) * l + rotHold.current * (1 - l)
            : rotHold.current;
        }

        const bloomEl = bloomParallaxRef.current;
        if (bloomEl) {
          const e = (1 - Math.min(i / 0.6, 1)) ** 3;
          const t = (k.x - window.innerWidth / 2) * 0.85 * e;
          const r = (k.y - window.innerHeight / 2) * 0.85 * e;
          haloOff.x += (t - haloOff.x) * 0.06;
          haloOff.y += (r - haloOff.y) * 0.06;
          bloomEl.style.transform = `translate3d(${haloOff.x}px, ${haloOff.y}px, 0)`;
        }

        const d = Math.max(
          0,
          170 * k.entrance + k.swell + k.breath * k.entrance + k.scrollBoost,
        );
        clip.style.clipPath = `circle(${d.toFixed(1)}px at ${k.x.toFixed(1)}px ${k.y.toFixed(1)}px)`;

        const ring = ringRef.current;
        if (ring) {
          const e = d / 170;
          const t =
            k.entrance * Math.max(0, Math.min(1, 1 - k.scrollBoost / 240));
          ring.style.transform = `translate3d(${k.x}px, ${k.y}px, 0) translate(-50%, -50%) scale(${e.toFixed(3)})`;
          ring.style.opacity = t.toFixed(3);
        }
      };

      gsap.ticker.add(tick);
      return () => {
        window.removeEventListener("pointermove", onMove);
        gsap.ticker.remove(tick);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [revealed, mobile]);

  // entrance 1.2 delay .15
  useEffect(() => {
    if (!revealed || mobile) return;
    const e = gsap.to(clipK.current, {
      entrance: 1,
      duration: 1.2,
      delay: 0.15,
      ease: "power2.inOut",
    });
    return () => {
      e.kill();
    };
  }, [revealed, mobile]);

  // pin + scrub timeline
  useEffect(() => {
    if (
      !revealed ||
      mobile ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const section = sectionRef.current;
    const support = supportRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = support
        ? support.querySelectorAll("[data-support-item]")
        : null;
      if (items) gsap.set(items, { y: 26, opacity: 0 });
      const rule = support?.querySelector(
        "[data-support-rule]",
      ) as HTMLElement | null;
      if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

      const k = clipK.current;
      const main = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%",
          pin: true,
          pinSpacing: true,
          scrub: true,
          invalidateOnRefresh: true,
          refreshPriority: 3,
        },
      });

      main.to(
        k,
        {
          scrollBoost: () =>
            1.2 * Math.hypot(window.innerWidth, window.innerHeight),
          ease: "power2.in",
          duration: 0.55,
        },
        0,
      );
      main.to(
        {},
        {
          duration: 0.6,
          ease: "power1.inOut",
          onUpdate: function () {
            lockBlend.current = this.progress();
          },
        },
        0,
      );
      if (boneRef.current) {
        main.to(
          boneRef.current,
          { opacity: 0, ease: "none", duration: 0.15 },
          0.48,
        );
      }
      if (haloWrapRef.current) {
        main.to(
          haloWrapRef.current,
          { scale: 1.09, duration: 1, ease: "none" },
          0,
        );
      }
      main.to(
        {},
        {
          duration: 1,
          ease: "none",
          onUpdate: function () {
            dolly.current = 0.09 * this.progress();
          },
        },
        0,
      );
      if (hintRef.current) {
        main.to(
          hintRef.current,
          { opacity: 0, duration: 0.15, ease: "power1.out" },
          0,
        );
      }

      const supportTl = gsap.timeline({ paused: true });
      if (items && items.length) {
        supportTl.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
        });
      }
      if (rule) supportTl.to(rule, { scaleX: 1, duration: 0.5 }, 0.2);

      let shown = false;
      main.eventCallback("onUpdate", () => {
        const p = main.progress();
        lockBlend.current = p;
        if (!shown && p > 0.58) {
          shown = true;
          supportTl.restart();
        }
        if (shown && p < 0.35) {
          shown = false;
          if (support) {
            gsap.to(support, {
              opacity: 0,
              duration: 0.25,
              ease: "power1.out",
              overwrite: "auto",
              onComplete: () => {
                supportTl.pause(0);
                if (items) gsap.set(items, { y: 26, opacity: 0 });
                if (rule) gsap.set(rule, { scaleX: 0 });
                gsap.set(support, { opacity: 1 });
              },
            });
          }
        }
      });
    }, section);

    return () => ctx.revert();
  }, [revealed, mobile]);

  useEffect(() => {
    if (revealed) ScrollTrigger.refresh();
  }, [revealed]);

  return (
    <section
      ref={(el) => {
        sectionRef.current = el;
        if (el && el !== sectionEl) setSectionEl(el);
      }}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-ink"
    >
      <Loader onReveal={() => setRevealed(true)} assetsReady />

      <div
        ref={clipRef}
        className={`absolute inset-0 bg-ink ${mobile ? "" : "z-20"}`}
        style={mobile ? undefined : { clipPath: "circle(0px at 50% 48%)" }}
      >
        <div
          ref={haloWrapRef}
          className="absolute inset-0 will-change-transform"
        >
          <div
            ref={bloomParallaxRef}
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
          >
            <Bloom color={CLEAR} size="60vh" intensity="soft" />
          </div>
        </div>

        {!mobile && sectionEl && (
          <div className="absolute inset-0">
            <HeroCanvas
              startEntrance={revealed}
              pointerRotYRef={pointerRotY}
              pointerFollowRef={pointerFollow}
              lockBlendRef={lockBlend}
              dollyRef={dolly}
              scrollEl={sectionEl}
              dprCap={1.5}
            />
          </div>
        )}

        <div
          ref={supportRef}
          className="absolute inset-y-0 left-0 z-10 hidden md:flex flex-col justify-center pl-[clamp(24px,7vw,120px)] pointer-events-none"
          style={{ width: "min(100%, 34vw)" }}
        >
          <div
            data-support-item
            className="font-sans text-[12px] tracking-[0.2em] uppercase text-bone/60"
          >
            <span className="text-bone">01</span>
            <span className="mx-2 text-bone/40">/</span>
            The formula
          </div>
          <h2
            data-support-item
            className="mt-5 font-display font-[300] leading-[1.08] tracking-[-0.01em] text-bone"
            style={{ fontSize: "clamp(28px, 2.8vw, 44px)" }}
          >
            Sustained natural focus, without caffeine.
          </h2>
          <div
            data-support-rule
            className="mt-7 h-px w-[72px]"
            style={{ backgroundColor: CLEAR }}
          />
          <p
            data-support-item
            className="mt-7 text-[16px] leading-[1.65] text-bone/80 max-w-[42ch]"
          >
            A nootropic blend of four adaptogens at clinical doses. Brewed and
            canned in New York City, poured wherever the work is.
          </p>
          <div
            data-support-item
            className="mt-8 flex items-baseline gap-6 font-sans text-[13px] text-bone/60"
          >
            <span>
              <span className="font-display text-bone text-[17px] tabular-nums">
                {BLEND.toLocaleString()}
              </span>{" "}
              mg active blend
            </span>
            <span aria-hidden className="text-bone/40">
              ·
            </span>
            <span>
              <span className="font-display text-bone text-[17px] tabular-nums">
                0
              </span>{" "}
              mg caffeine
            </span>
          </div>
        </div>
      </div>

      {!mobile && (
        <div
          ref={boneRef}
          className="absolute inset-0 z-10 bg-bone pointer-events-none flex flex-col"
        >
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <h1
              className="font-wordmark font-[800] leading-[0.78] tracking-[-0.03em] whitespace-nowrap text-ink select-none"
              style={{ fontSize: "19vw" }}
            >
              <LetterStack
                text="ACTUALLY."
                ariaLabel="ACTUALLY."
                stagger={0.05}
                duration={0.9}
                yOffset={60}
                highlightChar="."
                highlightColor={CLEAR}
                play={revealed}
                instant
              />
            </h1>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-[clamp(24px,4vw,64px)] pb-[clamp(20px,4vh,44px)]">
            <p
              className="font-display font-[300] text-ink leading-[1.15] tracking-[-0.01em]"
              style={{ fontSize: "clamp(17px,1.5vw,24px)" }}
            >
              Actually?
              <br />
              Really. Actually.
            </p>
            <div ref={hintRef}>
              <ScrollHint />
            </div>
            <p
              className="font-sans uppercase text-mist text-right"
              style={{
                fontSize: 11,
                letterSpacing: "0.24em",
                lineHeight: 1.8,
              }}
            >
              Nootropic, not caffeine
              <br />
              New York City, New York
            </p>
          </div>
        </div>
      )}

      {!mobile && (
        <div
          ref={ringRef}
          aria-hidden
          className="absolute top-0 left-0 z-30 pointer-events-none rounded-full"
          style={{
            width: 459,
            height: 459,
            background:
              "radial-gradient(circle, transparent 56%, rgba(26,27,29,0.10) 70%, transparent 84%)",
            opacity: 0,
            transform: "translate3d(-1000px, -1000px, 0)",
            willChange: "transform, opacity",
          }}
        />
      )}

      {mobile && (
        <div className="relative z-10 flex flex-col pt-[calc(var(--nav-h)+20px)]">
          <div className="px-5">
            <h1
              className="font-wordmark font-[800] leading-[0.82] tracking-[-0.03em] whitespace-nowrap text-bone"
              style={{ fontSize: "18vw" }}
            >
              <LetterStack
                text="ACTUALLY."
                ariaLabel="ACTUALLY."
                stagger={0.05}
                duration={0.9}
                yOffset={40}
                highlightChar="."
                highlightColor={CLEAR}
                play={revealed}
              />
            </h1>
            <p
              className="mt-4 font-display font-[300] leading-[1.1] text-bone"
              style={{ fontSize: 26 }}
            >
              Actually? Really. Actually.
            </p>
          </div>

          <div
            className="relative mt-2 h-[52vh]"
            style={{ touchAction: "pan-y" }}
          >
            <HeroCanvas
              startEntrance={revealed}
              pointerRotYRef={pointerRotY}
              pointerFollowRef={pointerFollow}
              lockBlendRef={lockBlend}
              dollyRef={dolly}
              scrollEl={null}
              targetHeight={2.3}
              onDragStart={() => setDragged(true)}
              dprCap={1.5}
            />
          </div>

          <div className="px-5 pb-10 flex items-end justify-between">
            <p
              className="font-sans uppercase text-bone/50"
              style={{ fontSize: 10, letterSpacing: "0.24em" }}
            >
              Nootropic, not caffeine
              <br />
              New York City, New York
            </p>
            <p
              aria-hidden
              className="font-sans uppercase text-bone/40 transition-opacity duration-700"
              style={{
                fontSize: 10,
                letterSpacing: "0.24em",
                opacity: dragged ? 0 : 1,
              }}
            >
              Drag to spin
            </p>
          </div>

          <div className="px-5 pb-20 pt-6">
            <ScrollReveal>
              <div className="font-sans text-[11px] tracking-[0.2em] uppercase text-bone/60">
                <span className="text-bone">01</span>
                <span className="mx-2 text-bone/40">/</span>
                The formula
              </div>
            </ScrollReveal>
            <TextReveal
              as="h2"
              split="lines"
              className="mt-5 font-display font-[300] leading-[1.12] tracking-[-0.01em] text-bone"
              style={{ fontSize: "clamp(27px, 7.6vw, 34px)" }}
            >
              Sustained natural focus, without caffeine.
            </TextReveal>
            <ScrollReveal delay={0.15}>
              <div
                className="mt-6 h-px w-[64px]"
                style={{ backgroundColor: CLEAR }}
              />
            </ScrollReveal>
            <ScrollIlluminate
              as="p"
              className="mt-6 text-[15px] leading-[1.65] text-bone max-w-[44ch]"
            >
              A nootropic blend of four adaptogens at clinical doses. Brewed and
              canned in New York City, poured wherever the work is.
            </ScrollIlluminate>
            <ScrollReveal delay={0.25}>
              <div className="mt-7 flex items-baseline gap-5 font-sans text-[12px] text-bone/60">
                <span>
                  <span className="font-display text-bone text-[16px] tabular-nums">
                    {BLEND.toLocaleString()}
                  </span>{" "}
                  mg active blend
                </span>
                <span aria-hidden className="text-bone/40">
                  ·
                </span>
                <span>
                  <span className="font-display text-bone text-[16px] tabular-nums">
                    0
                  </span>{" "}
                  mg caffeine
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}
    </section>
  );
}
