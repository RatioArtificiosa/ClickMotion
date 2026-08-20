export type Flavor = {
  id: string;
  title: [string, string];
  desc: string;
  primary: string;
  secondary: string;
};

/** Source order = canLabels[] in webgl-scene.js */
export const FLAVORS: Flavor[] = [
  {
    id: "double-litchi",
    title: ["Double", "Litchi"],
    desc: "Une explosion exotique. Une recette intense en litchi qui rappelle les saveurs d’Asie tropicale.",
    primary: "#3D2B68",
    secondary: "#9089D3",
  },
  {
    id: "coco-citron",
    title: ["Coco", "Citron Vert"],
    desc: "Une parenthèse tropicale. On a mélangé la douceur lactée de la coco et l’acidité du citron vert.",
    primary: "#27326B",
    secondary: "#00A6E2",
  },
  {
    id: "kiwi-concombre",
    title: ["Kiwi", "Concombre"],
    desc: "Le Zero Energy le plus rafraîchissant de la gamme. Le kiwi apporte son éclat juteux, le concombre une grande fraîcheur.",
    primary: "#024A44",
    secondary: "#71BD96",
  },
  {
    id: "peche-blanche",
    title: ["Pêche", "Blanche"],
    desc: "Un instant rempli de douceur. On a créé une energy drink florale et délicatement parfumée à la pêche blanche.",
    primary: "#BA5200",
    secondary: "#EFB36B",
  },
  {
    id: "pomme-rhubarbe",
    title: ["Pomme", "Rhubarbe"],
    desc: "L’energy drink aux fruits du jardin. Une recette qui marie la fraîcheur de la pomme et l'acidité de la rhubarbe.",
    primary: "#9B0984",
    secondary: "#E6A0E8",
  },
  {
    id: "abricot-framboise",
    title: ["Abricot", "Framboise"],
    desc: "Un duo solaire et gourmand. On a mélangé la douceur de l'abricot et la vivacité de la framboise.",
    primary: "#800035",
    secondary: "#FF659D",
  },
];
