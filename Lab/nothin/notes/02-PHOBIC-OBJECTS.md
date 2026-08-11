# 02 — Phobic Objects (formes)

**Status:** **FROZEN** (2026-08-10) — reopen in `DECISIONS.md` before editing code.  
**Setup / deps:** [../SETUP.md](../SETUP.md)  
**Lab:** http://localhost:3032/lab/phobic-objects

## Source of truth

Live: `https://www.noth.in/` → `.formes-w`  
Shipped: `https://nothinv1.netlify.app/main.js` → function **`Kv()`**  
Extract: `research/chunks/formes-kv-original.js`

## Algorithm (exact port)

Objects keep a **CSS rest pose**. GSAP `x`/`y` are offsets from rest (home = `0,0`).

On each `mousemove` (viewport coords):

```
rest = visualCenter - currentGsapOffset   // o()
d = distance(mouse, rest)
if d < influenceRadius:
  θ = atan2(mouse.y - rest.y, mouse.x - rest.x)
  L = ((R - d) / R) ** 1.6
  U = L * maxDistance
  gsap.to(el, {
    x: -cos(θ) * U,
    y: -sin(θ) * U,
    rotation: baseRot - cos(θ) * L * rotForce,
    scale: 1 + L * scaleForce,
    duration: 0.45,
    ease: "power4.out",
    overwrite: "auto",
  })
else:
  gsap.to(el, {
    x: 0, y: 0, rotation: baseRot, scale: 1,
    duration: 1.2,
    ease: "elastic.out(1, 0.35)",
    overwrite: "auto",
  })
```

### Desktop params

| Param | Value |
|-------|--------|
| influenceRadius | **460** |
| maxDistance | **380** |
| rotForce | **30** |
| scaleForce | **0.2** |

Mobile (≤767): 260 / 110 / 12 / 0.1

## Why it feels like a half-circle

Flee direction is **radial from rest**, opposite the mouse. As the pointer
sweeps around an object’s home, θ rotates → the object arcs. When the pointer
leaves the influence bubble around **home**, the object elastically returns.

## Idle vs pointer-in (live screenshots)

| State | What live does | Look |
|-------|----------------|------|
| **No mouse** in window | `apply(viewportCenter)` | Objects **spread** (repelled from center) |
| **Mouse enters** even at edge | `apply(real mouse)` | If far from rest → **tight home cluster**; near rest → flee |

That is why image-1 (no mouse) is more open and image-2 (pointer in) piles up.

## Assets (wired · frozen)

| File | Role |
|------|------|
| `papier-froisse.webp` | Blue foil |
| `asterix.webp` | Asterisk balloon |
| `chwing.webp` | Pink cream |
| `bonbon.webp` | Silver candy |
| `fluff-orange.png` | Custom figure (replaced heart) |
| `gold-die.png` | Custom gold die |

Letters **M O T I O N !** are DOM text (see `data/phobic.ts`). Full inventory: [../SETUP.md](../SETUP.md) §5.

## Lab

http://localhost:3032/lab/phobic-objects · Menu :: only
