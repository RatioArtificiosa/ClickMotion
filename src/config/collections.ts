export interface Collection {
 id: string;
 slug: string;
 title: string;
 description: string;
 cover: string;
 promptIds: string[];
 isFeatured: boolean;
 priceTier: "free" | "starter" | "pro" | "agency";
 badge?: string;
}

export const collections: Collection[] = [
 {
 id: "saas-starter-pack",
 slug: "saas-starter-pack",
 title: "SaaS Starter Pack",
 description: "Everything you need to ship a SaaS homepage - hero, features, pricing, testimonial, and CTA. 5 prompts, one copy-paste system.",
 cover: "/thumbnails/collection-saas-starter.webp",
 promptIds: ["MS-HERO-NEXU01", "MS-HERO-APEX01", "MS-SEC-FEAT-001", "MS-SEC-PRICE-001", "MS-SEC-CTA-001"],
 isFeatured: true,
 priceTier: "pro",
 badge: "Most Popular",
 },
 {
 id: "agency-showcase",
 slug: "agency-showcase",
 title: "Agency Showcase",
 description: "Cyberpunk + cinematic - for creative agencies that need to flex. Neon Forge + Lumina + brutalist Vertex.",
 cover: "/thumbnails/collection-agency-showcase.webp",
 promptIds: ["MS-HERO-NEON01", "MS-HERO-LUMI01", "MS-HERO-VERT01"],
 isFeatured: true,
 priceTier: "pro",
 },
 {
 id: "wellness-launch",
 slug: "wellness-launch",
 title: "Wellness Launch Kit",
 description: "AETHER + TERRA NOVA + NOMAD - calm, biophilic, editorial. For wellness, travel, and lifestyle brands.",
 cover: "/thumbnails/collection-wellness-launch.webp",
 promptIds: ["MS-HERO-AETH01", "MS-HERO-TERR01", "MS-HERO-NOMA01"],
 isFeatured: false,
 priceTier: "pro",
 },
 {
 id: "fintech-trust",
 slug: "fintech-trust",
 title: "Fintech Trust Stack",
 description: "ORBIT Finance + VERVE Social + NEXUS AI - corporate luxury meets playful gradient. For fintech and platforms.",
 cover: "/thumbnails/collection-fintech-trust.webp",
 promptIds: ["MS-HERO-ORBI01", "MS-HERO-VERV01", "MS-HERO-NEXU01"],
 isFeatured: false,
 priceTier: "pro",
 },
];

export function getCollection(slug: string) {
 return collections.find((c) => c.slug === slug);
}
