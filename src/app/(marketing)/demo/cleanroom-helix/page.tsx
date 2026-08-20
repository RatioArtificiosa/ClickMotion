import type { Metadata } from "next";
import { Inter, Birthstone } from "next/font/google";
import HelixGallerySection from "../../../../../cleanroom/helix-from-prompt/HelixGallerySection";

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
    "Pin-until-complete (No Scroller) mid-page gallery: scroll aims the helix, the page stays still until the journey ends.",
};

/**
 * Production cleanroom demo for MS-SEC-HELI01 (HELIX).
 * No Scroller: do not overflow-hidden the page. After progress 1,
 * the next sibling may scroll in. Not PSAVE (no reverse film).
 */
export default function CleanroomHelixPage() {
  return (
    <div
      className={`${display.variable} ${wordmark.variable} bg-[#C3C3C3] text-[#0a0a0a]`}
      style={{
        fontFamily: "var(--font-helix-display), system-ui, sans-serif",
      }}
    >
      <HelixGallerySection />
      <section
        id="helix-after"
        className="flex min-h-[40dvh] items-center justify-center bg-[#b8b8b8] px-6 py-16 text-[#0a0a0a]/70"
      >
        <p className="max-w-md text-center text-[13px] uppercase tracking-[0.12em]">
          After the helix
        </p>
      </section>
    </div>
  );
}
