import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import GildaPricingSection from "../../../../../cleanroom/gilda-from-prompt/GildaPricingSection";

const display = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-gilda-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-gilda-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GILDA · Lacquer sittings",
  description:
    "Operator cleanroom for MS-SEC-PRIC03. Stack shuffle. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-PRIC03 GILDA.
 * Sidecar wow pricing. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomGildaPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#C41E3A] text-[#FFF5F0]`}
      style={{ fontFamily: "var(--font-gilda-sans), system-ui, sans-serif" }}
    >
      <GildaPricingSection />
    </div>
  );
}
