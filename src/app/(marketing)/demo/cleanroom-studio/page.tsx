import type { Metadata } from "next";
import StudioSequence from "../../../../../cleanroom/studio-from-prompt/StudioSequence";
import { SmoothScroll } from "../../../../../cleanroom/studio-from-prompt/SmoothScroll";

export const metadata: Metadata = {
  title: "Studio Sequence · Camera Pull-Out Billboard Section",
  description:
    "MS-SEC-STUDIO01. Scroll-pinned cinematic pull-out: full-length film opens full-bleed, then settles onto a street billboard. Any video. Full duration. No cuts.",
};

/** Production cleanroom demo for MS-SEC-STUDIO01 (Studio Sequence). */
export default function CleanroomStudioPage() {
  return (
    <div className="min-h-screen bg-black text-white" data-demo-root>
      <style>{`
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .pin-spacer { background: #000 !important; }
      `}</style>
      <SmoothScroll>
        <StudioSequence />
      </SmoothScroll>
    </div>
  );
}
