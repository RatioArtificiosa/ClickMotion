"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger } from "./gsap-register";

registerGsap();

type Props = { children: ReactNode };

/** Lenis ↔ GSAP ScrollTrigger coupling required for pin scrub. */
export function SmoothScroll({ children }: Props) {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      document.documentElement.classList.add("lenis");
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    document.documentElement.classList.add("lenis", "lenis-smooth");
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    (window as unknown as { __msLenis?: Lenis }).__msLenis = lenis;

    const refresh = () => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    window.addEventListener("load", refresh);
    const late = window.setTimeout(refresh, 500);
    const later = window.setTimeout(refresh, 1200);

    return () => {
      window.clearTimeout(late);
      window.clearTimeout(later);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      delete (window as unknown as { __msLenis?: Lenis }).__msLenis;
    };
  }, []);

  return <>{children}</>;
}
