export type MotionIntensity = "subtle" | "medium" | "aggressive" | "extreme";
export type PromptType = "hero" | "section" | "landing-page" | "special";
export type PriceTier = "free" | "starter" | "pro" | "agency";
export type PromptStatus = "draft" | "review" | "published" | "archived";
export type AITool = "cursor" | "lovable" | "bolt" | "claude" | "grok-build" | "v0" | "replit";
export type Framework = "react" | "vue" | "svelte" | "html";
export type Difficulty = "beginner" | "intermediate" | "advanced" | "expert";
export type PagePosition = "top" | "middle" | "bottom" | "full";

// Re-export canonical taxonomy types
export type { Category, StyleTag, MotionIntensityConfig, TechnicalTag } from "@/config/taxonomy";
