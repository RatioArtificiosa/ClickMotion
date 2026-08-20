import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import SlipFaqSection from "../../../../../cleanroom/slip-from-prompt/SlipFaqSection";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-slip-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-slip-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SLIP · Celadon tile FAQ",
  description:
    "Operator cleanroom for MS-SEC-FAQS04. Mercury morph. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FAQS04 SLIP.
 * Sidecar wow FAQ. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomSlipPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#C5D5C8] text-[#1C2E28]`}
      style={{ fontFamily: "var(--font-slip-sans), system-ui, sans-serif" }}
    >
      <SlipFaqSection />
    </div>
  );
}
