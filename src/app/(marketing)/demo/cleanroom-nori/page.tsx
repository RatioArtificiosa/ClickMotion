import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import NoriTestimonialsSection from "../../../../../cleanroom/nori-from-prompt/NoriTestimonialsSection";

const display = Syne({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-nori-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-nori-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NORI · Pistachio proof",
  description:
    "Operator cleanroom for MS-SEC-TEST03. Jelly morph. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-TEST03 NORI.
 * Sidecar wow testimonials. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomNoriPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#D8E8C8] text-[#1A2E14]`}
      style={{ fontFamily: "var(--font-nori-sans), system-ui, sans-serif" }}
    >
      <NoriTestimonialsSection />
    </div>
  );
}
