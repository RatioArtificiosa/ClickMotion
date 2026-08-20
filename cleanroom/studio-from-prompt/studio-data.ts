/**
 * MS-SEC-STUDIO01 - Studio Sequence configuration
 *
 * **Edit this file first** to swap film, plate, pin feel, or chrome labels.
 * The section component never hardcodes product-specific media URLs except
 * via these defaults (so any brand can drop in any video).
 *
 * Media roles (ClickMotion law):
 * - videoSrc     → pure billboard film (client HD). Full length. No UI chrome.
 * - plateSrc     → street / facade still the camera pulls out to
 * - backgrounds  → separate small encode from the SAME pure film (not this path)
 * - storefront   → dual previews (page + FS) are separate capture files
 */

export type BillboardRect = {
  /** 0-1 fraction of plate width from left edge of plate */
  left: number;
  /** 0-1 fraction of plate height from top edge of plate */
  top: number;
  width: number;
  height: number;
};

export type StudioVideoPolicy = {
  /**
   * Always play the **entire** source file end-to-end.
   * Never trim, seek-to-mid, or scrub video time with scroll.
   * Scroll only drives the camera pull-out; film time is independent.
   */
  playFullLength: true;
  /** Loop the full file after the last frame (seamless billboard feel). */
  loop: boolean;
  /** Required for reliable autoplay on modern browsers. */
  muted: boolean;
  /** Prefer auto so long films buffer ahead of the pin ritual. */
  preload: "auto" | "metadata" | "none";
  /**
   * Appearance lock: leave empty / undefined to show film as authored.
   * Do not apply contrast/sat/brightness “looks” unless the buyer asks.
   */
  cssFilter?: string;
};

export type StudioSequenceConfig = {
  /** DOM id for the section root */
  sectionId: string;
  /** Accessible name */
  ariaLabel: string;
  /** Pure billboard film - any public URL or /assets/... path */
  videoSrc: string;
  /** Optional poster still (first paint before first frame) */
  posterSrc?: string;
  /** Street / stage plate image */
  plateSrc: string;
  /** Natural pixel size of the plate (used for object-fit: cover math) */
  plateWidth: number;
  plateHeight: number;
  /**
   * Gray billboard inner rect on the plate (not the white frame).
   * Defaults match ny.png. Re-measure when swapping plates.
   */
  billboard: BillboardRect;
  /** Virtual earn viewports on desktop (>=768). Not page height. */
  virtualViewportsDesktop: number;
  /** Virtual earn viewports on mobile. Not page height. */
  virtualViewportsMobile: number;
  /** Hold full-bleed film at start of pin (0-1 progress) */
  holdIn: number;
  /** Settle on street before pin end (0-1 progress) */
  holdOut: number;
  video: StudioVideoPolicy;
  /** Optional micro-label in lab chrome (not required for production) */
  menuLabel: string;
};

/**
 * Default demo board - Surreal Studio pure film on NY street plate.
 * Replace videoSrc / plateSrc for any brand without touching camera math.
 */
export const STUDIO_DEFAULTS: StudioSequenceConfig = {
  sectionId: "studio-sequence",
  ariaLabel:
    "Studio cinematic - camera pull-out from full-bleed film into street billboard",
  // Client HD pure film (no UI frames). Full length. Same source as /backgrounds encode.
  videoSrc: "/assets/videos/studio-surreal-v1.mp4",
  posterSrc: "/assets/posters/studio-surreal-v1.webp",
  plateSrc: "/assets/images/studio/ny.png",
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
    // Appearance lock - film as authored
    cssFilter: undefined,
  },
  menuLabel: "Menu",
};

/** Operator / package paths (not imported by the section runtime). */
export const STUDIO_MEDIA_MAP = {
  productId: "MS-SEC-STUDIO01",
  /** Pure film - billboard + buyer client HD */
  clientHd: "/assets/videos/studio-surreal-v1.mp4",
  clientHdAlt: "/assets/videos/client/studio-surreal-client-v1.mp4",
  /** Lab source of truth for pure film */
  labPureFilm: "Lab/nothin/public/assets/studio/surreal.mp4",
  /** Small /backgrounds library tile (never client HD path) */
  backgroundsPreview: "/assets/videos/backgrounds/studio-surreal-bg-v1.mp4",
  pureFilmPoster: "/assets/posters/studio-surreal-v1.webp",
  /** Storefront dual previews (full length Premiere exports) */
  previewPage: "/assets/videos/studio-sequence-preview-v1.webm",
  previewFs: "/assets/videos/studio-sequence-preview-fs-v1.mp4",
  thumbnail: "/thumbnails/MS-SEC-STUDIO01.webp",
  storefrontPoster: "/assets/posters/studio-sequence-preview-v1.webp",
  plate: "/assets/images/studio/ny.png",
} as const;

export type StudioSequenceProps = Partial<StudioSequenceConfig> & {
  className?: string;
};
