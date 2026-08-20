# HELIX - Liquid? No. Helical Design Gallery Section

**Product ID:** `MS-SEC-HELI01`  
**Price tier:** Pro (paid · PaidSalt `t2v8c6`)  
**Genre:** Agency · Design studio · Mid-page section  
**Live reference build:** `/demo/cleanroom-helix`  
**Canonical member prompt source:** `content/prompts/sections/MS-SEC-HELI01.mdx`  
**Clean-room components:** `HelixGallerySection.tsx` + `OrbitHelix.tsx`

This file mirrors the sold prompt. Prefer MDX/CMS as the wire for members.

**Pack mode:** files zip + PDF (Studio-class folder). Rebuild from this brief plus `source/` and `assets/orbit-0N.jpg`.

---

## Promise (buyer-facing)

HELIX is a mid-page **gallery carousel section** that turns scroll into a spatial presentation. Nine of **your** design pieces ride a WebGL cylindrical helix while giant titles cross the frame and a quiet center lockup holds the brand. Visitors do not skim a flat grid. They move through a crafted arc of work.

**No Scroller (pin-until-complete).** Scroll aims the helix. The page does not physically scroll during the viewing. When the journey ends, the pin **releases**. Then the **page owns the wheel** until the stage docks at the top of the viewport again. Pointer on the next sibling never drives the helix. Not a tall sticky track. Not GSAP ScrollTrigger. Not Lenis. Not PSAVE. There is no reverse-played film.

**How you build it:** give your AI this brief plus the files pack. Tell it: *Build HELIX using the files in this folder. Read PROMPT.md. Prefer source/HelixGallerySection.tsx and source/OrbitHelix.tsx. No Scroller: pin-until-complete. One 100dvh stage. Scroll aims on 5 viewports desktop / 3 mobile. Titles and helix follow progress 1:1. Release at 0 plus up or 1 plus down. After release at the end, the page owns scroll until the stage docks (top >= 0). Do not install gsap or lenis. Do not build a tall multi-vh sticky track. Do not add PSAVE.*

---

**You are an expert front-end engineer.** Build this design EXACTLY as specified.  
Do not invent a different aesthetic. Do not apply any host website marketing shell.  
Produce a production-ready React + TypeScript section (HelixGallerySection + OrbitHelix).  
Support prefers-reduced-motion. Mobile-first responsive.

Prefer integrating the pack source over rewriting the engine.

---

## Product

Design studio gallery: **HELIX**.

**Visual promise:** A scroll-as-narrative mid-page section on a studio-gray board. Nine of your stills ride a cylindrical helix. Giant type crosses. A quiet wordmark holds the center. **No Scroller.** Scroll aims. The page stays still. Not Folio glass sheets. Not Prism PSAVE. Not a left-column essay.

**Signature interaction:** **No Scroller = pin-until-complete.** One pinned `100dvh` stage. Wheel / trackpad / touch / keys set progress on a **5-viewport** (desktop) or **3-viewport** (mobile) track. Titles and helix follow that progress 1:1. After progress 1, the pin **releases** so the next sibling may continue.

---

## Asset contract (NON-NEGOTIABLE)

| Field | Value |
|-------|--------|
| Public path | `/assets/images/orbit/orbit-01.jpg` … `orbit-09.jpg` |
| Pack files | `assets/orbit-01.jpg` … `orbit-09.jpg` |
| Load order | reversed on the helix (09 → 01) |
| Encode | JPEG stills, portrait-ish ~568/812 |
| Time control | none. There is no film. |

### FORBIDDEN

- Tall sticky multi-vh document scroll track
- Installing `gsap` or `lenis`
- PSAVE / GOP 3 / reverse video
- Host (ClickMotion) chrome inside the component
- Storefront preview MP4 as rebuild media

```txt
Use ONLY the local paths above. Never substitute a CDN URL.
Scroll aims. The helix follows. Do not restore a tall pin spacer.
```

---

## Locked constants

```
desktop VIRTUAL_VIEWPORTS = 5
mobile  VIRTUAL_VIEWPORTS = 3   // innerWidth < 768
TITLE_PEAK_G = 0.18
SUBTITLE_FADE_G = 0.55
HELIX_G_END = 400 / 600
reduced-motion g = 0.45
```

React + TypeScript + three + @react-three/fiber. **No GSAP. No ScrollTrigger. No Lenis. No PSAVE.**

---

## Design system

**Stage** `#C3C3C3`. **Ink** `#0a0a0a` / `#1a1a1a`. **Rails** `#9E9E9E` at 50%.

- Giant titles: Inter / Neue Haas / Helvetica Neue, uppercase, `clamp(3.25rem, 13vw, 9.5rem)`, tracking `-0.04em`, line-height `0.8`
- Wordmark: Birthstone (or buyer script), `clamp(1.85rem, 3.6vw, 2.75rem)`
- Center lines: 12-13px uppercase tracking `0.08em`
- Concepts: 13-14px, max-width ~16rem, bottom-left

Camera (do not tilt lookY): mobile z 28 fov 58 · tablet z 24 fov 54 · desktop z 22 fov 52.

Helix: radius 12, pitch 28 over 2 turns, spacing 6.2, load order orbit-09 → orbit-01.

---

## Layout

- One `100dvh` section `#helix-gallery` in normal document flow
- No tall spacer. No sticky track. No GSAP pinSpacing
- Stack: z-0 titles + concepts; z-1 WebGL canvas
- Next sibling after the section is the buyer page (demo uses `#helix-after` only as a release runway)
- Do not set `overflow: hidden` on the host page

---

## Content slots (every string is replaceable)

| Slot | Default |
|------|---------|
| Title A | Design in |
| Title B | motion |
| Wordmark | ClickMotion |
| Center L1 | Exploring ideas through |
| Center L2 | daily design practice. |
| Concepts | Concepts, explorations… |
| Cards | orbit-01 … orbit-09 |
| Stage | `#C3C3C3` |

---

## Motion (No Scroller)

```
virtualDistance = VIRTUAL_VIEWPORTS * window.innerHeight
delta progress = wheelDeltaY / virtualDistance
```

Gestures map 1:1. No wheel gain. Titles and helix follow `g` immediately.

| Event | Timing |
|-------|--------|
| Title A | `-100vw` → `+100vw`, peak ~g=0.18 |
| Title B | `+100vw` → `-100vw` |
| Center lockup fade | after g≈0.55 |
| Helix P | `min(1, g / (400/600))` |
| Release | g≤0 + up, or g≥1 + down |
| Pin freeing | after g=1 + down, page owns until dock (`top >= -2`) |

Reduced motion: static mid pose `g≈0.45`.

Root: `data-helix-drive="pin"`. After release: `data-helix-owns="page"`. Capture: `window.__msScrollNarrative` includes `pageOwns`. ProductId `MS-SEC-HELI01`.

---

## Confirm after build

- Page scrollY stays 0 while two desktop flicks advance `g` (two 1800px flicks on 5 x 900 = 0.8)
- Titles cross; cards ride the helix; rails grow
- After `g` hits 1, one more down-scroll moves the page
- After release, scrolling up in the next section moves the page, not the helix
- Reduced motion shows the mid pose
- No pin-spacer, no gsap, no lenis, no SmoothScroll in the bundle for this section

---

## What to tell your AI

Prefer pack `PROMPT.md` + `source/` + `assets/`. Then restage brand, titles, cards, and color from `CUSTOMIZATION.md`.

```
Build HELIX using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
No Scroller: pin-until-complete. One 100dvh stage. Scroll aims on 5 viewports desktop / 3 mobile.
Titles and helix follow progress 1:1. Release at 0 plus up or 1 plus down.
After release at the end, the page owns scroll until the stage docks (top >= 0).
Do not install gsap or lenis. Do not build a tall multi-vh sticky track. Do not add PSAVE.
```
