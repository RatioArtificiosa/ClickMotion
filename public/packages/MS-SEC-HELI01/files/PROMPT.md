# HELIX - AI build prompt

**Product:** HELIX (No Scroller helical design gallery section)  
**SKU:** MS-SEC-HELI01  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this section **exactly** as specified using **only the files in this pack**. Prefer integrating `source/HelixGallerySection.tsx` and `source/OrbitHelix.tsx` over rewriting from scratch.

---

## User will say

> Build HELIX using the files in this folder. Read PROMPT.md and follow it exactly.

---

## What you are building

A mid-page **design gallery carousel** (not a full-bleed hero):

1. One **pinned `100dvh` stage** in normal document flow. Solid stage `#C3C3C3`.
2. **No Scroller (pin-until-complete):** wheel / trackpad / touch / keys aim **virtual progress `g` 0→1**. The page does not physically scroll during the viewing.
3. Earn: **5 viewports desktop / 3 viewports mobile**. `virtualDistance = viewports * window.innerHeight`. Progress += deltaPx / virtualDistance. No wheel gain.
4. At progress **0 + scroll up** or progress **1 + scroll down**, **release** so the host page can continue.
5. **Pin freeing (mandatory):** after release at **g = 1 + down**, the **page owns** wheel / touch / keys until the stage docks (`getBoundingClientRect().top >= -2`). Pointer on the next sibling never drives the helix.
6. Nine rounded cards ride a WebGL cylindrical helix (radius 12, pitch 28 over 2 turns, spacing 6.2). Load order reversed: orbit-09 → orbit-01.
7. Giant **"Design in"** travels `-100vw` → `+100vw`. Giant **"motion"** travels `+100vw` → `-100vw`. Peak center at `g ≈ 0.18`.
8. Center lockup (Birthstone wordmark + two uppercase lines) fades after `g ≈ 0.55`.
9. Helix path offset uses `P = min(1, g / (400/600))`. Cards ease in from off-path. Thin gray rails grow with P.
10. `prefers-reduced-motion`: static mid pose `g ≈ 0.45`, titles near center, no chase.
11. Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, pageOwns, productId: "MS-SEC-HELI01" }`. Root: `data-helix-drive="pin"`. After release: `data-helix-owns="page"`.

**Hard ban:** GSAP ScrollTrigger pin + scrub.  
**Hard ban:** Lenis.  
**Hard ban:** a 3 vh / 5 vh **document spacer** (those numbers are virtual earn only).  
**Hard ban:** PSAVE, GOP 3, reverse film. There is no film clock.  
**Hard ban:** `overflow: hidden` on the host page.  
**Hard ban:** installing `gsap` or `lenis`.  
**Hard ban:** adding SmoothScroll or gsap-register. They are not part of this product.

---

## Files to use

```
START-HERE.md
PROMPT.md
CUSTOMIZATION.md
assets/
  orbit-01.jpg … orbit-09.jpg
source/
  HelixGallerySection.tsx
  OrbitHelix.tsx
```

Place media:

- `public/assets/images/orbit/orbit-01.jpg` … `orbit-09.jpg`

### Stack

| Package | Role |
|---------|------|
| `three` | WebGL helix |
| `@react-three/fiber` | React canvas |
| `tailwindcss` | Optional layout utilities |
| Inter or Neue Haas | Title sans (`--font-helix-display`) |
| Birthstone or brand script | Wordmark (`--font-helix-wordmark`) |

Do **not** install `gsap` or `lenis`. Do not add SmoothScroll.

Wire fonts so the section can read:

- `--font-helix-display`
- `--font-helix-wordmark`

---

## Default content (replace later)

| Slot | Default | Max |
|------|---------|-----|
| Title A | Design in | ~14 chars |
| Title B | motion | ~14 chars |
| Wordmark | ClickMotion | 1 line |
| Center L1 | Exploring ideas through | ~28 chars |
| Center L2 | daily design practice. | ~28 chars |
| Concepts | three short lines | ~40 chars/line |
| Cards | orbit-01 … orbit-09 | 9 images |
| Stage | `#C3C3C3` | hex |
| Ink | `#1a1a1a` | hex |

---

## Asset contract

| Field | Value |
|-------|--------|
| Cards | `/assets/images/orbit/orbit-01.jpg` … `orbit-09.jpg` |
| Aspect | about 568 / 812, portrait-ish |
| Mode | No Scroller virtual progress. Never a tall page track. Never PSAVE. |

### FORBIDDEN

- Tall multi-vh page scroll track
- Storefront `*-preview*` files in the buyer build
- gsap, ScrollTrigger, lenis
- PSAVE / reverse-played video
- Empty sparse marketing cards
- Em dashes in customer-facing copy
- Host ClickMotion marketing shell inside the section

---

## Design system

| Token | Value |
|-------|--------|
| Stage | `#C3C3C3` |
| Ink | `#0a0a0a` / `#1a1a1a` |
| Rails | `#9E9E9E` at 50% |
| Titles | Inter / Neue Haas, uppercase, clamp 3.25rem to 9.5rem |
| Wordmark | Birthstone or brand script |
| Concepts | 13-14px, bottom-left, max-width 16rem |

Camera (do not tilt lookY):
- mobile: z 28, fov 58
- tablet: z 24, fov 54
- desktop: z 22, fov 52

---

## Rebuild algorithm (mandatory)

1. One `100dvh` section `#helix-gallery` in normal flow. Next sibling is the buyer's page, not a fake footer inside the component.
2. Listen to wheel (non-passive), touch, and keys while the section is in view.
3. Map delta onto 5 vh (desktop) or 3 vh (mobile). Write `g` 0…1.
4. Apply title `translate3d` and helix `progressRef` from `g` immediately (1:1, no lag).
5. If `g <= 0` and they scroll up, or `g >= 1` and they scroll down, do **not** preventDefault. The page may move.
6. After release at g = 1 + down, the page owns until dock (`stage.top >= -2`). Pointer on the next sibling never drives the helix.
7. Otherwise preventDefault so the page stays still.
8. WebGL: force canvas to the viewport. Never leave a 300x150 default.
9. Dispose textures, geos, and materials on unmount.
10. Do not add SmoothScroll, gsap-register, gsap, or lenis. They are not part of this product.

React + TypeScript + three + @react-three/fiber. Tailwind optional. **No GSAP. No ScrollTrigger. No Lenis. No Three.js extra controls.**

---

## Accessibility

- Semantic `<section>` plus a spoken wordmark `aria-label`
- Canvas `aria-hidden`
- Arrow / Page / Space keys drive `g` while the pin owns. Never trap Tab.
- After release the page can continue. Do not trap focus in the section.
- `prefers-reduced-motion`: static mid pose at g 0.45, titles near center, no chase
- Dark type on the light stage (invert if you recolor)

---

## Expected output

1. Mid-page full-viewport cool-gray gallery. No host chrome inside the component.
2. The page stays still while scroll aims the helix. Then the pin releases.
3. After release, the page owns until the stage docks. Pointer on the next sibling never drives the helix.
4. Nine cards ride a cylindrical helix with thin guide rails.
5. Title A from the left, Title B from the right. They cross and leave.
6. Wordmark above two quiet lines, then fades late.
7. Concepts copy bottom-left, under the canvas.
8. Reduced-motion static mid pose.
9. No gsap, lenis, SmoothScroll, or gsap-register.

## Confirm after build

- Page scrollY stays 0 while two desktop flicks advance `g` (two 1800px flicks on 5 x 900 = 0.8)
- Titles cross; cards ride the helix; rails grow
- After `g` hits 1, one more down-scroll moves the page
- After release, scrolling up in the next section moves the page, not the helix
- Reduced motion shows the mid pose
- No pin-spacer, no gsap, no lenis, no SmoothScroll in the bundle for this section

## After it works

Open CUSTOMIZATION.md. Restage brand, titles, cards, and color one request at a time.

ClickMotion · www.ClickMotion.dev
