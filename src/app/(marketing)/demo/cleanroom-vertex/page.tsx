import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import VertexHeroSection from "../../../../../cleanroom/vertex-from-prompt/VertexHeroSection";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-vertex-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-vertex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VERTEX SECURITY - Cleanroom Build",
  description:
    "Pin-until-complete PSAVE cybersecurity hero: scroll aims, film plays forward and reverse.",
};

/**
 * Cleanroom demo - MS-HERO-VERT01 VERTEX.
 * Pin-until-complete + PSAVE. Do not lock the page to overflow-hidden.
 */
export default function CleanroomVertexPage() {
  return (
    <div className={`${display.variable} ${sans.variable} bg-black text-white`}>
      <VertexHeroSection />
    </div>
  );
}
