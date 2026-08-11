# Lineup — Product Line Scroll Reveal Section

**Product ID:** `MS-SEC-LINE01`  
**Package PDF:** `/packages/MS-SEC-LINE01/Lineup-package-l7n3e9k2m4p8.pdf`  
**Live cleanroom:** `/demo/cleanroom-lineup`  
**Tier:** Free · opaque `l7n3e9k2m4p8` · **not** on `/backgrounds`  
**Mode:** scroll pin scrub + snap through **N** products (data-driven)

---

## What you bought

A mid-page **product reveal section**. The stage pins. Each scroll segment introduces one SKU: 3D vessel cross-fades, bloom tint shifts, copy card rebuilds, ghost number breathes. Desktop pin ≈ `N × 100vh` with snap. Mobile: horizontal snap cards.

Default demo (ACTUALLY Clear / Dawn / Dusk) is a **starting board only**. Your AI restages brand, count, mesh, labels, specs, and industry copy until it is unmistakably yours.

---

## How to use (3 paths)

### A — Product Package PDF (recommended)
Open the PDF. Use the **prompts for your tool** (Cursor, Claude, Grok Build, Lovable, Codex, Bolt). Paste, attach assets if needed, run.

### B — Full MDX body
Paste the body of `content/prompts/sections/MS-SEC-LINE01.mdx` (everything after frontmatter) into your AI.

### C — Cleanroom source
Copy `cleanroom/lineup-from-prompt/` into your app. Point public assets:

| Asset | Default path | Role |
|-------|--------------|------|
| Vessel mesh | `/models/can.glb` | Product geometry (swap freely) |
| Labels 01–03 | `/textures/labels/still-0*-*.png` | Demo UV maps |
| Studio HDRI | `/hdri/studio_small_03_1k.hdr` | Reflections |

Read **`CUSTOMIZATION.md`** in this folder before expanding products.

---

## One-shot AI prompt (copy-paste)

```
Build / restage the Lineup product reveal section (MS-SEC-LINE01).

It is a MID-PAGE SECTION (not a full hero). Bone paper stage. Desktop:
GSAP ScrollTrigger pin top-top, end += N*100vh, scrub + snap through a
PRODUCTS array. Each segment: 3D vessel cross-fade (R3F + drei), bloom,
ghost number, left copy card (wordmark, name, subtitle, pitch, optional
specs). Mobile: horizontal snap cards. prefers-reduced-motion: first
product static.

DATA: all products live in lineup-data.ts (PRODUCTS + SECTION_META +
SPEC_ROWS). Never hardcode N=3. Support expand/contract via array length.

MY BRAND: [NAME]
MY PRODUCTS (N=[count]):
1) …
2) …
…

Replace demo ACTUALLY copy and labels. Update SECTION_META H2/eyebrow
for my count. Use my mesh/labels if provided: [paths]. Keep premium
editorial CPG craft. No purple mesh, no autoplay carousel.
```

---

## Expand to more products

```
Expand Lineup PRODUCTS from 3 to [N] using [DATA TABLE].
Update SECTION_META.eyebrowLabel and title.
Pin must be N * 100vh; snap 0…1/N…1; tabs 01…N.
Add labelPath (or LABEL_MAP) for each new SKU.
```

Details and industry tables: **`CUSTOMIZATION.md`**.

---

## Stack

React + TypeScript · GSAP ScrollTrigger · Lenis · three · @react-three/fiber · @react-three/drei · Tailwind optional

**Default export:** `LineupSection`  
**Compatible with:** Actually! hero (`MS-HERO-ACTU01`) above this section

---

## Operators / storefront

- Free listing · no PaidSalt  
- Dual previews: page `lineup-reveal-preview-v1.mp4` + FS `…-fs-v1.mp4`  
- Poster + thumbnail registered  
- Client media = GLB + labels + HDRI (not a film tile)  
- **NOT** contributed to `/backgrounds`
