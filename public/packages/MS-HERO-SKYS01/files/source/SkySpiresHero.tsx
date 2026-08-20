"use client";

/**
 * SkySpires - sunrise cinematic HUD hero.
 *
 * Dual process: PSAVE + No Scroller (pin-until-complete).
 * HUD art is the frozen frost overlay. CSS / interval loops stay.
 * Only the sunrise film is the scroll clock. The whole movie plays on scroll.
 *
 * PSAVE - Perfect Scroll Video Engine:
 *   25.04s even sunrise film, 24fps. Earn 12 viewports (long even film family).
 *   Down plays forward at 1.2x. Up walks live video backward 3 frames.
 *   Release only when the picture arrives at 0 or 1.
 *   CTA 12.5s, dock sheen 6.4s, dock gold 12s, stats 10s, rings 2.8s stay.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChartLine,
  ChevronDown,
  CodeXml,
  FilePenLine,
  Rocket,
  Search,
  Sparkle,
  UsersRound,
} from "lucide-react";
import { BRAND, GAUGE, HERO, NAV, STATS, STEPS } from "./copy";
import "./hero.css";

export const SKYSPIRES_VIDEO_SRC = "/assets/videos/skyspires-sunrise-v1.mp4";
export const SKYSPIRES_POSTER = "/assets/posters/skyspires-sunrise-v1.webp";

const VIRTUAL_VIEWPORTS = 12;
const PSAVE_RATE = 1.2;
const PSAVE_FRAME = 1 / 24;
const PSAVE_REV_STRIDE = 3;
const PSAVE_REV_STEP = PSAVE_FRAME * PSAVE_REV_STRIDE;
const PSAVE_LIVE_MS = 280;
const PSAVE_COAST_SEC = 0.55;
const PSAVE_EASE_SEC = 0.55;
const PSAVE_FLIP_DEADZONE_PX = 32;

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
  pageOwns: () => boolean;
  productId: string;
};

export default function SkySpiresHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchYRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const progressRef = useRef(0);
  const pageOwnsRef = useRef(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [gauge, setGauge] = useState(false);
  const [ring, setRing] = useState(0);
  const [query, setQuery] = useState(false);
  const [processOpen, setProcessOpen] = useState(false);
  const [studioTime, setStudioTime] = useState("");

  const setPageOwns = (owns: boolean) => {
    pageOwnsRef.current = owns;
    const el = sectionRef.current;
    if (el) el.dataset.skyspiresOwns = owns ? "page" : "pin";
  };

  const paintPlayheadUi = useCallback((p: number) => {
    const clamped = clamp01(p);
    progressRef.current = clamped;
    const el = sectionRef.current;
    if (el) {
      el.dataset.skyspiresPlayhead = clamped.toFixed(3);
      el.dataset.skyspiresTarget = targetProgressRef.current.toFixed(3);
    }
  }, []);

  const snapPlayhead = useCallback(
    (p: number) => {
      const clamped = clamp01(p);
      targetProgressRef.current = clamped;
      const video = videoRef.current;
      if (video && video.duration && Number.isFinite(video.duration)) {
        video.pause();
        try {
          video.currentTime = clamped * video.duration;
        } catch {
          /* seek race */
        }
      }
      progressRef.current = clamped;
      paintPlayheadUi(clamped);
    },
    [paintPlayheadUi],
  );

  const setTargetProgress = useCallback(
    (next: number, immediate = false) => {
      const clamped = clamp01(next);
      targetProgressRef.current = clamped;
      if (immediate) snapPlayhead(clamped);
    },
    [snapPlayhead],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const boot = window.setTimeout(() => setGauge(true), 10000);
    const rings = window.setInterval(() => {
      setRing((r) => (r + 1) % GAUGE.rings.length);
    }, 2800);
    const stamp = () => {
      setStudioTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "America/Mexico_City",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };
    stamp();
    const clock = window.setInterval(stamp, 15000);
    return () => {
      window.clearTimeout(boot);
      window.clearInterval(rings);
      window.clearInterval(clock);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;
    let settled = false;
    const markReady = () => {
      if (cancelled || settled) return;
      settled = true;
      video.pause();
      video.loop = false;
      setReady(true);
    };
    const onMeta = () => {
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
      markReady();
    };
    if (video.readyState >= 1) onMeta();
    else video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("loadeddata", markReady);
    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("loadeddata", markReady);
    };
  }, []);

  useEffect(() => {
    const api: ScrollNarrativeApi = {
      setProgress: (p: number) => setTargetProgress(p, true),
      getProgress: () => progressRef.current,
      getTarget: () => targetProgressRef.current,
      pageOwns: () => pageOwnsRef.current,
      productId: "MS-HERO-SKYS01",
    };
    const w = window as Window & { __msScrollNarrative?: ScrollNarrativeApi };
    w.__msScrollNarrative = api;
    return () => {
      if (w.__msScrollNarrative === api) delete w.__msScrollNarrative;
    };
  }, [setTargetProgress]);

  useEffect(() => {
    if (!ready || reduced) return;
    const pin = sectionRef.current;
    const video = videoRef.current;
    if (!pin || !video) return;

    video.pause();
    video.loop = false;
    snapPlayhead(0);
    setPageOwns(false);
    pin.dataset.skyspiresDrive = "psave";
    pin.dataset.product = "MS-HERO-SKYS01";

    const setDir = (dir: "fwd" | "rev" | "idle") => {
      pin.dataset.skyspiresDir = dir;
    };
    setDir("idle");

    const virtualDistance = () =>
      VIRTUAL_VIEWPORTS * (window.innerHeight || 800);

    const sectionInView = () => {
      const r = pin.getBoundingClientRect();
      const mid = window.innerHeight * 0.5;
      return r.top < mid && r.bottom > mid * 0.35;
    };
    const pinDocked = () => pin.getBoundingClientRect().top >= -2;

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
      pin.dataset.skyspiresTarget = targetProgressRef.current.toFixed(3);
      pin.dataset.skyspiresDir = deltaPx > 0 ? "fwd" : "rev";
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
            (playT + PSAVE_COAST_SEC) / duration,
          );
        } else if (
          lastIntentSign < 0 &&
          !atStart &&
          destT > playT - PSAVE_COAST_SEC
        ) {
          targetProgressRef.current = clamp01(
            (playT - PSAVE_COAST_SEC) / duration,
          );
        }
        pin.dataset.skyspiresTarget = targetProgressRef.current.toFixed(3);
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
                    cur + Math.min(err, PSAVE_RATE * dt, PSAVE_FRAME),
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
      if (pinDocked()) setPageOwns(false);
      if (pageOwnsRef.current) return;
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
        if (pictureAtEnd() && raw > 0) setPageOwns(true);
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
      if (pinDocked()) setPageOwns(false);
      if (pageOwnsRef.current || !sectionInView() || e.touches.length !== 1) {
        return;
      }
      if (!touchOnPin(e)) return;
      touchYRef.current = e.touches[0]!.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (pinDocked()) setPageOwns(false);
      if (pageOwnsRef.current || !sectionInView() || e.touches.length !== 1) {
        return;
      }
      if (!touchOnPin(e)) return;
      const y = e.touches[0]!.clientY;
      const prev = touchYRef.current;
      touchYRef.current = y;
      if (prev == null) return;
      const deltaY = prev - y;
      const consumed = applyDelta(deltaY);
      if (!consumed && pictureAtEnd() && deltaY > 0) setPageOwns(true);
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
      if (!consumed && pictureAtEnd() && delta > 0) setPageOwns(true);
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

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="sky"
      data-skyspires-hero
      data-skyspires-drive="psave"
      data-product="MS-HERO-SKYS01"
    >
      <img className="sky-scene sky-scene-still" src={SKYSPIRES_POSTER} alt="" />
      <video
        ref={videoRef}
        className="sky-scene"
        src={SKYSPIRES_VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        poster={SKYSPIRES_POSTER}
        aria-hidden
      />
      <div className="sky-veil" />
      <GlassFilter />

      <header className="sky-nav">
        <a className="sky-mark" href="#hero">
          <span>{BRAND}</span>
        </a>
        <nav className="sky-links" aria-label="Primary">
          {NAV.map((item) => (
            <span key={item.id} className="sky-link-wrap">
              <button
                className={`sky-link${"current" in item && item.current ? " is-current" : ""}`}
                type="button"
                aria-expanded={item.id === "process" ? processOpen : undefined}
                onClick={() => item.id === "process" && setProcessOpen((v) => !v)}
              >
                {item.label}
                {"menu" in item && item.menu && (
                  <ChevronDown size={11} strokeWidth={2} />
                )}
              </button>
              {item.id === "process" && processOpen && (
                <div className="sky-menu lg" role="menu">
                  <span className="lg-fill" />
                  <span className="lg-spec" />
                  <div className="lg-body">
                    <button type="button">Academy</button>
                    <button type="button">Fellows</button>
                    <button type="button">Workshops</button>
                  </div>
                </div>
              )}
            </span>
          ))}
          <button
            className="sky-icon"
            type="button"
            aria-label="Search"
            onClick={() => setQuery((v) => !v)}
          >
            <Search size={15} strokeWidth={1.7} />
          </button>
        </nav>
        <div className="sky-auth">
          <button className="sky-signup" type="button">
            Sign Up
          </button>
          <button className="sky-login" type="button">
            <span className="lg-fill" />
            <span className="lg-spec" />
            <span className="lg-body">Log In</span>
          </button>
        </div>
      </header>

      {query && (
        <div className="sky-search lg">
          <span className="lg-fill" />
          <span className="lg-spec" />
          <input
            className="lg-body"
            autoFocus
            placeholder="Search SkySpires"
            aria-label="Search"
          />
        </div>
      )}

      <section className="sky-copy">
        <p className="sky-kicker">
          <Sparkle size={11} strokeWidth={1.8} />
          {HERO.kicker}
        </p>
        <h1 className="sky-title">
          <span>{HERO.line1}</span>
          <span>
            {HERO.line2} <em>{HERO.accent}</em>
          </span>
        </h1>
        <p className="sky-body">{HERO.body}</p>
        <div className="sky-actions">
          <button className="sky-cta" type="button">
            <span className="sky-cta-pulse">
              <span className="lg-fill" />
              <span className="lg-spec" />
              <span className="sky-cta-glimmer" aria-hidden="true" />
              <span className="sky-cta-topline" aria-hidden="true" />
              <Trace timed pill />
              <span className="lg-body">
                {HERO.cta}
                <i className="sky-cta-go" aria-hidden="true">
                  <ArrowRight size={16} strokeWidth={1.8} />
                </i>
              </span>
            </span>
          </button>
          <button className="sky-ghost" type="button">
            {HERO.secondary}
          </button>
        </div>
      </section>

      <aside
        className={`sky-stats lg${gauge ? " is-gauge" : ""}`}
        aria-label="Studio metrics"
      >
        <span className="lg-fill" />
        <span className="lg-spec" />
        <span className="sky-stats-rim" />
        <span className="sky-edge sky-edge-l" />
        <span className="sky-edge sky-edge-r" />
        <div className="lg-body">
          <div className="sky-stats-list">
            {STATS.map((s) => (
              <div key={s.label} className="sky-stat">
                <span className="sky-stat-ico">
                  {s.icon === "chart" ? (
                    <ChartLine size={18} strokeWidth={1.6} />
                  ) : s.icon === "people" ? (
                    <UsersRound size={18} strokeWidth={1.6} />
                  ) : (
                    <Orb />
                  )}
                </span>
                <strong>{s.value}</strong>
                <small>{s.label}</small>
              </div>
            ))}
          </div>
          <div className="sky-stats-gauge">
            <div className="sky-ring">
              <span className="sky-ring-disc" />
              <svg viewBox="0 0 120 120" aria-hidden="true">
                <defs>
                  <filter
                    id="gold-glow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="1.4" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle cx="60" cy="60" r="48" />
                <g className="sky-ring-spin">
                  <circle
                    className="sky-ring-glow"
                    cx="60"
                    cy="60"
                    r="49"
                    filter="url(#gold-glow)"
                  />
                </g>
              </svg>
              <div className="sky-ring-num">
                <strong>{GAUGE.rings[ring].value}</strong>
                <small>{GAUGE.rings[ring].caption}</small>
              </div>
            </div>
            <p className="sky-open">
              <i aria-hidden="true" />
              {GAUGE.open}
            </p>
            <ul className="sky-facts">
              {GAUGE.facts.map((f) => (
                <li key={f.k}>
                  <span>{f.k}</span>
                  <strong>{f.v}</strong>
                </li>
              ))}
            </ul>
            <div className="sky-path" aria-hidden="true">
              {GAUGE.path.map((step, i) => (
                <span key={step} className="sky-path-node">
                  {i > 0 && <b />}
                  <em />
                  <small>{step}</small>
                </span>
              ))}
            </div>
            <div className="sky-studio">
              <span>
                Studio open · {GAUGE.city}
                {studioTime ? ` ${studioTime}` : ""}
              </span>
              <span>{GAUGE.next}</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="sky-rail lg">
        <span className="lg-fill" />
        <span className="lg-spec" />
        <span className="sky-sheen" aria-hidden="true" />
        <Trace />
        <div className="lg-body sky-steps">
          {STEPS.map((s, i) => (
            <div key={s.id} className="sky-step-slot">
              {i > 0 && <i className="sky-chev" aria-hidden="true" />}
              <button type="button" className="sky-step">
                <span className="sky-step-ico">
                  {i === 0 ? (
                    <Sunburst />
                  ) : i === 1 ? (
                    <FilePenLine size={18} strokeWidth={1.65} />
                  ) : i === 2 ? (
                    <CodeXml size={18} strokeWidth={1.65} />
                  ) : (
                    <Rocket size={18} strokeWidth={1.65} />
                  )}
                </span>
                <span className="sky-step-copy">
                  <strong>
                    {s.title}
                    {i === 3 && (
                      <Sparkle
                        size={11}
                        strokeWidth={1.8}
                        className="sky-sparkle"
                      />
                    )}
                  </strong>
                  <small>{s.body}</small>
                </span>
                <em className="sky-step-n">{s.n}</em>
              </button>
            </div>
          ))}
        </div>
      </div>

      <p className="sky-scroll">
        Scroll to explore
        <ChevronDown className="sky-scroll-down" size={16} strokeWidth={1.8} />
      </p>
    </section>
  );
}

function Trace({ timed = false, pill = false }: { timed?: boolean; pill?: boolean }) {
  const box = pill
    ? { view: "0 0 328 67", x: 1.5, y: 1.5, w: 325, h: 64, rx: 32 }
    : { view: "0 0 1400 130", x: 2, y: 2, w: 1396, h: 126, rx: 28 };
  return (
    <svg
      className={`sky-trace${timed ? " is-timed" : ""}`}
      viewBox={box.view}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect className="sky-trace-tip" x={box.x} y={box.y} width={box.w} height={box.h} rx={box.rx} pathLength="1000" />
      <rect className="sky-trace-soft" x={box.x} y={box.y} width={box.w} height={box.h} rx={box.rx} pathLength="1000" />
      <rect className="sky-trace-mid" x={box.x} y={box.y} width={box.w} height={box.h} rx={box.rx} pathLength="1000" />
      <rect className="sky-trace-core" x={box.x} y={box.y} width={box.w} height={box.h} rx={box.rx} pathLength="1000" />
    </svg>
  );
}

function Sunburst() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        const x1 = (12 + Math.cos(a) * 3.2).toFixed(2);
        const y1 = (12 + Math.sin(a) * 3.2).toFixed(2);
        const x2 = (12 + Math.cos(a) * 9.2).toFixed(2);
        const y2 = (12 + Math.sin(a) * 9.2).toFixed(2);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function GlassFilter() {
  return (
    <svg className="sky-filter" aria-hidden="true">
      <filter id="glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.012" numOctaves="2" seed="92" result="n" />
        <feGaussianBlur in="n" stdDeviation="2" result="b" />
        <feDisplacementMap in="SourceGraphic" in2="b" scale="28" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="trace-gold" x="-30%" y="-80%" width="160%" height="260%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>
  );
}

function Orb() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <radialGradient id="orb" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#f6e7c8" />
          <stop offset="55%" stopColor="#7b6cf6" />
          <stop offset="100%" stopColor="#1c2740" />
        </radialGradient>
      </defs>
      <circle cx="12" cy="12" r="7.2" fill="url(#orb)" />
    </svg>
  );
}
