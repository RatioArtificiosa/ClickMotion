# MS-SEC-STUDIO01 STUDIO SEQUENCE — production prep

**Status:** **PLATINUM SECOND REVISION PASS** (2026-08-15) · backend / pack / registries · **public visuals waived** (operator: frontend already stay as they are)  
**Type:** Mid-page cinematic camera pull-out section  
**Mode:** No Scroller (pin-until-complete) · free-play billboard film · **not PSAVE**

Operator named **No Scroller only**. Tall ScrollTrigger pin (`+=280%` + `scrub: 1.15`) + Lenis / SmoothScroll removed. Earn **4 vh desktop / 3 mobile** (old 2.8vh + scrub 1.15 ≈ 3.22 effective; holdIn/holdOut use 84% of g → 4×0.84=3.36). Two 1800px flicks at 900 = **g=1.0**. Pin freeing: page owns until dock (same gold as Elyse / Mirage / Helix). Camera art unchanged (four-edge cover, holdIn 0.06 / holdOut 0.9, smootherstep). Film free-plays. Do not recapture. Do not add PSAVE. **PaidSalt `p8k2m1` is on the live files.**

## SKU header

```text
Product ID:        MS-SEC-STUDIO01
Title / short:     Studio Sequence · Camera pull-out billboard section
Type:              section
Price tier:        pro (paid · PaidSalt p8k2m1)
Interaction mode:  No Scroller (pin-until-complete) · not PSAVE
UI reference:      luxury outdoor advertising x film-title open x quiet city still
Differentiator:    World-scale pull-out from full-bleed film to living street board
Operator:          No Scroller only (first production 2026-08-15)
Date:              2026-08-15
Cleanroom route:   /demo/cleanroom-studio
Product folder:    public/packages/MS-SEC-STUDIO01/files/
Files zip path:    /packages/MS-SEC-STUDIO01/Studio-files-s7u2d1o9q4x1-p8k2m1.zip
Package PDF path:  /packages/MS-SEC-STUDIO01/Studio-package-s7u2d1o9q4x1-p8k2m1.pdf
OpaqueId:          s7u2d1o9q4x1
PaidSalt:          p8k2m1
Version:           2.1.0
```

## Paths

| Role | Path |
|------|------|
| Cleanroom | `cleanroom/studio-from-prompt/` |
| Demo | `/demo/cleanroom-studio` |
| Prompt | `content/prompts/sections/MS-SEC-STUDIO01.mdx` |
| Client HD | `/assets/videos/studio-surreal-v1.mp4` |
| Plate | `/assets/images/studio/ny.png` |
| Pack film / plate | `assets/billboard-film.mp4` + `assets/street-plate.png` |
| Backgrounds small | `/assets/videos/backgrounds/studio-surreal-bg-v1.mp4` |
| Storefront page | `/assets/videos/studio-sequence-preview-v1.webm` (keep WebM) |
| Storefront FS | `/assets/videos/studio-sequence-preview-fs-v1.mp4` |
| Poster / thumb | `/assets/posters/studio-sequence-preview-v1.webp` · `/thumbnails/MS-SEC-STUDIO01.webp` |
| Product folder | `public/packages/MS-SEC-STUDIO01/files/` |
| Files zip | `/packages/MS-SEC-STUDIO01/Studio-files-s7u2d1o9q4x1-p8k2m1.zip` |
| Package PDF | `/packages/MS-SEC-STUDIO01/Studio-package-s7u2d1o9q4x1-p8k2m1.pdf` |

## Interaction law (locked — 2026-08-15)

| Law | Studio live |
|-----|-------------|
| Method | No Scroller = pin-until-complete. **Not PSAVE.** Film free-plays. |
| Pin | `100dvh` stage in flow. No 3/4 vh document spacer. No GSAP. No Lenis. |
| Earn | 4 vh desktop / 3 vh mobile. Two 1800px desktop flicks = **1.0**. |
| Art | Four-edge cover scale · holdIn 0.06 · holdOut 0.9 · smootherstep. Film never seeks. |
| Release | g=0+up or g=1+down. Next sibling may scroll in. Demo has `#studio-after`. |
| Pin freeing | After g=1+down, **page owns** until stage docks (`top >= -2`). Pointer on next sibling never drives the camera. |
| PaidSalt | **Pro.** Live names: `Studio-package-s7u2d1o9q4x1-p8k2m1.pdf` + `Studio-files-s7u2d1o9q4x1-p8k2m1.zip`. |
| Demo | `/demo/cleanroom-studio` · `data-studio-drive="pin"` · `__msScrollNarrative.productId = MS-SEC-STUDIO01` |
| Storefront | leave as-is. Keep WebM. No recapture. No GOP 3. |
| Sold prompt / BUYER / PDF / zip | **v2.1.0** Platinum backend 2026-08-15. Product folder + files zip + PDF + CMS. |

## Capture

Do **not** recapture unless asked. Storefront page role is operator screenshot **WebM** (ASSET_PIPELINE §1A). Shop clip is a forward recording (no GOP 3).

## Recreate PDF / CMS / zip

```bash
python scripts/generate-product-package-pdf.py MS-SEC-STUDIO01
node scripts/cms-upsert-studio.cjs
```

Rebuild the zip from `public/packages/MS-SEC-STUDIO01/files/` (root = START-HERE, no nested files/).

## Platinum Second Revision (2026-08-15)

```text
PLATINUM SECOND REVISION — MS-SEC-STUDIO01
Permission: yes (backend only; public visuals / frontend waived)
VERDICT: PASS
Fixes:
  - Pack PROMPT densified (design system, four-edge cover, a11y keys, data-product)
  - MDX v2.1.0: tokens, anti-slop, two-flick confirm, reduced-motion capture
  - Engine: data-product + measure-fail no longer drops the section (resize recovers)
  - Buyer comments / README: no en dashes
  - BUYER_PROMPT: No Scroller + pin freeing + no gsap
  - studio_spec PDF: VIRTUAL_VIEWPORTS = 3 + data-product
  - Listed as Pro in llms.txt / llms-full.txt; AEO notes Studio is Pro
  - cms-upsert locks 2.1.0, data-product, pack design system, paid llms listing
  - product-packages / owner-designs / ASSET_PIPELINE / HANDOFF platinum backend
  - Zip + PDF restaged (PaidSalt p8k2m1 names unchanged)
Smoke:
  demo / browse / zip / pdf / webm 200
  download unauth 401
  audit-sale-ready ALL CHECKS PASSED
  pin 900=900 · two flicks g=1.0 y=0 · release owns true · first up keeps g=1
  data-product=MS-SEC-STUDIO01 · gold description on browse
```

Platinum backend artifacts (2026-08-15), same salted names:

| Artifact | Bytes | SHA-256 |
|----------|------:|---------|
| `Studio-files-s7u2d1o9q4x1-p8k2m1.zip` | 118287715 | `09f17be3c0d00b8385dbe4b940888033ae31de1962a4125d9f88a9189e2d3f01` |
| `Studio-package-s7u2d1o9q4x1-p8k2m1.pdf` | 82865 | `6ac87c1f14ee60a6078d3f12abb475762a240e745e5507a5c3c9dad0fc789963` |

### Residuals

- STU-R1: Storefront captures are the old ScrollTrigger burn (**waived**; leave as-is; keep WebM).
- STU-R2: Platinum Second Revision. **Closed 2026-08-15** (backend only; public visuals waived).
- STU-R3: `Lab/nothin` may still teach the old GSAP pin. Leave unless a lab is restaged.
- STU-R4: Pack `billboard-film.mp4` is the same 2:24.60 / 1920x1080 cinema at buyer bitrate (~6.4 Mbps / 116 MB), not vault HD (~15.8 Mbps / 286 MB). Intentional buyer copy. Do not swap vault HD into the zip.
- STU-R5: No `scripts/capture-studio-preview.mjs`. Do not add or run one unless the operator asks to recapture.

## First production pass (2026-08-15)

```text
SHIP FOR SALE — MS-SEC-STUDIO01
[x] Opened PRODUCTION_READY_CHECKLIST.md and worked applicable phases
[x] Product folder exists: public/packages/MS-SEC-STUDIO01/files/ (START-HERE, PROMPT, CUSTOMIZATION, source, assets)
[x] Files zip exists and root shows START-HERE (not nested under files/)
[x] Package PDF registered (flagship)
[x] product-packages.ts: filesZip + packagePdf checklist true only if files exist
[x] MDX + CMS priceTier agree; crown correct (pro)
[x] Storefront previews ≠ client media; nothing *-preview* in product folder/zip
[x] Get Full Prompt prefers zip when registered
[x] owner-designs + demo route for flagship
[x] Description bar unchanged gold
[x] No Scroller only; not PSAVE
[x] Platinum Second Revision (Phase 13) — backend only, public visuals waived
```
