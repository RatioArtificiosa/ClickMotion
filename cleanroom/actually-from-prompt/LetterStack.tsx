"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";

type Props = {
  text: string;
  className?: string;
  letterClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  yOffset?: number;
  style?: CSSProperties;
  highlightChar?: string;
  highlightColor?: string;
  ariaLabel?: string;
  play?: boolean;
  instant?: boolean;
};

export function LetterStack({
  text,
  className = "",
  letterClassName = "",
  delay = 0,
  stagger = 0.03,
  duration = 0.7,
  yOffset = 18,
  style,
  highlightChar,
  highlightColor,
  ariaLabel,
  play = true,
  instant = false,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!play) return;
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const letters = el.querySelectorAll("[data-letter]");
      if (instant) {
        gsap.set(letters, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          letters,
          { opacity: 0, y: yOffset },
          {
            opacity: 1,
            y: 0,
            duration,
            ease: "power2.out",
            stagger,
            delay,
          },
        );
      }
    }, el);
    return () => ctx.revert();
  }, [text, delay, stagger, duration, yOffset, play, instant]);

  return (
    <span ref={ref} className={`inline-block ${className}`} style={style}>
      <span className="sr-only">{ariaLabel ?? text}</span>
      {text.split("").map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          data-letter
          aria-hidden
          className={`inline-block ${letterClassName}`}
          style={{
            opacity: 0,
            ...(highlightChar !== undefined &&
            ch === highlightChar &&
            highlightColor
              ? { color: highlightColor }
              : {}),
          }}
        >
          {ch === " " ? "\u00a0" : ch}
        </span>
      ))}
    </span>
  );
}
