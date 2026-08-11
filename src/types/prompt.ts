export type MotionIntensity = 'subtle' | 'medium' | 'aggressive' | 'extreme';
export type PromptType = 'hero' | 'section' | 'landing-page' | 'special';
export type PriceTier = 'free' | 'starter' | 'pro' | 'agency';
export type PromptStatus = 'draft' | 'review' | 'published' | 'archived';
export type AITool = 'cursor' | 'lovable' | 'bolt' | 'claude' | 'grok-build' | 'v0' | 'replit';
export type Framework = 'react' | 'vue' | 'svelte' | 'html';

export interface PromptMetadata {
  id: string;
  title: string;
  slug: string;
  description: string;
  version: string;
  created: string;
  updated: string;
  author: string;
  status: PromptStatus;
  type: PromptType;
  category: string;
  subcategory: string;
  styleTags: string[];
  motionIntensity: MotionIntensity;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  priceTier: PriceTier;
  aiToolsRating: Partial<Record<AITool, number>>;
  frameworksSupported: Framework[];
  previewVideo?: string;
  previewGif?: string;
  thumbnail: string;
  liveDemo?: string;
  videoBackgrounds: VideoAsset[];
  dependencies: Dependency[];
  estimatedTokens: number;
  useCases: string[];
  compatibleWith: string[];
  positionInPage: 'top' | 'middle' | 'bottom' | 'full';
}

export interface VideoAsset {
  file: string;
  format: 'mp4' | 'webm' | 'hls';
  duration: string;
  loop: boolean;
  sizeMb: number;
  poster?: string;
}

export interface Dependency {
  name: string;
  version: string;
  required: boolean;
}

export interface Prompt {
  metadata: PromptMetadata;
  content: string;
  designSystem: DesignSystem;
  motionSpec: MotionSpec;
}

export interface DesignSystem {
  colors: Record<string, string>;
  fonts: { heading: string; body: string; mono?: string };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
}

export interface MotionSpec {
  entrance: MotionConfig[];
  scroll: ScrollTriggerConfig[];
  hover: MotionConfig[];
  parallax: ParallaxConfig[];
}

export interface MotionConfig {
  target: string;
  type: 'framer-motion' | 'gsap';
  properties: Record<string, any>;
  duration: number;
  delay: number;
  easing: string;
  stagger?: number;
}

export interface ScrollTriggerConfig {
  trigger: string;
  start: string;
  end: string;
  scrub: boolean | number;
  pin?: boolean;
  animation: MotionConfig;
}

export interface ParallaxConfig {
  target: string;
  speed: number;
  direction: 'vertical' | 'horizontal';
}
