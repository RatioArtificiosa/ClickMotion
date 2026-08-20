# ACTUALLY - AI build prompt

**Product:** ACTUALLY (No Scroller product can hero)  
**SKU:** MS-HERO-ACTU01  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this hero **exactly** as specified using **only the files in this pack**. Prefer integrating `source/ActuallyHero.tsx` over rewriting from scratch.

---

## User will say

> Build ACTUALLY using the files in this folder. Read PROMPT.md and follow it exactly.

---

## What you are building

A full-viewport **product can hero** (not a mid-page gallery, not a free-play film):

1. One **pinned `100dvh` stage** `#hero` in normal document flow. Bone paper `#efede6` over ink `#1a1b1d`.
2. **No Scroller (pin-until-complete):** wheel / trackpad / touch / keys aim **virtual progress `g` 0→1**. The page does not physically scroll during the viewing.
3. Earn: **1.2 viewports**. `virtualDistance = 1.2 * window.innerHeight`. Progress += deltaPx / virtualDistance. No wheel gain.
4. At progress **0 + scroll up** or progress **1 + scroll down**, **release** so the host page can continue.
5. **Pin freeing (mandatory):** after release at **g = 1 + down**, the **page owns** wheel / touch / keys until the stage docks (`getBoundingClientRect().top >= -2`). Pointer on the next sibling never drives the hero.
6. Desktop: pointer-driven **circle clip-path window** into a living 3D can. Grab to spin. Progress expands the clip, locks the can (`lockBlend`), dollies in (`0.09 * g`), and reveals formula copy after `g > 0.58` (hide again if `g < 0.35`).
7. Mobile (`<768`): stacked wordmark + can (~52vh) + formula. Drag spin. No clip-path pin. Not a tall page track.
8. `prefers-reduced-motion`: static product pose and readable copy. Capture helper still registers.
9. Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, pageOwns, productId: "MS-HERO-ACTU01" }`. Root: `data-actually-drive="pin"` · `data-product="MS-HERO-ACTU01"`. After release: `data-actually-owns="page"`. While the pin owns: `data-actually-owns="pin"`.

**Hard ban:** GSAP ScrollTrigger pin + pinSpacing.  
**Hard ban:** Lenis / SmoothScroll / gsap-register.  
**Hard ban:** a 1.2 vh **document spacer** (1.2 is virtual earn only).  
**Hard ban:** PSAVE, GOP 3, reverse film.  
**Hard ban:** `overflow: hidden` on the host page.  
**Hard ban:** installing `lenis`. gsap is for pointer, clip, and support tweens only.

---

## Files to use

```
START-HERE.md
PROMPT.md
CUSTOMIZATION.md
assets/
  can.glb
  still-01-clear-2.png
  still-02-dawn-2.png
  still-03-dusk-2.png
  studio_small_03_1k.hdr
  actually-01.png
source/
  ActuallyHero.tsx
  Can3D.tsx
  Bloom.tsx
  LetterStack.tsx
  Loader.tsx
  ScrollHint.tsx
  ScrollIlluminate.tsx
  ScrollReveal.tsx
  TextReveal.tsx
  hooks.ts
  splitFallback.ts
```

Place media:

- `public/models/can.glb`
- `public/textures/labels/still-01-clear-2.png` (and dawn / dusk)
- `public/hdri/studio_small_03_1k.hdr`

### Stack

| Package | Role |
|---------|------|
| React + TypeScript | Hero |
| `gsap` | Pointer follow, clip expand, support reveal. Tweens only |
| `three` + `@react-three/fiber` + `@react-three/drei` | Vessel |
| `tailwindcss` | Optional layout utilities |

Do **not** install `lenis`. Do not add SmoothScroll. Do not import `ScrollTrigger` to pin.

---

## Design system

| Token | Value |
|-------|--------|
| Bone | `#efede6` |
| Ink | `#1a1b1d` |
| Mist | `#6a6965` |
| Clear / accent | `#bcd3d8` |
| Alpine | `#1e423e` |
| Earn | 1.2 viewports |
| Support show | g > 0.58 |
| Support hide | g < 0.35 |
| Dolly | `0.09 * g` |
| Wordmark | Inter Black stand-in, `19vw`, tracking `-0.03em` |
| Support H2 | Georgia light, `clamp(28px, 2.8vw, 44px)` |

---

## Default content (replace later)

| Slot | Default |
|------|---------|
| Wordmark | ACTUALLY. |
| Taglines | Actually? / Really. Actually. |
| Meta | Nootropic, not caffeine / New York City |
| Support H2 | Sustained natural focus… |
| Stats | 1,150 mg / 0 mg caffeine |
| Mesh | `can.glb` |
| Label | `still-01-clear-2.png` |

---

## Rebuild algorithm (mandatory)

1. One `100dvh` section `#hero` in normal flow. Next sibling is the buyer's page.
2. Listen to wheel (non-passive), touch, and keys while the hero is in view.
3. Map delta onto 1.2 vh. Write `g` 0…1.
4. Drive the same clip / lock / dolly / support art from `g`. Pointer window and grab stay.
5. If `g <= 0` and they scroll up, or `g >= 1` and they scroll down, do **not** preventDefault.
6. After release at g = 1 + down, the page owns until dock (`stage.top >= -2`).
7. Otherwise preventDefault so the page stays still.
8. Mobile: stacked wordmark + can + formula. Drag spin. IntersectionObserver for copy-in, not ScrollTrigger pin.
9. Do not add SmoothScroll, lenis, or a ScrollTrigger pin.

---

## Accessibility

- Semantic `<section id="hero">` plus heading hierarchy. Wordmark `aria-label` with the spoken brand.
- Loader `role="status"` during the curtain.
- Arrow / Page / Space drive `g` while the pin owns. Never trap Tab. Never steal keys from inputs, buttons, or links.
- After release the page can continue. Do not trap focus.
- Canvas may stay decorative; support copy remains in the DOM.
- `prefers-reduced-motion`: static product pose, readable copy. Capture helper still registers.

---

## Expected output

1. Full-viewport bone / ink hero. No host chrome inside the component.
2. The page stays still while scroll aims the reveal. Then the pin releases.
3. After release, the page owns until the stage docks.
4. Desktop pointer window + living 3D can + grab. Formula lands after mid progress.
5. Mobile stacked layout with drag spin.
6. Reduced-motion static product pose.
7. No lenis, no ScrollTrigger pin, no SmoothScroll.

## Confirm after build

- Page scrollY stays 0 while a desktop flick of 1080px on a 900px viewport advances `g` to 1
- After `g` hits 1, one more down-scroll moves the page
- After release, scrolling up in the next section moves the page, not the reveal
- Pointer window follows. Grab spins the can
- No pin-spacer, no lenis in the bundle

## After it works

Open CUSTOMIZATION.md. Restage brand, mesh, labels, and formula one request at a time.

ClickMotion · www.ClickMotion.dev
