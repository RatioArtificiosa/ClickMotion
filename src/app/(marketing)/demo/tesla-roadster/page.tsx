import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TeslaRoadsterPromo from "../../../../../cleanroom/tesla-roadster/TeslaRoadsterPromo";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-tesla-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roadster · Studio Drive (alias)",
  description:
    "Alias of MS-HERO-ROAD01 cleanroom-roadster. No Scroller studio-drive hero.",
};

/**
 * Alias of /demo/cleanroom-roadster (MS-HERO-ROAD01).
 * No Scroller: do not overflow-hidden the page. Not PSAVE.
 * Film: /assets/roadster/studio-drive.mp4
 */
export default function TeslaRoadsterDemoPage() {
  return (
    <div
      className={`${sans.variable} font-sans`}
      data-demo-root
      style={{
        fontFamily: "var(--font-tesla-sans), system-ui, sans-serif",
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
