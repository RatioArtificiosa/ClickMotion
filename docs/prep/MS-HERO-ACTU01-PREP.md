# MS-HERO-ACTU01 ACTUALLY — production prep

**Status:** **PLATINUM SECOND REVISION PASS** (2026-08-16) · backend / pack / registries · **public visuals waived**  
**Type:** Full-viewport product can hero  
**Mode:** No Scroller (pin-until-complete) · pointer window + 3D grab + formula reveal · **not PSAVE**

Operator named **No Scroller only**. Tall ScrollTrigger pin (`+=120%` + scrub) + Lenis / SmoothScroll removed. Earn **1.2 viewports** (same as old pin length). Pin freeing: page owns until dock. Pointer window and grab stay. Do not recapture. Do not add PSAVE. **PaidSalt `r5m4x9` is on the live files.**

## SKU header

```text
Product ID:        MS-HERO-ACTU01
Title / short:     Actually! · Interactive product can hero
Type:              hero
Price tier:        pro (paid · PaidSalt r5m4x9)
Interaction mode:  No Scroller (pin-until-complete) · not PSAVE
UI reference:      CPG tasting room x Swiss editorial x tactile 3D
Differentiator:    Pointer clip window + living vessel + formula reveal
Operator:          No Scroller only (first production 2026-08-16)
Date:              2026-08-16
Cleanroom route:   /demo/cleanroom-actually
Product folder:    public/packages/MS-HERO-ACTU01/files/
Files zip path:    /packages/MS-HERO-ACTU01/Actually-files-a9ct7u4l2y1x-r5m4x9.zip
Package PDF path:  /packages/MS-HERO-ACTU01/Actually-package-a9ct7u4l2y1x-r5m4x9.pdf
OpaqueId:          a9ct7u4l2y1x
PaidSalt:          r5m4x9
Version:           2.1.0
```

## Interaction law (locked — 2026-08-16)

| Law | Actually! live |
|-----|----------------|
| Method | No Scroller = pin-until-complete. **Not PSAVE.** |
| Pin | `100dvh` stage in flow. No 1.2 vh document spacer. No Lenis. No ScrollTrigger pin. |
| Earn | 1.2 vh (same as old `+=120%`). |
| Art | Pointer clip + lock blend + dolly + formula after g 0.58. gsap tweens only. |
| Release | g=0+up or g=1+down. Demo has `#actually-after`. |
| Pin freeing | After g=1+down, **page owns** until `top >= -2`. |
| Storefront | leave as-is. Keep mp4. No recapture. |

## Recreate PDF / CMS / zip

```bash
python scripts/generate-product-package-pdf.py MS-HERO-ACTU01
node scripts/cms-upsert-actually.cjs
```

Rebuild the zip from `public/packages/MS-HERO-ACTU01/files/` (root = START-HERE).

First production artifacts (2026-08-16), superseded:

| Artifact | Bytes | SHA-256 |
|----------|------:|---------|
| `Actually-files-a9ct7u4l2y1x-r5m4x9.zip` | 2263620 | `8aa45b4eb9cb9fc1fcc688e4ad3b4e537bf3d22008b0c07182fa05eee6060503` |
| `Actually-package-a9ct7u4l2y1x-r5m4x9.pdf` | 58309 | `b40f2cb4de6b1f5b8da9e9d1e3577ce09c8915fef269748e005fefd0d808f607` |

Platinum backend artifacts (2026-08-16), same salted names:

| Artifact | Bytes | SHA-256 |
|----------|------:|---------|
| `Actually-files-a9ct7u4l2y1x-r5m4x9.zip` | 2266825 | `9eba6fab8a01df73ca3e730a0527e66ab9d48fa140f375fbff43bb83cce2a56c` |
| `Actually-package-a9ct7u4l2y1x-r5m4x9.pdf` | 60402 | `c0ddfba5a4c149e86af26122ee166f5d3736787dac7907a8617df47ebdb647c2` |

## Platinum Second Revision (2026-08-16)

```text
PLATINUM SECOND REVISION — MS-HERO-ACTU01
Date: 2026-08-16  Operator permission: [x] yes

A. PERMISSION & SCOPE
[x] Operator approved Platinum Second Revision
[x] SKU id / slug / opaque a9ct7u4l2y1x / PaidSalt r5m4x9
[x] Gold peers: Meridian PDF · Studio zip · Lineup pack docs · Helix description

B. PACKAGE / FOLDER / ZIP / PDF
[x] files/ complete (START-HERE, PROMPT, CUSTOMIZATION, source, assets)
[x] Zip root = files contents (START-HERE.md at root; no nested files/; no ./)
[x] Zip rebuilt after source/docs fix; source hashes match cleanroom
[x] PDF regenerated (No Scroller + pin freeing + 1.2 vh)
[x] No storefront *-preview* / thumbs / secrets inside zip
[x] Client assets in zip (can.glb + labels + HDRI)

C. MEDIA VAULT
[x] Page preview + FS + poster + thumb on disk and HTTP 200
[x] Client media not confused with storefront captures
[x] Storefront left as-is (operator waive)

D. REGISTRIES & CMS
[x] MDX v2.1.0; gold description locked; Responsive / A11y present
[x] CMS: pro / published / desc 184 / body 13565 / dual video / liveDemo
[x] product-packages.ts v2.1.0 + filesZip + checklist true
[x] owner-designs.ts flagship
[x] gallery-utils dual preview + DEMO_SLUG + SCROLL set (hybrid)
[x] prep doc updated

E. DEMO / PRODUCT / DOWNLOAD
[x] /demo/cleanroom-actually 200
[x] /browse/actually-interactive-product-can-hero 200
[x] Download API unauth 401
[x] Zip + PDF HTTP 200

F. SOURCE QUALITY
[x] "use client"; no lab path leaks
[x] prefers-reduced-motion static pose
[x] Cleanup on unmount
[x] Pin-until-complete; virtual 1.2 vh; pin freeing documented
[x] Not PSAVE

G. STOREFRONT UX
[x] Description gold unchanged
[x] Storefront preview left as-is (waived)

H. GOLD DENSITY
[x] Pack PROMPT / START-HERE / CUSTOMIZATION now Lineup class
[x] BUYER_PROMPT rewritten (No Scroller + salted names)
[x] estimatedTokens 16000; version 2.1.0

I. SMOKE
[x] Hash sync cleanroom ↔ pack CLEAN
[x] HTTP matrix 200 / 200 / 200 / 200 / 200 / 401
[x] Zip namelist 20 files, START-HERE.md at root
[x] CMS body 13565

J. VERDICT
[x] All CRITICAL/HIGH fixed
[x] Residuals durable below
VERDICT: PASS
```

### Residuals

- ACTU-R1: Storefront `actually-hero-preview-v1.mp4` is the old pin burn (**waived**; leave as-is).
- ACTU-R2: Platinum Second Revision. **Closed 2026-08-16**.
- ACTU-R3: Loader overflow lock during the bone curtain (~2.2s) is existing art. Restores before pin listeners own the wheel.
- ACTU-R4: Lab notes may still teach the old GSAP pin. Leave unless a lab is restaged.
- ACTU-R5: Can3D still accepts unused `scrollTriggerEl` / `heroMotion` props. No ScrollTrigger import. Residual only if a future port reintroduces a pin.
