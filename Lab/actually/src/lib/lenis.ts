import Lenis from "lenis";

let instance: Lenis | null = null;

export function createLenis() {
  const e = new Lenis({ lerp: 0.1, smoothWheel: true });
  instance = e;
  return e;
}

export function getLenis() {
  return instance;
}

export function clearLenis(e: Lenis) {
  if (instance === e) instance = null;
}
