# ZERO ENERGY — AI build prompt

**Product:** ZERO ENERGY (3D can gallery)  
**SKU:** MS-HERO-ZERO01  
**Brand:** ClickMotion · www.ClickMotion.dev  
**Status:** first production pass. Buyer pack lives under public/packages/MS-HERO-ZERO01/.

You are an expert front-end engineer. Build this **exactly** as specified so the buyer can restage it for any beverage or physical product. Keep the 3D gallery and the Lenis timeline clock. Do not bump Three. Do not introduce React Three Fiber. Do not add outbound URLs.

---

## User will say

> Build ZERO ENERGY using the files in this folder. Read START-HERE.md and follow it.

---

## What you are building

A full-page **3D energy-drink gallery**:

1. Six labeled cans on a raw Three stage (carousel, grab, arrows, liquid pager).
2. Flavor profile.
3. Four benefit beats.
4. ZERO BULLSHIT mark.
5. Packshot.
6. Nine FAQ + closer.

Wheel / trackpad / touch drive **Lenis**. Lenis seeks the GSAP timeline. The stage stays fixed. This is **not** a tall multi-viewport sticky page.

---

## Locked stack

| Piece | Pin |
|-------|-----|
| three | **0.161.0 exact** |
| lenis | ^1.3 · `infinite: true` · `autoRaf: false` |
| gsap | ^3.13 + ScrollTrigger + **real SplitText** |
| R3F | forbidden |

---

## Files (cleanroom)

```
START-HERE.md
BUYER_PROMPT.md
CUSTOMIZATION.md
ZeroEnergyGallery.tsx
data/flavors.ts
data/copy.ts
lib/webgl-scene.js
lib/hud-init.ts
sections/can-gallery/CanGallery.tsx
```

Media lives at `/assets/zero-energy/` (webgl, textures, img, fonts, css, audio).

---

## Forbidden

- Bumping Three
- R3F / drei
- `ScrollTrigger.scrub` as the 3D clock
- mailto, https outbound, Google Fonts, CDN, fetch, recaptcha, socials
- "Fixing" the logo Z
- Em dashes in customer-facing copy
- Storefront preview filenames in the buyer build
