import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import SableHolidayHero from "../../../../../cleanroom/sable-from-prompt/SableHolidayHero";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sable-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sable-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SABLE · Holiday Luxury Fashion Hero",
  description:
    "Private-house holiday campaign. Full free-playing fashion walk film. Minimal editorial type. Maison Sable.",
};

/**
 * Cleanroom reference for MS-HERO-SABL01.
 * Full film uncut. Scroll is a short pin only — never seeks the video.
 */
export default function CleanroomSablePage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-screen bg-[#0c0b0a] text-[#f7f3ec]`}
      style={{ fontFamily: "var(--font-sable-sans), system-ui, sans-serif" }}
    >
      <SableHolidayHero />
      {/* Anchor targets for nav — quiet end stage, no scaffold language */}
      <div
        id="collection"
        className="flex min-h-[28vh] items-center justify-center px-6 py-16"
        style={{
          color: "rgba(196,165,116,0.55)",
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          fontFamily: "var(--font-sable-sans), system-ui, sans-serif",
        }}
      >
        Maison Sable
      </div>
      <div id="house" className="sr-only" aria-hidden>
        House
      </div>
    </div>
  );
}
