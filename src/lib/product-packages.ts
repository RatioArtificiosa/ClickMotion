/**
 * Client Product Package PDF registry (Admin → Product packages).
 * Law: docs/PRODUCT_PACKAGE.md · docs/ASSET_PIPELINE.md · docs/PRODUCTION_READY_CHECKLIST.md
 *
 * Filenames use opaque tokens so paths are not guessable from product slug alone:
 *   {Product}-package-{OpaqueId}[-{PaidSalt}].pdf
 * Storefront CTAs are unchanged. These PDFs are the buyer pack manuals.
 */

export type PackageStatus =
  | "draft"
  | "review"
  | "approved"
  | "golden-rule"
  | "missing";

export type ProductPackageEntry = {
  productId: string;
  brand: string;
  title: string;
  tier: "free" | "pro" | "starter" | "agency";
  /** Public URL path under /packages/… */
  pdfHref?: string;
  /** Repo-relative path for operators */
  pdfRepoPath?: string;
  /** Opaque package id (filename segment) */
  opaqueId?: string;
  /** Paid salt (paid tiers only) */
  paidSalt?: string;
  status: PackageStatus;
  version?: string;
  /** Brand placeholders still present in PDF (legacy; ClickMotion is locked) */
  brandPlaceholders: boolean;
  notes?: string;
  /** Client HD public path (buyer pack) */
  clientHd?: string;
  /** Storefront preview path */
  previewVideo?: string;
  thumbnail?: string;
  poster?: string;
  /**
   * Small /backgrounds library encode (role: backgrounds).
   * NEVER the same path as clientHd. Admin → Backgrounds mirrors catalog.
   */
  backgroundsPreview?: string;
  /** Publish media readiness (storefront + client + optional backgrounds tile) */
  checklist: {
    previewVideo: boolean;
    thumbnail: boolean;
    poster: boolean;
    clientHd: boolean;
    packagePdf: boolean;
    /** True when listed on /backgrounds with a small encode (or N/A if not listed) */
    backgroundsPreview?: boolean;
  };
};

/**
 * Operator index. Update when a package PDF is generated or approved.
 * Meridian remains the layout golden rule; filenames are always opaque.
 */
export const PRODUCT_PACKAGES: ProductPackageEntry[] = [
  {
    productId: "MS-HERO-MERI01",
    brand: "Meridian",
    title: "Scroll narrative private residences",
    tier: "pro",
    opaqueId: "p4ltcy7t4p0c",
    paidSalt: "pd1w65",
    pdfHref:
      "/packages/MS-HERO-MERI01/Meridian-package-p4ltcy7t4p0c-pd1w65.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-MERI01/Meridian-package-p4ltcy7t4p0c-pd1w65.pdf",
    status: "golden-rule",
    version: "1.1.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/sequence-01.mp4",
    previewVideo: "/assets/videos/meridian-scroll-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-MERI01.webp",
    poster: "/assets/posters/sequence-01.webp",
    backgroundsPreview:
      "/assets/videos/backgrounds/atlantic-residences-bg-v1.mp4",
    notes:
      "Golden-rule layout template for all packages. Paid listing. Opaque filename + PaidSalt. ClickMotion brand locked. Backgrounds: small encode only.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-AETH01",
    brand: "Aether",
    title: "Serene wellness meditation hero",
    tier: "free",
    opaqueId: "8rgb4zhx7zrd",
    pdfHref: "/packages/MS-HERO-AETH01/Aether-package-8rgb4zhx7zrd.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-AETH01/Aether-package-8rgb4zhx7zrd.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/aether-waves-web-v1.mp4",
    previewVideo: "/assets/videos/aether-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-AETH01.webp",
    poster: "/assets/posters/aether-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/aether-waves-bg-v1.mp4",
    notes:
      "Free listing · production ready. Client HD = waves web. Storefront = aether-preview. Backgrounds = small bg encode.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-VERT01",
    brand: "Vertex Security",
    title: "Brutalist cybersecurity scroll hero",
    tier: "free",
    opaqueId: "b352guxju0ic",
    pdfHref: "/packages/MS-HERO-VERT01/Vertex-package-b352guxju0ic.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-VERT01/Vertex-package-b352guxju0ic.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/vertex-globe-web-v1.mp4",
    previewVideo: "/assets/videos/vertex-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-VERT01.webp",
    poster: "/assets/posters/vertex-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/vertex-globe-bg-v1.mp4",
    notes:
      "Free listing · production ready. Client HD = globe web. Storefront = vertex-preview. Backgrounds = small bg encode.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-NEON01",
    brand: "Neon Forge",
    title: "Cyberpunk gaming studio hero",
    tier: "pro",
    opaqueId: "n7k2m9p4qx1w",
    paidSalt: "nf3k8a",
    pdfHref:
      "/packages/MS-HERO-NEON01/NeonForge-package-n7k2m9p4qx1w-nf3k8a.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-NEON01/NeonForge-package-n7k2m9p4qx1w-nf3k8a.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/neon-forge-city-v1.mp4",
    previewVideo: "/assets/videos/neon-forge-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-NEON01.webp",
    poster: "/assets/posters/neon-forge-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/neon-forge-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready. Client HD = neon-forge-city 60s. Storefront = burnt-UI neon-forge-preview (+ FS). Package opaque n7k2m9p4qx1w + PaidSalt nf3k8a. Backgrounds = small neon-forge-bg.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-LUMI01",
    brand: "Lumina Studios",
    title: "Cinematic film production hero",
    tier: "pro",
    opaqueId: "l8m4k2p9qx7w",
    paidSalt: "lm4k9a",
    pdfHref: "/packages/MS-HERO-LUMI01/Lumina-package-l8m4k2p9qx7w-lm4k9a.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-LUMI01/Lumina-package-l8m4k2p9qx7w-lm4k9a.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/lumina-dolly-v1.mp4",
    previewVideo: "/assets/videos/lumina-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-LUMI01.webp",
    poster: "/assets/posters/lumina-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/lumina-dolly-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready. Client HD = lumina-dolly 60s (Studio-Lot). Storefront = burnt-UI lumina-preview (+ FS). Package opaque l8m4k2p9qx7w + PaidSalt lm4k9a. Backgrounds = small lumina-dolly-bg.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-TERR01",
    brand: "Terra Nova",
    title: "Clean energy platform hero",
    tier: "pro",
    opaqueId: "t3r9n0v7qx2m",
    paidSalt: "tn5k2a",
    pdfHref: "/packages/MS-HERO-TERR01/TerraNova-package-t3r9n0v7qx2m-tn5k2a.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-TERR01/TerraNova-package-t3r9n0v7qx2m-tn5k2a.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/terra-aerial-v1.mp4",
    previewVideo: "/assets/videos/terra-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-TERR01.webp",
    poster: "/assets/posters/terra-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/terra-aerial-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready. Client HD = terra-aerial 60s (windyfarms). Storefront = burnt-UI terra-preview (+ FS). Package opaque t3r9n0v7qx2m + PaidSalt tn5k2a. Backgrounds = small terra-aerial-bg.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-APEX01",
    brand: "Apex Quantum",
    title: "Deep tech quantum platform hero",
    tier: "pro",
    opaqueId: "a9x4q7m2kp8w",
    paidSalt: "aq3n8k",
    pdfHref:
      "/packages/MS-HERO-APEX01/ApexQuantum-package-a9x4q7m2kp8w-aq3n8k.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-APEX01/ApexQuantum-package-a9x4q7m2kp8w-aq3n8k.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/apex-quantum-v1.mp4",
    previewVideo: "/assets/videos/apex-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-APEX01.webp",
    poster: "/assets/posters/apex-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/apex-quantum-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready. Client HD = apex-quantum 60s (crylabtower). Storefront = burnt-UI apex-preview (+ FS). Package opaque a9x4q7m2kp8w + PaidSalt aq3n8k. Backgrounds = small apex-quantum-bg.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-REVL01",
    brand: "Revel",
    title: "Scroll narrative fashion commerce hero",
    tier: "pro",
    opaqueId: "r7v3l9k2mx4q",
    paidSalt: "rv8n3p",
    pdfHref:
      "/packages/MS-HERO-REVL01/Revel-package-r7v3l9k2mx4q-rv8n3p.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-REVL01/Revel-package-r7v3l9k2mx4q-rv8n3p.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/revel-breakout-v1.mp4",
    previewVideo: "/assets/videos/revel-scroll-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-REVL01.webp",
    poster: "/assets/posters/revel-scroll-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/revel-breakout-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL (not Deepseek first-10). Client HD = revel-breakout 20s (Iphone-Breakout). Scroll scrub chapters. Storefront dual-preview + FS. Package opaque r7v3l9k2mx4q + PaidSalt rv8n3p. Backgrounds = small revel-breakout-bg. Light pearl fashion system.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-PRSM01",
    brand: "Prism",
    title: "Liquid glass multi-panel identity hero",
    tier: "pro",
    opaqueId: "p8r3sm7k2n4q",
    paidSalt: "pr5m2x",
    pdfHref:
      "/packages/MS-HERO-PRSM01/Prism-package-p8r3sm7k2n4q-pr5m2x.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-PRSM01/Prism-package-p8r3sm7k2n4q-pr5m2x.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/prism-faces-v1.mp4",
    previewVideo: "/assets/videos/prism-scroll-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-PRSM01.webp",
    poster: "/assets/posters/prism-scroll-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/prism-faces-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL artsy. Client HD = prism-faces ~48s (FacesFacesFaces). Scroll scrub + multi-size liquid glass panels both sides. Storefront dual-preview + FS. Package opaque p8r3sm7k2n4q + PaidSalt pr5m2x. Backgrounds = small prism-faces-bg.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-SEC-FOLI01",
    brand: "Folio",
    title: "Scroll pivot liquid glass decision section",
    tier: "pro",
    opaqueId: "f0l1o9x4k7m2",
    paidSalt: "fl8n3q",
    pdfHref:
      "/packages/MS-SEC-FOLI01/Folio-package-f0l1o9x4k7m2-fl8n3q.pdf",
    pdfRepoPath:
      "public/packages/MS-SEC-FOLI01/Folio-package-f0l1o9x4k7m2-fl8n3q.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/folio-blurry-v1.mp4",
    previewVideo: "/assets/videos/folio-scroll-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-SEC-FOLI01.webp",
    poster: "/assets/posters/folio-scroll-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/folio-blurry-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL mid-page section. Client HD = folio-blurry (Blurry Vision). Five dense glass decision panels, one-way scroll pivot. Storefront dual-preview + FS. Package opaque f0l1o9x4k7m2 + PaidSalt fl8n3q. Backgrounds = small folio-blurry-bg. Mode: loop film under glass + Framer pivot (not scrub hero).",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-MIRA01",
    brand: "Mirage",
    title: "Agency desert scroll glass hero",
    tier: "pro",
    opaqueId: "m1r4ge8k2n9x",
    paidSalt: "mg7k3p",
    pdfHref:
      "/packages/MS-HERO-MIRA01/Mirage-package-m1r4ge8k2n9x-mg7k3p.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-MIRA01/Mirage-package-m1r4ge8k2n9x-mg7k3p.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/mirage-desert-v1.mp4",
    previewVideo: "/assets/videos/mirage-scroll-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-MIRA01.webp",
    poster: "/assets/posters/mirage-scroll-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/mirage-desert-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL agency hero. Client HD = mirage-desert (DesertSurvivor). Five morphic M.A.C. glass cards, free-play film (not scrub), subject right. Storefront dual-preview + FS via FG+smooth-BG composite. Package opaque m1r4ge8k2n9x + PaidSalt mg7k3p. Backgrounds = small mirage-desert-bg.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-SABL01",
    brand: "Sable",
    title: "Holiday luxury fashion walk hero",
    tier: "pro",
    opaqueId: "s4b1e9k7m2x3",
    paidSalt: "sb8n4p",
    pdfHref:
      "/packages/MS-HERO-SABL01/Sable-package-s4b1e9k7m2x3-sb8n4p.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-SABL01/Sable-package-s4b1e9k7m2x3-sb8n4p.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/sable-winter-v1.mp4",
    previewVideo: "/assets/videos/sable-holiday-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-SABL01.webp",
    poster: "/assets/posters/sable-holiday-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/sable-winter-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL holiday fashion. Client HD = sable-winter full uncut walk. Sparse private-house type, free-play film (never scrub). Storefront dual-preview + FS via FG+full-film composite. Package opaque s4b1e9k7m2x3 + PaidSalt sb8n4p. Backgrounds = small sable-winter-bg.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-AXIO01",
    brand: "Axiom",
    title: "Fintech inverted markets hero",
    tier: "pro",
    opaqueId: "a9x10m7k3n2p",
    paidSalt: "ax8n4q",
    pdfHref:
      "/packages/MS-HERO-AXIO01/Axiom-package-a9x10m7k3n2p-ax8n4q.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-AXIO01/Axiom-package-a9x10m7k3n2p-ax8n4q.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/axiom-upside-v1.mp4",
    previewVideo: "/assets/videos/axiom-fintech-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-AXIO01.webp",
    poster: "/assets/posters/axiom-fintech-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/axiom-upside-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL institutional fintech. Client HD = axiom-upside full uncut inverted NYC. True-north horizon, free-play film (never scrub). Storefront dual-preview + FS via FG+full-film composite. Package opaque a9x10m7k3n2p + PaidSalt ax8n4q. Backgrounds = small axiom-upside-bg.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-ELYS01",
    brand: "Elyse",
    title: "Luxury wellness retreat scroll hero",
    tier: "pro",
    opaqueId: "e9l7s3e2k4m1",
    paidSalt: "el5n8q",
    pdfHref:
      "/packages/MS-HERO-ELYS01/Elyse-package-e9l7s3e2k4m1-el5n8q.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-ELYS01/Elyse-package-e9l7s3e2k4m1-el5n8q.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/elyse-nature-v1.mp4",
    previewVideo: "/assets/videos/elyse-scroll-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-ELYS01.webp",
    poster: "/assets/posters/elyse-scroll-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/elyse-nature-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL luxury wellness retreat. Client HD = elyse-nature sanctuary film. Four scroll chapters. Storefront dual-preview + FS via scroll scrub burn. Package opaque e9l7s3e2k4m1 + PaidSalt el5n8q. Backgrounds = small elyse-nature-bg. Mode: scroll-as-narrative.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-NEXU01",
    brand: "Nexus",
    title: "Enterprise intelligence layer hero",
    tier: "free",
    opaqueId: "n3xu9k2m7p4w",
    pdfHref: "/packages/MS-HERO-NEXU01/Nexus-package-n3xu9k2m7p4w.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-NEXU01/Nexus-package-n3xu9k2m7p4w.pdf",
    status: "approved",
    version: "2.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/nexus-neural-v1.mp4",
    previewVideo: "/assets/videos/nexus-enterprise-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-NEXU01.webp",
    poster: "/assets/posters/nexus-enterprise-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/nexus-neural-bg-v1.mp4",
    notes:
      "Free listing · sale-ready · ORIGINAL enterprise AI. Client HD = nexus-neural full uncut lattice. Path rail + sequential letter-melt headline. Storefront dual-preview + FS via FG+film composite. Package opaque n3xu9k2m7p4w (no PaidSalt). Backgrounds = small nexus-neural-bg. Mode: free-play full film (never scrub).",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-SEC-HELI01",
    brand: "Helix",
    title: "Helical design gallery carousel section",
    tier: "free",
    opaqueId: "h3l1x9k2m7p4",
    pdfHref: "/packages/MS-SEC-HELI01/Helix-package-h3l1x9k2m7p4.pdf",
    pdfRepoPath:
      "public/packages/MS-SEC-HELI01/Helix-package-h3l1x9k2m7p4.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/images/orbit/orbit-01.jpg",
    previewVideo: "/assets/videos/helix-gallery-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-SEC-HELI01.webp",
    poster: "/assets/posters/helix-gallery-preview-v1.webp",
    // No backgroundsPreview — no film contribution to /backgrounds
    notes:
      "Free listing · sale-ready · ORIGINAL mid-page gallery/carousel section. Client media = nine /assets/images/orbit JPGs (buyer-swappable). Storefront dual-preview + FS full UI capture. Package opaque h3l1x9k2m7p4 (no PaidSalt). Mode: scroll pin scrub WebGL helix. Fully customizable copy + cards. NOT on backgrounds page.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: false,
    },
  },
  {
    productId: "MS-HERO-ACTU01",
    brand: "Actually!",
    title: "Interactive product can hero",
    tier: "free",
    opaqueId: "a9ct7u4l2y1x",
    pdfHref: "/packages/MS-HERO-ACTU01/Actually-package-a9ct7u4l2y1x.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-ACTU01/Actually-package-a9ct7u4l2y1x.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/models/can.glb",
    previewVideo: "/assets/videos/actually-hero-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-ACTU01.webp",
    poster: "/assets/posters/actually-hero-preview-v1.webp",
    // No backgroundsPreview — 3D product stage, not film tile
    notes:
      "Free listing · sale-ready · ORIGINAL product can hero. Client media = can.glb + label PNGs + studio HDRI. Storefront dual-preview + FS full UI capture. Package opaque a9ct7u4l2y1x (no PaidSalt). Mode: scroll pin scrub + pointer window + grab. Fully customizable copy + mesh + labels. NOT on backgrounds page.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: false,
    },
  },
  {
    productId: "MS-SEC-LINE01",
    brand: "Lineup",
    title: "Product line scroll reveal section",
    tier: "free",
    opaqueId: "l7n3e9k2m4p8",
    pdfHref: "/packages/MS-SEC-LINE01/Lineup-package-l7n3e9k2m4p8.pdf",
    pdfRepoPath:
      "public/packages/MS-SEC-LINE01/Lineup-package-l7n3e9k2m4p8.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/models/can.glb",
    previewVideo: "/assets/videos/lineup-reveal-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-SEC-LINE01.webp",
    poster: "/assets/posters/lineup-reveal-preview-v1.webp",
    notes:
      "Free listing · sale-ready · ORIGINAL product lineup pin section. Client media = GLB + labels + HDRI (not film tile). Storefront dual previews = Premiere Can-Formulation (page 1440×900 + FS 1920×1080). Package opaque l7n3e9k2m4p8 (no PaidSalt). Mode: pin scrub + snap through N SKUs — PRODUCTS + SECTION_META data-driven expand/contract; labelPath/meshPath per SKU; full CUSTOMIZATION.md. NOT on /backgrounds.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: false,
    },
  },
  {
    productId: "MS-SEC-STUDIO01",
    brand: "Studio Sequence",
    title: "Camera pull-out billboard section",
    tier: "free",
    opaqueId: "s7u2d1o9q4x1",
    pdfHref: "/packages/MS-SEC-STUDIO01/Studio-package-s7u2d1o9q4x1.pdf",
    pdfRepoPath:
      "public/packages/MS-SEC-STUDIO01/Studio-package-s7u2d1o9q4x1.pdf",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/studio-surreal-v1.mp4",
    previewVideo: "/assets/videos/studio-sequence-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-SEC-STUDIO01.webp",
    poster: "/assets/posters/studio-sequence-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/studio-surreal-bg-v1.mp4",
    notes:
      "Free listing · ORIGINAL cinematic camera pull-out. Client HD = pure Surreal from Lab surreal.mp4 (no UI frames, full ~2m24s). Backgrounds tile = full-length small encode of pure film (never storefront UI). Dual previews = Premiere Small 1440×900 + FS 1920×1080 full length. Dynamic any-video via studio-data.ts. Package opaque s7u2d1o9q4x1 (no PaidSalt). Mode: pin scrub world-scale. CUSTOMIZATION.md.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      backgroundsPreview: true,
    },
  },
];

export function packageByProductId(
  id: string
): ProductPackageEntry | undefined {
  return PRODUCT_PACKAGES.find((p) => p.productId === id);
}

/** True when every publish checklist flag is set. */
export function isPackageSaleReady(p: ProductPackageEntry): boolean {
  const c = p.checklist;
  return (
    c.previewVideo &&
    c.thumbnail &&
    c.poster &&
    c.clientHd &&
    c.packagePdf &&
    Boolean(p.pdfHref)
  );
}
