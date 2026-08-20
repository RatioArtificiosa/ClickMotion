# Sidecar agent boot

You are working the **catalog sidecar**, not the live ClickMotion storefront.

## Must read (in order)

1. `sidecar/README.md`
2. `sidecar/sections/LAW.md`
3. `sidecar/sections/CATALOG.md`
4. `sidecar/sections/libraries/ENTER.md`
5. `sidecar/sections/libraries/WOW.md` (only if the SKU is wow-register)
6. `sidecar/sections/quality-gate.md`

## Do

- Keep all new catalog work under `sidecar/` until the operator says integrate.
- Treat Sections as the public aisle. Components and Elements are stubs only.
- Cite a design language id, token theme id, one motion primitive id, and one enter recipe id (`ENTER.md`) on every planned SKU.
- Public proof is **video**, not a live public component. `/demo` is operator-only.
- After every section build: run `sidecar/sections/VISUAL_PASS.md` in Chrome until GOLDEN. Do not skip.
- The demo is the finished product. No how-to copy on the board. Drive notes go in `OPERATOR_NOTES.md`.
- Match existing gold: Helix copy, Studio Sequence package tree, Meridian pin-until-complete, Dopamine footer as a footer reference.

## Do not

- Edit `src/app`, `src/lib/owner-designs.ts`, `src/lib/product-packages.ts`, `cleanroom/`, `content/prompts/heroes/`, or live `content/prompts/sections/` SKUs from this lane.
- Execute `docs/CONTENT_PLAN_100.md` Batch 1 or its 40/40/12/8 counts.
- Clone Magic UI, shadcnblocks, Oxygen, Amicro, or similar kits. Coverage checklist only. Original layout + one signature motion.
- Invent taxonomy tags that are not in `sidecar/sections/kinds.json` or `src/config/taxonomy.ts`.
- Build `/sections`, `/components`, or `/elements` routes yet.
- Use em dashes in buyer-facing copy.
- Invent people or houses (Clara Voss, Hale Atelier). Use common first + last names and real places.

If the operator asks for a live SKU, stop and confirm integration. Sidecar first.
