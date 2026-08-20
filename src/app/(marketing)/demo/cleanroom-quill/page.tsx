import type { Metadata } from "next";
import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";
import QuillFeaturesSection from "../../../../../cleanroom/quill-from-prompt/QuillFeaturesSection";

const display = Newsreader({
  subsets: ["latin"],
  weight: ["700"],
  style: ["italic"],
  variable: "--font-quill-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-quill-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-quill-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QUILL · Sumi features",
  description:
    "Operator cleanroom for MS-SEC-FEAT08. Smoke script. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FEAT08 QUILL.
 * Sidecar wow features. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomQuillPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} ${mono.variable} min-h-dvh overflow-hidden bg-[#F4F0E6] text-[#111]`}
      style={{ fontFamily: "var(--font-quill-sans), system-ui, sans-serif" }}
    >
      <QuillFeaturesSection />
    </div>
  );
}
