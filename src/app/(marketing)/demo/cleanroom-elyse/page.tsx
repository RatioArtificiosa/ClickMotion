import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import ElyseScrollNarrative from "../../../../../cleanroom/elyse-from-prompt/ElyseScrollNarrative";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-elyse-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-elyse-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ELYSE Cleanroom · Scroll Narrative",
  description:
    "Pin-until-complete PSAVE wellness scroll narrative: scroll aims, film plays forward and reverse. Golden-hour earth, cream type.",
};

/**
 * Cleanroom demo - MS-HERO-ELYS01 ELYSE.
 * Pin-until-complete on the film stage; membership band after the pin releases.
 * Do not lock the page to overflow-hidden (the closing band must be reachable).
 */
export default function CleanroomElysePage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} bg-[#0b0907] text-[#f4ede3]`}
      style={{ fontFamily: "var(--font-elyse-sans), system-ui, sans-serif" }}
    >
      <ElyseScrollNarrative />
    </div>
  );
}
