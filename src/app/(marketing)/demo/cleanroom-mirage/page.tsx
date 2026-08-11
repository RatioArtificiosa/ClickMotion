import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import MirageAgencyHero from "../../../../../cleanroom/mirage-from-prompt/MirageAgencyHero";

const display = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-mirage-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mirage-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MIRAGE Cleanroom · Agency Hero (demo)",
  description:
    "Demo only — advertising agency hero: light liquid glass scroll-pivot cards over free-playing desert film. Not production.",
};

/**
 * CLEANROOM DEMO ONLY — not wired to storefront / CMS / packages.
 * Review here before any production sale work.
 */
export default function CleanroomMiragePage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-screen bg-[#0c0a08] text-white`}
      style={{ fontFamily: "var(--font-mirage-sans), system-ui, sans-serif" }}
    >
      <MirageAgencyHero />
      {/* Extra scroll room so the last card can complete its close */}
      <div style={{ height: "12vh" }} aria-hidden />
    </div>
  );
}
