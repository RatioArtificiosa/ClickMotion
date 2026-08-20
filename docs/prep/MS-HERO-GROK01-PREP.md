# MS-HERO-GROK01 GROK BOT — production prep

**Status:** **PLATINUM SECOND REVISION PASS** (2026-08-16) · backend / pack / registries · **storefront visuals = operator Premiere files**  
**Type:** Full-viewport AI-agent Sphere scroll hero  
**Mode:** Dual process = **PSAVE + No Scroller** (pin-until-complete)

Operator named **PSAVE + No Scroller**. Whole Sphere film plays on scroll. HUD CSS loops stay. Storefront page + gallery use operator Premiere **GrokBot-VEGAS.webm** (full 63.76s, keep WebM). FS uses **GrokBot-VEGAS_FS.mp4** (full 63.76s 1080p). Do not recapture. Do not re-encode the page WebM to mp4. **PaidSalt `gk4n8x` is on the live files.**

## SKU header

```text
Product ID:        MS-HERO-GROK01
Title / short:     Grok Bot · Las Vegas Sphere scroll hero
Type:              hero
Price tier:        pro (paid · PaidSalt gk4n8x)
Interaction mode:  Dual process: PSAVE + No Scroller
UI reference:      official Grok Bot ice HUD x Sphere night cinema
Differentiator:    Long even Sphere film + living ice HUD (not Still cosmos, not Prism panels)
Operator:          Premiere GrokBot-VEGAS.webm + GrokBot-VEGAS_FS.mp4 (2026-08-16)
Date:              2026-08-16
Cleanroom route:   /demo/cleanroom-grokbot
Product folder:    public/packages/MS-HERO-GROK01/files/
Files zip path:    /packages/MS-HERO-GROK01/GrokBot-files-g7k0b8t4vg2n-gk4n8x.zip
Package PDF path:  /packages/MS-HERO-GROK01/GrokBot-package-g7k0b8t4vg2n-gk4n8x.pdf
OpaqueId:          g7k0b8t4vg2n
PaidSalt:          gk4n8x
Version:           2.0.0
```

## Interaction law (locked — 2026-08-16)

| Law | Grok Bot live |
|-----|---------------|
| Method | Dual process = PSAVE + No Scroller |
| Pin | `100dvh` stage in flow. No tall spacer. No gsap. |
| Earn | 12 vh (62.5s even Sphere). Not Elyse 3.6. |
| Film | Whole movie. Forward 1.2x. Reverse 3-frame steps at 25fps. |
| HUD | Sheen 12.5s, ice trip, marquee, orb stay looping |
| Release | picture at 0+up or 1+down. Demo has `#grokbot-after`. |
| Pin freeing | After last frame + down, **page owns** until `top >= -2`. |
| Storefront | page+gallery = `grokbot-preview-v1.webm` (GrokBot-VEGAS.webm, full). FS = `grokbot-preview-fs-v1.mp4` (GrokBot-VEGAS_FS.mp4, full). Never `grokbot-sphere-v1.mp4` as preview. |

## Recreate PDF / CMS / zip

```bash
python scripts/generate-product-package-pdf.py MS-HERO-GROK01
node scripts/cms-upsert-grokbot.cjs
```

Rebuild the zip from `public/packages/MS-HERO-GROK01/files/` (root = START-HERE).

First production artifacts (2026-08-16), superseded by Platinum:

| Artifact | Notes |
|----------|--------|
| `GrokBot-files-g7k0b8t4vg2n-gk4n8x.zip` | Zip root = START-HERE.md · client film + source |
| `GrokBot-package-g7k0b8t4vg2n-gk4n8x.pdf` | Meridian-density buyer manual |

Platinum backend artifacts (2026-08-16), same salted names:

| Artifact | Bytes | SHA-256 |
|----------|------:|---------|
| `GrokBot-files-g7k0b8t4vg2n-gk4n8x.zip` | 133373824 | `ce4c6669871ce443de1ec4945d31200b7ef5274c4f4b8b75b09959e76233a12d` |
| `GrokBot-package-g7k0b8t4vg2n-gk4n8x.pdf` | 88842 | (regenerated, no em dash) |

## Storefront media (operator files, do not recapture)

| Role | Vault path | Source |
|------|------------|--------|
| preview-page + gallery | `/assets/videos/grokbot-preview-v1.webm` | `C:\Users\Usuario\Documents\Adobe\Premiere Pro\23.0\GrokBot-VEGAS.webm` · 1440×900 · 63.76s · keep WebM |
| preview-fs | `/assets/videos/grokbot-preview-fs-v1.mp4` | `...\GrokBot-VEGAS_FS.mp4` · 1920×1080 · 63.76s |
| client HD | `/assets/videos/grokbot-sphere-v1.mp4` | GOP 3 PSAVE film · 62.52s · 127 MB |
| storefront poster/thumb | `/assets/posters/grokbot-preview-v1.webp` · `/thumbnails/MS-HERO-GROK01.webp` | Cut from operator WebM |
| client poster | `/assets/posters/grokbot-sphere-v1.webp` | Pure film still |

## First production pass (2026-08-16)

```text
SKU: MS-HERO-GROK01
Date: 2026-08-16
Operator: first production after Premiere GrokBot-VEGAS handoff

[x] Phase 0 Differentiation (ice HUD + Sphere film vs Still/Prism/Elyse)
[x] Phase 1 Prompt complete (Still-class PSAVE + token lock)
[x] Phase 2 Media vault (client locked, storefront = operator WebM+FS)
[x] Phase 3 Clean-room demo /demo/cleanroom-grokbot
[x] Phase 4 Visual QA (HUD matched 3120 earlier this session)
[x] Phase 5 Storefront = operator full WebM on page AND gallery
[x] Phase 6 Owner vault + live demo
[x] Phase 7 CMS published fields complete
[x] Phase 8 Package PDF
[x] Phase 8H Files zip
[x] Phase 9 Brand / nav unaffected
[x] Phase 11 Commerce / license (pro + PaidSalt + zip preferred)
[x] Phase 13 Platinum Second Revision PASS 2026-08-16
```

Gold description (190 chars, locked):

> A night-city pin narrative where scroll aims a Sphere-scale Grok Bot film and the picture never jumps. Ice glass HUD stays alive. Fully customizable copy, tokens, and film for your AI brand.

## Platinum Second Revision (2026-08-16)

```text
PLATINUM SECOND REVISION — MS-HERO-GROK01
Date: 2026-08-16  Operator permission: [x] yes

A. PERMISSION & SCOPE
[x] Operator approved Platinum Second Revision
[x] SKU id / slug / opaque g7k0b8t4vg2n / PaidSalt gk4n8x
[x] Gold peers: Meridian PDF · Studio zip · Still PSAVE pack · Helix description

B. PACKAGE / FOLDER / ZIP / PDF
[x] files/ complete (START-HERE, PROMPT, CUSTOMIZATION, VIDEO_GEN, source, assets)
[x] Zip root = files contents (START-HERE.md at root; no nested files/; no ./)
[x] Zip rebuilt after pack PROMPT densify; source hashes match cleanroom
[x] PDF regenerated
[x] No storefront *-preview* / thumbs / secrets inside zip
[x] Client assets in zip hash-match public vault

C. MEDIA VAULT
[x] Page preview + FS + poster + thumb on disk and HTTP 200
[x] Client media not confused with storefront captures
[x] Operator GrokBot-VEGAS.webm = page+gallery. GrokBot-VEGAS_FS.mp4 = FS

D. REGISTRIES & CMS
[x] MDX v2.1.0; gold description locked; Responsive / A11y present
[x] CMS: pro / published / desc 190 / dual video / liveDemo
[x] product-packages.ts v2.1.0 + filesZip + checklist true
[x] owner-designs.ts flagship
[x] gallery-utils dual preview + DEMO_SLUG + SCROLL set
[x] prep doc updated

E. DEMO / PRODUCT / DOWNLOAD
[x] /demo/cleanroom-grokbot 200
[x] /browse/grokbot-vegas-sphere-hero 200
[x] Download API unauth 401
[x] Zip + PDF + client film on disk

F. SOURCE QUALITY
[x] "use client"; no lab path leaks
[x] prefers-reduced-motion settled path
[x] Cleanup on unmount
[x] Pin-until-complete; virtual 12 vh; pin freeing documented
[x] PSAVE 25fps / GOP 3 / leftover dest. No gsap

G. STOREFRONT UX
[x] Description gold unchanged
[x] Shop player is operator WebM (not client Sphere film)

H. GOLD DENSITY
[x] Pack PROMPT densified to Still class (two clocks + rebuild algorithm + 12 checks)
[x] BUYER_PROMPT has salted names + operator filenames
[x] estimatedTokens 17000; version 2.1.0

I. SMOKE
[x] Hash sync cleanroom <-> pack CLEAN
[x] HTTP matrix recorded below
[x] Zip namelist 9 files, START-HERE.md at root

J. VERDICT
[x] All CRITICAL/HIGH fixed
[x] Residuals durable below
VERDICT: PASS
```

### Residuals

- GROK-R1: Demo `/demo/cleanroom-grokbot` correctly plays client GOP 3 film (no HUD burn). Shop uses operator Premiere WebM. Do not recapture.
- GROK-R2: Product page template does not render `liveDemoHref`. Site-wide, not SKU-specific. Demo remains at `/demo/cleanroom-grokbot`.
- GROK-R3: Platinum Second Revision. **Closed 2026-08-16**.
