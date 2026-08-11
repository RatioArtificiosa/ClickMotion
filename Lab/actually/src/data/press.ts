export const PRESS_OUTLETS = [
  "Meridian",
  "The Long Lunch",
  "Foldout",
  "Salt Journal",
  "Quiet Hours",
] as const;

export type PressQuote = {
  text: string;
  source: string;
};

export const PRESS_QUOTES: PressQuote[] = [
  {
    text: "The rare functional drink that tastes like a decision, not a compromise.",
    source: "Meridian",
  },
  {
    text: "Proof that a can of adaptogens can be as considered as the desk it sits on.",
    source: "Foldout",
  },
  {
    text: "We stopped drinking coffee at our editorial meetings. Nobody has said so out loud.",
    source: "Quiet Hours",
  },
];
