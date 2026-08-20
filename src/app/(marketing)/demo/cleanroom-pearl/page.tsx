import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import PearlStatsSection from "../../../../../cleanroom/pearl-from-prompt/PearlStatsSection";

const display = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-pearl-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-pearl-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PEARL · Vitrine proof",
  description:
    "Operator cleanroom for MS-SEC-STAT03. Sequin burst. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-STAT03 PEARL.
 * Sidecar wow stats. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomPearlPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#0E0F12] text-[#F4F1EA]`}
      style={{ fontFamily: "var(--font-pearl-sans), system-ui, sans-serif" }}
    >
      <PearlStatsSection />
    </div>
  );
}
