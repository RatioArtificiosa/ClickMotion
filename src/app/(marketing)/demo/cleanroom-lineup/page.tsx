import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LineupSection from "../../../../../cleanroom/lineup-from-prompt/LineupSection";

const display = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-lineup-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lineup · Product Line Scroll Reveal Section",
  description:
    "Pin-until-complete product lineup: each scroll lands a new SKU with 3D vessel, copy, and specs.",
};

/**
 * Production cleanroom demo for MS-SEC-LINE01 (Lineup).
 * No Scroller: do not overflow-hidden the page. After progress 1,
 * the next sibling may scroll in. Not PSAVE.
 */
export default function CleanroomLineupPage() {
  return (
    <div
      className={`${display.variable} bg-[#efede6] text-[#1a1b1d]`}
      data-demo-root
      style={{
        fontFamily: "var(--font-lineup-sans), system-ui, sans-serif",
        ["--color-bone" as string]: "#efede6",
        ["--color-ink" as string]: "#1a1b1d",
        ["--color-mist" as string]: "#6a6965",
        ["--color-clear" as string]: "#bcd3d8",
        ["--font-wordmark" as string]:
          "var(--font-lineup-sans), system-ui, sans-serif",
        ["--font-display" as string]: "Georgia, 'Times New Roman', serif",
        ["--font-sans" as string]:
          "var(--font-lineup-sans), system-ui, sans-serif",
        ["--nav-h" as string]: "24px",
      }}
    >
      <style>{`
        .bg-bone { background-color: #efede6 !important; }
        .bg-ink { background-color: #1a1b1d !important; }
        .text-bone { color: #efede6 !important; }
        .text-ink { color: #1a1b1d !important; }
        .text-mist { color: #6a6965 !important; }
        .text-ink\\/70 { color: rgba(26, 27, 29, 0.7) !important; }
        .text-mist\\/50 { color: rgba(106, 105, 101, 0.5) !important; }
        .border-ink\\/15 { border-color: rgba(26, 27, 29, 0.15) !important; }
        .font-wordmark {
          font-family: var(--font-lineup-sans), system-ui, sans-serif !important;
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        .font-display {
          font-family: Georgia, 'Times New Roman', serif !important;
          font-weight: 300;
        }
        .font-sans {
          font-family: var(--font-lineup-sans), system-ui, sans-serif !important;
        }
        .font-serif {
          font-family: Georgia, 'Times New Roman', serif !important;
        }
      `}</style>
      <LineupSection />
      <section
        id="lineup-after"
        className="flex min-h-[40dvh] items-center justify-center bg-[#efede6] px-6 py-16 text-[#6a6965]"
      >
        <p className="max-w-md text-center text-[13px] uppercase tracking-[0.12em]">
          After the lineup
        </p>
      </section>
    </div>
  );
}
