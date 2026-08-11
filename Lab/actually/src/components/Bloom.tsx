import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  color: string;
  size?: number | string;
  className?: string;
  intensity?: "strong" | "soft";
};

export function Bloom({
  color,
  size = 480,
  className = "",
  intensity = "strong",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = gsap.to(el, {
      scale: 1.05,
      opacity: 1,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });
    return () => {
      t.kill();
    };
  }, []);

  const dim =
    typeof size === "number" ? `${size}px` : size;
  const background =
    intensity === "strong"
      ? `radial-gradient(circle, ${color} 0%, ${color}ee 18%, ${color}b3 35%, ${color}66 55%, ${color}26 75%, ${color}00 92%)`
      : `radial-gradient(circle, ${color} 0%, ${color}cc 20%, ${color}66 45%, ${color}1f 65%, ${color}00 80%)`;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none ${className}`}
      style={{
        width: dim,
        height: dim,
        opacity: intensity === "strong" ? 0.92 : 0.85,
        transform: "scale(0.95)",
        background,
        filter: `blur(${intensity === "strong" ? 2 : 6}px)`,
      }}
    />
  );
}
