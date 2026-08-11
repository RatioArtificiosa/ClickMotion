import type { Metadata } from "next";
import { Inter, Birthstone } from "next/font/google";
import HelixGallerySection from "../../../../../cleanroom/helix-from-prompt/HelixGallerySection";
import { SmoothScroll } from "../../../../../cleanroom/helix-from-prompt/SmoothScroll";

const display = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-helix-display",
  display: "swap",
});

const wordmark = Birthstone({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-helix-wordmark",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HELIX · Helical Design Gallery Carousel Section",
  description:
    "MS-SEC-HELI01 free listing. Spatial mid-page gallery: scroll-pinned WebGL helix cards, crossing titles, brand lockup - fully customizable.",
};

/** Production cleanroom demo for MS-SEC-HELI01 (carousel / gallery section). */
export default function CleanroomHelixPage() {
  return (
    <div
      className={`${display.variable} ${wordmark.variable} min-h-screen bg-[#C3C3C3] text-[#0a0a0a]`}
      style={{
        fontFamily: "var(--font-helix-display), system-ui, sans-serif",
      }}
    >
      <style>{`
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
        .lenis.lenis-stopped { overflow: hidden; }
        #helix-gallery > .pin-spacer,
        .pin-spacer-helix-gallery-pin {
          background: #c3c3c3 !important;
        }
        .pin-spacer { background: transparent !important; }
      `}</style>
      <SmoothScroll>
        <HelixGallerySection />
      </SmoothScroll>
    </div>
  );
}
