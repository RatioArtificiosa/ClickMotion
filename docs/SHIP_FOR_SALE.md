# Ship for sale — mandatory protocol (agents & operators)

**Status:** Locked entry gate · Updated 2026-08-14 (scroll narrative pin law + PSAVE pointer)  
**Audience:** Every human and AI that takes a ClickMotion product to **production / published / sale**  
**You do not improvise this path.** You open the checklist, work the phases, and match the gold standards.

---

## 0. Stop — read this first

Before you say a product is “done,” “production ready,” “sale ready,” or set `status: published`:

1. **Open and work** [`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md) top → bottom (fill the SKU header).  
2. **Obey media vault law** [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) (roles, immutability, naming, PaidSalt).  
3. **Obey product package law** [`PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) — PDF **and** product folder + files zip (**§10**).  
4. **Obey product UX law** [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) (storefront vs client, product page, description bar, free vs paid / crown).  
5. **Obey scroll narrative pin law** ([`PRODUCT_LAW.md`](./PRODUCT_LAW.md) → **Scroll narrative pin law**): every scroll-as-narrative, scroll-scrub / scroll-pivot, or **hybrid with a scroll-narrative leg** is **pin-until-complete** **100% of the time** — fixed stage, no traditional long-page scrollbar UX; client embed pins until the journey ends, then releases.  
6. **If the SKU is PSAVE** (Elyse + live Revel + live Vertex + live Still + live Prism; others only when the operator names it): obey [`PSAVE.md`](./PSAVE.md) in full (two clocks, product earn track, 1.2x play, 3-frame reverse, leftover dest on lift, picture-gated release, GOP 3 / no B-frames, page-owns next sibling). Do not substitute old Vertex / old Revel seek-scrub, old Still hybrid, or old Prism 520vh GSAP.  
7. **Match gold standards** (Appendix below) — never ship thinner than Meridian PDF or Studio product folder/zip.  
8. **After the first production post:** tell the operator you finished the first pass, then **ask permission** to run the **Platinum Second Revision** — see [`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md) and checklist **Phase 13**.

If anything conflicts, **checklist + PRODUCT_PACKAGE §10 + ASSET_PIPELINE + scroll pin law** win for ship decisions. On a PSAVE SKU, **[`PSAVE.md`](./PSAVE.md)** wins for film-drive details.

**Hard ban:** Claiming sale-ready from memory without re-opening this stack.  
**Hard ban:** Skipping **Platinum Second Revision** after a new product is posted to production (or claiming “ultra premium” on first pass only).

---

## 1. What “sale ready” means (definition)

A SKU is sale ready only when **all** of the following are true:

| # | Deliverable | Where |
|---|-------------|--------|
| 1 | Sold prompt complete (density + quality) | MDX + CMS body |
| 2 | Clean-room / demo proves the design | `cleanroom/…` · `/demo/…` |
| 3 | Storefront media separate from client | dual preview + thumb + poster; if operator gave screenshot **WebM**, page/browse/product `previewVideo` stays **WebM** (FS mp4 OK) — ASSET_PIPELINE §1A |
| 4 | Client rebuild media locked | vault client role (film / GLB / stills) |
| 5 | **Product folder** with every file the buyer’s AI needs | `public/packages/{productId}/files/` |
| 6 | **Files zip** of that same folder | `{Product}-files-{OpaqueId}[-PaidSalt].zip` |
| 7 | **Package PDF** buyer manual (flagships / video-class) | `{Product}-package-{OpaqueId}[-PaidSalt].pdf` |
| 8 | Registries + CMS agree | `product-packages.ts`, `owner-designs.ts`, store.json, MDX |
| 9 | Free vs paid honest | `priceTier`; PaidSalt only when paid; crown when not free |
| 10 | Get Full Prompt works | zip preferred → PDF fallback; entitlements enforced |

**Product folder + zip (do not collapse):**

```text
public/packages/{productId}/
  files/                                      ← PRODUCT FOLDER (source of truth)
    START-HERE.md
    PROMPT.md
    CUSTOMIZATION.md
    source/                                   ← production code for the AI
    assets/                                   ← client rebuild media only
  {Product}-files-{OpaqueId}[-PaidSalt].zip   ← same tree, downloadable
  {Product}-package-{OpaqueId}[-PaidSalt].pdf ← buyer manual
```

- Operators **edit the product folder**.  
- Operators **rebuild the zip** from the product folder (zip root = contents of `files/`, not a nested `files/` wrapper).  
- Buyers **download the zip** via Get Full Prompt when registered.  
- Full tree law: [`PRODUCT_PACKAGE.md` §10](./PRODUCT_PACKAGE.md).

N/A only when the mode truly has no cleanroom rebuild pack (document **why** in the checklist). Rebuild flagships (Studio, Lineup, Actually, Helix, and later) **must** ship folder + zip.

---

## 2. Factory order (always)

Use this order. Detail lives in the full checklist.

```text
0  SLOT          Differentiation + mode + UI reference
1  PROMPT        Dense buyer prompt (Deepseek / architect)
2  MACHINE       validate prompts / assets
3  MEDIA         Master → client lock; storefront recapture separate
4  CLEAN-ROOM    Build from prompt only
5  VISUAL QA     Fix prompt, not only code
6  PROOF         Muted storefront page + FS captures
7  PRODUCT PACK  Product folder → zip → PDF → registries
8  CMS           All fields, priceTier, description bar
9  COMMERCE      Free vs paid, PaidSalt, Get Full Prompt smoke
10 PUBLISH       First production wiring + Phase 12 sign-off
11 PLATINUM      Tell operator first pass is done → ask permission →
                 Platinum Second Revision (Phase 13) → fix → re-smoke
```

Checklist phases: [`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md)  
Platinum law: [`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md)  
Velocity notes: [`PRODUCTION_PROCESS.md`](./PRODUCTION_PROCESS.md)

---

## 3. Gold standards (clone these — do not invent thinner)

| Gold | Artifact | Path / registry |
|------|----------|-----------------|
| **PDF layout + prompt density** | Meridian Product Package PDF | `public/packages/MS-HERO-MERI01/Meridian-package-p4ltcy7t4p0c-pd1w65.pdf` · `product-packages.ts` |
| **Product folder + files zip tree** | Studio Sequence | `public/packages/MS-SEC-STUDIO01/files/` + `Studio-files-s7u2d1o9q4x1-p8k2m1.zip` |
| **Storefront description bar** | Helix quality voice | MS-SEC-HELI01 · PRODUCT_LAW meta panel · checklist **1C.12** |
| **Vault roles** | Client ≠ storefront ≠ backgrounds | [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) |
| **Product page shell** | ~960×540 main + meta + 3-card rail | PRODUCT_LAW · `PromptProductView` |

**Rule:** New SKUs may change brand content. They must **not** regress structure, density, or safety (no storefront media in buyer packs, no backend leaks, opaque names, PaidSalt on paid packages).

---

## 4. Registries you must update (no hunting)

| Registry | Required fields |
|----------|-----------------|
| `content/prompts/…/{id}.mdx` | frontmatter + body; `priceTier`; media paths |
| `data/cms/store.json` | published row; media; **priceTier**; description |
| `src/lib/product-packages.ts` | `pdfHref`, `filesZipHref`, `opaqueId`, `paidSalt?`, checklist flags |
| `src/lib/owner-designs.ts` | flagships: broll, previews, packagePdf, notes |
| `src/lib/gallery-utils.ts` | dual preview paths / demo slug when needed |
| `src/config/backgrounds.ts` | only if backgrounds tile (small encode, never client HD) |

Admin: **`/admin/packages`**, **`/admin/designs`**, product Preview media.

---

## 5. Free vs paid (commerce)

| | Free | Paid (`starter` / `pro` / `agency`) |
|-|------|------|
| `priceTier` in MDX + CMS | `free` | not free |
| Gallery / product crown | no | **yes** (`priceTier !== "free"`) |
| Package PDF name | `…-package-{OpaqueId}.pdf` | `…-package-{OpaqueId}-{PaidSalt}.pdf` |
| Files zip name | `…-files-{OpaqueId}.zip` | `…-files-{OpaqueId}-{PaidSalt}.zip` |
| Get Full Prompt access | free members OK (quota) | paid membership required |

---

## 6. Agent checklist (minimum before “ready”)

Copy into the PR or chat when finishing a SKU:

```text
SHIP FOR SALE — {productId}
[ ] Opened PRODUCTION_READY_CHECKLIST.md and worked applicable phases
[ ] Product folder exists: public/packages/{id}/files/ (START-HERE, PROMPT, CUSTOMIZATION, source, assets)
[ ] Files zip exists and root shows START-HERE (not nested under files/)
[ ] Package PDF registered (flagships)
[ ] product-packages.ts: filesZip + packagePdf checklist true only if files exist
[ ] MDX + CMS priceTier agree; crown correct
[ ] Storefront previews ≠ client media; nothing *-preview* in product folder/zip
[ ] Get Full Prompt smoke: zip preferred when registered
[ ] owner-designs + demo route for flagships
[ ] If scroll-narrative or hybrid-with-scroll: pin-until-complete (no tall multi-vh scrollbar UX) — PRODUCT_LAW
[ ] Phase 12 sign-off block filled (first production pass)
[ ] Told operator: first production pass is finished
[ ] Asked permission: “May I run the Platinum Second Revision to make sure that all is perfectly ultra premium?”
[ ] Phase 13 Platinum Second Revision completed only after permission (see PLATINUM_SECOND_REVISION.md)
```

### Required agent speech (after every new product post)

1. **Finish first pass** → clearly say you are finished with first production wiring.  
2. **Ask** (do not silently skip):

   > May I run the Platinum Second Revision to make sure that all is perfectly ultra premium?

3. **Only if yes** → run [`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md) / checklist Phase 13 end-to-end and fix gaps.

---

## 7. Document map (open in this order when shipping)

| Order | Doc | Role |
|------:|-----|------|
| 1 | **This file** | Entry gate + gold map |
| 2 | [`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md) | Every box (incl. Phase 13) |
| 3 | [`PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md) | **Mandatory post-ship second revision** |
| 4 | [`PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) | PDF + product folder + zip law |
| 5 | [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md) | Media roles + naming |
| 6 | [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) | Storefront UX + description + package summary |
| 7 | [`QUALITY_CHECKLIST.md`](./QUALITY_CHECKLIST.md) | 40-pt prompt scorecard |
| 8 | [`PROMPT_VISUAL_QA_LOOP.md`](./PROMPT_VISUAL_QA_LOOP.md) | See → fix prompt |
| 9 | [`DEEPSEEK_PROMPT_PIPELINE.md`](./DEEPSEEK_PROMPT_PIPELINE.md) | Authoring |
| 10 | [`BRAND.md`](./BRAND.md) | ClickMotion chrome |
| 11 | [`HANDOFF.md`](./HANDOFF.md) | Next-agent summary |

---

## 8. Memory (do not forget)

1. **Product folder** (`files/`) + **zip of that folder** for every rebuild product.  
2. **PDF** is the manual; **zip** is the preferred Get Full Prompt payload.  
3. **Meridian** = PDF gold · **Studio Sequence** = folder/zip gold · **Helix** = description bar gold.  
4. **Client HD never overwritten** after prep; storefront is a different file.  
5. **No storefront captures** in buyer packs.  
6. **Re-open the checklist** every time you ship — do not work from vibes.  
7. **Platinum Second Revision after every new product post** — tell the operator you finished, **ask permission**, then audit + fix to ultra-premium. Never skip.  

---

*Update this file when gold paths or delivery protocol change. Keep it short; put depth in PRODUCT_PACKAGE, PLATINUM_SECOND_REVISION, and PRODUCTION_READY_CHECKLIST.*
