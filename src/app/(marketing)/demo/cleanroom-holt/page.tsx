import type { Metadata } from "next";
import { Unbounded, Outfit } from "next/font/google";
import HoltContactSection from "../../../../../cleanroom/holt-from-prompt/HoltContactSection";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-holt-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-holt-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HOLT · Amber commission contact",
  description:
    "Operator cleanroom for MS-SEC-CONT03. Magnet snap. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-CONT03 HOLT.
 * Sidecar wow contact. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomHoltPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#E8A04A] text-[#1A0E04]`}
      style={{ fontFamily: "var(--font-holt-sans), system-ui, sans-serif" }}
    >
      <HoltContactSection />
    </div>
  );
}
