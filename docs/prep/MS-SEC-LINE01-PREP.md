# MS-SEC-LINE01 LINEUP — production prep

**Status:** **PLATINUM SECOND REVISION PASS** (2026-08-16) · backend / pack / registries · **public visuals waived**  
**Type:** Mid-page product line reveal  
**Mode:** No Scroller (pin-until-complete) · 3D SKU snap · **not PSAVE**

Operator named **No Scroller only**. Tall ScrollTrigger pin (`+= N * 100vh` + snap) + Lenis / SmoothScroll removed. Earn **N viewports** (same as old pin length). Snap on lift. Pin freeing: page owns until dock. 3D cross-fade art unchanged. Do not recapture. Do not add PSAVE. **PaidSalt `q3n7w2` is on the live files.**

## SKU header

```text
Product ID:        MS-SEC-LINE01
Title / short:     Lineup · Product line scroll reveal section
Type:              section
Price tier:        pro (paid · PaidSalt q3n7w2)
Interaction mode:  No Scroller (pin-until-complete) · not PSAVE
UI reference:      CPG tasting room x Swiss editorial x quiet 3D
Differentiator:    Data-driven N SKUs, 3D vessel + copy, snap
Operator:          No Scroller only (first production 2026-08-16)
Date:              2026-08-16
Cleanroom route:   /demo/cleanroom-lineup
Product folder:    public/packages/MS-SEC-LINE01/files/
Files zip path:    /packages/MS-SEC-LINE01/Lineup-files-l7n3e9k2m4p8-q3n7w2.zip
Package PDF path:  /packages/MS-SEC-LINE01/Lineup-package-l7n3e9k2m4p8-q3n7w2.pdf
OpaqueId:          l7n3e9k2m4p8
PaidSalt:          q3n7w2
Version:           2.1.0
```

## Interaction law (locked — 2026-08-16)

| Law | Lineup live |
|-----|-------------|
| Method | No Scroller = pin-until-complete. **Not PSAVE.** |
| Pin | `100dvh` stage in flow. No N vh document spacer. No Lenis. No ScrollTrigger pin. |
| Earn | N vh (N = PRODUCTS.length). Default 3. |
| Art | SKU snap + 3D cross-fade + copy card. gsap tweens only. |
| Release | g=0+up or g=1+down. Demo has `#lineup-after`. |
| Pin freeing | After g=1+down, **page owns** until `top >= -2`. |
| Storefront | leave as-is. Keep WebM. No recapture. |

## Recreate PDF / CMS / zip

```bash
python scripts/generate-product-package-pdf.py MS-SEC-LINE01
node scripts/cms-upsert-lineup.cjs
```

Rebuild the zip from `public/packages/MS-SEC-LINE01/files/` (root = START-HERE).

Platinum backend artifacts (2026-08-16), same salted names:

| Artifact | Bytes | SHA-256 |
|----------|------:|---------|
| `Lineup-files-l7n3e9k2m4p8-q3n7w2.zip` | 2092390 | `8e035e9972d5f887883dab577ae1eb32a169ee426610709ae8c098922901f7de` |
| `Lineup-package-l7n3e9k2m4p8-q3n7w2.pdf` | 63435 | `c0fb54fa2ce2abf8e11d7bb1752d253413e3442765a569263dfe3c83327722c2` |

## Platinum Second Revision (2026-08-16)

```text
PLATINUM SECOND REVISION — MS-SEC-LINE01
Permission: yes (backend; storefront visuals left as-is)
VERDICT: PASS
Fixes:
  - Deleted leftover SmoothScroll.tsx, lenis-bridge.ts, gsap-register.ts
  - Stripped ScrollTrigger from Can3D
  - Pack PROMPT densified (design system + a11y)
  - MDX v2.1.0: Responsive, Accessibility, Performance, AI tools
  - Buyer source comments: no em dashes
  - cms-upsert locks 2.1.0, leftover ban, Can3D ST ban
  - Zip + PDF restaged (PaidSalt q3n7w2 names unchanged)
Smoke:
  demo / browse 200 · download 401
  pin 900=900 · two flicks g=1 y=0 · release owns true · first up keeps g=1
```

### Residuals

- LINE-R1: Storefront WebM is the old pin burn (**waived**; leave as-is).
- LINE-R2: Platinum Second Revision. **Closed 2026-08-16**.
- LINE-R3: Lab notes may still teach the old GSAP pin. Leave unless a lab is restaged.
- LINE-R4: Can3D `heroMotion` scroll-rot path is unused on Lineup. ST removed. Residual if Actually still imported the old hook from this file (it has its own hero).
