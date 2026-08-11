import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import LuminaHeroSection from "../../../../../cleanroom/lumina-from-prompt/LuminaHeroSection";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
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
  title: "LUMINA STUDIOS Cleanroom Build",
};

export default function CleanroomLuminaPage() {
  return (
    <div
      className={`${playfair.variable} ${inter.variable} min-h-screen bg-[#1E140A]`}
    >
      <LuminaHeroSection />
    </div>
  );
}
