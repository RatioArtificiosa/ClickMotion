/**
 * Owner-only design vault metadata.
 * Not client-facing. Used by Admin → Original designs.
 *
 * Media roles (PRODUCT_LAW / ASSET_PIPELINE):
 * - broll → client HD (immutable after prep; sold prompt videoBackgrounds)
 * - previewPage / previewFs → storefront captures only (safe to recapture under those names)
 * - backgroundsPreview → small /backgrounds encode only (never broll path)
 * - Never point broll at *-preview* files.
 *
 * When taking a product to production/sale: update THIS registry + product-packages
 * + backgrounds catalog (if listed) so Admin stays the operator source of truth.
 */

export type OwnerDesignEntry = {
  id: string;
  brand: string;
  title: string;
  tier: "free" | "pro" | "starter" | "agency";
  status: "flagship" | "scaffold" | "lab";
  /** Live cleanroom / lab demo (absolute path from site root). */
  demoHref?: string;
  /** Repo-relative cleanroom folder. */
  cleanroomPath?: string;
  /** Main component file (repo-relative). */
  componentPath?: string;
  /** Sold prompt MDX (repo-relative). */
  promptPath: string;
  /** Source B-roll (no UI chrome). */
  broll?: string;
  /** Page preview capture. */
  previewPage?: string;
  /** Fullscreen preview capture. */
  previewFs?: string;
  /** Client Product Package PDF (public path under /packages/…). */
  packagePdf?: string;
  /**
   * Small /backgrounds library file (role: backgrounds).
   * Must live under /assets/videos/backgrounds/ — never client HD.
   */
  backgroundsPreview?: string;
  notes?: string;
};

export const OWNER_DESIGNS: OwnerDesignEntry[] = [
  {
    id: "MS-HERO-MERI01",
    brand: "Meridian",
    title: "Scroll narrative private residences",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/scroll-narrative",
    cleanroomPath: "cleanroom/meridian-scroll",
    componentPath: "cleanroom/meridian-scroll/MeridianScrollNarrative.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-MERI01.mdx",
    broll: "/assets/videos/sequence-01.mp4",
    previewPage: "/assets/videos/meridian-scroll-preview-v1.mp4",
    previewFs: "/assets/videos/meridian-scroll-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-MERI01/Meridian-package-p4ltcy7t4p0c-pd1w65.pdf",
    backgroundsPreview:
      "/assets/videos/backgrounds/atlantic-residences-bg-v1.mp4",
    notes:
      "Scroll-scrub chapters + membership band. Paid listing. Package PDF = golden-rule layout (opaque filename + PaidSalt). Backgrounds tile: Atlantic Residences (small encode).",
  },
  {
    id: "MS-HERO-AETH01",
    brand: "Aether",
    title: "Serene wellness meditation hero",
    tier: "free",
    status: "flagship",
    demoHref: "/demo/cleanroom-aether",
    cleanroomPath: "cleanroom/aether-from-prompt",
    componentPath: "cleanroom/aether-from-prompt/AetherHeroSection.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-AETH01.mdx",
    broll: "/assets/videos/aether-waves-web-v1.mp4",
    previewPage: "/assets/videos/aether-preview-v1.mp4",
    previewFs: "/assets/videos/aether-preview-fs-v1.mp4",
    packagePdf: "/packages/MS-HERO-AETH01/Aether-package-8rgb4zhx7zrd.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/aether-waves-bg-v1.mp4",
    notes:
      "Free listing · sale-ready. Calm centered hero. Client HD = aether-waves-web. Backgrounds: small aether-waves-bg. Package opaque id 8rgb4zhx7zrd.",
  },
  {
    id: "MS-HERO-VERT01",
    brand: "Vertex Security",
    title: "Brutalist cybersecurity scroll hero",
    tier: "free",
    status: "flagship",
    demoHref: "/demo/cleanroom-vertex",
    cleanroomPath: "cleanroom/vertex-from-prompt",
    componentPath: "cleanroom/vertex-from-prompt/VertexHeroSection.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-VERT01.mdx",
    broll: "/assets/videos/vertex-globe-web-v1.mp4",
    previewPage: "/assets/videos/vertex-preview-v1.mp4",
    previewFs: "/assets/videos/vertex-preview-fs-v1.mp4",
    packagePdf: "/packages/MS-HERO-VERT01/Vertex-package-b352guxju0ic.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/vertex-globe-bg-v1.mp4",
    notes:
      "Free listing · sale-ready. Scroll chapters, no footer band. Client HD = vertex-globe-web. Backgrounds: small vertex-globe-bg. Package opaque id b352guxju0ic.",
  },
  {
    id: "MS-HERO-NEON01",
    brand: "Neon Forge",
    title: "Cyberpunk gaming studio hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-neon",
    cleanroomPath: "cleanroom/neon-from-prompt",
    componentPath: "cleanroom/neon-from-prompt/NeonForgeHeroSection.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-NEON01.mdx",
    broll: "/assets/videos/neon-forge-city-v1.mp4",
    previewPage: "/assets/videos/neon-forge-preview-v1.mp4",
    previewFs: "/assets/videos/neon-forge-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-NEON01/NeonForge-package-n7k2m9p4qx1w-nf3k8a.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/neon-forge-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready. Client HD = neon-forge-city 60s. Storefront dual-preview + FS. Package opaque n7k2m9p4qx1w + PaidSalt nf3k8a. Backgrounds: small neon-forge-bg. Mode: video-bg + glitch + parallax.",
  },
  {
    id: "MS-HERO-LUMI01",
    brand: "Lumina Studios",
    title: "Cinematic film production hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-lumina",
    cleanroomPath: "cleanroom/lumina-from-prompt",
    componentPath: "cleanroom/lumina-from-prompt/LuminaHeroSection.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-LUMI01.mdx",
    broll: "/assets/videos/lumina-dolly-v1.mp4",
    previewPage: "/assets/videos/lumina-preview-v1.mp4",
    previewFs: "/assets/videos/lumina-preview-fs-v1.mp4",
    packagePdf: "/packages/MS-HERO-LUMI01/Lumina-package-l8m4k2p9qx7w-lm4k9a.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/lumina-dolly-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready. Client HD = lumina-dolly 60s (Studio-Lot master). Storefront dual-preview + FS. Package opaque l8m4k2p9qx7w + PaidSalt lm4k9a. Backgrounds: small lumina-dolly-bg. Mode: video-bg + soft entrance + parallax.",
  },
  {
    id: "MS-HERO-TERR01",
    brand: "Terra Nova",
    title: "Clean energy platform hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-terra",
    cleanroomPath: "cleanroom/terra-from-prompt",
    componentPath: "cleanroom/terra-from-prompt/TerraNovaHeroSection.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-TERR01.mdx",
    broll: "/assets/videos/terra-aerial-v1.mp4",
    previewPage: "/assets/videos/terra-preview-v1.mp4",
    previewFs: "/assets/videos/terra-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-TERR01/TerraNova-package-t3r9n0v7qx2m-tn5k2a.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/terra-aerial-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready. Client HD = terra-aerial 60s (windyfarms master). Storefront dual-preview + FS. Package opaque t3r9n0v7qx2m + PaidSalt tn5k2a. Backgrounds: small terra-aerial-bg. Mode: video-bg + soft entrance + parallax.",
  },
  {
    id: "MS-HERO-APEX01",
    brand: "Apex Quantum",
    title: "Deep tech quantum platform hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-apex",
    cleanroomPath: "cleanroom/apex-from-prompt",
    componentPath: "cleanroom/apex-from-prompt/ApexQuantumHeroSection.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-APEX01.mdx",
    broll: "/assets/videos/apex-quantum-v1.mp4",
    previewPage: "/assets/videos/apex-preview-v1.mp4",
    previewFs: "/assets/videos/apex-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-APEX01/ApexQuantum-package-a9x4q7m2kp8w-aq3n8k.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/apex-quantum-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready. Client HD = apex-quantum 60s (crylabtower master). Storefront dual-preview + FS. Package opaque a9x4q7m2kp8w + PaidSalt aq3n8k. Backgrounds: small apex-quantum-bg. Mode: video-bg + soft entrance + parallax.",
  },
  {
    id: "MS-HERO-REVL01",
    brand: "Revel",
    title: "Scroll narrative fashion commerce hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-revel",
    cleanroomPath: "cleanroom/revel-from-prompt",
    componentPath: "cleanroom/revel-from-prompt/RevelScrollNarrative.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-REVL01.mdx",
    broll: "/assets/videos/revel-breakout-v1.mp4",
    previewPage: "/assets/videos/revel-scroll-preview-v1.mp4",
    previewFs: "/assets/videos/revel-scroll-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-REVL01/Revel-package-r7v3l9k2mx4q-rv8n3p.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/revel-breakout-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL light-mode scroll narrative. Client HD = revel-breakout 20s (Iphone-Breakout). Four chapters feed→break→shatter→arrival. Package opaque r7v3l9k2mx4q + PaidSalt rv8n3p. Mode: scroll scrub (not loop wallpaper).",
  },
  {
    id: "MS-HERO-PRSM01",
    brand: "Prism",
    title: "Liquid glass multi-panel identity hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-prism",
    cleanroomPath: "cleanroom/prism-from-prompt",
    componentPath: "cleanroom/prism-from-prompt/PrismLiquidGlass.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-PRSM01.mdx",
    broll: "/assets/videos/prism-faces-v1.mp4",
    previewPage: "/assets/videos/prism-scroll-preview-v1.mp4",
    previewFs: "/assets/videos/prism-scroll-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-PRSM01/Prism-package-p8r3sm7k2n4q-pr5m2x.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/prism-faces-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL artsy liquid glass. Client HD = prism-faces (FacesFacesFaces). Multi-size glass panels L+R. Scroll scrub. Package opaque p8r3sm7k2n4q + PaidSalt pr5m2x. Mode: scroll + liquid glass constellation (not left text only).",
  },
  {
    id: "MS-SEC-FOLI01",
    brand: "Folio",
    title: "Scroll pivot liquid glass decision section",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-folio",
    cleanroomPath: "cleanroom/folio-from-prompt",
    componentPath: "cleanroom/folio-from-prompt/FolioPivotSection.tsx",
    promptPath: "content/prompts/sections/MS-SEC-FOLI01.mdx",
    broll: "/assets/videos/folio-blurry-v1.mp4",
    previewPage: "/assets/videos/folio-scroll-preview-v1.mp4",
    previewFs: "/assets/videos/folio-scroll-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-SEC-FOLI01/Folio-package-f0l1o9x4k7m2-fl8n3q.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/folio-blurry-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL mid-page section (MS-SEC). Client HD = folio-blurry (Blurry Vision loop). Five dense enterprise glass sheets, one-way rotateX pivot. Package opaque f0l1o9x4k7m2 + PaidSalt fl8n3q. Mode: scroll pivot + loop film under glass (not scrub, not hero).",
  },
  {
    id: "MS-HERO-MIRA01",
    brand: "Mirage",
    title: "Agency desert scroll glass hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-mirage",
    cleanroomPath: "cleanroom/mirage-from-prompt",
    componentPath: "cleanroom/mirage-from-prompt/MirageAgencyHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-MIRA01.mdx",
    broll: "/assets/videos/mirage-desert-v1.mp4",
    previewPage: "/assets/videos/mirage-scroll-preview-v1.mp4",
    previewFs: "/assets/videos/mirage-scroll-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-MIRA01/Mirage-package-m1r4ge8k2n9x-mg7k3p.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/mirage-desert-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL agency hero. Client HD = mirage-desert. Morphic M.A.C. glass cards left, free-play desert subject right. Package opaque m1r4ge8k2n9x + PaidSalt mg7k3p. Mode: free-play film + scroll pivot cards (not scrub).",
  },
  {
    id: "MS-HERO-SABL01",
    brand: "Sable",
    title: "Holiday luxury fashion walk hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-sable",
    cleanroomPath: "cleanroom/sable-from-prompt",
    componentPath: "cleanroom/sable-from-prompt/SableHolidayHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-SABL01.mdx",
    broll: "/assets/videos/sable-winter-v1.mp4",
    previewPage: "/assets/videos/sable-holiday-preview-v1.mp4",
    previewFs: "/assets/videos/sable-holiday-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-SABL01/Sable-package-s4b1e9k7m2x3-sb8n4p.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/sable-winter-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL holiday fashion. Client HD = sable-winter full uncut walk. Sparse Maison Sable chrome. Package opaque s4b1e9k7m2x3 + PaidSalt sb8n4p. Mode: free-play full film (never scrub).",
  },
  {
    id: "MS-HERO-AXIO01",
    brand: "Axiom",
    title: "Fintech inverted markets hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-axiom",
    cleanroomPath: "cleanroom/axiom-from-prompt",
    componentPath: "cleanroom/axiom-from-prompt/AxiomFintechHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-AXIO01.mdx",
    broll: "/assets/videos/axiom-upside-v1.mp4",
    previewPage: "/assets/videos/axiom-fintech-preview-v1.mp4",
    previewFs: "/assets/videos/axiom-fintech-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-AXIO01/Axiom-package-a9x10m7k3n2p-ax8n4q.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/axiom-upside-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL institutional fintech. Client HD = axiom-upside full uncut inverted NYC. True-north horizon signature. Package opaque a9x10m7k3n2p + PaidSalt ax8n4q. Mode: free-play full film (never scrub).",
  },
  {
    id: "MS-HERO-ELYS01",
    brand: "Elyse",
    title: "Luxury wellness retreat scroll hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-elyse",
    cleanroomPath: "cleanroom/elyse-from-prompt",
    componentPath: "cleanroom/elyse-from-prompt/ElyseScrollNarrative.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-ELYS01.mdx",
    broll: "/assets/videos/elyse-nature-v1.mp4",
    previewPage: "/assets/videos/elyse-scroll-preview-v1.mp4",
    previewFs: "/assets/videos/elyse-scroll-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-ELYS01/Elyse-package-e9l7s3e2k4m1-el5n8q.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/elyse-nature-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL luxury wellness retreat. Client HD = elyse-nature sanctuary film. Four scroll chapters call→return. Package opaque e9l7s3e2k4m1 + PaidSalt el5n8q. Mode: scroll-as-narrative scrub (never free-play primary).",
  },
  {
    id: "MS-HERO-NEXU01",
    brand: "Nexus",
    title: "Enterprise intelligence layer hero",
    tier: "free",
    status: "flagship",
    demoHref: "/demo/cleanroom-nexus",
    cleanroomPath: "cleanroom/nexus-from-prompt",
    componentPath: "cleanroom/nexus-from-prompt/NexusAiHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-NEXU01.mdx",
    broll: "/assets/videos/nexus-neural-v1.mp4",
    previewPage: "/assets/videos/nexus-enterprise-preview-v1.mp4",
    previewFs: "/assets/videos/nexus-enterprise-preview-fs-v1.mp4",
    packagePdf: "/packages/MS-HERO-NEXU01/Nexus-package-n3xu9k2m7p4w.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/nexus-neural-bg-v1.mp4",
    notes:
      "Free listing · sale-ready · ORIGINAL enterprise AI. Client HD = nexus-neural full uncut lattice. Path rail Sense→Route→Compound + sequential letter-melt headline. Package opaque n3xu9k2m7p4w (no PaidSalt). Mode: free-play full film (never scrub).",
  },
  {
    id: "MS-SEC-HELI01",
    brand: "Helix",
    title: "Helical design gallery carousel section",
    tier: "free",
    status: "flagship",
    demoHref: "/demo/cleanroom-helix",
    cleanroomPath: "cleanroom/helix-from-prompt",
    componentPath: "cleanroom/helix-from-prompt/HelixGallerySection.tsx",
    promptPath: "content/prompts/sections/MS-SEC-HELI01.mdx",
    broll: "/assets/images/orbit/orbit-01.jpg",
    previewPage: "/assets/videos/helix-gallery-preview-v1.mp4",
    previewFs: "/assets/videos/helix-gallery-preview-fs-v1.mp4",
    packagePdf: "/packages/MS-SEC-HELI01/Helix-package-h3l1x9k2m7p4.pdf",
    // No backgrounds page tile — section has no background film
    notes:
      "Free listing · sale-ready · ORIGINAL mid-page gallery/carousel section. Client media = nine orbit JPGs (no bg film). WebGL helix + crossing titles + ClickMotion wordmark. Package opaque h3l1x9k2m7p4 (no PaidSalt). Mode: scroll pin scrub (not free-play film). NOT listed on /backgrounds.",
  },
  {
    id: "MS-HERO-ACTU01",
    brand: "Actually!",
    title: "Interactive product can hero",
    tier: "free",
    status: "flagship",
    demoHref: "/demo/cleanroom-actually",
    cleanroomPath: "cleanroom/actually-from-prompt",
    componentPath: "cleanroom/actually-from-prompt/ActuallyHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-ACTU01.mdx",
    broll: "/models/can.glb",
    previewPage: "/assets/videos/actually-hero-preview-v1.mp4",
    previewFs: "/assets/videos/actually-hero-preview-fs-v1.mp4",
    packagePdf: "/packages/MS-HERO-ACTU01/Actually-package-a9ct7u4l2y1x.pdf",
    // No backgrounds page tile — product is 3D vessel + labels, not film
    notes:
      "Free listing · sale-ready · ORIGINAL product can hero. Client media = can.glb + label textures + studio HDRI (no bg film). Pointer clip window + grab + scroll pin. Package opaque a9ct7u4l2y1x (no PaidSalt). Mode: scroll pin scrub + interactive 3D. NOT listed on /backgrounds.",
  },
  {
    id: "MS-SEC-LINE01",
    brand: "Lineup",
    title: "Product line scroll reveal section",
    tier: "free",
    status: "flagship",
    demoHref: "/demo/cleanroom-lineup",
    cleanroomPath: "cleanroom/lineup-from-prompt",
    componentPath: "cleanroom/lineup-from-prompt/LineupSection.tsx",
    promptPath: "content/prompts/sections/MS-SEC-LINE01.mdx",
    broll: "/models/can.glb",
    previewPage: "/assets/videos/lineup-reveal-preview-v1.mp4",
    previewFs: "/assets/videos/lineup-reveal-preview-fs-v1.mp4",
    packagePdf: "/packages/MS-SEC-LINE01/Lineup-package-l7n3e9k2m4p8.pdf",
    notes:
      "Free listing · sale-ready · ORIGINAL product lineup pin section. Client media = can.glb + labels + HDRI. Storefront previews = Premiere Can-Formulation (page + FS). Scroll snap through N SKUs (PRODUCTS + SECTION_META; expand/contract; labelPath/meshPath). Package opaque l7n3e9k2m4p8 (no PaidSalt). Mode: pin scrub + snap. CUSTOMIZATION.md for AI restage. NOT on /backgrounds.",
  },
  {
    id: "MS-SEC-STUDIO01",
    brand: "Studio Sequence",
    title: "Camera pull-out billboard section",
    tier: "free",
    status: "flagship",
    demoHref: "/demo/cleanroom-studio",
    cleanroomPath: "cleanroom/studio-from-prompt",
    componentPath: "cleanroom/studio-from-prompt/StudioSequence.tsx",
    promptPath: "content/prompts/sections/MS-SEC-STUDIO01.mdx",
    // Pure film — Lab surreal.mp4 (no UI frames)
    broll: "/assets/videos/studio-surreal-v1.mp4",
    previewPage: "/assets/videos/studio-sequence-preview-v1.mp4",
    previewFs: "/assets/videos/studio-sequence-preview-fs-v1.mp4",
    backgroundsPreview: "/assets/videos/backgrounds/studio-surreal-bg-v1.mp4",
    packagePdf: "/packages/MS-SEC-STUDIO01/Studio-package-s7u2d1o9q4x1.pdf",
    notes:
      "Free listing · ORIGINAL cinematic camera pull-out. Client HD = pure Surreal film from Lab/nothin surreal.mp4 (no UI frames, full length). Backgrounds = small encode of SAME pure film. Storefront dual previews = Premiere Surreal-Studio-Small + SurrealStudio (full length, no trim). Dynamic videoSrc via studio-data.ts. Package opaque s7u2d1o9q4x1 (no PaidSalt). Mode: pin scrub world-scale. CUSTOMIZATION.md for any film.",
  },
];

export function ownerDesignById(id: string): OwnerDesignEntry | undefined {
  return OWNER_DESIGNS.find((d) => d.id === id);
}
