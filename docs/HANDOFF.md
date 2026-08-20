# MS Handoff — For the Next AI (Grok Build)

## Shipping for sale (read first — do not forget)

**Entry gate:** [`docs/SHIP_FOR_SALE.md`](./SHIP_FOR_SALE.md)  
**Full checklist:** [`docs/PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md)  
**Package law (PDF + product folder + zip):** [`docs/PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) §10  
**Platinum Second Revision (mandatory after every new product post):** [`docs/PLATINUM_SECOND_REVISION.md`](./PLATINUM_SECOND_REVISION.md) · checklist **Phase 13**

Every rebuild product has a **product folder** (`public/packages/{id}/files/`) with all files needed to make the end product with AI, **and** a **zip of that folder**. Gold: Meridian PDF · Studio Sequence folder/zip · Helix description bar. Re-open the checklist every ship — do not work from vibes.

**After first production post — critical:** Tell the operator the first pass is finished, then **ask permission**: *“May I run the Platinum Second Revision to make sure that all is perfectly ultra premium?”* Only after yes, run the full second-revision gap audit + fixes. Never skip.

---

**Current product law:** [`docs/PRODUCT_LAW.md`](./PRODUCT_LAW.md)  
**Scroll narrative pin law (mandatory 100% for S + hybrid-with-scroll):** pin-until-complete — fixed stage, virtual progress, no traditional long-page scrollbar UX; client embed pins until the journey ends then releases. Canonical: [`docs/PRODUCT_LAW.md`](./PRODUCT_LAW.md) → **Scroll narrative pin law**.  
**PSAVE (Perfect Scroll Video Engine):** named film-drive method on Elyse, live Revel, live Vertex, live Still, live Prism, and live **Grok Bot**. Scroll aims, film plays forward/reverse, leftover dest on lift, picture never jumps. Still, Prism, and Grok Bot dual process = PSAVE + No Scroller. Canonical: [`docs/PSAVE.md`](./PSAVE.md). Do not call old Vertex / old Revel / Meridian seek-scrub / old Still hybrid / old Prism 520vh PSAVE. Do not roll PSAVE onto other SKUs unless the operator names it.  
**Helix (MS-SEC-HELI01):** **No Scroller only** (2026-08-15 feel lock). Platinum Second Revision 2026-08-15: **backend only** (public visuals waived). Virtual progress 5 vh desktop / 3 mobile. Pin freeing: page owns until dock. PaidSalt `t2v8c6` is on the live PDF and zip filenames. Not PSAVE. No gsap / lenis / SmoothScroll / tall spacer. Storefront preview leave as-is.  
**Mirage (MS-HERO-MIRA01):** **No Scroller only** (2026-08-15 feel lock). Virtual earn 5 × 1.55 vh (7.75 at five sheets). Free-play desert film (not PSAVE, no GOP 3, no reverse). Pin freeing: page owns until dock. Storefront preview leave as-is. Platinum Second Revision 2026-08-15: **backend only** (public visuals waived).  
**Studio Sequence (MS-SEC-STUDIO01):** **No Scroller only** (2026-08-15 first production). Platinum Second Revision 2026-08-15: **backend only** (public visuals waived). Virtual earn **4 vh desktop / 3 mobile**. Free-play billboard film (not PSAVE, no GOP 3, no reverse, never seek). Camera pull-out 1:1. Pin freeing: page owns until dock. Storefront preview **WebM** leave as-is (ASSET_PIPELINE §1A). PaidSalt `p8k2m1`. No gsap / lenis / SmoothScroll / tall spacer. Listed as **Pro** in `llms.txt` / `llms-full.txt`.  
**Lineup (MS-SEC-LINE01):** **No Scroller only** (2026-08-16 first production). Platinum Second Revision 2026-08-16: **backend only** (public visuals waived). Virtual earn **N viewports**. Snap on lift. 3D vessel + copy. Pin freeing: page owns until dock. Storefront preview **WebM** leave as-is. PaidSalt `q3n7w2`. No leftover SmoothScroll / lenis-bridge / gsap-register. gsap tweens only.  
**Actually! (MS-HERO-ACTU01):** **No Scroller only** (2026-08-16 first production + Platinum backend **v2.1.0**). Virtual earn **1.2 vh**. Pointer window + grab + formula reveal. Pin freeing: page owns until dock. Storefront preview leave as-is. PaidSalt `r5m4x9`. No lenis / ScrollTrigger pin.  
**Roadster (MS-HERO-ROAD01):** **No Scroller only** (2026-08-16 first production + Platinum backend **v2.1.0**). Virtual earn **13.3 vh**. Loop film + enter-hold-exit cards + pull-up sheet + Y-spin GLB. Pin freeing: page owns until dock. Storefront preview leave as-is. PaidSalt `rd7n4x`. No gsap / ScrollTrigger pin. Film never seeks. Not PSAVE.  
**Grok Bot (MS-HERO-GROK01):** **PSAVE + No Scroller** (2026-08-16 first production + Platinum backend **v2.1.0**). Virtual earn **12 vh**. Whole 62.5s Sphere film. HUD loops stay. Pin freeing: page owns until dock. Storefront page+gallery = operator `GrokBot-VEGAS.webm` (full 63.76s, keep WebM). FS = `GrokBot-VEGAS_FS.mp4`. Never play `grokbot-sphere-v1.mp4` as storefront preview. PaidSalt `gk4n8x`.  
**SkySpires (MS-HERO-SKYS01):** **PSAVE + No Scroller** (2026-08-16 first production + Platinum backend **v2.1.0**). Virtual earn **12 vh**. Whole 25.04s sunrise film (24fps). HUD loops stay. Glass lock. Pin freeing: page owns until dock. Clone frozen. Storefront is agent capture until operator Premiere. PaidSalt `sk5n2q`.  
**Media vault (paths, naming, grandfather table):** [`docs/ASSET_PIPELINE.md`](./ASSET_PIPELINE.md)  
**Prompt authoring (Deepseek):** [`docs/DEEPSEEK_PROMPT_PIPELINE.md`](./DEEPSEEK_PROMPT_PIPELINE.md)  

Product = sold prompt + **locked client HD** + **buyer package** (folder + zip + PDF). Site gallery/product preview = **separate** muted UI capture. Never move/rename/overwrite client HD after prep. New videos: role folders + `Product-Purpose-OpaqueId[-PaidSalt]`; do not rename existing files.

**Product page shell (locked):** main display **~960×540**, meta height-matched, **3-card** related rail (`justify-between`, titles flush left), genre gallery below independent — see PRODUCT_LAW “Product page layout (template law — locked)” and `PromptProductView` / `PRODUCT_PAGE_LAYOUT`.

**Storefront description bar (locked 2026-08-10):** every product description must be **ultra-premium and beautiful** like **Helix (MS-SEC-HELI01)** — experience + buyer benefit + brand ownership; never tech laundry lists or negative-only framing. Full rule: `PRODUCT_LAW.md` (Meta panel copy) + checklist **1C.12**.

**Interactive demo movies (project-agnostic):** Playwright `recordVideo` + ffmpeg for pointer/drag/scroll acts — any lab or product. Notes: [`INTERACTIVE_DEMO_RECORDING.md`](./INTERACTIVE_DEMO_RECORDING.md) · scripts: `scripts/record-interactive-demo.mjs`, lab example `Lab/actually/scripts/record-hero-demo.mjs`.

**LLM / agent discovery:** `/llms.txt` (+ `/llm.txt` alias, `/llms-full.txt`) · `robots.txt` · `sitemap.ts` · growth playbook [`AEO_LLM_GROWTH.md`](./AEO_LLM_GROWTH.md). MCP documented as live at `/api/mcp` for agents.

**Product package (PDF + files zip):** [`docs/PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) — **§10 is the full files zip protocol** (do not forget). Registry: `src/lib/product-packages.ts`. Get Full Prompt prefers `{Product}-files-{OpaqueId}[-PaidSalt].zip` over PDF. Staging: `public/packages/{id}/files/`. Gold PDF: Meridian · Gold zip tree: Studio Sequence. Admin → Product packages. Brand: ClickMotion. Full gate: [`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md) Phase 8 + **8H**.

## What Was Built

This scaffolding was started by Opus and completed to enterprise grade. The following is already implemented and must not be recreated:

- `package.json`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `next.config.mjs`, `prettier.config.js`, `.eslintrc.json`, `.gitignore`, `.env.example`
- `src/styles/globals.css` (Apple-grade tokens, dark mode, reduced-motion)
- `src/config/taxonomy.ts` (canonical), `src/config/categories.ts` (re-export), `src/config/site.ts`, `src/config/plans.ts`, `src/config/navigation.ts`
- `src/types/prompt.ts`, `src/types/database.ts`, `src/types/index.ts`
- `src/lib/validators/prompt-schema.ts` (Zod), `src/lib/prompt-loader.ts`, `src/lib/utils/cn.ts`, `src/lib/supabase/*`, `src/lib/stripe/plans.ts`
- `src/components/ui/*` (badge, button, card, input, skeleton, dialog, tabs, select, tooltip, accordion)
- `src/components/motion/*` (fade-in, slide-up, stagger-children, text-reveal)
- `src/components/gallery/*` (PromptCard, FilterBar, PreviewPlayer)
- `src/components/layout/*` (Header, Footer)
- `src/app/layout.tsx`, `src/app/(marketing)/page.tsx`
- `src/app/api/checkout/route.ts`, `src/app/api/webhooks/stripe/route.ts`
- `content/prompts/heroes/_template.mdx`
- `supabase/migrations/001_initial_schema.sql`, `002_search_optimizations.sql`
- `scripts/validate-prompts.ts`, `validate-assets.ts`, `generate-prompt-manifest.ts`
- `docs/SCAFFOLDING.md`, `TAXONOMY.md`, `CONTENT_PLAN_100.md`, `ASSET_PIPELINE.md`, `QUALITY_CHECKLIST.md`, `HANDOFF.md`

## What Remains (In Priority Order)

### P0 — Must build before any content

1. **Install & boot:** `npm install && npm run dev` — verify no type errors.
2. **`content/prompts/_template.md`** + **`_template-short.md`** — copy from `_template.mdx` and adapt (short = condensed sections).
3. **`src/app/(marketing)/browse/page.tsx`** — gallery grid using `PromptCard` + `FilterBar` + `manifest.json` (or Supabase). URL-synced filters.
4. **`src/app/(marketing)/browse/[slug]/page.tsx`** — detail page with `PreviewPlayer`, `CopyPromptButton`, design system display, `compatibleWith` links.
5. **`src/app/(marketing)/pricing/page.tsx`** — tier cards from `plans` config, checkout buttons.

### P1 — Before launch

6. **`scripts/seed.ts`** — reads `content/prompts/**/*.mdx` via `prompt-loader`, upserts to Supabase `prompts` table.
7. **`src/app/sitemap.ts`** + **`src/app/robots.ts`** — generate from prompts + static pages.
8. **`src/app/(auth)/login/page.tsx`** + **`(dashboard)/account`** — Supabase Auth + plan display.
9. **`legal/LICENSE_COMMERCIAL.md`** + `TERMS.md` + `PRIVACY.md` — from §9 of SCAFFOLDING.md.
10. First 5 real prompts (Batch 1 seed) to prove the pipeline end-to-end.

### P2 — Polish

11. OG image generation (`next/og` or `sharp`).
12. MCP server endpoint (`src/app/api/mcp/*`).
13. Collections pages.
14. Visual regression (Playwright).

## How to Use the Master Template

1. Copy `content/prompts/heroes/_template.mdx` to `content/prompts/{type}/{slug}.mdx`.
2. Fill frontmatter — Zod will give precise errors if anything is invalid.
3. Write all 8 body sections — `validateBodySections` will list missing ones.
4. Run `npm run validate:prompts` — fix until green.
5. Add assets to `public/assets/...` + `public/thumbnails/...` + `public/previews/...`.
6. Run `npm run validate:assets`.
7. Set `status: review` → PR → human review → `published`.

## Risks & Attention Points

| Risk | Mitigation |
|---|---|
| `framer-motion` v11 breaking changes | Pinned to `^11.11.0`; test `motion.div` variants before batch production |
| `next-mdx-remote` + `mdxRs` | Already enabled in `next.config.mjs`; don't remove |
| Supabase RLS hides drafts | Anon can only SELECT `status='published'`; use service_role for seeding |
| Stripe webhook not registered | Must add `https://<domain>/api/webhooks/stripe` in Stripe Dashboard with `checkout.session.completed`, `customer.subscription.*` |
| `sharp` native binary | Requires `npm install` on target platform; Vercel handles it |
| `zustand` / `zod` version drift | Pinned in package.json; don't bump without testing prompt-loader |
| Large video assets bloat git | Use Git LFS or store in R2/Supabase Storage, not in git |

## Commands

```bash
npm install
npm run dev              # http://localhost:3000
npm run validate:prompts # Zod + section checks
npm run validate:assets  # existence + naming + size
npm run typecheck        # tsc --noEmit
npm run generate:manifest # public/manifest.json
npm run seed             # sync content → Supabase (needs .env)
```

## Environment

Copy `.env.example` to `.env.local` and fill Supabase + Stripe keys. Without them, the app boots but gallery falls back to `manifest.json` and checkout is disabled — which is fine for local content authoring.
