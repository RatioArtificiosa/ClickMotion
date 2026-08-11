import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import ApexQuantumHeroSection from "../../../../../cleanroom/apex-from-prompt/ApexQuantumHeroSection";

const jetbrains = JetBrains_Mono({
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
  title: "APEX QUANTUM Cleanroom Build",
};

export default function CleanroomApexPage() {
  return (
    <div
      className={`${jetbrains.variable} ${inter.variable} min-h-screen bg-[#070A1A]`}
    >
      <ApexQuantumHeroSection />
    </div>
  );
}
