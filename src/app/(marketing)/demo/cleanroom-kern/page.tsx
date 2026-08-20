import type { Metadata } from "next";
import { Archivo_Black, Inter, IBM_Plex_Mono } from "next/font/google";
import KernFeaturesSection from "../../../../../cleanroom/kern-from-prompt/KernFeaturesSection";

const display = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kern-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-kern-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-kern-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KERN · Kinetic poster features",
  description:
    "Operator cleanroom for MS-SEC-FEAT03. Two-ink type collision. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FEAT03 KERN.
 * Sidecar wow features section. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomKernPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} ${mono.variable} min-h-dvh overflow-hidden bg-[#F2EFE4] text-[#111]`}
      style={{ fontFamily: "var(--font-kern-sans), system-ui, sans-serif" }}
    >
      <KernFeaturesSection />
    </div>
  );
}
