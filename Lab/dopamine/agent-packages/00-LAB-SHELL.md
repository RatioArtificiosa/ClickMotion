# 00 — Lab shell (DOPAMINE)

**Read first:** project **[SETUP.md](../SETUP.md)** (install + deps + freeze).

## Port & commands

| Item | Value |
|------|--------|
| Port | **3040** |
| App dir | `Lab/dopamine/app` |
| Install | `npm install` |
| Dev | `npm run dev` |
| Build | `npm run build` |
| Preview | `npm run preview` |

```bash
cd E:\Products\MS\Lab\dopamine\app
npm install
npm run dev
```

## Routes

| Path | Component | Notes |
|------|-----------|--------|
| `/` | `Hub` | Entry map |
| `/lab/film-footer` | `FilmFooterLab` | **Sign-off** — Film + Footer, no chrome/runways |
| `/lab/film` | `FilmLab` | Film only + spacer; LabChrome + runways |
| `/lab/footer` | `FooterLab` | Footer only; LabChrome + runway |

Defined in `app/src/App.tsx`.

## Stack

| Package | Use |
|---------|-----|
| react 19 | UI |
| react-router-dom 7 | Labs |
| gsap 3 + ScrollTrigger | Pin, intro, footer TL, scramble |
| lenis | Smooth scroll shell |
| lottie-web | Footer discount badge |
| vite 7 + tailwind 4 | Tooling |

**Not used in v1:** three, R3F, Club GSAP plugins.

## Shell files (copy with any section)

| Path | Role |
|------|------|
| `src/main.tsx` | React root |
| `src/App.tsx` | Routes |
| `src/index.css` | Tokens + **all film/footer CSS** (not optional) |
| `src/components/SmoothScroll.tsx` | Lenis + ST update + vh vars |
| `src/lib/lenis.ts` | Lenis factory |
| `src/components/LabChrome.tsx` | Solo-lab floating chrome only |
| `src/pages/Hub.tsx` | Hub |
| `vite.config.ts` | port **3040**, `strictPort`, host |
| `package.json` | deps + scripts |
| `index.html` | root HTML (fonts if linked) |

## Chrome policy

| Lab | Chrome / runways |
|-----|------------------|
| **film-footer** | **None** — pure product surface for sign-off |
| film | LabChrome + before/after runway |
| footer | LabChrome + before runway |

Do not reintroduce lab chrome on the coupled lab unless reopened.

## Layout token

```css
/* MUST use this — never Tailwind .container */
.dop-container { width: 100%; max-width: none; padding: 0 1.6rem; }
```

## Freeze

Film + footer + coupled lab **OFFICIALLY FROZEN** (human sign-off 2026-08-11) — see `DECISIONS.md`.  
Do not edit section modules, film/footer CSS, or wired assets without human reopen.

## Catalog

Parent catalog (archive): `E:\website-tests\CATALOG.md` · MS lab: `E:\Products\MS\Lab\dopamine\`

## Multi-site ports

| Port | Project |
|------|---------|
| 3010 | Actually (`Lab/actually`) |
| 3020 | Orion / design-in-motion |
| 3030 | Nothin' (`Lab/nothin`) |
| **3040** | **Dopamine (`Lab/dopamine`)** |
