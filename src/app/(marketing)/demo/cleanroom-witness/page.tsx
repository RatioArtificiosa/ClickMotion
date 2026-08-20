import type { Metadata } from "next";
import { Newsreader, Inter, IBM_Plex_Mono } from "next/font/google";
import WitnessQuotesSection from "../../../../../cleanroom/witness-from-prompt/WitnessQuotesSection";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-witness-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-witness-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-witness-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WITNESS · Editorial statements section",
  description:
    "Operator cleanroom for MS-SEC-TEST01. Pull-quote takeover. Not for public catalog.",
};

export default function CleanroomWitnessPage() {
  return (
    <div
      className={`${serif.variable} ${sans.variable} ${mono.variable} min-h-dvh bg-[#F6F4F0] text-[#111]`}
      style={{ fontFamily: "var(--font-witness-sans), system-ui, sans-serif" }}
    >
      <WitnessQuotesSection />
    </div>
  );
}
