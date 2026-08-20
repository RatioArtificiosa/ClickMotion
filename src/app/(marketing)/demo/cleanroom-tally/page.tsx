import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import TallyStatsSection from "../../../../../cleanroom/tally-from-prompt/TallyStatsSection";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-tally-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-tally-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TALLY · Proof stats section",
  description:
    "Operator cleanroom for MS-SEC-STAT01. Desk proof board. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-STAT01 TALLY.
 * Sidecar gold stats section. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomTallyPage() {
  return (
    <div
      className={`${sans.variable} ${mono.variable} min-h-dvh bg-white text-[#0A2540]`}
      style={{ fontFamily: "var(--font-tally-sans), system-ui, sans-serif" }}
    >
      <TallyStatsSection />
    </div>
  );
}
