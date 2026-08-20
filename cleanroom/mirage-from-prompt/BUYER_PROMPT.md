# MIRAGE - Agency Desert Scroll Glass Hero

**Product ID:** `MS-HERO-MIRA01`  
**Price tier:** Pro (paid · PaidSalt `mg7k3p`)  
**Genre:** Agency · Creative · Full-viewport hero  
**Live reference build:** `/demo/cleanroom-mirage`  
**Canonical member prompt source:** `content/prompts/heroes/MS-HERO-MIRA01.mdx`  
**Clean-room component:** `MirageAgencyHero.tsx`

This file mirrors the sold prompt. Prefer MDX/CMS as the wire for members.

**Pack mode:** files zip + PDF (Studio-class folder). Rebuild from this brief plus `source/MirageAgencyHero.tsx` and `assets/mirage-desert-v1.mp4`.

---

## Promise (buyer-facing)

MIRAGE is a full-viewport **agency hero**. Desert film plays freely on the right. Five morphic liquid-glass story cards pivot on the left. Visitors do not scrub a film. They move through a crafted deck of work while the heat-haze subject holds the frame.

**No Scroller (pin-until-complete).** Scroll aims the cards. The page does not physically scroll during the viewing. When the journey ends, the pin **releases**. Then the **page owns the wheel** until the stage docks at the top of the viewport again. Pointer on the next sibling never drives the cards. Not a tall sticky track. Not GSAP ScrollTrigger. Not PSAVE. The film does not rewind.

**How you build it:** give your AI this brief plus the files pack. Tell it: *Build MIRAGE using the files in this folder. Read PROMPT.md. Prefer source/MirageAgencyHero.tsx. No Scroller: pin-until-complete. One 100dvh stage. Scroll aims virtual progress on 5 x 1.55 viewports. Cards follow that progress 1:1. Film free-plays muted. At 0 plus up, or 1 plus down, release. After release at the end, the page owns scroll until the stage docks (top >= 0). Do not install gsap or lenis. Do not build a tall multi-vh sticky track. Do not add PSAVE. Do not scrub the film.*

---

**You are an expert front-end engineer.** Build this design EXACTLY as specified.  
Do not invent a different aesthetic. Do not apply any host website marketing shell.  
Produce a production-ready React + TypeScript hero (`MirageAgencyHero`).  
Support prefers-reduced-motion. Mobile-first responsive.

Prefer integrating the pack source over rewriting the engine.

---

## Product

Advertising agency homepage: **MIRAGE**.

**Visual promise:** A scroll-as-narrative full-viewport hero. Morphic dark glass cards on the left. Free-playing desert film on the right. **No Scroller.** Scroll aims. The page stays still. After the last card, the page owns scroll until the hero docks. Not Folio mid-page section. Not Prism PSAVE. Not white frost.

**Signature interaction:** **No Scroller = pin-until-complete** plus **pin freeing**. One pinned `100dvh` stage. Wheel / trackpad / touch / keys set progress on a **5 × 1.55 viewport** track. Cards follow that progress 1:1. Film free-plays. After progress 1 plus down, the pin **releases** and the **page owns** the wheel until the stage docks.

---

## Asset contract (NON-NEGOTIABLE)

| Field | Value |
|-------|--------|
| Public path | `/assets/videos/mirage-desert-v1.mp4` |
| Pack file | `assets/mirage-desert-v1.mp4` |
| Poster | `/assets/posters/mirage-desert-v1.webp` |
| Encode | Silent loop, subject on the right |
| Time control | none. Film free-plays. Never seek. Never reverse. |

### FORBIDDEN

- Tall sticky multi-vh document scroll track
- Installing `gsap` or `lenis`
- PSAVE / GOP 3 / reverse video
- Keeping the pin armed after release
- Host (ClickMotion) chrome inside the component
- Storefront preview MP4 as rebuild media

```txt
Use ONLY the local paths above. Never substitute a storefront preview.
Scroll aims the cards. Film free-plays. After the last card, the page owns until dock.
```

---

## Locked constants

```
vhPerSheet = 1.55
VIRTUAL = max(2.4, sheets × 1.55)     // 7.75 at five sheets
rotateX = +64 → 0 → −64
sheet 0 from ≈ 0.38
object-position: 72% center
dock: stage.top >= -2
reduced-motion: static cards
```

React + TypeScript + framer-motion. **No GSAP. No ScrollTrigger. No Lenis. No PSAVE.**

---

## Design system

**Stage** `#07080F`. **Glass** `rgba(28, 30, 42, 0.38)` + `blur(36px) saturate(190%)`. **Gold** `#FDE68A`. **Cyan** `#7DD3FC`.

- H1: Syne 600, two lines, nowrap, `clamp(2.15rem, 4.4vw, 3.55rem)`
- Sheet titles: Syne 600
- Body: 13px, line-height 1.55
- Nav: text only, no bar

Morphic stack: shell → fill + specular → body above blur.

---

## Layout

- One `100dvh` section `#mirage-hero` in normal document flow
- No tall spacer. No sticky track. No GSAP pinSpacing
- Left rail + right subject space
- Next sibling after the hero is the buyer page (demo uses `#mirage-after` only as a release runway)
- Do not set `overflow: hidden` on the host page

---

## Motion (No Scroller + pin freeing)

```
virtualDistance = max(2.4, sheets × 1.55) * window.innerHeight
delta progress = wheelDeltaY / virtualDistance
```

Gestures map 1:1. No wheel gain. Cards follow `g` immediately.

| Event | Timing |
|-------|--------|
| Pin engage | section in view, page does not own the wheel |
| Sheet local t | slice of g with ~16% pad overlap |
| rotateX | +64° → 0° → −64° |
| Release | g≤0 + up, or g≥1 + down |
| Pin freeing | after g=1 + down, page owns until dock |
| Dock | stage.top >= -2 |
| Pointer on next sibling | never drives cards |

Root: `data-mirage-drive="pin"`. Owns: `data-mirage-owns="page"|"pin"`. Capture: `window.__msScrollNarrative` productId `MS-HERO-MIRA01`.

---

## Confirm after build

- Page scrollY stays 0 while two desktop flicks advance `g` (two 1800px flicks on 7.75 × 900 ≈ 0.516)
- Film is playing and does not seek
- After `g` hits 1, one more down-scroll moves the page
- After that release, scrolling up in the next section moves the page. Cards stay closed until the hero docks
- Reduced motion shows static cards
- No pin-spacer, no gsap, no lenis in the bundle for this hero

---

## What to tell your AI

Prefer pack `PROMPT.md` + `source/` + `assets/`. Then restage brand, headline, cards, and film from `CUSTOMIZATION.md`.

```
Build MIRAGE using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
No Scroller: pin-until-complete. One 100dvh stage. Scroll aims virtual progress on 5 x 1.55 viewports.
Cards follow that progress 1:1. Film free-plays muted. At 0 plus up, or 1 plus down, release.
After release at the end, the page owns scroll until the stage docks (top >= 0).
Do not install gsap or lenis. Do not build a tall multi-vh sticky track. Do not add PSAVE. Do not scrub the film.
```
