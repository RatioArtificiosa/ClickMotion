import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import DocketFaqSection from "../../../../../cleanroom/docket-from-prompt/DocketFaqSection";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-docket-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-docket-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DOCKET · Typographic FAQ section",
  description:
    "Operator cleanroom for MS-SEC-FAQS01. Staged accordion. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FAQS01 DOCKET.
 */
export default function CleanroomDocketPage() {
  return (
    <div
      className={`${sans.variable} ${mono.variable} min-h-dvh bg-[#0B0F14] text-[#F4F7FA]`}
      style={{ fontFamily: "var(--font-docket-sans), system-ui, sans-serif" }}
    >
      <DocketFaqSection />
    </div>
  );
}
