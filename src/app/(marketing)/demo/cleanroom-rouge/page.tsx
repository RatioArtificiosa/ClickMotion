import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import RougeCtaSection from "../../../../../cleanroom/rouge-from-prompt/RougeCtaSection";

const display = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-rouge-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-rouge-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ROUGE · Lacquer waitlist CTA",
  description:
    "Operator cleanroom for MS-SEC-CTAS02. Cherry lacquer close. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-CTAS02 ROUGE.
 * Sidecar wow CTA. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomRougePage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#C41E3A] text-[#FFF5F0]`}
      style={{ fontFamily: "var(--font-rouge-sans), system-ui, sans-serif" }}
    >
      <RougeCtaSection />
    </div>
  );
}
