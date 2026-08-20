import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import AtlasFeaturesSection from "../../../../../cleanroom/atlas-from-prompt/AtlasFeaturesSection";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-atlas-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-atlas-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ATLAS · Systems features section",
  description:
    "Operator cleanroom for MS-SEC-FEAT01. Swiss capability board. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FEAT01 ATLAS.
 * Sidecar gold features section. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomAtlasPage() {
  return (
    <div
      className={`${sans.variable} ${mono.variable} min-h-dvh bg-[#FAFAFA] text-[#111]`}
      style={{ fontFamily: "var(--font-atlas-sans), system-ui, sans-serif" }}
    >
      <AtlasFeaturesSection />
    </div>
  );
}
