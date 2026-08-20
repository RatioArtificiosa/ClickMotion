/** CMS domain types - single source for admin + public. No em dashes in public copy. */

export type ProductType = "hero" | "section" | "landing-page" | "special";
export type PriceTier = "free" | "starter" | "pro" | "agency";
export type ProductStatus = "draft" | "review" | "published" | "archived";
export type MotionIntensity = "subtle" | "medium" | "aggressive" | "extreme";

export type CmsGenre = {
  id: string;
  label: string;
  description: string;
  icon: string;
  /** Sort order (0 = first). Drag-reorder updates this. */
  sortOrder: number;
  /** Hidden genres never appear in public filters. */
  visible: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CmsProduct = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Primary type (card label / related scoring). */
  type: ProductType;
  /**
   * Optional extra type memberships for browse filters.
   * When set, product matches Hero AND Landing Page (etc.) the same way
   * type+genre already allows Hero + Agency across two axes.
   * Always includes `type` when present; filter matches type or types[].
   */
  types?: ProductType[];
  /** Genre id (was category). */
  genreId: string;
  styleTags: string[];
  motionIntensity: MotionIntensity;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  priceTier: PriceTier;
  status: ProductStatus;
  /** Full prompt body (markdown). */
  body: string;
  thumbnail: string;
  poster: string;
  /** Non-interactive capture of the real design (page + gallery). */
  previewVideo: string;
  /** Fullscreen overlay capture (often a separate 1080p file). */
  previewVideoFullscreen?: string;
  aiTools: string[];
  sortOrder: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
};

export type CmsCollection = {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  productIds: string[];
  priceTier: PriceTier;
  isFeatured: boolean;
  sortOrder: number;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CmsStore = {
  version: 1;
  seededAt: string | null;
  genres: CmsGenre[];
  products: CmsProduct[];
  collections: CmsCollection[];
};

export type CmsProductInput = Partial<
  Omit<CmsProduct, "id" | "createdAt" | "updatedAt">
> & {
  title: string;
  slug?: string;
  type?: ProductType;
  genreId?: string;
};

export type CmsGenreInput = Partial<Omit<CmsGenre, "id" | "createdAt" | "updatedAt">> & {
  label: string;
  id?: string;
};

export type CmsCollectionInput = Partial<
  Omit<CmsCollection, "id" | "createdAt" | "updatedAt">
> & {
  title: string;
  slug?: string;
};
