import type { Metadata } from "next";
import StudioSequence from "../../../../../cleanroom/studio-from-prompt/StudioSequence";

export const metadata: Metadata = {
  title: "Studio Sequence · Camera Pull-Out Billboard Section",
  description:
    "Pin-until-complete cinematic pull-out: open inside the film, then settle onto a street billboard where your story keeps playing.",
};

/**
 * Production cleanroom demo for MS-SEC-STUDIO01 (Studio Sequence).
 * No Scroller: do not overflow-hidden the page. After progress 1,
 * the next sibling may scroll in. Film free-plays. Not PSAVE.
 */
export default function CleanroomStudioPage() {
  return (
    <div className="bg-black text-white" data-demo-root>
      <StudioSequence />
      <section
        id="studio-after"
        className="flex min-h-[40dvh] items-center justify-center bg-black px-6 py-16 text-white/50"
      >
        <p className="max-w-md text-center text-[13px] uppercase tracking-[0.12em]">
          After the sequence
        </p>
      </section>
    </div>
  );
}
