import { LabAfterStrip, LabChrome } from "../../components/LabChrome";
import { Inside } from "../../sections/Inside";

/**
 * Isolated #inside lab.
 *
 * No before-runway. pinSpacing 4×vh + snap 5 stops.
 *
 * Open: http://localhost:3010/lab/inside
 */
export function InsideLab() {
  return (
    <div className="min-h-dvh bg-ink text-bone">
      <LabChrome
        sectionNum="03"
        sectionLabel="Inside · Functional ingredients"
        pinNote="4×vh snap 0/.25/.5/.75/1"
      />
      <main>
        <Inside />
      </main>
      <LabAfterStrip
        note="Lab end · inside pin released · 4 ingredients cycled"
        minHeight="45dvh"
        bg="var(--color-ink)"
        color="rgba(239,237,230,0.55)"
      />
    </div>
  );
}
