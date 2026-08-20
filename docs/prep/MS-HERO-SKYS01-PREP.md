# MS-HERO-SKYS01 SKYSPIRES — production prep

**Status:** **PLATINUM SECOND REVISION PASS** (2026-08-16) · backend / pack / registries  
**Type:** Full-viewport design-studio sunrise hero  
**Mode:** Dual process = **PSAVE + No Scroller**

Clone `E:\website-tests\skyspires-clone` is **FROZEN**. Do not edit shipped clone files. HUD loops stay. Only the film is scroll-driven.

## SKU header

```text
Product ID:        MS-HERO-SKYS01
Title / short:     SkySpires · Sunrise scroll hero
Type:              hero
Price tier:        pro (PaidSalt sk5n2q)
Interaction mode:  Dual process: PSAVE + No Scroller
UI reference:      frozen SkySpires frost HUD x sunrise cinema
Differentiator:    Editorial frost + sunrise film (not Grok Bot ice, not Still mint)
Date:              2026-08-16
Cleanroom route:   /demo/cleanroom-skyspires
Product folder:    public/packages/MS-HERO-SKYS01/files/
Files zip path:    /packages/MS-HERO-SKYS01/SkySpires-files-s4y8p1r3sk7n-sk5n2q.zip
Package PDF path:  /packages/MS-HERO-SKYS01/SkySpires-package-s4y8p1r3sk7n-sk5n2q.pdf
OpaqueId:          s4y8p1r3sk7n
PaidSalt:          sk5n2q
Version:           2.1.0
```

## Interaction law

| Law | SkySpires live |
|-----|----------------|
| Method | Dual process = PSAVE + No Scroller |
| Pin | 100dvh stage. No tall spacer. No gsap. |
| Earn | 12 vh (25.04s even sunrise, 24fps) |
| Film | Whole movie. Forward 1.2x. Reverse 3-frame steps. |
| HUD | CTA 12.5s, dock sheen 6.4s, dock gold 12s, stats 10s, rings 2.8s stay |
| Glass | Do not retune .lg-fill / .lg-spec on dock, CTA, Log In, stats |
| Pin freeing | After last frame + down, page owns until dock |
| Storefront | Agent capture until operator Premiere. Do not use client HD as preview. |

## Recreate

```bash
python scripts/generate-product-package-pdf.py MS-HERO-SKYS01
node scripts/cms-upsert-skyspires.cjs
```

Gold description (179 chars, locked):

> A sunrise pin narrative where scroll aims a 25-second SkySpires film and the picture never jumps. Frost HUD stays alive. Fully customizable copy, tokens, and film for your studio.

## Residuals

- SS-01: video 25.04s ≠ CTA 12.5s. Human waived sync.
- SS-store: shop preview is a full-film 25.04s frame burn (`skyspires-preview-v1.mp4`, same file on gallery + product). Replace with operator Premiere WebM when handed (ASSET_PIPELINE §1A).
- Clone frozen. No Reopen. Do not edit `E:\website-tests\skyspires-clone` shipped files.

## Platinum Second Revision (2026-08-16)

```text
PLATINUM SECOND REVISION — MS-HERO-SKYS01
Date: 2026-08-16  Operator permission: [x] yes

A. PERMISSION & SCOPE
[x] Operator approved Platinum Second Revision
[x] SKU id / slug / opaque s4y8p1r3sk7n / PaidSalt sk5n2q
[x] Gold peers: Meridian PDF · Studio zip · Still PSAVE pack · Helix description

B. PACKAGE / FOLDER / ZIP / PDF
[x] files/ complete (START-HERE, PROMPT, CUSTOMIZATION, VIDEO_GEN, source, assets)
[x] Zip root = files contents (START-HERE.md at root)
[x] Zip rebuilt after pack densify; source hashes match cleanroom
[x] PDF regenerated
[x] No storefront *-preview* / thumbs inside zip
[x] Client assets hash-match public vault

C. MEDIA VAULT
[x] Page preview + FS + poster + thumb + client on disk
[x] Client not used as shop preview
[x] Agent capture until operator Premiere

D. REGISTRIES & CMS
[x] MDX v2.1.0; gold description locked
[x] CMS: pro / published / desc 179 / body 12046 / dual video / liveDemo
[x] product-packages.ts v2.1.0 + filesZip + checklist true
[x] owner-designs.ts flagship
[x] gallery-utils dual preview + DEMO_SLUG + SCROLL
[x] prep doc updated

E. DEMO / PRODUCT / DOWNLOAD
[x] /demo/cleanroom-skyspires 200
[x] /browse/skyspires-sunrise-scroll-hero 200
[x] Download API unauth 401
[x] Zip + PDF on disk

F. SOURCE QUALITY
[x] "use client"; no lab path leaks
[x] prefers-reduced-motion
[x] Cleanup on unmount
[x] Pin-until-complete; 12 vh; pin freeing
[x] PSAVE 24fps / GOP 3. No gsap. Glass lock.

G. STOREFRONT UX
[x] Description gold unchanged
[x] Shop player is storefront capture, not client HD

H. GOLD DENSITY
[x] Pack PROMPT Still-class (two clocks + rebuild algorithm + 12 checks)
[x] START-HERE / CUSTOMIZATION thicker than Studio
[x] Broken escaped source paths fixed
[x] estimatedTokens 17000; version 2.1.0

I. SMOKE
[x] Hash sync CLEAN
[x] audit-sale-ready.py ALL CHECKS PASSED
[x] MDX schema pass
[x] Zip namelist 9 files, START-HERE at root

J. VERDICT
[x] All CRITICAL/HIGH fixed
[x] Residuals durable below
VERDICT: PASS
```

Platinum zip sha256: `334e99745bb802d8441963684f926740cfd89cadbd9521e506bb1668eb55260c`

### Platinum residuals

- SKYS-R1: Shop preview remains agent capture until operator Premiere WebM.
- SKYS-R2: MDX body 13592 is thinner than Still 21901. Pack PROMPT is Still-class. Residual only if a later peer bar requires more MDX copy.
- SKYS-R3: Product page template does not render `liveDemoHref`. Site-wide. Demo remains at `/demo/cleanroom-skyspires`.
- SKYS-R4: Platinum Second Revision. **Closed 2026-08-16**.
