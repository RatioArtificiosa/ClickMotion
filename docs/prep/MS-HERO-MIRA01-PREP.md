# SKU prep — MS-HERO-MIRA01 · Mirage

**Gate:** [`PRODUCTION_READY_CHECKLIST.md`](../PRODUCTION_READY_CHECKLIST.md)  
**Morphic glass recipe:** [`MORPHIC-LIQUID-GLASS.md`](./MORPHIC-LIQUID-GLASS.md)  
**Status:** **SALE-READY** (target) · free-play film + scroll glass cards

---

## SKU header

```text
Product ID:        MS-HERO-MIRA01
Title / short:     Mirage · Agency desert scroll glass hero
Type:              hero
Price tier:        pro
Interaction mode:  hybrid — V free-play film + S scroll glass pivot (not scrub)
UI reference:      Triada/M.A.C. morphic glass × ad-agency editorial
Differentiator:    Left morphic cards + right desert subject free-play
                   NOT Folio section, NOT Prism both-side, NOT white frost
Operator:          ClickMotion
Date:              2026-08-09
Cleanroom route:   /demo/cleanroom-mirage
Package PDF path:  /packages/MS-HERO-MIRA01/Mirage-package-m1r4ge8k2n9x-mg7k3p.pdf
```

---

## Locked paths

| Role | Path |
|------|------|
| Client HD | `public/assets/videos/mirage-desert-v1.mp4` |
| Pure film poster | `public/assets/posters/mirage-desert-v1.webp` |
| Backgrounds small | `public/assets/videos/backgrounds/mirage-desert-bg-v1.mp4` |
| Storefront page | `public/assets/videos/mirage-scroll-preview-v1.mp4` |
| Storefront FS | `public/assets/videos/mirage-scroll-preview-fs-v1.mp4` |
| Storefront poster | `public/assets/posters/mirage-scroll-preview-v1.webp` |
| Thumbnail | `public/thumbnails/MS-HERO-MIRA01.webp` |
| Package PDF | `/packages/MS-HERO-MIRA01/Mirage-package-m1r4ge8k2n9x-mg7k3p.pdf` |

Opaque id: `m1r4ge8k2n9x` · PaidSalt: `mg7k3p`

---

## Storefront capture (dual-track)

Script: `scripts/capture-mirage-preview.mjs`

1. **FG track:** Playwright RGBA plates (nav, headline, glass cards, footer). Video hidden.
2. **Card curve:** continuous open → short face → dense close per sheet (no mid-stall, no handoff jump). Same law as Folio.
3. **BG track:** ffmpeg continuous loop of client HD under FG (no browser seek).
4. Outputs: page 1440×900 + FS 1920×1080 for **gallery / product page only**.

```bash
# server on :3004
node scripts/capture-mirage-preview.mjs
node scripts/encode-backgrounds-preview.mjs --only mirage-desert
python scripts/generate-product-package-pdf.py   # includes mirage_spec
```

---

## Checklist

- [x] Cleanroom component + morphic glass
- [x] Demo route `/demo/cleanroom-mirage`
- [x] Client HD locked (`mirage-desert-v1.mp4`)
- [x] Pure film poster (no UI burn)
- [x] MDX CMS published
- [x] product-packages / owner-designs / gallery-utils
- [x] backgrounds registry + encode job
- [x] Dual capture page + FS (FG + continuous BG composite)
- [x] Package PDF opaque+salt
- [x] audit-sale-ready entry green
