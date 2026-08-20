"use client";

/**
 * REVEL - Scroll-as-narrative fashion commerce hero (MS-HERO-REVL01)
 *
 * Pearl studio, rose-gold type, 20s iPhone breakout film.
 * Art and chapters unchanged. Drive method is PSAVE.
 *
 * PSAVE — Perfect Scroll Video Engine:
 *   Scroll aims a destination on a 12-viewport track (earned: more
 *   effort than Elyse film-density, so two flicks do not dump the film).
 *   Down-scroll plays the film forward (native play at 1.2x, eases out
 *   over the last half-second of leftover dest so a stop coasts).
 *   Up-scroll cancels any pending forward destination, then walks the
 *   live video backward one 3-frame step at a time. Never seek to the
 *   stop point. The walk starts while the gesture is still moving.
 *   Tiny opposite trackpad ticks are ignored so dest is not snapped dead.
 *   The picture never jumps a frame. Copy and the rose bar follow the picture.
 *   Release only when the picture has arrived at 0 (up) or 1 (down).
 *   After release the page owns the atelier until the stage docks.
 * Opening still: poster IS frame 0 (gold phone / feed). Kick-seek still
 * locks a real decode so first scroll does not jump.
 */

import { useEffect, useRef, useState, useCallback } from "react";

/** Client HD only - never storefront preview burn */
const VIDEO_SRC = "/assets/videos/revel-breakout-v1.mp4";
const POSTER_SRC = "/assets/posters/revel-breakout-v1.webp";

/**
 * Aim track is longer than Elyse film-density (7.2) on purpose.
 * 20.04s / 12 vh ≈ 1.67 film-seconds per viewport. Two trackpad flicks
 * aim a few seconds of picture, not half the film. Settings only; film
 * is unchanged. Do not go back to the 3.8 seek-scrub track.
 */
const VIRTUAL_VIEWPORTS = 12;

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
const PSAVE_LIVE_MS = 280;

/**
 * After the last real intent, dest must sit at least this many film-seconds
 * ahead (down) or behind (up). That leftover is what Elyse feels like when
 * you lift: play keeps going a little instead of pausing on the last tick.
 * Matches the old Revel 0.55 GSAP coast in time, not in method.
 */
const PSAVE_COAST_SEC = 0.55;

/** Forward catch-up eases over this many leftover film-seconds (power-out). */
const PSAVE_EASE_SEC = 0.55;

/**
 * Trackpad end-of-gesture often fires a tiny opposite delta. That used to
 * snap dest onto the playhead and kill the coast. Ignore those ticks.
 */
const PSAVE_FLIP_DEADZONE_PX = 32;

/** Chapters mapped to film progress (0–1 = full duration). */
const CHAPTERS = [
  {
    id: "feed",
    range: [0, 0.28] as const,
    index: "01",
    eyebrow: "Chapter one  ·  The feed",
    titleLines: ["She lived", "inside the glow."],
    body: "A golden phone. A perfect profile. Infinite hearts orbiting a life that never quite left the glass.",
  },
  {
    id: "break",
    range: [0.28, 0.58] as const,
    index: "02",
    eyebrow: "Chapter two  ·  The break",
    titleLines: ["Then something", "had to give."],
    body: "A sole through the screen. Glass fractures. The feed cannot hold what wants to be real.",
  },
  {
    id: "shatter",
    range: [0.58, 0.82] as const,
    index: "03",
    eyebrow: "Chapter three  ·  The shatter",
    titleLines: ["Shards of", "attention fall."],
    body: "Likes, rings, icons - suspended midair. The stage is a studio of pearl light and rose silk. Everything is in motion.",
  },
  {
    id: "arrival",
    range: [0.82, 1.01] as const,
    index: "04",
    eyebrow: "Chapter four  ·  The arrival",
    titleLines: ["Now she", "owns the room."],
    body: "Out of the phone. Into the world. Revel is fashion commerce for brands that break the scroll - and keep the attention.",
  },
] as const;

function chapterIndex(progress: number) {
  for (let i = 0; i < CHAPTERS.length; i++) {
    const [a, b] = CHAPTERS[i].range;
    if (progress >= a && progress < b) return i;
  }
  return CHAPTERS.length - 1;
}

export type RevelScrollNarrativeProps = {
  brand?: string;
  backgroundSrc?: string;
  posterSrc?: string;
};

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

export default function RevelScrollNarrative({
  brand = "REVEL",
  backgroundSrc = VIDEO_SRC,
  posterSrc = POSTER_SRC,
}: RevelScrollNarrativeProps) {
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
      root.dataset.revelPlayhead = clamped.toFixed(3);
      root.dataset.revelTarget = targetProgressRef.current.toFixed(3);
    }
    const nextChapter = chapterIndex(clamped);
    const nextCue = clamped < 0.05;
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
    cueOnRef.current = clamped < 0.05;
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
        return Math.min(duration * 0.45, Math.max(0, duration - 0.05));
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
  }, [backgroundSrc]);

  useEffect(() => {
    if (reduced) return;
    const api: ScrollNarrativeApi = {
      setProgress: (p: number) => setTargetProgress(p, true),
      getProgress: () => progressRef.current,
      getTarget: () => targetProgressRef.current,
      productId: "MS-HERO-REVL01",
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
   * PSAVE: gestures aim a destination on 12 vh (earned, not Elyse density).
   * Down plays the film forward with a 0.55s dest coast + rate ease on stop.
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
      if (rootEl) rootEl.dataset.revelDir = dir;
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
        rootEl.dataset.revelTarget = targetProgressRef.current.toFixed(3);
        rootEl.dataset.revelDir = deltaPx > 0 ? "fwd" : "rev";
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
          rootEl.dataset.revelTarget = targetProgressRef.current.toFixed(3);
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
    snapPlayhead(0.45);
  }, [ready, reduced, snapPlayhead]);

  const chapter = CHAPTERS[activeChapter];
  const showScrollCue = !reduced && progress < 0.05;
  const isFinale = activeChapter === CHAPTERS.length - 1;

  return (
    <div
      className={`revel-root bg-[#F7F4F1] text-[#1A1614]${reduced ? "" : " revel-root--pin"}`}
      data-revel-pin={reduced ? "false" : "true"}
      data-revel-progress={activeChapter}
      data-revel-drive="psave"
      style={{
        fontFamily: "var(--font-revel-sans), system-ui, sans-serif",
      }}
    >
      <div
        ref={pinRef}
        className={`relative w-full overflow-hidden${
          reduced ? " h-screen" : " revel-pin-stage"
        }`}
      >
        <div className="relative h-screen w-full overflow-hidden bg-[#F7F4F1]">
          <video
            ref={videoRef}
            className={`revel-video absolute inset-0 h-full w-full object-cover${
              ready ? " is-ready" : ""
            }`}
            src={backgroundSrc}
            poster={posterSrc}
            muted
            playsInline
            preload="auto"
            aria-hidden
          />

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: `
                linear-gradient(180deg, rgba(247,244,241,0.78) 0%, rgba(247,244,241,0.12) 22%, transparent 42%, rgba(26,22,20,0.42) 68%, rgba(26,22,20,0.78) 100%),
                linear-gradient(90deg, rgba(26,22,20,0.28) 0%, transparent 38%, transparent 72%, rgba(247,244,241,0.15) 100%)
              `,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: "inset 0 0 120px rgba(196,165,116,0.12)",
            }}
          />

          <header className="absolute left-0 right-0 top-0 z-30">
            <div className="mx-auto flex h-[4.5rem] w-full max-w-[1400px] items-center justify-between px-8 sm:px-10 md:px-14 lg:px-16">
              <div className="flex items-center gap-3">
                <span
                  className="text-[15px] font-medium tracking-[0.32em] text-[#1A1614]"
                  style={{
                    fontFamily:
                      "var(--font-revel-display), 'Instrument Serif', Georgia, serif",
                  }}
                >
                  {brand}
                </span>
                <span className="hidden h-3 w-px bg-[#C4A574]/55 sm:block" />
                <span className="hidden text-[10px] font-medium uppercase tracking-[0.24em] text-[#1A1614]/55 sm:inline">
                  Fashion Commerce
                </span>
              </div>

              <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
                {["Collections", "Lookbook", "Campaigns", "Journal"].map(
                  (item) => (
                    <a
                      key={item}
                      href="#atelier"
                      className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#1A1614]/65 transition hover:text-[#1A1614]"
                      onClick={(e) => e.preventDefault()}
                    >
                      {item}
                    </a>
                  )
                )}
              </nav>

              <a
                href="#atelier"
                onClick={(e) => e.preventDefault()}
                className="group inline-flex items-center gap-2 border border-[#C4A574]/50 bg-white/40 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#1A1614] backdrop-blur-md transition hover:border-[#C4A574] hover:bg-white/70"
              >
                Enter atelier
                <span
                  className="transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </a>
            </div>
            <div className="h-px w-full bg-[#1A1614]/10">
              <div
                ref={progressBarRef}
                className="h-full origin-left bg-gradient-to-r from-[#C4A574] via-[#E8B4B8] to-[#C4A574]"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </header>

          <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 pb-16 pt-28 sm:px-10 md:px-14 md:pb-20 lg:px-16">
            <div className="mx-auto w-full max-w-[1400px]">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
                <div className="min-w-0 max-w-[42rem] lg:col-span-8 lg:max-w-none">
                  <p
                    key={`eye-${chapter.id}`}
                    className="mb-4 max-w-full text-[11px] font-medium uppercase tracking-[0.24em] text-[#C4A574] sm:tracking-[0.28em]"
                    style={{
                      animation: reduced
                        ? undefined
                        : "revelFade 0.65s ease both",
                    }}
                  >
                    {chapter.eyebrow}
                  </p>

                  <h1
                    key={`title-${chapter.id}`}
                    className="max-w-full break-words text-[clamp(2.5rem,6.4vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.03em] text-[#F7F4F1] drop-shadow-[0_2px_28px_rgba(26,22,20,0.45)]"
                    style={{
                      fontFamily:
                        "var(--font-revel-display), 'Instrument Serif', Georgia, serif",
                      animation: reduced
                        ? undefined
                        : "revelRise 0.85s cubic-bezier(0.22,1,0.36,1) both",
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
                    className="mt-6 max-w-xl pr-2 text-[15px] font-light leading-[1.7] text-[#F7F4F1]/88 md:text-[17px]"
                    style={{
                      textShadow: "0 1px 18px rgba(26,22,20,0.4)",
                      animation: reduced
                        ? undefined
                        : "revelFade 0.85s 0.06s ease both",
                    }}
                  >
                    {chapter.body}
                  </p>

                  {isFinale && (
                    <div
                      className="mt-9 flex flex-wrap items-center gap-4"
                      style={{
                        animation: reduced
                          ? undefined
                          : "revelFade 0.8s 0.12s ease both",
                      }}
                    >
                      <a
                        href="#atelier"
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center gap-2 bg-[#1A1614] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#F7F4F1] transition hover:bg-black"
                      >
                        Shop the drop
                      </a>
                      <a
                        href="#atelier"
                        onClick={(e) => e.preventDefault()}
                        className="inline-flex items-center gap-2 border border-white/40 bg-white/10 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-[#F7F4F1] backdrop-blur-sm transition hover:border-white/70 hover:bg-white/20"
                      >
                        Watch campaign
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end lg:pr-1 lg:text-right">
                  <div className="flex items-center gap-3 lg:flex-col lg:items-end lg:gap-3">
                    {CHAPTERS.map((c, i) => (
                      <div key={c.id} className="flex items-center gap-2">
                        <span
                          className={`h-px transition-all duration-500 ${
                            i === activeChapter
                              ? "w-10 bg-[#C4A574]"
                              : "w-4 bg-white/35"
                          }`}
                        />
                        <span
                          className={`text-[10px] uppercase tracking-[0.22em] transition-colors duration-500 ${
                            i === activeChapter
                              ? "text-[#C4A574]"
                              : "text-white/40"
                          }`}
                        >
                          {c.index}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="hidden max-w-[12rem] text-[11px] font-light leading-relaxed text-white/50 lg:block">
                    Scroll to play the film. Each chapter owns a beat of the
                    breakout.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {showScrollCue && (
            <div
              data-ms-scroll-cue
              className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#1A1614]/55">
                Scroll
              </span>
              <span className="h-11 w-px origin-top animate-pulse bg-gradient-to-b from-[#C4A574] to-transparent" />
            </div>
          )}

          {reduced && (
            <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-[11px] tracking-wide text-[#1A1614]/45">
              Motion reduced · static chapter view
            </div>
          )}
        </div>
      </div>

      <section
        id="atelier"
        className="relative border-t border-[#1A1614]/10 bg-[#F7F4F1] px-8 py-24 sm:px-10 md:px-14 md:py-32 lg:px-16"
      >
        <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-[#C4A574]">
              The atelier
            </p>
            <h2
              className="text-[clamp(2rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em] text-[#1A1614]"
              style={{
                fontFamily:
                  "var(--font-revel-display), 'Instrument Serif', Georgia, serif",
              }}
            >
              Fashion that breaks
              <br />
              the scroll.
            </h2>
            <p className="mt-6 max-w-md text-[15px] font-light leading-[1.7] text-[#1A1614]/70">
              Revel is built for brands who refuse to live only inside a feed.
              Campaign film. Product truth. Commerce that feels like a runway
              moment - not another carousel ad.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { k: "Drop cadence", v: "Weekly IRL + digital" },
                { k: "Film system", v: "Scroll plays the film" },
                { k: "Audience", v: "Fashion · beauty · lifestyle" },
                { k: "Stack", v: "React · PSAVE · pure MP4" },
              ].map((row) => (
                <div
                  key={row.k}
                  className="border border-[#1A1614]/10 bg-white/50 px-5 py-4 backdrop-blur-sm"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#C4A574]">
                    {row.k}
                  </p>
                  <p className="mt-2 text-[14px] font-medium text-[#1A1614]">
                    {row.v}
                  </p>
                </div>
              ))}
            </div>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex w-fit items-center gap-2 border border-[#1A1614] bg-[#1A1614] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#F7F4F1] transition hover:bg-black"
            >
              Request a campaign kit
            </a>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .revel-root--pin .revel-pin-stage {
          height: 100dvh;
          min-height: 100vh;
          max-height: 100dvh;
        }
        .revel-video {
          opacity: 0;
          transition: opacity 0.45s ease;
        }
        .revel-video.is-ready {
          opacity: 1;
        }
        @keyframes revelFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes revelRise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `,
        }}
      />
    </div>
  );
}
