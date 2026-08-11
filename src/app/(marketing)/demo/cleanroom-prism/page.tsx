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
  title: "PRISM Cleanroom · Liquid Glass Multi-Panel",
  description:
    "Ultra-premium scroll-as-narrative identity hero: faces film with liquid glass panels on both sides. Shell, plate, specular.",
};

export default function CleanroomPrismPage() {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <PrismLiquidGlass />
    </div>
  );
}
