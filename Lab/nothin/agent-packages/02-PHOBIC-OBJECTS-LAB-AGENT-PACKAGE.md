# 02 — Phobic Objects Lab — Agent Package

**Status:** **FROZEN**  
**Lab:** http://localhost:3032/lab/phobic-objects  
**Section:** `src/sections/PhobicObjects.tsx`  
**Data:** `src/data/phobic.ts`  
**Lab shell:** `src/pages/labs/PhobicObjectsLab.tsx`  
**Setup:** [../SETUP.md](../SETUP.md)

## What it is

Black void. Photo cutouts + letter debris **M O T I O N !**. Port of live noth.in **`Kv()`** on `.formes-w`.

## Behavior (do not re-invent)

| State | Action |
|-------|--------|
| No mouse in window | `apply(viewportCenter)` → objects **spread** |
| Mouse enters / moves | Real coords → home cluster or radial flee |
| Clear of rest | Elastic `x:0,y:0` |
| Near rest | Flee: `x/y = -cosθ·U, -sinθ·U`, L=`((R-d)/R)^1.6` |

Desktop params: influenceRadius **460**, maxDistance **380**, rotForce **30**, scaleForce **0.2**.

Source extract: `research/chunks/formes-kv-original.js`

## Cursor

Premium **white glow + trail** (not olive dot). Implemented in `PhobicObjects.tsx`.

## Dependencies

See SETUP.md — **gsap** tweens only (no InertiaPlugin / Club).

## Assets (wired)

```
papier-froisse.webp  asterix.webp  chwing.webp  bonbon.webp
fluff-orange.png     gold-die.png
```

under `public/assets/phobic/`.

## Files (frozen)

| Path | Role |
|------|------|
| `sections/PhobicObjects.tsx` | `Kv()` port + cursor |
| `data/phobic.ts` | Rest poses / sizes / letters |
| `pages/labs/PhobicObjectsLab.tsx` | Shell |
| `notes/02-PHOBIC-OBJECTS.md` | Spec |

## Gates (for reopen only)

- [ ] Idle spread without pointer  
- [ ] Enter pointer → pile settles then flees  
- [ ] Elastic return when clear  
- [ ] White-glow trail cursor  
- [ ] Letters MOTION! at varied sizes  

## Reopen

Set `phobic-objects` to OPEN in `DECISIONS.md` before editing.
