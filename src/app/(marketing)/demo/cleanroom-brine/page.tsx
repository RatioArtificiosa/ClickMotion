import type { Metadata } from "next";
import { Unbounded, Syne } from "next/font/google";
import BrineFooterSection from "../../../../../cleanroom/brine-from-prompt/BrineFooterSection";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-brine-display",
  display: "swap",
});

const sans = Syne({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-brine-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BRINE · Ice silver footer",
  description:
    "Operator cleanroom for MS-SEC-FOOT02. Neon ignite. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FOOT02 BRINE.
 * Sidecar wow footer. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomBrinePage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#E4EEF4] text-[#1A2330]`}
      style={{ fontFamily: "var(--font-brine-sans), system-ui, sans-serif" }}
    >
      <BrineFooterSection />
    </div>
  );
}
