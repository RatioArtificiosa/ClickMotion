import fs from 'fs';
import path from 'path';

const heroes = [
  {
    id: "MS-HERO-NEON01",
    title: "NEON FORGE — Cyberpunk Gaming Studio Hero",
    slug: "neon-forge-cyberpunk-gaming-studio-hero",
    description: "A dark, high-energy hero for a game development studio with liquid glass, neon glow, and a cinematic cityscape loop.",
    category: "agency", subcategory: "creative",
    styleTags: ["neon-glow","dark-cinematic"], technicalTags: ["video-background","parallax"],
    motionIntensity: "aggressive", difficulty: "intermediate",
    video: "neon-forge-city-v1.mp4", poster: "neon-forge-city-v1.webp", duration: "12s", sizeMb: 3.2,
    colors: ["#000000","#00F0FF","#FF006E"], fontHead: "Space Grotesk", demoTitle: "BUILD WORLDS."
  },
  {
    id: "MS-HERO-AETH01",
    title: "AETHER — Serene Wellness & Meditation Hero",
    slug: "aether-serene-wellness-meditation-hero",
    description: "A calming, biophilic hero for a meditation app with organic glass, golden-hour waves, and soft floating cards.",
    category: "health", subcategory: "wellness",
    styleTags: ["organic","minimal"], technicalTags: ["video-background"],
    motionIntensity: "medium", difficulty: "beginner",
    video: "aether-waves-v1.mp4", poster: "aether-waves-v1.webp", duration: "14s", sizeMb: 2.8,
    colors: ["#FDFBF7","#7BA58F","#D4A373"], fontHead: "Playfair Display", demoTitle: "Breathe."
  },
  {
    id: "MS-HERO-VERT01",
    title: "VERTEX SECURITY — Brutalist Cybersecurity Hero",
    slug: "vertex-security-brutalist-cybersecurity-hero",
    description: "An aggressive, monochromatic hero for a cybersecurity firm with a rotating wireframe globe and a brutalist no-radius layout.",
    category: "tech", subcategory: "cybersecurity",
    styleTags: ["minimal","brutalist"], technicalTags: ["video-background","scroll-trigger"],
    motionIntensity: "aggressive", difficulty: "intermediate",
    video: "vertex-globe-v1.mp4", poster: "vertex-globe-v1.webp", duration: "12s", sizeMb: 3.0,
    colors: ["#000000","#E2E8F0","#334155"], fontHead: "Space Grotesk", demoTitle: "SECURITY."
  },
  {
    id: "MS-HERO-LUMI01",
    title: "LUMINA STUDIOS — Cinematic Film Production Hero",
    slug: "lumina-studios-cinematic-film-production-hero",
    description: "A warm, cinematic hero for a film production studio with amber tones, liquid glass, and a dolly shot through a studio lot.",
    category: "agency", subcategory: "creative",
    styleTags: ["dark-cinematic","luxury"], technicalTags: ["video-background","parallax"],
    motionIntensity: "aggressive", difficulty: "intermediate",
    video: "lumina-dolly-v1.mp4", poster: "lumina-dolly-v1.webp", duration: "12s", sizeMb: 3.5,
    colors: ["#1E140A","#F59E0B","#FEF3C7"], fontHead: "Playfair Display", demoTitle: "STORIES THAT MOVE."
  },
  {
    id: "MS-HERO-TERR01",
    title: "TERRA NOVA — Clean Energy Platform Hero",
    slug: "terra-nova-clean-energy-platform-hero",
    description: "A nature-forward, optimistic hero for a clean energy platform with organic gradients, sage tones, and aerial nature footage.",
    category: "tech", subcategory: "cloud",
    styleTags: ["organic","gradient-mesh"], technicalTags: ["video-background","parallax"],
    motionIntensity: "medium", difficulty: "beginner",
    video: "terra-aerial-v1.mp4", poster: "terra-aerial-v1.webp", duration: "12s", sizeMb: 3.1,
    colors: ["#0B1A14","#7BA58F","#D4A373"], fontHead: "Playfair Display", demoTitle: "Power the future."
  },
  {
    id: "MS-HERO-APEX01",
    title: "APEX QUANTUM — Deep Tech Quantum Hero",
    slug: "apex-quantum-deep-tech-quantum-hero",
    description: "A futuristic hero for a quantum computing platform with aurora gradients, a particle simulation video, and a 3D particle system overlay.",
    category: "saas", subcategory: "ai-product",
    styleTags: ["aurora","3d-immersive"], technicalTags: ["video-background","3d-threejs"],
    motionIntensity: "extreme", difficulty: "advanced",
    video: "apex-quantum-v1.mp4", poster: "apex-quantum-v1.webp", duration: "12s", sizeMb: 3.8,
    colors: ["#070A1A","#00D4FF","#A855F7"], fontHead: "JetBrains Mono", demoTitle: "Quantum. Real.",
    deps: [{name:"framer-motion",version:"^11.0.0",required:true},{name:"gsap",version:"^3.12.0",required:true},{name:"three",version:"^0.160.0",required:true},{name:"tailwindcss",version:"^4.0.0",required:true}],
    jsBudget: "<150KB (Framer + GSAP + Three dynamic import)"
  },
  {
    id: "MS-HERO-VERV01",
    title: "VERVE SOCIAL — Vibrant Gen-Z Social Platform Hero",
    slug: "verve-social-vibrant-genz-social-platform-hero",
    description: "A high-energy hero for a social media app with gradient mesh, bold typography, a lifestyle montage video, and an infinite marquee of trending hashtags.",
    category: "saas", subcategory: "productivity",
    styleTags: ["playful","gradient-mesh"], technicalTags: ["video-background","infinite-marquee","parallax"],
    motionIntensity: "aggressive", difficulty: "intermediate",
    video: "verve-montage-v1.mp4", poster: "verve-montage-v1.webp", duration: "10s", sizeMb: 4.0,
    colors: ["#1A0A14","#EC4899","#F59E0B"], fontHead: "Clash Display", demoTitle: "BE SEEN."
  },
  {
    id: "MS-HERO-ORBI01",
    title: "ORBIT FINANCE — Trustworthy Neobank Hero",
    slug: "orbit-finance-trustworthy-neobank-hero",
    description: "A clean, premium hero for a neobank with abstract financial data visualizations, navy and gold accents, and a trust-focused layout.",
    category: "fintech", subcategory: "banking",
    styleTags: ["corporate","luxury"], technicalTags: ["video-background"],
    motionIntensity: "medium", difficulty: "beginner",
    video: "orbit-data-v1.mp4", poster: "orbit-data-v1.webp", duration: "12s", sizeMb: 2.9,
    colors: ["#0F172A","#F59E0B","#E2E8F0"], fontHead: "DM Serif Display", demoTitle: "Money, elevated."
  },
  {
    id: "MS-HERO-NOMA01",
    title: "NOMAD TRAVEL — Luxury Travel Platform Hero",
    slug: "nomad-travel-luxury-travel-platform-hero",
    description: "An aspirational hero for a luxury travel platform with warm terracotta tones, a cinematic drone montage, and a compass icon animation.",
    category: "travel", subcategory: "hotels",
    styleTags: ["editorial","organic"], technicalTags: ["video-background","parallax"],
    motionIntensity: "medium", difficulty: "intermediate",
    video: "nomad-montage-v1.mp4", poster: "nomad-montage-v1.webp", duration: "14s", sizeMb: 3.6,
    colors: ["#1C140A","#C17A4A","#FEF3C7"], fontHead: "Playfair Display", demoTitle: "Go beyond."
  },
  {
    id: "MS-HERO-NEXU01",
    title: "NEXUS AI — Enterprise AI Platform Hero",
    slug: "nexus-ai-enterprise-ai-platform-hero",
    description: "A cutting-edge hero for an enterprise AI platform with aurora colors, liquid glass, a neural network video, and a particle network overlay.",
    category: "saas", subcategory: "ai-product",
    styleTags: ["aurora","liquid-glass"], technicalTags: ["video-background","3d-threejs"],
    motionIntensity: "extreme", difficulty: "advanced",
    video: "nexus-neural-v1.mp4", poster: "nexus-neural-v1.webp", duration: "12s", sizeMb: 3.4,
    colors: ["#07080F","#00D4FF","#FF006E"], fontHead: "Space Grotesk", demoTitle: "Intelligence",
    deps: [{name:"framer-motion",version:"^11.0.0",required:true},{name:"gsap",version:"^3.12.0",required:true},{name:"three",version:"^0.160.0",required:true},{name:"tailwindcss",version:"^4.0.0",required:true}],
    jsBudget: "<150KB (Framer + GSAP + Three dynamic import)"
  },
];

function generateMDX(h) {
  const deps = h.deps || [
    {name:"framer-motion",version:"^11.0.0",required:true},
    {name:"gsap",version:"^3.12.0",required:true},
    {name:"tailwindcss",version:"^4.0.0",required:true},
  ];
  const depsYaml = deps.map(d=>`  - { name: "${d.name}", version: "${d.version}", required: ${d.required} }`).join("\n");
  const jsBudget = h.jsBudget || "<45KB (Framer + GSAP + React)";
  const is3d = h.technicalTags.includes("3d-threejs");
  const motionDetail = is3d
    ? `**3D Particles:** Three.js canvas with 600 nodes, connections pulsing, \`will-change: transform\`, dynamic import, disabled on reduced-motion and mobile <768px.\n\n**GSAP Parallax:**\n\`\`\`tsx\ngsap.to(videoRef.current, { scale: 1.03, scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.2 } });\n\`\`\``
    : `Child overrides: Badge y:-20 duration 0.6 / Headline y:40 duration 0.8 / Subheadline y:40 delay 0.1 / Description y:30 duration 0.6 / CTAs y:20 stagger 0.05\n\n**GSAP Parallax:**\n\`\`\`tsx\ngsap.to(videoRef.current, { scale: 1.05, scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1.2 } });\n\`\`\``;

  return `---
id: "${h.id}"
title: "${h.title}"
slug: "${h.slug}"
description: "${h.description}"
version: "1.0.0"
created: "2026-08-07"
updated: "2026-08-07"
author: "MS Team"
status: "draft"
type: "hero"
category: "${h.category}"
subcategory: "${h.subcategory}"
styleTags: [${h.styleTags.map(s=>`"${s}"`).join(", ")}]
technicalTags: [${h.technicalTags.map(s=>`"${s}"`).join(", ")}]
motionIntensity: "${h.motionIntensity}"
difficulty: "${h.difficulty}"
priceTier: "pro"
aiToolsRating:
  cursor: 5
  lovable: 4
  bolt: 4
  claude: 4
  grok-build: 5
frameworksSupported: ["react", "html"]
previewVideo: "/previews/${h.id}.mp4"
previewGif: "/previews/${h.id}.gif"
thumbnail: "/thumbnails/${h.id}.webp"
liveDemo: "/demos/${h.id}"
videoBackgrounds:
  - file: "/assets/videos/${h.video}"
    format: "mp4"
    duration: "${h.duration}"
    loop: true
    sizeMb: ${h.sizeMb}
    poster: "/assets/posters/${h.poster}"
dependencies:
${depsYaml}
estimatedTokens: ${is3d ? 4800 : 4200}
useCases: ["${h.category}-${h.subcategory}-homepage", "landing-page"]
compatibleWith: ["MS-SEC-FEAT-003", "MS-SEC-PRICE-001"]
positionInPage: "top"
---

## Design System

**Aesthetic Direction:** Premium ${h.styleTags.join(" + ")} — ${h.title} rendered with ${h.colors.join(", ")} and ${h.fontHead} typography. High-contrast, production-ready.

**Typography:**
- Headings: \`${h.fontHead}\` — font-weight: 700–900, letter-spacing: -0.04em, line-height: 0.85, sizes: clamp(3rem, 8vw, 8rem)
- Body: \`Inter\` — font-weight: 300–600, letter-spacing: 0, line-height: 1.6, sizes: clamp(1rem, 1.2vw, 1.25rem)

**Spacing:** 8px grid: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128
**Max-Width:** 1280px container
**Border Radius:** \`--radius: 9999px\` (fully rounded pills)
**Shadows:** \`shadow-2xl\` for glass, \`shadow-primary/30\` for glow

**Color Tokens (HSL, dark-only):**
- \`--background: 0 0% 0%\` / foreground near-white
- \`--primary: 187 100% 47%\` (cyan) / \`--secondary: 340 100% 50%\` (pink)
- \`--muted: 0 0% 12%\` / \`--border: 0 0% 100% / 0.08\`

## Layout Structure

- **Navbar:** Fixed top, height \`64px\`, padding \`0 32px\`, flex space-between, z-50
- **Hero Container:** \`100vh\`, relative, overflow hidden
- **Video Background:** absolute inset-0, 100% / 100%, object-cover
- **Content Overlay:** relative z-10, flex column justify-center, padding \`80px 32px 32px 32px\`, max-width \`1280px\`
- **Content Split:** Text ~60% width, right side breathing room; CTA gap \`16px\`

## Content Slots

| Slot | Default Text | Max Length | Notes |
|------|--------------|------------|-------|
| headline | "${h.demoTitle}" | 25 chars | Primary H1 |
| subheadline | "Second line" | 20 chars | Secondary color |
| description | "Production-ready hero for ${h.category} — built for ${h.subcategory}." | 180 chars | Supports markdown |
| cta_primary | "Get Started" | 20 chars | Primary pill |
| cta_secondary | "Learn More" | 20 chars | Glass pill |

## Motion Specification

**Framer Motion Container + Item Variants:**
\`\`\`tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};
\`\`\`
${motionDetail}

## Video / Media Integration

- File: \`/assets/videos/${h.video}\` (MP4 H.264, 1920x1080, ${h.duration}, <5MB, no audio)
- Poster: \`/assets/posters/${h.poster}\` (1920x1080, <150KB WebP)
- Implementation: \`<video autoPlay muted loop playsInline preload="metadata" poster={poster} className="object-cover w-full h-full" />\`
- Offscreen: IntersectionObserver pauses/resumes video

> **AI Video Generation Prompt:** Cinematic 4K video, 30 seconds, seamless loop. Premium ${h.title} background — ${h.description} Color grading: cinematic, volumetric light, 24fps, no people, no text, no UI. Seamless loop.

## Responsive Behavior

| Breakpoint | Layout & Motion Changes |
|------------|--------------------------|
| ≥1536px (2xl) | Full scale; text 8rem; padding 64px; all motion |
| ≥1280px (xl) | Text 7rem; padding 48px |
| ≥1024px (lg) | Nav visible; text 6rem; CTAs side-by-side |
| ≥768px (md) | Nav visible; text 4rem; padding 32px |
| <768px (mobile) | Nav hidden; text 2.8rem; CTAs stack; ${is3d ? "3D canvas disabled" : "parallax disabled"} |

## Accessibility

- Reduced Motion: \`@media (prefers-reduced-motion: reduce)\` disables parallax and ${is3d ? "3D canvas" : "stagger"}; simple fade-in
- Alt Text: Video poster has descriptive alt
- Focus Ring: \`focus:ring-2 focus:ring-primary focus:ring-offset-2\`
- Contrast: White text on dark overlay meets 4.5:1
- Semantic: \`<header>\`, \`<section>\`, \`<h1>\`, \`<p>\`

## Performance Notes

- JS Budget: ${jsBudget}
- Font Loading: \`font-display: swap\`
- will-change: Applied only to animated elements (transform, opacity), removed after entrance
- Video: Poster loaded first; preload="metadata"
- Lazy: IntersectionObserver controls video play/pause offscreen

## AI Tool Instructions

**Cursor / Claude:** Provide HeroSection.tsx with all imports, Tailwind classes, Framer Motion variants, and GSAP parallax. Use React 19. Include useEffect for scrollTrigger.
**Lovable / Bolt:** Self-contained component; use motion divs with inline variants. Video uses <video> tag with specified src. Add prefers-reduced-motion via custom hook.
**v0:** Single file with imports. Use useState/useEffect for IntersectionObserver.

## Expected Output

1. A single React component HeroSection.tsx that renders a full-screen hero
2. Fixed navbar with liquid-glass effect, responsive links, and two CTAs
3. Looping video background with poster fallback and IntersectionObserver
4. Staggered entrance animations per specification
5. GSAP parallax on video
6. Responsive across all 5 breakpoints with distinct layout changes
7. Accessible with reduced-motion support, focus rings, and semantic HTML
`;
}

const outDir = path.join(process.cwd(), "content/prompts/heroes");
fs.mkdirSync(outDir, { recursive: true });
for (const h of heroes) {
  const mdx = generateMDX(h);
  const filePath = path.join(outDir, `${h.id}.mdx`);
  fs.writeFileSync(filePath, mdx, "utf-8");
  console.log(`✓ ${h.id} → ${filePath}`);
}
console.log(`Done: ${heroes.length} heroes`);
