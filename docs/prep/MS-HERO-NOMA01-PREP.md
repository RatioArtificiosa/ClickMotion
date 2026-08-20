# MS-HERO-NOMA01 — Nomad Travel ship prep

**Status:** Production first pass complete · **Platinum Second Revision PASS** · 2026-08-12  
**Product:** Nomad Travel — Luxury Travel Platform Hero  
**Lab / cleanroom:** `cleanroom/nomad-from-prompt`  
**Ship truth:** package `public/packages/MS-HERO-NOMA01` + MDX + CMS + registries  
**Law:** [`docs/SHIP_FOR_SALE.md`](../SHIP_FOR_SALE.md) · [`docs/PLATINUM_SECOND_REVISION.md`](../PLATINUM_SECOND_REVISION.md)

## Identity

| Field | Value |
|-------|--------|
| Product ID | `MS-HERO-NOMA01` |
| Slug | `nomad-travel-luxury-travel-platform-hero` |
| Opaque | `n0m4d7tr4v3l` |
| PaidSalt | `nm8k4p` |
| Tier | `pro` |
| Version | `1.0.2` |

## Media

| Role | Path | Status |
|------|------|--------|
| Master | `public/assets/videos/originals/nomad-montage-master-v1.mp4` | from `test videos/luxuryhotel.mp4` |
| Client HD | `/assets/videos/nomad-montage-v1.mp4` | ~30s · 1920×1080 · silent · dense keyframes |
| Poster | `/assets/posters/nomad-montage-v1.webp` | pure film |
| Page preview | `/assets/videos/nomad-preview-v1.mp4` | UI burn · 1× 14s recapture |
| FS preview | `/assets/videos/nomad-preview-fs-v1.mp4` | 1920×1080 · 1× 14s |
| Thumb | `/thumbnails/MS-HERO-NOMA01.webp` | |
| Backgrounds small | `/assets/videos/backgrounds/nomad-montage-bg-v1.mp4` | 640×360 |

## Package

- Folder: `public/packages/MS-HERO-NOMA01/files/`
- Zip: `NomadTravel-files-n0m4d7tr4v3l-nm8k4p.zip`
- PDF: `NomadTravel-package-n0m4d7tr4v3l-nm8k4p.pdf`
- Contents: START-HERE · PROMPT · CUSTOMIZATION · VIDEO_GEN · source · assets

## Demo

- Primary: `/demo/cleanroom-nomad`
- Browse: `/browse/nomad-travel-luxury-travel-platform-hero`

## First production pass (2026-08-11)

- [x] Cleanroom premium hero
- [x] Client HD encode from luxuryhotel.mp4
- [x] Poster + thumb + backgrounds small
- [x] Storefront dual capture (page + FS)
- [x] Package folder + zip + PDF
- [x] Registries + backgrounds catalog
- [x] CMS body sync (publish)

## Platinum Second Revision (2026-08-12) — operator yes

**Scope (operator-directed):** wiring + backend + admin + prompt/file packaging only. **No visual public restyle.**

### Fixed

- [x] Package START-HERE / PROMPT / CUSTOMIZATION raised to Studio/Phobia class
- [x] Buyer VIDEO_GEN: no AWAITING MASTER / operator scaffold; pack-relative restage steps
- [x] Source hash sync cleanroom ↔ package (`preload="auto"`)
- [x] MDX densified (v1.0.2): 5 breakpoints, ≥9 expected checks, 30s film duration, pack AI path
- [x] CMS upsert body + dual preview + liveDemo + videoBackgrounds
- [x] manifest.json preview path corrected to real storefront MP4
- [x] product-packages + owner-designs notes platinum-complete
- [x] Files zip rebuilt from `files/`
- [x] HTTP matrix: demo/browse/media/zip/pdf 200 · download unauth 401
- [x] Not in SCROLL_EXPERIENCE set (correct: free-play film)

### Residuals

- Optional future visual/UX polish deferred per operator (explicitly out of platinum non-visual scope)

### Package PDF (Meridian-density regen)

- [x] `nomad_spec()` densified to Meridian-class shared_design + video_gen + customize (2026-08-12)
- [x] Regenerated `NomadTravel-package-n0m4d7tr4v3l-nm8k4p.pdf` (~20 pages, client film URL inside every tool prompt)
- [x] Opaque path unchanged; product-packages / owner-designs already point at this file

### Verdict

**PASS** — wiring + pack + prompt rebuild path + Meridian-density buyer PDF.

## Mode notes

- Free-play film + Framer entrance + desktop GSAP parallax
- Never video scrub
- Warm espresso / terracotta / cream editorial system
