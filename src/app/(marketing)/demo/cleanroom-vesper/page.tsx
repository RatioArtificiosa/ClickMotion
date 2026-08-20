import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import VesperFooterSection from "../../../../../cleanroom/vesper-from-prompt/VesperFooterSection";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic"],
  variable: "--font-vesper-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-vesper-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VESPER · Ultraviolet listening footer",
  description:
    "Operator cleanroom for MS-SEC-FOOT03. Velvet crush. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FOOT03 VESPER.
 * Sidecar wow footer. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomVesperPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#12081C] text-[#EDE6F7]`}
      style={{ fontFamily: "var(--font-vesper-sans), system-ui, sans-serif" }}
    >
      <VesperFooterSection />
    </div>
  );
}
