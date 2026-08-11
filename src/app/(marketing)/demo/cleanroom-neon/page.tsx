import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import NeonForgeHeroSection from "../../../../../cleanroom/neon-from-prompt/NeonForgeHeroSection";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEON FORGE Cleanroom Build",
};

export default function CleanroomNeonPage() {
  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen bg-black`}
    >
      <NeonForgeHeroSection />
    </div>
  );
}
