"use client";

/**
 * Grok Bot - Sphere Las Vegas hero.
 *
 * Dual process: PSAVE + No Scroller (pin-until-complete).
 * HUD art is the official ice liquid-glass stage. CSS loops stay.
 * The Sphere film is the scroll clock: the whole movie plays on scroll.
 *
 * PSAVE - Perfect Scroll Video Engine:
 *   62.5s even Sphere film. Earn 12 viewports (long even film family).
 *   Down plays forward at 1.2x. Up walks live video backward 3 frames.
 *   Release only when the picture arrives at 0 or 1.
 *   HUD sheen, ice trips, marquee, orb spin keep looping.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { BRAND, HERO, HOUSE, NAV, PLACE, PROOFS, THREAD, TICKER } from "./copy";
import "./hero.css";

export const GROKBOT_VIDEO_SRC = "/assets/videos/grokbot-sphere-v1.mp4";

const VIRTUAL_VIEWPORTS = 12;
const PSAVE_RATE = 1.2;
const PSAVE_FRAME = 1 / 25;
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

export default function GrokBotHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchYRef = useRef<number | null>(null);
  const targetProgressRef = useRef(0);
  const progressRef = useRef(0);
  const pageOwnsRef = useRef(false);
  const cueArmedRef = useRef(false);
  const cueTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [showCue, setShowCue] = useState(true);

  const armCueHide = useCallback(() => {
    if (cueArmedRef.current) return;
    cueArmedRef.current = true;
    cueTimerRef.current = setTimeout(() => setShowCue(false), 5000);
  }, []);

  useEffect(() => {
    return () => {
      if (cueTimerRef.current) clearTimeout(cueTimerRef.current);
    };
  }, []);

  const setPageOwns = (owns: boolean) => {
    pageOwnsRef.current = owns;
    const el = sectionRef.current;
    if (el) el.dataset.grokbotOwns = owns ? "page" : "pin";
  };

  const paintPlayheadUi = useCallback((p: number) => {
    const clamped = clamp01(p);
    progressRef.current = clamped;
    const el = sectionRef.current;
    if (el) {
      el.dataset.grokbotPlayhead = clamped.toFixed(3);
      el.dataset.grokbotTarget = targetProgressRef.current.toFixed(3);
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
    const el = sectionRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      el.style.setProperty("--nx", nx.toFixed(4));
      el.style.setProperty("--ny", ny.toFixed(4));
      el.style.setProperty("--mx", `${nx * 100}%`);
      el.style.setProperty("--my", `${ny * 100}%`);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
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
      productId: "MS-HERO-GROK01",
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
    pin.dataset.grokbotDrive = "psave";
    pin.dataset.product = "MS-HERO-GROK01";

    const setDir = (dir: "fwd" | "rev" | "idle") => {
      pin.dataset.grokbotDir = dir;
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
      armCueHide();
      if (deltaPx < 0 && target > playhead) target = playhead;
      if (deltaPx > 0 && target < playhead) target = playhead;
      targetProgressRef.current = clamp01(target + deltaPx / virtualDistance());
      pin.dataset.grokbotTarget = targetProgressRef.current.toFixed(3);
      pin.dataset.grokbotDir = deltaPx > 0 ? "fwd" : "rev";
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
        pin.dataset.grokbotTarget = targetProgressRef.current.toFixed(3);
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
  }, [ready, reduced, paintPlayheadUi, snapPlayhead, armCueHide]);

  useEffect(() => {
    if (!ready || !reduced) return;
    snapPlayhead(0);
  }, [ready, reduced, snapPlayhead]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="gb"
      data-grokbot-hero
      data-grokbot-drive="psave"
      data-product="MS-HERO-GROK01"
    >
      <video
        ref={videoRef}
        className="gb-scene"
        src={GROKBOT_VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="gb-veil" />
      <div className="gb-grain" aria-hidden="true" />
      <div className="gb-spot" aria-hidden="true" />
      <GlassFilter />

      <header className="gb-nav lg lg-thin">
        <span className="lg-fill" />
        <span className="lg-spec" />
        <div className="lg-body gb-nav-row">
          <a className="gb-mark" href="#hero">
            <Orb />
            <span>{BRAND}</span>
          </a>
          <nav className="gb-links" aria-label="Primary">
            {NAV.map((item) => (
              <button key={item.id} className="gb-link" type="button">
                {item.label}
              </button>
            ))}
          </nav>
          <div className="gb-auth">
            <button className="gb-ghost" type="button">
              Sign in
            </button>
            <button className="gb-primary gb-primary-sm" type="button">
              Download
            </button>
          </div>
        </div>
      </header>

      <section className="gb-copy">
        <p className="gb-kicker">
          <i />
          {HERO.kicker}
          <span>{HOUSE}</span>
        </p>
        <h1 className="gb-title">
          <span>{HERO.line1}</span>
          <span className="gb-title-mid">{HERO.line2}</span>
          <em>{HERO.line3}</em>
        </h1>
        <p className="gb-lead">{HERO.lead}</p>
        <div className="gb-actions">
          <button className="gb-primary" type="button">
            {HERO.cta}
            <ArrowUpRight size={16} strokeWidth={1.8} />
            <IceTrace timed pill />
          </button>
          <button className="gb-glass lg lg-thin" type="button">
            <span className="lg-fill" />
            <span className="lg-spec" />
            <span className="lg-body">{HERO.secondary}</span>
          </button>
        </div>
      </section>

      <aside className="gb-float" aria-label="A Grok Bot thread">
        <div className="gb-thread lg lg-heavy">
          <span className="lg-fill lg-refract" />
          <span className="lg-spec" />
          <IceTrace />
          <div className="lg-body">
            <p className="gb-thread-head">
              <Orb small />
              Inbox Bot
              <em>
                <i />
                working
              </em>
            </p>
            <p className="gb-thread-meta">Cloud computer · 24/7</p>
            {THREAD.map((m, i) => (
              <p
                key={i}
                className={`gb-msg is-${m.who}`}
                style={{ animationDelay: `${0.95 + i * 0.32}s` }}
              >
                <span>{m.who === "you" ? "You" : "Bot"}</span>
                {m.text}
              </p>
            ))}
          </div>
        </div>
      </aside>

      <ul className="gb-proofs">
        {PROOFS.map((p, i) => (
          <li
            key={p.k}
            className="lg lg-thin"
            style={{ animationDelay: `${1.2 + i * 0.12}s` }}
          >
            <span className="lg-fill" />
            <span className="lg-spec" />
            <div className="lg-body">
              <strong>{p.k}</strong>
              <small>{p.v}</small>
            </div>
          </li>
        ))}
      </ul>

      <p className="gb-place">{PLACE}</p>

      {showCue && (
        <div className="gb-scroll" aria-hidden="true">
          <span>Scroll</span>
          <i />
        </div>
      )}

      <div className="gb-ticker lg lg-thin" aria-hidden="true">
        <span className="lg-fill" />
        <span className="lg-spec" />
        <div className="lg-body">
          <em>In flight</em>
          <div className="gb-ticker-clip">
            <div className="gb-ticker-track">
              {[...TICKER, ...TICKER].map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IceTrace({ timed = false, pill = false }: { timed?: boolean; pill?: boolean }) {
  const box = pill
    ? { view: "0 0 328 67", x: 1.5, y: 1.5, w: 325, h: 64, rx: 32 }
    : { view: "0 0 420 360", x: 2, y: 2, w: 416, h: 356, rx: 22 };
  return (
    <svg
      className={`gb-trace${timed ? " is-timed" : ""}`}
      viewBox={box.view}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <rect className="gb-trace-tip" x={box.x} y={box.y} width={box.w} height={box.h} rx={box.rx} pathLength="1000" />
      <rect className="gb-trace-soft" x={box.x} y={box.y} width={box.w} height={box.h} rx={box.rx} pathLength="1000" />
      <rect className="gb-trace-mid" x={box.x} y={box.y} width={box.w} height={box.h} rx={box.rx} pathLength="1000" />
      <rect className="gb-trace-core" x={box.x} y={box.y} width={box.w} height={box.h} rx={box.rx} pathLength="1000" />
    </svg>
  );
}

function Orb({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? "gb-orb is-sm" : "gb-orb"} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7.2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2.1" fill="currentColor" />
      <g className="gb-orb-spin">
        <path
          d="M4.8 12h14.4M12 4.8c2.4 2.2 3.6 4.6 3.6 7.2s-1.2 5-3.6 7.2C9.6 17 8.4 14.6 8.4 12s1.2-5 3.6-7.2Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}

function GlassFilter() {
  return (
    <svg className="gb-filter" aria-hidden="true">
      <filter id="lg-chroma" colorInterpolationFilters="sRGB" x="-12%" y="-12%" width="124%" height="124%">
        <feTurbulence type="fractalNoise" baseFrequency="0.007 0.011" numOctaves="2" seed="11" result="n" />
        <feGaussianBlur in="n" stdDeviation="1.15" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="-16" xChannelSelector="R" yChannelSelector="G" result="dispRed" />
        <feColorMatrix
          in="dispRed"
          type="matrix"
          values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
          result="red"
        />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="-20" xChannelSelector="R" yChannelSelector="G" result="dispGreen" />
        <feColorMatrix
          in="dispGreen"
          type="matrix"
          values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
          result="green"
        />
        <feDisplacementMap in="SourceGraphic" in2="map" scale="-24" xChannelSelector="R" yChannelSelector="G" result="dispBlue" />
        <feColorMatrix
          in="dispBlue"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
          result="blue"
        />
        <feBlend in="red" in2="green" mode="screen" result="rg" />
        <feBlend in="rg" in2="blue" mode="screen" result="output" />
        <feGaussianBlur in="output" stdDeviation="0.7" />
      </filter>
      <filter id="trace-amber" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="1.5" />
      </filter>
    </svg>
  );
}
