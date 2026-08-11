export type IngredientStage = {
  id: string;
  pillLabel: string;
  displayLines: string[];
  scientificName: string;
  counter: string;
  description: string;
  source: string;
  role: string;
  dosageMg: number;
  haloColor: string;
};

/** Four functional inputs — desktop pin stages + mobile deck. */
export const INSIDE_INGREDIENTS: IngredientStage[] = [
  {
    id: "l-theanine",
    pillLabel: "L-THEANINE",
    displayLines: ["L-", "THEANINE"],
    scientificName: "Camellia sinensis",
    counter: "01 / 04",
    description:
      "Promotes calm focus by encouraging alpha brain wave activity. Found naturally in green tea leaves.",
    source: "Green tea leaf",
    role: "Calm, without sedation",
    dosageMg: 200,
    haloColor: "#BCD3D8",
  },
  {
    id: "lions-mane",
    pillLabel: "LION'S MANE",
    displayLines: ["LION'S", "MANE"],
    scientificName: "Hericium erinaceus",
    counter: "02 / 04",
    description:
      "A medicinal mushroom that supports nerve growth factor production and long-term cognitive clarity.",
    source: "Whole fruiting body",
    role: "Long-term clarity",
    dosageMg: 500,
    haloColor: "#D4B896",
  },
  {
    id: "rhodiola",
    pillLabel: "RHODIOLA",
    displayLines: ["RHODIOLA"],
    scientificName: "Rhodiola rosea",
    counter: "03 / 04",
    description:
      "An adaptogenic root that reduces mental fatigue and supports sustained attention under stress.",
    source: "Arctic root extract",
    role: "Fatigue resistance",
    dosageMg: 150,
    haloColor: "#C9B5C8",
  },
  {
    id: "bacopa",
    pillLabel: "BACOPA",
    displayLines: ["BACOPA"],
    scientificName: "Bacopa monnieri",
    counter: "04 / 04",
    description:
      "An ayurvedic herb traditionally used to enhance memory and information retention over time.",
    source: "Whole-plant extract",
    role: "Memory and retention",
    dosageMg: 300,
    haloColor: "#B5C8B0",
  },
];

export const BLEND_TOTAL_MG = INSIDE_INGREDIENTS.reduce(
  (s, i) => s + i.dosageMg,
  0,
);
