"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { splitWords } from "./splitFallback";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  dim?: number;
  start?: string;
  end?: string;
};

/** Word opacity play-once, dim .24, start top 82%, end top 34%. */
export function ScrollIlluminate({
  children,
  as: Tag = "div",
  className = "",
  style,
  dim = 0.24,
  start = "top 82%",
  end = "top 34%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const original = el.innerHTML;
    let words: HTMLElement[] = [];
    try {
      // Prefer Club SplitText when present
      // @ts-expect-error optional club plugin
      const SplitText = gsap.core?.globals?.()?.SplitText;
      if (SplitText) {
        const split = SplitText.create(el, { type: "words", aria: "none" });
        words = split.words as HTMLElement[];
      } else {
        words = splitWords(el);
      }
    } catch {
      el.innerHTML = original;
      words = splitWords(el);
    }

    gsap.set(words, { opacity: dim });
    gsap.set(el, { opacity: 1 });
    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.to(words, {
        opacity: 1,
        ease: "none",
        duration: 1,
        stagger: 0.35,
        overwrite: "auto",
      });
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        play();
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      gsap.killTweensOf(words);
      el.innerHTML = original;
    };
  }, [dim, start, end]);

  return (
    // @ts-expect-error polymorphic
    <Tag ref={ref} className={className} style={{ ...style, opacity: 0 }}>
      {children}
    </Tag>
  );
}
