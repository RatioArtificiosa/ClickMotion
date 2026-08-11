import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import VertexHeroSection from "../../../../../cleanroom/vertex-from-prompt/VertexHeroSection";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-vertex-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-vertex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VERTEX SECURITY - Cleanroom Build",
  description: "Brutalist cybersecurity hero - free listing reference build.",
};

export default function CleanroomVertexPage() {
  return (
    <div className={`${display.variable} ${sans.variable}`}>
      <VertexHeroSection />
    </div>
  );
}
