# FOLIO — Buyer build prompt (MS-SEC-FOLI01)

**Product:** Mid-page scroll-pivot liquid glass **decision section**  
**SKU:** `MS-SEC-FOLI01`  
**Type:** `section` (not hero)  
**Mode:** One-way paper journey (edge-below → face → edge-above)  
**Drive:** **Pin-until-complete** (PRODUCT_LAW) — virtual progress, not tall multi-vh page scroll  
**Deck:** Hidden — only the active sheet is visible  
**Panels:** **5** large dense enterprise glass cards  
**Background:** Looping client HD motion film under glass (not video scrub)  
**Cleanroom:** `/demo/cleanroom-folio`  
**Component:** `FolioPivotSection.tsx` (`"use client"`, default export)  
**Canonical prompt:** `content/prompts/sections/MS-SEC-FOLI01.mdx`

---

## Signature

**Pinned `100dvh` stage** (one viewport). Wheel / trackpad / touch / keys advance **virtual journey progress 0→1**. **No traditional long-page scrollbar** through a multi-vh track. **Looping video** under a soft veil. Large **dark translucent liquid glass** sheets take a continuous `rotateX` journey as progress advances. Each sheet is a **dense board-ready decision panel**. Glass refracts the film. Animation art is the same paper pivot; only the **method** is pin-until-complete.

**Client embed:** section pins while the journey runs; at progress 0 scrolling up (or progress 1 scrolling down) **releases** so the host page can continue.

---

## Motion law

| Local progress | rotateX (approx) | Read |
|----------------|------------------|------|
| 0 | +72° | Edge from below |
| 0.22-0.78 | ~0° | Full face plateau |
| 1 | −72° | Edge above |

- Journey length effort ≈ `sheets × 1.55` viewports of wheel/trackpad (virtual, not document height)
- ~18% local-progress overlap + smoothstep for soft handoffs
- Dense keyframes; mild Y/scale; last sheet holds face longer
- Capture API: `window.__msScrollNarrative.setProgress(0..1)`
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

React + TypeScript + Framer Motion (`useMotionValue` / `useTransform` / `useReducedMotion`) + CSS liquid glass.  
**Not** document `useScroll` on a tall multi-vh track. No chart library required.

---

## Deliverable

1. `FolioPivotSection.tsx` - pin-until-complete + configurable sheets / kicker / heading / vhPerSheet / backgroundSrc  
2. Five dense pivot glass panels  
3. Client HD loop under glass  
4. Reduced motion + reduced transparency  
5. Demo `/demo/cleanroom-folio`  
6. Product folder + files zip + package PDF  
7. Sale wiring: store, MDX, packages, backgrounds, owner designs, gallery maps  

**Buyer AI must prefer pack `source/FolioPivotSection.tsx` and keep pin-until-complete.**
