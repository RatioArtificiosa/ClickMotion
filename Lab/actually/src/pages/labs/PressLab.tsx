import { LabChrome } from "../../components/LabChrome";
import { Press } from "../../sections/Press";

/**
 * Isolated #press lab.
 *
 * No pin — section is self-contained scroll reveals + marquee.
 * No runway needed (before or after).
 *
 * Open: http://localhost:3010/lab/press
 */
export function PressLab() {
  return (
    <div className="min-h-dvh bg-ink text-bone">
      <LabChrome
        sectionNum="05"
        sectionLabel="Press · Quietly noticed"
        pinNote="none · marquee velocity"
      />
      <main>
        <Press />
      </main>
    </div>
  );
}
