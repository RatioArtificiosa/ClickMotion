/**
 * MS Canonical Taxonomy — single source of truth.
 * categories.ts re-exports from here for backward compat.
 * DO NOT duplicate these arrays elsewhere. Import from @/config/taxonomy.
 */

export interface Category {
  id: string;
  label: string;
  description: string;
  icon: string;
  subcategories: { id: string; label: string }[];
}

export interface StyleTag {
  id: string;
  label: string;
  description: string;
}

export interface MotionIntensityConfig {
  id: string;
  label: string;
  description: string;
  maxAnimations: number;
}

// ── Categories ──────────────────────────────────────────────────────────
export const categories: Category[] = [
  {
    id: "saas",
    label: "SaaS",
    description: "Software-as-a-Service landing pages and dashboards",
    icon: "Cloud",
    subcategories: [
      { id: "ai-product", label: "AI Product" },
      { id: "devtools", label: "Developer Tools" },
      { id: "analytics", label: "Analytics" },
      { id: "productivity", label: "Productivity" },
      { id: "api-platform", label: "API Platform" },
    ],
  },
  {
    id: "agency",
    label: "Agency",
    description: "Creative and digital agency websites",
    icon: "Palette",
    subcategories: [
      { id: "creative", label: "Creative Agency" },
      { id: "marketing", label: "Marketing Agency" },
      { id: "ai-agency", label: "AI Agency" },
      { id: "design-studio", label: "Design Studio" },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    description: "Personal and professional portfolios",
    icon: "User",
    subcategories: [
      { id: "developer", label: "Developer" },
      { id: "designer", label: "Designer" },
      { id: "photographer", label: "Photographer" },
      { id: "executive", label: "Executive" },
    ],
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    description: "Online stores and product showcases",
    icon: "ShoppingBag",
    subcategories: [
      { id: "fashion", label: "Fashion" },
      { id: "electronics", label: "Electronics" },
      { id: "food-beverage", label: "Food & Beverage" },
      { id: "luxury", label: "Luxury" },
    ],
  },
  {
    id: "fintech",
    label: "Fintech",
    description: "Financial technology and banking",
    icon: "Landmark",
    subcategories: [
      { id: "banking", label: "Banking" },
      { id: "crypto", label: "Crypto & Web3" },
      { id: "payments", label: "Payments" },
      { id: "investing", label: "Investing" },
    ],
  },
  {
    id: "health",
    label: "Health & Wellness",
    description: "Healthcare and wellness brands",
    icon: "Heart",
    subcategories: [
      { id: "medical", label: "Medical" },
      { id: "fitness", label: "Fitness" },
      { id: "mental-health", label: "Mental Health" },
      { id: "wellness", label: "Wellness" },
    ],
  },
  {
    id: "tech",
    label: "Tech & Startup",
    description: "Technology startups and products",
    icon: "Cpu",
    subcategories: [
      { id: "ai-ml", label: "AI & ML" },
      { id: "cybersecurity", label: "Cybersecurity" },
      { id: "cloud", label: "Cloud Infrastructure" },
      { id: "hardware", label: "Hardware" },
    ],
  },
  {
    id: "real-estate",
    label: "Real Estate",
    description: "Property and real estate platforms",
    icon: "Building",
    subcategories: [
      { id: "residential", label: "Residential" },
      { id: "commercial", label: "Commercial" },
      { id: "luxury-real-estate", label: "Luxury" },
    ],
  },
  {
    id: "education",
    label: "Education",
    description: "EdTech and learning platforms",
    icon: "GraduationCap",
    subcategories: [
      { id: "online-courses", label: "Online Courses" },
      { id: "university", label: "University" },
      { id: "coding-bootcamp", label: "Coding Bootcamp" },
    ],
  },
  {
    id: "travel",
    label: "Travel & Hospitality",
    description: "Travel, hotels, and hospitality",
    icon: "Plane",
    subcategories: [
      { id: "hotels", label: "Hotels" },
      { id: "tours", label: "Tours & Experiences" },
      { id: "restaurants", label: "Restaurants" },
    ],
  },
];

// Flat list of valid category ids (for validation)
export const categoryIds = categories.map((c) => c.id) as string[];
export const subcategoryMap = new Map(
  categories.flatMap((c) => c.subcategories.map((s) => [s.id, c.id] as const))
);

// ── Style Tags ──────────────────────────────────────────────────────────
export const styleTags: StyleTag[] = [
  { id: "dark-cinematic", label: "Dark Cinematic", description: "Deep blacks, dramatic lighting, film-grade feel" },
  { id: "liquid-glass", label: "Liquid Glass", description: "Glassmorphism with fluid, refractive effects" },
  { id: "minimal", label: "Minimal", description: "Clean whitespace, subtle typography, restrained motion" },
  { id: "brutalist", label: "Brutalist", description: "Raw, bold typography, unconventional layouts" },
  { id: "neon-glow", label: "Neon Glow", description: "Vibrant neon accents on dark backgrounds" },
  { id: "gradient-mesh", label: "Gradient Mesh", description: "Complex animated gradient backgrounds" },
  { id: "particle-field", label: "Particle Field", description: "Canvas-based particle animations" },
  { id: "retro-futurism", label: "Retro Futurism", description: "80s/90s inspired with modern tech" },
  { id: "organic", label: "Organic", description: "Natural shapes, earth tones, flowing curves" },
  { id: "luxury", label: "Luxury", description: "Gold accents, serif fonts, premium feel" },
  { id: "playful", label: "Playful", description: "Bright colors, bouncy animations, fun personality" },
  { id: "corporate", label: "Corporate", description: "Professional, trustworthy, enterprise-ready" },
  { id: "editorial", label: "Editorial", description: "Magazine-style layouts, strong typography" },
  { id: "3d-immersive", label: "3D Immersive", description: "Three.js/Spline 3D elements" },
  { id: "aurora", label: "Aurora", description: "Northern lights inspired color shifts" },
  { id: "claymorphism", label: "Claymorphism", description: "Soft 3D inflated shapes, playful depth" },
  { id: "neumorphism", label: "Neumorphism", description: "Soft extruded UI, subtle shadows" },
] as const;

export const styleTagIds = styleTags.map((t) => t.id);

// ── Motion Intensity ────────────────────────────────────────────────────
export const motionIntensityLevels: MotionIntensityConfig[] = [
  { id: "subtle", label: "Subtle", description: "Gentle fades, minimal movement, professional", maxAnimations: 3 },
  { id: "medium", label: "Medium", description: "Balanced motion, scroll reveals, hover effects", maxAnimations: 6 },
  { id: "aggressive", label: "Aggressive", description: "Bold animations, parallax, stagger sequences", maxAnimations: 12 },
  { id: "extreme", label: "Extreme", description: "Full-screen transitions, 3D, particle systems, video", maxAnimations: 20 },
] as const;

export type MotionIntensityId = (typeof motionIntensityLevels)[number]["id"];

// ── Technical Tags ──────────────────────────────────────────────────────
export const technicalTags = [
  "video-background",
  "scroll-trigger",
  "3d-threejs",
  "3d-spline",
  "parallax",
  "particle-canvas",
  "svg-animation",
  "lottie",
  "webgl",
  "css-only",
  "intersection-observer",
  "view-transitions",
  "scroll-snap",
  "infinite-marquee",
  "magnetic-cursor",
  "text-split",
  "disintegration",
  "exploded-view",
  "break-apart",
] as const;

export type TechnicalTag = (typeof technicalTags)[number];

// ── Prompt Types ────────────────────────────────────────────────────────
export const promptTypes = [
  { id: "hero", label: "Hero", description: "Full-viewport hero section (above the fold)" },
  { id: "section", label: "Section", description: "Modular page section (features, pricing, testimonial, etc.)" },
  { id: "landing-page", label: "Landing Page", description: "Complete multi-section landing page" },
  { id: "special", label: "Special", description: "High-impact experimental / showpiece" },
] as const;
