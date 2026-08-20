import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import FacetCtaSection from "../../../../../cleanroom/facet-from-prompt/FacetCtaSection";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-facet-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-facet-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FACET · Vitrine viewing CTA",
  description:
    "Operator cleanroom for MS-SEC-CTAS03. Platinum case close. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-CTAS03 FACET.
 * Sidecar wow CTA. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomFacetPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#0E0F12] text-[#F4F1EA]`}
      style={{ fontFamily: "var(--font-facet-sans), system-ui, sans-serif" }}
    >
      <FacetCtaSection />
    </div>
  );
}
