import type { Metadata } from "next";
import { SiteFooter } from "../../../../../cleanroom/dopamine-from-prompt/SiteFooter";
import "../../../../../cleanroom/dopamine-from-prompt/dopamine-footer.css";

export const metadata: Metadata = {
  title: "Dopamine · Complete Fashion Footer",
  description:
    "MS-SEC-DOPA01. Dual nav, exclusion wordmark, living figure, Lottie badge, letter scramble, and couture subscribe close.",
};

/**
 * Production cleanroom demo for MS-SEC-DOPA01 (Dopamine footer).
 * Runway above so scroll enter + scramble are visible.
 */
export default function CleanroomDopaminePage() {
  return (
    <div className="min-h-dvh bg-[#fff9f7] text-black">
      <div
        className="flex min-h-[55vh] items-end px-8 pb-10 font-mono text-xs uppercase tracking-widest text-black/40"
        aria-hidden
      >
        Scroll into footer
      </div>
      <SiteFooter />
    </div>
  );
}
