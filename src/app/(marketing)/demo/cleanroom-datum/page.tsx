import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import DatumContactSection from "../../../../../cleanroom/datum-from-prompt/DatumContactSection";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-datum-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-datum-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DATUM · Swiss inquiry contact",
  description:
    "Operator cleanroom for MS-SEC-CONT01. Swiss inquiry letter. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-CONT01 DATUM.
 * Sidecar gold contact section. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomDatumPage() {
  return (
    <div
      className={`${sans.variable} ${mono.variable} min-h-dvh bg-[#FAFAFA] text-[#111]`}
      style={{ fontFamily: "var(--font-datum-sans), system-ui, sans-serif" }}
    >
      <DatumContactSection />
    </div>
  );
}
