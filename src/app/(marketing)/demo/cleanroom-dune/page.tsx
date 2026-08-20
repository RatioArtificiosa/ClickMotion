import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import DunePricingSection from "../../../../../cleanroom/dune-from-prompt/DunePricingSection";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-dune-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dune-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DUNE · Desert inn nights",
  description:
    "Operator cleanroom for MS-SEC-PRIC04. Vitrine sweep. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-PRIC04 DUNE.
 * Sidecar wow pricing. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomDunePage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#E8C97A] text-[#2A1808]`}
      style={{ fontFamily: "var(--font-dune-sans), system-ui, sans-serif" }}
    >
      <DunePricingSection />
    </div>
  );
}
