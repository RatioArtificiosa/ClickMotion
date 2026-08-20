"use client";

/**
 * STUDIO SEQUENCE - cinematic camera pull-out (MS-SEC-STUDIO01).
 *
 * No Scroller (pin-until-complete). Not PSAVE: the film free-plays.
 * Scroll aims the camera only. Video time is independent.
 * One world layer: street plate + film locked to the billboard rect.
 * Progress 0: full-bleed film. Progress 1: living street billboard.
 *
 * Wheel / trackpad / touch / keys aim virtual progress on
 * 3 viewports mobile / 4 desktop. Camera follows that progress 1:1.
 * At 0+up or 1+down the pin releases. After release at the end,
 * the PAGE owns the wheel until the stage docks (top >= -2).
 * Pointer on the next sibling never drives the camera.
 */

import { useEffect, useMemo, useRef } from "react";
import {
  STUDIO_DEFAULTS,
  type BillboardRect,
  type StudioSequenceProps,
} from "./studio-data";

type CoverRect = { ox: number; oy: number; rw: number; rh: number };
type Box = { left: number; top: number; width: number; height: number };

function clamp01(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

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
 * (four-edge cover - works when the board is off-center on the plate).
 */
function coverScale(box: Box, cw: number, ch: number): number {
  const ox = box.left + box.width / 2;
  const oy = box.top + box.height / 2;
  const hw = Math.max(box.width / 2, 1);
  const hh = Math.max(box.height / 2, 1);
  const s = Math.max(ox / hw, (cw - ox) / hw, oy / hh, (ch - oy) / hh);
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
  const destRef = useRef(0);
  const progressRef = useRef(0);
  const pageOwnsRef = useRef(false);
  const touchYRef = useRef<number | null>(null);

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

    video.muted = cfg.video.muted;
    video.playsInline = true;
    video.loop = cfg.video.loop;
    video.preload = cfg.video.preload;
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
    const onStalled = () => tryPlay();
    video.addEventListener("stalled", onStalled);
    video.addEventListener("suspend", onStalled);

    const state = {
      startScale: 1,
      ox: 0,
      oy: 0,
    };

    const measure = () => {
      const { width: cw, height: ch } = pin.getBoundingClientRect();
      if (cw < 2 || ch < 2) return null;

      const cover = coverRect(cw, ch, cfg.plateWidth, cfg.plateHeight);
      const bb = billboardBox(cover, cfg.billboard);

      shell.style.left = `${bb.left}px`;
      shell.style.top = `${bb.top}px`;
      shell.style.width = `${bb.width}px`;
      shell.style.height = `${bb.height}px`;

      const ox = bb.left + bb.width / 2;
      const oy = bb.top + bb.height / 2;
      world.style.transformOrigin = `${ox}px ${oy}px`;

      const startScale = coverScale(bb, cw, ch);
      state.startScale = startScale;
      state.ox = ox;
      state.oy = oy;
      return { startScale };
    };

    const applyVisual = (g: number) => {
      const p = clamp01(g);
      progressRef.current = p;
      destRef.current = p;
      const hi = cfg.holdIn;
      const ho = cfg.holdOut;
      let t: number;
      if (p < hi) t = 0;
      else if (p > ho) t = 1;
      else t = (p - hi) / (ho - hi);
      t = smootherstep(t);
      const scale = state.startScale + (1 - state.startScale) * t;
      world.style.transform = `translate3d(0,0,0) scale(${scale})`;
    };

    const attachCapture = (pageOwnsFn: () => boolean) => {
      const api = {
        setProgress: (p: number) => applyVisual(p),
        getProgress: () => progressRef.current,
        getTarget: () => destRef.current,
        pageOwns: pageOwnsFn,
        productId: "MS-SEC-STUDIO01",
      };
      const w = window as Window & { __msScrollNarrative?: typeof api };
      w.__msScrollNarrative = api;
      return () => {
        if (w.__msScrollNarrative === api) delete w.__msScrollNarrative;
      };
    };

    const setPageOwns = (owns: boolean) => {
      pageOwnsRef.current = owns;
      section.dataset.studioOwns = owns ? "page" : "pin";
    };
    setPageOwns(false);
    section.dataset.studioDrive = "pin";
    section.dataset.product = "MS-SEC-STUDIO01";

    measure();

    if (reduce) {
      world.style.transform = "translate3d(0,0,0) scale(1)";
      const detach = attachCapture(() => false);
      return () => {
        video.removeEventListener("loadeddata", tryPlay);
        video.removeEventListener("stalled", onStalled);
        video.removeEventListener("suspend", onStalled);
        detach();
      };
    }

    applyVisual(0);

    const virtualDistance = () => {
      const vh = window.innerWidth < 768
        ? cfg.virtualViewportsMobile
        : cfg.virtualViewportsDesktop;
      return vh * (window.innerHeight || 800);
    };

    const sectionInView = () => {
      const r = section.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      return r.top < mid && r.bottom > mid * 0.35;
    };

    const pinDocked = () => section.getBoundingClientRect().top >= -2;
    const journeyAtEnd = () => destRef.current >= 0.9995;

    const eventOnStage = (e: Event) => {
      if (e.target instanceof Node && section.contains(e.target)) return true;
      if (e instanceof WheelEvent) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el && section.contains(el)) return true;
      }
      return false;
    };

    const touchOnStage = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0];
      if (!t) return false;
      if (e.target instanceof Node && section.contains(e.target)) return true;
      const el = document.elementFromPoint(t.clientX, t.clientY);
      return Boolean(el && section.contains(el));
    };

    const applyDelta = (deltaPx: number) => {
      if (!deltaPx || !Number.isFinite(deltaPx)) return false;
      const p = destRef.current;
      if (p <= 0.0005 && deltaPx < 0) return false;
      if (p >= 0.9995 && deltaPx > 0) return false;
      applyVisual(p + deltaPx / virtualDistance());
      return true;
    };

    const detachCapture = attachCapture(() => pageOwnsRef.current);

    const onWheel = (e: WheelEvent) => {
      if (pinDocked()) setPageOwns(false);
      if (pageOwnsRef.current) return;
      if (!sectionInView()) return;
      if (!eventOnStage(e)) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaY) < 1) {
        return;
      }
      const consumed = applyDelta(e.deltaY);
      if (!consumed && journeyAtEnd() && e.deltaY > 0) setPageOwns(true);
      if (consumed) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (pinDocked()) setPageOwns(false);
      if (pageOwnsRef.current || !sectionInView() || e.touches.length !== 1) {
        return;
      }
      if (!touchOnStage(e)) return;
      touchYRef.current = e.touches[0]!.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (pinDocked()) setPageOwns(false);
      if (pageOwnsRef.current || !sectionInView() || e.touches.length !== 1) {
        return;
      }
      if (!touchOnStage(e)) return;
      const y = e.touches[0]!.clientY;
      const prev = touchYRef.current;
      touchYRef.current = y;
      if (prev == null) return;
      const consumed = applyDelta(prev - y);
      if (!consumed && journeyAtEnd() && prev - y > 0) setPageOwns(true);
      if (consumed) e.preventDefault();
    };

    const onTouchEnd = () => {
      touchYRef.current = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (pinDocked()) setPageOwns(false);
      if (pageOwnsRef.current || !sectionInView()) return;
      const el = e.target as HTMLElement | null;
      if (
        el &&
        el.closest(
          "a, button, input, textarea, select, [contenteditable='true']",
        )
      ) {
        return;
      }
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
      if (!consumed && journeyAtEnd() && delta > 0) setPageOwns(true);
      if (consumed) e.preventDefault();
    };

    const onResize = () => {
      const p = destRef.current;
      measure();
      applyVisual(p);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("stalled", onStalled);
      video.removeEventListener("suspend", onStalled);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      detachCapture();
    };
  }, [
    cfg.videoSrc,
    cfg.plateSrc,
    cfg.plateWidth,
    cfg.plateHeight,
    cfg.virtualViewportsDesktop,
    cfg.virtualViewportsMobile,
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
      data-studio-drive="pin"
      data-product="MS-SEC-STUDIO01"
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
              controls={false}
              disablePictureInPicture
              style={
                cfg.video.cssFilter
                  ? { filter: cfg.video.cssFilter }
                  : undefined
              }
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

export default StudioSequence;
