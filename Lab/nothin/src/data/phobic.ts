/**
 * Phobic / formes objects — CSS rest poses (home = x:0,y:0 in GSAP).
 * Motion matches live noth.in `Kv()` on `.formes-w` (research/chunks/formes-kv-original.js).
 */

export type PhobicItem = {
  id: string;
  src: string;
  /** CSS left % of stage */
  left: number;
  /** CSS top % of stage */
  top: number;
  /** width in % of stage width */
  width: number;
  /** base rotation (deg) at rest */
  rot: number;
  z: number;
  letter?: string;
};

/**
 * Rest cluster roughly matching live `.formes-w` on desktop.
 * Positions are % of the stage (black void).
 */
/** Nudge entire cluster down slightly (stage % points) */
const SHIFT_Y = 7;

export const PHOBIC_ITEMS: PhobicItem[] = [
  {
    id: "papier",
    src: "/assets/phobic/papier-froisse.webp",
    left: 30,
    top: 10 + SHIFT_Y,
    width: 29,
    rot: 0,
    z: 5,
  },
  {
    id: "asterix",
    src: "/assets/phobic/asterix.webp",
    left: 34,
    top: -3 + SHIFT_Y,
    width: 30,
    rot: 0,
    z: 6,
  },
  {
    id: "coeur",
    src: "/assets/phobic/fluff-orange.png",
    left: 56.5,
    top: -3 + SHIFT_Y,
    width: 15.5,
    rot: -18,
    z: 4,
  },
  {
    id: "chwing",
    src: "/assets/phobic/chwing.webp",
    left: 56,
    top: 20 + SHIFT_Y,
    width: 9,
    rot: 0,
    z: 3,
  },
  {
    id: "bonbon",
    src: "/assets/phobic/bonbon.webp",
    left: 57,
    top: 36 + SHIFT_Y,
    width: 9,
    rot: 112,
    z: 3,
  },
  {
    id: "gold-die",
    src: "/assets/phobic/gold-die.png",
    left: 48,
    top: 42 + SHIFT_Y,
    width: 10,
    rot: -12,
    z: 4,
  },
  // letter debris — M O T I O N ! (sizes mirror previous scatter scale)
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
