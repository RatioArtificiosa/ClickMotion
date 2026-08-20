"use client";

/**
 * ACNE SECRET - Sabri Suby-class HVCO lead-capture hero
 *
 * 0-15s: film centered ~50% viewport width over dark frosted blur
 * @15s: film docks left; lead-capture stack right (all above the fold)
 * Muted autoplay. Brand locked until email (demo unlock).
 * Optional QA: window.__MS_CAPTURE_CLOCK + ms-acne-force-dock (storefront burns).
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Lock, ShieldCheck, Sparkles, Zap } from "lucide-react";

export const ACNE_VIDEO_SRC = "/assets/videos/acne-secret-v1.webm";
export const ACNE_POSTER_SRC = "/assets/posters/acne-secret-v1.webp";

const CINEMA_S = 15;
/** Matches Framer dock ease duration on film frame */
const DOCK_S = 1.05;
const FORM_DELAY_S = 0.25;
const FORM_DUR_S = 0.85;
const DOCK_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
const EASE_SOFT: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/** Synthetic demo brand — not a real medical product. */
const DEMO_BRAND = "AETHERA CLEAR";

const BULLETS = [
  "The brand name the shelves will not print for free",
  "The Private Clear Skin Brief - tactical, not fluff",
  "How the quiet protocol actually gets into your hands",
] as const;

const displayFont: CSSProperties = {
  fontFamily:
    "var(--font-acne-display), Inter, ui-sans-serif, system-ui, sans-serif",
};

const bodyFont: CSSProperties = {
  fontFamily:
    "var(--font-acne-body), Inter, ui-sans-serif, system-ui, sans-serif",
};

/** CSS cubic-bezier Y at progress x∈[0,1] (same curve Framer uses for ease). */
function cubicBezierY(
  x: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const bez = (t: number, a: number, b: number) => {
    const u = 1 - t;
    return 3 * u * u * t * a + 3 * u * t * t * b + t * t * t;
  };
  const dbez = (t: number, a: number, b: number) => {
    const u = 1 - t;
    return 3 * u * u * a + 6 * u * t * (b - a) + 3 * t * t * (1 - b);
  };
  let t = x;
  for (let i = 0; i < 10; i++) {
    const dx = bez(t, x1, x2) - x;
    if (Math.abs(dx) < 1e-6) break;
    const d = dbez(t, x1, x2);
    if (Math.abs(d) < 1e-6) break;
    t = Math.max(0, Math.min(1, t - dx / d));
  }
  return bez(t, y1, y2);
}

const FILM_CINEMA = {
  left: "50%",
  top: "52%",
  x: "-50%",
  y: "-50%",
  width: "50vw",
  maxWidth: 720,
  height: "min(56dvh, 520px)",
  borderRadius: 20,
} as const;

const FILM_DOCKED = {
  left: "4%",
  top: "50%",
  x: "0%",
  y: "-50%",
  width: "44%",
  maxWidth: 640,
  height: "min(70dvh, 620px)",
  borderRadius: 18,
} as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Interpolate film pose; width/height stay CSS strings at endpoints, mid uses eased mix via maxWidth + %. */
function filmPoseAt(eased: number) {
  const t = Math.max(0, Math.min(1, eased));
  if (t <= 0) return { ...FILM_CINEMA };
  if (t >= 1) return { ...FILM_DOCKED };
  // left: 50% → 4%; x: -50% → 0%; top: 52% → 50%
  return {
    left: `${lerp(50, 4, t)}%`,
    top: `${lerp(52, 50, t)}%`,
    x: `${lerp(-50, 0, t)}%`,
    y: "-50%",
    width: `${lerp(50, 44, t)}vw`,
    maxWidth: Math.round(lerp(720, 640, t)),
    height: `min(${lerp(56, 70, t)}dvh, ${Math.round(lerp(520, 620, t))}px)`,
    borderRadius: lerp(20, 18, t),
  };
}

type Phase = "cinema" | "docked";

export default function AcneSecretHero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const startedAtRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<Phase>("cinema");
  const [progress, setProgress] = useState(0);
  /** Capture-only: linear 0→1 across DOCK_S after CINEMA_S. null = live Framer path. */
  const [captureDockLinear, setCaptureDockLinear] = useState<number | null>(
    null,
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    if (reduceMotion) {
      setPhase("docked");
      setProgress(1);
      setCaptureDockLinear(null);
    }
  }, [reduceMotion]);

  // Optional QA: force dock without waiting 15s (storefront burns / local preview)
  useEffect(() => {
    const force = () => {
      setPhase("docked");
      setProgress(1);
      setCaptureDockLinear(1);
    };
    window.addEventListener("ms-acne-force-dock", force);
    if (window.__MS_ACNE_FORCE_DOCK) force();
    return () => window.removeEventListener("ms-acne-force-dock", force);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const apply = () => setNarrow(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // On narrow screens, don't force long cinema hold for usability
  useEffect(() => {
    if (narrow && !reduceMotion) {
      // Still show a short beat then dock
      const t = window.setTimeout(() => {
        setPhase("docked");
        setProgress(1);
      }, 2800);
      return () => window.clearTimeout(t);
    }
  }, [narrow, reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    if (reduceMotion) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
      return;
    }

    const tryPlay = () => void video.play().catch(() => {});
    tryPlay();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold: 0.1 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || narrow) return;

    let raf = 0;
    const tick = () => {
      // Optional QA clock: drive presentation time from __MS_CAPTURE_CLOCK so
      // burns get exact 15s cinema + scrubbed dock ease (not wall-time Framer).
      const captureClock = window.__MS_CAPTURE_CLOCK;
      const capturing =
        typeof captureClock === "number" && Number.isFinite(captureClock);

      let t: number;
      if (capturing) {
        t = Math.max(0, captureClock as number);
      } else {
        if (startedAtRef.current == null) {
          startedAtRef.current = performance.now();
        }
        const wall = (performance.now() - startedAtRef.current) / 1000;
        const v = videoRef.current;
        const vt =
          v && Number.isFinite(v.currentTime) && v.currentTime > 0.15
            ? v.currentTime
            : 0;
        t = Math.max(wall, vt);
      }

      if (capturing) {
        if (t < CINEMA_S) {
          setPhase("cinema");
          setProgress(Math.min(1, t / CINEMA_S));
          setCaptureDockLinear(0);
        } else {
          const linear = Math.min(1, (t - CINEMA_S) / DOCK_S);
          setPhase("docked");
          setProgress(1);
          setCaptureDockLinear(linear);
        }
        // Keep polling capture clock until unmounted (script advances it each frame)
        raf = requestAnimationFrame(tick);
        return;
      }

      // Live free-play path
      setCaptureDockLinear(null);
      const p = Math.min(1, t / CINEMA_S);
      setProgress(p);
      if (t >= CINEMA_S) {
        setPhase("docked");
        setProgress(1);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, narrow]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      const n = name.trim();
      const em = email.trim();
      if (n.length < 2) {
        setError("Drop your first name so we know who to unlock this for.");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
        setError("That email does not look real. Fix it and hit the button.");
        return;
      }
      setSubmitting(true);
      window.setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
      }, 720);
    },
    [name, email],
  );

  const scrubbing = captureDockLinear != null;
  const dockEased =
    scrubbing && captureDockLinear != null
      ? cubicBezierY(
          captureDockLinear,
          DOCK_EASE[0],
          DOCK_EASE[1],
          DOCK_EASE[2],
          DOCK_EASE[3],
        )
      : null;
  // Form: delay 0.25s then 0.85s ease (matches Framer transition)
  const formLinear =
    scrubbing && captureDockLinear != null
      ? Math.max(
          0,
          Math.min(1, (captureDockLinear * DOCK_S - FORM_DELAY_S) / FORM_DUR_S),
        )
      : null;
  const formEased =
    formLinear != null
      ? cubicBezierY(
          formLinear,
          EASE_SOFT[0],
          EASE_SOFT[1],
          EASE_SOFT[2],
          EASE_SOFT[3],
        )
      : null;

  // Live cinema only when not scrubbing mid-dock; capture keeps overlay until dock starts
  const isCinema =
    phase === "cinema" && !reduceMotion && !narrow && !scrubbing
      ? true
      : scrubbing
        ? (captureDockLinear ?? 0) <= 0
        : phase === "cinema" && !reduceMotion && !narrow;

  const filmLive = isCinema ? { ...FILM_CINEMA } : { ...FILM_DOCKED };
  const filmScrub = dockEased != null ? filmPoseAt(dockEased) : filmLive;
  // QA scrub: drive layout via CSS style so intermediate dock poses are exact.
  const filmScrubStyle: CSSProperties | undefined =
    scrubbing && dockEased != null
      ? {
          left: filmScrub.left,
          top: filmScrub.top,
          width: filmScrub.width,
          maxWidth: filmScrub.maxWidth,
          height: filmScrub.height,
          borderRadius: filmScrub.borderRadius,
          transform: `translate(${filmScrub.x}, ${filmScrub.y})`,
        }
      : undefined;

  const formScrubStyle: CSSProperties | undefined =
    scrubbing && formEased != null
      ? {
          opacity: formEased,
          transform: `translate3d(${lerp(48, 0, formEased)}px, -50%, 0)`,
          pointerEvents: formEased > 0.5 ? "auto" : "none",
        }
      : undefined;

  const formLiveAnimate = isCinema
    ? {
        opacity: 0,
        x: 48,
        y: "-50%",
        pointerEvents: "none" as const,
      }
    : {
        opacity: 1,
        x: 0,
        y: "-50%",
        pointerEvents: "auto" as const,
      };

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden bg-[#070708] text-[#f4f1ea]"
      style={bodyFont}
      aria-label="Private clear skin brand reveal lead capture"
      data-ms-capture-dock={
        scrubbing
          ? String(Math.round((captureDockLinear ?? 0) * 1000) / 1000)
          : phase === "docked"
            ? "1"
            : "0"
      }
    >
      {/* Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,197,24,0.08) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 85% 75%, rgba(180,40,40,0.09) 0%, transparent 50%),
            linear-gradient(180deg, #050506 0%, #0c0c0e 50%, #080809 100%)
          `,
        }}
      />

      {/* Dark transparent blur plate behind film */}
      <div
        className="pointer-events-none absolute inset-0 backdrop-blur-[32px] transition-[background] duration-1000"
        style={{
          background: isCinema ? "rgba(4,4,6,0.78)" : "rgba(4,4,6,0.42)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden
      />

      {/* Top chrome */}
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 sm:px-8 md:px-12">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#f5c518]/35 bg-[#f5c518]/10 text-[#f5c518]">
              <Lock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </span>
            <span
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f4f1ea]/55"
              style={displayFont}
            >
              Private briefing
            </span>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f4f1ea]/5">
            Brand name locked
          </span>
        </div>
        {isCinema && (
          <div className="h-[2px] w-full overflow-hidden bg-white/[0.06]">
            <div
              className="h-full origin-left bg-gradient-to-r from-[#f5c518] via-[#ffb020] to-[#e85d4c]"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        )}
      </header>

      {/* ===== SINGLE film (desktop absolute / mobile stacked shell) ===== */}
      {narrow ? (
        <div className="relative z-20 flex h-full flex-col px-4 pb-5 pt-16">
          <div
            className="relative mx-auto w-full max-w-md shrink-0 overflow-hidden rounded-2xl"
            style={{
              height: "min(34dvh, 260px)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(245,197,24,0.15)",
            }}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={ACNE_VIDEO_SRC}
              poster={ACNE_POSTER_SRC}
              autoPlay={!reduceMotion}
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: "inset 0 0 70px rgba(0,0,0,0.4)" }}
              aria-hidden
            />
          </div>
          <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
            <LeadStack
              displayFont={displayFont}
              name={name}
              email={email}
              setName={setName}
              setEmail={setEmail}
              error={error}
              submitted={submitted}
              submitting={submitting}
              onSubmit={onSubmit}
              compact
            />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-20">
          {(() => {
            const filmShadow =
              isCinema || (scrubbing && (captureDockLinear ?? 0) < 0.5)
                ? "0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(245,197,24,0.2), 0 0 90px rgba(245,197,24,0.1)"
                : "0 28px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08)";
            const filmInner = (
              <>
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  src={ACNE_VIDEO_SRC}
                  poster={ACNE_POSTER_SRC}
                  autoPlay={!reduceMotion}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ boxShadow: "inset 0 0 70px rgba(0,0,0,0.4)" }}
                  aria-hidden
                />
                <AnimatePresence>
                  {isCinema && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-6 pb-5 pt-16"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#f5c518]">
                        Warning · confidential protocol
                      </p>
                      <p
                        className="mt-1.5 text-[16px] font-semibold text-white sm:text-[18px]"
                        style={displayFont}
                      >
                        The brand is hidden on purpose.
                      </p>
                      <p className="mt-1 text-[12px] text-white/55">
                        Hold{" "}
                        {Math.max(0, Math.ceil(CINEMA_S * (1 - progress)))}
                        s — then the machine docks.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            );
            // QA scrub path: plain div + CSS pose (Framer would own transform).
            if (scrubbing && filmScrubStyle) {
              return (
                <div
                  className="absolute overflow-hidden"
                  style={{ ...filmScrubStyle, boxShadow: filmShadow }}
                >
                  {filmInner}
                </div>
              );
            }
            return (
              <motion.div
                className="absolute overflow-hidden"
                initial={false}
                animate={filmLive}
                transition={{
                  duration: reduceMotion ? 0 : DOCK_S,
                  ease: DOCK_EASE,
                }}
                style={{ boxShadow: filmShadow }}
              >
                {filmInner}
              </motion.div>
            );
          })()}

          {scrubbing && formScrubStyle ? (
            <div
              className="absolute top-1/2 right-[4%] w-[min(28rem,42%)]"
              style={formScrubStyle}
            >
              <LeadStack
                displayFont={displayFont}
                name={name}
                email={email}
                setName={setName}
                setEmail={setEmail}
                error={error}
                submitted={submitted}
                submitting={submitting}
                onSubmit={onSubmit}
              />
            </div>
          ) : (
            <motion.div
              className="absolute top-1/2 right-[4%] w-[min(28rem,42%)]"
              initial={false}
              animate={formLiveAnimate}
              transition={{
                duration: reduceMotion ? 0 : FORM_DUR_S,
                delay: reduceMotion ? 0 : FORM_DELAY_S,
                ease: EASE_SOFT,
              }}
            >
              <LeadStack
                displayFont={displayFont}
                name={name}
                email={email}
                setName={setName}
                setEmail={setEmail}
                error={error}
                submitted={submitted}
                submitting={submitting}
                onSubmit={onSubmit}
              />
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}

function LeadStack({
  displayFont,
  name,
  email,
  setName,
  setEmail,
  error,
  submitted,
  submitting,
  onSubmit,
  compact,
}: {
  displayFont: CSSProperties;
  name: string;
  email: string;
  setName: (v: string) => void;
  setEmail: (v: string) => void;
  error: string | null;
  submitted: boolean;
  submitting: boolean;
  onSubmit: (e: FormEvent) => void;
  compact?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f5c518]/30 bg-[#f5c518]/10 px-3 py-1.5">
        <Zap className="h-3.5 w-3.5 text-[#f5c518]" aria-hidden />
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#f5c518]">
          Breaking · clear skin market
        </span>
      </div>

      <h1
        className={`text-balance font-bold leading-[1.05] tracking-[-0.03em] text-[#faf8f2] ${
          compact
            ? "text-[1.55rem]"
            : "text-[clamp(1.85rem,3.2vw,2.75rem)]"
        }`}
        style={displayFont}
      >
        WARNING: The clear-skin brand they hide from you is{" "}
        <span className="text-[#f5c518]">not on the shelf label.</span>
      </h1>

      <p
        className={`mt-3 max-w-md leading-relaxed text-[#f4f1ea]/68 ${
          compact ? "text-[13px]" : "text-[15px] sm:text-[16px]"
        }`}
      >
        Right now, as you read this, most people are stuck in hope marketing for
        their skin - random creams, random promises.{" "}
        <strong className="font-semibold text-[#f4f1ea]/9">We reverse it.</strong>{" "}
        Drop your email. Steal the free{" "}
        <span className="text-[#f5c518]">Private Clear Skin Brief</span> and
        unlock the brand name they will not put in an ad.
      </p>

      <ul className={`mt-4 space-y-2 ${compact ? "mt-3" : "mt-5"}`}>
        {BULLETS.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2.5 text-[12.5px] text-[#f4f1ea]/75 sm:text-[13px]"
          >
            <Sparkles
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#f5c518]"
              strokeWidth={2}
              aria-hidden
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-3"
              noValidate
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f4f1ea]/4">
                    First name
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3.5 text-[15px] text-[#faf8f2] outline-none transition placeholder:text-white/25 focus:border-[#f5c518]/45 focus:ring-2 focus:ring-[#f5c518]/25"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f4f1ea]/4">
                    Email
                  </span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.06] px-3.5 text-[15px] text-[#faf8f2] outline-none transition placeholder:text-white/25 focus:border-[#f5c518]/45 focus:ring-2 focus:ring-[#f5c518]/25"
                  />
                </label>
              </div>

              {error && (
                <p className="text-[12px] font-medium text-[#ff8a7a]" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="group relative flex h-[52px] w-full items-center justify-center overflow-hidden rounded-xl bg-[#f5c518] text-[13px] font-bold uppercase tracking-[0.12em] text-[#12110c] shadow-[0_12px_40px_rgba(245,197,24,0.35)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c518]/60 disabled:opacity-70 sm:text-[14px]"
              >
                <span className="relative z-10">
                  {submitting ? "Unlocking…" : "Unlock the brand name free"}
                </span>
              </button>

              <p className="flex items-start gap-2 text-[11px] leading-snug text-[#f4f1ea]/4">
                <ShieldCheck
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#f4f1ea]/35"
                  aria-hidden
                />
                Instant brand unlock + Private Clear Skin Brief.
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE_SOFT }}
              className="rounded-2xl border border-[#f5c518]/35 bg-[#f5c518]/10 p-5"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#f5c518]">
                Boom. Unlocked.
              </p>
              <p
                className="mt-2 text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-tight text-[#faf8f2]"
                style={displayFont}
              >
                {DEMO_BRAND}
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-[#f4f1ea]/7">
                Brand name delivered. Your Private Clear Skin Brief is ready in
                this demo unlock.
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-[#f4f1ea]/4">
                ***synthetic demo brand — not a medical product claim***
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
