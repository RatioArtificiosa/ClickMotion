import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import SolCtaSection from "../../../../../cleanroom/sol-from-prompt/SolCtaSection";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sol-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-sol-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOL · Noon porch CTA",
  description:
    "Operator cleanroom for MS-SEC-CTAS07. Flash pop. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-CTAS07 SOL.
 * Sidecar wow CTA. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomSolPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#F7F1DC] text-[#C45A12]`}
      style={{ fontFamily: "var(--font-sol-sans), system-ui, sans-serif" }}
    >
      <SolCtaSection />
    </div>
  );
}
