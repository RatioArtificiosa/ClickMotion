import type { Metadata } from "next";
import { Instrument_Serif, Inter, IBM_Plex_Mono } from "next/font/google";
import LedgerPricingSection from "../../../../../cleanroom/ledger-from-prompt/LedgerPricingSection";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-ledger-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ledger-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ledger-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LEDGER · Investment board pricing section",
  description:
    "Operator cleanroom for MS-SEC-PRIC01. Pin-until-complete print ledger. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-PRIC01 LEDGER.
 * Sidecar gold pricing section. Header/footer hidden via /demo/cleanroom-* .
 * Public storefront remains video. Not registered for sale.
 */
export default function CleanroomLedgerPage() {
  return (
    <div
      className={`${serif.variable} ${sans.variable} ${mono.variable} h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#EFE8DC] text-[#14110C]`}
      style={{ fontFamily: "var(--font-ledger-sans), system-ui, sans-serif" }}
    >
      <LedgerPricingSection />
    </div>
  );
}
