# Phobia - AI build prompt

**Product:** Phobia (cursor-fleeing forms section)  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this section **exactly** as specified using **only the files in this pack**. Do not invent a different interaction. Do not replace rest-based flee with generic CSS hover.

---

## User will say

> Build Phobia using the files in this folder. Read PROMPT.md and follow it.

---

## What you are building

A full-viewport **black void** stage with photo cutouts and optional letter debris:

1. Each object has a **CSS rest pose**. GSAP `x` / `y` are **offsets** from that rest (home = 0,0).
2. Distance and angle are measured from the mouse to the **rest center** (visual center minus current GSAP offset), never from the live offset position alone.
3. If the mouse is inside `influenceRadius` of rest → radial flee opposite the mouse with rotation and scale.
4. Else → elastic return to rest.
5. When the pointer is outside the section, treat the mouse as the **viewport center** so objects **spread**.
6. Premium **white-glow cursor** + soft trail while the pointer is inside (hide OS cursor on the section).

This is pointer-first. Do not require scroll pin for the core interaction.

---

## Files to use (this pack)

```
START-HERE.md          human steps
PROMPT.md              this file
CUSTOMIZATION.md       restage later
assets/                cutouts (WebP / PNG)
source/
  PhobiaSection.tsx    section component
  phobia-data.ts       items, letters, params
```

Place media in the host app as:

- `public/assets/phobia/*` (same filenames as `assets/`)

Paths in `phobia-data.ts` already match `/assets/phobia/...`.

---

## Stack

| Package | Role |
|---------|------|
| react | UI |
| gsap | Flee / return tweens only (no Club plugins) |

Install: `gsap`.

Optional: Tailwind utility classes as written in the source (or convert to plain CSS if the host has no Tailwind).

---

## Architecture (non-negotiable)

- One section: full viewport height (`h-dvh` / `100dvh`), black background, `overflow: hidden`.
- One stage layer centered (~1872×1056 max) holding absolute rest poses.
- Objects = images + optional letter spans; drive everything from `PHOBIA_ITEMS` in `phobia-data.ts`.
- Motion params from `PHOBIA_PARAMS` (desktop / mobile). Do not hardcode different radii in the component.
- Custom cursor + trail as HTML overlays (not the OS cursor).
- No required site header, footer, or store chrome.

---

## Motion law (non-negotiable)

Desktop: influenceRadius **460**, maxDistance **380**, rotForce **30**, scaleForce **0.2**.  
Mobile ≤767: **260** / **110** / **12** / **0.1**.

Flee: `L = ((R - d) / R) ** 1.6`, `U = L * maxDistance`, offset `(-cos(θ)*U, -sin(θ)*U)`, duration 0.45, ease `power4.out`.  
Return: x:0 y:0 baseRot scale 1, duration 1.2, ease `elastic.out(1, 0.35)`.  
`overwrite: "auto"`. Prefer `force3D: true`.

Reduced motion: do not run flee tweens; leave objects at rest.

Use the provided `PhobiaSection.tsx` and `phobia-data.ts` as source of truth. Prefer integrating those files over rewriting from scratch. If you must rewrite, match the behavior above pixel-for-pixel in spirit.

---

## Default entry

```tsx
import PhobiaSection from "./source/PhobiaSection";

export default function Page() {
  return <PhobiaSection />;
}
```

---

## Expected checks

1. Black full-viewport section, no required site chrome  
2. Idle (no pointer in section): spread composition  
3. Pointer near rest: flee with rotation / scale  
4. Pointer clear of bubble: elastic home  
5. White-glow cursor + trail when pointer inside  
6. Letters and cutouts driven by data file  
7. Mobile uses softer params from `PHOBIA_PARAMS.mobile`  
8. `prefers-reduced-motion: reduce` does not thrash objects  

---

## Anti-patterns (forbidden)

- Measuring flee distance from the live offset position (must use **rest center**)
- CSS hover-only float without rest-based radial flee
- Club GSAP InertiaPlugin (vanilla GSAP tweens only)
- Using storefront preview videos as rebuild media
- Shipping olive / system default cursors as the signature look
- Requiring scroll pin for the core interaction
- Leaving broken paths to missing cutouts
- Redesigning into a generic hero with different motion

---

## After it works

- QA every expected check above.
- To change brand objects, letters, density, or feel, read **CUSTOMIZATION.md**.
- Do not add store chrome, fake UI frames, or demo lab chrome.

Build it. Make it feel expensive, alive, and inevitable.

ClickMotion · www.ClickMotion.dev
