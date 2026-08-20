import type { Metadata } from "next";
import { Figtree, Newsreader } from "next/font/google";
import DewCtaSection from "../../../../../cleanroom/dew-from-prompt/DewCtaSection";

const sans = Figtree({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dew-sans",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dew-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DEW · Organic waitlist CTA",
  description:
    "Operator cleanroom for MS-SEC-CTAS01. Organic waitlist close. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-CTAS01 DEW.
 * Sidecar gold CTA section. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomDewPage() {
  return (
    <div
      className={`${sans.variable} ${serif.variable} min-h-dvh bg-[#F4EFE6] text-[#2C241C]`}
      style={{ fontFamily: "var(--font-dew-sans), system-ui, sans-serif" }}
    >
      <DewCtaSection />
    </div>
  );
}
