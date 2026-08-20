/** Visible product copy. Brand is Zero Energy. No emails, no outbound URLs. */

export const BRAND = "Zero Energy";

export type BenefitCopy = {
  id: string;
  strike: string;
  titleLines: string[];
  body: string;
};

export const BENEFITS: BenefitCopy[] = [
  {
    id: "benefits-1",
    strike: "11G de sucres",
    titleLines: ["Moins", "de sucre"],
    body: "Une boisson énergisante moins sucrée, avec exclusivement du sucre de canne, choisi pour son origine végétale et son caractère en bouche.",
  },
  {
    id: "benefits-2",
    strike: "Arômes artificiels",
    titleLines: ["arômes", "naturels"],
    body: "Pour leur puissance aromatique et leur richesse gustative, on a soigneusement sélectionné des arômes naturels issus de fruits et de plantes.",
  },
  {
    id: "benefits-3",
    strike: "Caféine artificielle",
    titleLines: ["caféine issue de grains de café"],
    body: "Pour l’énergie, on a choisi des grains de café, source naturelle de caféine, complétés par du guarana, lui aussi naturel.",
  },
  {
    id: "benefits-4",
    strike: "Aspartame sucralose acésulfame K",
    titleLines: ["stevia"],
    body: "Pour compléter le sucre de canne et apporter douceur et gourmandise, on a choisi d’ajouter un édulcorant d’origine végétale avec des extraits de stévia.",
  },
];

export type FaqItem = {
  q: string;
  a: string;
};

export const FAQ: FaqItem[] = [
  {
    q: "Qu'est-ce qui distingue Zero Energy des autres boissons énergisantes ?",
    a: "Zero Energy a été pensée comme la boisson énergisante parfaite. On a fait le choix d'une recette à teneur réduite en sucres par rapport aux boissons énergisantes classiques, de mettre des arômes naturels plutôt que des arômes artificiels, de mettre de la caféine issue de grains de café plutôt que de la caféine de synthèse, et de mettre un édulcorant d’origine végétale (la stévia) plutôt que des édulcorants de synthèse (aspartame, sucralose et acésulfame K).",
  },
  {
    q: "Zero Energy est-elle une boisson pétillante ?",
    a: "Oui, Zero Energy est une boisson gazeuse. On a choisi une effervescence marquée pour amplifier la fraîcheur en bouche.",
  },
  {
    q: "Quelle est la teneur en sucres et en calories de Zero Energy ?",
    a: "Zero Energy contient 4 g de sucre et 17 kcal pour 100 mL. On a dosé le sucre avec parcimonie en associant sucre de canne et extraits de stévia.",
  },
  {
    q: "Quelles sont les vitamines présentes dans Zero Energy ?",
    a: "Une canette de Zero Energy contient de la niacine (vitamine B3), de la vitamine B6 et de la biotine (vitamine B8) qui contribuent à un métabolisme énergétique normal. La niacine (vitamine B3) et la vitamine B6 contribuent à la réduction de la fatigue.",
  },
  {
    q: "Zero Energy contient-elle des colorants artificiels ?",
    a: "Non. On a fait le choix de ne pas utiliser de colorants artificiels dans Zero Energy. Nos couleurs sont élaborées à partir de denrées alimentaires colorantes.",
  },
  {
    q: "Zero Energy est-elle une boisson contenant de la taurine ?",
    a: "Non, nous n’avons pas mis de taurine dans Zero Energy. La taurine est un ingrédient typique des boissons énergisantes traditionnelles, mais qui n'apporte pas d'énergie en elle-même. Avec Zero Energy, on est partis sur des sources végétales de caféine (grains de café et guarana), et on a préféré garder une recette simple, sans ajouter d'ingrédient qu'on ne jugeait pas indispensable.",
  },
  {
    q: "Zero Energy peut-elle être consommée par tout le monde ?",
    a: "Ayant une teneur élevée en caféine (32 mg/100ml), on déconseille la consommation de Zero Energy aux enfants et aux femmes enceintes ou allaitantes.",
  },
  {
    q: "Où est embouteillé Zero Energy ?",
    a: "Zero Energy est embouteillée en France avec des standards de qualité européens.",
  },
  {
    q: "Comment conserver ma canette de Zero Energy ?",
    a: "Avant ouverture, conservez votre canette à température ambiante, à l'abri de la lumière et de la chaleur. Pour la déguster au mieux, on recommande de la servir bien fraîche. Après ouverture, à conserver au réfrigérateur et à consommer sous 1 jour. La date limite de consommation est indiquée sous la canette.",
  },
];

export const CLOSER = {
  kicker: "ZERO BULLSHIT",
  line: "Six saveurs. Moins de sucre. Arômes naturels. Caféine végétale.",
  copyright: "© 2026 ZERO ENERGY",
};
