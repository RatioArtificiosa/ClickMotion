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
    "Pin-until-complete liquid glass decision section: five enterprise panels over motion film.",
};

/**
 * Cleanroom demo - MS-SEC-FOLI01 FOLIO.
 * Pin-until-complete: do not overflow-hidden the page. After progress 1,
 * the next sibling may scroll in. Pin freeing: page owns until dock.
 */
export default function CleanroomFolioPage() {
  return (
    <div
      className={`${display.variable} ${sans.variable} bg-[#0a0c12] text-white`}
      style={{ fontFamily: "var(--font-folio-sans), system-ui, sans-serif" }}
    >
      <FolioPivotSection />
      <section
        id="folio-after"
        className="flex min-h-[40dvh] items-center justify-center bg-[#07080f] px-6 py-16 text-white/50"
      >
        <p className="max-w-md text-center text-[13px] uppercase tracking-[0.12em]">
          After the folio
        </p>
      </section>
    </div>
  );
}
