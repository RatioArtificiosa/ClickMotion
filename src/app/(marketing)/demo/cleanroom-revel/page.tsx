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
    "Pin-until-complete PSAVE fashion scroll narrative: scroll aims, film plays forward and reverse. Pearl studio, rose gold.",
};

/**
 * Cleanroom demo - MS-HERO-REVL01 REVEL.
 * Pin-until-complete on the film stage; atelier band after the pin releases.
 * Do not lock the page to overflow-hidden (the closing band must be reachable).
 */
export default function CleanroomRevelPage() {
  return (
    <div className={`${display.variable} ${sans.variable} bg-[#F7F4F1]`}>
      <RevelScrollNarrative />
    </div>
  );
}
