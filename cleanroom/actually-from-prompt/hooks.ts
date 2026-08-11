import { useEffect, useState } from "react";

const MOBILE = "(max-width: 767px)";

export function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(MOBILE).matches : false,
  );
  useEffect(() => {
    const m = window.matchMedia(MOBILE);
    const on = () => setMobile(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return mobile;
}

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduce;
}

export function canvasDpr(): [number, number] {
  if (typeof window === "undefined") return [1, 2];
  return window.matchMedia(MOBILE).matches ? [1, 1.5] : [1, 2];
}
