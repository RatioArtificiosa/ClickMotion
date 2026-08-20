"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PHOBIA_ITEMS, PHOBIA_PARAMS } from "./phobia-data";

/**
 * Phobia — black void, forms that evade the pointer.
 *
 * Motion law:
 * - CSS rest pose; GSAP x/y are offsets from that rest.
 * - Distance is mouse → rest center (not the live offset position).
 * - Inside influenceRadius of rest → radial flee (power4.out 0.45s).
 * - Else → elastic home x:0 y:0 (1.2s, elastic.out(1, 0.35)).
 * - Idle / pointer outside section: treat pointer as viewport center so
 *   objects spread outward into the open composition.
 */
export default function PhobiaSection() {
  const rootRef = useRef<HTMLElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const layer = layerRef.current;
    const cursor = cursorRef.current;
    const trailRoot = trailRef.current;
    if (!root || !layer || !cursor || !trailRoot) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const objects = Array.from(
      layer.querySelectorAll<HTMLElement>("[data-phobia]"),
    );

    // Cache base rotation from data
    for (const el of objects) {
      if (el.dataset.baseRot === undefined) {
        const fromItem = PHOBIA_ITEMS.find((i) => i.id === el.dataset.phobia);
        el.dataset.baseRot = String(fromItem?.rot ?? 0);
        gsap.set(el, {
          x: 0,
          y: 0,
          rotation: fromItem?.rot ?? 0,
          scale: 1,
          transformOrigin: "50% 50%",
          force3D: true,
        });
      }
    }

    const baseRot = (el: HTMLElement) =>
      parseFloat(el.dataset.baseRot || "0") || 0;

    /** Rest-center in viewport coords — subtract current GSAP offset */
    const restCenter = (el: HTMLElement) => {
      const ox = Number(gsap.getProperty(el, "x")) || 0;
      const oy = Number(gsap.getProperty(el, "y")) || 0;
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - ox,
        y: r.top + r.height / 2 - oy,
      };
    };

    const dist = (ax: number, ay: number, bx: number, by: number) =>
      Math.hypot(bx - ax, by - ay);

    const angle = (fromX: number, fromY: number, toX: number, toY: number) =>
      Math.atan2(toY - fromY, toX - fromX);

    const params = () =>
      window.matchMedia("(max-width: 767px)").matches
        ? { ...PHOBIA_PARAMS.mobile }
        : { ...PHOBIA_PARAMS.desktop };

    /** Apply evade / return for current mouse (viewport coords). */
    const apply = (mx: number, my: number) => {
      if (reduce) return;
      const {
        influenceRadius: R,
        maxDistance: maxD,
        rotForce,
        scaleForce,
      } = params();

      for (const el of objects) {
        const home = restCenter(el);
        const d = dist(mx, my, home.x, home.y);
        const w = baseRot(el);

        if (d < R) {
          // Angle from rest center → mouse; flee opposite direction
          const theta = angle(home.x, home.y, mx, my);
          const L = Math.pow((R - d) / R, 1.6);
          const U = L * maxD;
          const rot = w - Math.cos(theta) * L * rotForce;
          gsap.to(el, {
            x: -Math.cos(theta) * U,
            y: -Math.sin(theta) * U,
            rotation: rot,
            scale: 1 + L * scaleForce,
            duration: 0.45,
            ease: "power4.out",
            overwrite: "auto",
          });
        } else {
          // Clear of rest bubble → elastic home
          gsap.to(el, {
            x: 0,
            y: 0,
            rotation: w,
            scale: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.35)",
            overwrite: "auto",
          });
        }
      }
    };

    /** When pointer is outside the section, use viewport center so objects spread. */
    const centerPointer = () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    let pointerInside = false;
    const pointer = centerPointer();

    // ── Premium white-glow cursor + trail ─────────────────────────
    const TRAIL_N = 10;
    const trailEls = Array.from(
      trailRoot.querySelectorAll<HTMLElement>("[data-trail]"),
    );
    const trailPts = Array.from({ length: TRAIL_N }, () => ({
      x: -9999,
      y: -9999,
    }));
    let curX = -9999;
    let curY = -9999;
    let targetX = -9999;
    let targetY = -9999;
    let cursorRaf = 0;
    let lastMoveT = 0;
    let vel = 0;

    const setCursorVisible = (on: boolean) => {
      gsap.to(cursor, {
        opacity: on ? 1 : 0,
        duration: on ? 0.25 : 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(trailRoot, {
        opacity: on ? 1 : 0,
        duration: on ? 0.2 : 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const placeCursor = (lx: number, ly: number, scale = 1) => {
      cursor.style.transform = `translate3d(${lx}px, ${ly}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const tickCursor = () => {
      // Head eases slightly for liquid feel; trail lags harder
      curX += (targetX - curX) * 0.42;
      curY += (targetY - curY) * 0.42;

      const speedBoost = Math.min(1.18, 1 + vel * 0.0025);
      placeCursor(curX, curY, speedBoost);

      // Ribbon of fading orbs
      let px = curX;
      let py = curY;
      for (let i = 0; i < TRAIL_N; i++) {
        const t = trailPts[i];
        // increasing lag per segment
        const lag = 0.22 - i * 0.012;
        t.x += (px - t.x) * Math.max(0.08, lag);
        t.y += (py - t.y) * Math.max(0.08, lag);
        px = t.x;
        py = t.y;
        const el = trailEls[i];
        if (!el) continue;
        const k = 1 - i / TRAIL_N;
        const s = 0.35 + k * 0.75;
        const o = 0.08 + k * 0.55;
        el.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) translate(-50%, -50%) scale(${s})`;
        el.style.opacity = String(pointerInside ? o * Math.min(1, 0.35 + vel * 0.008) : 0);
      }

      // decay velocity when idle
      vel *= 0.92;
      cursorRaf = requestAnimationFrame(tickCursor);
    };
    cursorRaf = requestAnimationFrame(tickCursor);

    const onMove = (e: PointerEvent) => {
      pointerInside = true;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      const rect = root.getBoundingClientRect();
      const lx = e.clientX - rect.left;
      const ly = e.clientY - rect.top;

      const now = performance.now();
      const dt = Math.max(8, now - lastMoveT);
      if (lastMoveT > 0) {
        const dx = lx - targetX;
        const dy = ly - targetY;
        vel = Math.hypot(dx, dy) / (dt / 16);
      }
      lastMoveT = now;
      targetX = lx;
      targetY = ly;

      if (curX < -9000) {
        curX = lx;
        curY = ly;
        for (const t of trailPts) {
          t.x = lx;
          t.y = ly;
        }
      }

      setCursorVisible(true);
      apply(pointer.x, pointer.y);
    };

    const onLeave = () => {
      pointerInside = false;
      setCursorVisible(false);
      // Pointer left: re-apply with viewport center → objects spread outward
      const c = centerPointer();
      pointer.x = c.x;
      pointer.y = c.y;
      apply(c.x, c.y);
    };

    // Also catch leaving the document (mouse out of browser chrome)
    const onDocLeave = (e: MouseEvent) => {
      if (e.relatedTarget == null) onLeave();
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerenter", onMove);
    document.documentElement.addEventListener("mouseleave", onDocLeave);

    // Initial state: no pointer → spread from center
    requestAnimationFrame(() => {
      if (!pointerInside) {
        const c = centerPointer();
        apply(c.x, c.y);
      }
    });

    return () => {
      cancelAnimationFrame(cursorRaf);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
      document.documentElement.removeEventListener("mouseleave", onDocLeave);
      gsap.killTweensOf(objects);
      gsap.killTweensOf(cursor);
      gsap.killTweensOf(trailRoot);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="phobia-section" data-demo-root
      className="relative h-dvh w-full overflow-hidden bg-black touch-none"
      aria-label="Floating forms that evade the cursor"
      style={{ cursor: "none" }}
    >
      {/* Stage — absolute rest poses; GSAP x/y are offsets on top */}
      <div
        ref={layerRef}
        className="absolute left-1/2 top-1/2 h-[min(100%,1056px)] w-[min(100%,1872px)] -translate-x-1/2 -translate-y-1/2"
      >
        {PHOBIA_ITEMS.map((item) => {
          if (item.letter) {
            return (
              <span
                key={item.id}
                data-phobia={item.id}
                className="pointer-events-none absolute select-none font-medium text-white will-change-transform"
                style={{
                  left: `${item.left}%`,
                  top: `${item.top}%`,
                  fontSize: `clamp(14px, ${item.width * 1.4}vw, 52px)`,
                  zIndex: item.z,
                  fontFamily:
                    '"Helvetica Neue", Helvetica, Arial, sans-serif',
                }}
                aria-hidden
              >
                {item.letter}
              </span>
            );
          }
          return (
            <img
              key={item.id}
              data-phobia={item.id}
              src={item.src}
              alt=""
              draggable={false}
              className="pointer-events-none absolute select-none object-contain will-change-transform"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                width: `${item.width}%`,
                zIndex: item.z,
              }}
            />
          );
        })}
      </div>

      {/* Trail ribbon — soft white ghosts lag behind the head */}
      <div
        ref={trailRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[49] opacity-0"
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            data-trail
            className="absolute left-0 top-0 will-change-transform"
            style={{
              width: 28 - i * 1.4,
              height: 28 - i * 1.4,
              marginLeft: 0,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(255,255,255,${0.45 - i * 0.03}) 0%, rgba(255,255,255,${0.12 - i * 0.008}) 40%, transparent 70%)`,
              filter: `blur(${2 + i * 0.35}px)`,
              mixBlendMode: "screen",
            }}
          />
        ))}
      </div>

      {/* Cursor head — crystalline white core + bloom */}
      <div
        ref={cursorRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-50 opacity-0 will-change-transform"
        style={{ width: 44, height: 44 }}
      >
        {/* Outer bloom */}
        <span
          className="absolute inset-[-120%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.08) 32%, transparent 68%)",
            filter: "blur(6px)",
            mixBlendMode: "screen",
          }}
        />
        {/* Mid halo */}
        <span
          className="absolute inset-[-40%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 38%, transparent 72%)",
            filter: "blur(2px)",
            mixBlendMode: "screen",
          }}
        />
        {/* Core pearl */}
        <span
          className="absolute left-1/2 top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #ffffff 0%, #f5f5f5 45%, #d8d8d8 100%)",
            boxShadow:
              "0 0 6px 2px rgba(255,255,255,0.95), 0 0 18px 6px rgba(255,255,255,0.45), 0 0 42px 14px rgba(255,255,255,0.18)",
          }}
        />
      </div>
    </section>
  );
}

