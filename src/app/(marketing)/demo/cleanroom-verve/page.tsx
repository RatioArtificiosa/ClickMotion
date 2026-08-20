import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import VerveSocialHero from "../../../../../cleanroom/verve-from-prompt/VerveSocialHero";

const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-verve-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-verve-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VERVE SOCIAL · Creator platform hero",
  description:
    "Be present. Be together. Free-play culture film, bold lockup, infinite social marquee. Brand locked for restage.",
};

/**
 * Cleanroom demo - MS-HERO-VERV01 VERVE SOCIAL.
 * Immersive: site header/footer hidden via /demo/cleanroom-* allowlist.
 * Client film: /assets/videos/verve-presence-v1.mp4
 */
export default function CleanroomVervePage() {
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#1A0A14]`}
    >
      <VerveSocialHero />
    </div>
  );
}
