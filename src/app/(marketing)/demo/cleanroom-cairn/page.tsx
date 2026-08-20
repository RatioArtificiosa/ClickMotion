import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import CairnPricingSection from "../../../../../cleanroom/cairn-from-prompt/CairnPricingSection";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-cairn-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cairn-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CAIRN · Carnelian sittings",
  description:
    "Operator cleanroom for MS-SEC-PRIC02. Wax seal. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-PRIC02 CAIRN.
 * Sidecar wow pricing. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomCairnPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#140C0C] text-[#F7EDE4]`}
      style={{ fontFamily: "var(--font-cairn-sans), system-ui, sans-serif" }}
    >
      <CairnPricingSection />
    </div>
  );
}
