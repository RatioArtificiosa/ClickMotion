import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import MarkCtaSection from "../../../../../cleanroom/mark-from-prompt/MarkCtaSection";

const display = Newsreader({
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
  variable: "--font-mark-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mark-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MARK · Fall show CTA",
  description:
    "Operator cleanroom for MS-SEC-CTAS04. Vermilion seal. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-CTAS04 MARK.
 * Sidecar wow CTA. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomMarkPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#1A1A1A] text-[#F5F0E8]`}
      style={{ fontFamily: "var(--font-mark-sans), system-ui, sans-serif" }}
    >
      <MarkCtaSection />
    </div>
  );
}
