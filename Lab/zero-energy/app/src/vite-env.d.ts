/// <reference types="vite/client" />

interface Window {
  carousel?: {
    index: number;
    previous: () => void;
    next: () => void;
    goTo: (i: number) => void;
    changed: {
      connect: (cb: (e: { index: number; previous: number }) => void) => void;
    };
  };
  loader?: { play: () => Promise<void> };
  lenis?: unknown;
}
