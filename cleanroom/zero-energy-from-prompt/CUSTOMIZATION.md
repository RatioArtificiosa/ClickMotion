# ZERO ENERGY — customization

Rebrand. Do not rewrite the clock.

## Safe swaps

| What | Where |
|------|--------|
| Flavor names + copy | `data/flavors.ts` — keep **six** items, same order as `canLabels` |
| Benefit + FAQ + closer | `data/copy.ts` |
| Can labels | `/assets/zero-energy/textures/zero-energy_texture_*.webp` |
| Logo | `/assets/zero-energy/img/zero-energy_logo.webp` — the Z cut is designed |
| GLB / HDR | `/assets/zero-energy/webgl/` |

## Do not change without a human reopen

- `three` version (0.161.0 exact)
- Lenis `{ infinite: true, autoRaf: false }`
- Timeline seek from Lenis (do not switch to `ScrollTrigger.scrub`)
- Carousel spacing `3.5`, camera FOV `20`, low-power DPR rules
- Logo Z geometry
- Adding outbound links, mailto, CDN, fetch

## Asset names (canonical)

```
zero-energy_texture_double-litchi.webp
zero-energy_texture_coco-citron-vert.webp
zero-energy_texture_Kiwi-Concombre.webp
zero-energy_texture_peche-blanche.webp
zero-energy_texture_pomme-rhubarbe.webp
zero-energy_texture_abricot_framboise.webp
```

Order must match `FLAVORS` in `data/flavors.ts`.
