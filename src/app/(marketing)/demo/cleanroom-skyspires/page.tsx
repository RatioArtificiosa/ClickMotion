import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import SkySpiresHero from "../../../../../cleanroom/skyspires-from-prompt/SkySpiresHero";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-sky-display",
  display: "swap",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sky-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkySpires · Sunrise Scroll Hero",
  description:
    "Pin-until-complete PSAVE SkySpires hero. Scroll aims the sunrise film. Frost HUD loops stay.",
};

/**
 * Cleanroom demo for SkySpires.
 * Dual process: PSAVE + No Scroller. Do not overflow-hidden the page.
 * Client film: /assets/videos/skyspires-sunrise-v1.mp4
 * Clone at :3110 stays frozen. Do not edit shipped clone files.
 */
export default function CleanroomSkySpiresPage() {
  return (
    <div
      className={`${display.variable} ${body.variable} ${body.className}`}
      data-demo-root
      style={{
        background: "#081018",
        color: "#f7f3ec",
      }}
    >
      <SkySpiresHero />
      <section
        id="skyspires-after"
        className="flex min-h-[40dvh] items-center justify-center bg-[#081018] px-6 py-16 text-[#8a93a3]"
      >
        <p className="max-w-md text-center text-[13px] uppercase tracking-[0.12em]">
          After the hero
        </p>
      </section>
    </div>
  );
}
