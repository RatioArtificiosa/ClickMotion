# Lab · NOTHIN' (two section labs)

Isolated reconstruction of **noth.in** section labs for MS productization.

**Source (read-only — do not edit):** `E:\website-tests\nothin-clone\`  
**Full setup / deps / freeze:** **[SETUP.md](./SETUP.md)**  
**Agent packages:** `./agent-packages/`

## Two sections — lab together, production separate

| # | Section | Lab URL | MS product path (separate) | Status |
|---|---------|---------|----------------------------|--------|
| 01 | **Studio Sequence** | `/lab/studio-sequence` | Productize alone (billboard camera pull-out) | **FROZEN** |
| 02 | **Phobic Objects** | `/lab/phobic-objects` | Productize alone (mouse-evade formes + glow cursor) | **FROZEN** |

- **In this lab:** one Vite app, one hub, shared shell (Lenis, LabChrome). Work both sections side-by-side for QA and polish.
- **To production:** ship **each section as its own SKU / package**. Do not require the other. Shared deps (React, GSAP, Lenis) may land in each package independently; do not couple Studio ↔ Phobic in a single product SKU.

| Lab section | SKU id | Status |
|-------------|--------|--------|
| Studio Sequence | **`MS-SEC-STUDIO01`** | Production cleanroom + demo + backgrounds pure film |
| Phobic Objects | `MS-SEC-PHOBIC01` | Lab only (package later) |

### Studio Sequence production map

| Role | Path |
|------|------|
| Cleanroom | `E:\Products\MS\cleanroom\studio-from-prompt\` |
| Demo | http://localhost:3004/demo/cleanroom-studio |
| Pure film (no frames) | `public/assets/studio/surreal.mp4` → MS `/assets/videos/studio-surreal-v1.mp4` |
| Backgrounds tile | `/assets/videos/backgrounds/studio-surreal-bg-v1.mp4` |
| Dual storefront previews | `studio-sequence-preview-v1.mp4` + `…-fs-v1.mp4` (full length) |
| AI customize | `CUSTOMIZATION.md` — any video via `videoSrc` |

## Run

```bash
cd Lab/nothin
npm install
npm run dev
```

Default: **http://localhost:3032/**  
(Lab uses **3032** so it does not collide with source `nothin-clone` or `Lab/design-in-motion` on **3030**.)

| URL | What |
|-----|------|
| http://localhost:3032/ | Hub |
| http://localhost:3032/lab/studio-sequence | Studio cinematic |
| http://localhost:3032/lab/phobic-objects | Phobic formes |

## Lab map

| Route | Module | Notes |
|-------|--------|--------|
| `/` | `src/pages/Hub.tsx` | Links to both labs |
| `/lab/studio-sequence` | `StudioSequenceLab` → `sections/StudioSequence` | Pin scrub, video on NY plate |
| `/lab/phobic-objects` | `PhobicObjectsLab` → `sections/PhobicObjects` | Desktop pointer required |

## Rules

- Labs import production `src/sections/*` — **no forks**
- Both sections **FROZEN** (2026-08-10) — reopen in `DECISIONS.md` before edits
- Do **not** edit:  
  `src/sections/StudioSequence.tsx`, `src/sections/PhobicObjects.tsx`,  
  `src/data/phobic.ts`, lab pages, wired `public/assets/studio/*` + `public/assets/phobic/*`
- Source tree `E:\website-tests\nothin-clone\` is **not** modified from this lab
- Large asset: `public/assets/studio/surreal.mp4` (~273 MB) — required for Studio

## Sibling labs

| Lab | Path | Port |
|-----|------|------|
| ACTUALLY | `Lab/actually/` | 3010 |
| Design in Motion | `Lab/design-in-motion/` | 3030 |
| **NOTHIN'** | `Lab/nothin/` | **3032** |

## Agent handoff

1. **[SETUP.md](./SETUP.md)** — install, deps, assets, freeze, checklist  
2. `agent-packages/00-LAB-SHELL.md`  
3. Section package: `01-STUDIO-…` or `02-PHOBIC-…`  
4. Matching `notes/0x-….md`  
5. `DECISIONS.md`
