import Lenis from "lenis";

let instance: Lenis | null = null;

export function createLenis() {
  const e = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
  });
  instance = e;
  if (typeof window !== "undefined") {
    (window as unknown as { lenis?: Lenis }).lenis = e;
  }
  return e;
}

export function getLenis() {
  return instance;
}

export function clearLenis(e: Lenis) {
  if (instance === e) instance = null;
  if (typeof window !== "undefined") {
    const w = window as unknown as { lenis?: Lenis };
    if (w.lenis === e) delete w.lenis;
  }
}
