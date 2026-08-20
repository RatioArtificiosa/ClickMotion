import type { Metadata } from "next";
import { Unbounded, Outfit } from "next/font/google";
import CastFeaturesSection from "../../../../../cleanroom/cast-from-prompt/CastFeaturesSection";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-cast-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cast-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CAST · Amber object features",
  description:
    "Operator cleanroom for MS-SEC-FEAT05. Resin shop. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FEAT05 CAST.
 * Sidecar wow features. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomCastPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#E8A04A] text-[#1A0E04]`}
      style={{ fontFamily: "var(--font-cast-sans), system-ui, sans-serif" }}
    >
      <CastFeaturesSection />
    </div>
  );
}
