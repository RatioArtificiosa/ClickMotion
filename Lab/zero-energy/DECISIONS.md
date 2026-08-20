# Zero Energy — Decisions (append-only)

## OFFICIAL FREEZE — 2026-08-13 (human wrap-up)

**Status: FROZEN.** Do not edit the can-gallery section, lab, hub, WebGL, HUD init, copy, or wired public assets unless a human sets the section to **OPEN** below.

| Section id | Lab route | Home | Status |
|------------|-----------|------|--------|
| `can-gallery` | `/lab/can-gallery` | `/home` → lab | **FROZEN** |

**Agent packages:** complete — `SETUP.md` + `FREEZE.md` + `AGENT-NOTES.md` + `agent-packages/00`–`01`.  
**Sign-off URL:** http://localhost:3070/lab/can-gallery  
**Home assembly:** **waived**. The lab **is** the shipped homepage experience.

### Frozen path summary

```
app/index.html
app/vite.config.ts
app/src/**
app/public/css/**
app/public/fonts/**
app/public/img/**
app/public/textures/**
app/public/webgl/**
app/public/audio/**
```

### Locked at freeze

| Topic | Value |
|-------|--------|
| Brand | Zero Energy in all visible copy |
| Stack | Vite + React 19 + Three **0.161.0** + Lenis 1.3 + GSAP 3.13 + ST + SplitText |
| Local-only | No mailto / outbound href / CDN / fetch to original servers in shipped app |
| Logo Z | Designed cut — not a clip bug |
| Pointer-events | Overlays none; canvas + controls auto |
| First paint | `is-hud-ready` gate + `html` #000 |
| SplitText | Real `gsap/SplitText` (free in 3.13+), not a local fake |
| Videos | Omitted (were CDN-only) — accepted debt |

### Local-only seal

Freeze-time scan of `app/src` + `app/public` + `app/index.html`: no remote `http(s)` except SVG xmlns; no `mailto`; no ciaoenergy / sibforms / recaptcha / social host strings in runtime files.

### Reopen template (only if human requests)

```
## YYYY-MM-DD - Reopen
- Section: can-gallery
- Reason: …
- Status: OPEN
- Allowed paths: …
```

---

## 2026-08-12 — Project open

| Field | Value |
|-------|--------|
| Source | https://www.ciaoenergy.com/ |
| Clone name | **Zero Energy** |
| Port | **3070** |
| Scope | Whole homepage, **3D can gallery first** (lab-first) |
| Quality | Platinum exact |

### Stack

- Vite + React 19 + TypeScript (workspace convention).
- Motion stack **matched:** Three 0.161 + Lenis 1.3 + GSAP + ScrollTrigger.
- **SplitText (GSAP Club):** source uses `new SplitText(..., { type, mask: 'lines' })`. Clone uses a **local line/char mask helper** with the same yPercent 110 → 0 contract. Not a Club leak.
- Webflow / jQuery / Umami / Brevo recaptcha: **not** runtime deps. Newsletter can be a static form later.

### Brand rename

Visible “Ciao Energy” → **Zero Energy**. 3D can textures stay source art until human supplies Zero Energy labels (logged). Logo SVG initially source mark unless a Zero lockup is provided.

### Lab-first

Home (`/home`) is a hub / stub until `/lab/can-gallery` is frozen. Do not assemble full page first.

### Assets

Local copies under `research/assets/` → `app/public/`. Do not hotlink production CDN in the shipped clone.

### Frozen labs

| Section | Status |
|---------|--------|
| can-gallery | OPEN |
| (none frozen) | — |

### Do not touch

Other clones: k95 **3060 FROZEN**, dopamine, orion DIM, nothin, etc.

## 2026-08-12 — Can-gallery HUD rebuild (source chrome)

User screenshot bug = profile close-up with custom `.ze-*` HUD + `#root { background:#000 }` hiding `body::before` stage gradient, so the zoomed can read as a white/grey vertical wash.

Fix (lab still OPEN, not frozen):

- HUD/nav/pagination/arrows/titles use **source classnames + markup** (`navbar`, `hud`, `carousel_*`, `scroll_discover`).
- Linked missing `inline-0.css` + `inline-1.css` (fixed canvas + `gamme_container` / `profile_container`).
- `#root` / `body` backgrounds made transparent so the source `--loader-reveal` gradient and `is-profile-active` radial show through the alpha canvas.
- Ported source HUD JS to `app/src/lib/hud-init.ts` (carousel fade, liquid pager, colors, gamme/profile ST). GSAP 3.15 **includes SplitText** — using the real plugin, not a local fake.
- Lab chrome is a 9px overlay badge (no 12dvh header). Header was shifting scroll math and covering the logo.
- HUD init runs **after** `loader.play()` so the intro lerp cannot rotate the conic gradient or fire ST while scroll is unlocked.

### HUD pixel match @ 1440×900 vs ciaoenergy.com

| Surface | Result |
|---------|--------|
| Hero chrome boxes | **~99%** — navbar/logo/ON/title/arrows/pager/discover/HUD corners/gradient **exact px**. MENU +2px, Contact +2×−2w. |
| Profile chrome | **~99%** — title 147,353 392×86, body 147,468 392×79, title-bis 98,0 1244×900, next 1085,419 **exact**. |
| Residual | Lab badge; Contact ±2px; benefits_nav icons not in this lab yet. |

## 2026-08-12 — WebP labels + logo

User-supplied WebPs (same stem as the AVIFs). `* copy.webp` can labels copied to canonical `/textures/*.webp`. Scene `canLabels` and navbar logo now load `.webp`. Meta image wired as `og:image`. `spot-mask.avif` and `can-metallic-2.avif` unchanged (no WebP dropped).

## 2026-08-12 — Drag regression + icons + left copy

- Horizontal grab died because `.hud { pointer-events: auto }` covered the canvas. Overlays are now `none`; only nav/arrows/pager/icons capture.
- Added source `.benefits_nav` (4 circular icons) on the right from profile → last benefit.
- Removed floating left copy: HUD letters C/E/_ and profile title+paragraph. Hero flavor title at the bottom stays.

## 2026-08-12 — Copy + FAQ, no public contact surface

Human asked for all source text + FAQ, rebranded, and every public email / outbound link gone.

- Benefits 1–4, ZERO BULLSHIT mark, 9 FAQ items, and a closer live in `/lab/can-gallery` (same section module as future Home).
- Visible “Ciao Energy” → **Zero Energy**. Recipe facts kept (sugar, stevia, plant caffeine, France, vitamins).
- Benefits-4 strike typo `acéfulfame` → `acésulfame` (chemical name; FAQ already used the correct spelling).
- Removed from public view **and** shipped app code: `mailto:`, newsletter / Brevo / recaptcha, TikTok, Instagram, SKAALD credit, legal page hrefs, Webflow font/chevron CDN urls.
- Contact is a button that scrolls to FAQ. Menu no longer has Newsletter.
- Closer is a brand lockup, not a mail capture.
- Argument flavor videos omitted (they only existed on a remote CDN). Wordmark is local SVG + local mask.

## 2026-08-13 — Reload FOUC (stacked copy)

Reload showed every fixed chapter at once (benefits 1–4 + ZERO BULLSHIT + all flavor titles) for the seconds while WebGL + `loader.play()` + `initHud` ran. Those nodes are `position: fixed; inset: 0`.

Fix: linked `inline-1.css` (before React) hides them with `body:not(.is-hud-ready)`. `initHud` adds the class only after ST/autoAlpha and `scrollTo(0)`. `!important` so GSAP inline autoAlpha cannot leak a frame before the class. Hero chrome (nav, canvas, pager) stays visible.

### Z (corrected)

```
body::before / ::after   -1   (stage + profile radial)
canvas                   auto (under HUD)
.hud                     1
.section                 2    (transparent spacers + fixed containers)
.navbar                  10
```
