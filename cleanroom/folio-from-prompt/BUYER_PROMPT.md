# FOLIO — Buyer build prompt (MS-SEC-FOLI01)

**Product:** Mid-page scroll-pivot liquid glass **decision section**  
**SKU:** `MS-SEC-FOLI01`  
**Type:** `section` (not hero)  
**Mode:** One-way paper journey (edge-below → face → edge-above)  
**Deck:** Hidden — only the active sheet is visible  
**Panels:** **5** large dense enterprise glass cards  
**Background:** Looping client HD motion film under glass (not scroll scrub)  
**Cleanroom:** `/demo/cleanroom-folio`  
**Component:** `FolioPivotSection.tsx` (`"use client"`, default export)  
**Canonical prompt:** `content/prompts/sections/MS-SEC-FOLI01.mdx`

---

## Signature

Sticky `100vh` stage inside a tall section track. **Looping video** under a soft veil. Large **dark translucent liquid glass** sheets take a continuous `rotateX` journey as the user scrolls. Each sheet is a **dense board-ready decision panel** (metrics, rows, lists, quotes). Glass refracts the film. One-way journey - sheets do not reverse.

---

## Motion law

| Local progress | rotateX (approx) | Read |
|----------------|------------------|------|
| 0 | +72° | Edge from below |
| 0.22-0.78 | ~0° | Full face plateau |
| 1 | −72° | Edge above |

- Track height ≈ `sheets × 1.55 × 100vh`
- ~18% local-progress overlap + smoothstep for soft handoffs
- Dense keyframes; mild Y/scale; last sheet holds face longer
- `prefers-reduced-motion`: static stacked cards, gradient fallback

---

## Liquid glass (Super Frontend Design / LG)

1. **Fill** - translucent white ~0.08-0.18 + blur 26px / saturate 185%
2. **Iridescence** - cyan / violet / rose edge wash
3. **Specular** - top-edge light catch only
4. **Hairline edge** + soft outer glow
5. **Content** - white type + text-shadow

---

## Media roles

| Role | Path |
|------|------|
| Client HD | `/assets/videos/folio-blurry-v1.mp4` |
| Backgrounds (small) | `/assets/videos/backgrounds/folio-blurry-bg-v1.mp4` |
| Storefront preview | `/assets/videos/folio-scroll-preview-v1.mp4` |
| Storefront FS | `/assets/videos/folio-scroll-preview-fs-v1.mp4` |
| Poster | `/assets/posters/folio-scroll-preview-v1.webp` |
| Thumbnail | `/thumbnails/MS-SEC-FOLI01.webp` |
| Package PDF | `/packages/MS-SEC-FOLI01/Folio-package-f0l1o9x4k7m2-fl8n3q.pdf` |

---

## Default story

**Kicker:** Enterprise growth system  
**Heading:** Five decisions that turn strategy into revenue.

| # | Eyebrow | Density |
|---|---------|---------|
| 01 | Mandate | 4 metrics + rows + chips |
| 02 | Insight | Split columns + evidence list |
| 03 | System | Operating rows + chips |
| 04 | Execution | Phase metrics + workstreams + kill criteria |
| 05 | Outcomes | Board KPIs + CRO quote + chips |

---

## Stack

React + TypeScript + Framer Motion (`useScroll` / `useTransform`) + CSS liquid glass. No chart library required.

---

## Deliverable

1. `FolioPivotSection.tsx` - configurable sheets / kicker / heading / backgroundSrc  
2. Five dense pivot glass panels  
3. Client HD loop under glass  
4. Reduced motion + reduced transparency  
5. Demo `/demo/cleanroom-folio`  
6. Sale wiring: store, MDX, packages, backgrounds, owner designs, gallery maps  
