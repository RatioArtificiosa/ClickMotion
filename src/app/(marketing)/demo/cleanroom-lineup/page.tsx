import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LineupSection from "../../../../../cleanroom/lineup-from-prompt/LineupSection";
import { SmoothScroll } from "../../../../../cleanroom/lineup-from-prompt/SmoothScroll";

const display = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-lineup-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lineup · Product Line Scroll Reveal Section",
  description:
    "MS-SEC-LINE01 free listing. Scroll-pinned product lineup: each scroll lands a new SKU with 3D vessel, copy, and specs - fully customizable for any brand.",
};

/** Production cleanroom demo for MS-SEC-LINE01 (Lineup product reveal section). */
export default function CleanroomLineupPage() {
  return (
    <div
      className={`${display.variable} min-h-screen bg-[#efede6] text-[#1a1b1d]`}
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
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
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
        .sr-only {
          position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }
        #flavors .pin-spacer,
        .pin-spacer {
          background: #efede6 !important;
        }
      `}</style>
      <SmoothScroll>
        <LineupSection />
        {/* Small bone tail only — pin spacing already provides scrub room */}
        <div className="h-[10vh] bg-[#efede6]" aria-hidden />
      </SmoothScroll>
    </div>
  );
}
