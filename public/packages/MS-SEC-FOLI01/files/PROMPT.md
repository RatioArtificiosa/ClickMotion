# FOLIO - AI build prompt

**Product:** FOLIO (pin-until-complete liquid glass decision section)  
**SKU:** MS-SEC-FOLI01  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this section **exactly** as specified using **only the files in this pack**. Prefer integrating `source/FolioPivotSection.tsx` over rewriting from scratch.

---

## User will say

> Build FOLIO using the files in this folder. Read PROMPT.md and follow it exactly.

---

## What you are building

A mid-page **enterprise decision section** (not a full-bleed hero):

1. One **pinned `100dvh` stage** - **no** tall multi-vh document scrollbar track.
2. **Pin-until-complete:** wheel / trackpad / touch / arrow keys advance **virtual journey progress 0→1**.
3. Virtual journey effort ≈ `sheets × 1.55` viewports of wheel distance (not page height).
4. At progress **0 + scroll up** or progress **1 + scroll down**, **release** so the host page can continue.
5. **Pin freeing (mandatory):** after release at **g = 1 + down**, the **page owns** wheel / touch / keys until the stage docks (`getBoundingClientRect().top >= -2`). Pointer on the next sibling never drives the cards.
6. Looping muted client film under soft navy/dark veil (wallpaper only - **never** scrub `video.currentTime`).
6. Five **liquid-glass** decision sheets (hidden deck) with one-way paper `rotateX` journey: **+72° → face (0°) → −72°**.
7. ~18% local-progress overlap + smoothstep between sheets; long face-on plateau; mild Y/scale; last sheet holds face longer.
8. Footer: step index + eyebrow, dots, progress bar, "Scroll to continue".
9. `prefers-reduced-motion`: static stacked cards, gradient fallback, no video.
11. Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, pageOwns, productId: "MS-SEC-FOLI01" }`. Root: `data-folio-drive="pin"`. After release: `data-folio-owns="page"`.

**Hard ban:** tall sticky multi-vh scroll track as the method. **Hard ban:** document `useScroll` on a multi-screen spacer. Use `useMotionValue` journey progress + `useTransform` maps (as in pack source).

---

## Files to use

```
START-HERE.md
PROMPT.md
CUSTOMIZATION.md
assets/
  folio-blurry-v1.mp4
source/
  FolioPivotSection.tsx
```

Place media:

- `public/assets/videos/folio-blurry-v1.mp4`

---

## Asset contract

| Field | Value |
|-------|--------|
| Film | `/assets/videos/folio-blurry-v1.mp4` (silent loop) |
| Attributes | muted autoPlay loop playsInline preload auto, object-fit cover |
| Mode | Pin-until-complete virtual progress + glass pivot. Never video scrub |

### FORBIDDEN

- Tall multi-vh page scroll track  
- Storefront `*-preview*` files in the buyer build  
- Scrubbing film with progress  
- Empty sparse marketing cards  
- Em dashes in customer-facing copy  
- Host MS marketing shell  

---

## Design system

| Token | Value |
|-------|--------|
| Display | Syne 600 |
| Body | DM Sans 400 |
| Glass fill | rgba(255,255,255,0.08-0.18) + blur 26px saturate 185% |
| Iridescence | cyan / violet / rose edge wash |
| Type on glass | white + soft text-shadow |

**Liquid glass layers (mandatory):** fill, iridescence, specular, hairline edge.

---

## Default content (starting board)

**Kicker:** Enterprise growth system  
**Heading:** Five decisions that turn strategy into revenue.

| # | Eyebrow | Title focus |
|---|---------|-------------|
| 01 | Mandate | Single growth thesis |
| 02 | Insight | Buyers who convert |
| 03 | System | Operating system |
| 04 | Execution | 90-day plan |
| 05 | Outcomes | Board numbers |

Prefer the dense block content already in `source/FolioPivotSection.tsx` (metrics, rows, lists, chips, quote, split).

---

## Stack

React + TypeScript + Tailwind. **Framer Motion** (`useMotionValue`, `useTransform`, `useReducedMotion`). No chart library.

Install: `framer-motion`.

---

## Expected output

1. `FolioPivotSection` default export works mid-page  
2. One viewport pin + virtual progress (no long-page scrollbar through the journey)  
3. Five dense glass sheets with paper pivot  
4. Free-play film under glass  
5. Progress chrome + reduced-motion path  
6. Host page can continue after journey ends  

ClickMotion · www.ClickMotion.dev
