import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import EmberContactSection from "../../../../../cleanroom/ember-from-prompt/EmberContactSection";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-ember-display",
  display: "swap",
});

const sans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ember-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EMBER · Oxblood kiln contact",
  description:
    "Operator cleanroom for MS-SEC-CONT02. Lacquer pour. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-CONT02 EMBER.
 * Sidecar wow contact. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomEmberPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-dvh bg-[#5C1218] text-[#F6E6D8]`}
      style={{ fontFamily: "var(--font-ember-sans), system-ui, sans-serif" }}
    >
      <EmberContactSection />
    </div>
  );
}
