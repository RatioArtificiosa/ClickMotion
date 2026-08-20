import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import NomadTravelHero from "../../../../../cleanroom/nomad-from-prompt/NomadTravelHero";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nomad-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-nomad-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nomad Travel · Luxury Stays Hero",
  description:
    "MS-HERO-NOMA01. Warm terracotta editorial hero, cinematic empty-destination film, soft entrance, desktop parallax.",
};

/**
 * Production cleanroom demo for MS-HERO-NOMA01 (Nomad Travel).
 * Immersive: site header/footer hidden via /demo/cleanroom-* allowlist.
 * Client film: /assets/videos/nomad-montage-v1.mp4
 */
export default function CleanroomNomadPage() {
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen bg-[#1C140A]`}
    >
      <NomadTravelHero />
    </div>
  );
}
