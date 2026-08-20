# Integration (later, operator-approved)

Do not run this until Sections has velocity: law stable, libraries filling, one gold SKU planned or shipped in sidecar, and the other agent is not mid-flight on colliding files.

**Sidecar = lab / plant. Live repo = finished goods.** Factory files merge once. Each SKU then ships onto the existing public catalog path (prompt, cleanroom, `public/packages`, storefront). Do not treat `public/` as the only landing zone.

## Merge map

| Sidecar | Live destination |
|---------|------------------|
| `sections/LAW.md` | `docs/SECTIONS_LAW.md` + short pointer in `docs/PRODUCT_LAW.md` |
| `sections/CATALOG.md` | `docs/SECTIONS_CATALOG.md` |
| `AGENTS.md` (sidecar) | Pointer block in root `AGENTS.md` + `docs/HANDOFF.md` |
| `kinds.json` | `src/config/taxonomy.ts` (`sectionKinds`) + `docs/TAXONOMY.md` |
| `template.mdx` | `content/prompts/sections/_template.mdx` |
| `libraries/*.json` | `data/libraries/` or `src/config/libraries/` + Zod + `scripts/validate-libraries.ts` |
| Preview policy | **Locked:** public = video demos. `/demo` stays operator proof. Do not amend PRODUCT_LAW toward public live sandboxes unless the operator reopens this. |
| Browse UI | New marketing route (name TBD: `/sections`) | **Not before** the gold SKU exists |

## Finished SKU destination (each product)

After the factory merge, each completed section leaves the sidecar and lands here (same as Helix / Studio):

1. `content/prompts/sections/MS-SEC-….mdx`
2. `cleanroom/…` + demo route
3. `public/packages/{id}/` (files folder + zip + PDF)
4. Storefront preview media under `public/assets/…` (role-separated)
5. `owner-designs.ts` + `product-packages.ts` + CMS
6. Gallery / product page, and later the Sections aisle UI

The sidecar copy of a draft can stay as history. The live files become source of truth for that SKU.

## Do not merge

- `components/` and `elements/` until those aisles have their own law
- Combinatorial atom grids
- Edits to existing `MS-SEC-*` and `MS-HERO-*` as part of “integration”

## First live SKU after merge

Pricing or FAQ. Run `docs/SHIP_FOR_SALE.md` and Platinum Second Revision. That SKU becomes the Helix of the Sections aisle.

## CONTENT_PLAN_100

At merge, stamp a banner on `docs/CONTENT_PLAN_100.md`: superseded by SECTIONS_LAW. Keep the file for history. Do not delete.
