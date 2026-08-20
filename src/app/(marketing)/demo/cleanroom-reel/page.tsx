import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import ReelTestimonialsSection from "../../../../../cleanroom/reel-from-prompt/ReelTestimonialsSection";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-reel-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-reel-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "REEL · Darkroom proof",
  description:
    "Operator cleanroom for MS-SEC-TEST04. Polaroid develop. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-TEST04 REEL.
 * Sidecar wow testimonials. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomReelPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#5C1218] text-[#F6E6D8]`}
      style={{ fontFamily: "var(--font-reel-sans), system-ui, sans-serif" }}
    >
      <ReelTestimonialsSection />
    </div>
  );
}
