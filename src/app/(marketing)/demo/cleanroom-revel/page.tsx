import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import RevelScrollNarrative from "../../../../../cleanroom/revel-from-prompt/RevelScrollNarrative";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-revel-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-revel-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "REVEL Cleanroom · Scroll Narrative",
  description:
    "Ultra-premium scroll-as-narrative fashion hero: video advances with scroll. Pearl studio, rose gold, breakout chapters.",
};

export default function CleanroomRevelPage() {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <RevelScrollNarrative />
    </div>
  );
}
