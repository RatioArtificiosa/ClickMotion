import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import KilnFeaturesSection from "../../../../../cleanroom/kiln-from-prompt/KilnFeaturesSection";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-kiln-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-kiln-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KILN · Wet glaze features",
  description:
    "Operator cleanroom for MS-SEC-FEAT04. Celadon shop. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FEAT04 KILN.
 * Sidecar wow features. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomKilnPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#C5D5C8] text-[#1C2E28]`}
      style={{ fontFamily: "var(--font-kiln-sans), system-ui, sans-serif" }}
    >
      <KilnFeaturesSection />
    </div>
  );
}
