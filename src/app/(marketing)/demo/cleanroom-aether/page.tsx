import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import AetherHeroSection from "../../../../../cleanroom/aether-from-prompt/AetherHeroSection";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AETHER — Cleanroom Build",
};

export default function CleanroomAetherPage() {
  return (
    <div className={`${playfair.variable} ${inter.variable}`}>
      <AetherHeroSection />
    </div>
  );
}
