# MS-HERO-MIRA01 MIRAGE — production prep

**Status:** **PLATINUM SECOND REVISION PASS** (2026-08-15) · backend / pack / registries · **public visuals waived** (operator: already perfect)  
**Type:** Full-viewport agency hero  
**Mode:** No Scroller (pin-until-complete) · free-play desert film + glass card pivot · **not PSAVE**

Operator feel lock: "Great. The work is perfect." Platinum ordered for everything except the public view visual part. Storefront clips not recaptured. Demo art / glass / film / card maps not restyled.

## SKU header

```text
Product ID:        MS-HERO-MIRA01
Title / short:     Mirage · Agency desert scroll glass hero
Type:              hero
Price tier:        pro (paid · PaidSalt mg7k3p)
Interaction mode:  No Scroller (pin-until-complete) · hybrid V free-play + S card pivot · not PSAVE
UI reference:      Triada / M.A.C. morphic glass x ad-agency editorial
Differentiator:    Left morphic cards + right desert subject free-play
                   NOT Folio section, NOT Prism PSAVE, NOT white frost
Operator:          feel lock + Platinum backend yes, visuals waived
Date:              2026-08-15
Cleanroom route:   /demo/cleanroom-mirage
Product folder:    public/packages/MS-HERO-MIRA01/files/
Files zip path:    /packages/MS-HERO-MIRA01/Mirage-files-m1r4ge8k2n9x-mg7k3p.zip
Package PDF path:  /packages/MS-HERO-MIRA01/Mirage-package-m1r4ge8k2n9x-mg7k3p.pdf
OpaqueId:          m1r4ge8k2n9x
PaidSalt:          mg7k3p
Version:           2.0.0
```

## Paths

| Role | Path |
|------|------|
| Cleanroom | `cleanroom/mirage-from-prompt/` |
| Demo | `/demo/cleanroom-mirage` |
| Prompt | `content/prompts/heroes/MS-HERO-MIRA01.mdx` |
| Client HD | `/assets/videos/mirage-desert-v1.mp4` |
| Pure film poster | `/assets/posters/mirage-desert-v1.webp` |
| Backgrounds small | `/assets/videos/backgrounds/mirage-desert-bg-v1.mp4` |
| Storefront page | `/assets/videos/mirage-scroll-preview-v1.mp4` |
| Storefront FS | `/assets/videos/mirage-scroll-preview-fs-v1.mp4` |
| Storefront poster | `/assets/posters/mirage-scroll-preview-v1.webp` |
| Thumbnail | `/thumbnails/MS-HERO-MIRA01.webp` |
| Product folder | `public/packages/MS-HERO-MIRA01/files/` |
| Files zip | `/packages/MS-HERO-MIRA01/Mirage-files-m1r4ge8k2n9x-mg7k3p.zip` |
| Package PDF | `/packages/MS-HERO-MIRA01/Mirage-package-m1r4ge8k2n9x-mg7k3p.pdf` |

## Interaction law (locked — 2026-08-15)

| Law | Mirage live |
|-----|-------------|
| Method | No Scroller = pin-until-complete. **Not PSAVE.** Film free-plays. |
| Pin | `100dvh` stage in flow. Stage `position: relative` (no leftover sticky). No GSAP. No Lenis. No `useScroll`. |
| Earn | `max(2.4, sheets × 1.55)` vh. Five sheets = 7.75. Two 1800px desktop flicks ≈ 0.516 (card 03). **Locked.** |
| Art | Morphic M.A.C. glass, rotateX +64 → 0 → −64, sheet 0 from ~0.38, object-position 72% center |
| Release | g=0+up or g=1+down. Next sibling may scroll in. Demo has `#mirage-after` (40dvh, demo only). |
| Pin freeing | After g=1+down, **page owns** until `stage.top >= -2`. Pointer on next sibling never drives cards. |
| Demo | `/demo/cleanroom-mirage` · `data-mirage-drive="pin"` · `data-mirage-owns` · `__msScrollNarrative.productId = MS-HERO-MIRA01` |
| Storefront | leave as-is. No recapture. No GOP 3. |
| Sold prompt / BUYER / PDF / zip | **v2.0.0** product folder + files zip + PDF + CMS. Platinum 2026-08-15 backend pass. |

## Capture

```bash
node scripts/capture-mirage-preview.mjs
# drives window.__msScrollNarrative.setProgress
```

Do **not** recapture unless asked. Storefront is a forward shop clip (no GOP 3).

## Recreate PDF / CMS / zip

```bash
python scripts/generate-product-package-pdf.py MS-HERO-MIRA01
node scripts/cms-upsert-mirage.cjs
```

Rebuild the zip from `public/packages/MS-HERO-MIRA01/files/` (root = START-HERE, no nested files/).

Platinum artifacts (2026-08-15):

| Artifact | Bytes | SHA-256 |
|----------|------:|---------|
| `Mirage-files-m1r4ge8k2n9x-mg7k3p.zip` | 121466879 | `9a7b7664f81b267c9fbd2f14493302814cf149e5439354eeb15f12a90c191a3b` |
| `Mirage-package-m1r4ge8k2n9x-mg7k3p.pdf` | 93038 | `d55aa7cf62b802336b868fdcdf914b5ed83e9871eb95b957ecd9665d18c273fc` |
| `source/MirageAgencyHero.tsx` | | `eb433fbec694d93b28a597835e64a373fdea85f97c18f51207d9347cba6bcb09` |

Zip root = `START-HERE.md`, `PROMPT.md`, `CUSTOMIZATION.md`, `source/MirageAgencyHero.tsx`, `assets/mirage-desert-v1.mp4`, `assets/mirage-desert-v1.webp`. No nested `files/`. No storefront `*-preview*`. Cleanroom source hash-matches pack source.

## Platinum Second Revision (2026-08-15)

```text
PLATINUM SECOND REVISION — MS-HERO-MIRA01
Permission: yes (backend only; public visuals waived)
VERDICT: PASS
Fixes:
  - Removed leftover position:sticky on the 100dvh stage (method only; look unchanged)
  - Stripped Folio/Triada operator leaks from buyer/cleanroom source header
  - isPackageSaleReady now requires filesZip when a zip is registered
  - audit-sale-ready: Mirage zip + CMS poster = desert still (matches live CMS)
  - product-packages poster aligned to CMS desert still
  - Admin packages subtitle mentions files zips
  - Zip rebuilt; CMS re-upserted; pin-freeing re-smoked
Smoke:
  demo 200 · browse 200 · zip HEAD 200 · pdf HEAD 200
  download unauth 401 · all media HEAD 200
  pin 900=900 · two flicks g=0.516 y=0 · film playing · stage position relative
  release + runway up: g stays 1, pageOwns true, y 360 → 40
Residuals:
  MIRA-R1 Storefront recapture waived (operator) — durable
  MIRA-R2 Folio / Helix pageOwns — CLOSED 2026-08-15 (gold pageOwns + pinDocked)
  MIRA-R3 audit-sale-ready — CLOSED 2026-08-15 (Helix salted PDF+zip, live CMS posters, desc cap 230)
```

## Residuals (durable)

| Residual | Status |
|----------|--------|
| Storefront recapture | **Waived.** Operator: public visuals already perfect. |
| PSAVE | **Not this SKU.** Film free-plays. |
| Folio / Helix pageOwns | **Closed 2026-08-15.** Both use pageOwns + pinDocked. |
| Description bar | **Unchanged** published gold (155 chars). |
| audit-sale-ready | **Closed 2026-08-15.** Helix PaidSalt `t2v8c6`, live CMS posters, desc cap 230. `ALL CHECKS PASSED`. |

## Morphic glass recipe

See [`MORPHIC-LIQUID-GLASS.md`](./MORPHIC-LIQUID-GLASS.md).
