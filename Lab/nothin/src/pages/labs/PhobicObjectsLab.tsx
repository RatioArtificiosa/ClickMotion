import { NothChrome } from "../../components/NothChrome";
import { PhobicObjects } from "../../sections/PhobicObjects";

/**
 * Isolated phobic objects lab.
 * Overlay: Menu :: only.
 * Open: http://localhost:3030/lab/phobic-objects
 */
export function PhobicObjectsLab() {
  return (
    <div className="min-h-dvh bg-black">
      <NothChrome />
      <main>
        <PhobicObjects />
      </main>
    </div>
  );
}
