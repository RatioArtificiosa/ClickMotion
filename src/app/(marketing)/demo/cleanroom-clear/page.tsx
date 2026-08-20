import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import ClearFooterSection from "../../../../../cleanroom/clear-from-prompt/ClearFooterSection";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-clear-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-clear-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CLEAR · Orbit-house footer",
  description:
    "Operator cleanroom for MS-SEC-FOOT01. Trust close. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FOOT01 CLEAR.
 * Sidecar gold footer. Header/footer hidden via /demo/cleanroom-* .
 * Does not collide with /demo/cleanroom-orbit (hero).
 */
export default function CleanroomClearPage() {
  return (
    <div
      className={`${sans.variable} ${mono.variable} min-h-dvh bg-[#0B0F14] text-[#F4F7FA]`}
      style={{ fontFamily: "var(--font-clear-sans), system-ui, sans-serif" }}
    >
      <ClearFooterSection />
    </div>
  );
}
