import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TeslaRoadsterPromo from "../../../../../cleanroom/tesla-roadster/TeslaRoadsterPromo";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roadster-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roadster · Studio Drive Scroll Hero",
  description:
    "Pin-until-complete studio-drive hero: looping film, enter-hold-exit cards, pull-up specs sheet, spinning 3D.",
};

/**
 * Production cleanroom demo for MS-HERO-ROAD01 (Roadster Studio Drive).
 * No Scroller: do not overflow-hidden the page. After progress 1,
 * the next sibling may scroll in. Not PSAVE.
 * Client film: /assets/roadster/studio-drive.mp4 · GLB: /assets/roadster/roadster.glb
 */
export default function CleanroomRoadsterPage() {
  return (
    <div
      className={`${sans.variable} font-sans`}
      data-demo-root
      style={{
        fontFamily: "var(--font-roadster-sans), system-ui, sans-serif",
      }}
    >
      <TeslaRoadsterPromo />
      <section
        id="roadster-after"
        className="flex min-h-[40dvh] items-center justify-center bg-[#171a20] px-6 py-16 text-[#8a8d92]"
      >
        <p className="max-w-md text-center text-[13px] uppercase tracking-[0.12em]">
          After the hero
        </p>
      </section>
    </div>
  );
}
