# PRISM — Buyer build prompt (MS-HERO-PRSM01)

**Product:** Liquid-glass multi-panel identity hero  
**Mode:** Scroll-as-narrative (video scrub) + floating liquid glass panels on **both sides**  
**Film:** `prism-faces-v1.mp4` (from FacesFacesFaces)  
**Cleanroom:** `/demo/cleanroom-prism`  
**Component:** `PrismLiquidGlass.tsx` only (default export, `"use client"`)

---

## One-sentence signature

PRISM is an **identity studio** homepage: multi-face film center stage; Aether liquid-glass panels float on both sides with booking, proof, and invite copy.

---

## Media (locked roles)

| Role | Path |
|------|------|
| Public client HD | `/assets/videos/prism-faces-v1.mp4` |
| Poster | `/assets/posters/prism-faces-v1.webp` |
| Backgrounds small | `/assets/videos/backgrounds/prism-faces-bg-v1.mp4` |
| Master (repo) | `public/assets/videos/originals/prism-faces-master-v1.mp4` |

Video is **muted**. Scroll owns `currentTime`. No autoplay loop as primary.

---

## Liquid glass material (mandatory)

Implement glass as a **stack**, not blur alone (Setproduct practical guide + AetherCSS-style distortion):

1. **SVG filter once** in the document: `feTurbulence` + `feGaussianBlur` + `feDisplacementMap` (`#prism-glass-distortion`).
2. **Outer shell** — `backdrop-filter: blur + saturate`, soft fill `rgba(255,255,255,0.10–0.18)`, hairline border, multi-shadow.
3. **Specular** — top-edge white highlight, bottom occlusion, locked light ~10–12 o’clock (`linear-gradient(165deg, …)`).
4. **Stabilized plate** under content — denser dark wash so type stays readable on the face film.
5. **Tiers:** `thin` (chips/metrics, ~12px blur, no distortion), `standard` (~18px), `thick` (~24px + distortion filter).
6. **Fallback:** `prefers-reduced-transparency` → solid elevated surfaces, same layout.

**Do not** put glass on the whole viewport. Glass is **panels only** + thin nav/CTA chips. Center faces stay clear.

---

## Layout law (anti left-only trap)

- **Center** of the sticky stage: film sculpture remains open (no full-width text block).
- **Left AND right** margins host panels at staggered tops (18%–78%).
- **Many panels**, varied widths (~140–320px) and kinds:
  - chip · metric · stat · profile · quote · feature · cta
- Panels enter/exit by **scroll progress ranges** with soft fade + side slide.
- Mobile: single thick glass strip bottom (fewer surfaces).

---

## Chapters (film ↔ copy)

| Progress | Label | Mood |
|----------|--------|------|
| 0–34% | 01 · Spectrum | Intro feature left + metric/stat right |
| 34–66% | 02 · Margins | Quote right, profile left, chips both sides |
| 66–100% | 03 · Clarity | Feature left, quote + CTA right |

Chapter pill floats **top-center** (not left stack only).

---

## Design tokens

| Token | Value |
|-------|--------|
| Studio mist | `#E8EAEF` |
| Ink | `#0E1016` |
| Prism violet | `#A78BFA` / `#C4B5FD` |
| Prism cyan | `#67E8F9` |
| Soft fuchsia | `#F0ABFC` |
| Display | Syne 500–700 |
| UI | DM Sans 400–600 |
| Progress | violet → fuchsia → cyan |

---

## Technical

- React + TypeScript + Tailwind + GSAP ScrollTrigger (`scrub: ~0.55`)
- Track ~`520vh`; sticky `100vh` stage
- `prefers-reduced-motion`: static mid frame, no scrub, show mid constellation
- Capture-friendly: `seeked` listener resyncs panel opacity from `video.currentTime`

---

## Anti-slop

No purple mesh wallpaper, no emoji, no single left column of H1+body only, no full-screen frosted slab, no Meridian gold coastal, no Vertex mono, no Neon rain, no Revel pearl fashion clone, no Apple trademarks.

---

## Deliverable checklist

1. `PrismLiquidGlass.tsx` — default export, `"use client"`
2. Exact video/poster paths above
3. Multi-panel both-side field with tiered liquid glass
4. Scroll scrub signature
5. Reduced motion + reduced transparency paths
