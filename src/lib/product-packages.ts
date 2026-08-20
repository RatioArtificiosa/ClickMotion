/**
 * Client Product Package registry (Admin → Product packages).
 *
 * Ship path (mandatory): docs/SHIP_FOR_SALE.md → docs/PRODUCTION_READY_CHECKLIST.md
 * After first production post: docs/PLATINUM_SECOND_REVISION.md (Phase 13) — agent must tell
 * the operator first pass is finished, ask permission for Platinum Second Revision, then audit.
 * Law: docs/PRODUCT_PACKAGE.md (§10 product folder + files zip) · docs/ASSET_PIPELINE.md ·
 *      docs/PRODUCT_LAW.md
 *
 * Per product:
 *   public/packages/{productId}/files/                 — product folder (all rebuild files)
 *   {Product}-files-{OpaqueId}[-{PaidSalt}].zip        — zip of that folder (preferred download)
 *   {Product}-package-{OpaqueId}[-{PaidSalt}].pdf      — buyer manual
 *
 * Get Full Prompt API serves zip when filesZipHref + checklist.filesZip, else PDF.
 * Gold PDF: Meridian. Gold product folder/zip: Studio Sequence.
 * Storefront CTA label stays "Get Full Prompt". PaidSalt only on paid tiers; never storefront.
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
  /** Client HD public path (buyer pack film) */
  clientHd?: string;
  /**
   * Zip of rebuild files (PROMPT.md + source + plate + billboard film).
   * Prefer this for Get Full Prompt when present; PDF remains the manual.
   */
  filesZipHref?: string;
  filesZipRepoPath?: string;
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
    /** Zip pack of rebuild files (prompt + source + assets) */
    filesZip?: boolean;
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
    title: "Pin-until-complete scroll narrative private residences",
    tier: "pro",
    opaqueId: "p4ltcy7t4p0c",
    paidSalt: "pd1w65",
    pdfHref:
      "/packages/MS-HERO-MERI01/Meridian-package-p4ltcy7t4p0c-pd1w65.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-MERI01/Meridian-package-p4ltcy7t4p0c-pd1w65.pdf",
    filesZipHref:
      "/packages/MS-HERO-MERI01/Meridian-files-p4ltcy7t4p0c-pd1w65.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-MERI01/Meridian-files-p4ltcy7t4p0c-pd1w65.zip",
    status: "golden-rule",
    version: "1.2.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/sequence-01.mp4",
    previewVideo: "/assets/videos/meridian-scroll-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-MERI01.webp",
    poster: "/assets/posters/sequence-01.webp",
    backgroundsPreview:
      "/assets/videos/backgrounds/atlantic-residences-bg-v1.mp4",
    notes:
      "Golden-rule scroll native · pin-until-complete 2026-08-13 · Opaque p4ltcy7t4p0c · PaidSalt pd1w65. Virtual effort 3.2 viewports + scrub lag 0.45 (gold pace preserved). Client HD = sequence-01. Files zip + PDF. Demo /demo/scroll-narrative. Never tall multi-vh track.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
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
    version: "4.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/vertex-globe-web-v1.mp4",
    previewVideo: "/assets/videos/vertex-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-VERT01.webp",
    poster: "/assets/posters/vertex-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/vertex-globe-bg-v1.mp4",
    notes:
      "Free listing · Platinum Second Revision PASS 2026-08-14 (backend-only). PSAVE pin-until-complete (3.6 vh + 0.55 dest floor, 1.2x, 3-frame reverse, GOP 3 / 97 I). No footer band. Client HD = globe web. Storefront = vertex-preview (do not recapture). PDF-only. Backgrounds = small bg encode.",
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
    version: "1.3.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/revel-breakout-v1.mp4",
    previewVideo: "/assets/videos/revel-scroll-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-REVL01.webp",
    poster: "/assets/posters/revel-scroll-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/revel-breakout-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL (not Deepseek first-10). PSAVE (docs/PSAVE.md): 12 vh aim, 1.2x, 3-frame reverse, leftover dest + 0.55s dest floor on lift, GOP 3 client HD. Film is slow then a kick; halfway ~5-6 scrolls. Storefront dual-preview + FS. Package opaque r7v3l9k2mx4q + PaidSalt rv8n3p. Backgrounds = small revel-breakout-bg. Light pearl fashion system.",
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
    version: "2.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/prism-faces-v1.mp4",
    previewVideo: "/assets/videos/prism-scroll-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-PRSM01.webp",
    poster: "/assets/posters/prism-faces-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/prism-faces-bg-v1.mp4",
    filesZipHref:
      "/packages/MS-HERO-PRSM01/Prism-files-p8r3sm7k2n4q-pr5m2x.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-PRSM01/Prism-files-p8r3sm7k2n4q-pr5m2x.zip",
    notes:
      "Pro · Platinum Second Revision PASS 2026-08-15 (backend-only). PaidSalt pr5m2x · Opaque p8r3sm7k2n4q. Client HD = prism-faces-v1 47.63s GOP 3 ~126MB (381 I / 762 P / 0 B). Storefront page+browse: prism-scroll-preview-v1.mp4 (do not recapture). FS: prism-scroll-preview-fs-v1.mp4. Files zip + Meridian-density PDF. Dual process: PSAVE + No Scroller. Aim 12 vh · live 280 · coast/ease 0.55 · deadzone 32. 520vh / gsap scrub banned. Demo /demo/cleanroom-prism.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-SEC-FOLI01",
    brand: "Folio",
    title: "Pin-until-complete liquid glass decision section",
    tier: "pro",
    opaqueId: "f0l1o9x4k7m2",
    paidSalt: "fl8n3q",
    pdfHref:
      "/packages/MS-SEC-FOLI01/Folio-package-f0l1o9x4k7m2-fl8n3q.pdf",
    pdfRepoPath:
      "public/packages/MS-SEC-FOLI01/Folio-package-f0l1o9x4k7m2-fl8n3q.pdf",
    filesZipHref:
      "/packages/MS-SEC-FOLI01/Folio-files-f0l1o9x4k7m2-fl8n3q.zip",
    filesZipRepoPath:
      "public/packages/MS-SEC-FOLI01/Folio-files-f0l1o9x4k7m2-fl8n3q.zip",
    status: "approved",
    version: "1.2.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/folio-blurry-v1.mp4",
    previewVideo: "/assets/videos/folio-scroll-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-SEC-FOLI01.webp",
    poster: "/assets/posters/folio-scroll-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/folio-blurry-bg-v1.mp4",
    notes:
      "Pro · pin freeing 2026-08-15 · PaidSalt fl8n3q · Opaque f0l1o9x4k7m2. Client = folio-blurry-v1.mp4 free-play under glass. Virtual journey progress 0→1. Page owns until dock. Five dense glass panels, paper rotateX. Files zip + PDF. Demo /demo/cleanroom-folio (no overflow-hidden). Storefront leave as-is.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
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
    version: "2.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/mirage-desert-v1.mp4",
    previewVideo: "/assets/videos/mirage-scroll-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-MIRA01.webp",
    poster: "/assets/posters/mirage-desert-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/mirage-desert-bg-v1.mp4",
    filesZipHref:
      "/packages/MS-HERO-MIRA01/Mirage-files-m1r4ge8k2n9x-mg7k3p.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-MIRA01/Mirage-files-m1r4ge8k2n9x-mg7k3p.zip",
    notes:
      "Pro · Platinum Second Revision 2026-08-15 (backend; storefront visuals waived). PaidSalt mg7k3p · Opaque m1r4ge8k2n9x. Client HD = mirage-desert-v1.mp4 free-play (not PSAVE, no GOP 3). Storefront page+browse: mirage-scroll-preview-v1.mp4 (do not recapture). FS: mirage-scroll-preview-fs-v1.mp4. Product-page poster = pure film still. Files zip + Meridian-density PDF. No Scroller: pin-until-complete. Earn 5 x 1.55 vh. Pin freeing: page owns until dock. Not PSAVE. gsap / lenis / tall spacer banned. Demo /demo/cleanroom-mirage.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
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
    version: "1.1.6",
    brandPlaceholders: false,
    clientHd: "/assets/videos/elyse-nature-v1.mp4",
    previewVideo: "/assets/videos/elyse-scroll-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-ELYS01.webp",
    poster: "/assets/posters/elyse-scroll-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/elyse-nature-bg-v1.mp4",
    notes:
      "Paid listing · sale-ready · ORIGINAL luxury wellness retreat. PSAVE (docs/PSAVE.md): 3.6 vh aim 1:1, 1.2x forward, reverse every 3rd frame, leftover dest on lift, picture-gated release, page-owns runway, GOP 3 client HD. Four chapters call→return. Package opaque e9l7s3e2k4m1 + PaidSalt el5n8q. PDF-only pack.",
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
    tier: "pro",
    opaqueId: "h3l1x9k2m7p4",
    paidSalt: "t2v8c6",
    pdfHref: "/packages/MS-SEC-HELI01/Helix-package-h3l1x9k2m7p4-t2v8c6.pdf",
    pdfRepoPath:
      "public/packages/MS-SEC-HELI01/Helix-package-h3l1x9k2m7p4-t2v8c6.pdf",
    status: "approved",
    version: "2.2.0",
    brandPlaceholders: false,
    clientHd: "/assets/images/orbit/orbit-01.jpg",
    previewVideo: "/assets/videos/helix-gallery-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-SEC-HELI01.webp",
    poster: "/assets/posters/helix-gallery-preview-v1.webp",
    filesZipHref:
      "/packages/MS-SEC-HELI01/Helix-files-h3l1x9k2m7p4-t2v8c6.zip",
    filesZipRepoPath:
      "public/packages/MS-SEC-HELI01/Helix-files-h3l1x9k2m7p4-t2v8c6.zip",
    notes:
      "Pro · Platinum backend 2026-08-15 · pin freeing · PaidSalt t2v8c6 · Opaque h3l1x9k2m7p4. Client = nine orbit JPGs (no film). Storefront leave as-is. Files zip + PDF use the salted names (never Helix-package-h3l1x9k2m7p4.pdf). No Scroller: pin-until-complete. Earn 5 vh desktop / 3 mobile. Page owns until dock. Not PSAVE. No leftover SmoothScroll / gsap-register. Demo /demo/cleanroom-helix.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: false,
    },
  },
  {
    productId: "MS-HERO-ACTU01",
    brand: "Actually!",
    title: "Interactive product can hero",
    tier: "pro",
    opaqueId: "a9ct7u4l2y1x",
    paidSalt: "r5m4x9",
    pdfHref: "/packages/MS-HERO-ACTU01/Actually-package-a9ct7u4l2y1x-r5m4x9.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-ACTU01/Actually-package-a9ct7u4l2y1x-r5m4x9.pdf",
    status: "approved",
    version: "2.1.0",
    brandPlaceholders: false,
    clientHd: "/models/can.glb",
    previewVideo: "/assets/videos/actually-hero-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-ACTU01.webp",
    poster: "/assets/posters/actually-hero-preview-v1.webp",
    filesZipHref: "/packages/MS-HERO-ACTU01/Actually-files-a9ct7u4l2y1x-r5m4x9.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-ACTU01/Actually-files-a9ct7u4l2y1x-r5m4x9.zip",
    notes:
      "Pro · Platinum Second Revision 2026-08-16 (backend / pack). PaidSalt r5m4x9 · Opaque a9ct7u4l2y1x. Client = can.glb + labels + HDRI. Storefront actually-hero-preview-v1.mp4 (do not recapture). Files zip + PDF. No Scroller: pin-until-complete. Earn 1.2 vh. Pin freeing: page owns until dock. Not PSAVE. lenis / ScrollTrigger pin / tall spacer banned. Demo /demo/cleanroom-actually.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: false,
    },
  },
  {
    productId: "MS-SEC-LINE01",
    brand: "Lineup",
    title: "Product line scroll reveal section",
    tier: "pro",
    opaqueId: "l7n3e9k2m4p8",
    paidSalt: "q3n7w2",
    pdfHref: "/packages/MS-SEC-LINE01/Lineup-package-l7n3e9k2m4p8-q3n7w2.pdf",
    pdfRepoPath:
      "public/packages/MS-SEC-LINE01/Lineup-package-l7n3e9k2m4p8-q3n7w2.pdf",
    status: "approved",
    version: "2.1.0",
    brandPlaceholders: false,
    clientHd: "/models/can.glb",
    previewVideo: "/assets/videos/lineup-reveal-preview-v1.webm",
    thumbnail: "/thumbnails/MS-SEC-LINE01.webp",
    poster: "/assets/posters/lineup-reveal-preview-v1.webp",
    filesZipHref: "/packages/MS-SEC-LINE01/Lineup-files-l7n3e9k2m4p8-q3n7w2.zip",
    filesZipRepoPath:
      "public/packages/MS-SEC-LINE01/Lineup-files-l7n3e9k2m4p8-q3n7w2.zip",
    notes:
      "Pro · Platinum backend 2026-08-16 (public visuals waived). PaidSalt q3n7w2 · Opaque l7n3e9k2m4p8. Client = can.glb + labels + HDRI. Storefront page+browse: lineup-reveal-preview-v1.webm (keep WebM; do not recapture). FS: lineup-reveal-preview-fs-v1.mp4. Files zip + PDF. No Scroller: pin-until-complete. Earn N vh. Snap on lift. Pin freeing: page owns until dock. Not PSAVE. No leftover SmoothScroll / lenis-bridge / gsap-register. Demo /demo/cleanroom-lineup.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: false,
    },
  },
  {
    productId: "MS-SEC-STUDIO01",
    brand: "Studio Sequence",
    title: "Camera pull-out billboard section",
    tier: "pro",
    opaqueId: "s7u2d1o9q4x1",
    paidSalt: "p8k2m1",
    pdfHref: "/packages/MS-SEC-STUDIO01/Studio-package-s7u2d1o9q4x1-p8k2m1.pdf",
    pdfRepoPath:
      "public/packages/MS-SEC-STUDIO01/Studio-package-s7u2d1o9q4x1-p8k2m1.pdf",
    filesZipHref: "/packages/MS-SEC-STUDIO01/Studio-files-s7u2d1o9q4x1-p8k2m1.zip",
    filesZipRepoPath:
      "public/packages/MS-SEC-STUDIO01/Studio-files-s7u2d1o9q4x1-p8k2m1.zip",
    status: "approved",
    version: "2.1.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/studio-surreal-v1.mp4",
    previewVideo: "/assets/videos/studio-sequence-preview-v1.webm",
    thumbnail: "/thumbnails/MS-SEC-STUDIO01.webp",
    poster: "/assets/posters/studio-sequence-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/studio-surreal-bg-v1.mp4",
    notes:
      "Pro · Platinum backend 2026-08-15 (public visuals waived). PaidSalt p8k2m1 · Opaque s7u2d1o9q4x1. Client HD = studio-surreal-v1.mp4 free-play (not PSAVE, no GOP 3). Pack billboard-film.mp4 is the same 2:24.60 / 1920x1080 cinema at a buyer bitrate (not vault HD). Storefront page+browse: studio-sequence-preview-v1.webm (operator screenshot, keep WebM; do not recapture). FS: studio-sequence-preview-fs-v1.mp4. Files zip + Meridian-density PDF. No Scroller: pin-until-complete. Earn 4 vh desktop / 3 mobile. Pin freeing: page owns until dock. Not PSAVE. gsap / lenis / SmoothScroll / tall spacer banned. Demo /demo/cleanroom-studio.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-SEC-PHOB01",
    brand: "Phobia",
    title: "Cursor-fleeing forms section",
    tier: "pro",
    opaqueId: "p8h0b2a9k1m4",
    paidSalt: "f3n8k2",
    pdfHref: "/packages/MS-SEC-PHOB01/Phobia-package-p8h0b2a9k1m4-f3n8k2.pdf",
    pdfRepoPath:
      "public/packages/MS-SEC-PHOB01/Phobia-package-p8h0b2a9k1m4-f3n8k2.pdf",
    filesZipHref: "/packages/MS-SEC-PHOB01/Phobia-files-p8h0b2a9k1m4-f3n8k2.zip",
    filesZipRepoPath:
      "public/packages/MS-SEC-PHOB01/Phobia-files-p8h0b2a9k1m4-f3n8k2.zip",
    status: "approved",
    version: "1.0.1",
    brandPlaceholders: false,
    clientHd: "/assets/phobia/papier-froisse.webp",
    previewVideo: "/assets/videos/phobia-forms-preview-v1.webm",
    thumbnail: "/thumbnails/MS-SEC-PHOB01.webp",
    poster: "/assets/posters/phobia-forms-preview-v1.webp",
    notes:
      "Pro listing · ORIGINAL cursor-fleeing forms. Client = cutouts under /assets/phobia. Storefront dual previews = Phobia-Section-Small (page) + Phobia-Section (FS). Package opaque p8h0b2a9k1m4 + PaidSalt f3n8k2. Files zip rebuild pack. NOT on backgrounds. Mode: pointer flee + elastic return.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: false,
    },
  },
  {
    productId: "MS-SEC-DOPA01",
    brand: "Dopamine",
    title: "Complete fashion footer section",
    tier: "pro",
    opaqueId: "d0p4m1n38k2x",
    paidSalt: "f7t3r9",
    pdfHref: "/packages/MS-SEC-DOPA01/Dopamine-package-d0p4m1n38k2x-f7t3r9.pdf",
    pdfRepoPath:
      "public/packages/MS-SEC-DOPA01/Dopamine-package-d0p4m1n38k2x-f7t3r9.pdf",
    filesZipHref:
      "/packages/MS-SEC-DOPA01/Dopamine-files-d0p4m1n38k2x-f7t3r9.zip",
    filesZipRepoPath:
      "public/packages/MS-SEC-DOPA01/Dopamine-files-d0p4m1n38k2x-f7t3r9.zip",
    status: "approved",
    version: "1.0.1",
    brandPlaceholders: false,
    clientHd: "/assets/dopamine/Woman1.png",
    previewVideo: "/assets/videos/dopamine-footer-preview-v1.webm",
    thumbnail: "/thumbnails/MS-SEC-DOPA01.webp",
    poster: "/assets/posters/dopamine-footer-preview-v1.webp",
    notes:
      "Pro listing · ORIGINAL fashion footer · sale-ready r2. Client = /assets/dopamine (figure, masks, Lottie). Storefront page preview = Dopamine-Small-2 (Premiere); FS = Dopamine (unchanged). Package opaque d0p4m1n38k2x + PaidSalt f7t3r9. Files zip rebuild pack. NOT on backgrounds. Mode: scroll-enter scramble + Lottie + reduced-motion settle.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: false,
    },
  },
  {
    productId: "MS-HERO-ROAD01",
    brand: "Roadster",
    title: "Studio Drive scroll hero",
    tier: "pro",
    opaqueId: "r0ad8t3r5k2m",
    paidSalt: "rd7n4x",
    pdfHref:
      "/packages/MS-HERO-ROAD01/Roadster-package-r0ad8t3r5k2m-rd7n4x.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-ROAD01/Roadster-package-r0ad8t3r5k2m-rd7n4x.pdf",
    filesZipHref:
      "/packages/MS-HERO-ROAD01/Roadster-files-r0ad8t3r5k2m-rd7n4x.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-ROAD01/Roadster-files-r0ad8t3r5k2m-rd7n4x.zip",
    status: "approved",
    version: "2.1.0",
    brandPlaceholders: false,
    clientHd: "/assets/roadster/studio-drive.mp4",
    previewVideo: "/assets/videos/roadster-studio-drive-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-ROAD01.webp",
    poster: "/assets/posters/roadster-studio-drive-v1.webp",
    notes:
      "Pro · Platinum Second Revision 2026-08-16 (backend / pack). PaidSalt rd7n4x · Opaque r0ad8t3r5k2m. Client = studio-drive.mp4 + roadster.glb. Storefront roadster-studio-drive-preview-v1.mp4 (do not recapture). Files zip + PDF. No Scroller: pin-until-complete. Earn 13.3 vh. Pin freeing: page owns until dock. Not PSAVE. Film free-plays. gsap / ScrollTrigger pin / tall spacer banned. Demo /demo/cleanroom-roadster.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: false,
    },
  },
  {
    productId: "MS-HERO-GROK01",
    brand: "Grok Bot",
    title: "Las Vegas Sphere scroll hero",
    tier: "pro",
    opaqueId: "g7k0b8t4vg2n",
    paidSalt: "gk4n8x",
    pdfHref:
      "/packages/MS-HERO-GROK01/GrokBot-package-g7k0b8t4vg2n-gk4n8x.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-GROK01/GrokBot-package-g7k0b8t4vg2n-gk4n8x.pdf",
    filesZipHref:
      "/packages/MS-HERO-GROK01/GrokBot-files-g7k0b8t4vg2n-gk4n8x.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-GROK01/GrokBot-files-g7k0b8t4vg2n-gk4n8x.zip",
    status: "approved",
    version: "2.1.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/grokbot-sphere-v1.mp4",
    previewVideo: "/assets/videos/grokbot-preview-v1.webm",
    thumbnail: "/thumbnails/MS-HERO-GROK01.webp",
    poster: "/assets/posters/grokbot-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/grokbot-sphere-bg-v1.mp4",
    notes:
      "Pro · Platinum Second Revision 2026-08-16 (backend / pack). PaidSalt gk4n8x · Opaque g7k0b8t4vg2n. Client HD = grokbot-sphere-v1 62.52s GOP 3 ~127MB (521 I / 1042 P / 0 B). Storefront page+gallery: grokbot-preview-v1.webm = operator GrokBot-VEGAS.webm FULL 63.76s (keep WebM; same file on product page AND gallery). FS: grokbot-preview-fs-v1.mp4 = operator GrokBot-VEGAS_FS.mp4 FULL 63.76s 1080p. Files zip + Meridian-density PDF. Dual process: PSAVE + No Scroller. Aim 12 vh · live 280 · coast/ease 0.55 · deadzone 32. Demo /demo/cleanroom-grokbot.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-SKYS01",
    brand: "SkySpires",
    title: "Sunrise scroll hero",
    tier: "pro",
    opaqueId: "s4y8p1r3sk7n",
    paidSalt: "sk5n2q",
    pdfHref:
      "/packages/MS-HERO-SKYS01/SkySpires-package-s4y8p1r3sk7n-sk5n2q.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-SKYS01/SkySpires-package-s4y8p1r3sk7n-sk5n2q.pdf",
    filesZipHref:
      "/packages/MS-HERO-SKYS01/SkySpires-files-s4y8p1r3sk7n-sk5n2q.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-SKYS01/SkySpires-files-s4y8p1r3sk7n-sk5n2q.zip",
    status: "approved",
    version: "2.1.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/skyspires-sunrise-v1.mp4",
    previewVideo: "/assets/videos/skyspires-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-SKYS01.webp",
    poster: "/assets/posters/skyspires-preview-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/skyspires-sunrise-bg-v1.mp4",
    notes:
      "Pro · Platinum Second Revision 2026-08-16 (backend / pack). PaidSalt sk5n2q · Opaque s4y8p1r3sk7n. Client HD = skyspires-sunrise-v1 25.04s GOP 3 ~18MB (201 I / 400 P / 0 B). Storefront page+gallery: skyspires-preview-v1.mp4 (agent capture until operator Premiere). FS: skyspires-preview-fs-v1.mp4. Dual process: PSAVE + No Scroller. Aim 12 vh · 24fps · live 280 · coast/ease 0.55. HUD loops stay. Glass lock. Clone frozen. Demo /demo/cleanroom-skyspires.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-NOMA01",
    brand: "Nomad Travel",
    title: "Luxury travel platform hero",
    tier: "pro",
    opaqueId: "n0m4d7tr4v3l",
    paidSalt: "nm8k4p",
    pdfHref:
      "/packages/MS-HERO-NOMA01/NomadTravel-package-n0m4d7tr4v3l-nm8k4p.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-NOMA01/NomadTravel-package-n0m4d7tr4v3l-nm8k4p.pdf",
    filesZipHref:
      "/packages/MS-HERO-NOMA01/NomadTravel-files-n0m4d7tr4v3l-nm8k4p.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-NOMA01/NomadTravel-files-n0m4d7tr4v3l-nm8k4p.zip",
    status: "approved",
    version: "1.0.2",
    brandPlaceholders: false,
    clientHd: "/assets/videos/nomad-montage-v1.mp4",
    previewVideo: "/assets/videos/nomad-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-NOMA01.webp",
    poster: "/assets/posters/nomad-montage-v1.webp",
    notes:
      "Pro · Platinum Second Revision 2026-08-12 (wiring + pack density; no visual restyle) + Meridian-density package PDF regen. Client HD = nomad-montage ~30s. Storefront dual-preview + FS. Opaque n0m4d7tr4v3l + PaidSalt nm8k4p. Files zip rebuild pack complete. Mode: free-play film + soft entrance + desktop parallax. Never scrub.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-STIL01",
    brand: "STILL",
    title: "Mindfulness scroll narrative hero",
    tier: "pro",
    opaqueId: "s7i1l9m4ndf0",
    paidSalt: "sk3p8w",
    pdfHref:
      "/packages/MS-HERO-STIL01/Still-package-s7i1l9m4ndf0-sk3p8w.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-STIL01/Still-package-s7i1l9m4ndf0-sk3p8w.pdf",
    filesZipHref:
      "/packages/MS-HERO-STIL01/Still-files-s7i1l9m4ndf0-sk3p8w.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-STIL01/Still-files-s7i1l9m4ndf0-sk3p8w.zip",
    status: "approved",
    version: "2.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/still-cosmos-v1.mp4",
    previewVideo: "/assets/videos/still-preview-v1.webm",
    thumbnail: "/thumbnails/MS-HERO-STIL01.webp",
    poster: "/assets/posters/still-cosmos-v1.webp",
    notes:
      "Pro · Platinum Second Revision PASS 2026-08-15 (backend-only). PaidSalt sk3p8w · Opaque s7i1l9m4ndf0. Client HD = still-cosmos-v1 30s GOP 3 ~82MB. Storefront page+browse: still-preview-v1.webm (operator Premiere screenshot, keep WebM; never re-encode page role to mp4). FS: still-preview-fs-v1.mp4 OK. Files zip + Meridian-density PDF. Backgrounds: still-cosmos-bg-v1. Dual process: PSAVE + No Scroller. Aim 12 vh · live 280 · coast/ease 0.55 · deadzone 32. Hybrid / 960vh / gsap banned. Demo /demo/cleanroom-still.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-BLOM01",
    brand: "BLOOM",
    title: "Kids & teen girls yoga course hero",
    tier: "pro",
    opaqueId: "b1o0m7y0g4k2",
    paidSalt: "bm4k8p",
    pdfHref:
      "/packages/MS-HERO-BLOM01/Bloom-package-b1o0m7y0g4k2-bm4k8p.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-BLOM01/Bloom-package-b1o0m7y0g4k2-bm4k8p.pdf",
    filesZipHref:
      "/packages/MS-HERO-BLOM01/Bloom-files-b1o0m7y0g4k2-bm4k8p.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-BLOM01/Bloom-files-b1o0m7y0g4k2-bm4k8p.zip",
    status: "approved",
    version: "1.0.1",
    brandPlaceholders: false,
    clientHd: "/assets/videos/luna-yoga-v1.mp4",
    previewVideo: "/assets/videos/bloom-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-BLOM01.webp",
    poster: "/assets/posters/luna-yoga-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/luna-yoga-bg-v1.mp4",
    notes:
      "Pro · Platinum Second Revision PASS 2026-08-12 · PaidSalt bm4k8p · Opaque b1o0m7y0g4k2. Client HD = luna-yoga-v1 ~45s silent 1080p. Storefront dual-preview bloom-preview-v1 + bloom-preview-fs-v1 (visuals locked). Files zip densified PROMPT/CUSTOM + Meridian-density PDF. Backgrounds: luna-yoga-bg-v1. Mode: free-play class film + Kids/Teens path. Never scrub. Demo /demo/cleanroom-bloom.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-ACNE01",
    brand: "Acne Secret",
    title: "Private clear skin HVCO hero",
    tier: "pro",
    opaqueId: "a0cne7s3cr3t",
    paidSalt: "ac8k2n",
    pdfHref:
      "/packages/MS-HERO-ACNE01/AcneSecret-package-a0cne7s3cr3t-ac8k2n.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-ACNE01/AcneSecret-package-a0cne7s3cr3t-ac8k2n.pdf",
    filesZipHref:
      "/packages/MS-HERO-ACNE01/AcneSecret-files-a0cne7s3cr3t-ac8k2n.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-ACNE01/AcneSecret-files-a0cne7s3cr3t-ac8k2n.zip",
    status: "approved",
    version: "1.0.1",
    brandPlaceholders: false,
    clientHd: "/assets/videos/acne-secret-v1.webm",
    previewVideo: "/assets/videos/acne-secret-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-ACNE01.webp",
    poster: "/assets/posters/acne-secret-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/acne-secret-bg-v1.mp4",
    notes:
      "Pro · platinum 2026-08-13 · PaidSalt ac8k2n · Opaque a0cne7s3cr3t. Client = acne-secret-v1.webm ~45s. Storefront dual mp4 (15s cinema + scrubbed dock ease). Mode: cinema hold then HVCO dock, brand until email. Demo /demo/cleanroom-acne.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-VERV01",
    brand: "VERVE SOCIAL",
    title: "Creator social platform hero",
    tier: "pro",
    opaqueId: "v3rv3s0c1al",
    paidSalt: "vs7k2m",
    pdfHref:
      "/packages/MS-HERO-VERV01/VerveSocial-package-v3rv3s0c1al-vs7k2m.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-VERV01/VerveSocial-package-v3rv3s0c1al-vs7k2m.pdf",
    filesZipHref:
      "/packages/MS-HERO-VERV01/VerveSocial-files-v3rv3s0c1al-vs7k2m.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-VERV01/VerveSocial-files-v3rv3s0c1al-vs7k2m.zip",
    status: "approved",
    version: "1.0.1",
    brandPlaceholders: false,
    clientHd: "/assets/videos/verve-presence-v1.mp4",
    previewVideo: "/assets/videos/verve-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-VERV01.webp",
    poster: "/assets/posters/verve-presence-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/verve-presence-bg-v1.mp4",
    notes:
      "Pro · platinum 2026-08-13 · PaidSalt vs7k2m · Opaque v3rv3s0c1al. Client = verve-presence-v1.mp4 ~15s from operator Social.mp4. Storefront dual mp4 15s burns (page 1440x900 + FS 1920x1080) with frame-scrubbed marquee. Mode: free-play culture film + marquee + desktop parallax. Demo /demo/cleanroom-verve. Types hero + landing-page. Platinum Second Revision PASS.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-ORBI01",
    brand: "ORBIT FINANCE",
    title: "Trustworthy premium neobank hero",
    tier: "pro",
    opaqueId: "o4b1tv4ult",
    paidSalt: "ob7k3n",
    pdfHref:
      "/packages/MS-HERO-ORBI01/OrbitFinance-package-o4b1tv4ult-ob7k3n.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-ORBI01/OrbitFinance-package-o4b1tv4ult-ob7k3n.pdf",
    filesZipHref:
      "/packages/MS-HERO-ORBI01/OrbitFinance-files-o4b1tv4ult-ob7k3n.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-ORBI01/OrbitFinance-files-o4b1tv4ult-ob7k3n.zip",
    status: "approved",
    version: "1.0.0",
    brandPlaceholders: false,
    clientHd: "/assets/videos/orbit-vault-v1.mp4",
    previewVideo: "/assets/videos/orbit-preview-v1.mp4",
    thumbnail: "/thumbnails/MS-HERO-ORBI01.webp",
    poster: "/assets/posters/orbit-vault-v1.webp",
    backgroundsPreview: "/assets/videos/backgrounds/orbit-vault-bg-v1.mp4",
    notes:
      "Pro · platinum 2026-08-13 · PaidSalt ob7k3n · Opaque o4b1tv4ult. Client = orbit-vault-v1.mp4 ~15s from Premiere O-Finance_1.mp4. Storefront dual mp4 15s burns (page + FS) with ring scrub. Mode: free-play vault film + orbital ring + desktop parallax. Demo /demo/cleanroom-orbit. Types hero + landing-page. Platinum Second Revision PASS.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: true,
    },
  },
  {
    productId: "MS-HERO-ZERO01",
    brand: "Zero Energy",
    title: "3D range gallery",
    tier: "pro",
    opaqueId: "q8w3n6k2xm5r",
    paidSalt: "n4k8p2",
    pdfHref:
      "/packages/MS-HERO-ZERO01/ZeroEnergy-package-q8w3n6k2xm5r-n4k8p2.pdf",
    pdfRepoPath:
      "public/packages/MS-HERO-ZERO01/ZeroEnergy-package-q8w3n6k2xm5r-n4k8p2.pdf",
    filesZipHref:
      "/packages/MS-HERO-ZERO01/ZeroEnergy-files-q8w3n6k2xm5r-n4k8p2.zip",
    filesZipRepoPath:
      "public/packages/MS-HERO-ZERO01/ZeroEnergy-files-q8w3n6k2xm5r-n4k8p2.zip",
    status: "approved",
    version: "1.0.1",
    brandPlaceholders: false,
    clientHd: "/assets/zero-energy/webgl/can.glb",
    previewVideo: "/assets/videos/zero-energy-preview-v1.webm",
    thumbnail: "/thumbnails/MS-HERO-ZERO01.webp",
    poster: "/assets/posters/zero-energy-preview-v1.webp",
    notes:
      "Pro · platinum 2026-08-13 · PaidSalt n4k8p2 · Opaque q8w3n6k2xm5r. Client = 3D pack (can.glb + six labels + HDRI), not a film. Storefront: operator WebM page/gallery keep WebM + FS mp4. No /backgrounds tile. Mode: Lenis pin-until-complete + raw Three 0.161 carousel. Demo /demo/cleanroom-zero. Types hero + landing-page. Platinum Second Revision PASS.",
    checklist: {
      previewVideo: true,
      thumbnail: true,
      poster: true,
      clientHd: true,
      packagePdf: true,
      filesZip: true,
      backgroundsPreview: false,
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
  const zipRequired = Boolean(p.filesZipHref || c.filesZip);
  const zipOk = !zipRequired || Boolean(p.filesZipHref && c.filesZip);
  return (
    c.previewVideo &&
    c.thumbnail &&
    c.poster &&
    c.clientHd &&
    c.packagePdf &&
    Boolean(p.pdfHref) &&
    zipOk
  );
}
