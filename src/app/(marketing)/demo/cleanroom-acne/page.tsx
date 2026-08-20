import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AcneSecretHero from "../../../../../cleanroom/acne-from-prompt/AcneSecretHero";

const display = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-acne-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-acne-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Private Clear Skin Brief · Lead Capture Hero",
  description:
    "Sabri Suby-class HVCO lead capture. Cinematic film hold, then docked brand-reveal opt-in. Brand locked until email.",
};

/**
 * Cleanroom demo - private clear-skin HVCO lead-capture hero.
 * Immersive: site header/footer hidden via /demo/cleanroom-* allowlist.
 * Film: /assets/videos/acne-secret-v1.webm (operator Premiere WebM - keep WebM).
 */
export default function CleanroomAcnePage() {
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#070708]`}
    >
      <AcneSecretHero />
    </div>
  );
}
