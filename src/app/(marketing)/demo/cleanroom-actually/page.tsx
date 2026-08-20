import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ActuallyHero from "../../../../../cleanroom/actually-from-prompt/ActuallyHero";

const display = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-actually-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Actually! · Interactive Product Can Hero",
  description:
    "Pin-until-complete product hero: living 3D can, pointer window, scroll-opened formula.",
};

/**
 * Production cleanroom demo for MS-HERO-ACTU01 (Actually!).
 * No Scroller: do not overflow-hidden the page. After progress 1,
 * the next sibling may scroll in. Not PSAVE.
 */
export default function CleanroomActuallyPage() {
  return (
    <div
      className={`${display.variable} bg-[#efede6] text-[#1a1b1d]`}
      data-demo-root
      style={{
        fontFamily: "var(--font-actually-sans), system-ui, sans-serif",
        ["--color-bone" as string]: "#efede6",
        ["--color-ink" as string]: "#1a1b1d",
        ["--color-mist" as string]: "#6a6965",
        ["--color-alpine" as string]: "#1e423e",
        ["--color-clear" as string]: "#bcd3d8",
        ["--font-wordmark" as string]:
          "var(--font-actually-sans), system-ui, sans-serif",
        ["--font-display" as string]: "Georgia, 'Times New Roman', serif",
        ["--font-sans" as string]:
          "var(--font-actually-sans), system-ui, sans-serif",
        ["--nav-h" as string]: "72px",
      }}
    >
      <style>{`
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
      `}</style>
      <ActuallyHero />
      <section
        id="actually-after"
        className="flex min-h-[40dvh] items-center justify-center bg-[#1a1b1d] px-6 py-16 text-[#6a6965]"
      >
        <p className="max-w-md text-center text-[13px] uppercase tracking-[0.12em]">
          After the hero
        </p>
      </section>
    </div>
  );
}
