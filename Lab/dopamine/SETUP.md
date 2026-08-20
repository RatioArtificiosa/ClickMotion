# DOPAMINE clone — complete setup & dependencies

**Project (working lab):** `E:\Products\MS\Lab\dopamine\`  
**Archive source:** `E:\website-tests\dopamine-clone\` (read-only)  
**Source site:** [https://serotoninn.com/](https://serotoninn.com/)  
**Clone brand:** **DOPAMINE** (SEROTONINN → DOPAMINE in all visible copy)  
**Dev port:** **3040**  
**Status (v1):** **OFFICIALLY FROZEN** — human sign-off 2026-08-11  
**Scope:** pre-footer **film** (`motion-section`) + **complete footer** only — not full homepage

| # | Section | Lab URL | Status |
|---|---------|---------|--------|
| 01 | Film (motion-section) | http://localhost:3040/lab/film | **FROZEN** |
| 02 | Footer | http://localhost:3040/lab/footer | **FROZEN** |
| 01+02 | Coupled pin (sign-off) | http://localhost:3040/lab/film-footer | **FROZEN** |

Hub: http://localhost:3040/

This file is the **single source of truth** for install, dependencies, assets, freeze rules, and agent handoff — same role as NOTHIN' / ACTUALLY packaging.

---

## 1. Prerequisites

| Tool | Version | Check |
|------|---------|--------|
| **Node.js** | **20 LTS** or **22 LTS** recommended (23+ also works) | `node -v` |
| **npm** | **10+** (ships with Node) | `npm -v` |
| **Git** | optional | not required to run |
| **Browser** | Chrome / Edge | **desktop pointer** for Discover cursor + Lottie hover |
| **Disk** | **~250 MB free** under `app/` | `StrangeSurreal.mp4` ~**80 MB** + Lottie ~2.6 MB + `node_modules` |

### License / plugins

| Item | Needed for v1? |
|------|----------------|
| Core **GSAP** (npm) | **Yes** — free |
| **ScrollTrigger** | **Yes** — free, ships with `gsap` |
| Club plugins (CustomEase, SplitText, …) | **No** — CustomEase approximated with `power3.out` |
| **lottie-web** | **Yes** — footer discount badge |
| Three.js / R3F | **No** |
| WordPress / PHP | **No** |
| Python / ffmpeg | **No** (research tooling only) |

---

## 2. Install (from zero)

```bash
cd E:\Products\MS\Lab\dopamine\app
npm install
```

Uses `package.json` + locked tree in `package-lock.json`. Do **not** delete the lockfile.

### 2.1 Exact dependency list (`app/package.json`)

**Runtime**

| Package | Range | Role |
|---------|--------|------|
| `react` | `^19.1.1` | UI |
| `react-dom` | `^19.1.1` | DOM renderer |
| `react-router-dom` | `^7.13.0` | Hub + lab routes |
| `gsap` | `^3.13.0` | ScrollTrigger pin, intro scaleY, footer enter TL, scramble |
| `lenis` | `^1.3.11` | Smooth scroll shell; `ScrollTrigger.update` on scroll |
| `lottie-web` | `^5.13.0` | Footer discount badge (canvas renderer) |

**Dev**

| Package | Range | Role |
|---------|--------|------|
| `vite` | `^7.1.7` | Dev server + production build |
| `@vitejs/plugin-react` | `^5.0.3` | React Fast Refresh |
| `typescript` | `~5.9.2` | Types / `tsc --noEmit` |
| `tailwindcss` | `^4.1.13` | Utility CSS base |
| `@tailwindcss/vite` | `^4.1.13` | Tailwind Vite plugin |
| `@types/react` | `^19.1.13` | React types |
| `@types/react-dom` | `^19.1.9` | React DOM types |

### 2.2 What is **not** a dependency

- `three`, `@react-three/fiber`, `@react-three/drei`
- GSAP Club packages / CDN trial plugins
- Framer Motion
- Extra CSS frameworks beyond Tailwind 4

---

## 3. Run

### Development

```bash
cd E:\Products\MS\Lab\dopamine\app
npm run dev
```

| Setting | Value | Where |
|---------|--------|--------|
| Port | **3040** | `vite.config.ts` + `package.json` scripts |
| `strictPort` | `true` | fails if 3040 is taken (do not silently shift) |
| Host | all interfaces (`host: true` / `--host`) | LAN QA |

Then open:

| URL | What |
|-----|------|
| http://localhost:3040/ | Lab hub |
| http://localhost:3040/lab/film-footer | **Sign-off** — film + footer coupled (no lab chrome / no runways) |
| http://localhost:3040/lab/film | Film only (`coupleWithFooter={false}` + internal spacer) |
| http://localhost:3040/lab/footer | Footer only (runway before) |

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev on **3040** |
| `npm run build` | `tsc --noEmit` + production bundle → `app/dist` |
| `npm run preview` | Serve production build on **3040** |

### Production build (optional)

```bash
cd E:\Products\MS\Lab\dopamine\app
npm run build
npm run preview
```

---

## 4. Project layout

```
Lab/dopamine/
├── SETUP.md                 ← this file (start here)
├── README.md                ← short map + agent entry
├── PROTOCOL.md              ← pointer to parent motion protocol
├── DECISIONS.md             ← freezes + stack choices
├── MASTER-PLAN.md           ← phases / status
├── CHECKLIST.md             ← executable gates
├── notes/
│   ├── 00-OVERVIEW.md
│   ├── 01-FILM.md
│   └── 02-FOOTER.md
├── agent-packages/          ← hand to AI agents
│   ├── README.md
│   ├── 00-LAB-SHELL.md
│   ├── 01-FILM-LAB-AGENT-PACKAGE.md
│   └── 02-FOOTER-LAB-AGENT-PACKAGE.md
├── research/                ← extracts, ref media (not required to run)
│   ├── RESEARCH.md
│   ├── GSAP-SPEC.md
│   ├── raw/                 # motion-section.html, footer.html, …
│   ├── chunks/              # main.js, footer-anim.js, main.css
│   └── assets/              # original downloads
└── app/                     ← runnable Vite app
    ├── package.json
    ├── package-lock.json
    ├── vite.config.ts       # port 3040, strictPort, host
    ├── tsconfig.json
    ├── index.html
    ├── public/assets/
    │   ├── film/            # StrangeSurreal.mp4, poster, icons
    │   ├── footer/          # bg masks, Woman1.png
    │   └── lottie/          # FOOTER_LOTTIE_v1.json
    └── src/
        ├── main.tsx
        ├── App.tsx            # routes
        ├── index.css          # Tailwind + film/footer CSS (critical)
        ├── components/        # SmoothScroll, LabChrome, DopamineLogo
        ├── lib/               # lenis.ts, scramble.ts
        ├── sections/
        │   ├── FilmMotion.tsx   # FROZEN
        │   └── SiteFooter.tsx   # FROZEN
        └── pages/
            ├── Hub.tsx
            └── labs/
                ├── FilmFooterLab.tsx   # FROZEN (sign-off)
                ├── FilmLab.tsx
                └── FooterLab.tsx
```

Labs import the **same** section modules any future Home would use (no forked lab logic).

---

## 5. Assets (must be present to run)

Paths are under `app/public/` and are served at the site root (e.g. `/assets/film/StrangeSurreal.mp4`).

### 5.1 Film — **required**

| File | Role | Approx size |
|------|------|-------------|
| `assets/film/StrangeSurreal.mp4` | **Active** film loop (wired in `FilmMotion.tsx`) | **~80 MB** |
| `assets/film/motion_poster.webp` | Video poster / fallback | ~22 KB |
| `assets/film/bold_icon_1.svg` | Title-row icon | ~2 KB |
| `assets/film/bold_icon_2.svg` | Title-row icon | ~1 KB |
| `assets/film/dot_icon.webp` | Subtitle bullet | ~2 KB |

Active constant in `FilmMotion.tsx`:

- Video → `/assets/film/StrangeSurreal.mp4`
- Poster → `/assets/film/motion_poster.webp`

### 5.2 Film — present, unused by frozen path

| File | Notes |
|------|--------|
| `VIDEO_2.mp4` | Original source extract (~4 MB); superseded by StrangeSurreal |
| `frame_*.jpg`, `poster_preview.*` | Research / leftover frames |

Safe to leave in place; do not delete for “cleanup” without human OK.

### 5.3 Footer — **required**

| File | Role | Approx size |
|------|------|-------------|
| `assets/footer/footer_bg_mob.webp` | Footer CSS mask + bg (mobile) | ~11 KB |
| `assets/footer/footer_bg_tablet.webp` | Mask / picture source ≥768 | ~24 KB |
| `assets/footer/footer_bg_desk.webp` | Mask CSS desktop | ~45 KB |
| `assets/footer/footer_bg_desk-scaled.webp` | Picture `srcSet` desktop | ~37 KB |
| `assets/footer/Woman1.png` | **Active** decorative figure | ~540 KB |
| `assets/lottie/FOOTER_LOTTIE_v1.json` | Discount badge animation | **~2.6 MB** |

Active figure in `SiteFooter.tsx`:

- Image → `/assets/footer/Woman1.png`
- Heights: mobile **42rem** · tablet **52rem** · desktop **65rem** (height-driven, not width-only)

### 5.4 Footer — present, unused by frozen path

| File | Notes |
|------|--------|
| `footer_img.webp` | Original cutout; replaced by Woman1 |
| `footer_logo.svg` | Source wordmark; clone uses `DopamineLogo` React SVG |
| `LOTTIE_MARKER_v1.json` | Hover marker research; not wired as live Lottie |

---

## 6. Section behavior (frozen summary)

### 01 — Film (`FilmMotion`)

- Scroll-pinned **lips/cloud SVG mask** over fashion film video.
- Pin **`.motion-section__pin`** → `endTrigger: .footer`, `end: bottom bottom`, **`pinSpacing: false`**.
- CSS mask size via **`--maskW`**: mobile **90→1000**, tablet **60→500**, desktop **30→440**.
- Video scale **1.2 → 1** over first **30%** of pin progress.
- Intro: subtitle / title / icons / body **scaleY 0→1** at section `top 75%`, ease **`power3.out`** (source CustomEase `0.75,0,0.25,1` approximation).
- Custom **[ DISCOVER ]** cursor inside mask bounds only (`mix-blend-mode: difference`).
- Tip: *scroll to dive* fades as mask opens (~first 22% progress).
- Prop `coupleWithFooter` (default `true`): when `false`, uses internal **180vh** spacer as endTrigger (film-only lab).
- Editorial header grid: `auto | 1fr | auto` — title | subtitle | icons; body full width below.
- Layout container class: **`dop-container`** — never Tailwind’s `.container` (it caps ~800px).
- **First viewport (frozen polish, not raw source):** tight top — desktop `padding-top` **~4rem** (not source 18rem); pin keeps **negative `margin-top`** on desktop (~**-0.18 × vh**) so header + lips + tip fit one screen. Do **not** reintroduce a top runway.

| Spec | Path |
|------|------|
| Section | `app/src/sections/FilmMotion.tsx` |
| CSS | `app/src/index.css` (`.motion-section*`) |
| Lab (solo) | `app/src/pages/labs/FilmLab.tsx` |
| Lab (coupled) | `app/src/pages/labs/FilmFooterLab.tsx` |
| Notes | `notes/01-FILM.md` |
| Agent package | `agent-packages/01-FILM-LAB-AGENT-PACKAGE.md` |
| Source compare | `research/raw/motion-section-from-main.js` (`Ge`/`Ue`) |

### 02 — Footer (`SiteFooter`)

- Full footer: responsive **mask-image** bg, Woman1 figure, dual nav, DOPAMINE logo, subscribe form, bottom bar, credits panel.
- Enter ST: `trigger: .footer`, `start: "top 80%"`, **once**.
- Logo `yPercent 300→0`, image `100→0` (1.2s power3.out); form opacity 0→1 (2s); title scaleY 0→1 @ 0.4s.
- Char **scramble** on `[data-split]` nav + bottom (`lib/scramble.ts` — alphabet roll).
- Lottie badge: desktop enter **0→0.5**, hover to **1**, leave back to **0.5**; touch plays **full**.
- Form: `novalidate` + client validity only (no live mail backend).
- **No external hyperlinks** — IG is a **text span**; nav `href="#"` + `preventDefault`.
- **Credits panel (frozen):** Brand **DOPAMINE** · Film & footer **motion system** · *A vision in motion · local lab study* — no Serotoninn / blacklead / artycoders; accent without underline.
- Brand: **©2026_DOPAMINE**, `DopamineLogo` SVG.

| Spec | Path |
|------|------|
| Section | `app/src/sections/SiteFooter.tsx` |
| Logo | `app/src/components/DopamineLogo.tsx` |
| Scramble | `app/src/lib/scramble.ts` |
| CSS | `app/src/index.css` (`.footer*`) |
| Lab (solo) | `app/src/pages/labs/FooterLab.tsx` |
| Notes | `notes/02-FOOTER.md` |
| Agent package | `agent-packages/02-FOOTER-LAB-AGENT-PACKAGE.md` |
| Source compare | `research/chunks/footer-anim.js` |

### Why film + footer are one system

Live pin math requires a **real `.footer`** as `endTrigger`. The **sign-off lab** is `/lab/film-footer` (`FilmFooterLab` = `<FilmMotion coupleWithFooter />` + `<SiteFooter />` only — **no** LabChrome, **no** runways).

---

## 7. Freeze rules (same discipline as ACTUALLY / ORION / NOTHIN')

Both sections + coupled lab are **OFFICIALLY FROZEN** (human sign-off **2026-08-11**):

1. Do **not** edit frozen section/lab/CSS/asset paths unless a human sets the lab to **OPEN** in `DECISIONS.md`.
2. Do **not** delete working labs or wired assets to “clean up”.
3. New work = new section id, or explicit reopen.
4. Parent protocol: `E:\website-tests\MOTION-CLONE-PROTOCOL.md`.
5. Do **not** touch frozen ACTUALLY / ORION / NOTHIN' projects while working here.
6. Do **not** “restore” source 18rem top padding, zero pin margin on desktop, or third-party credit names — those were intentionally changed at freeze.

### Frozen paths

```
app/src/sections/FilmMotion.tsx
app/src/sections/SiteFooter.tsx
app/src/components/DopamineLogo.tsx
app/src/lib/scramble.ts
app/src/lib/lenis.ts
app/src/components/SmoothScroll.tsx
app/src/pages/labs/FilmFooterLab.tsx
app/src/pages/labs/FilmLab.tsx
app/src/pages/labs/FooterLab.tsx
app/src/index.css                 # film + footer style blocks
app/public/assets/film/StrangeSurreal.mp4
app/public/assets/film/motion_poster.webp
app/public/assets/film/bold_icon_1.svg
app/public/assets/film/bold_icon_2.svg
app/public/assets/film/dot_icon.webp
app/public/assets/footer/Woman1.png
app/public/assets/footer/footer_bg_mob.webp
app/public/assets/footer/footer_bg_tablet.webp
app/public/assets/footer/footer_bg_desk.webp
app/public/assets/footer/footer_bg_desk-scaled.webp
app/public/assets/lottie/FOOTER_LOTTIE_v1.json
```

---

## 8. Post-install verification checklist

After `npm install && npm run dev`:

**Shell**

- [ ] http://localhost:3040/ loads hub with three lab links
- [ ] No terminal errors about missing modules

**Sign-off** (`/lab/film-footer`) — **primary QA**

- [ ] Cream page; editorial film header (label | title | icons; body below, no overlap)
- [ ] **No large empty runway above headline** — header near top; lips + tip visible in first viewport
- [ ] Pin: mask starts small on lips window; scroll expands to full-bleed while footer scrolls under pin
- [ ] Video plays muted loop; scale eases 1.2→1 early in pin
- [ ] **[ DISCOVER ]** cursor appears only over mask (desktop pointer)
- [ ] Tip fades as you dive
- [ ] Footer enter: logo/image rise, form fade, title scaleY, scramble on nav/bottom
- [ ] Lottie badge plays; hover completes on desktop
- [ ] Woman1 figure tall on desktop (~65rem height)
- [ ] Credits: DOPAMINE / motion system only (no third-party names or links)
- [ ] No chrome labels / runways on this route
- [ ] No live external outbound links (IG is text)

**Film solo** (`/lab/film`)

- [ ] Runway + LabChrome present
- [ ] Internal spacer ends pin when no footer

**Footer solo** (`/lab/footer`)

- [ ] Runway then footer enter animations fire on scroll

**Build (optional)**

```bash
cd E:\Products\MS\Lab\dopamine\app
npm run build
```

- [ ] Completes without TypeScript errors

---

## 9. Agent handoff order

Give an agent, in this order:

1. Parent `E:\website-tests\README.md` + `MOTION-CLONE-PROTOCOL.md` (if new to workspace)
2. This **`SETUP.md`**
3. `agent-packages/00-LAB-SHELL.md`
4. Section package: `01-FILM-…` and/or `02-FOOTER-…`
5. Matching `notes/0x-….md`
6. `DECISIONS.md` (freeze status)

**Reuse a section in another app:** copy the frozen file list from the section package + matching CSS blocks from `index.css` + public assets; wire Lenis/ST the same way as `SmoothScroll.tsx`.

---

## 10. Critical implementation rules (agents)

| Rule | Why |
|------|-----|
| Use **`dop-container`**, never Tailwind `.container` | Tailwind container max-width destroys full-bleed editorial width |
| Prefer **`/lab/film-footer`** for pin QA | Film pin needs a real `.footer` endTrigger |
| Keep **`pinSpacing: false`** | Source-accurate; spacing comes from section + footer height |
| Video = **StrangeSurreal.mp4** | Not VIDEO_2 unless reopened |
| Figure = **Woman1.png** @ **65rem** desktop height | Width-only sizing made figure too short |
| No external hyperlinks | Keep labels as text / `#` + preventDefault |
| Film first viewport tight | Desktop ~4rem top pad + negative pin margin — not source 18rem runway |
| Credits = DOPAMINE only | No Serotoninn / studio names in panel |
| Ease Club CustomEase → **`power3.out`** | No Club license required |
| Fonts: **Inter** + **IBM Plex Mono** | PP Fraktion Mono substitute (logged) |

---

## 11. Troubleshooting

| Symptom | Fix |
|---------|-----|
| Port 3040 busy | Free process, or change port in **both** `vite.config.ts` and `package.json`; update `ports.md` + CATALOG |
| Black lips window | Film is intentionally dark fashion footage — wait for brighter frames; confirm poster loads |
| Mask not expanding | Use **film-footer** lab so `.footer` exists; check ST in DevTools |
| Pin jumps / wrong end | `ScrollTrigger.refresh()` after images/video; Lenis must call `ScrollTrigger.update` |
| No scramble | `[data-split]` must exist; `.footer .char` starts `opacity:0` until TL |
| Lottie empty | Confirm `/assets/lottie/FOOTER_LOTTIE_v1.json` (~2.6 MB); Network tab 200 |
| Layout narrow / text crushed | Search for accidental `.container` class; must be `.dop-container` |
| Huge empty space above headline | Do not restore source 18rem top padding; frozen uses ~4rem + pin pull |
| Lips / tip off first screen | Keep desktop pin negative `margin-top`; do not set `margin-top: 0` |
| Woman1 too short | Desktop height must be **65rem** in `index.css` `.footer__img` |
| Video missing / 404 | Confirm `public/assets/film/StrangeSurreal.mp4` (~80 MB) exists |
| `npm run build` / tsc errors | `cd app && npx tsc --noEmit`; fix only after reopen if frozen paths |
| `EPERM` / lock on Windows | Close editors holding files; avoid two installs in same `app/` |

---

## 12. Multi-site ports (workspace)

| Port | Project |
|------|---------|
| 3010 | actually-clone |
| 3020 | orion-clone |
| 3030 | nothin-clone |
| **3040** | **Dopamine (`Lab/dopamine`)** |
| 3050+ | reserved |

---

## 13. Out of scope (v1)

Hero, shop, arrivals, categories, bold/story, menu, cart, preloader, full multi-section homepage, product pages, live newsletter backend, live Instagram URL.
