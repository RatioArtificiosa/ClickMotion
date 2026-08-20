import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import HeatCtaSection from "../../../../../cleanroom/heat-from-prompt/HeatCtaSection";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heat-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-heat-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HEAT · Sundown dinner CTA",
  description:
    "Operator cleanroom for MS-SEC-CTAS05. Desert leaf close. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-CTAS05 HEAT.
 * Sidecar wow CTA. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomHeatPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#E8C97A] text-[#2A1808]`}
      style={{ fontFamily: "var(--font-heat-sans), system-ui, sans-serif" }}
    >
      <HeatCtaSection />
    </div>
  );
}
