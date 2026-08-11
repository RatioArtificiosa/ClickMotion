import { LabChrome } from "../../components/LabChrome";
import { Stockists } from "../../sections/Shop";

/**
 * Isolated #stockists lab — Where available (city columns + coming soon).
 * No pin, no runway.
 *
 * Open: http://localhost:3010/lab/stockists
 */
export function StockistsLab() {
  return (
    <div className="min-h-dvh bg-bone text-ink">
      <LabChrome
        sectionNum="06a"
        sectionLabel="Stockists · Where available"
        pinNote="none · city columns"
      />
      <main>
        <Stockists standalone />
      </main>
    </div>
  );
}
