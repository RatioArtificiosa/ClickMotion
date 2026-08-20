import type { Metadata } from "next";
import { Unbounded, Syne } from "next/font/google";
import PikeFeaturesSection from "../../../../../cleanroom/pike-from-prompt/PikeFeaturesSection";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-pike-display",
  display: "swap",
});

const sans = Syne({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-pike-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PIKE · Boardwalk machines",
  description:
    "Operator cleanroom for MS-SEC-FEAT09. Kaleido fold. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FEAT09 PIKE.
 * Sidecar wow features. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomPikePage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#F7C6D8] text-[#1A1A1A]`}
      style={{ fontFamily: "var(--font-pike-sans), system-ui, sans-serif" }}
    >
      <PikeFeaturesSection />
    </div>
  );
}
