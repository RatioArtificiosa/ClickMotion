import { NothChrome } from "../../components/NothChrome";
import { StudioSequence } from "../../sections/StudioSequence";

/**
 * Isolated studio cinematic lab.
 * Overlay: Menu :: only (no N′, Sound, or lab bottom bar).
 * No after-strip runway — pin distance lives in StudioSequence ScrollTrigger only.
 * Open: http://localhost:3032/lab/studio-sequence
 */
export function StudioSequenceLab() {
  return (
    <div className="bg-black">
      <NothChrome />
      <main>
        <StudioSequence />
      </main>
    </div>
  );
}
