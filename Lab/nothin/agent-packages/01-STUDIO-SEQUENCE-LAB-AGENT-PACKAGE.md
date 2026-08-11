# 01 — Studio Sequence Lab — Agent Package

**Status:** **FROZEN**  
**Lab:** http://localhost:3032/lab/studio-sequence  
**Section:** `src/sections/StudioSequence.tsx`  
**Lab shell:** `src/pages/labs/StudioSequenceLab.tsx`  
**Setup:** [../SETUP.md](../SETUP.md)

## What it is

Scroll-pinned **camera pull-out**: start full-bleed inside looping video, pull back so the same video sits on the **NY street billboard** (`ny.png`). Not a free-floating shrinking video rect.

## Architecture

| Piece | Detail |
|-------|--------|
| World | `ny.png` object-cover + video shell in billboard |
| Motion | GSAP scale world `startScale → 1` around billboard center |
| startScale | 4-edge cover (off-center safe) |
| Pin | `+=280%`, scrub ~1.15 |
| Video | `/assets/studio/surreal.mp4` |
| Plate | `/assets/studio/ny.png` |
| Billboard | fractions in `StudioSequence.tsx` (`BILLBOARD`) |

## Dependencies

See SETUP.md — **gsap** (ScrollTrigger), **react**, Vite. No R3F.

## Assets required

```
public/assets/studio/ny.png
public/assets/studio/surreal.mp4
```

## Files (frozen)

| Path | Role |
|------|------|
| `sections/StudioSequence.tsx` | Pin + world scale |
| `pages/labs/StudioSequenceLab.tsx` | NothChrome (Menu only) + after strip |
| `notes/01-STUDIO-SEQUENCE.md` | Spec |

## Gates (for reopen only)

- [ ] t=0 full-bleed video (no plate rim)  
- [ ] Pull-out keeps video glued to facade  
- [ ] t=1 street readable, video in board  
- [ ] Menu :: only overlay  

## Reopen

Set `studio-sequence` to OPEN in `DECISIONS.md` before editing.
