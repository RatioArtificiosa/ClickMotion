/**
 * Animated background library (public /backgrounds gallery).
 *
 * LAW — backgrounds-page media role only:
 *   - Serve ONLY small encodes under `/assets/videos/backgrounds/*-bg-v1.mp4`
 *   - NEVER pipeline client HD, site hero film, masters, or storefront product captures here
 *   - Public page is showcase only (no copy/download/unlock on tiles)
 *   - Films ship inside product packages — not from this gallery
 *   - Encode: `npm run encode:backgrounds` → scripts/encode-backgrounds-preview.mjs
 *   - Admin mirror: /admin/backgrounds (reads THIS file — single source of truth)
 *   - Checklist: docs/PRODUCTION_READY_CHECKLIST.md §2H · docs/ASSET_PIPELINE.md
 *
 * When shipping a product to sale that will appear on /backgrounds:
 *   1. Encode small bg file (never link client HD)
 *   2. Cut a PURE FILM poster still from client HD (no UI, no cards, no type)
 *      e.g. public/assets/posters/{slug}-v1.webp — NEVER *-scroll-preview-* / UI burns
 *   3. Add/update entry HERE (src = small bg; poster = pure film still)
 *   4. Set productId + sourceFilm for operator traceability
 *   5. Mirror path on product-packages + owner-designs (backgroundsPreview)
 *   6. Confirm Admin → Backgrounds + public /backgrounds show film only (no product UI)
 */

export type BackgroundAsset = {
  id: string;
  title: string;
  /** Public path under /public — backgrounds role only (small web encode) */
  src: string;
  poster?: string;
  tier: "free" | "premium";
  tags: string[];
  /** CSS gradient fallback when no video (abstract tiles) */
  gradient?: string;
  kind: "video" | "gradient";
  /**
   * Optional CMS / package product id when this tile is fed from a SKU film.
   * Admin uses this to deep-link Products / Packages / Designs.
   */
  productId?: string;
  /**
   * Operator-only: client HD / pure film used to encode `src`.
   * Never serve this path on /backgrounds.
   */
  sourceFilm?: string;
  /** Short operator note (admin only) */
  adminNote?: string;
};

export const backgroundsCatalog: BackgroundAsset[] = [
  {
    id: "meridian-coast",
    title: "Atlantic Residences",
    src: "/assets/videos/backgrounds/atlantic-residences-bg-v1.mp4",
    poster: "/assets/posters/sequence-01.webp",
    tier: "free",
    tags: ["luxury", "cinematic", "real-estate"],
    kind: "video",
    productId: "MS-HERO-MERI01",
    sourceFilm: "/assets/videos/sequence-01.mp4",
    adminNote: "Small encode of Meridian client HD — never stream sequence-01 here.",
  },
  {
    id: "aether-waves",
    title: "Aether Waves",
    src: "/assets/videos/backgrounds/aether-waves-bg-v1.mp4",
    poster: "/assets/posters/aether-waves-web-still-v1.webp",
    tier: "free",
    tags: ["wellness", "organic", "soft"],
    kind: "video",
    productId: "MS-HERO-AETH01",
    sourceFilm: "/assets/videos/aether-waves-web-v1.mp4",
    adminNote: "Small encode of Aether client HD web film.",
  },
  {
    id: "vertex-globe",
    title: "Vertex Globe",
    src: "/assets/videos/backgrounds/vertex-globe-bg-v1.mp4",
    poster: "/assets/posters/vertex-globe-web-still-v1.webp",
    tier: "premium",
    tags: ["tech", "globe", "security"],
    kind: "video",
    productId: "MS-HERO-VERT01",
    sourceFilm: "/assets/videos/vertex-globe-web-v1.mp4",
    adminNote: "Small encode of Vertex client HD web film.",
  },
  {
    id: "neon-forge-city",
    title: "Neon Forge City",
    src: "/assets/videos/backgrounds/neon-forge-bg-v1.mp4",
    poster: "/assets/posters/neon-forge-city-v1.webp",
    tier: "premium",
    tags: ["neon", "cyberpunk", "night"],
    kind: "video",
    productId: "MS-HERO-NEON01",
    sourceFilm: "/assets/videos/neon-forge-city-v1.mp4",
    adminNote:
      "Small encode of Neon Forge client HD (60s megacity). Never stream full client HD here.",
  },
  {
    id: "lumina-dolly",
    title: "Lumina Studio Lot",
    src: "/assets/videos/backgrounds/lumina-dolly-bg-v1.mp4",
    poster: "/assets/posters/lumina-dolly-v1.webp",
    tier: "premium",
    tags: ["cinematic", "film", "warm", "studio"],
    kind: "video",
    productId: "MS-HERO-LUMI01",
    sourceFilm: "/assets/videos/lumina-dolly-v1.mp4",
    adminNote:
      "Small encode of Lumina client HD (60s studio lot). Never stream full client HD here.",
  },
  {
    id: "terra-aerial",
    title: "Terra Nova Winds",
    src: "/assets/videos/backgrounds/terra-aerial-bg-v1.mp4",
    poster: "/assets/posters/terra-aerial-v1.webp",
    tier: "premium",
    tags: ["nature", "energy", "aerial", "organic"],
    kind: "video",
    productId: "MS-HERO-TERR01",
    sourceFilm: "/assets/videos/terra-aerial-v1.mp4",
    adminNote:
      "Small encode of Terra Nova client HD (wind farms aerial). Never stream full client HD here.",
  },
  {
    id: "apex-quantum",
    title: "Apex Cryolab",
    src: "/assets/videos/backgrounds/apex-quantum-bg-v1.mp4",
    poster: "/assets/posters/apex-quantum-v1.webp",
    tier: "premium",
    tags: ["tech", "quantum", "lab", "dark"],
    kind: "video",
    productId: "MS-HERO-APEX01",
    sourceFilm: "/assets/videos/apex-quantum-v1.mp4",
    adminNote:
      "Small encode of Apex Quantum client HD (crylabtower). Never stream full client HD here.",
  },
  {
    id: "revel-breakout",
    title: "Revel Breakout",
    src: "/assets/videos/backgrounds/revel-breakout-bg-v1.mp4",
    poster: "/assets/posters/revel-breakout-v1.webp",
    tier: "premium",
    tags: ["fashion", "social", "light", "editorial"],
    kind: "video",
    productId: "MS-HERO-REVL01",
    sourceFilm: "/assets/videos/revel-breakout-v1.mp4",
    adminNote:
      "Small encode of Revel client HD (Iphone-Breakout). Never stream full client HD here.",
  },
  {
    id: "prism-faces",
    title: "Prism Faces",
    src: "/assets/videos/backgrounds/prism-faces-bg-v1.mp4",
    poster: "/assets/posters/prism-faces-v1.webp",
    tier: "premium",
    tags: ["art", "identity", "faces", "liquid-glass"],
    kind: "video",
    productId: "MS-HERO-PRSM01",
    sourceFilm: "/assets/videos/prism-faces-v1.mp4",
    adminNote:
      "Small encode of Prism client HD (FacesFacesFaces). Never stream full client HD here.",
  },
  {
    id: "folio-blurry",
    title: "Folio Blurry Vision",
    src: "/assets/videos/backgrounds/folio-blurry-bg-v1.mp4",
    // Pure film still ONLY — never folio-scroll-preview-* (UI-burned storefront)
    poster: "/assets/posters/folio-blurry-v1.webp",
    tier: "premium",
    tags: ["abstract", "motion", "enterprise", "liquid-glass"],
    kind: "video",
    productId: "MS-SEC-FOLI01",
    sourceFilm: "/assets/videos/folio-blurry-v1.mp4",
    adminNote:
      "Small encode of Folio client HD (Blurry Vision loop). Poster = pure film still (folio-blurry-v1.webp), never scroll-preview UI burn. Never stream full client HD here.",
  },
  {
    id: "mirage-desert",
    title: "Mirage Desert",
    src: "/assets/videos/backgrounds/mirage-desert-bg-v1.mp4",
    // Pure film still ONLY — never mirage-scroll-preview-* (UI-burned storefront)
    poster: "/assets/posters/mirage-desert-v1.webp",
    tier: "premium",
    tags: ["desert", "agency", "cinematic", "liquid-glass"],
    kind: "video",
    productId: "MS-HERO-MIRA01",
    sourceFilm: "/assets/videos/mirage-desert-v1.mp4",
    adminNote:
      "Small encode of Mirage client HD (DesertSurvivor). Poster = pure film still (mirage-desert-v1.webp), never scroll-preview UI burn. Never stream full client HD here.",
  },
  {
    id: "sable-winter",
    title: "Sable Winter Walk",
    src: "/assets/videos/backgrounds/sable-winter-bg-v1.mp4",
    // Pure film still ONLY — never sable-holiday-preview-* (UI-burned storefront)
    poster: "/assets/posters/sable-winter-v1.webp",
    tier: "premium",
    tags: ["fashion", "holiday", "winter", "luxury"],
    kind: "video",
    productId: "MS-HERO-SABL01",
    sourceFilm: "/assets/videos/sable-winter-v1.mp4",
    adminNote:
      "Small encode of Sable client HD (full winter walk). Poster = pure film still (sable-winter-v1.webp), never holiday-preview UI burn. Never stream full client HD here.",
  },
  {
    id: "axiom-upside",
    title: "Axiom Inverted NYC",
    src: "/assets/videos/backgrounds/axiom-upside-bg-v1.mp4",
    // Pure film still ONLY — never axiom-fintech-preview-* (UI-burned storefront)
    poster: "/assets/posters/axiom-upside-v1.webp",
    tier: "premium",
    tags: ["fintech", "nyc", "cinematic", "institutional"],
    kind: "video",
    productId: "MS-HERO-AXIO01",
    sourceFilm: "/assets/videos/axiom-upside-v1.mp4",
    adminNote:
      "Small encode of Axiom client HD (full inverted NYC run). Poster = pure film still (axiom-upside-v1.webp), never fintech-preview UI burn. Never stream full client HD here.",
  },
  {
    id: "elyse-nature",
    title: "Elyse Sanctuary Nature",
    src: "/assets/videos/backgrounds/elyse-nature-bg-v1.mp4",
    // Pure film still ONLY — never elyse-scroll-preview-* (UI-burned storefront)
    poster: "/assets/posters/elyse-nature-v1.webp",
    tier: "premium",
    tags: ["wellness", "nature", "luxury", "cinematic"],
    kind: "video",
    productId: "MS-HERO-ELYS01",
    sourceFilm: "/assets/videos/elyse-nature-v1.mp4",
    adminNote:
      "Small encode of Elyse client HD (sanctuary dual-tree golden hour). Poster = pure film still (elyse-nature-v1.webp), never scroll-preview UI burn. Never stream full client HD here.",
  },
  {
    id: "nexus-neural",
    title: "Nexus Neural Lattice",
    src: "/assets/videos/backgrounds/nexus-neural-bg-v1.mp4",
    // Pure film still ONLY — never nexus-enterprise-preview-* (UI-burned storefront)
    poster: "/assets/posters/nexus-neural-v1.webp",
    tier: "free",
    tags: ["ai", "neural", "enterprise", "cinematic"],
    kind: "video",
    productId: "MS-HERO-NEXU01",
    sourceFilm: "/assets/videos/nexus-neural-v1.mp4",
    adminNote:
      "Small encode of Nexus client HD (full neural lattice). Poster = pure film still (nexus-neural-v1.webp), never enterprise-preview UI burn. Never stream full client HD here.",
  },
  {
    id: "studio-surreal",
    title: "Studio Surreal",
    src: "/assets/videos/backgrounds/studio-surreal-bg-v1.mp4",
    // Pure film still ONLY — never studio-sequence-preview-* (UI-burned storefront)
    poster: "/assets/posters/studio-surreal-v1.webp",
    tier: "premium",
    tags: ["cinematic", "studio", "surreal", "film", "billboard"],
    kind: "video",
    productId: "MS-SEC-STUDIO01",
    sourceFilm: "/assets/videos/studio-surreal-v1.mp4",
    adminNote:
      "Pro SKU film. Small encode of pure Lab surreal.mp4 (no UI frames), full length. Never stream client HD or storefront previews here.",
  },
  {
    id: "nomad-montage",
    title: "Nomad Luxury Stays",
    src: "/assets/videos/backgrounds/nomad-montage-bg-v1.mp4",
    // Pure film still ONLY — never nomad-preview-* (UI-burned storefront)
    poster: "/assets/posters/nomad-montage-v1.webp",
    tier: "premium",
    tags: ["travel", "luxury", "hotel", "cinematic", "editorial"],
    kind: "video",
    productId: "MS-HERO-NOMA01",
    sourceFilm: "/assets/videos/nomad-montage-v1.mp4",
    adminNote:
      "Small encode of Nomad client HD (luxuryhotel master). Poster = pure film still. Never stream full client HD or storefront previews here.",
  },
  {
    id: "still-cosmos",
    title: "STILL Cosmic Growth",
    src: "/assets/videos/backgrounds/still-cosmos-bg-v1.mp4",
    // Pure film still ONLY — never still-preview-* (UI-burned storefront)
    poster: "/assets/posters/still-cosmos-v1.webp",
    tier: "premium",
    tags: ["wellness", "mindfulness", "cosmos", "cinematic", "night"],
    kind: "video",
    productId: "MS-HERO-STIL01",
    sourceFilm: "/assets/videos/still-cosmos-v1.mp4",
    adminNote:
      "Small encode of STILL client HD (Growth2 cosmos arc). Poster = pure film still. Never stream full client HD or storefront previews here.",
  },
  {
    id: "luna-yoga",
    title: "BLOOM Class Circle",
    src: "/assets/videos/backgrounds/luna-yoga-bg-v1.mp4",
    // Pure film still ONLY — never bloom-preview-* (UI-burned storefront)
    poster: "/assets/posters/luna-yoga-v1.webp",
    tier: "premium",
    tags: ["wellness", "yoga", "kids", "class", "cinematic", "soft"],
    kind: "video",
    productId: "MS-HERO-BLOM01",
    sourceFilm: "/assets/videos/luna-yoga-v1.mp4",
    adminNote:
      "Small encode of BLOOM client HD (luna-yoga class film). Poster = pure film still. Never stream full client HD or storefront previews here.",
  },
  {
    id: "acne-secret",
    title: "Acne Secret Ritual",
    src: "/assets/videos/backgrounds/acne-secret-bg-v1.mp4",
    poster: "/assets/posters/acne-secret-v1.webp",
    tier: "premium",
    tags: ["skincare", "cinematic", "dark", "product", "editorial"],
    kind: "video",
    productId: "MS-HERO-ACNE01",
    sourceFilm: "/assets/videos/acne-secret-v1.webm",
    adminNote:
      "Small encode of Acne Secret client WebM. Poster = pure film still. Never stream client HD or storefront previews here.",
  },
  {
    id: "verve-presence",
    title: "Verve Presence Night",
    src: "/assets/videos/backgrounds/verve-presence-bg-v1.mp4",
    poster: "/assets/posters/verve-presence-v1.webp",
    tier: "premium",
    tags: ["social", "cinematic", "night", "people", "editorial"],
    kind: "video",
    productId: "MS-HERO-VERV01",
    sourceFilm: "/assets/videos/verve-presence-v1.mp4",
    adminNote:
      "Small encode of VERVE client HD. Poster = pure film still. Never stream client HD or storefront previews here.",
  },
  {
    id: "orbit-vault",
    title: "Orbit Vault Night",
    src: "/assets/videos/backgrounds/orbit-vault-bg-v1.mp4",
    poster: "/assets/posters/orbit-vault-v1.webp",
    tier: "premium",
    tags: ["fintech", "banking", "cinematic", "navy", "gold", "architecture"],
    kind: "video",
    productId: "MS-HERO-ORBI01",
    sourceFilm: "/assets/videos/orbit-vault-v1.mp4",
    adminNote:
      "Small encode of ORBIT client HD. Poster = pure film still. Never stream client HD or storefront previews here.",
  },
  {
    id: "grokbot-sphere",
    title: "Grok Bot Sphere Vegas",
    src: "/assets/videos/backgrounds/grokbot-sphere-bg-v1.mp4",
    poster: "/assets/posters/grokbot-sphere-v1.webp",
    tier: "premium",
    tags: ["ai", "night", "city", "cinematic", "sphere"],
    kind: "video",
    productId: "MS-HERO-GROK01",
    sourceFilm: "/assets/videos/grokbot-sphere-v1.mp4",
    adminNote:
      "Small encode of Grok Bot client HD (Sphere film). Poster = pure film still. Never stream full client HD or storefront GrokBot-VEGAS previews here.",
  },
  {
    id: "skyspires-sunrise",
    title: "SkySpires Sunrise",
    src: "/assets/videos/backgrounds/skyspires-sunrise-bg-v1.mp4",
    poster: "/assets/posters/skyspires-sunrise-v1.webp",
    tier: "premium",
    tags: ["sunrise", "cinematic", "sky", "editorial", "studio"],
    kind: "video",
    productId: "MS-HERO-SKYS01",
    sourceFilm: "/assets/videos/skyspires-sunrise-v1.mp4",
    adminNote:
      "Small encode of SkySpires client HD (DesignSunrise2 remaster). Poster = pure film still. Never stream full client HD or storefront previews here.",
  },
  {
    id: "grad-aurora",
    title: "Aurora Mesh",
    src: "",
    tier: "free",
    tags: ["gradient", "aurora"],
    kind: "gradient",
    gradient:
      "radial-gradient(120% 80% at 20% 20%, #3d5a80 0%, transparent 55%), radial-gradient(100% 70% at 80% 60%, #98c1d9 0%, transparent 50%), linear-gradient(160deg, #0b1320 0%, #1b2838 50%, #0d1b2a 100%)",
  },
  {
    id: "grad-velvet",
    title: "Velvet Night",
    src: "",
    tier: "premium",
    tags: ["gradient", "luxury"],
    kind: "gradient",
    gradient:
      "radial-gradient(90% 70% at 30% 30%, #5c3d5e 0%, transparent 55%), radial-gradient(80% 60% at 75% 70%, #c9a66b44 0%, transparent 45%), linear-gradient(145deg, #0c0a08 0%, #1a1218 55%, #0c0a08 100%)",
  },
  {
    id: "grad-neon",
    title: "Neon Pulse",
    src: "",
    tier: "premium",
    tags: ["gradient", "neon"],
    kind: "gradient",
    gradient:
      "radial-gradient(70% 60% at 25% 40%, #ff006e55 0%, transparent 50%), radial-gradient(60% 50% at 75% 30%, #00f5d455 0%, transparent 45%), linear-gradient(180deg, #050508 0%, #0a0a12 100%)",
  },
  {
    id: "grad-horizon",
    title: "Gold Horizon",
    src: "",
    tier: "free",
    tags: ["gradient", "warm"],
    kind: "gradient",
    gradient:
      "radial-gradient(100% 80% at 50% 100%, #c9a66b66 0%, transparent 55%), linear-gradient(180deg, #0c0a08 0%, #1a1410 40%, #2a1f14 100%)",
  },
  {
    id: "grad-pastel",
    title: "Soft Pastel Drift",
    src: "",
    tier: "premium",
    tags: ["gradient", "soft"],
    kind: "gradient",
    gradient:
      "radial-gradient(80% 70% at 20% 80%, #f7c5c555 0%, transparent 50%), radial-gradient(70% 60% at 80% 20%, #a8dadc55 0%, transparent 50%), linear-gradient(160deg, #1a1520 0%, #2a2438 100%)",
  },
  {
    id: "grad-sunset",
    title: "Ember Sunset",
    src: "",
    tier: "premium",
    tags: ["gradient", "warm"],
    kind: "gradient",
    gradient:
      "radial-gradient(90% 70% at 70% 80%, #e07a3d66 0%, transparent 50%), radial-gradient(60% 50% at 20% 30%, #7b2d2644 0%, transparent 45%), linear-gradient(200deg, #0c0a08 0%, #1c1210 100%)",
  },
  {
    id: "aether-atmosphere",
    title: "Aether Atmosphere",
    src: "/assets/videos/backgrounds/aether-waves-bg-v1.mp4",
    poster: "/assets/posters/aether-waves-web-still-v1.webp",
    tier: "premium",
    tags: ["wellness", "cinematic"],
    kind: "video",
    productId: "MS-HERO-AETH01",
    sourceFilm: "/assets/videos/aether-waves-web-v1.mp4",
    adminNote: "Premium tile · same small Aether encode as free Waves (not client HD).",
  },
];

/** All video tiles that stream a backgrounds-role file. */
export function backgroundsVideoTiles(): BackgroundAsset[] {
  return backgroundsCatalog.filter((b) => b.kind === "video" && Boolean(b.src));
}

/** Tiles linked to a product id (SKU film listed on /backgrounds). */
export function backgroundsForProduct(productId: string): BackgroundAsset[] {
  const id = productId.trim();
  return backgroundsCatalog.filter((b) => b.productId === id);
}

/** Primary small encode path for a product, if any. */
export function backgroundsPreviewForProduct(
  productId: string
): string | undefined {
  const videos = backgroundsForProduct(productId).filter(
    (b) => b.kind === "video" && b.src
  );
  return videos[0]?.src;
}

/** Assert catalog video paths are backgrounds-role only (no client HD leak). */
export function isBackgroundsRolePath(src: string): boolean {
  if (!src) return false;
  return (
    src.startsWith("/assets/videos/backgrounds/") &&
    !src.includes("hero-bg") &&
    !src.includes("/client/") &&
    !src.includes("/masters/")
  );
}
