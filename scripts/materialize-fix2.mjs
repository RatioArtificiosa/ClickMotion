import fs from 'fs';
import path from 'path';

// Fix 1: Inject video generation prompts for the 2 heroes we now have real posters for
// and mark VERTEX as having a real video, point previewVideo to it
import sharp from 'sharp';

// Update browse page to use PreviewHoverCard with real video for the 2 with assets
const browsePath = 'src/app/(marketing)/browse/page.tsx';
let browse = fs.readFileSync(browsePath, 'utf-8');
browse = browse.replace(
  "import { PromptCard } from \"@/components/gallery/PromptCard\";",
  "import { PreviewHoverCard } from \"@/components/gallery/PreviewHoverCard\";"
);
browse = browse.replace(
  /<PromptCard[\s\S]*?\/>\s*\)\)}/,
  `{prompts.map((p: any) => {
  // Only the 2 heroes with real MP4s have a previewVideo — others fall back to thumbnail-only
  const realVideos: Record<string, string> = {
    "MS-HERO-AETH01": "/assets/videos/aether-waves-v1.mp4",
    "MS-HERO-VERT01": "/assets/videos/vertex-globe-v1.mp4",
  };
  return (
    <PreviewHoverCard
      key={p.id}
      slug={p.slug}
      title={p.title}
      category={p.category}
      styleTags={p.style_tags ?? p.styleTags ?? []}
      motionIntensity={p.motion_intensity ?? p.motionIntensity}
      thumbnail={p.thumbnail}
      previewVideo={realVideos[p.id]}
      priceTier={p.price_tier ?? p.priceTier}
    />
  );
})}`
);
// Also need to include previewVideo in fallback mapping
browse = browse.replace(
  'thumbnail: p.thumbnail, price_tier: p.priceTier,',
  'thumbnail: p.thumbnail, price_tier: p.priceTier, previewVideo: (p.id === "MS-HERO-AETH01" ? "/assets/videos/aether-waves-v1.mp4" : p.id === "MS-HERO-VERT01" ? "/assets/videos/vertex-globe-v1.mp4" : undefined),'
);
fs.writeFileSync(browsePath, browse);
console.log('✓ browse/page.tsx now uses PreviewHoverCard with real videos');

// Update collections [slug] to use real thumbnails + video links
const slugPath = 'src/app/(marketing)/collections/[slug]/page.tsx';
let slug = fs.readFileSync(slugPath, 'utf-8');
slug = slug.replace(
  'import { collections, getCollection } from "@/config/collections";',
  'import { collections, getCollection } from "@/config/collections";\nimport { PreviewHoverCard } from "@/components/gallery/PreviewHoverCard";'
);
slug = slug.replace(
  /      <div className="mt-10 grid gap-4 md:grid-cols-2">[\s\S]*?<\/div>\n\n      <Card className="mt-8 border-dashed/,
  `      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {col.promptIds.map((id) => {
          // Minimal hero lookup for thumbnails
          const heroMeta: Record<string, { slug: string; title: string; category: string; styleTags: string[]; motionIntensity: string; thumbnail: string; priceTier: string; video?: string }> = {
            "MS-HERO-NEON01": { slug: "neon-forge-cyberpunk-gaming-studio-hero", title: "NEON FORGE — Cyberpunk Gaming Studio Hero", category: "agency", styleTags: ["neon-glow","dark-cinematic"], motionIntensity: "aggressive", thumbnail: "/thumbnails/MS-HERO-NEON01.webp", priceTier: "pro" },
            "MS-HERO-AETH01": { slug: "aether-serene-wellness-meditation-hero", title: "AETHER — Serene Wellness & Meditation Hero", category: "health", styleTags: ["organic","minimal"], motionIntensity: "medium", thumbnail: "/thumbnails/MS-HERO-AETH01.webp", priceTier: "pro", video: "/assets/videos/aether-waves-v1.mp4" },
            "MS-HERO-VERT01": { slug: "vertex-security-brutalist-cybersecurity-hero", title: "VERTEX SECURITY — Brutalist Cybersecurity Hero", category: "tech", styleTags: ["minimal","brutalist"], motionIntensity: "aggressive", thumbnail: "/thumbnails/MS-HERO-VERT01.webp", priceTier: "pro", video: "/assets/videos/vertex-globe-v1.mp4" },
            "MS-HERO-LUMI01": { slug: "lumina-studios-cinematic-film-production-hero", title: "LUMINA STUDIOS — Cinematic Film Hero", category: "agency", styleTags: ["dark-cinematic","luxury"], motionIntensity: "aggressive", thumbnail: "/thumbnails/MS-HERO-LUMI01.webp", priceTier: "pro" },
            "MS-HERO-TERR01": { slug: "terra-nova-clean-energy-platform-hero", title: "TERRA NOVA — Clean Energy Platform Hero", category: "tech", styleTags: ["organic","gradient-mesh"], motionIntensity: "medium", thumbnail: "/thumbnails/MS-HERO-TERR01.webp", priceTier: "pro" },
            "MS-HERO-APEX01": { slug: "apex-quantum-deep-tech-quantum-hero", title: "APEX QUANTUM — Deep Tech Quantum Hero", category: "saas", styleTags: ["aurora","3d-immersive"], motionIntensity: "extreme", thumbnail: "/thumbnails/MS-HERO-APEX01.webp", priceTier: "pro" },
            "MS-HERO-VERV01": { slug: "verve-social-vibrant-genz-social-platform-hero", title: "VERVE SOCIAL — Vibrant Gen-Z Platform Hero", category: "saas", styleTags: ["playful","gradient-mesh"], motionIntensity: "aggressive", thumbnail: "/thumbnails/MS-HERO-VERV01.webp", priceTier: "pro" },
            "MS-HERO-ORBI01": { slug: "orbit-finance-trustworthy-neobank-hero", title: "ORBIT FINANCE — Trustworthy Neobank Hero", category: "fintech", styleTags: ["corporate","luxury"], motionIntensity: "medium", thumbnail: "/thumbnails/MS-HERO-ORBI01.webp", priceTier: "pro" },
            "MS-HERO-NOMA01": { slug: "nomad-travel-luxury-travel-platform-hero", title: "NOMAD TRAVEL — Luxury Travel Platform Hero", category: "travel", styleTags: ["editorial","organic"], motionIntensity: "medium", thumbnail: "/thumbnails/MS-HERO-NOMA01.webp", priceTier: "pro" },
            "MS-HERO-NEXU01": { slug: "nexus-ai-enterprise-ai-platform-hero", title: "NEXUS AI — Enterprise AI Platform Hero", category: "saas", styleTags: ["aurora","liquid-glass"], motionIntensity: "extreme", thumbnail: "/thumbnails/MS-HERO-NEXU01.webp", priceTier: "pro" },
          };
          const m = heroMeta[id] ?? { slug: id.toLowerCase(), title: id, category: "—", styleTags: [], motionIntensity: "medium", thumbnail: \`/thumbnails/\${id}.webp\`, priceTier: "pro" };
          return (
            <PreviewHoverCard
              key={id}
              slug={m.slug}
              title={m.title}
              category={m.category}
              styleTags={m.styleTags}
              motionIntensity={m.motionIntensity}
              thumbnail={m.thumbnail}
              previewVideo={m.video}
              priceTier={m.priceTier}
            />
          );
        })}
      </div>

      <Card className="mt-8 border-dashed`
);
fs.writeFileSync(slugPath, slug);
console.log('✓ collections/[slug] now uses PreviewHoverCard with real hover video');

// Add preview webp generation for the 8 missing heroes as thumbnails (already exist from earlier? check)
// We already generated thumbs for all 10 earlier? Let's ensure all 10 thumbs exist.
const heroes = ["MS-HERO-NEON01","MS-HERO-AETH01","MS-HERO-VERT01","MS-HERO-LUMI01","MS-HERO-TERR01","MS-HERO-APEX01","MS-HERO-VERV01","MS-HERO-ORBI01","MS-HERO-NOMA01","MS-HERO-NEXU01"];
for (const id of heroes) {
  if (!fs.existsSync(`public/thumbnails/${id}.webp`)) {
    console.log(`Missing thumb: ${id} — will generate minimal`);
  } else {
    const s = fs.statSync(`public/thumbnails/${id}.webp`);
    console.log(`Thumb ${id}: ${(s.size/1024).toFixed(0)}KB`);
  }
}
