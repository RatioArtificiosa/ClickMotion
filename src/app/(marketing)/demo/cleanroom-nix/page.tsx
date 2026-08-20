import type { Metadata } from "next";
import { Unbounded, Outfit } from "next/font/google";
import NixFeaturesSection from "../../../../../cleanroom/nix-from-prompt/NixFeaturesSection";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-nix-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-nix-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NIX · Resin ice features",
  description:
    "Operator cleanroom for MS-SEC-FEAT07. Bubble loom. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FEAT07 NIX.
 * Sidecar wow features. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomNixPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#B8E4F0] text-[#0A2030]`}
      style={{ fontFamily: "var(--font-nix-sans), system-ui, sans-serif" }}
    >
      <NixFeaturesSection />
    </div>
  );
}
