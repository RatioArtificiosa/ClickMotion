# 02 — Footer

**Status:** **OFFICIALLY FROZEN** (human sign-off 2026-08-11)  
**Lab (solo):** http://localhost:3040/lab/footer  
**Lab (sign-off):** http://localhost:3040/lab/film-footer  
**Module:** `app/src/sections/SiteFooter.tsx`  
**CSS:** `app/src/index.css` (`.footer*`)  
**Agent package:** [`../agent-packages/02-FOOTER-LAB-AGENT-PACKAGE.md`](../agent-packages/02-FOOTER-LAB-AGENT-PACKAGE.md)  
**Source HTML:** `research/raw/footer.html`  
**Source JS:** `research/chunks/footer-anim.js`  
**Source CSS:** `research/raw/css-motion-footer.css` (`.footer*`)

---

## Copy (Dopamine)

| Source | Dopamine |
|--------|----------|
| ©2026_SEROTONINN | **©2026_DOPAMINE** |
| footer_logo.svg wordmark | **DopamineLogo** React SVG |
| Nav labels | Keep structure (Shop all, Categories, …) |
| IG / credits | **Text only** — no external hrefs |
| Credits modal | **DOPAMINE-only** (see locked copy below) |

---

## Structure (implemented)

```
footer.footer
  picture.footer__bg          desk-scaled / tablet / mob
  picture.footer__img         Woman1.png
  .footer__discount[data-lottie] > button + lottie host
  .dop-container
    .footer__top
      ul.footer__nav × 2
    .footer__mid
      a.footer__logo > DopamineLogo
      p.footer__title  Subscribe (latest news)
      form.footer__form
    .footer__bottom
      p copyright | a privacy | button Credits | span IG
  .footer__credits-panel
```

---

## Assets (wired)

| File | Role |
|------|------|
| footer_bg_mob / tablet / desk (+ desk-scaled) | Section mask + visual bg |
| **Woman1.png** | Decorative figure (height-driven) |
| FOOTER_LOTTIE_v1.json | Discount badge (~2.6 MB) |

Not wired: `footer_img.webp`, `footer_logo.svg`, `LOTTIE_MARKER_v1.json`.

### Figure sizes (CSS)

| Breakpoint | `.footer__img` height |
|------------|------------------------|
| Mobile | 42rem |
| Tablet (≥768) | 52rem |
| Desktop (≥1024) | **65rem** |

---

## Motion (footer-anim.js port)

| Target | From → To | Timing |
|--------|-----------|--------|
| `.footer__logo` | yPercent 300 → 0 | 1.2s power3.out @ 0 |
| `.footer__img` | yPercent 100 → 0 | 1.2s @ 0 |
| `.footer__form` | opacity 0 → 1 | 2s power2.out @ 0 |
| `.footer__title` | scaleY 0 → 1 (origin bottom) | 0.8s @ 0.4 |
| Lottie | 0 → 0.5 (desktop) / 1 (touch) | ~0.9s ease-out cubic |
| Nav/bottom chars | scramble alphabet → final | 0.18/char, stagger 0.04 |

ST: `trigger: .footer`, `start: "top 80%"`, `once: true`.

Helpers: `app/src/lib/scramble.ts` (`splitToChars`, `scrambleChars`).

## Form

- JS / React `noValidate`
- Invalid email shows `.input__error`
- Clone: preventDefault; no live mail backend

## Link policy (locked)

- All nav / privacy: `href="#"` + `preventDefault`
- IG: `<span>` with scramble text (not outbound)

## Credits panel (locked)

```
Credits
Brand DOPAMINE
Film & footer motion system
A vision in motion · local lab study
Close
```

- No Serotoninn / blacklead / artycoders  
- `.footer__credit-name`: red accent, **no underline** (not link-looking)

## Gates (passed for freeze)

- [x] Masked footer shape matches breakpoints  
- [x] Enter timeline (logo rise, scramble)  
- [x] Lottie badge interactive on hover (desktop)  
- [x] Dual nav grid desktop parity  
- [x] Bottom row copyright + policy + Credits + IG text  
- [x] Woman1 desktop height 65rem  
- [x] Credits DOPAMINE-only  
- [x] Class `footer` available as film endTrigger  

## Reopen

Set `footer` to **OPEN** in `DECISIONS.md` before editing frozen paths.
