/**
 * Studio Sequence - configuration
 *
 * Edit this file first to swap film, plate, earn, or labels.
 * Paths below assume you placed pack assets under public/ as START-HERE.md describes.
 */

export type BillboardRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type StudioVideoPolicy = {
  /** Play the entire source file end to end. Scroll never seeks video time. */
  playFullLength: true;
  loop: boolean;
  muted: boolean;
  preload: "auto" | "metadata" | "none";
  /** Leave empty to show the film as authored. */
  cssFilter?: string;
};

export type StudioSequenceConfig = {
  sectionId: string;
  ariaLabel: string;
  videoSrc: string;
  posterSrc?: string;
  plateSrc: string;
  plateWidth: number;
  plateHeight: number;
  billboard: BillboardRect;
  virtualViewportsDesktop: number;
  virtualViewportsMobile: number;
  holdIn: number;
  holdOut: number;
  video: StudioVideoPolicy;
  menuLabel: string;
};

/**
 * Default demo board. Swap videoSrc / plateSrc for any brand
 * without touching camera math.
 */
export const STUDIO_DEFAULTS: StudioSequenceConfig = {
  sectionId: "studio-sequence",
  ariaLabel:
    "Studio cinematic - camera pull-out from full-bleed film into street billboard",
  videoSrc: "/assets/studio/billboard-film.mp4",
  plateSrc: "/assets/studio/street-plate.png",
  plateWidth: 1920,
  plateHeight: 1080,
  billboard: {
    left: 0.2521,
    top: 0.263,
    width: 0.5026,
    height: 0.387,
  },
  virtualViewportsDesktop: 4,
  virtualViewportsMobile: 3,
  holdIn: 0.06,
  holdOut: 0.9,
  video: {
    playFullLength: true,
    loop: true,
    muted: true,
    preload: "auto",
    cssFilter: undefined,
  },
  menuLabel: "Menu",
};

export type StudioSequenceProps = Partial<StudioSequenceConfig> & {
  className?: string;
};
