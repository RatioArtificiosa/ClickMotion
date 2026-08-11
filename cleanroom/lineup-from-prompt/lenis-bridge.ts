/** Read Lenis from window (set by SmoothScroll). */
export function getLenis(): { scrollTo: (y: number, opts?: { duration?: number; immediate?: boolean }) => void; stop: () => void; start: () => void } | null {
  return (window as unknown as { __msLenis?: { scrollTo: (y: number, opts?: { duration?: number; immediate?: boolean }) => void; stop: () => void; start: () => void } }).__msLenis ?? null;
}
