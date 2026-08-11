# ACTUALLY — Ultra-Thorough Notes for drinkstill.nz Clone
## Overview · 2026-08-09

This folder (`E:\website-tests\actually-clone`) is the **single source of truth** to rebuild drinkstill.nz pixel-perfect as **ACTUALLY** (Still → ACTUALLY in caps, period retained).

### What it is

drinkstill.nz is a **Next.js 15 + Turbopack + Vercel + Tailwind v4** single-page marketing site for STILL. — a nootropic canned beverage (1,150 mg active blend, 0 mg caffeine, Wellington, NZ). The page is **one long scroll** with sequential full-bleed sections, editorial typography, grain overlay, custom cursor, WebGL can everywhere, and ScrollTrigger-grade pin/scrub motion. No external analytics, no Google Fonts — **commercial Klim fonts self-hosted**.

### Site map (single route, hash-anchored)

| Order | Section id | Eyebrow | H2 | Background | Key content |
|-------|------------|---------|----|------------|-------------|
| Nav | `nav` fixed `z-50` | — | STILL wordmark + Flavors/Inside/Story/Stockists + Shop | transparent → bone on scroll | Mobile drawer `z-[60]` |
| 01 | `#hero` | 01 / The formula | Sustained natural focus, without caffeine. | `bg-ink #1a1b1d` with bone curtain | Giant STILL. wordmark 23vw + left copy 34vw + WebGL can + scroll hint — pinned + clip-path reveal |
| 02 | `#flavors` | 02 / Three flavors | Three formulations. | `bg-bone #efede6` | 3 slides STILL.01 Clear Cucumber & Yuzu / 02 Dawn Ginger & Bergamot / 03 Dusk Blackcurrant & Manuka — 12-col grid left copy / right can + ghost 01/02/03 strokes +Pagination 01 02 03 |
| 03 | `#inside` | 03 · Functional ingredients | Inside. | `bg-ink` | 4 ingredient cards L-Theanine 200 / Lion's Mane 500 / Rhodiola 150 / Bacopa 300 + tabs + dose bars + tagline FOUR FUNCTIONAL INPUTS |
| 04 | `#story` | 04 / STORY | Quietly built over five years. | `bg-bone` | Timeline 2021 flat white office → 2022 lab → 2023 Moore Wilson → 2024 Auckland → 2025 Melbourne + FIGS 01-05 images pinned scroll driven |
| 05 | `#press` | 05 / Press | Quietly noticed. | `bg-ink` | 3 pull quotes Meridian / Foldout / Quiet Hours + As featured in logotypes + Bloom canvas |
| 06 | `#shop` / `#stockists` | 06 / Where available | Find STILL in store, or order direct. | `bg-bone` | 15 stockists in 3 city columns + COMING SOON Melbourne/Sydney/London/NY/Tokyo + 3 shop cards $24NZD each Subscribe 15% + THE RANGE Order direct |
| Footer | `footer` | — | Get notified... | `bg-bone` | Email capture + legal |
| Extras | `grain-overlay z-90 fixed opacity .04` | — | Always on | SVG turbulence baseFrequency 0.82 | Custom cursor follower `z-30` 459px radial |

**RSC payload confirms order:** `Hero | Flavors | Inside | Story | Press | WhereAvailable | Footer` (`$Lb $Lc $Ld $Le $Lf $L10 $L11`).

### Where the raw is

- `raw/still_raw.html` — full SSR HTML (130KB)
- `raw/{hero,flavors,inside,story,press,shop}_raw.html` — per-section slices
- `raw/main.css` — compiled Tailwind 37KB (source of truth for tokens)
- `raw/icon.svg`, `assets/{still-01..03.png, og.png}` — downloaded assets (160–170KB each 1120×1400 RGBA, og 2400×1260)

### Clone rule

**Keep every element the same, change only where it says `Still` → `ACTUALLY` (caps, period kept).** That means: same fonts, same colors, same spacing, same motion, same grid, same copy structure, same images (can textures swapped to Actually labels). See per-section files `01-*.md` through `06-*.md` plus `CAN-3D.md` and `TOKENS.md` for verbatim rebuild spec.

### Build order for agents

1. Rebuild tokens + fonts + shell (TOKENS.md) → 2. One file per section in `sections/` (copy per raw + rename STILL→ACTUALLY) → 3. 3D can swap (CAN-3D.md) → 4. Assemble `page.tsx` in order above.

### What follows

- **`GSAP-ANIMATIONS.md`** — **authoritative motion spec** (solo re-audit 2026-08-09, no subagents). Use this for every duration/ease/pin/snap.
- **`GAPS-AUDIT.md`** — errors/gaps found in earlier agent notes vs live bundles (read first).
- `TOKENS.md` — colors, fonts, type scale, layout, grain, cursor, nav chrome
- `CAN-3D.md` — WebGL model/material/lighting/camera/interaction + Actually texture swap
- `01-HERO.md` → `06-SHOP.md` — per-section DOM/copy (motion subsections superseded by GSAP-ANIMATIONS where conflict)

### Motion inventory (live chunks)

| File | Role |
|------|------|
| `0cmb.wqv_a2_y.js` | App: Hero, Flavors, Inside, Story, Press, WhereAvailable, Can3D, TextReveal, ScrollIlluminate, loader |
| `0ba6j9d7gg207.js` | GSAP **3.15.0** + ScrollTrigger + SplitText + **DrawSVGPlugin** |
| `0wm4g9w3152qd.js` | Lenis `lerp:.1`, SmoothScroll ticker bridge, Nav, dual cursor, magnetic |
| `130z~aqg5aigg.js` | Bloom + **ScrollReveal** (simple y12 fade — not word scrub) |
| `15yffavnl8.tc.js` | Bloom only |

Raw extraction dumps: `raw/js/_audit_tmp/`.
