# ClickMotion catalog sidecar

**Status:** Sidecar only. Not wired into the Next app, CMS, browse routes, or public nav.  
**Do not** import this folder from `src/app`, `src/lib`, or `content/prompts` until the operator says to integrate.  
**Do not** edit live storefront, cleanrooms, hero prompts, or `owner-designs.ts` from this lane while another agent is shipping heroes and sections.

This folder is the foundation for three future storefront aisles. Only **Sections** is in scope now.

| Aisle | Folder | Now | Later |
|-------|--------|-----|--------|
| **Sections** | `sidecar/sections/` | Law, catalog, libraries, prompt template | Integrate as `/sections` (name TBD) |
| **Components** | `sidecar/components/` | Stub | Buttons, inputs, cards, nav chips |
| **Elements** | `sidecar/elements/` | Stub | Three.js / WebGL / canvas showpieces |

## Lab vs finished goods

**`sidecar/` is the lab and processing plant.** Law, libraries, drafts, and quality gates live here. Nothing here is for sale until it is moved onto the live product path.

**Finished products do not stay in the sidecar.** They move onto the same public catalog path Helix, Studio, and the heroes already use. `public/` is only the asset/pack slice of that path, not the whole destination.

| Stage | Where | What |
|-------|--------|------|
| Lab / plant | `sidecar/` | Specs, libraries, draft prompts, planned SKUs |
| Sold prompt | `content/prompts/sections/` | Buyer prompt (MDX) |
| Proof build | `cleanroom/` + `/demo/cleanroom-…` | Interactive original |
| Buyer pack | `public/packages/{id}/` | Folder + zip + PDF |
| Preview media | `public/assets/videos/` (storefront vs client roles) | Muted proof capture |
| Registries | `owner-designs.ts` + `product-packages.ts` + CMS | Operator source of truth |
| Storefront | browse / product page (later a Sections aisle) | What visitors see |

Law and libraries also merge into `docs/` + `src/config/` once (see `sections/INTEGRATION.md`). SKUs still ship one at a time through `SHIP_FOR_SALE.md` and Platinum.

## Why a sidecar

Another agent is still constructing heroes and production sections on the live repo path. This work must not collide. When Sections has velocity (schema stable, one gold SKU, libraries filling), merge using `sidecar/sections/INTEGRATION.md`.

## Boot (any model / session)

1. This README  
2. `sidecar/AGENTS.md`  
3. `sidecar/sections/LAW.md`  
4. `sidecar/sections/CATALOG.md`  
5. `sidecar/sections/libraries/`  

Site product law still applies when a SKU is later productized: `docs/PRODUCT_LAW.md`, `docs/SHIP_FOR_SALE.md`, Platinum Second Revision. Do not start that path from here until integration.

## Hard rules

- Public aisle is **Sections**, not a Magic UI / shadcnblocks atom grid.  
- Quality: veteran-human conviction, one famous-UI reference, one signature motion. Purple-green mesh bento fails.  
- `docs/CONTENT_PLAN_100.md` is **not** the plan for this lane (counts and Batch 1 superseded). Intent kept: pairable page slices under existing heroes.  
- Four libraries (motion, design language, tokens, composition) are the **factory**. Sold product remains prompt + pack.  
- No em dash in buyer-facing copy. Brand: ClickMotion · www.ClickMotion.dev.

## Out of scope until operator says so

- New Next routes or nav items  
- CMS products  
- Cleanroom builds  
- Editing `src/config/taxonomy.ts` (sidecar has its own `kinds.json` until merge)  
- Components aisle implementation  
- Elements / Three.js aisle implementation  
