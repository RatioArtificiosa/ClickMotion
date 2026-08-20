# 01 — Can Gallery agent package

**Section id:** `can-gallery`  
**Status:** **FROZEN** (2026-08-13)  
**Source (archive):** ciaoenergy.com inline `webgl-scene.js` + `gsap-page.js` + Webflow HUD  
**Routes:** `/lab/can-gallery` (product) · `/home` → lab  
**Port:** 3070

---

## 1. Purpose

Deliver an ultra-premium local Zero Energy experience:

- 6-flavor 3D can ring, grab/drag + wheel paging
- Profile close-up (camZ 6 / fov 40)
- Four benefit chapters + circular icon rail
- ZERO BULLSHIT argument mark
- Packshot swirl
- 9-item FAQ accordion + brand closer
- Source HUD chrome, Zero Energy copy, **zero outbound I/O**

---

## 2. Implementation files (frozen)

```
app/index.html
app/vite.config.ts
app/src/main.tsx
app/src/index.css
app/src/data/flavors.ts
app/src/data/copy.ts
app/src/pages/Hub.tsx
app/src/pages/CanGalleryLab.tsx
app/src/sections/can-gallery/CanGallery.tsx
app/src/sections/can-gallery/BenefitsNav.tsx
app/src/sections/can-gallery/BenefitsCopy.tsx
app/src/sections/can-gallery/ArgumentMark.tsx
app/src/sections/can-gallery/FaqSection.tsx
app/src/lib/webgl-scene.js
app/src/lib/hud-init.ts
app/public/css/**
app/public/fonts/**
app/public/img/**
app/public/textures/**
app/public/webgl/**
app/public/audio/**
```

---

## 3. Key constants (do not casual-change)

| Symbol | Value | Meaning |
|--------|-------|---------|
| Camera rest | `(0, 0, 29)` fov **20** | H1 gamme |
| Profile | camZ **6**, fov **40**, wave **0** | H2 close-up |
| Profile canRot | −37.5° / 15° / 22.5° | X / Y / Z |
| Profile canPos | `(0.5, -0.5, 0)` | |
| Benefits | camY −2, camZ 12, fov 20, spacing 2.2 | H3–H6 |
| Argument | camZ 8, fov 45, spacing 5, tint 2 | ZERO BULLSHIT |
| Packshot | cam (−3, −3.5, 20), fov 30, spacing **0.47**, swirl **1** | |
| Ring spacing | **3.5** | H1 |
| `target` start | **−1.5** | |
| Flavor count | **6** | even → offset **0** |
| Can count | 24 desktop / 12 low-power | 6 labels cloned |
| Bloom | UnrealBloom `(res, 0.1, 0.1, 1)` desktop only | |
| Clear | `0x000000` **alpha 0** | stage gradient shows through |
| SplitText in | `yPercent 110 → 0` | stagger 0.08 lines / 0.01 chars |
| Taste debounce | 150 ms | CSS vars |
| Desktop lastSnap | 6 | paging |
| Mobile lastSnap | 7 | `innerWidth < 1024` |
| FOUC class | `body.is-hud-ready` | added at end of `initHud` |

Full timeline table: `RESEARCH.md` §4 · `MOTION-SPEC.md`.

### Taste tokens

| Flavor | primary | secondary |
|--------|---------|-----------|
| Double Litchi | `#3D2B68` | `#9089D3` |
| Coco Citron Vert | `#27326B` | `#00A6E2` |
| Kiwi Concombre | `#024A44` | `#71BD96` |
| Pêche Blanche | `#BA5200` | `#EFB36B` |
| Pomme Rhubarbe | `#9B0984` | `#E6A0E8` |
| Abricot Framboise | `#800035` | `#FF659D` |

---

## 4. Behavioral contracts

### Input

| Input | Effect |
|-------|--------|
| Horizontal drag on **canvas** | `carousel.target` += delta; snap to spacing |
| Click side can | next / previous flavor |
| Click center can | page to profile (`section.items[1]`) |
| Wheel (desktop) | page ±1 section (slow indexes `[0,1,5,6]` 1.5s else 1.0s) |
| Arrows | carousel prev/next |
| Pager | liquid bar + flavor index |
| Sound ON/OFF | local mp3 toggle |
| Menu | Gamme / Bénéfices / FAQ — in-page only |
| Contact | `data-scroll-to="#FAQ"` |
| Benefit icons | `#benefits-1`…`#benefits-4` |
| FAQ question | accordion height 0 ↔ auto |

### Visibility

| Surface | Rule |
|---------|------|
| Hero chrome (nav, canvas, pager, discover, HUD corners) | Visible from first paint |
| Flavor titles / slides / descs | Hidden until `is-hud-ready`, then only **active** index |
| Benefits 1–4 / argument / title-bis / benefits_nav | Hidden until ready, then ST autoAlpha one chapter |
| Left HUD letters C / E / _ and profile title+body | **CSS `display: none`** (human request) |
| Lab badge | Always, 9px, opacity 0.28 |

### Local-only contract

| Public control | Must be |
|----------------|---------|
| Logo | `<a>` in-page or non-navigating — **not** ciaoenergy.com |
| Contact | `button`, not `<a href="mailto:…">` |
| Menu | `#` hashes only |
| Closer | Text only — **no** form, **no** sibforms |
| Social | **Absent** |
| Legal | **Absent** (no outbound) |

`hud-init.ts` `initInternalNav`: if `href` does not start with `#`, `preventDefault`.

---

## 5. Boot (must stay in this order)

`CanGallery` `useEffect`:

```
import webgl-scene.js
--loader-reveal = 0vh
await window.loader.play()
await initHud()          // ends with scrollTo(0) + is-hud-ready
cleanup: disposeHud()    // removes is-hud-ready, kills ST
```

`webgl-scene.js` publishes `window.loader`, `window.carousel`, `window.lenis`.

---

## 6. Data / content

| Module | Contents |
|--------|----------|
| `flavors.ts` | 6 flavors, titles, desc, hex — order **must** match `canLabels` |
| `copy.ts` | `BRAND`, 4 `BENEFITS`, 9 `FAQ`, `CLOSER` — **Zero Energy**, no emails/URLs |

Adding a flavor requires: webp in `public/textures/`, `canLabels` entry, `flavors.ts` row, taste stops on the pager gradient. Not a folder-drop.

---

## 7. QA gate (must pass after any reopen)

1. Cold reload: black first paint, then cans + Double Litchi — **no stacked chapters**
2. Drag works on the canvas
3. Scroll: profile → 4 benefits (one at a time) → argument → packshot → FAQ
4. FAQ 9 + accordion
5. Contact → FAQ; no mailto
6. Network: zero requests to original hosts
7. Labels + logo + fonts + audio 200 from **localhost**
8. Left letters gone; benefit icons present
9. Logo Z looks like the lockup file (designed cut)

Flash probe (optional): `research/_extract/verify_flash.mjs` — last run `leakCount 0`.

URL probe: `python research/_extract/scan_public_urls.py` — only SVG xmlns + lockfile.

---

## 8. Out of package (do not add under freeze)

- Home.tsx assembly
- Loader / flavor loop videos
- Legal pages
- Newsletter capture
- Replacing can labels with a new Zero Energy bake (needs human art + reopen)
- Three version bump
- Prefers-reduced-motion (source does not honor it)

---

## 9. Source references (archive)

```
research/raw/webgl-scene.js
research/raw/gsap-page.js
research/raw/sounds.js
research/raw/inline-style-*.css
research/homepage.html          ← may contain original URLs; do not ship
RESEARCH.md
MOTION-SPEC.md
DESIGN-SYSTEM.md
```

---

## 10. Platinum gates (this section)

| Gate | Status at freeze |
|------|------------------|
| Stack parity | Three 0.161 + Lenis 1.3 + GSAP/ST/SplitText |
| Asset parity | Required stills/GLB/HDR/fonts/audio local; videos **waived** (local-only) |
| Layout parity | Source HUD classes; ~99% vs ciaoenergy @ 1440×900 (logged) |
| Motion parity | Source data.* keyframes + Lenis seek clock |
| Z / stacking | Constitution in DESIGN-SYSTEM |
| Lab sign-off | Human freeze 2026-08-13 |
| Local-only | Scan clean |
| Docs | SETUP / FREEZE / AGENT-NOTES / 00 / 01 |
