# MS-HERO-ROAD01 ROADSTER — production prep

**Status:** **PLATINUM SECOND REVISION PASS** (2026-08-16) · backend / pack / registries · **public visuals waived**  
**Type:** Full-viewport studio-drive hero  
**Mode:** No Scroller (pin-until-complete) · loop film + enter-hold-exit cards + pull-up sheet + Y-spin GLB · **not PSAVE**

Operator named **No Scroller only**. Tall ScrollTrigger track (`1200vh + 130vh` + scrub) removed. Earn **13.3 viewports** (same as old runway). Pin freeing: page owns until dock. Film still free-plays. Cards and sheet art stay. Do not recapture. Do not add PSAVE. **PaidSalt `rd7n4x` is on the live files.**

## SKU header

```text
Product ID:        MS-HERO-ROAD01
Title / short:     Roadster · Studio Drive scroll hero
Type:              hero
Price tier:        pro (paid · PaidSalt rd7n4x)
Interaction mode:  No Scroller (pin-until-complete) · not PSAVE
UI reference:      vehicle unveil x catalog stills x product-page density
Differentiator:    Loop film + cards + pull-up sheet + Y-spin GLB
Operator:          No Scroller only (first production 2026-08-16)
Date:              2026-08-16
Cleanroom route:   /demo/cleanroom-roadster
Product folder:    public/packages/MS-HERO-ROAD01/files/
Files zip path:    /packages/MS-HERO-ROAD01/Roadster-files-r0ad8t3r5k2m-rd7n4x.zip
Package PDF path:  /packages/MS-HERO-ROAD01/Roadster-package-r0ad8t3r5k2m-rd7n4x.pdf
OpaqueId:          r0ad8t3r5k2m
PaidSalt:          rd7n4x
Version:           2.1.0
```

## Interaction law (locked — 2026-08-16)

| Law | Roadster live |
|-----|---------------|
| Method | No Scroller = pin-until-complete. **Not PSAVE.** |
| Pin | `100dvh` stage in flow. No 13.3 vh document spacer. No gsap. No ScrollTrigger pin. |
| Earn | 13.3 vh (12 panel + 1.3 sheet). Same as old 1330vh track. |
| Art | Enter-hold-exit cards, then sheet pull-up. Film free-plays. |
| Release | g=0+up or g=1+down. Demo has `#roadster-after`. |
| Pin freeing | After g=1+down, **page owns** until `top >= -2`. |
| Storefront | leave as-is. Keep mp4. No recapture. |

## Recreate PDF / CMS / zip

```bash
python scripts/generate-product-package-pdf.py MS-HERO-ROAD01
node scripts/cms-upsert-roadster.cjs
```

Rebuild the zip from `public/packages/MS-HERO-ROAD01/files/` (root = START-HERE).

First production artifacts (2026-08-16), superseded:

| Artifact | Bytes | SHA-256 |
|----------|------:|---------|
| `Roadster-files-r0ad8t3r5k2m-rd7n4x.zip` | 24277793 | `cabe7ef5ed6dbbda3167c89a2f3d4f50c9b70b6ba7c27ac15d9f6aa2d23f370c` |
| `Roadster-package-r0ad8t3r5k2m-rd7n4x.pdf` | 59927 | `4aaffdd8bfbb33f8a34079f50c12c61b67142a0854e92f3de85f29e0a0501990` |

Platinum backend artifacts (2026-08-16), same salted names:

| Artifact | Bytes | SHA-256 |
|----------|------:|---------|
| `Roadster-files-r0ad8t3r5k2m-rd7n4x.zip` | 24278030 | `dc4b48dcfa16edd9c2c0ff87f949b63ebc790dfa048217576eb9eed9c8087c95` |
| `Roadster-package-r0ad8t3r5k2m-rd7n4x.pdf` | 59927 | `209334d36d4b4cb171e9b69de63323bce414a70aa8cdec5a5b34cee2742e2f17` |

Sale-ready restage after reserve-click + schema lock (2026-08-16):

| Artifact | Bytes | SHA-256 |
|----------|------:|---------|
| `Roadster-files-r0ad8t3r5k2m-rd7n4x.zip` | 24278148 | `9839f357f29c01978c10fb2e8921d1db2a6ce8f417aa2e5a983adc05bedaaf2b` |

## Platinum Second Revision (2026-08-16)

```text
PLATINUM SECOND REVISION — MS-HERO-ROAD01
Date: 2026-08-16  Operator permission: [x] yes

A. PERMISSION & SCOPE
[x] Operator approved Platinum Second Revision
[x] SKU id / slug / opaque r0ad8t3r5k2m / PaidSalt rd7n4x
[x] Gold peers: Meridian PDF · Studio zip · Lineup pack docs · Helix description

B. PACKAGE / FOLDER / ZIP / PDF
[x] files/ complete (START-HERE, PROMPT, CUSTOMIZATION, source, assets)
[x] Zip root = files contents (START-HERE.md at root; no nested files/; no ./)
[x] Zip rebuilt after source/docs fix; source hashes match cleanroom
[x] PDF regenerated (No Scroller + pin freeing + 13.3 vh)
[x] No storefront *-preview* / thumbs / secrets inside zip
[x] Client assets in zip hash-match public vault (film + glb)

C. MEDIA VAULT
[x] Page preview + FS + poster + thumb on disk and HTTP 200
[x] Client media not confused with storefront captures
[x] Storefront left as-is (operator waive)

D. REGISTRIES & CMS
[x] MDX v2.1.0; gold description locked; Responsive / A11y present
[x] CMS: pro / published / desc 177 / body 10688 / dual video / liveDemo
[x] product-packages.ts v2.1.0 + filesZip + checklist true
[x] owner-designs.ts flagship
[x] gallery-utils dual preview + DEMO_SLUG + SCROLL set (hybrid)
[x] prep doc updated

E. DEMO / PRODUCT / DOWNLOAD
[x] /demo/cleanroom-roadster 200
[x] /browse/roadster-studio-drive-scroll 200
[x] Download API unauth 401
[x] Zip + PDF + client film HTTP 200

F. SOURCE QUALITY
[x] "use client"; no lab path leaks
[x] prefers-reduced-motion settled path
[x] Cleanup on unmount
[x] Pin-until-complete; virtual 13.3 vh; pin freeing documented
[x] Not PSAVE. No gsap in runtime
[x] Capture script now drives __msScrollNarrative (no recapture)

G. STOREFRONT UX
[x] Description gold unchanged
[x] Storefront preview left as-is (waived)

H. GOLD DENSITY
[x] Pack PROMPT has asset contract + FORBIDDEN (Studio class)
[x] BUYER_PROMPT added (No Scroller + salted names)
[x] estimatedTokens 17000; version 2.1.0

I. SMOKE
[x] Hash sync cleanroom ↔ pack CLEAN
[x] HTTP matrix 200 / 200 / 200 / 200 / 200 / 200 / 401
[x] Zip namelist 8 files, START-HERE.md at root
[x] CMS body 10688

J. VERDICT
[x] All CRITICAL/HIGH fixed
[x] Residuals durable below
VERDICT: PASS
```

### Residuals

- ROAD-R1: Storefront `roadster-studio-drive-preview-v1.mp4` is the old tall-track burn (**waived**; leave as-is).
- ROAD-R2: Platinum Second Revision. **Closed 2026-08-16**.
- ROAD-R3: Capture script now drives virtual progress. Do not recapture unless the operator asks.
- ROAD-R4: Lab `Lab/tesla-roadster` is mesh only. Leave unless a lab is restaged.
- ROAD-R5: MDX body 10688 is slightly thinner than Lineup 15273. Pack PROMPT is Studio-class. Residual only if a later peer bar requires more MDX copy.
- ROAD-R6: Product page template does not render `liveDemoHref`. Site-wide, not SKU-specific. Demo remains at `/demo/cleanroom-roadster`.

## Sale-ready gate (2026-08-16)

```text
SKU: MS-HERO-ROAD01
Date: 2026-08-16
Operator: sale-ready confirm after Platinum

[x] Phase 0 Differentiation
[x] Phase 1 Prompt complete (schema valid after sale-ready lock)
[x] Phase 2 Media vault (client locked, storefront separate)
[x] Phase 3 Clean-room demo
[x] Phase 4 Visual QA loop (art unchanged; drive is No Scroller)
[x] Phase 5 Storefront capture left as-is (waived)
[x] Phase 6 Owner vault + live demo
[x] Phase 7 CMS published fields complete
[x] Phase 8 Package PDF gold-standard
[x] Phase 8H Files zip
[x] Phase 9 Brand / nav unaffected
[x] Phase 10 audit-sale-ready.py ALL CHECKS PASSED (ROAD01 now in matrix)
[x] Phase 11 Commerce / license (pro + PaidSalt + zip preferred + 401 unauth)
[x] Phase 13 Platinum already PASS
[x] Spot-check: browse lists Roadster; product page gold desc + Get Full Prompt + video
```

Sale-ready extras fixed this pass:
- Reserve / Learn More no longer hash-scrolls the page. They drive g=1 on the pin.
- MDX schema: motionIntensity aggressive, technicalTag 3d-threejs, positionInPage top, videoBackgrounds []
- `scripts/audit-sale-ready.py` now includes MS-HERO-ROAD01

