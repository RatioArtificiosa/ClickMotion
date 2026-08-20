"use client";

/**
 * STILL - Mindfulness scroll hero (MS-HERO-STIL01)
 *
 * Dual process: PSAVE + No Scroller (pin-until-complete).
 * Art, chapters, whispers, and chrome unchanged.
 * Hybrid Option A (5s idle free-play) and the 960vh sticky track are gone.
 *
 * PSAVE - Perfect Scroll Video Engine:
 *   Scroll aims a destination on a 12-viewport track (30s even cosmos film).
 *   Down-scroll plays the film forward (native play at 1.2x, leftover dest
 *   + rate ease on lift). Up-scroll walks the live video backward one
 *   3-frame step at a time. Never seek to the stop point.
 *   Copy and the mint bar follow the picture.
 *   Release only when the picture has arrived at 0 (up) or 1 (down).
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

export const STILL_VIDEO_SRC = "/assets/videos/still-cosmos-v1.mp4";
export const STILL_POSTER_SRC = "/assets/posters/still-cosmos-v1.webp";

/**
 * 30s even cosmos film. Two flicks on 3.6 dump dest into "watching
 * a video." Locked earn is Revel-class 12. Operator: "It is perfect."
 * Hybrid idle and 960vh sticky are banned.
 */
const VIRTUAL_VIEWPORTS = 12;

const PSAVE_RATE = 1.2;
const PSAVE_FRAME = 1 / 24;
const PSAVE_REV_STRIDE = 3;
const PSAVE_REV_STEP = PSAVE_FRAME * PSAVE_REV_STRIDE;
const PSAVE_LIVE_MS = 280;
const PSAVE_COAST_SEC = 0.55;
const PSAVE_EASE_SEC = 0.55;
const PSAVE_FLIP_DEADZONE_PX = 32;

type Chapter = {
  id: string;
  range: readonly [number, number];
  eyebrow: string;
  titleLines: readonly [string, string];
  body: string;
  whisper?: string;
};

const CHAPTERS: readonly Chapter[] = [
  {
    id: "arrive",
    range: [0, 0.14],
    eyebrow: "Mindfulness  ·  Sleep  ·  Live programs",
    titleLines: ["Soften.", "Begin again."],
    body: "A private practice for a louder world. Guided calm, deeper sleep, and in-person retreats when you are ready.",
    whisper: "Breathe in",
  },
  {
    id: "arid",
    range: [0.14, 0.34],
    eyebrow: "For the days that feel dry",
    titleLines: ["When your mind", "never lands."],
    body: "Stress less with short sessions that meet you where you are. No perfect breath required. No judgment.",
    whisper: "Unclench",
  },
  {
    id: "soften",
    range: [0.34, 0.56],
    eyebrow: "Small practices  ·  Real change",
    titleLines: ["Softness", "is a skill."],
    body: "Evidence-backed mindfulness and wind-downs you can finish in minutes. Build the habit that holds you.",
    whisper: "Ease",
  },
  {
    id: "bloom",
    range: [0.56, 0.78],
    eyebrow: "Daily calm  ·  Night rest",
    titleLines: ["Grow into", "your quiet."],
    body: "Ten minutes can reset a morning. A night program can return your sleep. You choose the pace.",
    whisper: "Expand",
  },
  {
    id: "sky",
    range: [0.78, 1.01],
    eyebrow: "A quieter way to live",
    titleLines: ["Come home", "to yourself."],
    body: "Less noise in your chest. Clearer mornings. Sleep that actually restores you. The calm you feel here is meant to follow you into the rest of your day.",
    whisper: "Return",
  },
] as const;

const NAV = ["Practice", "Sleep", "Stress", "Retreats"] as const;

const STATS = [
  { n: "10 min", l: "daily sessions" },
  { n: "Science", l: "led programs" },
  { n: "Live", l: "retreats & circles" },
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

const displayFont: CSSProperties = {
  fontFamily:
    "var(--font-still-display), 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
};

const bodyFont: CSSProperties = {
  fontFamily:
    "var(--font-still-body), Inter, ui-sans-serif, system-ui, sans-serif",
};

export default function StillMindfulnessHero() {
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
      root.dataset.stillPlayhead = clamped.toFixed(3);
      root.dataset.stillTarget = targetProgressRef.current.toFixed(3);
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
      const reducedNow = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reducedNow) return 0;
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
      productId: "MS-HERO-STIL01",
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
   * Dual process: No Scroller pin + PSAVE chase.
   * Gestures aim on 12 vh. Film plays. Page does not physically scroll.
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
      if (rootEl) rootEl.dataset.stillDir = dir;
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
        rootEl.dataset.stillTarget = targetProgressRef.current.toFixed(3);
        rootEl.dataset.stillDir = deltaPx > 0 ? "fwd" : "rev";
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
          targetProgressRef.current = clamp01(
            (playT + PSAVE_COAST_SEC) / duration
          );
        } else if (
          lastIntentSign < 0 &&
          !atStart &&
          destT > playT - PSAVE_COAST_SEC
        ) {
          targetProgressRef.current = clamp01(
            (playT - PSAVE_COAST_SEC) / duration
          );
        }
        if (rootEl) {
          rootEl.dataset.stillTarget = targetProgressRef.current.toFixed(3);
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
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchend", onTouchEnd, { passive: true });

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
    snapPlayhead(0);
  }, [ready, reduced, snapPlayhead]);

  const chapter = CHAPTERS[activeChapter];
  const showScrollCue = !reduced && progress < 0.05;
  const showCta = activeChapter >= CHAPTERS.length - 1 || progress >= 0.78;

  return (
    <div
      className="still-root bg-[#070b12] text-[#eef6f4]"
      style={bodyFont}
      data-still-drive="psave"
      data-still-pin={reduced ? "false" : "true"}
      data-still-progress={activeChapter}
    >
      <div
        ref={pinRef}
        className="relative h-[100dvh] min-h-screen w-full overflow-hidden"
      >
        <video
          ref={videoRef}
          className={`still-video absolute inset-0 h-full w-full object-cover${
            ready ? " is-ready" : ""
          }`}
          src={STILL_VIDEO_SRC}
          poster={STILL_POSTER_SRC}
          muted
          playsInline
          preload="auto"
          style={{ transform: "none", filter: "none" }}
          aria-hidden
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `
                linear-gradient(105deg, rgba(7,11,18,0.62) 0%, rgba(7,11,18,0.08) 36%, transparent 52%, rgba(7,11,18,0.22) 100%),
                linear-gradient(180deg, rgba(7,11,18,0.32) 0%, transparent 22%, transparent 68%, rgba(7,11,18,0.58) 100%)
              `,
          }}
        />

        {!reduced &&
          CHAPTERS.map((ch, i) => {
            const active = i === activeChapter;
            return (
              <span
                key={ch.id}
                className="pointer-events-none absolute z-10 text-[11px] uppercase tracking-[0.35em] transition-all duration-700"
                style={{
                  ...displayFont,
                  right: i % 2 === 0 ? "8%" : "auto",
                  left: i % 2 === 1 ? "10%" : "auto",
                  top: `${22 + i * 12}%`,
                  color: active
                    ? "rgba(143,208,200,0.85)"
                    : "rgba(238,246,244,0.12)",
                  opacity: active ? 1 : 0.35,
                  transform: active ? "translateY(0)" : "translateY(8px)",
                }}
              >
                {ch.whisper}
              </span>
            );
          })}

        <header className="absolute left-0 right-0 top-0 z-30">
          <div className="mx-auto flex h-[4.5rem] w-full max-w-[1400px] items-center justify-between px-8 sm:px-10 md:px-14 lg:px-16">
            <div className="flex items-center gap-3">
              <span
                className="text-[15px] font-medium tracking-[0.32em] text-[#eef6f4]"
                style={displayFont}
              >
                STILL
              </span>
              <span className="hidden h-3 w-px bg-[#8fd0c8]/40 sm:block" />
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-[#8fd0c8]/75 sm:inline">
                Mindfulness
              </span>
            </div>

            <nav className="hidden items-center gap-8 md:flex">
              {NAV.map((item) => (
                <a
                  key={item}
                  href="#begin"
                  className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#eef6f4]/70 transition hover:text-[#eef6f4]"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#begin"
                className="hidden rounded-full border border-[#eef6f4]/20 bg-[#eef6f4]/[0.06] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#eef6f4]/85 backdrop-blur-xl transition hover:bg-[#eef6f4]/10 sm:inline-flex"
              >
                Sign in
              </a>
              <a
                href="#begin"
                className="rounded-full bg-[#8fd0c8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#070b12] transition hover:bg-[#a8e0d8]"
              >
                Begin free
              </a>
            </div>
          </div>

          <div className="mx-auto h-px w-full max-w-[1400px] bg-[#eef6f4]/10 px-8 sm:px-10 md:px-14 lg:px-16">
            <div className="relative h-px w-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-[#8fd0c8] to-[#c5b8e0] will-change-transform"
                style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </header>

        <div className="absolute inset-x-0 bottom-0 z-20 pb-10 pt-24 sm:pb-14 md:pb-16">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-12 gap-6 px-8 sm:px-10 md:px-14 lg:px-16">
            <div className="col-span-12 min-w-0 md:col-span-8 lg:col-span-7">
              <div
                key={chapter.id}
                className="still-chapter"
                style={{
                  animation: reduced
                    ? undefined
                    : "stillChapterIn 0.75s cubic-bezier(0.22, 0.61, 0.36, 1) both",
                }}
              >
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-[#8fd0c8]">
                  {chapter.eyebrow}
                </p>
                <h1
                  className="text-balance text-[clamp(2.6rem,7.2vw,5.75rem)] font-medium leading-[0.94] tracking-[-0.02em] text-[#eef6f4]"
                  style={displayFont}
                >
                  <span className="block">{chapter.titleLines[0]}</span>
                  <span className="block text-[#cfe9e4]">
                    {chapter.titleLines[1]}
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#eef6f4]/72 sm:text-[16px]">
                  {chapter.body}
                </p>

                {showCta && (
                  <div
                    id="begin"
                    className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                  >
                    <a
                      href="#begin"
                      className="inline-flex items-center justify-center rounded-full bg-[#8fd0c8] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#070b12] transition hover:bg-[#a8e0d8]"
                    >
                      Start free session
                    </a>
                    <a
                      href="#begin"
                      className="inline-flex items-center justify-center rounded-full border border-[#eef6f4]/25 bg-[#eef6f4]/[0.06] px-6 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-[#eef6f4] backdrop-blur-xl transition hover:bg-[#eef6f4]/10"
                    >
                      Explore programs
                    </a>
                  </div>
                )}

                {showCta && (
                  <div className="mt-8 flex flex-wrap gap-8 border-t border-[#eef6f4]/12 pt-6">
                    {STATS.map((s) => (
                      <div key={s.l}>
                        <div
                          className="text-[22px] font-medium tracking-tight text-[#eef6f4]"
                          style={displayFont}
                        >
                          {s.n}
                        </div>
                        <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-[#eef6f4]/45">
                          {s.l}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-12 hidden flex-col items-end justify-end gap-3 md:col-span-4 md:flex lg:col-span-5">
              {CHAPTERS.map((ch, i) => {
                const on = i === activeChapter;
                return (
                  <div
                    key={ch.id}
                    className="flex items-center gap-3 transition-opacity duration-500"
                    style={{ opacity: on ? 1 : 0.35 }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#eef6f4]/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="h-px transition-all duration-500"
                      style={{
                        width: on ? 48 : 24,
                        background: on ? "#8fd0c8" : "rgba(238,246,244,0.25)",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {showScrollCue && (
          <div
            data-ms-scroll-cue
            className="pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#eef6f4]/45">
              Scroll
            </p>
            <div className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-[#8fd0c8]/80 to-transparent" />
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes stillChapterIn {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.still-video { opacity: 0; transition: opacity 0.45s ease; }
.still-video.is-ready { opacity: 1; }
`,
        }}
      />
    </div>
  );
}
