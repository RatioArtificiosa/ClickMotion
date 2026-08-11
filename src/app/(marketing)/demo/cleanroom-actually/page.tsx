import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ActuallyHero from "../../../../../cleanroom/actually-from-prompt/ActuallyHero";
import { SmoothScroll } from "../../../../../cleanroom/actually-from-prompt/SmoothScroll";

const display = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-actually-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Actually! · Interactive Product Can Hero",
  description:
    "MS-HERO-ACTU01 free listing. Product-first hero: living 3D can, pointer-driven window, scroll-opened formula - fully customizable for any CPG brand.",
};

/**
 * Production cleanroom demo for MS-HERO-ACTU01 (Actually! product can hero).
 * No backgrounds film - the 3D product is the stage.
 */
export default function CleanroomActuallyPage() {
  return (
    <div
      className={`${display.variable} min-h-screen bg-[#efede6] text-[#1a1b1d]`}
      data-demo-root
      style={{
        fontFamily: "var(--font-actually-sans), system-ui, sans-serif",
        // Brand tokens (lab parity) so Tailwind arbitrary classes + utilities resolve
        ["--color-bone" as string]: "#efede6",
        ["--color-ink" as string]: "#1a1b1d",
        ["--color-mist" as string]: "#6a6965",
        ["--color-alpine" as string]: "#1e423e",
        ["--color-clear" as string]: "#bcd3d8",
        ["--font-wordmark" as string]:
          "var(--font-actually-sans), system-ui, sans-serif",
        ["--font-display" as string]:
          "Georgia, 'Times New Roman', serif",
        ["--font-sans" as string]:
          "var(--font-actually-sans), system-ui, sans-serif",
        ["--nav-h" as string]: "72px",
      }}
    >
      <style>{`
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
        .lenis.lenis-stopped { overflow: hidden; }
        .bg-bone { background-color: #efede6 !important; }
        .bg-ink { background-color: #1a1b1d !important; }
        .text-bone { color: #efede6 !important; }
        .text-ink { color: #1a1b1d !important; }
        .text-mist { color: #6a6965 !important; }
        .text-bone\\/60 { color: rgba(239, 237, 230, 0.6) !important; }
        .text-bone\\/80 { color: rgba(239, 237, 230, 0.8) !important; }
        .text-bone\\/50 { color: rgba(239, 237, 230, 0.5) !important; }
        .text-bone\\/40 { color: rgba(239, 237, 230, 0.4) !important; }
        .bg-alpine { background-color: #1e423e !important; }
        .font-wordmark {
          font-family: var(--font-actually-sans), system-ui, sans-serif !important;
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        .font-display {
          font-family: Georgia, 'Times New Roman', serif !important;
          font-weight: 300;
        }
        .font-sans {
          font-family: var(--font-actually-sans), system-ui, sans-serif !important;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        #hero .pin-spacer,
        .pin-spacer {
          background: #1a1b1d !important;
        }
      `}</style>
      <SmoothScroll>
        <ActuallyHero />
        {/* Tiny tail only — pin already adds ~120% spacing. Large spacers
            caused storefront captures to overscroll into empty ink. */}
        <div className="h-[8vh] bg-[#1a1b1d]" aria-hidden />
      </SmoothScroll>
    </div>
  );
}
