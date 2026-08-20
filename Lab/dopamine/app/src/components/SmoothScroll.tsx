import { useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createLenis, clearLenis } from "../lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const setVh = () => {
      const h = window.innerHeight;
      document.documentElement.style.setProperty("--inner-vh", `${h}px`);
      document.documentElement.style.setProperty("--lvh", `${h}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);

    const lenis = createLenis();
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("resize", setVh);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      clearLenis(lenis);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}
