"use client";

/**
 * MS-SEC-STUDIO01 — Studio Sequence
 *
 * World-scale camera pull-out (NOT a free-floating shrinking video box):
 * - One WORLD layer: street plate + video locked into the billboard rect
 * - Scroll scrubs WORLD scale from startScale → 1 around billboard center
 * - Progress 0: billboard film covers the viewport (inside the shot)
 * - Progress 1: full street; same film still playing on the board
 *
 * Dynamic video: pass `videoSrc` (or edit studio-data.ts). Any aspect ratio
 * fills the billboard via object-fit: cover. Film always plays **full length**
 * end-to-end; scroll never seeks video time.
 */

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  STUDIO_DEFAULTS,
  type BillboardRect,
  type StudioSequenceProps,
} from "./studio-data";

gsap.registerPlugin(ScrollTrigger);

type CoverRect = { ox: number; oy: number; rw: number; rh: number };
type Box = { left: number; top: number; width: number; height: number };

function coverRect(
  cw: number,
  ch: number,
  plateW: number,
  plateH: number,
): CoverRect {
  const imgAspect = plateW / plateH;
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

function billboardBox(cover: CoverRect, bb: BillboardRect): Box {
  return {
    left: cover.ox + bb.left * cover.rw,
    top: cover.oy + bb.top * cover.rh,
    width: bb.width * cover.rw,
    height: bb.height * cover.rh,
  };
}

/**
 * Scale around billboard center so the shell covers the entire viewport
 * (four-edge cover — works when the board is off-center on the plate).
 */
function coverScale(box: Box, cw: number, ch: number): number {
  const ox = box.left + box.width / 2;
  const oy = box.top + box.height / 2;
  const hw = Math.max(box.width / 2, 1);
  const hh = Math.max(box.height / 2, 1);
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

export function StudioSequence(props: StudioSequenceProps = {}) {
  const cfg = useMemo(
    () => ({
      ...STUDIO_DEFAULTS,
      ...props,
      billboard: { ...STUDIO_DEFAULTS.billboard, ...props.billboard },
      video: { ...STUDIO_DEFAULTS.video, ...props.video },
    }),
    [props],
  );

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

    // ——— Full-length film policy ———
    // Scroll drives camera only. Video time is independent and plays the
    // entire source file. No currentTime seeks. No duration cuts.
    video.muted = cfg.video.muted;
    video.playsInline = true;
    video.loop = cfg.video.loop;
    video.preload = cfg.video.preload;
    // Ensure we start at the true beginning when src changes
    try {
      if (video.currentTime > 0.05) video.currentTime = 0;
    } catch {
      /* ignore seek before metadata */
    }

    const tryPlay = () => {
      const p = video.play();
      if (p) p.catch(() => {});
    };
    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    // If the browser stalled mid-file, resume — never jump to a trimmed window
    const onStalled = () => tryPlay();
    video.addEventListener("stalled", onStalled);
    video.addEventListener("suspend", onStalled);

    const state = {
      startScale: 1,
      bb: { left: 0, top: 0, width: 0, height: 0 } as Box,
      cw: 0,
      ch: 0,
    };

    const measure = () => {
      const { width: cw, height: ch } = pin.getBoundingClientRect();
      if (cw < 2 || ch < 2) return null;

      const cover = coverRect(cw, ch, cfg.plateWidth, cfg.plateHeight);
      const bb = billboardBox(cover, cfg.billboard);

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
      state.bb = bb;
      state.cw = cw;
      state.ch = ch;

      return { cw, ch, bb, ox, oy, startScale };
    };

    const applyProgress = (p: number) => {
      const hi = cfg.holdIn;
      const ho = cfg.holdOut;
      let t: number;
      if (p < hi) t = 0;
      else if (p > ho) t = 1;
      else t = (p - hi) / (ho - hi);
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
        end: cfg.pinEnd,
        pin: true,
        pinSpacing: true,
        scrub: cfg.scrub,
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
      video.removeEventListener("stalled", onStalled);
      video.removeEventListener("suspend", onStalled);
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [
    cfg.videoSrc,
    cfg.plateSrc,
    cfg.plateWidth,
    cfg.plateHeight,
    cfg.pinEnd,
    cfg.scrub,
    cfg.holdIn,
    cfg.holdOut,
    cfg.billboard.left,
    cfg.billboard.top,
    cfg.billboard.width,
    cfg.billboard.height,
    cfg.video.loop,
    cfg.video.muted,
    cfg.video.preload,
  ]);

  const bb = cfg.billboard;

  return (
    <section
      ref={sectionRef}
      id={cfg.sectionId}
      className={["relative w-full bg-black text-white", cfg.className]
        .filter(Boolean)
        .join(" ")}
      aria-label={cfg.ariaLabel}
      data-studio-sequence
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
            src={cfg.plateSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          <div
            ref={videoShellRef}
            className="absolute z-[2] overflow-hidden bg-black"
            style={{
              left: `${bb.left * 100}%`,
              top: `${bb.top * 100}%`,
              width: `${bb.width * 100}%`,
              height: `${bb.height * 100}%`,
            }}
          >
            <video
              key={cfg.videoSrc}
              ref={videoRef}
              src={cfg.videoSrc}
              poster={cfg.posterSrc}
              className="h-full w-full object-cover"
              muted={cfg.video.muted}
              loop={cfg.video.loop}
              playsInline
              autoPlay
              preload={cfg.video.preload}
              // Full-length policy: no controls, no media fragment (#t=)
              controls={false}
              disablePictureInPicture
              style={
                cfg.video.cssFilter
                  ? { filter: cfg.video.cssFilter }
                  : undefined
              }
            />
            {/* Subtle LED glass — structural, not a color grade on the film */}
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

export default StudioSequence;
