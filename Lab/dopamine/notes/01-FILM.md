# 01 — Film (motion-section)

**Status:** **OFFICIALLY FROZEN** (human sign-off 2026-08-11)  
**Lab (solo):** http://localhost:3040/lab/film  
**Lab (sign-off):** http://localhost:3040/lab/film-footer  
**Module:** `app/src/sections/FilmMotion.tsx`  
**CSS:** `app/src/index.css` (`.motion-section*`)  
**Agent package:** [`../agent-packages/01-FILM-LAB-AGENT-PACKAGE.md`](../agent-packages/01-FILM-LAB-AGENT-PACKAGE.md)  
**Source HTML:** `research/raw/motion-section.html`  
**Source JS:** `Ge()` + `Ue()` in `research/raw/motion-section-from-main.js`  
**Source CSS:** `research/raw/css-motion-footer.css` (`.motion-section*`) — note clone **differs** on first-viewport spacing (see below)

---

## Copy (Dopamine)

| Source | Dopamine |
|--------|----------|
| 07. serotoninn film | **07. dopamine film** |
| A Vision in Motion | A Vision in Motion (keep) |
| Experience the essence of **Serotoninn**… | …**Dopamine**… |
| DISCOVER | DISCOVER |
| tip: scroll to dive | tip: scroll to dive |

---

## Structure (implemented)

```
section.motion-section
  .dop-container
    .motion-section__header     grid: auto | 1fr | auto  (z-index above pin)
      h2.motion-section__title
      p.motion-section__subtitle + dot_icon
      .motion-section__icons
      p.motion-section__text      full width row 2
  .motion-section__pin          negative margin-top pulls under headline
    a preventDefault
      .motion-section__bottom   --maskW
        .motion-section__cursor  [ DISCOVER ]
        video  StrangeSurreal.mp4
    p.motion-section__scroll
[+ 180vh spacer if !coupleWithFooter]
```

---

## Assets (wired)

| File | Role |
|------|------|
| **StrangeSurreal.mp4** | Main loop (~80 MB) |
| motion_poster.webp | Poster |
| bold_icon_1.svg, bold_icon_2.svg | Top icons |
| dot_icon.webp | Subtitle bullet |

`VIDEO_2.mp4` remains on disk as legacy extract — **not** wired.

---

## Motion constants (locked)

| Param | Value |
|-------|--------|
| Pin trigger | `.motion-section__pin` |
| endTrigger | `.footer` (or internal spacer) |
| start / end | `top top` → `bottom bottom` on endTrigger |
| pinSpacing | **false** |
| maskW mobile | 90 → 1000 |
| maskW tablet | 60 → 500 |
| maskW desktop | 30 → 440 |
| Video start scale | 1.2 → 1 over progress/0.3 |
| Mask aspect | 254/343 |
| Intro ST | section `top 75%`, scaleY lines, ease **power3.out** |
| Prop | `coupleWithFooter?: boolean` (default true) |

## First-viewport layout (frozen polish — intentional vs source)

Source desktop used ~**18rem** top padding and zeroed pin margin. Clone freezes a **tighter** composition so header + lips + tip fit one page:

| Breakpoint | `padding-top` (approx) | Pin `margin-top` |
|------------|------------------------|------------------|
| Mobile | 3.2rem | ~-0.28 × vh |
| Tablet | 3.6rem | ~-0.2 × vh |
| Desktop | **4rem** (not 18rem) | ~**-0.18 × vh** (not 0) |

Agents: do **not** restore the large top runway.

## Mask

Cloud/blob SVG path as CSS `mask` / `-webkit-mask` on `.motion-section__bottom`, size controlled by `--maskW`.

## Cursor

- Follows pointer inside mask bounds only  
- `mix-blend-mode: difference`  
- Class `.visible` toggles opacity  

## Layout rule

Use **`dop-container`**, never Tailwind `.container`.

## Gates (passed for freeze)

- [x] Enter: title/body scaleY reveal  
- [x] No large empty runway above headline  
- [x] Pin starts: small mask window on video  
- [x] Scroll through footer height: mask grows to full-bleed  
- [x] Video eases from 1.2 scale to 1  
- [x] Discover cursor only over masked video  
- [x] Tip visible pre-dive  
- [x] Editorial header no type collision  
- [x] Coupled lab clean (no chrome/runways)  

## Reopen

Set `film` to **OPEN** in `DECISIONS.md` before editing frozen paths.
