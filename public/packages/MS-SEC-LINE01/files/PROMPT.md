# LINEUP - AI build prompt

**Product:** LINEUP (No Scroller product line reveal)  
**SKU:** MS-SEC-LINE01  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this section **exactly** as specified using **only the files in this pack**. Prefer integrating `source/LineupSection.tsx` and `source/lineup-data.ts` over rewriting from scratch.

---

## User will say

> Build LINEUP using the files in this folder. Read PROMPT.md and follow it exactly.

---

## What you are building

A mid-page **product line reveal** (not a full-bleed hero):

1. One **pinned `100dvh` stage** `#flavors` in normal document flow. Bone paper `#efede6`.
2. **No Scroller (pin-until-complete):** wheel / trackpad / touch / keys aim **virtual progress `g` 0→1**. The page does not physically scroll during the viewing.
3. Earn: **N viewports** where N = `PRODUCTS.length`. `virtualDistance = N * window.innerHeight`. Progress += deltaPx / virtualDistance. No wheel gain.
4. Snap on lift to `0, 1/N, 2/N, …, 1`. Each stop is one SKU.
5. At progress **0 + scroll up** or progress **1 + scroll down**, **release** so the host page can continue.
6. **Pin freeing (mandatory):** after release at **g = 1 + down**, the **page owns** wheel / touch / keys until the stage docks (`getBoundingClientRect().top >= -2`). Pointer on the next sibling never drives the lineup.
7. Active SKU = `floor(g * N)`. 3D vessel cross-fades. Bloom, ghost number, and copy card rebuild.
8. Mobile (`<768`): horizontal snap cards. Not a tall page track.
9. `prefers-reduced-motion`: first product static.
10. Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, pageOwns, productId: "MS-SEC-LINE01" }`. Root: `data-lineup-drive="pin"` · `data-product="MS-SEC-LINE01"`. After release: `data-lineup-owns="page"`.

**Hard ban:** GSAP ScrollTrigger pin + pinSpacing.  
**Hard ban:** Lenis / SmoothScroll.  
**Hard ban:** an N vh **document spacer** (N is virtual earn only).  
**Hard ban:** PSAVE, GOP 3, reverse film.  
**Hard ban:** `overflow: hidden` on the host page.  
**Hard ban:** installing `lenis`. gsap is for SKU tweens only.

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
source/
  LineupSection.tsx
  lineup-data.ts
  Can3D.tsx
  InlineCan.tsx
  Bloom.tsx
  ScrollReveal.tsx
  TextReveal.tsx
  hooks.ts
  splitFallback.ts
  useInView.ts
```

Place media:

- `public/models/can.glb`
- `public/textures/labels/still-01-clear-2.png` (and dawn / dusk)
- `public/hdri/studio_small_03_1k.hdr`

### Stack

| Package | Role |
|---------|------|
| React + TypeScript | Section |
| `gsap` | SKU cross-fade tweens only |
| `three` + `@react-three/fiber` + `@react-three/drei` | Vessel |
| `tailwindcss` | Optional layout utilities |

Do **not** install `lenis`. Do not add SmoothScroll. Do not import `ScrollTrigger` to pin.

---

## Design system

| Token | Value |
|-------|--------|
| Stage | `#efede6` bone |
| Ink | `#1a1b1d` |
| Mist | `#6a6965` |
| Earn | N viewports (`PRODUCTS.length`) |
| Snap | 0, 1/N, …, 1 on lift (140ms) |
| Cross-fade | can in 0.85s / out 0.45s |
| Copy | out 0.25s / in 0.45s stagger |
| Grid | copy 5fr / stage 7fr |

---

## Default content (replace later)

| Slot | Default |
|------|---------|
| Products | Clear / Dawn / Dusk (N = 3) |
| Earn | N viewports |
| Stage | `#efede6` bone |
| Mesh | `can.glb` |
| Specs | L-Theanine, Lion's Mane, Rhodiola, Bacopa |

---

## Rebuild algorithm (mandatory)

1. One `100dvh` section `#flavors` in normal flow. Next sibling is the buyer's page.
2. Listen to wheel (non-passive), touch, and keys while the section is in view.
3. Map delta onto N vh. Write `g` 0…1. Snap on lift.
4. Derive active index from `g`. Cross-fade the 3D vessel and copy.
5. If `g <= 0` and they scroll up, or `g >= 1` and they scroll down, do **not** preventDefault.
6. After release at g = 1 + down, the page owns until dock (`stage.top >= -2`).
7. Otherwise preventDefault so the page stays still.
8. Mobile: horizontal snap cards. IntersectionObserver for card-in, not ScrollTrigger pin.
9. Do not add SmoothScroll, lenis, or a ScrollTrigger pin.

---

## Accessibility

- Semantic `<section>` plus headings. Tabs are real buttons with `aria-current`.
- Arrow / Page / Space drive `g` while the pin owns. Left / Right jump SKUs. Never trap Tab.
- After release the page can continue. Do not trap focus.
- `prefers-reduced-motion`: first product static. Capture helper still registers.

---

## Expected output

1. Mid-page full-viewport bone stage. No host chrome inside the component.
2. The page stays still while scroll aims the SKUs. Then the pin releases.
3. After release, the page owns until the stage docks.
4. Each SKU lands with 3D vessel + bloom + copy.
5. Reduced-motion first product static.
6. No lenis, no ScrollTrigger pin, no SmoothScroll.

## Confirm after build

- Page scrollY stays 0 while desktop flicks advance `g` (N x 900 for a full journey)
- After `g` hits 1, one more down-scroll moves the page
- After release, scrolling up in the next section moves the page, not the lineup
- Tabs jump SKUs. Mobile swipes cards
- No pin-spacer, no lenis in the bundle

## After it works

Open CUSTOMIZATION.md. Restage brand, count, mesh, and copy one request at a time.

ClickMotion · www.ClickMotion.dev
