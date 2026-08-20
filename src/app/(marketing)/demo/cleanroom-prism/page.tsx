import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import PrismLiquidGlass from "../../../../../cleanroom/prism-from-prompt/PrismLiquidGlass";

const display = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-prism-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-prism-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRISM - Liquid Glass Identity Hero",
  description:
    "Pin-until-complete PSAVE identity hero: scroll aims, faces film plays forward and reverse, liquid glass panels follow the picture. Dual process: PSAVE + No Scroller.",
};

/**
 * Production cleanroom demo for MS-HERO-PRSM01 (PRISM).
 * Dual process: PSAVE + No Scroller. Do not overflow-hidden the page
 * (the atelier band must be reachable after picture-gated release).
 * Client film: /assets/videos/prism-faces-v1.mp4
 */
export default function CleanroomPrismPage() {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <PrismLiquidGlass />
    </div>
  );
}
