export type IngredientRow = {
  id: string;
  name: string;
  dosageMg: number;
};

export const INGREDIENTS: IngredientRow[] = [
  { id: "l-theanine", name: "L-Theanine", dosageMg: 200 },
  { id: "lions-mane", name: "Lion's Mane", dosageMg: 500 },
  { id: "rhodiola", name: "Rhodiola Rosea", dosageMg: 150 },
  { id: "bacopa", name: "Bacopa Monnieri", dosageMg: 300 },
];

export const TOTAL_BLEND_MG = INGREDIENTS.reduce((s, i) => s + i.dosageMg, 0);

export type Flavor = {
  id: string;
  skuNumber: string;
  number: string; // ACTUALLY.01
  name: string;
  descriptor: string;
  flavorPair: string;
  pitch: string;
  bloomColor: string;
  leadIngredient: string;
};

export const FLAVORS: Flavor[] = [
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
  },
  {
    id: "dawn",
    skuNumber: "02",
    number: "ACTUALLY.02",
    name: "Dawn",
    descriptor: "morning",
    flavorPair: "Ginger & Bergamot",
    pitch:
      "For mornings that need momentum without the spike. Warm ginger and bright bergamot over the same clinical blend — focus that arrives clean and stays.",
    bloomColor: "#e8c9a0",
    leadIngredient: "lions-mane",
  },
  {
    id: "dusk",
    skuNumber: "03",
    number: "ACTUALLY.03",
    name: "Dusk",
    descriptor: "evening",
    flavorPair: "Blackcurrant & Manuka",
    pitch:
      "For late focus, when the day has already asked enough. Blackcurrant depth and manuka sweetness — the same blend, dialed for evenings that still need clarity.",
    bloomColor: "#c9b5c8",
    leadIngredient: "rhodiola",
  },
];

/** Stage tilt sign per flavor index (site: [1,-1,1]) */
export const FLAVOR_TILT = [1, -1, 1] as const;
