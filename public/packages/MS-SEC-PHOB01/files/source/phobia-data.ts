/**
 * Phobia — rest poses and media for cursor-fleeing forms.
 * GSAP x/y are offsets from these CSS rest positions (home = 0,0).
 * Buyer: replace src paths, letters, and positions freely.
 */

export type PhobiaItem = {
  id: string;
  /** Empty for letter-only debris */
  src: string;
  left: number;
  top: number;
  width: number;
  rot: number;
  z: number;
  letter?: string;
};

/** Nudge entire cluster down slightly (stage % points) */
const SHIFT_Y = 7;

/**
 * Default rest cluster on a black void stage.
 * Paths point at /assets/phobia/* (pack assets copied there).
 */
export const PHOBIA_ITEMS: PhobiaItem[] = [
  {
    id: "papier",
    src: "/assets/phobia/papier-froisse.webp",
    left: 30,
    top: 10 + SHIFT_Y,
    width: 29,
    rot: 0,
    z: 5,
  },
  {
    id: "asterix",
    src: "/assets/phobia/asterix.webp",
    left: 34,
    top: -3 + SHIFT_Y,
    width: 30,
    rot: 0,
    z: 6,
  },
  {
    id: "coeur",
    src: "/assets/phobia/fluff-orange.png",
    left: 56.5,
    top: -3 + SHIFT_Y,
    width: 15.5,
    rot: -18,
    z: 4,
  },
  {
    id: "chwing",
    src: "/assets/phobia/chwing.webp",
    left: 56,
    top: 20 + SHIFT_Y,
    width: 9,
    rot: 0,
    z: 3,
  },
  {
    id: "bonbon",
    src: "/assets/phobia/bonbon.webp",
    left: 57,
    top: 36 + SHIFT_Y,
    width: 9,
    rot: 112,
    z: 3,
  },
  {
    id: "gold-die",
    src: "/assets/phobia/gold-die.png",
    left: 48,
    top: 42 + SHIFT_Y,
    width: 10,
    rot: -12,
    z: 4,
  },
  // letter debris — default spell: M O T I O N !
  {
    id: "L-M",
    src: "",
    left: 24,
    top: 19 + SHIFT_Y,
    width: 3,
    rot: -14,
    z: 8,
    letter: "M",
  },
  {
    id: "L-O1",
    src: "",
    left: 30,
    top: 6 + SHIFT_Y,
    width: 1.6,
    rot: -22,
    z: 8,
    letter: "O",
  },
  {
    id: "L-T",
    src: "",
    left: 30,
    top: 48 + SHIFT_Y,
    width: 1,
    rot: 18,
    z: 8,
    letter: "T",
  },
  {
    id: "L-I",
    src: "",
    left: 48,
    top: 64 + SHIFT_Y,
    width: 0.8,
    rot: 8,
    z: 8,
    letter: "I",
  },
  {
    id: "L-O2",
    src: "",
    left: 68,
    top: 46 + SHIFT_Y,
    width: 1,
    rot: 34,
    z: 8,
    letter: "O",
  },
  {
    id: "L-N",
    src: "",
    left: 64,
    top: 58 + SHIFT_Y,
    width: 1.1,
    rot: 12,
    z: 8,
    letter: "N",
  },
  {
    id: "L-bang",
    src: "",
    left: 67.5,
    top: 20 + SHIFT_Y,
    width: 1.2,
    rot: 28,
    z: 8,
    letter: "!",
  },
];

/** Desktop / mobile motion params (live-proven) */
export const PHOBIA_PARAMS = {
  desktop: {
    influenceRadius: 460,
    maxDistance: 380,
    rotForce: 30,
    scaleForce: 0.2,
  },
  mobile: {
    influenceRadius: 260,
    maxDistance: 110,
    rotForce: 12,
    scaleForce: 0.1,
  },
} as const;
