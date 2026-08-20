import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import StillMindfulnessHero from "../../../../../cleanroom/still-from-prompt/StillMindfulnessHero";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-still-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-still-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "STILL - Mindfulness Scroll Hero",
  description:
    "Pin-until-complete PSAVE mindfulness hero: scroll aims, film plays forward and reverse. Dual process: PSAVE + No Scroller.",
};

/**
 * Production cleanroom demo for MS-HERO-STIL01 (STILL).
 * Dual process: PSAVE + No Scroller. Do not overflow-hidden the page.
 * Client film: /assets/videos/still-cosmos-v1.mp4
 */
export default function CleanroomStillPage() {
  return (
    <div
      className={`${display.variable} ${body.variable} bg-[#070b12]`}
    >
      <StillMindfulnessHero />
    </div>
  );
}
