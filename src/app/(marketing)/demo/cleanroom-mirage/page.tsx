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
  title: "MIRAGE · Agency desert glass hero",
  description:
    "Pin-until-complete (No Scroller) agency hero: scroll aims five liquid-glass cards, desert film free-plays, the page stays still until the journey ends.",
};

/**
 * Production cleanroom demo for MS-HERO-MIRA01 (MIRAGE).
 * No Scroller: do not overflow-hidden the page. After progress 1,
 * the next sibling may scroll in. Not PSAVE (film free-plays, no reverse).
 */
export default function CleanroomMiragePage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} bg-[#07080f] text-white`}
      style={{ fontFamily: "var(--font-mirage-sans), system-ui, sans-serif" }}
    >
      <MirageAgencyHero />
      <section
        id="mirage-after"
        className="flex min-h-[40dvh] items-center justify-center bg-[#0c0a08] px-6 py-16 text-white/50"
      >
        <p className="max-w-md text-center text-[13px] uppercase tracking-[0.12em]">
          After the mirage
        </p>
      </section>
    </div>
  );
}
