# Platinum Second Revision — mandatory post-ship law

**Status:** Locked · critical · 2026-08-11  
**Audience:** Every human and AI that takes a ClickMotion product to **production / published / sale**  
**Canonical short name:** **Platinum Second Revision**  
**Related:** [`SHIP_FOR_SALE.md`](./SHIP_FOR_SALE.md) · [`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md) Phase **13** · [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) · [`PSAVE.md`](./PSAVE.md) (if the SKU is PSAVE) · [`PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) §10 · [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md)

---

## 0. Non-negotiable rule

**Every time** a new product is productized, posted, published, or declared production/sale ready:

1. Complete the **first ship pass** (SHIP_FOR_SALE + PRODUCTION_READY_CHECKLIST Phases 0–12).  
2. **Stop and tell the operator** you finished the first pass (what shipped, where it lives).  
3. **Ask permission** with this exact intent (wording may be polished; meaning must match):

   > **May I run the Platinum Second Revision to make sure that all is perfectly ultra premium?**

4. **Only after the operator says yes** — run the full Platinum Second Revision (this document).  
5. Report PASS/FAIL with evidence. Fix every in-scope gap. Re-smoke until clean.

**Hard ban:** Skipping Platinum Second Revision by default, “assuming” first pass is enough, or treating sale-ready as final without operator permission + second revision.  
**Hard ban:** Running the deep second revision **without** asking (unless the operator already ordered it in the same turn).  
**Hard ban:** Claiming “ultra premium” after first pass only.

This step is **critical** after taking a product to production. It is not optional polish.

---

## 1. What Platinum Second Revision is

A **second, forensic, ultra-premium audit** of the SKU **after** it is already wired for sale — same spirit as the Dopamine / Phobia post-ship second revision:

- Re-prove wiring with **evidence** (hashes, HTTP codes, zip listing, CMS fields) — not memory.  
- Compare density and quality to **gold standards** (Meridian PDF · Studio folder/zip · Helix description · latest paid section peers e.g. Phobia).  
- Find **gaps, drift, thin docs, missing reduced-motion, lab vs cleanroom drift, poster flash, registry skew**, etc.  
- **Fix** in-scope gaps; re-verify; only then declare platinum-ready.

It is **not** a rubber stamp of Phase 12. Phase 12 says “first ship complete.” Phase 13 / Platinum says “second eyes + ultra bar cleared.”

---

## 2. Agent speech (required)

### After first ship / first production post

The agent **must** end the first-pass work with language equivalent to:

```text
First production pass for {productId} is complete.
[brief: demo URL, browse URL, package zip/PDF, priceTier]

Per product law, I should next run the Platinum Second Revision
(ultra-premium gap audit + fix pass).

May I run the Platinum Second Revision to make sure that all is
perfectly ultra premium?
```

Do **not** auto-start Phase 13 until the operator approves (unless they already said “run platinum / second revision” in that message).

### After Platinum Second Revision

```text
Platinum Second Revision for {productId}: VERDICT PASS | FAIL
[what was fixed]
[smoke evidence]
[residuals if any — durable path]
```

---

## 3. Platinum checklist (run every SKU)

Copy into PR / chat. Fill productId. Check every applicable box.

```text
PLATINUM SECOND REVISION — {productId}
Date: ________  Operator permission: [ ] yes

A. PERMISSION & SCOPE
[ ] Operator approved Platinum Second Revision
[ ] SKU id / slug / opaque / PaidSalt recorded
[ ] Gold peers named (e.g. Meridian PDF, Studio zip, Helix desc, Phobia body)

B. PACKAGE / FOLDER / ZIP / PDF
[ ] Product folder public/packages/{id}/files/ complete (START-HERE, PROMPT, CUSTOMIZATION, source, assets)
[ ] Zip exists; root = files contents (START-HERE at root; no nested files/; no ./ noise)
[ ] Zip rebuild after any source fix; source hashes match cleanroom
[ ] PDF registered; regenerate if motion/copy law changed
[ ] No storefront *-preview* / thumbs / secrets inside zip
[ ] Client assets in zip hash-match public client vault paths

C. MEDIA VAULT
[ ] Page preview + FS preview + poster + thumb on disk and HTTP 200
[ ] Client media paths 200; not confused with storefront captures
[ ] New operator Premiere drops land in storefront path + lab/operator archive as needed
[ ] FS left unchanged when only page Small was replaced (and vice versa)

D. REGISTRIES & CMS
[ ] MDX frontmatter + body complete (peer density — not thinner than last paid peer)
[ ] CMS store.json: priceTier, status, description soft≤200 hard≤230, dual video, liveDemo, body sections match MDX
[ ] product-packages.ts: pdf + filesZip + checklist flags true only if files exist; isPackageSaleReady disk-true
[ ] owner-designs.ts flagship entry
[ ] gallery-utils dual preview + DEMO_SLUG; SCROLL set only if scroll-scrub product
[ ] prep doc updated (docs/prep/…)

E. DEMO / PRODUCT / DOWNLOAD
[ ] /demo/{slug} 200; cleanroom import resolves; deps installed (e.g. lottie-web)
[ ] /browse/{slug} 200; Get Full Prompt present; crown if paid
[ ] Download API unauth 401; zip preferred when registered (Content-Disposition)
[ ] No PAID_REQUIRED bypass for free users on paid SKUs

F. SOURCE QUALITY
[ ] "use client" where needed; LF-safe; no website-tests / lab path leaks in buyer source
[ ] dop-container / no Tailwind .container traps (or product-specific layout law)
[ ] No external hrefs unless product allows
[ ] prefers-reduced-motion path when motion-heavy
[ ] Cleanup on unmount (GSAP / Lottie / listeners)
[ ] Lab ported if prep regenerates from lab (no ship→lab regression)
[ ] **Scroll narrative pin law (if S or hybrid-with-scroll):** pin-until-complete; no tall multi-vh traditional scrollbar UX; virtual progress; client pin+release documented in prompt/source — PRODUCT_LAW
[ ] **PSAVE (if named / Elyse / Revel / Vertex / Still / Prism):** method matches `docs/PSAVE.md` (two clocks, 3-frame reverse, leftover dest on lift, picture-gated release, page-owns next sibling, GOP 3). No leftover old Vertex/old Revel gain/lag numbers, old Still hybrid / 960vh, or old Prism 520vh GSAP.

G. STOREFRONT UX
[ ] Description Helix-class voice
[ ] Gallery/product video: no poster flash (still only on error) — MediaFill law
[ ] Demo runway for scroll-enter products
[ ] Scroll-narrative demo feels pinned (no long-page scrollbar through the journey)

H. GOLD DENSITY
[ ] MDX body sections ≥ peer (Promise, Design, Layout, Content slots, Motion, Responsive, A11y, Perf, AI tools, Expected, What to tell AI, Package notes)
[ ] START-HERE / PROMPT / CUSTOMIZATION not thinner than Studio/Phobia class
[ ] Estimated tokens / version bumped if content grew

I. SMOKE (evidence)
[ ] Hash sync table cleanroom ↔ package
[ ] HTTP matrix demo / browse / media / zip / pdf / download
[ ] Zip namelist printed
[ ] CMS body length vs peer noted

J. VERDICT
[ ] All CRITICAL/HIGH fixed
[ ] Residuals durable if any (RESIDUAL_BACKLOG / prep / checklist)
VERDICT: PASS | FAIL
```

---

## 4. Factory placement

```text
… Phase 12 first sign-off / published wiring …
→ AGENT TELLS OPERATOR: first pass finished
→ AGENT ASKS: Platinum Second Revision permission
→ Phase 13 Platinum Second Revision (this file)
→ only then “platinum / ultra-premium sale complete”
```

Factory line in [`SHIP_FOR_SALE.md`](./SHIP_FOR_SALE.md) and [`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md) Phase **13**.

---

## 5. Gold reference (second revision bar)

| Area | Peer to beat or match |
|------|------------------------|
| PDF | Meridian package density/layout |
| Folder + zip | Studio Sequence tree |
| Description bar | Helix voice |
| Paid section body / pack docs | Phobia / Studio / latest paid SKU (e.g. Dopamine after platinum) |
| Demo + gate | Live 200 / 401 download pattern |

---

## 6. Document map (this law is dual-written)

| Doc | How this law appears |
|-----|----------------------|
| **This file** | Full protocol + checklist |
| `SHIP_FOR_SALE.md` | Entry gate step + agent speech |
| `PRODUCTION_READY_CHECKLIST.md` | **Phase 13** boxes |
| `PRODUCT_LAW.md` | Production/sale mandatory step |
| `PSAVE.md` | If the SKU is PSAVE (Elyse gold): reopen the full method, do not summarize |
| `PRODUCT_PACKAGE.md` | Operator publish + post-zip revision |
| `PRODUCTION_PROCESS.md` | Definition of Done |
| `QUALITY_CHECKLIST.md` | Publishing gate |
| `ASSET_PIPELINE.md` | Operator checklist line |
| `HANDOFF.md` | Next-agent must-not-forget |
| `AGENTS.md` | Agent root instructions |

---

*Update this file when the platinum bar grows. Never leave “second revision” only in chat memory.*
