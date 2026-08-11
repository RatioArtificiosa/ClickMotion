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
  title: "ELYSE · Luxury Wellness Retreat Scroll Hero",
  description:
    "Cleanroom reference for MS-HERO-ELYS01. Private wellness retreats: scroll owns the sanctuary film. Sanctuaries, ritual, return.",
};

/**
 * Cleanroom reference for MS-HERO-ELYS01.
 * Storefront uses scroll-scrub capture of this build + client HD film.
 */
export default function CleanroomElysePage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-screen bg-[#0b0907] text-[#f4ede3]`}
      style={{ fontFamily: "var(--font-elyse-sans), system-ui, sans-serif" }}
    >
      <ElyseScrollNarrative />
    </div>
  );
}
