import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import NexusAiHero from "../../../../../cleanroom/nexus-from-prompt/NexusAiHero";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-nexus-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-nexus-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXUS AI · Enterprise Intelligence Layer Hero",
  description:
    "MS-HERO-NEXU01 free listing. Full free-playing neural lattice under cyan/magenta institutional chrome. Sense → Route → Compound path + letter-melt headline.",
};

/** Production cleanroom demo for MS-HERO-NEXU01 (free listing). */
export default function CleanroomNexusPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-screen bg-[#07080f] text-[#e8f0ff]`}
      style={{ fontFamily: "var(--font-nexus-sans), system-ui, sans-serif" }}
    >
      <NexusAiHero />
      <div
        className="flex min-h-[22vh] items-center justify-center px-6 py-12"
        style={{
          color: "rgba(0,212,255,0.45)",
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}
      >
        Nexus AI
      </div>
    </div>
  );
}
