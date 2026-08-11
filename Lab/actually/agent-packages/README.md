# ACTUALLY — Section Lab Agent Packages (Platinum Index)

**Project:** ACTUALLY ← [drinkstill.nz](https://www.drinkstill.nz/) pixel-perfect clone  
**App root:** `E:\website-tests\actually-clone\app\`  
**Dev server:** `npm run dev` → **http://localhost:3010**  
**Date frozen for this package set:** 2026-08-10  

---

## What this is

Six **isolated section labs** + **one shared shell package**. Each numbered section (01–06) has:

1. Its own route (`/lab/*`)
2. Its own lab page (thin shell only — **never forks** the production section)
3. A platinum **agent package** document you hand to an AI (or human) to **copy / rebuild / verify** that section in isolation

**Rule of isolation (lab-first protocol):**  
Tune motion on `/lab/…` → only after gates pass, assemble on `/` (Home).

---

## Lab map

| # | Section | Route | Pin | Runway before | Runway after | Agent package |
|---|---------|-------|-----|---------------|--------------|---------------|
| — | Full page | `/` | all pins | n/a | n/a | use section packs + shell |
| 00 | Lab shell | all labs | — | never layout runway before hero | pin sections only | [`00-LAB-SHELL.md`](./00-LAB-SHELL.md) |
| 01 | Hero | `/lab/hero` | `+=120%` scrub true, prio **3** | **NONE** | 60dvh strip | [`01-HERO-LAB-AGENT-PACKAGE.md`](./01-HERO-LAB-AGENT-PACKAGE.md) |
| 02 | Flavors | `/lab/flavors` | `3×vh` scrub 1, snap 4 | **NONE** | 45dvh strip | [`02-FLAVORS-LAB-AGENT-PACKAGE.md`](./02-FLAVORS-LAB-AGENT-PACKAGE.md) |
| 03 | Inside | `/lab/inside` | `4×vh` scrub 1, snap 5 | **NONE** | 45dvh strip | [`03-INSIDE-LAB-AGENT-PACKAGE.md`](./03-INSIDE-LAB-AGENT-PACKAGE.md) |
| 04 | Story | `/lab/story` | `(c-0.4)×vh` scrub 1 | **NONE** | 45dvh strip | [`04-STORY-LAB-AGENT-PACKAGE.md`](./04-STORY-LAB-AGENT-PACKAGE.md) |
| 05 | Press | `/lab/press` | **none** | **NONE** | **NONE** | [`05-PRESS-LAB-AGENT-PACKAGE.md`](./05-PRESS-LAB-AGENT-PACKAGE.md) |
| 06a | Stockists | `/lab/stockists` | **none** | **NONE** | **NONE** | [`06-SHOP-LAB-AGENT-PACKAGE.md`](./06-SHOP-LAB-AGENT-PACKAGE.md) §06a |
| 06b | Products | `/lab/products` | **none** | **NONE** | **NONE** | [`06-SHOP-LAB-AGENT-PACKAGE.md`](./06-SHOP-LAB-AGENT-PACKAGE.md) §06b |

### Runway policy (authoritative)

User directive + physics of these sections:

- **No layout runway before any section** in the lab. Sections stand alone; pin triggers use `start: "top top"` and engage correctly when the section is the first content.
- **Never** put a runway before Hero (loader + first paint own the viewport).
- **After-strip only for pin sections** (01–04): compact 45–60dvh so you can scrub past pin end and confirm release. Press/Shop do not pin → no strip.
- **Floating `LabChrome`** is `position: fixed` / `pointer-events` split — **does not** push layout or delay pin start.

---

## Source of truth hierarchy

When notes conflict, prefer in this order:

1. **Running lab** at `localhost:3010/lab/…` (implementation truth)
2. **`notes/GSAP-ANIMATIONS.md`** — durations, pin, snap, scrub numbers
3. **Section source** `app/src/sections/*.tsx` — DOM + wiring
4. **`notes/0N-*.md`** — copy/DOM from live extract
5. **`notes/CAN-3D.md` / `TOKENS.md`** — WebGL + design tokens
6. **`notes/GAPS-AUDIT.md`** — known earlier note errors

---

## Shared stack (all labs)

| Layer | Spec |
|-------|------|
| Framework | Vite 7 + React 19 + TypeScript |
| Styling | Tailwind v4 (`@tailwindcss/vite`) |
| Motion | GSAP 3.x + ScrollTrigger (+ SplitText fallback) |
| Scroll | Lenis `lerp: 0.1`, `smoothWheel: true` + `gsap.ticker` bridge, `lagSmoothing(0)` |
| 3D | three + `@react-three/fiber` + `@react-three/drei` (Environment, ContactShadows, useGLTF) |
| Router | `react-router-dom` v7 — labs + Home |
| Port | **3010** |

Brand rename only: **Still → ACTUALLY** (caps, period kept on wordmarks).

---

## How an agent should use a package

1. Read **`00-LAB-SHELL.md`** first (always).
2. Open the section package for the assigned number.
3. Copy **only** the files listed in that package’s file matrix.
4. Mount under SmoothScroll + lab shell (or App routes as documented).
5. Run the **acceptance gates** at the end of the package.
6. Do **not** edit frozen ORION or other clones. Do **not** fork section components for labs.

---

## Quick start (this repo)

```bash
cd E:\website-tests\actually-clone\app
npm install
npm run dev
# open http://localhost:3010/lab/hero  (etc.)
```

---

## File layout (labs + packages)

```
actually-clone/
├── agent-packages/                 ← YOU ARE HERE (hand these to agents)
│   ├── README.md
│   ├── 00-LAB-SHELL.md
│   ├── 01-HERO-LAB-AGENT-PACKAGE.md
│   ├── 02-FLAVORS-LAB-AGENT-PACKAGE.md
│   ├── 03-INSIDE-LAB-AGENT-PACKAGE.md
│   ├── 04-STORY-LAB-AGENT-PACKAGE.md
│   ├── 05-PRESS-LAB-AGENT-PACKAGE.md
│   └── 06-SHOP-LAB-AGENT-PACKAGE.md
├── notes/                          ← research truth
├── app/src/
│   ├── App.tsx                     ← routes
│   ├── pages/Home.tsx
│   ├── pages/labs/*Lab.tsx
│   ├── components/LabChrome.tsx
│   ├── sections/{Hero,Flavors,Inside,Story,Press,Shop}.tsx
│   └── …
└── app/public/                     ← glb, HDRI, labels, cans, story SVGs
```

---

*Platinum level: leave no pin number, asset path, or import edge undocumented. If a detail is missing from a package, pull it from GSAP-ANIMATIONS + the section source and amend the package.*
