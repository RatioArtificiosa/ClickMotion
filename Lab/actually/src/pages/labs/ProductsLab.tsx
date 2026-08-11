import { LabChrome } from "../../components/LabChrome";
import { ShopProducts } from "../../sections/Shop";

/**
 * Isolated product price-boxes lab — Order direct / THE RANGE.
 * No pin, no runway.
 *
 * Open: http://localhost:3010/lab/products
 */
export function ProductsLab() {
  return (
    <div className="min-h-dvh bg-bone text-ink">
      <LabChrome
        sectionNum="06b"
        sectionLabel="Products · Price boxes"
        pinNote="none · cards + pack toggle"
      />
      <main>
        <ShopProducts standalone />
      </main>
    </div>
  );
}
