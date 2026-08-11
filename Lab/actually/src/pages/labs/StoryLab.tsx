import { LabAfterStrip, LabChrome } from "../../components/LabChrome";
import { Story } from "../../sections/Story";

/**
 * Isolated #story lab.
 *
 * No before-runway. Desktop pin (c-0.4)×vh = 4.6vh for 5 chapters.
 *
 * Open: http://localhost:3010/lab/story
 */
export function StoryLab() {
  return (
    <div className="min-h-dvh bg-bone text-ink">
      <LabChrome
        sectionNum="04"
        sectionLabel="Story · Five years"
        pinNote="(c-0.4)×vh · 5 chapters"
      />
      <main>
        <Story />
      </main>
      <LabAfterStrip
        note="Lab end · story pin released · chapters 2021–2025"
        minHeight="45dvh"
      />
    </div>
  );
}
