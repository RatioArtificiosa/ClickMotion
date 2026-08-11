# SKU prep — MS-HERO-AXIO01 · Axiom

**Gate:** [`PRODUCTION_READY_CHECKLIST.md`](../PRODUCTION_READY_CHECKLIST.md)  
**Status:** **SALE-READY** · free-play full film · institutional true-north fintech

---

## SKU header

```text
Product ID:        MS-HERO-AXIO01
Title / short:     Axiom · Fintech inverted markets hero
Type:              hero
Price tier:        pro
Interaction mode:  V free-play full film (not scrub) + short pin
UI reference:      Private bank film × institutional density × true-north horizon
Differentiator:    Inverted NYC film + fixed level TRUE NORTH horizon; order when markets flip
Operator:          ClickMotion
Date:              2026-08-09
Cleanroom route:   /demo/cleanroom-axiom
Package PDF path:  /packages/MS-HERO-AXIO01/Axiom-package-a9x10m7k3n2p-ax8n4q.pdf
```

---

## Locked paths

| Role | Path |
|------|------|
| Client HD | `public/assets/videos/axiom-upside-v1.mp4` |
| Pure film poster | `public/assets/posters/axiom-upside-v1.webp` |
| Backgrounds small | `public/assets/videos/backgrounds/axiom-upside-bg-v1.mp4` |
| Storefront page | `public/assets/videos/axiom-fintech-preview-v1.mp4` |
| Storefront FS | `public/assets/videos/axiom-fintech-preview-fs-v1.mp4` |
| Thumbnail | `public/thumbnails/MS-HERO-AXIO01.webp` |
| Package PDF | `/packages/MS-HERO-AXIO01/Axiom-package-a9x10m7k3n2p-ax8n4q.pdf` |

Opaque id: `a9x10m7k3n2p` · PaidSalt: `ax8n4q`

---

## Storefront capture

Script: `scripts/capture-axiom-preview.mjs`

1. FG: nav + horizon + copy + footer (transparent)
2. BG: continuous full client HD (entire inverted run, no seek)
3. Duration matches film (~10s)
4. Page 1440×900 + FS 1920×1080

```bash
node scripts/capture-axiom-preview.mjs
node scripts/encode-backgrounds-preview.mjs --only axiom-upside
python scripts/generate-product-package-pdf.py
```

---

## Checklist

- [x] Cleanroom component (no scaffold UI)
- [x] Demo route `/demo/cleanroom-axiom`
- [x] Client HD locked
- [x] Pure film poster
- [x] MDX published
- [x] Registries + CMS
- [x] Backgrounds encode job
- [x] Dual capture page + FS
- [x] Package PDF opaque+salt
- [x] audit-sale-ready
