# DOPAMINE — Research (Serotoninn → film + footer)

**Date:** 2026-08-10  
**Source:** https://serotoninn.com/  
**Theme:** WordPress `ref` (Blacklead design / artycoders dev)

---

## 1. Scope of this research

Only:

1. **Film** — `section.motion-section` (“07. serotoninn film”)
2. **Footer** — `footer.footer`

Full homepage HTML saved for context; other sections ignored for build.

---

## 2. Local archive (compare against clone)

```
research/
├── RESEARCH.md                 ← this file
├── raw/
│   ├── homepage.html           # full SSR/markup (~927 KB)
│   ├── motion-section.html     # film only
│   ├── footer.html             # footer only
│   ├── css-motion-footer.css   # sliced rules
│   ├── motion-section-from-main.js  # Ge() + Ue()
│   ├── media-urls.txt
│   ├── scripts.txt
│   └── links.txt
├── chunks/
│   ├── main.js                 # film pin + site init
│   ├── footer-anim.js          # footer ST + scramble + lottie
│   ├── video-load.js
│   ├── custom-cursor.js
│   ├── loader.js               # GSAP / ST / Lenis / Lottie bundle
│   ├── main.css
│   └── loader.css
└── assets/
    ├── VIDEO_2.mp4             # film (~4.0 MB)
    ├── motion_poster.webp
    ├── campaign_video.webm     # extra (~9 MB; not primary film source)
    ├── FOOTER_LOTTIE_v1.json
    ├── LOTTIE_MARKER_v1.json
    ├── footer_logo.svg
    ├── footer_img.webp
    ├── footer_bg_mob.webp
    ├── footer_bg_tablet.webp
    ├── footer_bg_desk.webp
    ├── footer_bg_desk-scaled.webp
    ├── bold_icon_1.svg
    ├── bold_icon_2.svg
    └── dot_icon.webp
```

---

## 3. Stack (source)

| Concern | Implementation |
|---------|----------------|
| Core motion | **GSAP** + **ScrollTrigger** (bundled in `loader.js`, imported as `g` / `S`) |
| Smooth scroll | **Lenis** (`window.lenis`) |
| Lottie | **lottie-web** (`V.loadAnimation` in footer-anim) |
| Text split | Custom `text-split` + `.char` nodes; scramble A→letter in `footer-anim.js` |
| Video | Native `<video>` + lazy helpers in `video-load.js` |
| CSS | Theme `main.css` (not Tailwind on source) |
| Fonts | **Inter** (Google) + **PP Fraktion Mono** (nav/bottom) |
| Cursor (film) | Custom `[ DISCOVER ]` in-mask follower (not global custom-cursor only) |

**Not used in these sections:** Three.js / R3F / Framer Motion.

---

## 4. Film section anatomy

### Markup (verbatim structure)

See `raw/motion-section.html`:

- `.motion-section` > `.container` > top (title + icons) + mid (subtitle + text)
- `.motion-section__pin` > link > `.motion-section__bottom` > cursor + `<video>`
- `.motion-section__scroll` tip

### Video

| Attr | Value |
|------|--------|
| class | `motion-section__video lazy-video-section` |
| source | `/wp-content/uploads/2026/02/VIDEO_2.mp4` |
| poster | `motion_poster.webp` |
| flags | loop muted playsinline autoplay |

### Motion (`Ge()` in main.js)

```
pin: .motion-section__pin
start: "top top"
endTrigger: .footer
end: "bottom bottom"
pinSpacing: false

--maskW: lerp(from, to, progress)
  mobile  from 90  → to 1000
  tablet  from 60  → to 500
  desktop from 30  → to 440

video scale: 1.2 → 1 over progress 0..0.3
play when pin hits "top 90%"; pause on leaveBack
```

Mask shape: **SVG path** (343×254) as CSS mask on `.motion-section__bottom`, size `var(--maskW)`.

### Intro (`Ue()`)

ScrollTrigger `start: "top 75%"` on `.motion-section` — scaleY 0→1 from bottom on subtitle, text lines, title, icons. Custom ease `0.75,0,0.25,1`.

### CSS highlights

- Film bg `#fff9f7`
- Accent strong / tip `#ed3833`
- Subtitle ~8rem / 800 weight uppercase
- Pin height `100vh` (lvh / inner-vh vars)
- Section height ~2× vh (media-query variants also 3×)

---

## 5. Footer anatomy

### Structure

| Block | Content |
|-------|---------|
| `footer__bg` | picture desk/tablet/mob |
| `footer__img` | decorative model/product image |
| `footer__discount` | Lottie canvas + hit button |
| `footer__top` | 2× `footer__nav` (shop links + legal) |
| `footer__mid` | wordmark logo + Subscribe title + email form |
| `footer__bottom` | © / privacy / Credits / IG |

### Enter animation (`footer-anim.js` export `f` / `z`)

- ST: `trigger: .footer`, `start: "top 80%"`, `once: true`
- logo `yPercent: 300 → 0` (1.2s power3.out)
- img `yPercent: 100 → 0` (1.2s)
- form opacity 0→1 (2s)
- title `scaleY: 0 → 1` origin bottom (0.8s @ 0.4)
- Lottie play 0→0.5 (desktop) or 0→1 (touch) on enter; hover button completes to 1
- Nav + bottom: per-link char scramble (durationPerChar 0.18, stagger 0.04)

### Form

- `novalidate` applied in JS
- Email required; show `.input__error` on invalid submit
- Source posts via `mail.js` — clone can stub

---

## 6. Design studio credits (source)

- Design: [blacklead.studio](https://blacklead.studio/)
- Dev: [artycoders](https://www.instagram.com/artycoders/) (referenced in live credits UX)

---

## 7. Clone implications

1. **Must implement film+footer as coupled pin** for mask expand while scrolling footer.
2. Port scramble + lottie for platinum parity — not optional for “ultra premium.”
3. Extracted SVG mask path must be preserved (blob cloud, not a rectangle).
4. Runtime should use **local** copies under `app/public/assets/`.
5. Compare always against `research/raw/*` and `research/chunks/*`.
