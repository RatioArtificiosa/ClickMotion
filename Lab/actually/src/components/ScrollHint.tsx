import { useEffect, useRef } from "react";
import gsap from "gsap";

export function ScrollHint({ className = "" }: { className?: string }) {
  const dot = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = dot.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 9 });
      return;
    }
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    tl.set(el, { y: 0, opacity: 0 })
      .to(el, { opacity: 1, duration: 0.25, ease: "power1.out" })
      .to(el, { y: 19, duration: 1, ease: "power2.inOut" }, 0.1)
      .to(el, { opacity: 0, duration: 0.3, ease: "power1.in" }, 0.85);
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center gap-3 pointer-events-none ${className}`}
      aria-hidden
    >
      <span className="font-sans text-[11px] uppercase tracking-[0.28em] text-mist">
        Scroll
      </span>
      <span
        className="relative block"
        style={{
          width: 22,
          height: 38,
          border: "1px solid rgba(26, 27, 29, 0.3)",
          borderRadius: 11,
        }}
      >
        <span
          ref={dot}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: 7,
            width: 5,
            height: 5,
            backgroundColor: "#bcd3d8",
            opacity: 0,
          }}
        />
      </span>
    </div>
  );
}
