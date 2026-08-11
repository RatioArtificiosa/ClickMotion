"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitWords } from "./splitFallback";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  dim?: number;
  start?: string;
  end?: string;
};

/** Word opacity scrub — dim .24, start top 82%, end top 34%. */
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
    const tw = gsap.to(words, {
      opacity: 1,
      ease: "none",
      duration: 1,
      stagger: 0.35,
      scrollTrigger: { trigger: el, start, end, scrub: true },
    });

    return () => {
      tw.scrollTrigger?.kill();
      tw.kill();
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
