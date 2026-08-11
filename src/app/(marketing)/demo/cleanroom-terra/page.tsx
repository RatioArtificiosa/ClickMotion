import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import TerraNovaHeroSection from "../../../../../cleanroom/terra-from-prompt/TerraNovaHeroSection";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TERRA NOVA Cleanroom Build",
};

export default function CleanroomTerraPage() {
  return (
    <div
      className={`${fraunces.variable} ${dmSans.variable} min-h-screen bg-[#0B1A14]`}
    >
      <TerraNovaHeroSection />
    </div>
  );
}
