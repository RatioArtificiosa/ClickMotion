import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import GrokBotHero from "../../../../../cleanroom/grokbot-from-prompt/GrokBotHero";

const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-gb-display",
  display: "swap",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-gb-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grok Bot · Sphere Las Vegas",
  description:
    "Pin-until-complete PSAVE Grok Bot hero. Scroll aims the full Sphere film. Ice HUD loops stay.",
};

/**
 * Cleanroom demo for Grok Bot Las Vegas.
 * Dual process: PSAVE + No Scroller. Do not overflow-hidden the page.
 * Client film: /assets/videos/grokbot-sphere-v1.mp4
 */
export default function CleanroomGrokBotPage() {
  return (
    <div
      className={`${display.variable} ${body.variable} ${body.className}`}
      data-demo-root
      style={{
        background: "#05060a",
        color: "#f4f6fa",
      }}
    >
      <GrokBotHero />
      <section
        id="grokbot-after"
        className="flex min-h-[40dvh] items-center justify-center bg-[#05060a] px-6 py-16 text-[#8a93a3]"
      >
        <p className="max-w-md text-center text-[13px] uppercase tracking-[0.12em]">
          After the hero
        </p>
      </section>
    </div>
  );
}
