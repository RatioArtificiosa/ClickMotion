"use client";

/**
 * VERTEX SECURITY - Scroll-as-narrative cybersecurity hero (MS-HERO-VERT01)
 *
 * Mono asteroid / globe film. Art, chapters, and chrome unchanged.
 * Drive method is PSAVE. Film is a steady approach (rocks shed toward
 * the viewpoint) - Elyse-like even time, not a Revel slow-then-kick cut.
 *
 * PSAVE — Perfect Scroll Video Engine:
 *   Scroll aims a destination on a 3.6-viewport track (Elyse earn).
 *   Down-scroll plays the film forward (native play at 1.2x, eases out
 *   over the last half-second of leftover dest so a stop coasts).
 *   Up-scroll cancels any pending forward destination, then walks the
 *   live video backward one 3-frame step at a time. Never seek to the
 *   stop point. The walk starts while the gesture is still moving.
 *   Tiny opposite trackpad ticks are ignored so dest is not snapped dead.
 *   The picture never jumps a frame. Copy and the white bar follow the picture.
 *   Release only when the picture has arrived at 0 (up) or 1 (down).
 * Opening still: poster is the opening asteroid. Kick-seek still locks
 * a real decode so first scroll does not jump.
 */

import { useCallback, useEffect, useRef, useState } from "react";

/** Client HD only - never storefront preview burn */
const VIDEO_SRC = "/assets/videos/vertex-globe-web-v1.mp4";
const POSTER_SRC = "/assets/posters/vertex-globe-v1.webp";

/**
 * Elyse-like even film (steady asteroid approach). Start on the Elyse
 * earn track. 12.04s / 3.6 vh ≈ 3.34 film-seconds per viewport.
 * Old seek-scrub 3.2 + wheel gain 0.22 is banned. Operator-locked 2026-08-14.
 */
const VIRTUAL_VIEWPORTS = 3.6;

/** PSAVE catch-up: film-seconds per wall-second, both directions. */
const PSAVE_RATE = 1.2;

/** Never move the playhead more than one 24fps frame in a single forward tick. */
const PSAVE_FRAME = 1 / 24;

/**
 * Reverse law: the playhead may recede by exactly this much per seek.
 * Never assign currentTime to the destination. A 3-frame stride is the
 * only legal reverse step, during the gesture and after it.
 */
const PSAVE_REV_STRIDE = 3;
const PSAVE_REV_STEP = PSAVE_FRAME * PSAVE_REV_STRIDE;

/** Up/down events inside this window mean the person is still scrolling. */
const PSAVE_LIVE_MS = 220;

/**
 * After the last real intent, dest must sit at least this many film-seconds
 * ahead (down) or behind (up). Leftover dest is the Elyse lift.
 */
const PSAVE_COAST_SEC = 0.55;

/** Forward catch-up eases over this many leftover film-seconds. */
const PSAVE_EASE_SEC = 0.55;

/**
 * Trackpad end-of-gesture often fires a tiny opposite delta. Ignore
 * those ticks so dest is not snapped dead.
 */
const PSAVE_FLIP_DEADZONE_PX = 32;

const NAV = ["Platform", "Threat Intel", "Solutions", "Company"] as const;

/** Chapter copy tied to film progress (0-1). */
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

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function wheelDeltaPx(e: WheelEvent) {
  let y = e.deltaY;
  if (!Number.isFinite(y) || y === 0) return 0;
  if (e.deltaMode === 1) y *= 16;
  else if (e.deltaMode === 2) {
    y *= typeof window !== "undefined" ? window.innerHeight || 800 : 800;
  }
  return y;
}

type ScrollNarrativeApi = {
  setProgress: (p: number) => void;
  getProgress: () => number;
  getTarget: () => number;
  productId: string;
};

export default function VertexHeroSection() {
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const touchYRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const progressRef = useRef(0);
  const chapterRef = useRef(0);
  const cueOnRef = useRef(true);

  const paintPlayheadUi = useCallback((p: number) => {
    const clamped = clamp01(p);
    progressRef.current = clamped;
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${clamped})`;
    }
    const root = pinRef.current?.parentElement;
    if (root instanceof HTMLElement) {
      root.dataset.vertexPlayhead = clamped.toFixed(3);
      root.dataset.vertexTarget = targetProgressRef.current.toFixed(3);
    }
    const nextChapter = chapterIndex(clamped);
    const nextCue = clamped < 0.04;
    if (nextChapter !== chapterRef.current || nextCue !== cueOnRef.current) {
      chapterRef.current = nextChapter;
      cueOnRef.current = nextCue;
      setActiveChapter(nextChapter);
      setProgress(clamped);
    }
  }, []);

  const snapPlayhead = useCallback((p: number) => {
    const clamped = clamp01(p);
    targetProgressRef.current = clamped;
    const video = videoRef.current;
    if (video && video.duration && Number.isFinite(video.duration)) {
      video.pause();
      try {
        video.currentTime = clamped * video.duration;
      } catch {
        /* seek race before metadata */
      }
    }
    chapterRef.current = chapterIndex(clamped);
    cueOnRef.current = clamped < 0.04;
    progressRef.current = clamped;
    setProgress(clamped);
    setActiveChapter(chapterRef.current);
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${clamped})`;
    }
  }, []);

  const setTargetProgress = useCallback(
    (next: number, immediate = false) => {
      const clamped = clamp01(next);
      targetProgressRef.current = clamped;
      if (immediate) snapPlayhead(clamped);
    },
    [snapPlayhead]
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

    const openingTime = () => {
      const reducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const duration = video.duration;
      if (reducedNow && duration && Number.isFinite(duration)) {
        return Math.min(duration * 0.5, Math.max(0, duration - 0.05));
      }
      return 0;
    };

    const paintStartFrame = () => {
      if (cancelled || settled) return;
      video.pause();
      cleanupSeek();
      const target = openingTime();
      let kicked = false;
      onSeeked = () => {
        if (cancelled || settled) return;
        if (!kicked) {
          kicked = true;
          try {
            video.currentTime = target;
          } catch {
            markReady();
          }
          return;
        }
        markReady();
      };
      video.addEventListener("seeked", onSeeked);
      try {
        video.currentTime = target + 0.04;
      } catch {
        markReady();
        return;
      }
      safetyTimer = setTimeout(() => {
        if (cancelled) return;
        try {
          if (Math.abs(video.currentTime - target) > 0.02) {
            video.currentTime = target;
          }
        } catch {
          /* ignore */
        }
        if (video.readyState >= 2) markReady();
      }, 800);
    };

    const onMeta = () => paintStartFrame();
    const onLoadedData = () => paintStartFrame();

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

  useEffect(() => {
    if (reduced) return;
    const api: ScrollNarrativeApi = {
      setProgress: (p: number) => setTargetProgress(p, true),
      getProgress: () => progressRef.current,
      getTarget: () => targetProgressRef.current,
      productId: "MS-HERO-VERT01",
    };
    const w = window as Window & {
      __msScrollNarrative?: ScrollNarrativeApi;
    };
    w.__msScrollNarrative = api;
    return () => {
      if (w.__msScrollNarrative === api) delete w.__msScrollNarrative;
    };
  }, [reduced, setTargetProgress]);

  /**
   * PSAVE: gestures aim a destination on 3.6 vh (Elyse earn).
   * Down plays the film forward with leftover dest + rate ease on stop.
   * Up walks the live video backward at 1.2x.
   * Release only when the picture is at 0 + scroll up, or at 1 + scroll down.
   */
  useEffect(() => {
    if (!ready || reduced) return;
    const pin = pinRef.current;
    const video = videoRef.current;
    if (!pin || !video) return;

    video.pause();
    video.loop = false;
    snapPlayhead(0);

    const rootEl = pin.parentElement;
    const setDir = (dir: "fwd" | "rev" | "idle") => {
      if (rootEl) rootEl.dataset.vertexDir = dir;
    };
    setDir("idle");

    const virtualDistance = () => {
      const vh = window.innerHeight || 800;
      return VIRTUAL_VIEWPORTS * vh;
    };

    const sectionInView = () => {
      const r = pin.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      return r.top < mid && r.bottom > mid * 0.35;
    };

    const pinDocked = () => pin.getBoundingClientRect().top >= -2;

    let pageOwns = false;

    const eventOnPin = (e: Event) => {
      if (e.target instanceof Node && pin.contains(e.target)) return true;
      if (e instanceof WheelEvent) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el && pin.contains(el)) return true;
      }
      return false;
    };

    const touchOnPin = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0];
      if (!t) return false;
      if (e.target instanceof Node && pin.contains(e.target)) return true;
      const el = document.elementFromPoint(t.clientX, t.clientY);
      return Boolean(el && pin.contains(el));
    };

    let lastUpAt = 0;
    let lastDownAt = 0;
    let lastIntentSign = 0;
    let coastApplied = false;
    let revHead = 0;
    let revArmed = false;
    let revAcc = 0;
    let revBusy = false;
    let revClear: (() => void) | null = null;
    let revSafety: ReturnType<typeof setTimeout> | null = null;

    const clearRevWait = () => {
      if (revClear) {
        video.removeEventListener("seeked", revClear);
        revClear = null;
      }
      if (revSafety != null) {
        clearTimeout(revSafety);
        revSafety = null;
      }
      revBusy = false;
    };

    const markIntent = (deltaPx: number) => {
      const now = performance.now();
      if (deltaPx < 0) lastUpAt = now;
      if (deltaPx > 0) lastDownAt = now;
      lastIntentSign = deltaPx > 0 ? 1 : -1;
      coastApplied = false;
    };

    const pictureAtStart = () => {
      if (progressRef.current <= 0.0005) return true;
      const d = video.duration;
      return Boolean(d && Number.isFinite(d) && video.currentTime <= 0.04);
    };
    const pictureAtEnd = () => {
      if (progressRef.current >= 0.9995) return true;
      const d = video.duration;
      return Boolean(d && Number.isFinite(d) && video.currentTime >= d - 0.08);
    };

    const applyDelta = (deltaPx: number) => {
      if (!deltaPx || !Number.isFinite(deltaPx)) return false;
      const playhead = progressRef.current;
      let target = targetProgressRef.current;
      if (pictureAtStart() && deltaPx < 0) return false;
      if (pictureAtEnd() && deltaPx > 0) return false;
      if (target <= 0.0005 && deltaPx < 0) return true;
      if (target >= 0.9995 && deltaPx > 0) return true;

      const thisSign = deltaPx > 0 ? 1 : -1;
      const now = performance.now();
      const lastAt = Math.max(lastUpAt, lastDownAt);
      const flipIsBounce =
        lastIntentSign !== 0 &&
        thisSign !== lastIntentSign &&
        Math.abs(deltaPx) < PSAVE_FLIP_DEADZONE_PX &&
        now - lastAt < PSAVE_LIVE_MS + 120;
      if (flipIsBounce) return true;

      markIntent(deltaPx);
      if (deltaPx < 0 && target > playhead) target = playhead;
      if (deltaPx > 0 && target < playhead) target = playhead;
      targetProgressRef.current = clamp01(target + deltaPx / virtualDistance());
      if (rootEl) {
        rootEl.dataset.vertexTarget = targetProgressRef.current.toFixed(3);
        rootEl.dataset.vertexDir = deltaPx > 0 ? "fwd" : "rev";
      }
      return true;
    };

    let wheelPending = 0;
    let wheelRaf = 0;
    let chaseRaf = 0;
    let lastTs = 0;

    const flushWheel = () => {
      wheelRaf = 0;
      const pending = wheelPending;
      wheelPending = 0;
      if (pending) applyDelta(pending);
    };

    const onEnded = () => {
      video.pause();
      video.loop = false;
      if (video.duration && Number.isFinite(video.duration)) {
        try {
          video.currentTime = Math.max(0, video.duration - 0.001);
        } catch {
          /* ignore */
        }
      }
      paintPlayheadUi(1);
    };

    const issueReverseStep = (targetT: number) => {
      if (revBusy) return false;
      const next = Math.max(targetT, revHead - PSAVE_REV_STEP);
      if (next >= revHead - 0.0005) return false;
      revHead = next;
      revBusy = true;
      if (!video.paused) video.pause();
      video.playbackRate = 1;
      revClear = () => {
        clearRevWait();
      };
      video.addEventListener("seeked", revClear);
      revSafety = setTimeout(() => {
        clearRevWait();
      }, 200);
      try {
        video.currentTime = revHead;
      } catch {
        clearRevWait();
        return false;
      }
      return true;
    };

    const chase = (ts: number) => {
      chaseRaf = requestAnimationFrame(chase);
      const duration = video.duration;
      if (!duration || !Number.isFinite(duration)) return;

      const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 1 / 60;
      lastTs = ts;

      const liveUp = ts - lastUpAt < PSAVE_LIVE_MS && lastUpAt >= lastDownAt;
      const liveDown = ts - lastDownAt < PSAVE_LIVE_MS && lastDownAt > lastUpAt;
      const settle = PSAVE_FRAME * 0.6;

      if (!liveUp && !liveDown && !coastApplied && lastIntentSign !== 0) {
        coastApplied = true;
        const playT = video.currentTime;
        const destT = targetProgressRef.current * duration;
        const atEnd = playT >= duration - 0.08 || progressRef.current >= 0.9995;
        const atStart = playT <= 0.04 || progressRef.current <= 0.0005;
        if (lastIntentSign > 0 && !atEnd && destT < playT + PSAVE_COAST_SEC) {
          targetProgressRef.current = clamp01((playT + PSAVE_COAST_SEC) / duration);
        } else if (lastIntentSign < 0 && !atStart && destT > playT - PSAVE_COAST_SEC) {
          targetProgressRef.current = clamp01((playT - PSAVE_COAST_SEC) / duration);
        }
        if (rootEl) {
          rootEl.dataset.vertexTarget = targetProgressRef.current.toFixed(3);
        }
      }

      const targetT = targetProgressRef.current * duration;

      if (liveUp) {
        if (!revArmed) {
          revHead = video.currentTime;
          revArmed = true;
          revAcc = PSAVE_REV_STEP;
        }
        if (!video.paused) video.pause();
        video.playbackRate = 1;
        setDir("rev");
        if (revHead > targetT + settle && !revBusy) {
          issueReverseStep(targetT);
        }
        paintPlayheadUi(clamp01(revHead / duration));
        return;
      }

      if (revArmed && revHead > targetT + settle) {
        setDir("rev");
        if (!video.paused) video.pause();
        video.playbackRate = 1;
        if (!revBusy) {
          revAcc += PSAVE_RATE * dt;
          if (revAcc >= PSAVE_REV_STEP) {
            revAcc -= PSAVE_REV_STEP;
            issueReverseStep(targetT);
          }
        }
        paintPlayheadUi(clamp01(revHead / duration));
        return;
      }

      if (revArmed && revHead <= targetT + settle) {
        revArmed = false;
        revAcc = 0;
        clearRevWait();
      }

      const cur = revArmed ? revHead : video.currentTime;
      const err = targetT - cur;

      if (Math.abs(err) <= settle) {
        if (!video.paused) video.pause();
        clearRevWait();
        revArmed = false;
        revAcc = 0;
        setDir("idle");
        const atFilmEnd = targetT >= duration - 0.08 || cur >= duration - 0.08;
        const atFilmStart = targetT <= 0.04 && cur <= 0.04;
        if (atFilmEnd) {
          try {
            video.currentTime = Math.max(0, duration - 0.001);
          } catch {
            /* ignore */
          }
          paintPlayheadUi(1);
        } else if (atFilmStart) {
          try {
            video.currentTime = 0;
          } catch {
            /* ignore */
          }
          paintPlayheadUi(0);
        } else {
          paintPlayheadUi(clamp01(cur / duration));
        }
        return;
      }

      if (err > 0 && !liveUp) {
        clearRevWait();
        revArmed = false;
        revAcc = 0;
        setDir("fwd");
        if (cur >= duration - 0.08) {
          if (!video.paused) video.pause();
          try {
            video.currentTime = duration - 0.001;
          } catch {
            /* ignore */
          }
          paintPlayheadUi(1);
          return;
        }
        if (liveDown || !liveUp) {
          const remain = Math.max(0, err);
          video.playbackRate =
            remain < PSAVE_EASE_SEC
              ? Math.max(0.42, PSAVE_RATE * (remain / PSAVE_EASE_SEC))
              : PSAVE_RATE;
          if (video.paused) {
            const attempt = video.play();
            if (attempt && typeof attempt.catch === "function") {
              attempt.catch(() => {
                try {
                  video.currentTime = Math.min(
                    duration - 0.001,
                    cur + Math.min(err, PSAVE_RATE * dt, PSAVE_FRAME)
                  );
                } catch {
                  /* ignore */
                }
              });
            }
          }
        }
        paintPlayheadUi(clamp01(video.currentTime / duration));
        return;
      }

      if (!video.paused) video.pause();
      video.playbackRate = 1;
      if (!revArmed) {
        revHead = video.currentTime;
        revArmed = true;
        revAcc = PSAVE_REV_STEP;
      }
      setDir("rev");
      if (!revBusy) issueReverseStep(targetT);
      paintPlayheadUi(clamp01(revHead / duration));
    };

    const onWheel = (e: WheelEvent) => {
      if (pinDocked()) pageOwns = false;
      if (pageOwns) return;
      if (!sectionInView()) return;
      if (!eventOnPin(e)) return;
      if (e.ctrlKey || e.metaKey) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaY) < 1) {
        return;
      }
      const raw = wheelDeltaPx(e);
      if (!raw) return;

      const releasing =
        (pictureAtStart() && raw < 0) || (pictureAtEnd() && raw > 0);
      if (releasing) {
        if (pictureAtEnd() && raw > 0) pageOwns = true;
        return;
      }

      const thisSign = raw > 0 ? 1 : -1;
      const now = performance.now();
      const lastAt = Math.max(lastUpAt, lastDownAt);
      const flipIsBounce =
        lastIntentSign !== 0 &&
        thisSign !== lastIntentSign &&
        Math.abs(raw) < PSAVE_FLIP_DEADZONE_PX &&
        now - lastAt < PSAVE_LIVE_MS + 120;
      if (!flipIsBounce) {
        wheelPending += raw;
        if (!wheelRaf) wheelRaf = requestAnimationFrame(flushWheel);
      }
      e.preventDefault();
      e.stopPropagation();
    };

    const onTouchStart = (e: TouchEvent) => {
      if (pinDocked()) pageOwns = false;
      if (pageOwns || !sectionInView() || e.touches.length !== 1) return;
      if (!touchOnPin(e)) return;
      touchYRef.current = e.touches[0]!.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (pinDocked()) pageOwns = false;
      if (pageOwns || !sectionInView() || e.touches.length !== 1) return;
      if (!touchOnPin(e)) return;
      const y = e.touches[0]!.clientY;
      const prev = touchYRef.current;
      touchYRef.current = y;
      if (prev == null) return;
      const deltaY = prev - y;
      const consumed = applyDelta(deltaY);
      if (!consumed && pictureAtEnd() && deltaY > 0) pageOwns = true;
      if (consumed) e.preventDefault();
    };

    const onTouchEnd = () => {
      touchYRef.current = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (pinDocked()) pageOwns = false;
      if (pageOwns || !sectionInView()) return;
      const el = e.target as HTMLElement | null;
      if (
        el &&
        el.closest(
          "a, button, input, textarea, select, [contenteditable='true']"
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
      if (!consumed && pictureAtEnd() && delta > 0) pageOwns = true;
      if (consumed) e.preventDefault();
    };

    video.addEventListener("ended", onEnded);
    chaseRaf = requestAnimationFrame(chase);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      if (wheelRaf) cancelAnimationFrame(wheelRaf);
      if (chaseRaf) cancelAnimationFrame(chaseRaf);
      clearRevWait();
      video.removeEventListener("ended", onEnded);
      video.pause();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [ready, reduced, paintPlayheadUi, snapPlayhead]);

  useEffect(() => {
    if (!ready || !reduced) return;
    snapPlayhead(0.5);
  }, [ready, reduced, snapPlayhead]);

  const chapter = CHAPTERS[activeChapter];
  const showScrollCue = !reduced && progress < 0.04;

  return (
    <div
      className={`vertex-root bg-black text-white${reduced ? "" : " vertex-root--pin"}`}
      data-vertex-pin={reduced ? "false" : "true"}
      data-vertex-progress={activeChapter}
      data-vertex-drive="psave"
      style={{
        fontFamily: "var(--font-vertex-sans), Inter, system-ui, sans-serif",
      }}
    >
      <div
        ref={pinRef}
        className={`relative w-full overflow-hidden${
          reduced ? " h-screen" : " vertex-pin-stage"
        }`}
      >
        <div className="relative h-screen w-full overflow-hidden">
          <video
            ref={videoRef}
            className={`vertex-video absolute inset-0 h-full w-full object-cover${
              ready ? " is-ready" : ""
            }`}
            src={VIDEO_SRC}
            poster={POSTER_SRC}
            muted
            playsInline
            preload="auto"
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
            <div className="h-px w-full bg-white/10">
              <div
                ref={progressBarRef}
                className="h-full origin-left bg-white"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </header>

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

      {/* Intentionally no footer / closing band - narrative ends when the pin journey ends. */}

      <style jsx global>{`
        .vertex-root--pin {
          height: 100dvh;
          max-height: 100dvh;
          overflow: hidden;
          overscroll-behavior: none;
        }
        .vertex-root--pin .vertex-pin-stage {
          height: 100dvh;
          min-height: 100vh;
          max-height: 100dvh;
        }
        .vertex-video {
          opacity: 0;
          transition: opacity 0.45s ease;
        }
        .vertex-video.is-ready {
          opacity: 1;
        }
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
