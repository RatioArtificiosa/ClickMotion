import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Natural pixel size of the stage plate (ny.png) */
const PLATE_W = 1920;
const PLATE_H = 1080;

/**
 * Gray street billboard on ny.png (inner content rect, not the white frame).
 * Measured from the plate gray fill; slight inset so video sits inside the bezel.
 */
const BILLBOARD = {
  left: 0.2521,
  top: 0.2630,
  width: 0.5026,
  height: 0.3870,
} as const;

/**
 * Pure Surreal film — no UI frames. Full length (~2m24s).
 * Production client HD: /assets/videos/studio-surreal-v1.mp4
 * Backgrounds source: this same pure file (small encode under backgrounds/).
 */
const VIDEO_SRC = "/assets/studio/surreal.mp4";
const PLATE_SRC = "/assets/studio/ny.png";

export type StudioSequenceProps = {
  /** Any public video path — full file plays end-to-end (never trimmed by scroll). */
  videoSrc?: string;
  plateSrc?: string;
  className?: string;
};

type CoverRect = { ox: number; oy: number; rw: number; rh: number };
type Box = { left: number; top: number; width: number; height: number };

function coverRect(cw: number, ch: number): CoverRect {
  const imgAspect = PLATE_W / PLATE_H;
  const boxAspect = cw / Math.max(ch, 1);
  let rw: number;
  let rh: number;
  if (boxAspect > imgAspect) {
    rw = cw;
    rh = cw / imgAspect;
  } else {
    rh = ch;
    rw = ch * imgAspect;
  }
  return {
    ox: (cw - rw) / 2,
    oy: (ch - rh) / 2,
    rw,
    rh,
  };
}

function billboardBox(cover: CoverRect): Box {
  return {
    left: cover.ox + BILLBOARD.left * cover.rw,
    top: cover.oy + BILLBOARD.top * cover.rh,
    width: BILLBOARD.width * cover.rw,
    height: BILLBOARD.height * cover.rh,
  };
}

function coverScale(bb: Box, cw: number, ch: number): number {
  const ox = bb.left + bb.width / 2;
  const oy = bb.top + bb.height / 2;
  const hw = Math.max(bb.width / 2, 1);
  const hh = Math.max(bb.height / 2, 1);
  const s = Math.max(
    ox / hw,
    (cw - ox) / hw,
    oy / hh,
    (ch - oy) / hh,
  );
  return s * 1.03;
}

function smootherstep(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/**
 * #studio-sequence — camera pan / pull-out (NOT a shrinking video rect)
 *
 * Dynamic video: pass `videoSrc` for any film. Scroll never seeks video time —
 * the full source length plays (loop). Appearance unlocked (no CSS grade).
 *
 * Lab: /lab/studio-sequence · Production: MS-SEC-STUDIO01
 */
export function StudioSequence({
  videoSrc = VIDEO_SRC,
  plateSrc = PLATE_SRC,
  className,
}: StudioSequenceProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const videoShellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const world = worldRef.current;
    const shell = videoShellRef.current;
    const video = videoRef.current;
    if (!section || !pin || !world || !shell || !video) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Full-length policy: film free-runs 0 → duration; scroll only scales world
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = "auto";
    try {
      if (video.currentTime > 0.05) video.currentTime = 0;
    } catch {
      /* metadata not ready */
    }

    const tryPlay = () => {
      const p = video.play();
      if (p) p.catch(() => {});
    };
    tryPlay();
    video.addEventListener("loadeddata", tryPlay);

    const state = {
      startScale: 1,
      ox: 0,
      oy: 0,
      bb: { left: 0, top: 0, width: 0, height: 0 } as Box,
      cw: 0,
      ch: 0,
    };

    const measure = () => {
      const { width: cw, height: ch } = pin.getBoundingClientRect();
      if (cw < 2 || ch < 2) return null;

      const cover = coverRect(cw, ch);
      const bb = billboardBox(cover);

      gsap.set(shell, {
        left: bb.left,
        top: bb.top,
        width: bb.width,
        height: bb.height,
      });

      const ox = bb.left + bb.width / 2;
      const oy = bb.top + bb.height / 2;
      gsap.set(world, {
        transformOrigin: `${ox}px ${oy}px`,
        force3D: true,
      });

      const startScale = coverScale(bb, cw, ch);

      state.startScale = startScale;
      state.ox = ox;
      state.oy = oy;
      state.bb = bb;
      state.cw = cw;
      state.ch = ch;

      return { cw, ch, bb, ox, oy, startScale };
    };

    const applyProgress = (p: number) => {
      let t: number;
      if (p < 0.06) t = 0;
      else if (p > 0.9) t = 1;
      else t = (p - 0.06) / (0.9 - 0.06);
      t = smootherstep(t);

      const scale = state.startScale + (1 - state.startScale) * t;
      gsap.set(world, { scale, x: 0, y: 0 });
    };

    const ctx = gsap.context(() => {
      const m0 = measure();
      if (!m0) return;

      if (reduce) {
        gsap.set(world, { scale: 1, x: 0, y: 0 });
        return;
      }

      gsap.set(world, { scale: m0.startScale, x: 0, y: 0 });

      ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: "+=280%",
        pin: true,
        pinSpacing: true,
        scrub: 1.15,
        invalidateOnRefresh: true,
        onRefresh: () => {
          measure();
        },
        onUpdate: (self) => {
          applyProgress(self.progress);
        },
      });
    }, section);

    const onResize = () => {
      measure();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [videoSrc, plateSrc]);

  return (
    <section
      ref={sectionRef}
      id="studio-sequence"
      className={["relative w-full bg-black text-white", className]
        .filter(Boolean)
        .join(" ")}
      aria-label="Studio cinematic — camera pull-out from manifesto to street billboard"
      data-video-full-length="true"
    >
      <div
        ref={pinRef}
        className="relative flex h-dvh w-full flex-col overflow-hidden bg-black"
      >
        <div
          ref={worldRef}
          className="absolute inset-0 will-change-transform"
          style={{ transformOrigin: "50% 30%" }}
        >
          <img
            src={plateSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          <div
            ref={videoShellRef}
            className="absolute z-[2] overflow-hidden bg-black"
            style={{
              left: `${BILLBOARD.left * 100}%`,
              top: `${BILLBOARD.top * 100}%`,
              width: `${BILLBOARD.width * 100}%`,
              height: `${BILLBOARD.height * 100}%`,
            }}
          >
            <video
              key={videoSrc}
              ref={videoRef}
              src={videoSrc}
              className="h-full w-full object-cover"
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              controls={false}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.35)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 28%, transparent 72%, rgba(0,0,0,0.18) 100%)",
              }}
            />
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      </div>
    </section>
  );
}
