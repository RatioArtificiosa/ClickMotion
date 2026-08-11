import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clearLenis, createLenis } from "../lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = createLenis();
    document.documentElement.classList.add("lenis", "lenis-smooth");
    lenis.on("scroll", ScrollTrigger.update);
    const onTick = (t: number) => {
      lenis.raf(1000 * t);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      clearLenis(lenis);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return <>{children}</>;
}
