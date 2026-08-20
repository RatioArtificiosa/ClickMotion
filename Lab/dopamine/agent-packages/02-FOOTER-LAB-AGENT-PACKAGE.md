# 02 — Footer Lab — Agent Package

**Status:** **OFFICIALLY FROZEN** (human sign-off 2026-08-11)  
**Section id:** `footer`  
**Lab (solo):** http://localhost:3040/lab/footer  
**Lab (sign-off / coupled):** http://localhost:3040/lab/film-footer  
**Section:** `app/src/sections/SiteFooter.tsx`  
**Lab shells:** `app/src/pages/labs/FooterLab.tsx`, `FilmFooterLab.tsx`  
**CSS (frozen):** `app/src/index.css` — `.footer*`  
**Setup:** [../SETUP.md](../SETUP.md) · Shell: [00-LAB-SHELL.md](./00-LAB-SHELL.md)  
**Notes:** [../notes/02-FOOTER.md](../notes/02-FOOTER.md) · [../DECISIONS.md](../DECISIONS.md)

---

## 0. Mission for the agent

Port or **reuse** the complete serotoninn **footer** as **DOPAMINE**: masked section shape, Woman1 figure, dual nav, logo rise, subscribe form, Lottie discount badge, letter scramble, credits panel. Do **not** wire live commerce or external social URLs.

**Shell prerequisite:** read `00-LAB-SHELL.md` + `SETUP.md` first.

**Research authority:**

| Source | Path |
|--------|------|
| HTML slice | `research/raw/footer.html` |
| Motion JS | `research/chunks/footer-anim.js` |
| CSS | `research/raw/css-motion-footer.css` (`.footer*`) |
| Implementation | `app/src/sections/SiteFooter.tsx` + `index.css` + `lib/scramble.ts` |

---

## 1. What it is

Full-site-style **footer** with:

1. Responsive **CSS mask** background (mob / tablet / desk webp)  
2. Tall decorative figure (**Woman1.png**, height-driven)  
3. **Lottie** discount badge (canvas)  
4. Dual nav columns + scramble-on-enter  
5. DOPAMINE logo (React SVG) rising into place  
6. Subscribe form (client validation only)  
7. Bottom bar: copyright, privacy, Credits modal, **IG as text**  
8. Credits panel — **DOPAMINE-only** copy (no third-party names or links)

Also serves as **ScrollTrigger endTrigger** for the film pin (class **`footer`** on root).

---

## 2. Architecture

| Piece | Detail |
|-------|--------|
| Root | `<footer class="footer">` — **class name required** for film pin |
| Enter ST | `trigger: root`, `start: "top 80%"`, `once: true` |
| Logo | `yPercent: 300 → 0`, 1.2s `power3.out` @ 0 |
| Figure | `yPercent: 100 → 0`, 1.2s @ 0 |
| Form | opacity `0 → 1`, 2s `power2.out` @ 0 |
| Title | `scaleY: 0 → 1`, origin bottom, 0.8s @ 0.4 |
| Scramble | nav links + bottom children; 0.18s/char, stagger 0.04 |
| Lottie path | `/assets/lottie/FOOTER_LOTTIE_v1.json` |
| Lottie desktop enter | 0 → 0.5 (~0.9s ease-out cubic) |
| Lottie hover | progress → 1; leave → 0.5 |
| Lottie touch | 0 → 1 full |
| Figure file | `/assets/footer/Woman1.png` |
| Figure height | 42rem / 52rem / **65rem** (mob / tablet / desktop) |
| Container | **`dop-container`** |
| Links policy | `#` + `preventDefault`; IG = `<span>` not `<a href=https…>` |

---

## 3. Exact files to copy (file-for-file)

### 3.1 Section + labs

| # | Path under `app/src/` | Role |
|---|------------------------|------|
| 1 | `sections/SiteFooter.tsx` | Production section (do not fork) |
| 2 | `components/DopamineLogo.tsx` | Wordmark SVG |
| 3 | `lib/scramble.ts` | split + alphabet roll |
| 4 | `pages/labs/FooterLab.tsx` | Solo lab |
| 5 | `pages/labs/FilmFooterLab.tsx` | Coupled with film |

### 3.2 Shell (required)

| # | Path | Role |
|---|------|------|
| 6 | `components/SmoothScroll.tsx` | Lenis ↔ ST |
| 7 | `lib/lenis.ts` | Lenis |
| 8 | `index.css` | **All** `.footer*` rules, chars, credits, mask |
| 9 | `App.tsx` / `main.tsx` | Routes |

---

## 4. Static assets (`public/`)

### Required

| Path | Size (approx) | Used by |
|------|---------------|---------|
| `assets/footer/footer_bg_mob.webp` | ~11 KB | mask + picture fallback |
| `assets/footer/footer_bg_tablet.webp` | ~24 KB | mask ≥768 + picture |
| `assets/footer/footer_bg_desk.webp` | ~45 KB | mask ≥1024 |
| `assets/footer/footer_bg_desk-scaled.webp` | ~37 KB | picture srcSet ≥1024 |
| `assets/footer/Woman1.png` | ~540 KB | `.footer__img` |
| `assets/lottie/FOOTER_LOTTIE_v1.json` | **~2.6 MB** | discount badge |

### Present but not wired (do not delete)

| Path | Notes |
|------|--------|
| `assets/footer/footer_img.webp` | Original cutout superseded by Woman1 |
| `assets/footer/footer_logo.svg` | Source logo; clone uses DopamineLogo |
| `assets/lottie/LOTTIE_MARKER_v1.json` | Hover marker research |

---

## 5. npm dependencies (footer minimum)

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7.13.0",
    "gsap": "^3.13.0",
    "lenis": "^1.3.11",
    "lottie-web": "^5.13.0"
  }
}
```

---

## 6. Import graph

```
FooterLab.tsx
├── LabChrome.tsx
└── SiteFooter.tsx
    ├── DopamineLogo.tsx
    ├── scramble.ts (splitToChars, scrambleChars)
    ├── gsap + ScrollTrigger
    └── lottie-web

FilmFooterLab.tsx
├── FilmMotion.tsx
└── SiteFooter.tsx          ← also endTrigger for film pin
```

---

## 7. DOM structure (Dopamine)

```
footer.footer
  picture.footer__bg          desk-scaled / tablet / mob
  picture.footer__img         Woman1.png
  .footer__discount[data-lottie]
    button (hit area, opacity 0)
    .footer__discount-lottie  (host, injected)
  .dop-container
    .footer__top
      ul.footer__nav × 2      [data-split] labels
    .footer__mid
      a.footer__logo > DopamineLogo
      p.footer__title
      form.footer__form
    .footer__bottom
      p ©2026_DOPAMINE
      a privacy (preventDefault)
      button Credits
      span IG                  ← not external link
  .footer__credits-panel      DOPAMINE-only copy (frozen)
```

### Credits panel copy (locked)

```
Credits
Brand DOPAMINE
Film & footer motion system
A vision in motion · local lab study
Close
```

Accent class `.footer__credit-name`: red, **no underline**. Do not restore Serotoninn / blacklead.studio / artycoders.

### Nav data (in component)

**Shop:** Shop all, Categories, who we are, campaign, contact, collections, sale, 5-ht (disabled)  
**Legal:** Return, Impressum, Shipping and Payment, FAQ  

---

## 8. Scramble contract

1. On mount: `querySelectorAll("[data-split]")` → `splitToChars` → each letter becomes `span.char`.  
2. CSS: `.footer .char { opacity: 0 }` until timeline.  
3. `scrambleChars(chars, { durationPerChar: 0.18, stagger: 0.04 })` rolls a→…→target letter.  
4. Non-letters flash opacity only.

Do not replace with GSAP SplitText Club plugin unless reopened + licensed.

---

## 9. Lottie contract

| Condition | Behavior |
|-----------|----------|
| Desktop (`hover: hover` + fine pointer) | Enter anim 0→0.5; hover →1; leave →0.5 |
| Touch / coarse | Enter anim 0→1 once |
| Renderer | **canvas**, loop false, autoplay false |
| Host | `.footer__discount-lottie` absolute inset |

Frame animation uses RAF + ease-out cubic (not Lottie’s own play in all cases) — keep `useLottieFrameAnim` helper in the section.

---

## 10. Form contract

- `noValidate` on form  
- Invalid email → show `.input__error`  
- Valid → set submitted label **You're in**  
- **No** network request required  

---

## 11. Gates (for reopen only)

- [ ] Masked footer silhouette matches breakpoints (mob/tablet/desk)  
- [ ] Enter TL: logo rise, image rise, form fade, title scaleY  
- [ ] Scramble on nav + bottom readable  
- [ ] Lottie badge loads; hover completes on desktop  
- [ ] Woman1 tall on desktop (**65rem** height)  
- [ ] Dual nav grid desktop parity  
- [ ] Bottom: copyright, privacy, Credits, IG (text)  
- [ ] Credits panel open/close; DOPAMINE-only text; **no** external `http` links  
- [ ] Class `footer` present for film pin coupling  
- [ ] Brand DOPAMINE throughout  

---

## 12. Reopen

1. Human sets `footer` to **OPEN** in `DECISIONS.md`.  
2. Edit only listed frozen paths.  
3. QA `/lab/footer` and `/lab/film-footer`.  
4. Freeze again when signed off.

---

## 13. Do not

- Restore live Instagram / Blacklead / artycoders URLs or credit names  
- Use Tailwind `.container`  
- Size Woman1 with width-only (use height-driven CSS)  
- Delete Lottie JSON to “save space” without human OK  
- Swap Woman1 back to `footer_img.webp` without request  
- Edit ACTUALLY / ORION / NOTHIN' freezes  
