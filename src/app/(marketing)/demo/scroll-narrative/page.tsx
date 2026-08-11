import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import MeridianScrollNarrative from "../../../../../cleanroom/meridian-scroll/MeridianScrollNarrative";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-meridian-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-meridian-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MERIDIAN — Scroll Narrative (Live Lab)",
  description:
    "Ultra-premium scroll-as-narrative hero: video advances with scroll. Clean-room lab for prompt perfection.",
};

export default function ScrollNarrativeDemoPage() {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <MeridianScrollNarrative />
    </div>
  );
}
