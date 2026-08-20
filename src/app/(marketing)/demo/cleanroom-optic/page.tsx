import type { Metadata } from "next";
import { Inter } from "next/font/google";
import OpticFeaturesSection from "../../../../../cleanroom/optic-from-prompt/OpticFeaturesSection";

const sans = Inter({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-optic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OPTIC · Marfa rooms",
  description:
    "Operator cleanroom for MS-SEC-FEAT06. Black and white gallery. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FEAT06 OPTIC.
 * Sidecar wow features. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomOpticPage() {
  return (
    <div
      className={`${sans.variable} min-h-dvh overflow-hidden bg-[#F5F5F5] text-[#111111]`}
      style={{ fontFamily: "var(--font-optic), system-ui, sans-serif" }}
    >
      <OpticFeaturesSection />
    </div>
  );
}
