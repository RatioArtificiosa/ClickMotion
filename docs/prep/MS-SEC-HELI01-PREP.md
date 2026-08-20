# MS-SEC-HELI01 HELIX — production prep

**Status:** **PLATINUM SECOND REVISION PASS** (2026-08-15) · backend / pack / registries · **public visuals waived** (operator: frontend already perfect)  
**Type:** Carousel / gallery mid-page section  
**Mode:** No Scroller (pin-until-complete) · WebGL helix · **no background film** · **not PSAVE**

Operator named No Scroller on Helix. Tall ScrollTrigger pin + Lenis scrub removed. Earn stays 3 vh mobile / 5 vh desktop. Pin freeing: page owns until dock (same gold as Elyse / Mirage / Folio). Art / helix math / titles / storefront clips unchanged. Do not recapture. Do not add PSAVE. **PaidSalt `t2v8c6` is on the live files.** Never ship or audit the unsalted name `Helix-package-h3l1x9k2m7p4.pdf`. Platinum backend closed leftover `gsap-register.ts` / `SmoothScroll.tsx` in cleanroom.

## SKU header

```text
Product ID:        MS-SEC-HELI01
Title / short:     Helix · Helical design gallery carousel section
Type:              section
Price tier:        pro (paid · PaidSalt t2v8c6)
Interaction mode:  No Scroller (pin-until-complete) · not PSAVE
UI reference:      editorial Dribbble showcase x Swiss gray board
Differentiator:    BOTH-SIDE? No. Nine cards on a cylindrical helix + crossing titles
Operator:          feel lock "It is perfect."
Date:              2026-08-15
Cleanroom route:   /demo/cleanroom-helix
Product folder:    public/packages/MS-SEC-HELI01/files/
Files zip path:    /packages/MS-SEC-HELI01/Helix-files-h3l1x9k2m7p4-t2v8c6.zip
Package PDF path:  /packages/MS-SEC-HELI01/Helix-package-h3l1x9k2m7p4-t2v8c6.pdf
OpaqueId:          h3l1x9k2m7p4
PaidSalt:          t2v8c6
Version:           2.2.0
```

## Paths

| Role | Path |
|------|------|
| Cleanroom | `cleanroom/helix-from-prompt/` |
| Demo | `/demo/cleanroom-helix` |
| Prompt | `content/prompts/sections/MS-SEC-HELI01.mdx` |
| Client media | `/assets/images/orbit/orbit-01.jpg` … `orbit-09.jpg` |
| Storefront page | `/assets/videos/helix-gallery-preview-v1.mp4` (~28s, 1440×900) |
| Storefront FS | `/assets/videos/helix-gallery-preview-fs-v1.mp4` (~28s, 1920×1080) |
| Poster / thumb | `/assets/posters/helix-gallery-preview-v1.webp` · `/thumbnails/MS-SEC-HELI01.webp` |
| Product folder | `public/packages/MS-SEC-HELI01/files/` |
| Files zip | `/packages/MS-SEC-HELI01/Helix-files-h3l1x9k2m7p4-t2v8c6.zip` |
| Package PDF | `/packages/MS-SEC-HELI01/Helix-package-h3l1x9k2m7p4-t2v8c6.pdf` |
| Backgrounds page | **N/A** (do not add) |

## Interaction law (locked — 2026-08-15)

| Law | Helix live |
|-----|------------|
| Method | No Scroller = pin-until-complete. **Not PSAVE.** |
| Pin | `100dvh` stage in flow. No 3/5 vh document spacer. No GSAP. No Lenis. |
| Earn | 5 vh desktop / 3 vh mobile. Two 1800px desktop flicks = 0.8. **Locked.** |
| Art | Crossing titles (peak 0.18), lockup fade 0.55, helix P = g / (400/600) |
| Release | g=0+up or g=1+down. Next sibling may scroll in. Demo has `#helix-after`. |
| Pin freeing | After g=1+down, **page owns** until stage docks (`top >= -2`). Pointer on next sibling never drives the helix. |
| PaidSalt | **Pro.** Live names: `Helix-package-h3l1x9k2m7p4-t2v8c6.pdf` + `Helix-files-h3l1x9k2m7p4-t2v8c6.zip`. Auditor must expect salt. |
| Demo | `/demo/cleanroom-helix` · `data-helix-drive="pin"` · `__msScrollNarrative.productId = MS-SEC-HELI01` |
| Storefront | leave as-is. No recapture. No GOP 3. |
| Sold prompt / BUYER / PDF / zip | **v2.2.0** Platinum backend 2026-08-15. Product folder + files zip + PDF + CMS. |

## Capture

```bash
node scripts/capture-helix-preview.mjs
# drives window.__msScrollNarrative.setProgress
```

Do **not** recapture unless asked. Storefront is a forward shop clip (no GOP 3).

## Recreate PDF / CMS / zip

```bash
python scripts/generate-product-package-pdf.py MS-SEC-HELI01
node scripts/cms-upsert-helix.cjs
```

Rebuild the zip from `public/packages/MS-SEC-HELI01/files/` (root = START-HERE, no nested files/).

Platinum backend artifacts (2026-08-15), same salted names:

| Artifact | Bytes | SHA-256 |
|----------|------:|---------|
| `Helix-files-h3l1x9k2m7p4-t2v8c6.zip` | 887899 | `7a531ca137c03134be373849b94bc67da9145190da350d42134951339e8fc363` |
| `Helix-package-h3l1x9k2m7p4-t2v8c6.pdf` | 88856 | `8e2c6be4987c11c62d6a294d179a4668726480d3e692515199fa16d4e8e03b84` |

## Lab (isolated, non-storefront)

`Lab/design-in-motion/` remains the ORION-sourced experiment sandbox. Production lives in cleanroom + public paths above. Do not copy tall-track notes from lab into the ship.

### Residuals

- HELI-R1: Storefront captures are the old ScrollTrigger burn (**waived**; leave as-is).
- HELI-R2: Platinum Second Revision. **Closed 2026-08-15** (backend only; public visuals waived).
- HELI-R3: Lab/design-in-motion may still teach the old pin. Leave unless a lab is restaged.
- HELI-R4: PaidSalt on disk was never missing. Closed 2026-08-15: auditor + PREP + product-packages all expect `t2v8c6`.
- HELI-R5: Pin freeing (page owns until dock). Closed 2026-08-15.
- HELI-R6: Leftover cleanroom `gsap-register.ts` / `SmoothScroll.tsx`. Closed 2026-08-15 (deleted; not in pack).
- HELI-R7: Agent/AEO listed Helix as free. Closed 2026-08-15 (`llms.txt`, `llms-full.txt`, AEO, free-sync script).

## First production pass (2026-08-15)

```text
SHIP FOR SALE — MS-SEC-HELI01
[x] Opened PRODUCTION_READY_CHECKLIST.md and worked applicable phases
[x] Product folder exists: public/packages/MS-SEC-HELI01/files/ (START-HERE, PROMPT, CUSTOMIZATION, source, assets)
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

## Platinum Second Revision (2026-08-15)

```text
PLATINUM SECOND REVISION — MS-SEC-HELI01
Permission: yes (backend only; public visuals / frontend waived)
VERDICT: PASS
Fixes:
  - Deleted leftover cleanroom gsap-register.ts + SmoothScroll.tsx (banned method files)
  - Stripped buyer-source lab leaks (trionn / DribbleSection / hashed JS / pinType history)
  - Pack PROMPT densified to peer class (stack, font vars, slots, expected, a11y keys, footer)
  - Removed leftover "old scrub:true" teaching
  - START-HERE / BUYER / CUSTOMIZATION pin-freeing + mobile + ClickMotion footer
  - MDX v2.2.0: 5 width breakpoints, keyboard a11y, expected pin freeing
  - Reduced-motion still registers capture helper (no visual change)
  - PDF helix_spec: pageOwns capture, pin-freeing customize, page-owns closer
  - Buyer source comments: no em dashes
  - cms-upsert refuses leftover SmoothScroll/gsap-register and requires pack pin freeing
  - product-packages / owner-designs / ASSET_PIPELINE / HANDOFF platinum backend
  - Moved Helix out of free agent listings (llms.txt / llms-full.txt / AEO)
  - Removed Helix from sync-free-heroes-cms.mjs; script now refuses non-free MDX
  - Locked gold description + poster in MDX/upsert; sticky ban in upsert
  - Zip + PDF restaged (PaidSalt t2v8c6 names unchanged)
Smoke:
  demo / browse / zip / pdf / media 200
  download unauth 401
  audit-sale-ready ALL CHECKS PASSED
  pin 900=900 · two flicks g=0.8 y=0 · release owns true · first up keeps g=1
Residuals:
  HELI-R1 storefront recapture waived
  HELI-R3 lab/design-in-motion may still teach old pin (leave)
```
