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
    title: "Pin-until-complete scroll narrative private residences",
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
      "Gold scroll native · pin-until-complete 2026-08-13. Virtual effort 3.2 viewports + scrub lag 0.45 (pace preserved). Chapters + membership band. Files zip + PDF. Backgrounds: Atlantic Residences small encode. Demo /demo/scroll-narrative.",
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
      "Free listing · Platinum Second Revision PASS 2026-08-14 (backend-only). PSAVE pin-until-complete (3.6 vh + 0.55 coast, no GSAP, no footer band). Client HD = vertex-globe-web GOP 3 (97 I). Backgrounds: small vertex-globe-bg. Package opaque id b352guxju0ic.",
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
      "Paid listing · sale-ready · ORIGINAL light-mode scroll narrative. PSAVE (docs/PSAVE.md): 12 vh aim 1:1, 1.2x forward, reverse every 3rd frame, leftover dest + 0.55s dest floor on lift, picture-gated release, page-owns atelier, GOP 3 client HD. Film is slow then a kick; halfway ~5-6 scrolls. Four chapters feed→break→shatter→arrival. Package opaque r7v3l9k2mx4q + PaidSalt rv8n3p. PDF-only pack.",
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
      "Paid listing · Platinum Second Revision PASS 2026-08-15 (backend-only). Client HD = prism-faces-v1 47.63s GOP 3 ~126MB. Multi-size glass panels L+R. Dual process: PSAVE + No Scroller. Aim 12 vh · live 280 · coast/ease 0.55 · deadzone 32. Files zip + PDF. Opaque p8r3sm7k2n4q + PaidSalt pr5m2x. 520vh / gsap scrub banned. Demo /demo/cleanroom-prism.",
  },
  {
    id: "MS-SEC-FOLI01",
    brand: "Folio",
    title: "Pin-until-complete liquid glass decision section",
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
      "Paid listing · pin-until-complete 2026-08-13. Client HD folio-blurry free-play under glass. Virtual progress 0→1 (no tall multi-vh track). Five dense glass sheets, paper rotateX. Opaque f0l1o9x4k7m2 · PaidSalt fl8n3q. Files zip + PDF. Demo /demo/cleanroom-folio.",
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
      "Pro · Platinum Second Revision 2026-08-15 (backend; storefront visuals waived). Client HD = mirage-desert free-play (not PSAVE). Morphic M.A.C. glass cards left, desert subject right. Virtual earn 5 x 1.55 vh. Pin freeing: page owns until dock. Opaque m1r4ge8k2n9x · PaidSalt mg7k3p. Files zip + PDF. Storefront leave as-is. Demo /demo/cleanroom-mirage.",
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
      "Paid listing · sale-ready · ORIGINAL luxury wellness retreat. PSAVE (docs/PSAVE.md): 3.6 vh aim 1:1, 1.2x forward, reverse every 3rd frame, leftover dest on lift, picture-gated release, page-owns runway, GOP 3 client HD. Four chapters call→return. Package opaque e9l7s3e2k4m1 + PaidSalt el5n8q. PDF-only pack.",
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
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-helix",
    cleanroomPath: "cleanroom/helix-from-prompt",
    componentPath: "cleanroom/helix-from-prompt/HelixGallerySection.tsx",
    promptPath: "content/prompts/sections/MS-SEC-HELI01.mdx",
    broll: "/assets/images/orbit/orbit-01.jpg",
    previewPage: "/assets/videos/helix-gallery-preview-v1.mp4",
    previewFs: "/assets/videos/helix-gallery-preview-fs-v1.mp4",
    packagePdf: "/packages/MS-SEC-HELI01/Helix-package-h3l1x9k2m7p4-t2v8c6.pdf",
    // No backgrounds page tile — section has no background film
    notes:
      "Paid listing · Platinum backend 2026-08-15 (public visuals waived). Client = nine orbit JPGs. WebGL helix + crossing titles + wordmark. Dual process? No. No Scroller only (not PSAVE). Aim 5 vh desktop / 3 mobile. Pin freeing: page owns until dock. Files zip + PDF. Opaque h3l1x9k2m7p4 + PaidSalt t2v8c6. gsap / lenis / SmoothScroll / tall spacer banned. Demo /demo/cleanroom-helix.",
  },
  {
    id: "MS-HERO-ACTU01",
    brand: "Actually!",
    title: "Interactive product can hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-actually",
    cleanroomPath: "cleanroom/actually-from-prompt",
    componentPath: "cleanroom/actually-from-prompt/ActuallyHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-ACTU01.mdx",
    broll: "/models/can.glb",
    previewPage: "/assets/videos/actually-hero-preview-v1.mp4",
    previewFs: "/assets/videos/actually-hero-preview-fs-v1.mp4",
    packagePdf: "/packages/MS-HERO-ACTU01/Actually-package-a9ct7u4l2y1x-r5m4x9.pdf",
    // No backgrounds page tile — product is 3D vessel + labels, not film
    notes:
      "Paid listing · Platinum backend 2.1.0 2026-08-16. Client = can.glb + labels + HDRI. Storefront leave as-is. Files zip + PDF. Opaque a9ct7u4l2y1x + PaidSalt r5m4x9. No Scroller only (not PSAVE). Earn 1.2 vh. Pin freeing: page owns until dock. Pointer window + grab stay. lenis / ScrollTrigger pin banned. Demo /demo/cleanroom-actually.",
  },
  {
    id: "MS-SEC-LINE01",
    brand: "Lineup",
    title: "Product line scroll reveal section",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-lineup",
    cleanroomPath: "cleanroom/lineup-from-prompt",
    componentPath: "cleanroom/lineup-from-prompt/LineupSection.tsx",
    promptPath: "content/prompts/sections/MS-SEC-LINE01.mdx",
    broll: "/models/can.glb",
    previewPage: "/assets/videos/lineup-reveal-preview-v1.webm",
    previewFs: "/assets/videos/lineup-reveal-preview-fs-v1.mp4",
    packagePdf: "/packages/MS-SEC-LINE01/Lineup-package-l7n3e9k2m4p8-q3n7w2.pdf",
    notes:
      "Paid listing · Platinum backend 2026-08-16 (public visuals waived). Client = can.glb + labels + HDRI. Storefront WebM leave as-is. Files zip + PDF. Opaque l7n3e9k2m4p8 + PaidSalt q3n7w2. No Scroller only (not PSAVE). Earn N vh. Snap on lift. Pin freeing: page owns until dock. No leftover SmoothScroll / lenis-bridge / gsap-register. Demo /demo/cleanroom-lineup.",
  },
  {
    id: "MS-SEC-STUDIO01",
    brand: "Studio Sequence",
    title: "Camera pull-out billboard section",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-studio",
    cleanroomPath: "cleanroom/studio-from-prompt",
    componentPath: "cleanroom/studio-from-prompt/StudioSequence.tsx",
    promptPath: "content/prompts/sections/MS-SEC-STUDIO01.mdx",
    // Pure film — Lab surreal.mp4 (no UI frames)
    broll: "/assets/videos/studio-surreal-v1.mp4",
    previewPage: "/assets/videos/studio-sequence-preview-v1.webm",
    previewFs: "/assets/videos/studio-sequence-preview-fs-v1.mp4",
    backgroundsPreview: "/assets/videos/backgrounds/studio-surreal-bg-v1.mp4",
    packagePdf: "/packages/MS-SEC-STUDIO01/Studio-package-s7u2d1o9q4x1-p8k2m1.pdf",
    notes:
      "Paid listing · Platinum backend 2026-08-15 (public visuals waived). Client = studio-surreal-v1.mp4 + NY plate. Storefront WebM leave as-is. Files zip + PDF. Opaque s7u2d1o9q4x1 + PaidSalt p8k2m1. No Scroller only (not PSAVE). Earn 4 vh desktop / 3 mobile. Pin freeing: page owns until dock. gsap / lenis / SmoothScroll / tall spacer banned. Demo /demo/cleanroom-studio.",
  },
  {
    id: "MS-SEC-PHOB01",
    brand: "Phobia",
    title: "Cursor-fleeing forms section",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-phobia",
    cleanroomPath: "cleanroom/phobia-from-prompt",
    componentPath: "cleanroom/phobia-from-prompt/PhobiaSection.tsx",
    promptPath: "content/prompts/sections/MS-SEC-PHOB01.mdx",
    broll: "/assets/phobia/papier-froisse.webp",
    previewPage: "/assets/videos/phobia-forms-preview-v1.webm",
    previewFs: "/assets/videos/phobia-forms-preview-fs-v1.mp4",
    packagePdf: "/packages/MS-SEC-PHOB01/Phobia-package-p8h0b2a9k1m4-f3n8k2.pdf",
    notes:
      "Paid listing · sale-ready · ORIGINAL pointer-flee forms section. Client media = cutouts in /assets/phobia (no film). Storefront dual previews operator-approved. Package opaque p8h0b2a9k1m4 · PaidSalt f3n8k2 · files zip. Mode: pointer reactive (not scroll scrub). NOT on /backgrounds.",
  },
  {
    id: "MS-SEC-DOPA01",
    brand: "Dopamine",
    title: "Complete fashion footer section",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-dopamine",
    cleanroomPath: "cleanroom/dopamine-from-prompt",
    componentPath: "cleanroom/dopamine-from-prompt/SiteFooter.tsx",
    promptPath: "content/prompts/sections/MS-SEC-DOPA01.mdx",
    broll: "/assets/dopamine/Woman1.png",
    previewPage: "/assets/videos/dopamine-footer-preview-v1.webm",
    previewFs: "/assets/videos/dopamine-footer-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-SEC-DOPA01/Dopamine-package-d0p4m1n38k2x-f7t3r9.pdf",
    notes:
      "Paid · sale-ready · ORIGINAL complete fashion footer. Client = /assets/dopamine. Storefront page = Dopamine-Small-2; FS = Dopamine (unchanged). Package opaque d0p4m1n38k2x · PaidSalt f7t3r9 · files zip. Demo /demo/cleanroom-dopamine. NOT on /backgrounds.",
  },
  {
    id: "MS-HERO-ROAD01",
    brand: "Roadster",
    title: "Studio Drive scroll hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-roadster",
    cleanroomPath: "cleanroom/tesla-roadster",
    componentPath: "cleanroom/tesla-roadster/TeslaRoadsterPromo.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-ROAD01.mdx",
    broll: "/assets/roadster/studio-drive.mp4",
    previewPage: "/assets/videos/roadster-studio-drive-preview-v1.mp4",
    previewFs: "/assets/videos/roadster-studio-drive-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-ROAD01/Roadster-package-r0ad8t3r5k2m-rd7n4x.pdf",
    notes:
      "Paid listing · Platinum backend 2.1.0 2026-08-16. Client = studio-drive.mp4 + roadster.glb. Storefront leave as-is. Files zip + PDF. Opaque r0ad8t3r5k2m + PaidSalt rd7n4x. No Scroller only (not PSAVE). Earn 13.3 vh. Pin freeing: page owns until dock. Film free-plays. gsap / ScrollTrigger pin banned. Demo /demo/cleanroom-roadster.",
  },
  {
    id: "MS-HERO-GROK01",
    brand: "Grok Bot",
    title: "Las Vegas Sphere scroll hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-grokbot",
    cleanroomPath: "cleanroom/grokbot-from-prompt",
    componentPath: "cleanroom/grokbot-from-prompt/GrokBotHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-GROK01.mdx",
    broll: "/assets/videos/grokbot-sphere-v1.mp4",
    previewPage: "/assets/videos/grokbot-preview-v1.webm",
    previewFs: "/assets/videos/grokbot-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-GROK01/GrokBot-package-g7k0b8t4vg2n-gk4n8x.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/grokbot-sphere-bg-v1.mp4",
    notes:
      "Paid listing · Platinum backend 2.1.0 2026-08-16. Client = grokbot-sphere-v1 GOP 3. Storefront page+gallery = operator GrokBot-VEGAS.webm (full 63.76s, keep WebM). FS = GrokBot-VEGAS_FS.mp4 (full 63.76s). Opaque g7k0b8t4vg2n · PaidSalt gk4n8x · files zip + PDF. Dual process: PSAVE + No Scroller. Aim 12 vh. Demo /demo/cleanroom-grokbot.",
  },
  {
    id: "MS-HERO-SKYS01",
    brand: "SkySpires",
    title: "Sunrise scroll hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-skyspires",
    cleanroomPath: "cleanroom/skyspires-from-prompt",
    componentPath: "cleanroom/skyspires-from-prompt/SkySpiresHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-SKYS01.mdx",
    broll: "/assets/videos/skyspires-sunrise-v1.mp4",
    previewPage: "/assets/videos/skyspires-preview-v1.mp4",
    previewFs: "/assets/videos/skyspires-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-SKYS01/SkySpires-package-s4y8p1r3sk7n-sk5n2q.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/skyspires-sunrise-bg-v1.mp4",
    notes:
      "Paid listing · Platinum backend 2.1.0 2026-08-16. Client = skyspires-sunrise-v1 GOP 3. Storefront agent capture until operator Premiere. Opaque s4y8p1r3sk7n · PaidSalt sk5n2q. Dual process: PSAVE + No Scroller. Aim 12 vh. HUD loops stay. Glass lock. Clone frozen. Demo /demo/cleanroom-skyspires.",
  },
  {
    id: "MS-HERO-NOMA01",
    brand: "Nomad Travel",
    title: "Luxury travel platform hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-nomad",
    cleanroomPath: "cleanroom/nomad-from-prompt",
    componentPath: "cleanroom/nomad-from-prompt/NomadTravelHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-NOMA01.mdx",
    broll: "/assets/videos/nomad-montage-v1.mp4",
    previewPage: "/assets/videos/nomad-preview-v1.mp4",
    previewFs: "/assets/videos/nomad-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-NOMA01/NomadTravel-package-n0m4d7tr4v3l-nm8k4p.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/nomad-montage-bg-v1.mp4",
    notes:
      "Paid listing · Platinum Second Revision 2026-08-12 (wiring + pack density; no visual restyle) + Meridian-density package PDF. Client HD = nomad-montage ~30s. Storefront dual-preview + FS. Opaque n0m4d7tr4v3l · PaidSalt nm8k4p · files zip. Backgrounds: small nomad-montage-bg. Mode: free-play film + entrance + parallax. Never scrub. Demo /demo/cleanroom-nomad.",
  },
  {
    id: "MS-HERO-STIL01",
    brand: "STILL",
    title: "Mindfulness scroll narrative hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-still",
    cleanroomPath: "cleanroom/still-from-prompt",
    componentPath: "cleanroom/still-from-prompt/StillMindfulnessHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-STIL01.mdx",
    broll: "/assets/videos/still-cosmos-v1.mp4",
    previewPage: "/assets/videos/still-preview-v1.webm",
    previewFs: "/assets/videos/still-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-STIL01/Still-package-s7i1l9m4ndf0-sk3p8w.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/still-cosmos-bg-v1.mp4",
    notes:
      "Paid listing · Platinum Second Revision PASS 2026-08-15 (backend-only). Client HD = still-cosmos 30s GOP 3. Storefront page+browse: operator WebM still-preview-v1.webm (keep WebM). FS mp4 OK. Opaque s7i1l9m4ndf0 · PaidSalt sk3p8w · files zip + PDF. Backgrounds: still-cosmos-bg. Dual process: PSAVE + No Scroller. Aim 12 vh. Hybrid / 960vh banned. Demo /demo/cleanroom-still.",
  },
  {
    id: "MS-HERO-BLOM01",
    brand: "BLOOM",
    title: "Kids & teen girls yoga course hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-bloom",
    cleanroomPath: "cleanroom/bloom-from-prompt",
    componentPath: "cleanroom/bloom-from-prompt/BloomYogaHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-BLOM01.mdx",
    broll: "/assets/videos/luna-yoga-v1.mp4",
    previewPage: "/assets/videos/bloom-preview-v1.mp4",
    previewFs: "/assets/videos/bloom-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-BLOM01/Bloom-package-b1o0m7y0g4k2-bm4k8p.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/luna-yoga-bg-v1.mp4",
    notes:
      "Paid listing · Platinum Second Revision PASS 2026-08-12 (pack density; visuals locked). Client HD = luna-yoga ~45s silent. Storefront dual-preview + FS. Opaque b1o0m7y0g4k2 · PaidSalt bm4k8p · files zip + PDF. Backgrounds: luna-yoga-bg. Mode: free-play class film + Kids/Teens path. Never scrub. Demo /demo/cleanroom-bloom.",
  },
  {
    id: "MS-HERO-ACNE01",
    brand: "Acne Secret",
    title: "Private clear skin HVCO hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-acne",
    cleanroomPath: "cleanroom/acne-from-prompt",
    componentPath: "cleanroom/acne-from-prompt/AcneSecretHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-ACNE01.mdx",
    broll: "/assets/videos/acne-secret-v1.webm",
    previewPage: "/assets/videos/acne-secret-preview-v1.mp4",
    previewFs: "/assets/videos/acne-secret-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-ACNE01/AcneSecret-package-a0cne7s3cr3t-ac8k2n.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/acne-secret-bg-v1.mp4",
    notes:
      "Paid listing · platinum 2026-08-13. Client WebM. Storefront dual mp4 (full cinema + smooth dock). Opaque a0cne7s3cr3t · PaidSalt ac8k2n. Mode: cinema hold then HVCO dock. Brand until email. Demo /demo/cleanroom-acne.",
  },
  {
    id: "MS-HERO-VERV01",
    brand: "VERVE SOCIAL",
    title: "Creator social platform hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-verve",
    cleanroomPath: "cleanroom/verve-from-prompt",
    componentPath: "cleanroom/verve-from-prompt/VerveSocialHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-VERV01.mdx",
    broll: "/assets/videos/verve-presence-v1.mp4",
    previewPage: "/assets/videos/verve-preview-v1.mp4",
    previewFs: "/assets/videos/verve-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-VERV01/VerveSocial-package-v3rv3s0c1al-vs7k2m.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/verve-presence-bg-v1.mp4",
    notes:
      "Paid listing · platinum 2026-08-13. Client presence film ~15s from Social.mp4. Storefront dual preview burns (linear marquee scrub). Opaque v3rv3s0c1al · PaidSalt vs7k2m. Mode: free-play + marquee. Demo /demo/cleanroom-verve. Platinum Second Revision PASS.",
  },
  {
    id: "MS-HERO-ORBI01",
    brand: "ORBIT FINANCE",
    title: "Trustworthy premium neobank hero",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-orbit",
    cleanroomPath: "cleanroom/orbit-from-prompt",
    componentPath: "cleanroom/orbit-from-prompt/OrbitFinanceHero.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-ORBI01.mdx",
    broll: "/assets/videos/orbit-vault-v1.mp4",
    previewPage: "/assets/videos/orbit-preview-v1.mp4",
    previewFs: "/assets/videos/orbit-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-ORBI01/OrbitFinance-package-o4b1tv4ult-ob7k3n.pdf",
    backgroundsPreview: "/assets/videos/backgrounds/orbit-vault-bg-v1.mp4",
    notes:
      "Paid listing · platinum 2026-08-13. Client vault film ~15s from Premiere O-Finance_1.mp4. Storefront dual burns with ring scrub. Opaque o4b1tv4ult · PaidSalt ob7k3n. Mode: free-play + orbital ring. Demo /demo/cleanroom-orbit. Platinum Second Revision PASS.",
  },
  {
    id: "MS-HERO-ZERO01",
    brand: "Zero Energy",
    title: "3D range gallery",
    tier: "pro",
    status: "flagship",
    demoHref: "/demo/cleanroom-zero",
    cleanroomPath: "cleanroom/zero-energy-from-prompt",
    componentPath: "cleanroom/zero-energy-from-prompt/ZeroEnergyGallery.tsx",
    promptPath: "content/prompts/heroes/MS-HERO-ZERO01.mdx",
    broll: "/assets/zero-energy/webgl/can.glb",
    previewPage: "/assets/videos/zero-energy-preview-v1.webm",
    previewFs: "/assets/videos/zero-energy-preview-fs-v1.mp4",
    packagePdf:
      "/packages/MS-HERO-ZERO01/ZeroEnergy-package-q8w3n6k2xm5r-n4k8p2.pdf",
    notes:
      "Paid listing · platinum 2026-08-13. Client = 3D pack (can.glb + six labels + HDRI), not a film. Storefront operator WebM page/gallery keep WebM + FS mp4. Opaque q8w3n6k2xm5r · PaidSalt n4k8p2. Mode: Lenis pin-until-complete + raw Three 0.161. Demo /demo/cleanroom-zero. NOT on /backgrounds. Platinum Second Revision PASS.",
  },
];

export function ownerDesignById(id: string): OwnerDesignEntry | undefined {
  return OWNER_DESIGNS.find((d) => d.id === id);
}
