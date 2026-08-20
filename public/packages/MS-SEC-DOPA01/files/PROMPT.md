# Dopamine - AI build prompt

**Product:** Dopamine (complete fashion footer section)  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this footer **exactly** as specified using **only the files in this pack**. Do not invent a different footer pattern. Do not strip scramble, Lottie, or the hero figure.

---

## User will say

> Build Dopamine footer using the files in this folder. Read PROMPT.md and follow it.

---

## What you are building

A full **site footer** for a fashion / lifestyle brand:

1. Masked background stages (mobile / tablet / desktop webp).
2. Absolute **hero figure** (Woman1) height-driven; desktop ~65rem.
3. **Lottie discount badge** (canvas) with hover frame animation on desktop.
4. Dual **nav** rows (shop + legal) with mono type and letter scramble on enter.
5. **Exclusion-blend wordmark** (SVG DOPAMINE - buyer rebrands).
6. **Subscribe** title + email form (client validation only, no backend).
7. Bottom legal row (copyright, privacy, credits panel, IG as text - **no external links**).
8. Credits modal with brand-only copy.

Motion on scroll into view (`start: "top 80%"`, once): logo yPercent 300→0, figure yPercent 100→0, form opacity, title scaleY, scramble nav + bottom chars, Lottie enter.

---

## Files to use (this pack)

```
START-HERE.md
PROMPT.md
CUSTOMIZATION.md
assets/
  Woman1.png
  footer_bg_mob.webp
  footer_bg_tablet.webp
  footer_bg_desk.webp
  footer_bg_desk-scaled.webp
  FOOTER_LOTTIE_v1.json
source/
  SiteFooter.tsx
  scramble.ts
  DopamineLogo.tsx
  dopamine-footer.css
```

Place media at:

- `public/assets/dopamine/*` (same filenames)

Paths in source already match `/assets/dopamine/...`.

---

## Stack

| Package | Role |
|---------|------|
| react | UI |
| gsap + ScrollTrigger | Enter timeline + scramble |
| lottie-web | Discount badge |

Install: `gsap`, `lottie-web`.

Import **dopamine-footer.css** once (provides fluid rem scale + all footer CSS).  
**Critical:** use class **`dop-container`** for layout - **never** Tailwind `.container` (it caps max-width and breaks the design).

---

## Architecture (non-negotiable)

- Prefer integrating pack `SiteFooter.tsx`, `scramble.ts`, `DopamineLogo.tsx` over rewriting.
- Footer root: `footer.footer` with CSS mask from bg assets.
- Figure and discount are absolute children of the footer (not inside the mid grid only).
- Desktop mid grid: logo full width, title left, form right.
- No required site header inside this component.
- No external hyperlinks (use `#` + preventDefault or spans).
- Reduced motion (`prefers-reduced-motion: reduce`): settled readable footer - no entrance offsets, no scramble thrash; Lottie holds final frame.

---

## Default entry

```tsx
import "./source/dopamine-footer.css";
import { SiteFooter } from "./source/SiteFooter";

export default function Page() {
  return (
    <>
      <div style={{ minHeight: "50vh" }} />
      <SiteFooter />
    </>
  );
}
```

---

## Expected checks

1. Footer full width, masked stage, no broken images  
2. Figure present and tall on desktop  
3. Wordmark exclusion blend over figure  
4. Scroll into view: logo rise, figure enter, scramble, form fade, Lottie  
5. Email invalid shows error; valid shows "You're in" (no network)  
6. Credits panel opens/closes  
7. IG is not an external link  
8. No Tailwind container max-width crushing layout  
9. `prefers-reduced-motion: reduce` shows settled footer without scramble thrash  

---

## Anti-patterns (forbidden)

- Using Tailwind `.container` instead of `dop-container`
- Dropping Lottie, scramble, or the figure for a "simple footer"
- Adding external URLs (IG, privacy, shop)
- Burning storefront preview videos as rebuild media
- Hardcoding Club GSAP plugins
- Renaming assets without updating paths

---

## After it works

- Read **CUSTOMIZATION.md** to restage brand, figure, nav, and copy.
- Keep motion system intact unless the buyer asks to soften it.

Build it. Make the close of the page feel expensive and inevitable.

ClickMotion · www.ClickMotion.dev
