import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import FolioPivotSection from "../../../../../cleanroom/folio-from-prompt/FolioPivotSection";

const display = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-folio-display",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-folio-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FOLIO Cleanroom · Enterprise Glass Pivot Section",
  description:
    "Scroll-pivot liquid glass section over motion video: five dense enterprise decision panels.",
};

/** Example only: the section itself. Video + glass + content. */
export default function CleanroomFolioPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} min-h-screen bg-[#0a0c12] text-white`}
      style={{ fontFamily: "var(--font-folio-sans), system-ui, sans-serif" }}
    >
      <FolioPivotSection />
    </div>
  );
}
