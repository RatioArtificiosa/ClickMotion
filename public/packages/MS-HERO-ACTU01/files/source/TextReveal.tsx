"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { splitChars, splitLines, splitWords } from "./splitFallback";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  split?: "lines" | "words" | "chars";
  start?: string;
  stagger?: number;
  duration?: number;
  delay?: number;
};

export function TextReveal({
  children,
  as: Tag = "div",
  className = "",
  style,
  split = "lines",
  start = "top 85%",
  stagger,
  duration,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1 });
      return;
    }
    const st = stagger ?? (split === "chars" ? 0.02 : 0.09);
    const dur = duration ?? (split === "chars" ? 0.8 : 0.9);
    const original = el.innerHTML;

    let targets: HTMLElement[] = [];
    if (split === "chars") targets = splitChars(el);
    else if (split === "words") targets = splitWords(el);
    else targets = splitLines(el);

    gsap.set(el, { opacity: 1 });
    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.fromTo(
        targets,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: dur,
          ease: "power2.out",
          stagger: st,
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
      gsap.killTweensOf(targets);
      el.innerHTML = original;
    };
  }, [split, start, stagger, duration, delay]);

  return (
    // @ts-expect-error polymorphic
    <Tag ref={ref} className={className} style={{ ...style, opacity: 0 }}>
      {children}
    </Tag>
  );
}
