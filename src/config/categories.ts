/**
 * @deprecated — canonical source is `@/config/taxonomy`.
 * This file re-exports from taxonomy for backward compatibility.
 * New code should import from `@/config/taxonomy` directly.
 */
export {
  categories,
  styleTags,
  motionIntensityLevels,
  technicalTags,
  categoryIds,
  subcategoryMap,
  styleTagIds,
  promptTypes,
} from "@/config/taxonomy";
export type { Category, StyleTag, MotionIntensityConfig, TechnicalTag } from "@/config/taxonomy";
