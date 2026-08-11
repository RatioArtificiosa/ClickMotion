# 00 — Lab shell (NOTHIN')

**Read first:** project **[SETUP.md](../SETUP.md)** (install + deps + freeze).

## Port & commands

| Item | Value |
|------|--------|
| Port | **3032** (Lab; source clone uses 3030) |
| App dir | `E:\Products\MS\Lab\nothin` (flattened) |
| Install | `npm install` |
| Dev | `npm run dev` |
| Build | `npm run build` |
| Preview | `npm run preview` |

```bash
cd E:\Products\MS\Lab\nothin
npm install
npm run dev
```

## Routes

| Path | Component |
|------|-----------|
| `/` | Hub |
| `/lab/studio-sequence` | StudioSequenceLab → StudioSequence |
| `/lab/phobic-objects` | PhobicObjectsLab → PhobicObjects |

## Stack

| Package | Use |
|---------|-----|
| react 19 | UI |
| react-router-dom 7 | Labs |
| gsap 3 | ST + tweens |
| lenis | Smooth scroll shell |
| vite 7 + tailwind 4 | Tooling |

**Not used in v1:** three, R3F, Club Inertia.

## Chrome

- Labs: **Menu ::** only (`NothChrome` defaults).  
- Do not reintroduce lab bottom bar on frozen labs unless reopened.

## Freeze

Both labs **FROZEN** — see `DECISIONS.md`. Do not edit section modules without human reopen.

## Catalog

Parent: `E:\website-tests\CATALOG.md` · `ports.md`
