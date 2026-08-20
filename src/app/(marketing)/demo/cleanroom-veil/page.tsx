import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import VeilFaqSection from "../../../../../cleanroom/veil-from-prompt/VeilFaqSection";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-veil-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-veil-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VEIL · Ultraviolet FAQ",
  description:
    "Operator cleanroom for MS-SEC-FAQS02. Perfume haze. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FAQS02 VEIL.
 * Sidecar wow FAQ. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomVeilPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#12081C] text-[#EDE6F7]`}
      style={{ fontFamily: "var(--font-veil-sans), system-ui, sans-serif" }}
    >
      <VeilFaqSection />
    </div>
  );
}
