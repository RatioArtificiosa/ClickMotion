# Lab · ACTUALLY (section labs)

Isolated reconstruction of the **ACTUALLY** drinkstill.nz clone section labs.

**Source (read-only — do not edit):** `E:\website-tests\actually-clone\`  
**Agent packages:** `./agent-packages/` (copied platinum docs)

## Run

```bash
cd Lab/actually
npm install
npm run dev
```

Default: **http://localhost:3010/**  
If 3010 is taken by the source `actually-clone` app, Vite binds the next free port (this install was verified on **http://localhost:3011/**).

## Lab map

| # | Section | URL | After-strip |
|---|---------|-----|-------------|
| Full | Home | `/` | all assembled |
| 01 | Hero | `/lab/hero` | 60dvh |
| 02 | Flavors | `/lab/flavors` | 45dvh |
| 03 | Inside | `/lab/inside` | 45dvh |
| 04 | Story | `/lab/story` | 45dvh |
| 05 | Press | `/lab/press` | none |
| 06a | Stockists | `/lab/stockists` | none |
| 06b | Products | `/lab/products` | none |
| legacy | Shop | `/lab/shop` | → stockists |

## Rules

- Labs import production `src/sections/*` — **no forks**
- No layout runway **before** any lab (especially Hero)
- After-strip only on pin sections 01–04
- Floating `LabChrome` is fixed; pin `start: "top top"` stays correct
- ORION / actually-clone source trees are **not** modified here

## Sibling labs

- Design in Motion: `Lab/design-in-motion/` (port 3030)
- NOTHIN': `Lab/nothin/` (port **3032** — Studio + Phobic; productize separately)
