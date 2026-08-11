# 01 — Studio Sequence

**Status:** **FROZEN** (2026-08-10) — reopen in `DECISIONS.md` before editing code.  
**Setup / deps:** [../SETUP.md](../SETUP.md)  
**Lab:** http://localhost:3032/lab/studio-sequence

## User shots

1. Pink inflatable macro vs metal elevator panels  
2. Gallery corridor + fluorescent tubes + framed screen (foil figure + reader) + grass plaques  

## Live anchors

- `#studio-video`  
- Copy: “( The Studio ) We called it Nothin’…”  
- Assets: boule-chelou, beton-plastic, cadre, CDN white prop, user frames  

## Clone v2 — camera pull-out (NOT a shrinking video)

**Wrong model:** animate video `left/top/width/height` full → billboard (reads as free-floating TV shrinking).

**Right model:** one WORLD (Fremont + video locked in LED). Scroll scrubs **world scale** `startScale → 1` around the **billboard center**. Video shell size never changes in world space.

| Progress | State |
|----------|--------|
| 0 – ~0.06 | Video **full-bleed** (camera inside the LED) |
| 0.06 – 0.90 | Camera pull-out (smootherstep on scale) |
| 0.90 – 1 | Settled street; copy faded in |

- Pin `+=280%`, scrub **1.15**
- Stage plate: **`ny.png`** (1920×1080 NY street + gray board)  
- Billboard measured from plate gray fill (inside white frame):  
  **L 0.2521 · T 0.2630 · W 0.5026 · H 0.3870**
- Mapped through `coverRect()` so object-cover crop stays aligned
- **startScale** uses **4-edge cover** around billboard center  
  (`max(2·ox/w, 2·(cw−ox)/w, 2·oy/h, 2·(ch−oy)/h) × 1.03`)  
  Naive `max(cw/w, ch/h)` leaves a bottom gap when the LED is high → looks like shrink


## Assets

| File | Role |
|------|------|
| `public/assets/studio/ny.png` | Stage plate (street + billboard) |
| `public/assets/studio/fremont.png` | Previous plate (unused) |
| `public/assets/studio/surreal.mp4` | Bill board loop (Premiere Surreal.mp4) |
| `public/assets/studio/manifeste.mp4` | Previous manifesto loop |
| `public/assets/studio/NOTHIN_MANIFESTE_CLEAN.mp4` | Original manifesto name |

## Out of scope / not needed for frozen lab

Live pin % re-audit, WebGL/R3F camera path, sound stems — not required for the shipped world-scale pull-out.
