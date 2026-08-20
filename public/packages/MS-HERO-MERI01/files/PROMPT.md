# MERIDIAN - AI build prompt

**Product:** MERIDIAN (pin-until-complete scroll narrative private residences hero)  
**SKU:** MS-HERO-MERI01  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this hero **exactly** as specified using **only the files in this pack**. Prefer integrating `source/MeridianScrollNarrative.tsx` over rewriting from scratch.

---

## User will say

> Build MERIDIAN using the files in this folder. Read PROMPT.md and follow it exactly.

---

## What you are building

A full-viewport **ultra-luxury private residences hero**:

1. One **pinned `100dvh` stage** - **no** tall multi-vh document scrollbar track.
2. **Pin-until-complete:** wheel / trackpad / touch / arrow keys advance **virtual progress 0→1**.
3. Virtual journey effort = **`3.2 × viewport height`** of wheel distance (gold Meridian pace - do not change).
4. **Scrub lag `0.45`** via GSAP tween on a progress proxy (same feel as classic ScrollTrigger scrub 0.45).
5. At progress **0 + scroll up** or progress **1 + scroll down**, **release** so the host page can continue (membership band).
6. Silent cinematic film scrubbed by progress: `video.currentTime = progress * duration`. **Never** autoplay loop wallpaper.
7. Three editorial chapters by progress ranges (0-0.32 / 0.32-0.62 / 0.62-1).
8. Gold progress line under nav; chapter markers 01-03; Scroll cue only while progress &lt; 0.04.
9. Closing **Membership** band after the pin stage.
10. `prefers-reduced-motion`: poster + chapter 01 static, no scrub.
11. Optional capture helper: `window.__msScrollNarrative = { setProgress, getProgress }`.

**Hard ban:** tall sticky multi-vh scroll track as the method. **Hard ban:** changing 3.2 viewports or 0.45 lag without operator approval.

---

## Files to use

```
START-HERE.md
PROMPT.md
CUSTOMIZATION.md
assets/
  sequence-01.mp4
  sequence-01.webp
source/
  MeridianScrollNarrative.tsx
```

Place media:

- `public/assets/videos/sequence-01.mp4`
- `public/assets/posters/sequence-01.webp`

---

## Asset contract

| Field | Value |
|-------|--------|
| Film | `/assets/videos/sequence-01.mp4` (~12s silent) |
| Poster | `/assets/posters/sequence-01.webp` - **exact film frame 0, 1920×1080** (same crop; no jump) |
| Attributes | muted playsInline preload auto - **no autoplay, no loop** |
| Mode | Pin-until-complete virtual progress **scrubs** `currentTime` |

### FORBIDDEN

- Tall multi-vh page scroll track  
- Storefront `*-preview*` files in the buyer build  
- Autoplay wallpaper loop  
- SaaS purple / pill glass nav / aurora mesh  
- Em dashes in customer-facing copy  
- Host MS marketing shell  

---

## Design system

| Token | Value |
|-------|--------|
| Canvas | `#0c0a08` |
| Cream | `#f7f1e8` |
| Gold | `#c9a66b` |
| Display | Cormorant Garamond / Playfair 500 |
| Body | Inter light |

Dual scrim over film for type legibility. Rectangular CTAs only.

---

## Default content (starting board)

| # | Range | Eyebrow | Title |
|---|-------|---------|-------|
| 01 | 0-0.32 | Private Atlantic · By Appointment | The coastline / belongs to few. |
| 02 | 0.32-0.62 | Interiors · Bespoke | Every ascent / is intentional. |
| 03 | 0.62-1 | The Arrival | Where the day / ends in gold. |

Chapter 03: CTAs "Schedule a private tour" + "View the portfolio".  
Closing band: Membership · "Reserved for those who already have everything." · stats 12 / 4 / 100%.

Prefer dense editorial copy already in `source/MeridianScrollNarrative.tsx`.

---

## Tech

- React + TypeScript + Tailwind, `"use client"`
- GSAP for scrub lag only (not tall-track ScrollTrigger)
- Prefer pack source when present

ClickMotion · www.ClickMotion.dev
