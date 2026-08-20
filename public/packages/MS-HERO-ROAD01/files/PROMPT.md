# ROADSTER - AI build prompt

**Product:** ROADSTER (No Scroller studio-drive hero)  
**SKU:** MS-HERO-ROAD01  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this hero **exactly** as specified using **only the files in this pack**. Prefer integrating `source/TeslaRoadsterPromo.tsx` over rewriting from scratch.

---

## User will say

> Build ROADSTER using the files in this folder. Read PROMPT.md and follow it exactly.

---

## What you are building

A full-viewport **studio-drive hero** (not a scrubbed reel, not a free-play film tile):

1. One **pinned `100dvh` stage** `#hero` in normal document flow. High-key studio film.
2. **No Scroller (pin-until-complete):** wheel / trackpad / touch / keys aim **virtual progress `g` 0→1**. The page does not physically scroll during the viewing.
3. Earn: **13.3 viewports** (12 panel + 1.3 sheet). `virtualDistance = 13.3 * window.innerHeight`. Progress += deltaPx / virtualDistance. No wheel gain.
4. `g` 0 to about 0.90 drives enter-hold-exit story cards. The last slice pulls the black specs sheet up over the film.
5. At progress **0 + scroll up** or progress **1 + scroll down**, **release** so the host page can continue.
6. **Pin freeing (mandatory):** after release at **g = 1 + down**, the **page owns** wheel / touch / keys until the stage docks (`getBoundingClientRect().top >= -2`). Pointer on the next sibling never drives the hero.
7. Film **free-plays** muted loop. Never seek `currentTime`. Never PSAVE. Never reverse.
8. Sheet hosts official-style specs plus a Y-spin GLB. Mount WebGL only when the sheet is meaningfully visible.
9. `prefers-reduced-motion`: settled cards + docked sheet. Film may still show a still frame. Capture helper still registers.
10. Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, pageOwns, productId: "MS-HERO-ROAD01" }`. Root: `data-roadster-drive="pin"` · `data-product="MS-HERO-ROAD01"`. After release: `data-roadster-owns="page"`.

**Hard ban:** GSAP ScrollTrigger pin + pinSpacing.  
**Hard ban:** Lenis / SmoothScroll / gsap-register.  
**Hard ban:** a 13.3 vh **document spacer** (13.3 is virtual earn only).  
**Hard ban:** PSAVE, GOP 3, reverse film.  
**Hard ban:** mapping scroll to `video.currentTime`.  
**Hard ban:** `overflow: hidden` on the host page.  
**Hard ban:** installing `gsap` or `lenis`.

---

## Files to use

```
START-HERE.md
PROMPT.md
CUSTOMIZATION.md
assets/
  studio-drive.mp4
  roadster.glb
source/
  TeslaRoadsterPromo.tsx
  RoadsterSpecsSheet.tsx
  RoadsterTurntable.tsx
```

Place media:

- `public/assets/roadster/studio-drive.mp4`
- `public/assets/roadster/roadster.glb`

### Stack

| Package | Role |
|---------|------|
| React + TypeScript | Hero |
| `three` + `@react-three/fiber` + `@react-three/drei` | Turntable |
| `tailwindcss` | Optional layout utilities |

Do **not** install `gsap` or `lenis`. Do not add SmoothScroll. Do not import `ScrollTrigger`.

---

## Design system

| Token | Value |
|-------|--------|
| Ink | `#171a20` |
| Film stage | high-key studio, no grey wash |
| Sheet | `#000000` |
| Accent | `#e31937` progress tip only |
| Earn | 13.3 viewports (12 + 1.3) |
| Cards | enter 0.052 / hold 0.048 / exit 0.052 |
| Sheet start | after panel fraction ~0.90 |

---

## Default content (replace later)

| Slot | Default |
|------|---------|
| Film | `assets/studio-drive.mp4` |
| Mesh | `assets/roadster.glb` |
| Brand | TESLA / ROADSTER |
| Hero line | The quickest car in the world. |
| Proof | 1.9 s / +250 mph / 620 mi |

---

## Asset contract

| Field | Value |
|-------|--------|
| Film | `/assets/roadster/studio-drive.mp4` (muted loop) |
| Mesh | `/assets/roadster/roadster.glb` |
| Attributes | muted autoPlay loop playsInline preload auto, object-fit cover |
| Mode | No Scroller virtual progress + free-play film. Never video scrub. Never PSAVE. |

### FORBIDDEN

- Tall multi-vh page scroll track
- Storefront `*-preview*` files in the buyer build
- gsap, ScrollTrigger, lenis, SmoothScroll
- PSAVE / reverse-played video
- Seeking `currentTime` with progress
- Em dashes in customer-facing copy
- Host ClickMotion marketing shell inside the hero

---

## Rebuild algorithm (mandatory)

1. One `100dvh` section `#hero` in normal flow. Next sibling is the buyer's page.
2. Listen to wheel (non-passive), touch, and keys while the hero is in view.
3. Map delta onto 13.3 vh. Write `g` 0…1.
4. Map `g` onto panel envelopes, then sheet `translateY`. Film plays on its own clock.
5. If `g <= 0` and they scroll up, or `g >= 1` and they scroll down, do **not** preventDefault.
6. After release at g = 1 + down, the page owns until dock (`stage.top >= -2`).
7. Otherwise preventDefault so the page stays still.
8. Mount the turntable only when the sheet is on-screen. No HDR Environment.
9. Do not add SmoothScroll, gsap, or a ScrollTrigger pin.

---

## Accessibility

- Semantic `<section id="hero">` plus headings. Focusable Reserve / Learn CTAs.
- Arrow / Page / Space drive `g` while the pin owns. Never trap Tab. Never steal keys from inputs, buttons, or links.
- After release the page can continue. Do not trap focus.
- `aria-hidden` on fully off cards. Sheet `aria-label`.
- `prefers-reduced-motion`: settled cards, docked sheet, spin paused.

---

## Expected output

1. Full-viewport high-key hero. No host chrome required inside the component.
2. The page stays still while scroll aims the cards, then the sheet. Then the pin releases.
3. After release, the page owns until the stage docks.
4. Film loops independently. Sheet pulls up with a spinning GLB.
5. Reduced-motion settled pose.
6. No gsap, no ScrollTrigger pin, no SmoothScroll, no lenis.

## Confirm after build

- Page scrollY stays 0 while desktop flicks advance `g` (13.3 x 900 for a full journey)
- After `g` hits 1, one more down-scroll moves the page
- After release, scrolling up in the next section moves the page, not the cards
- Film keeps playing independently
- No pin-spacer, no gsap, no lenis in the bundle

## After it works

Open CUSTOMIZATION.md. Restage brand, film, GLB, and specs one request at a time.

ClickMotion · www.ClickMotion.dev
