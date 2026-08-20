# 01 — Film Lab — Agent Package

**Status:** **OFFICIALLY FROZEN** (human sign-off 2026-08-11)  
**Section id:** `film`  
**Lab (solo):** http://localhost:3040/lab/film  
**Lab (sign-off / coupled):** http://localhost:3040/lab/film-footer  
**Section:** `app/src/sections/FilmMotion.tsx`  
**Lab shells:** `app/src/pages/labs/FilmLab.tsx`, `FilmFooterLab.tsx`  
**CSS (frozen):** `app/src/index.css` — `.motion-section*`  
**Setup:** [../SETUP.md](../SETUP.md) · Shell: [00-LAB-SHELL.md](./00-LAB-SHELL.md)  
**Notes:** [../notes/01-FILM.md](../notes/01-FILM.md) · [../DECISIONS.md](../DECISIONS.md)

---

## 0. Mission for the agent

Port or **reuse** the serotoninn **pre-footer film** section as **DOPAMINE**: editorial header, lips/cloud CSS mask pin, muted video, Discover cursor, tip line. Do **not** build hero/shop/home. Prefer the **coupled** lab for pin QA because `endTrigger` is the footer.

**Shell prerequisite:** read `00-LAB-SHELL.md` + `SETUP.md` first.

**Research authority:**

| Source | Path |
|--------|------|
| HTML slice | `research/raw/motion-section.html` |
| Pin + intro JS | `research/raw/motion-section-from-main.js` (`Ge`, `Ue`) |
| CSS | `research/raw/css-motion-footer.css` (`.motion-section*`) |
| Spec | `research/GSAP-SPEC.md` |
| Implementation | `app/src/sections/FilmMotion.tsx` + `index.css` |

---

## 1. What it is

Scroll-pinned **lips-shaped mask** over a full-bleed fashion film. As the user scrolls through the **footer height**, `--maskW` grows from a small window to full-bleed; video scale eases from **1.2 → 1** over the first **30%** of pin progress.

This is **not** a free-floating video card — the mask is a CSS `mask-image` cloud path sized by a CSS variable.

---

## 2. Architecture

| Piece | Detail |
|-------|--------|
| Section | `section.motion-section` height ~`3 * --inner-vh` |
| Pin target | `.motion-section__pin` |
| endTrigger (coupled) | `.footer` |
| endTrigger (solo) | internal `.film-pin-spacer` 180vh when `coupleWithFooter={false}` |
| Pin opts | `start: "top top"`, `end: "bottom bottom"`, **`pinSpacing: false`** |
| Mask var | `--maskW` % on `.motion-section__bottom` |
| Mask ranges | mobile 90→1000 · tablet 60→500 · desktop 30→440 |
| Mask aspect | `254/343` (cursor hit math) |
| Video scale | 1.2 → 1 over `progress / 0.3` |
| Ease | `power3.out` (Club CustomEase substitute) |
| Intro | scaleY reveal at `top 75%` once |
| Cursor | `[ DISCOVER ]` only inside mask bounds |
| Brand copy | `07. dopamine film`, essence of **Dopamine** |
| Video src | `/assets/film/StrangeSurreal.mp4` |
| Container | **`dop-container`** (never Tailwind `.container`) |
| First viewport | Tight top pad (~3.2–4rem) + pin negative `margin-top` so header + lips + tip fit one screen |
| Desktop top pad | **~4rem** — **not** source 18rem (that runway was intentionally removed at freeze) |
| Desktop pin margin | Keep ~**-0.18 × --inner-vh** — do **not** set `margin-top: 0` |

### Prop API

```ts
type Props = {
  /** default true — pin endTrigger is document .footer */
  coupleWithFooter?: boolean;
};
```

| Lab | Prop |
|-----|------|
| `FilmFooterLab` | `coupleWithFooter` (default true) |
| `FilmLab` | `coupleWithFooter={false}` |

---

## 3. Exact files to copy (file-for-file)

### 3.1 Section + labs

| # | Path under `app/src/` | Role |
|---|------------------------|------|
| 1 | `sections/FilmMotion.tsx` | Production section (do not fork) |
| 2 | `pages/labs/FilmLab.tsx` | Solo lab shell |
| 3 | `pages/labs/FilmFooterLab.tsx` | Coupled lab (with footer) |

### 3.2 Shell (required for motion)

| # | Path | Role |
|---|------|------|
| 4 | `components/SmoothScroll.tsx` | Lenis ↔ ST |
| 5 | `lib/lenis.ts` | Lenis instance |
| 6 | `index.css` | **All** `.motion-section*` rules + tokens + `.dop-container` |
| 7 | `App.tsx` / `main.tsx` | Routes / bootstrap |

### 3.3 Coupled dependency

Film pin **requires** a DOM element with class **`footer`** when `coupleWithFooter` is true. Copy **`SiteFooter`** (package 02) for sign-off, or provide a same-height stub with `className="footer"`.

---

## 4. Static assets (`public/`)

### Required

| Path | Size (approx) | Used by |
|------|---------------|---------|
| `assets/film/StrangeSurreal.mp4` | **~80 MB** | `<video>` source |
| `assets/film/motion_poster.webp` | ~22 KB | poster |
| `assets/film/bold_icon_1.svg` | ~2 KB | header icons |
| `assets/film/bold_icon_2.svg` | ~1 KB | header icons |
| `assets/film/dot_icon.webp` | ~2 KB | subtitle bullet |

### Optional / legacy (do not delete)

`VIDEO_2.mp4`, `frame_*.jpg`, `poster_preview.*` — research leftovers; **not** wired.

---

## 5. npm dependencies (film minimum)

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.13.0",
    "gsap": "^3.13.0",
    "lenis": "^1.3.11"
  }
}
```

Lottie is **not** required for film alone. For full sign-off lab, also install package 02 deps (`lottie-web`).

---

## 6. Import graph

```
FilmFooterLab.tsx
├── FilmMotion.tsx          (coupleWithFooter default true)
└── SiteFooter.tsx          (provides .footer endTrigger)

FilmLab.tsx
├── LabChrome.tsx
└── FilmMotion.tsx          (coupleWithFooter={false} → internal spacer)

SmoothScroll (App)
└── lenis + ScrollTrigger.update
```

---

## 7. Motion constants (locked)

| Param | Value |
|-------|--------|
| Intro ST start | `top 75%`, once |
| Intro targets | subtitle, title, icons, text — `scaleY 0→1`, origin bottom |
| Intro duration | 0.7s staggered slightly on body |
| Pin start | `top top` on pin |
| Pin end | footer `bottom bottom` |
| pinSpacing | **false** |
| Mask mobile | 90 → 1000 |
| Mask tablet | 60 → 500 (breakpoint 768) |
| Mask desktop | 30 → 440 (breakpoint 1024) |
| Video scale window | first 30% of pin progress |
| Tip fade | opacity `1 - progress/0.22` |
| Video play ST | `top 90%` prepare + play |

---

## 8. DOM structure (Dopamine)

```
section.motion-section
  .dop-container
    .motion-section__header   (grid auto | 1fr | auto)
      h2.motion-section__title
      p.motion-section__subtitle + img.dot
      .motion-section__icons
      p.motion-section__text
  .motion-section__pin
    a[href="#campaign"] preventDefault
      .motion-section__bottom   [--maskW]
        .motion-section__cursor  [ DISCOVER ]
        video.motion-section__video
    p.motion-section__scroll   tip: scroll to dive
[+ spacer when !coupleWithFooter]
```

---

## 9. Gates (for reopen only)

- [ ] Enter: title/body scaleY reveal at ~75% viewport  
- [ ] **No large empty runway above headline** — first view fits header + lips + tip  
- [ ] Pin start: small mask window on video  
- [ ] Scroll through footer: mask grows to full-bleed  
- [ ] Video eases 1.2 → 1 over early pin  
- [ ] Discover cursor only over masked region (desktop)  
- [ ] Tip visible pre-dive, fades as mask opens  
- [ ] Header: no overlapping type columns  
- [ ] Coupled lab has no LabChrome / runways  
- [ ] Brand says DOPAMINE not SEROTONINN  

---

## 10. Reopen

1. Human sets `film` (and coupled if needed) to **OPEN** in `DECISIONS.md`.  
2. Edit only listed frozen paths.  
3. Re-run gates on `/lab/film-footer`.  
4. Freeze again when signed off.

---

## 11. Do not

- Use Tailwind `.container`  
- Reintroduce Club CustomEase CDN  
- Swap video back to `VIDEO_2` without human request  
- Add external campaign URLs  
- Restore source **18rem** top padding or desktop pin `margin-top: 0`  
- Edit ACTUALLY / ORION / NOTHIN' freezes  
- “Clean up” by deleting StrangeSurreal or CSS mask rules  
