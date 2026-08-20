import type { Metadata } from "next";
import { Unbounded, Syne } from "next/font/google";
import TiltCtaSection from "../../../../../cleanroom/tilt-from-prompt/TiltCtaSection";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-tilt-display",
  display: "swap",
});

const sans = Syne({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-tilt-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TILT · Floor open CTA",
  description:
    "Operator cleanroom for MS-SEC-CTAS06. Chrome bubblegum close. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-CTAS06 TILT.
 * Sidecar wow CTA. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomTiltPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#F7C6D8] text-[#1A1A1A]`}
      style={{ fontFamily: "var(--font-tilt-sans), system-ui, sans-serif" }}
    >
      <TiltCtaSection />
    </div>
  );
}
