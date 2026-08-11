# NOTHIN' — Decisions

## 2026-08-10 — Project open

- Scope: **two sections only** (studio-sequence, phobic-objects).
- Source clone port **3030**; **MS Lab** copy runs on **3032** (avoids `Lab/design-in-motion`).
- Match GSAP + Lenis class stack; no Framer Motion default.
- **InertiaPlugin:** not required — Phobic uses open GSAP `to` (live `Kv()`); no Club license for v1.
- Studio Sequence: **world-scale camera pull-out** (not video-rect morph); plate `ny.png`, video `surreal.mp4`.
- Phobic Objects: **DOM + GSAP** radial flee from rest (live `.formes-w` / `Kv()`); idle = center repel (spread); custom white-glow cursor.
- Do not edit ORION frozen Design-in-Motion or ACTUALLY frozen assets without reopen.

## 2026-08-10 — MS Lab dual-section productization

- Lab path: `E:\Products\MS\Lab\nothin` (flattened Vite app; source remains `E:\website-tests\nothin-clone`).
- **Lab together:** one hub, shared shell, both labs runnable for parallel QA.
- **Production separate:** Studio Sequence and Phobic Objects ship as **independent SKUs** — no cross-section runtime dependency required at sale time.
- Suggested future IDs: `MS-SEC-STUDIO01` · `MS-SEC-PHOBIC01` (finalize when packaging).
- Frozen behavior unchanged; only path prefix differs (`src/` not `app/src/`).

## 2026-08-10 — Studio Sequence production (MS-SEC-STUDIO01)

- **Product id:** `MS-SEC-STUDIO01` · cleanroom `cleanroom/studio-from-prompt/` · demo `/demo/cleanroom-studio`
- **Dynamic video:** `videoSrc` prop + `studio-data.ts` — any film; default pure Surreal
- **Pure film (no UI frames):** `Lab/nothin/public/assets/studio/surreal.mp4` → client HD `/assets/videos/studio-surreal-v1.mp4`
- **Backgrounds:** small full-length encode `/assets/videos/backgrounds/studio-surreal-bg-v1.mp4` from pure film only
- **Storefront dual previews (full length, no trim):**  
  Small `Surreal-Studio-Small.mp4` → `studio-sequence-preview-v1.mp4`  
  FS `SurrealStudio.mp4` → `studio-sequence-preview-fs-v1.mp4`
- **Full-length law:** scroll never seeks video time; no CSS grade; loop full file
- Lab section accepts optional `videoSrc` / `plateSrc` for the same API as production

## Custom content (approved in session)

| Item | Decision |
|------|----------|
| Studio plate | `ny.png` (not Fremont) |
| Studio video | `surreal.mp4` (Premiere export) |
| Phobic letters | **M O T I O N !** (was NOTHIN debris) |
| Phobic heart slot | `fluff-orange.png` (user image as provided) |
| Phobic extra | `gold-die.png` |
| Chrome on labs | **Menu ::** only (no N′ / Sound / lab bottom bar on studio; phobic same Menu) |

## Freezes

| Lab | Status | Frozen (UTC date) |
|-----|--------|-------------------|
| studio-sequence | **FROZEN** | 2026-08-10 |
| phobic-objects | **FROZEN** | 2026-08-10 |

### Frozen paths (Lab/nothin)

```
src/sections/StudioSequence.tsx
src/sections/PhobicObjects.tsx
src/data/phobic.ts
src/pages/labs/StudioSequenceLab.tsx
src/pages/labs/PhobicObjectsLab.tsx
public/assets/studio/ny.png
public/assets/studio/surreal.mp4
public/assets/phobic/ (wired cutouts + custom PNG)
```

Human must set status back to **OPEN** in this file before agents edit frozen paths.

## Stack (final v1)

| Layer | Choice |
|-------|--------|
| Bundler | Vite 7 + React 19 |
| CSS | Tailwind 4 (`@tailwindcss/vite`) |
| Motion | GSAP 3 + ScrollTrigger |
| Smooth scroll | Lenis |
| Router | react-router-dom 7 |
| 3D | none in v1 |

Exact package ranges: see **[SETUP.md](./SETUP.md)** §2.1 (`package.json`).

## 2026-08-10 — Close-out

- Human closed Studio Sequence + Phobic Objects.
- Both labs **FROZEN**.
- Complete setup / deps / assets / freeze instructions: **[SETUP.md](./SETUP.md)**.
- Catalog + agent packages point at SETUP.md as install source of truth.
- Home assemble remains **out of scope** until reopened.
