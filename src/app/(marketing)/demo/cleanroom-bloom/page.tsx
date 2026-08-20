import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import BloomYogaHero from "../../../../../cleanroom/bloom-from-prompt/BloomYogaHero";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bloom-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bloom-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BLOOM · Kids & Teen Girls Yoga Course Hero",
  description:
    "MS-HERO-BLOM01. Sunlit class film, Kids and Teens paths, interactive course modules, dual free-class and app CTAs.",
};

/**
 * Production cleanroom demo for MS-HERO-BLOM01 (BLOOM).
 * Immersive: site header/footer hidden via /demo/cleanroom-* allowlist.
 * Client film: /assets/videos/luna-yoga-v1.mp4
 * Mode: free-play loop + Kids/Teens path (never video scrub).
 */
export default function CleanroomBloomPage() {
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#fff8f5]`}
    >
      <BloomYogaHero />
    </div>
  );
}
