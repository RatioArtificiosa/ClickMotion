"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/** Simple fade-up. Not word scrub. */
export function ScrollReveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }
    const play = () => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay,
          overwrite: "auto",
        },
      );
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        play();
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      gsap.killTweensOf(el);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: "translateY(12px)" }}
    >
      {children}
    </div>
  );
}
