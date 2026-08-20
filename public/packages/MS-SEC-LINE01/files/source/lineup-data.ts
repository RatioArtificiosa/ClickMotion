/**
 * LINEUP - product catalog + section chrome for MS-SEC-LINE01.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * AI / BUYER CUSTOMIZATION - read this first
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Everything the visitor reads and the 3D stage shows is driven from THIS FILE.
 * Do not hardcode product count elsewhere. LineupSection maps over PRODUCTS;
 * virtual earn, snap points, tabs, blooms, ghosts, and mobile cards all scale
 * with PRODUCTS.length.
 *
 * HOW TO PLACE ANY PRODUCT LINE
 * 1. Edit SECTION_META (eyebrow, H2, swipe hint, total footer labels).
 * 2. Replace SPEC_ROWS with features/ingredients/materials for your category
 *    (or leave empty and hide specs in copy by using empty array + AI hide).
 * 3. Replace PRODUCTS entirely with your SKUs (2-8 recommended).
 * 4. For each product set: id, skuNumber, number (BRAND.01), name, descriptor,
 *    flavorPair (subtitle), pitch, bloomColor, leadIngredient (spec id),
 *    optional labelPath (absolute public URL for UV map).
 * 5. Drop mesh at /models/… and textures; wire LABEL_MAP in Can3D.tsx or
 *    set labelPath on each product.
 * 6. Update SECTION_META.eyebrowLabel + title when N changes
 *    (e.g. 5 products → "Five expressions." / "Five products").
 *
 * EXPAND FROM 3 TO N
 * Append objects to PRODUCTS. No other scroll math required. Then rewrite
 * SECTION_META strings so the H2 is not stuck on "Three formulations."
 *
 * REDUCE
 * Delete entries from PRODUCTS. Pin shortens automatically.
 *
 * NON-BEVERAGE
 * Treat dosageMg as a generic numeric column (price points, SPF, ml, watts).
 * Change SECTION_META.specUnit, totalLabel, totalUnit, leadBadge accordingly.
 */

export type SpecRow = {
  id: string;
  name: string;
  /**
   * Primary numeric cell (demo: milligrams).
   * For other industries: price, volume, SPF, count, watts - any number.
   */
  dosageMg: number;
  /** Optional per-row unit override (defaults to SECTION_META.specUnit). */
  unit?: string;
};

/**
 * Shared “spec sheet” rows shown under every product card.
 * Lead row is reordered to top per product via leadIngredient.
 * Swap entirely for materials, dimensions, notes, kit contents, etc.
 */
export const SPEC_ROWS: SpecRow[] = [
  { id: "l-theanine", name: "L-Theanine", dosageMg: 200 },
  { id: "lions-mane", name: "Lion's Mane", dosageMg: 500 },
  { id: "rhodiola", name: "Rhodiola Rosea", dosageMg: 150 },
  { id: "bacopa", name: "Bacopa Monnieri", dosageMg: 300 },
];

/** @deprecated alias - prefer SPEC_ROWS */
export const INGREDIENTS = SPEC_ROWS;

export const TOTAL_BLEND_MG = SPEC_ROWS.reduce((s, i) => s + i.dosageMg, 0);

/**
 * Section chrome - update when product count or industry changes.
 * LineupSection reads these for eyebrow, H2, mobile hint, and total footer.
 */
export type SectionMeta = {
  /** Left eyebrow index e.g. "02" */
  sectionIndex: string;
  /** Right of slash e.g. "Three flavors" / "Five products" */
  eyebrowLabel: string;
  /** Main H2 including trailing period e.g. "Three formulations." */
  title: string;
  /** Mobile swipe line */
  mobileSwipeHint: string;
  /** Footer total label e.g. "Active blend" / "Kit total" / "From" */
  totalLabel: string;
  /** Footer total unit e.g. "mg" / "ml" / "USD" */
  totalUnit: string;
  /** Numeric total (demo: sum of SPEC_ROWS). Override freely. */
  totalValue: number;
  /** Spec column unit under each row */
  specUnit: string;
  /** Badge on lead row e.g. "Lead" / "Hero note" / "Featured" */
  leadBadge: string;
};

export const SECTION_META: SectionMeta = {
  sectionIndex: "02",
  eyebrowLabel: "Three flavors",
  title: "Three formulations.",
  mobileSwipeHint: "Swipe to taste",
  totalLabel: "Active blend",
  totalUnit: "mg",
  totalValue: TOTAL_BLEND_MG,
  specUnit: "mg",
  leadBadge: "Lead",
};

export type LineupProduct = {
  id: string;
  /** Tab / ghost number label e.g. "01" */
  skuNumber: string;
  /** Wordmark line e.g. "ACTUALLY.01" or "ACME.01" */
  number: string;
  /** Display name e.g. Clear / Serum One / Estate Reserve */
  name: string;
  /** Micro role tag e.g. signature / morning / hero */
  descriptor: string;
  /** Subtitle / pair line e.g. Cucumber & Yuzu */
  flavorPair: string;
  /** Body pitch (1 short paragraph) */
  pitch: string;
  /** Accent + stage bloom hex */
  bloomColor: string;
  /** Spec row id to mark as Lead (must exist in SPEC_ROWS when specs shown) */
  leadIngredient: string;
  /**
   * Optional public path to label / product texture.
   * When set, overrides Can3D LABEL_MAP for this SKU.
   * e.g. "/textures/labels/my-sku-01.png"
   */
  labelPath?: string;
  /**
   * Optional mesh path if this SKU uses a different vessel than the default
   * can.glb (advanced - wire in Can3D / stage when needed).
   */
  meshPath?: string;
};

/** @deprecated alias for LineupProduct */
export type Flavor = LineupProduct;

/**
 * Default demo: three nootropic SKUs. Replace entirely for buyer brand.
 *
 * EXPAND: append objects; pin + snap + tabs scale with PRODUCTS.length.
 * CONTRACT: delete objects; pin shortens.
 * After changing length, update SECTION_META.eyebrowLabel + title.
 */
export const PRODUCTS: LineupProduct[] = [
  {
    id: "clear",
    skuNumber: "01",
    number: "ACTUALLY.01",
    name: "Clear",
    descriptor: "signature",
    flavorPair: "Cucumber & Yuzu",
    pitch:
      "The signature blend, paired with cucumber and yuzu. Clean, dry, faintly green. Built for the kind of work that asks you to stay present without raising the volume.",
    bloomColor: "#bcd3d8",
    leadIngredient: "l-theanine",
    labelPath: "/textures/labels/still-01-clear-2.png",
  },
  {
    id: "dawn",
    skuNumber: "02",
    number: "ACTUALLY.02",
    name: "Dawn",
    descriptor: "morning",
    flavorPair: "Ginger & Bergamot",
    pitch:
      "For mornings that need momentum without the spike. Warm ginger and bright bergamot over the same clinical blend - focus that arrives clean and stays.",
    bloomColor: "#e8c9a0",
    leadIngredient: "lions-mane",
    labelPath: "/textures/labels/still-02-dawn-2.png",
  },
  {
    id: "dusk",
    skuNumber: "03",
    number: "ACTUALLY.03",
    name: "Dusk",
    descriptor: "evening",
    flavorPair: "Blackcurrant & Manuka",
    pitch:
      "For late focus, when the day has already asked enough. Blackcurrant depth and manuka sweetness - the same blend, dialed for evenings that still need clarity.",
    bloomColor: "#c9b5c8",
    leadIngredient: "rhodiola",
    labelPath: "/textures/labels/still-03-dusk-2.png",
  },
];

/** @deprecated alias - prefer PRODUCTS */
export const FLAVORS = PRODUCTS;

/** Alternating stage tilt sign by index (works for any length). */
export function tiltFor(index: number): number {
  return index % 2 === 0 ? 1 : -1;
}

/** @deprecated fixed-length tilt table */
export const FLAVOR_TILT = PRODUCTS.map((_, i) => tiltFor(i));

export const PRODUCT_COUNT = PRODUCTS.length;

/** English-ish count word for AI-suggested eyebrow updates (2-12). */
export function countWord(n: number): string {
  const words = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
  ];
  return words[n] ?? String(n);
}

/**
 * Suggested SECTION_META strings after changing product count.
 * AI should apply these (or better brand-native wording).
 */
export function suggestedMetaForCount(n: number): Pick<
  SectionMeta,
  "eyebrowLabel" | "title"
> {
  const w = countWord(n);
  return {
    eyebrowLabel: `${w} flavors`,
    title: `${w} formulations.`,
  };
}
