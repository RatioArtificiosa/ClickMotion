# NOTHIN' clone — complete setup & dependencies

**MS Lab copy** (dual-section: lab together · production separate)  
**Project:** `E:\Products\MS\Lab\nothin\`  
**Source (read-only):** `E:\website-tests\nothin-clone\`  
**Source site:** [https://www.noth.in/](https://www.noth.in/)  
**Dev port:** **3032** (Lab; avoids 3030 used by design-in-motion + source nothin)  
**Status (v1):** both section labs **FROZEN** (2026-08-10)

> **Productization:** Studio Sequence and Phobic Objects share this lab for parallel work, but ship as **separate production SKUs** — no cross-dependency required at sale time.

| # | Section | Lab URL | Status |
|---|---------|---------|--------|
| 01 | Studio Sequence | http://localhost:3032/lab/studio-sequence | **FROZEN** |
| 02 | Phobic Objects | http://localhost:3032/lab/phobic-objects | **FROZEN** |

Hub: http://localhost:3032/

This file is the **single source of truth** for install, dependencies, assets, and freeze rules — same role as ACTUALLY’s agent-package + notes handoff, in one place.

---

## 1. Prerequisites

| Tool | Version | Check |
|------|---------|--------|
| **Node.js** | **20 LTS** or **22 LTS** recommended (23+ also works) | `node -v` |
| **npm** | **10+** (ships with Node) | `npm -v` |
| **Git** | optional | not required to run |
| **Browser** | Chrome / Edge / Firefox | **desktop pointer** for Phobic |
| **Disk** | ~400 MB free under `Lab/nothin/` | includes `surreal.mp4` (~273 MB) + `node_modules` |

### License / plugins

| Item | Needed for v1? |
|------|----------------|
| Core **GSAP** (npm) | **Yes** — free |
| **ScrollTrigger** | **Yes** — free, ships with `gsap` |
| Club plugins (Inertia, SplitText, Flip, …) | **No** |
| Three.js / R3F | **No** |
| Python / ffmpeg | **No** (research tooling only) |

---

## 2. Install (from zero)

```bash
cd E:\Products\MS\Lab\nothin
npm install
```

Uses `package.json` + locked tree in `package-lock.json`. Do **not** delete the lockfile.

### 2.1 Exact dependency list (`package.json`)

**Runtime**

| Package | Range | Role |
|---------|--------|------|
| `react` | `^19.1.1` | UI |
| `react-dom` | `^19.1.1` | DOM renderer |
| `react-router-dom` | `^7.13.0` | Hub + lab routes |
| `gsap` | `^3.13.0` | ScrollTrigger (Studio); tweens (`Kv()` port in Phobic) |
| `lenis` | `^1.3.11` | Smooth scroll shell |

**Dev**

| Package | Range | Role |
|---------|--------|------|
| `vite` | `^7.1.7` | Dev server + production build |
| `@vitejs/plugin-react` | `^5.0.3` | React Fast Refresh |
| `typescript` | `~5.9.2` | Types / `tsc -b` |
| `tailwindcss` | `^4.1.13` | Utility CSS |
| `@tailwindcss/vite` | `^4.1.13` | Tailwind Vite plugin |
| `@types/react` | `^19.1.13` | React types |
| `@types/react-dom` | `^19.1.9` | React DOM types |

### 2.2 What is **not** a dependency

- `three`, `@react-three/fiber`, `@react-three/drei`
- GSAP Club packages / CDN trial plugins
- Framer Motion
- Extra CSS frameworks

---

## 3. Run

### Development

```bash
cd E:\Products\MS\Lab\nothin
npm run dev
```

| Setting | Value | Where |
|---------|--------|--------|
| Port | **3032** | `vite.config.ts` + `package.json` scripts |
| `strictPort` | `true` | fails if 3032 is taken (do not silently shift) |
| Host | all interfaces (`host: true` / `--host`) | LAN QA |

Then open:

| URL | What |
|-----|------|
| http://localhost:3032/ | Lab hub |
| http://localhost:3032/lab/studio-sequence | Camera pull-out (video → NY billboard) |
| http://localhost:3032/lab/phobic-objects | Mouse-evading formes + glow cursor |

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev on **3032** |
| `npm run build` | `tsc -b` + production bundle → `dist` |
| `npm run preview` | Serve production build on **3032** |

### Production build (optional)

```bash
cd E:\Products\MS\Lab\nothin
npm run build
npm run preview
```

---

## 4. Project layout

```
Lab/nothin/
├── SETUP.md                 ← this file (start here)
├── README.md                ← short map + agent entry
├── PROTOCOL.md              ← pointer to parent motion protocol
├── DECISIONS.md             ← freezes + stack choices
├── MASTER-PLAN.md           ← phases / status
├── notes/
│   ├── 00-OVERVIEW.md
│   ├── 01-STUDIO-SEQUENCE.md
│   └── 02-PHOBIC-OBJECTS.md
├── agent-packages/          ← hand to AI agents
│   ├── README.md
│   ├── 00-LAB-SHELL.md
│   ├── 01-STUDIO-SEQUENCE-LAB-AGENT-PACKAGE.md
│   └── 02-PHOBIC-OBJECTS-LAB-AGENT-PACKAGE.md
├── research/                ← extracts, ref video, screenshots (not required to run)
├── package.json             # scripts on 3032
├── package-lock.json
├── vite.config.ts           # port 3032, strictPort, postcss pin
├── postcss.config.js        # empty — block monorepo Tailwind v3
├── tsconfig.json
├── index.html
├── public/assets/
│   ├── studio/              # ny.png, surreal.mp4, legacy plates/videos
│   └── phobic/              # cutouts + custom PNG
└── src/                     ← runnable Vite app (flattened, same as Lab/actually)
    ├── main.tsx
    ├── App.tsx              # routes
    ├── index.css            # Tailwind + tokens
    ├── components/          # NothChrome, LabChrome, SmoothScroll
    ├── data/phobic.ts       # rest poses / letter debris
    ├── lib/lenis.ts
    ├── sections/
    │   ├── StudioSequence.tsx   # FROZEN
    │   └── PhobicObjects.tsx    # FROZEN
    └── pages/
        ├── Hub.tsx
        └── labs/
            ├── StudioSequenceLab.tsx   # FROZEN
            └── PhobicObjectsLab.tsx    # FROZEN
```

Labs import the **same** section modules any future Home would use (no forked lab logic).

---

## 5. Assets (must be present to run)

Paths are under `public/` and are served at the site root (e.g. `/assets/studio/ny.png`).

### 5.1 Studio Sequence — **required**

| File | Role | Approx size |
|------|------|-------------|
| `assets/studio/ny.png` | Street plate (billboard stage) | ~1.7 MB (1920×1080) |
| `assets/studio/surreal.mp4` | Billboard video loop | **~273 MB** |

Active constants in `StudioSequence.tsx`:

- Plate → `/assets/studio/ny.png`
- Video → `/assets/studio/surreal.mp4`

If video is missing, drop your Premiere export at that path (or change `VIDEO_SRC`).

### 5.2 Studio — optional / legacy (present, unused by frozen path)

| File | Notes |
|------|--------|
| `manifeste.mp4`, `NOTHIN_MANIFESTE_CLEAN.mp4` | ~32 MB each; earlier loops |
| `fremont.png` | Previous plate |
| `*.webp`, frame JPGs | Research / leftovers |

Safe to leave in place; do not delete for “cleanup” without human OK.

### 5.3 Phobic Objects — **wired** (required)

| File | Role |
|------|------|
| `assets/phobic/papier-froisse.webp` | Blue foil (hero cutout) |
| `assets/phobic/asterix.webp` | Black asterisk balloon |
| `assets/phobic/chwing.webp` | Pink cream |
| `assets/phobic/bonbon.webp` | Silver candy |
| `assets/phobic/fluff-orange.png` | Custom figure (heart slot) |
| `assets/phobic/gold-die.png` | Custom gold die |

Letters **M O T I O N !** are **DOM text** (no image files). Layout, rest poses, and sizes live in `src/data/phobic.ts`.

### 5.4 Phobic — present but not all wired

Extra cutouts (`ballon.webp`, `chien.webp`, `smiley.webp`, …) may sit in the folder for research. Wiring is controlled only by `phobic.ts` + `PhobicObjects.tsx` (frozen).

---

## 6. Section behavior (frozen summary)

### 01 — Studio Sequence

- **World-scale** camera pull-out (not a free-floating shrinking video box).
- Video locked into the billboard rect on `ny.png` via `coverRect` + measured fractions.
- ScrollTrigger **pin `+=280%`**, scrub ~**1.15**, scale `startScale → 1` around billboard center (4-edge cover so off-center boards still full-bleed at t=0).
- Overlay chrome: **Menu ::** only (no debug bar / N′ / Sound).

| Spec | Path |
|------|------|
| Section | `src/sections/StudioSequence.tsx` |
| Lab | `src/pages/labs/StudioSequenceLab.tsx` |
| Notes | `notes/01-STUDIO-SEQUENCE.md` |
| Agent package | `agent-packages/01-STUDIO-SEQUENCE-LAB-AGENT-PACKAGE.md` |

### 02 — Phobic Objects

- Port of live **`Kv()`** on `.formes-w` (`research/chunks/formes-kv-original.js`).
- Rest poses in CSS; GSAP `x` / `y` offsets only.
- **No mouse** → `apply(viewportCenter)` → objects **spread**.
- **Mouse in** → real coords → rest cluster / radial flee + elastic return home.
- Desktop params: influence **460**, maxDist **380**, power **1.6**, rotForce **30**, scaleForce **0.2**.
- Premium **white glow cursor + trail**.
- Custom: fluff, gold die; letters **MOTION!**.

| Spec | Path |
|------|------|
| Section | `src/sections/PhobicObjects.tsx` |
| Data | `src/data/phobic.ts` |
| Lab | `src/pages/labs/PhobicObjectsLab.tsx` |
| Notes | `notes/02-PHOBIC-OBJECTS.md` |
| Agent package | `agent-packages/02-PHOBIC-OBJECTS-LAB-AGENT-PACKAGE.md` |

---

## 7. Freeze rules (same discipline as ACTUALLY / ORION)

Both labs are **FROZEN** as of 2026-08-10:

1. Do **not** edit frozen section/lab/data/asset paths unless a human sets the lab to **OPEN** in `DECISIONS.md`.
2. Do **not** delete working labs or wired assets to “clean up”.
3. New work = new section id, or explicit reopen.
4. Parent protocol: `E:\website-tests\MOTION-CLONE-PROTOCOL.md`.

### Frozen paths

```
src/sections/StudioSequence.tsx
src/sections/PhobicObjects.tsx
src/data/phobic.ts
src/pages/labs/StudioSequenceLab.tsx
src/pages/labs/PhobicObjectsLab.tsx
public/assets/studio/ny.png
public/assets/studio/surreal.mp4
public/assets/phobic/   (wired cutouts + custom PNG above)
```

---

## 8. Post-install verification checklist

After `npm install && npm run dev`:

**Shell**

- [ ] http://localhost:3032/ loads hub with both lab links
- [ ] No terminal errors about missing modules

**Studio** (`/lab/studio-sequence`)

- [ ] At top of scroll: full-bleed video (no street rim)
- [ ] Scroll: world pulls out; video stays glued to facade board
- [ ] End: NY street readable; video sits in gray billboard
- [ ] Overlay shows **Menu ::** only

**Phobic** (`/lab/phobic-objects`)

- [ ] Black void; cutouts + **MOTION!** visible
- [ ] Move mouse: near rest → flee; clear → elastic home
- [ ] Leave window / no pointer: objects **spread** (center repel)
- [ ] White glow cursor + short trail
- [ ] fluff + gold die present (not heart)

**Build (optional)**

```bash
cd E:\Products\MS\Lab\nothin
npm run build
```

- [ ] Completes without TypeScript errors

---

## 9. Agent handoff order

Give an agent, in this order:

1. Parent `E:\website-tests\README.md` + `MOTION-CLONE-PROTOCOL.md`
2. This **`SETUP.md`**
3. `agent-packages/00-LAB-SHELL.md`
4. Section package: `01-STUDIO-…` or `02-PHOBIC-…`
5. Matching `notes/0x-….md`
6. `DECISIONS.md` (freeze status)

---

## 10. Troubleshooting

| Symptom | Fix |
|---------|-----|
| port 3032 in use | Free the process, or change port in **both** `vite.config.ts` and `package.json` scripts; update `ports.md` + catalog |
| Blank / broken video | Confirm `public/assets/studio/surreal.mp4` exists (~273 MB); hard-refresh; check Network tab |
| Billboard misaligned | Re-check `BILLBOARD` fractions in frozen `StudioSequence.tsx` for `ny.png` (reopen first if editing) |
| Phobic always clustered | Leave window so idle uses viewport center (spread); re-enter pointer to settle |
| `npm run build` / tsc errors | `cd Lab/nothin && npx tsc --noEmit`; fix only non-frozen paths or reopen first |
| Tailwind styles missing | `@import "tailwindcss"` in `src/index.css` + `@tailwindcss/vite` in `vite.config.ts` |
| `EPERM` / lock on Windows | Close editors holding files; retry `npm install`; avoid concurrent installs in the same folder |
| Huge clone size | Expected — video alone is ~273 MB |

---

## 11. Multi-site ports (workspace)

| Port | Project |
|------|---------|
| 3010 | actually-clone |
| 3020 | orion-clone |
| **3032** | **Lab/nothin** (source nothin-clone / design-in-motion: 3030) |
| 3040+ | reserved |

See `E:\website-tests\ports.md` and `E:\website-tests\CATALOG.md`.

---

## 12. Out of scope (v1)

- Works grid, founders, full site menu, case studies  
- Full homepage assembly of the two labs  
- Three / WebGL studio path  
- Additional noth.in sections  

Reopen in `DECISIONS.md` before any of the above.

---

## 13. Quick reference card

```bash
# One-shot setup
cd E:\Products\MS\Lab\nothin
npm install
npm run dev
# → http://localhost:3032/
```

| Need | Where |
|------|--------|
| Install & deps | **This file** |
| Freezes | `DECISIONS.md` |
| Plan status | `MASTER-PLAN.md` |
| Short map | `README.md` |
| Agent packages | `agent-packages/` |
| Parent protocol | `../MOTION-CLONE-PROTOCOL.md` |
