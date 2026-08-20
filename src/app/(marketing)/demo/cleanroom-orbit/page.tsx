import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import OrbitFinanceHero from "../../../../../cleanroom/orbit-from-prompt/OrbitFinanceHero";

const display = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-orbit-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-orbit-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ORBIT FINANCE · Premium neobank hero",
  description:
    "Money, elevated. Free-play vault film, DM Serif lockup, gold orbital ring. Brand locked for rebrand.",
};

/**
 * Cleanroom demo - MS-HERO-ORBI01 ORBIT FINANCE.
 * Immersive: site header/footer hidden via /demo/cleanroom-* allowlist.
 * Client film: /assets/videos/orbit-vault-v1.mp4
 */
export default function CleanroomOrbitPage() {
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#0B1426]`}
    >
      <OrbitFinanceHero />
    </div>
  );
}
