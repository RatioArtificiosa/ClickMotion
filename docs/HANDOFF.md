# MS Handoff — For the Next AI (Grok Build)

**Current product law:** [`docs/PRODUCT_LAW.md`](./PRODUCT_LAW.md)  
**Media vault (paths, naming, grandfather table):** [`docs/ASSET_PIPELINE.md`](./ASSET_PIPELINE.md)  
**Prompt authoring (Deepseek):** [`docs/DEEPSEEK_PROMPT_PIPELINE.md`](./DEEPSEEK_PROMPT_PIPELINE.md)  

Product = sold prompt + **locked client HD**. Site gallery/product preview = **separate** muted UI capture. Never move/rename/overwrite client HD after prep. New videos: role folders + `Product-Purpose-OpaqueId[-PaidSalt]`; do not rename existing files.

**Product page shell (locked):** main display **~960×540**, meta height-matched, **3-card** related rail (`justify-between`, titles flush left), genre gallery below independent — see PRODUCT_LAW “Product page layout (template law — locked)” and `PromptProductView` / `PRODUCT_PAGE_LAYOUT`.

**Storefront description bar (locked 2026-08-10):** every product description must be **ultra-premium and beautiful** like **Helix (MS-SEC-HELI01)** — experience + buyer benefit + brand ownership; never tech laundry lists or negative-only framing. Full rule: `PRODUCT_LAW.md` (Meta panel copy) + checklist **1C.12**.

**Interactive demo movies (project-agnostic):** Playwright `recordVideo` + ffmpeg for pointer/drag/scroll acts — any lab or product. Notes: [`INTERACTIVE_DEMO_RECORDING.md`](./INTERACTIVE_DEMO_RECORDING.md) · scripts: `scripts/record-interactive-demo.mjs`, lab example `Lab/actually/scripts/record-hero-demo.mjs`.

**LLM / agent discovery:** `/llms.txt` (+ `/llm.txt` alias, `/llms-full.txt`) · `robots.txt` · `sitemap.ts` · growth playbook [`AEO_LLM_GROWTH.md`](./AEO_LLM_GROWTH.md). MCP documented as live at `/api/mcp` for agents.

**Product Package PDF:** [`docs/PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) · Admin → Product packages · Opaque filenames in `src/lib/product-packages.ts` (Meridian = golden-rule layout; Aether + Vertex sale-ready). Brand: ClickMotion. Full gate: [`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md).

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
