import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, registerGsap, ScrollTrigger } from "../lib/gsap";

registerGsap();

type Props = { children: ReactNode };

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

    // expose for menu / preloader
    (window as unknown as { __orionLenis?: Lenis }).__orionLenis = lenis;

    // After preloader / vision margin pull, recalculate all triggers
    const refresh = () => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    window.addEventListener("orion-preloader:done", refresh);
    window.addEventListener("load", refresh);
    // Late settle for pin-spacers + keyfacts pull
    const late = window.setTimeout(refresh, 500);
    const later = window.setTimeout(refresh, 1200);

    return () => {
      window.clearTimeout(late);
      window.clearTimeout(later);
      window.removeEventListener("orion-preloader:done", refresh);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      delete (window as unknown as { __orionLenis?: Lenis }).__orionLenis;
    };
  }, []);

  return <>{children}</>;
}

export function getLenis(): Lenis | undefined {
  return (window as unknown as { __orionLenis?: Lenis }).__orionLenis;
}

export function stopScroll() {
  const l = getLenis();
  l?.stop();
  document.documentElement.classList.add("lenis-stopped");
  document.body.style.overflow = "hidden";
}

export function startScroll() {
  const l = getLenis();
  l?.start();
  document.documentElement.classList.remove("lenis-stopped");
  document.body.style.overflow = "";
  ScrollTrigger.refresh();
}
