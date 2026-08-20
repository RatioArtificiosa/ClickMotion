import type { Metadata } from "next";
import { Archivo_Black, Inter, IBM_Plex_Mono } from "next/font/google";
import PressStatsSection from "../../../../../cleanroom/press-from-prompt/PressStatsSection";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-press-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-press-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRESS · Poster night stats",
  description:
    "Operator cleanroom for MS-SEC-STAT02. Scale crash. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-STAT02 PRESS.
 * Sidecar wow stats. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomPressPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} ${mono.variable} min-h-dvh overflow-hidden bg-[#0A0A0A] text-[#F5F0E6]`}
      style={{ fontFamily: "var(--font-press-sans), system-ui, sans-serif" }}
    >
      <PressStatsSection />
    </div>
  );
}
