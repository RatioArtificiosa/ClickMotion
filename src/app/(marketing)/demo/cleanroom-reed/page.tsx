import type { Metadata } from "next";
import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";
import ReedContactSection from "../../../../../cleanroom/reed-from-prompt/ReedContactSection";

const display = Newsreader({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-reed-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-reed-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-reed-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "REED · Vermilion letterpress contact",
  description:
    "Operator cleanroom for MS-SEC-CONT04. Chromatic slip. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-CONT04 REED.
 * Sidecar wow contact. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomReedPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} ${mono.variable} min-h-dvh overflow-hidden bg-[#1A1A1A] text-[#F5F0E8]`}
      style={{ fontFamily: "var(--font-reed-sans), system-ui, sans-serif" }}
    >
      <ReedContactSection />
    </div>
  );
}
