import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import PortTestimonialsSection from "../../../../../cleanroom/port-from-prompt/PortTestimonialsSection";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-port-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-port-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PORT · Club nights proof",
  description:
    "Operator cleanroom for MS-SEC-TEST02. Bordeaux room. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-TEST02 PORT.
 * Sidecar wow testimonials. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomPortPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh overflow-hidden bg-[#1A0A12] text-[#F6E8EE]`}
      style={{ fontFamily: "var(--font-port-sans), system-ui, sans-serif" }}
    >
      <PortTestimonialsSection />
    </div>
  );
}
