import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import AxiomFintechHero from "../../../../../cleanroom/axiom-from-prompt/AxiomFintechHero";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-axiom-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-axiom-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AXIOM · Fintech Inverted Markets Hero",
  description:
    "Cleanroom reference for MS-HERO-AXIO01. Full free-playing inverted NYC film. True north when markets invert.",
};

/**
 * Cleanroom reference for MS-HERO-AXIO01.
 * Storefront uses dual-track capture of this build + client HD film.
 */
export default function CleanroomAxiomPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-screen bg-[#07090f] text-[#eef2f7]`}
      style={{ fontFamily: "var(--font-axiom-sans), system-ui, sans-serif" }}
    >
      <AxiomFintechHero />
      <div
        id="platform"
        className="flex min-h-[24vh] items-center justify-center px-6 py-14"
        style={{
          color: "rgba(212,175,106,0.5)",
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}
      >
        Axiom
      </div>
      <div id="markets" className="sr-only" aria-hidden>
        Markets
      </div>
      <div id="research" className="sr-only" aria-hidden>
        Research
      </div>
    </div>
  );
}
