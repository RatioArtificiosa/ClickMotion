# MS-HERO-ZERO01 — ZERO ENERGY ship prep

**Status:** **Platinum Second Revision PASS (Phase 13)** · 2026-08-13 · Helix description · 3D-pack PDF · reduced-motion · hash-sync green  
**Bar:** Ultra premium · private CPG tasting room (range, not one can)  
**Gate:** [`SHIP_FOR_SALE.md`](../SHIP_FOR_SALE.md) · [`PRODUCTION_READY_CHECKLIST.md`](../PRODUCTION_READY_CHECKLIST.md) · [`ASSET_PIPELINE.md`](../ASSET_PIPELINE.md) · [`PRODUCT_PACKAGE.md`](../PRODUCT_PACKAGE.md) §10  
**Frozen source:** `E:\website-tests\zero-energy-clone` — **do not edit**  
**Lab copy:** `Lab/zero-energy/` · Vite port **3071** (3070 taken by freeze)  
**Cleanroom:** `cleanroom/zero-energy-from-prompt/`  
**Demo:** `/demo/cleanroom-zero`  
**Product:** `/browse/zero-energy-3d-can-gallery`  
**Opaque / PaidSalt:** `q8w3n6k2xm5r` / `n4k8p2`  
**Files zip:** `/packages/MS-HERO-ZERO01/ZeroEnergy-files-q8w3n6k2xm5r-n4k8p2.zip`  
**Package PDF:** `/packages/MS-HERO-ZERO01/ZeroEnergy-package-q8w3n6k2xm5r-n4k8p2.pdf`

---

## SKU header

```text
Product ID:        MS-HERO-ZERO01
Title / short:     ZERO ENERGY - 3D Can Gallery
Type:              hero  (+ landing-page)
Price tier:        pro
Interaction mode:  hybrid 3D + Lenis infinite pin-until-complete
                   Lenis (infinite, autoRaf: false) seeks GSAP timeline
                   + raw Three 0.161 can carousel (grab / arrows / pager)
                   + HUD / SplitText / FAQ
                   NOT ScrollTrigger.scrub as the 3D clock
                   NOT tall multi-vh sticky track
UI reference:      Private CPG tasting room x editorial beverage launch
                   Frozen Zero Energy can-gallery (platinum exact)
                   NOT Actually one-can hero. NOT a photo slider.
Differentiator:    Six-flavor 3D object carousel. The range is the product.
                   Scroll then opens flavor, proof, and close.
Operator:          agent backend 2026-08-13
Date:              2026-08-13
Cleanroom route:   /demo/cleanroom-zero
Product folder:    public/packages/MS-HERO-ZERO01/files/
Files zip path:    /packages/MS-HERO-ZERO01/ZeroEnergy-files-q8w3n6k2xm5r-n4k8p2.zip
Package PDF path:  /packages/MS-HERO-ZERO01/ZeroEnergy-package-q8w3n6k2xm5r-n4k8p2.pdf
```

---

## Phase 0 — Slot & differentiation

- [x] **0.1** Intentional flagship: 3D range gallery (hero + landing page)
- [x] **0.2** ID `MS-HERO-ZERO01` · type hero · types include landing-page
- [x] **0.3** Differentiation: six-can range vs Actually one-can; Lenis clock vs ST.scrub
- [x] **0.4** Anti-samey: black tasting room + Franklin Gothic italic + raw Three carousel (not bone paper, not helix, not billboard)
- [x] **0.5** Mode honest: hybrid 3D + pin-until-complete scroll journey
- [x] **0.5a** Pin-until-complete mandatory. Fixed stage. Virtual Lenis progress. Not tall sticky track.
- [x] **0.6** UI reference: private tasting room / editorial beverage launch
- [x] **0.7** Authority: would a CPG launch designer ship a living range? Yes.
- [x] **0.8** Forbidden: Motionsites pill nav, purple mesh, R3F, Three bump, logo Z "fix", mailto/CDN/fetch

## Phase 1 — Sold prompt

- [x] **1A** Promise, who, signature (hand-turns range + pin journey), no aging infra notes
- [x] **1A.3a** Pin stage until journey complete, then release when embedded
- [x] **1B.1–1B.10** Design System, Layout, Content Slots, Motion, Media, Responsive, A11y, Perf, AI tools, Expected Output
- [x] **1B.4a** Motion spec states pin-until-complete + virtual progress
- [x] **1B.11** Body density ≥ 3.5–4K
- [x] **1B.12** Exact default copy strings in Content Slots
- [x] **1C** Frontmatter valid: styleTags `3d-immersive` (not `3d`); technicalTags `3d-threejs webgl text-split scroll-trigger`
- [x] **1C.12** Description 176 chars, Helix-class sales, no jargon, no em dash
- [x] **1C.14** previewVideo = storefront WebM; videoBackgrounds empty (3D pack); poster/thumb set
- [x] **1D** No em dash in sold prompt; buyer voice; self-contained
- [x] **1E** 40-pt applicable gates: pin law, SplitText stagger, reduced-motion, TS source, 5 BPs

## Phase 2 — Media vault

- [x] **2A** Roles split: operator WebM page · FS mp4 · 3D pack client · poster · thumb
- [x] **2A.6 / 2H** Backgrounds **N/A** (not a film tile). Do not list on `/backgrounds`.
- [x] **2B** Client = GLB + six labels + HDRI (Actually pattern). No storefront film as client.
- [x] **2C** Operator Premiere masters retained under `public/assets/videos/masters/` (full + small-1 archive)
- [x] **2D** Poster `zero-energy-preview-v1.webp` · thumb `MS-HERO-ZERO01.webp`
- [x] **2E.1b** Operator screenshot WebM kept for page + gallery (never re-encoded to mp4)
- [x] **2E.2** FS `zero-energy-preview-fs-v1.mp4` 1920x1080
- [x] **2G** MDX + CMS + owner-designs + product-packages + gallery-utils wired

## Phase 3–6 — Machine + storefront

- [x] **3** Cleanroom `cleanroom/zero-energy-from-prompt` · demo `/demo/cleanroom-zero`
- [x] **3.3** Cleanroom uses client 3D assets at `/assets/zero-energy/`, not storefront video
- [x] **3.4a** Fixed WebGL stage + Lenis virtual progress (pin law)
- [x] **4** Visual QA on Lab 3071 + Next demo (frontend pass)
- [x] **5B** Product page shell unchanged (PromptProductView law)
- [x] **5C** Gallery card loops operator WebM
- [x] **6** owner-designs status `flagship`

## Phase 7–11 — CMS, pack, commerce

- [x] **7** CMS upsert overwrites stale published draft body
- [x] **8** Product folder + zip + Meridian-layout PDF
- [x] **8D.4a** Pack PROMPT + source encode pin-until-complete
- [x] **8H** Studio-shaped folder: START-HERE, PROMPT, CUSTOMIZATION, source, assets
- [x] **8H.9** No `*-preview*` in folder/zip
- [x] **9** Site chrome unaffected
- [x] **10** validate:prompts / validate:assets / pack smoke
- [x] **11** `priceTier: pro` · PaidSalt on PDF + zip · crown honest · Get Full Prompt prefers zip

## Phase 12 — First production sign-off

```text
SKU: MS-HERO-ZERO01
Date: 2026-08-13
Operator: agent first production pass

[x] Phase 0 Differentiation
[x] Phase 1 Prompt complete + 40-pt quality
[x] Phase 2 Media vault (client 3D pack locked, storefront separate, registries)
[x] Phase 3 Clean-room demo
[x] Phase 4 Visual QA loop passed (prompt is source of truth)
[x] Phase 5 Storefront capture + product page law
[x] Phase 6 Owner vault + live demo
[x] Phase 7 CMS published fields complete
[x] Phase 8 Package PDF gold-standard (tools + no film-as-client)
[x] Phase 8H Files zip (rebuild flagship)
[x] Phase 9 Brand / nav if affected (N/A)
[x] Phase 10 Machine gates green
[x] Phase 11 Commerce / license
[x] Spot-check: gallery card loops operator WebM
[x] Spot-check: product page main ~960x540, muted
[x] Spot-check: client pack = 3D assets, not storefront preview
[x] Spot-check: package PDF + one tool prompt would let a non-coder succeed
[x] Spot-check: zip root has START-HERE.md
[x] Spot-check: zip assets are client rebuild media only (no *-preview*)
[x] Spot-check: pin-until-complete (Lenis fixed stage)
[x] No em dashes in public surfaces
[x] No temporary DNS language in buyer docs

SIGNED FIRST PRODUCTION PASS: agent 2026-08-13
```

## Phase 13 — Platinum Second Revision

- [x] **13A** Operator approved platinum (2026-08-13)
- [x] **13B.1** Folder tree matches Studio gold
- [x] **13B.2** Zip root = START-HERE / PROMPT / CUSTOMIZATION; rebuilt after source fixes
- [x] **13B.3** Cleanroom ↔ pack source hashes MATCH (including reduced-motion)
- [x] **13B.4** Dual preview + poster + thumb + can.glb HTTP 200
- [x] **13B.5** MDX body 12.9k with Package notes; Helix-class description 162 chars
- [x] **13B.6** CMS body matches MDX; priceTier pro; crown honest
- [x] **13B.7** product-packages / owner-designs / gallery-utils / this prep
- [x] **13B.8** demo 200 · browse 200 · download unauth 401
- [x] **13B.9** Reduced-motion path (HUD skips SplitText; Lenis stopped; no timeline seek)
- [x] **13B.10** MediaFill: no poster flash (still only on error)
- [x] **13C** PDF pack mode: no storefront `*-preview*` as background film
- [x] **VERDICT: PASS**

```text
PLATINUM SECOND REVISION — MS-HERO-ZERO01
Permission: yes
VERDICT: PASS
Fixes: Helix description; PDF media_kind=pack (no preview film); reduced-motion; hash sync; Package notes
Smoke: demo 200 · browse 200 · zip 200 · download 401
```

---

## Laws honored

| Law | How |
|-----|-----|
| Do not edit frozen clone | Lab is a copy. Source `E:\website-tests\zero-energy-clone` untouched |
| Three 0.161 | `vendor/three` + issuer alias. Not bumped |
| Lenis clock | Unchanged. Not converted to ST.scrub |
| Pin law | Fixed WebGL stage + virtual Lenis progress. Not a tall sticky track |
| Operator WebM | Page + gallery stay `.webm` |
| Local-only | No mailto / outbound / CDN / fetch in runtime |
| Logo Z | Not "fixed" |
| 3D client vs film | `videoBackgrounds` empty · no `/backgrounds` tile |
| Product folder + zip | Studio shape · PaidSalt on paid pack |
