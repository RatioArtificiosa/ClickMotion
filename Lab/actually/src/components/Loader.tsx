import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { getLenis } from "../lib/lenis";

const CLEAR = "#bcd3d8";
const INK = "#1a1b1d";
const TRACK = "rgba(26, 27, 29, 0.12)";

const POPS = [
  { text: "L-Theanine 200 mg", x: "14%", y: "20%", size: 18, tone: "ink" as const },
  { text: "Caffeine-free", x: "74%", y: "16%", size: 13, tone: "mist" as const },
  { text: "Lion's Mane 500 mg", x: "18%", y: "72%", size: 15, tone: "ink" as const },
  { text: "New York City", x: "68%", y: "78%", size: 13, tone: "mist" as const },
  { text: "1,150 mg blend", x: "42%", y: "42%", size: 16, tone: "ink" as const },
];

type Props = {
  onReveal: () => void;
  assetsReady?: boolean;
};

/**
 * Bone curtain z-100 + FLIP wordmark into #hero h1.
 * Timeouts: soft 2200 (400 reduce), hard 9000, assets+2500.
 */
export function Loader({ onReveal, assetsReady = true }: Props) {
  const curtain = useRef<HTMLDivElement>(null);
  const wordmark = useRef<HTMLDivElement>(null);
  const popsRoot = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);
  const soft = useRef(false);
  const hard = useRef(false);
  const revealed = useRef(false);
  const reduce = useRef(false);
  const progress = useRef({ val: 0 });

  useEffect(() => setMounted(true), []);

  const reveal = useCallback(() => {
    if (revealed.current) return;
    revealed.current = true;
    const t = curtain.current;
    if (!t) {
      onReveal();
      setDone(true);
      return;
    }
    if (reduce.current) {
      onReveal();
      gsap.to(t, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => setDone(true),
      });
      return;
    }

    const n = gsap.timeline({ onComplete: () => setDone(true) });
    if (wordmark.current) {
      n.fromTo(
        wordmark.current,
        { y: "-0.6em", opacity: 0 },
        { y: "0em", opacity: 1, duration: 0.45, ease: "power2.out" },
      );
    }
    n.to({}, { duration: 0.4 });
    n.call(() => {
      soft.current = true;
      onReveal();
    });

    const r = wordmark.current?.parentElement;
    const i = document.querySelector("#hero h1") as HTMLElement | null;
    const a = window.matchMedia("(min-width: 768px)").matches;
    if (r && i && a) {
      n.call(() => {
        const e = r.getBoundingClientRect();
        const t = i.getBoundingClientRect();
        const scale = t.width / e.width;
        const x = t.left + t.width / 2 - (e.left + e.width / 2);
        const y = t.top + t.height / 2 - (e.top + e.height / 2);
        gsap.set(r, { transformOrigin: "50% 50%" });
        gsap.to(r, { x, y, scale, duration: 0.9, ease: "power3.inOut" });
      });
      n.to({}, { duration: 0.9 });
      n.to(t, { opacity: 0, duration: 0.35, ease: "power1.out" }, "-=0.35");
    } else {
      if (r) n.to(r, { scale: 1.6, duration: 0.55, ease: "power2.in" });
      n.to(t, { opacity: 0, duration: 0.5, ease: "power1.inOut" }, "<");
    }
  }, [onReveal]);

  const maybeReveal = useCallback(() => {
    if (soft.current && hard.current) reveal();
  }, [reveal]);

  // lock scroll while loading
  useEffect(() => {
    if (done) return;
    getLenis()?.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    window.addEventListener("wheel", block, { passive: false, capture: true });
    window.addEventListener("touchmove", block, { passive: false, capture: true });
    const id = window.setInterval(() => getLenis()?.stop(), 150);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("wheel", block, true);
      window.removeEventListener("touchmove", block, true);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [done]);

  // timeouts
  useEffect(() => {
    window.scrollTo(0, 0);
    reduce.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const softMs = reduce.current ? 400 : 2200;
    const t1 = window.setTimeout(() => {
      soft.current = true;
      maybeReveal();
    }, softMs);
    const t2 = window.setTimeout(() => {
      soft.current = true;
      hard.current = true;
      reveal();
    }, 9000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [maybeReveal, reveal]);

  // assets ready
  useEffect(() => {
    if (!assetsReady) return;
    const t = window.setTimeout(() => {
      hard.current = true;
      maybeReveal();
    }, 2500);
    return () => window.clearTimeout(t);
  }, [assetsReady, maybeReveal]);

  // pop labels
  useEffect(() => {
    if (done || reduce.current) return;
    const root = popsRoot.current;
    if (!root) return;
    const nodes = root.querySelectorAll("[data-pop]");
    if (!nodes.length) return;
    const ctx = gsap.context(() => {
      gsap.set(nodes, { opacity: 0, scale: 0.55 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3, delay: 0.5 });
      nodes.forEach((node, i) => {
        const at = 0.42 * i;
        tl.fromTo(
          node,
          {
            opacity: 0,
            scale: 0.55,
            y: 10,
            rotation: i % 2 === 0 ? -3.5 : 3.5,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: 0,
            filter: "blur(0px)",
            duration: 0.45,
            ease: "back.out(1.6)",
            force3D: true,
          },
          at,
        )
          .to(
            node,
            { y: -6, duration: 0.95, ease: "sine.inOut", force3D: true },
            at + 0.45,
          )
          .to(
            node,
            {
              opacity: 0,
              y: -18,
              scale: 0.94,
              filter: "blur(5px)",
              duration: 0.32,
              ease: "power2.in",
              force3D: true,
            },
            at + 1.4,
          );
      });
    }, root);
    return () => ctx.revert();
  }, [done, mounted]);

  // fake progress 0→100
  useEffect(() => {
    if (done) return;
    const target = assetsReady ? 100 : 72;
    const tw = gsap.to(progress.current, {
      val: target,
      duration: 0.4 + (target - progress.current.val) / 100 * 1.2,
      ease: "power2.out",
      overwrite: true,
      onUpdate: () => {
        const v = progress.current.val;
        if (bar.current && !reduce.current) {
          bar.current.style.backgroundImage = `linear-gradient(90deg, ${INK} 0%, ${INK} ${v}%, ${TRACK} ${v}%)`;
        }
        if (pct.current) {
          pct.current.textContent = String(Math.round(v)).padStart(3, "0");
        }
      },
    });
    return () => {
      tw.kill();
    };
  }, [assetsReady, done]);

  if (done) return null;
  if (!mounted) {
    return <div aria-hidden className="fixed inset-0 z-[100] bg-bone" />;
  }

  return createPortal(
    <div
      ref={curtain}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-[100] bg-bone"
    >
      <div ref={popsRoot} aria-hidden className="absolute inset-0">
        {POPS.map((p) => (
          <span
            key={p.text}
            data-pop
            className={`absolute flex items-center whitespace-nowrap font-sans uppercase ${
              p.tone === "ink" ? "text-ink" : "text-mist"
            }`}
            style={{
              left: p.x,
              top: p.y,
              fontSize: p.size,
              letterSpacing: "0.12em",
              fontWeight: 500,
            }}
          >
            {p.text}
          </span>
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div ref={wordmark} className="relative" style={{ opacity: 0 }}>
          <div
            className="font-wordmark text-ink leading-none inline-flex items-baseline"
            style={{ fontSize: "clamp(42px, 8vw, 72px)", fontWeight: 900, letterSpacing: "-0.03em" }}
          >
            <span>ACTUALLY</span>
            <span
              aria-hidden
              className="inline-block bg-alpine align-baseline"
              style={{ width: 10, height: 10, marginLeft: 4 }}
            />
          </div>
        </div>

        <div className="mt-10 w-[min(280px,60vw)]">
          <div
            ref={bar}
            className="h-px w-full"
            style={{
              backgroundImage: `linear-gradient(90deg, ${INK} 0%, ${TRACK} 0%)`,
            }}
          />
          <div className="mt-3 flex justify-between font-sans text-[10px] tracking-[0.28em] uppercase text-mist">
            <span>Loading</span>
            <span ref={pct} className="tabular-nums text-ink">
              000
            </span>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-[0.28em] uppercase text-mist"
      >
        Really. Actually.
      </div>
    </div>,
    document.body,
  );
}
