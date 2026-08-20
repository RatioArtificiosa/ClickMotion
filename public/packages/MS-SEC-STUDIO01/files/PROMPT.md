# STUDIO SEQUENCE - AI build prompt

**Product:** STUDIO SEQUENCE (No Scroller cinematic camera pull-out)  
**SKU:** MS-SEC-STUDIO01  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this section **exactly** as specified using **only the files in this pack**. Prefer integrating `source/StudioSequence.tsx` and `source/studio-data.ts` over rewriting from scratch.

---

## User will say

> Build STUDIO SEQUENCE using the files in this folder. Read PROMPT.md and follow it exactly.

---

## What you are building

A mid-page **cinematic camera pull-out** (not a free-floating video box):

1. One **pinned `100dvh` stage** `#studio-sequence` in normal document flow. Black stage.
2. **No Scroller (pin-until-complete):** wheel / trackpad / touch / keys aim **virtual progress `g` 0→1**. The page does not physically scroll during the viewing.
3. Earn: **4 viewports desktop / 3 viewports mobile**. `virtualDistance = viewports * window.innerHeight`. Progress += deltaPx / virtualDistance. No wheel gain.
4. At progress **0 + scroll up** or progress **1 + scroll down**, **release** so the host page can continue.
5. **Pin freeing (mandatory):** after release at **g = 1 + down**, the **page owns** wheel / touch / keys until the stage docks (`getBoundingClientRect().top >= -2`). Pointer on the next sibling never drives the camera.
6. One **world layer**: street plate (`object-fit: cover`) + a video shell locked to the billboard rect (fractions of the plate).
7. World **scale** from `startScale` (four-edge cover, full-bleed film) to `1` (living street) around the billboard center. Hold in 0.06 / hold out 0.90 / smootherstep.
8. Film **free-plays** muted loop. Never seek `currentTime` with scroll. Never PSAVE. Never reverse.
9. `prefers-reduced-motion`: scale stays at 1. Film may still play.
10. Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, pageOwns, productId: "MS-SEC-STUDIO01" }`. Root: `data-studio-drive="pin"` · `data-product="MS-SEC-STUDIO01"`. After release: `data-studio-owns="page"`. While the pin owns: `data-studio-owns="pin"`.

**Hard ban:** GSAP ScrollTrigger pin + scrub.  
**Hard ban:** Lenis / SmoothScroll / gsap-register.  
**Hard ban:** a 3 vh / 4 vh **document spacer** (those numbers are virtual earn only).  
**Hard ban:** PSAVE, GOP 3, reverse film. The film free-plays.  
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
  billboard-film.mp4
  street-plate.png
source/
  StudioSequence.tsx
  studio-data.ts
```

Place media:

- `public/assets/studio/billboard-film.mp4`
- `public/assets/studio/street-plate.png`

### Stack

| Package | Role |
|---------|------|
| React + TypeScript | Section |
| `tailwindcss` | Optional layout utilities |

Do **not** install `gsap` or `lenis`. Do not add SmoothScroll.

---

## Default content (replace later)

| Slot | Default |
|------|---------|
| Film | `assets/billboard-film.mp4` |
| Plate | `assets/street-plate.png` (1920 x 1080) |
| Billboard rect | left 0.2521, top 0.263, width 0.5026, height 0.387 |
| Earn | 4 desktop / 3 mobile |
| Hold | in 0.06 / out 0.90 |

---

## Asset contract

| Field | Value |
|-------|--------|
| Film | `/assets/studio/billboard-film.mp4` (silent or muted loop) |
| Plate | `/assets/studio/street-plate.png` |
| Attributes | muted autoPlay loop playsInline preload auto, object-fit cover |
| Mode | No Scroller virtual progress + free-play film. Never video scrub. Never PSAVE. |

### FORBIDDEN

- Tall multi-vh page scroll track
- Storefront `*-preview*` files in the buyer build
- gsap, ScrollTrigger, lenis, SmoothScroll
- PSAVE / reverse-played video
- Seeking `currentTime` with progress
- Em dashes in customer-facing copy
- Host ClickMotion marketing shell inside the section

---

## Design system

| Token | Value |
|-------|--------|
| Stage | `#000000` |
| Earn | 4 vh desktop / 3 vh mobile (`<768`) |
| Hold in / hold out | 0.06 / 0.90 |
| Cover | four-edge cover around billboard center, then `× 1.03` |
| Ease | smootherstep on camera only (not film) |
| Film | muted loop, `object-fit: cover`, never seek |
| Plate | `object-fit: cover`, 1920 × 1080 default |

Default board measure (fractions of the plate, inner screen only):

- left `0.2521` · top `0.263` · width `0.5026` · height `0.387`

---

## Rebuild algorithm (mandatory)

1. One `100dvh` section `#studio-sequence` in normal flow. Next sibling is the buyer's page, not a fake footer inside the component.
2. Listen to wheel (non-passive), touch, and keys while the section is in view.
3. Map delta onto 4 vh (desktop) or 3 vh (mobile). Write `g` 0…1.
4. Apply world `scale` from `g` immediately (1:1, no lag). Hold in / hold out / smootherstep stay.
5. If `g <= 0` and they scroll up, or `g >= 1` and they scroll down, do **not** preventDefault. The page may move.
6. After release at g = 1 + down, the page owns until dock (`stage.top >= -2`). Pointer on the next sibling never drives the camera.
7. Otherwise preventDefault so the page stays still.
8. Film plays on its own clock. Never seek.
9. Do not add SmoothScroll, gsap-register, gsap, or lenis.

React + TypeScript. Tailwind optional. **No GSAP. No ScrollTrigger. No Lenis.**

---

## Accessibility

- Semantic `<section>` plus `aria-label` and `data-product="MS-SEC-STUDIO01"`
- Arrow / Page / Space keys drive `g` while the pin owns. Never trap Tab. Never steal keys from inputs, buttons, or links.
- After release the page can continue. Do not trap focus in the section.
- `prefers-reduced-motion`: scale 1 (street rest). Film may still play. Capture helper still registers.

---

## Expected output

1. Mid-page full-viewport black stage. No host chrome inside the component.
2. The page stays still while scroll aims the camera. Then the pin releases.
3. After release, the page owns until the stage docks.
4. Open is full-bleed film. End is a living street billboard.
5. Film plays full duration and loops.
6. Reduced-motion street rest.
7. No gsap, lenis, SmoothScroll, or gsap-register.

## Confirm after build

- Page scrollY stays 0 while two desktop flicks advance `g` (two 1800px flicks on 4 x 900 = 1.0)
- Open is full-bleed. End is the street board.
- After `g` hits 1, one more down-scroll moves the page
- After release, scrolling up in the next section moves the page, not the camera
- Film keeps playing independently
- Reduced motion shows the street rest
- No pin-spacer, no gsap, no lenis, no SmoothScroll in the bundle

## After it works

Open CUSTOMIZATION.md. Restage film, plate, and earn one request at a time.

ClickMotion · www.ClickMotion.dev
