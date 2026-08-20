# MS - Premium AI Website Prompts & Motion Assets

> Copy. Paste. Launch. Production-ready motion for AI coding tools (Cursor, Claude, Codex, Grok Build, Lovable, Bolt).

## Quick Start

```bash
npm install
cp .env.example .env.local # fill Supabase + Stripe keys
npm run dev # http://localhost:3000
```

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Next.js dev server |
| `npm run build` / `start` | Production build & serve |
| `npm run lint` / `typecheck` / `format` | Quality |
| `npm run validate:prompts` | Validate every prompt MDX against Zod schema |
| `npm run validate:assets` | Check asset existence, naming, size budgets |
| `npm run generate:manifest` | Regenerate `public/manifest.json` |
| `npm run seed` | Sync `content/prompts` → Supabase |
| `npm run test` / `test:e2e` | Vitest + Playwright |

## Docs

### Shipping products for sale (start here)

- [**Ship for sale**](docs/SHIP_FOR_SALE.md) — **mandatory entry gate** for production/sale
- [**Production-ready checklist**](docs/PRODUCTION_READY_CHECKLIST.md) — full phase checklist
- [**Product package law**](docs/PRODUCT_PACKAGE.md) — product folder + zip + PDF (§10)
- [**Agent instructions**](AGENTS.md) — AI must open ship docs before claiming ready

### Core law

- [**Product Law (current)**](docs/PRODUCT_LAW.md) - living source of truth (scaffolding + post-scaffold changes)
- [Prompt visual QA loop](docs/PROMPT_VISUAL_QA_LOOP.md) - see build → fix **prompt** (+ assets), not only code
- Screenshot helper: `node scripts/cleanroom-screenshot.mjs <url> [out.png]`
- [Scaffolding & System Overview](docs/SCAFFOLDING.md) - original 11-deliverable spec
- [Deepseek Prompt Pipeline](docs/DEEPSEEK_PROMPT_PIPELINE.md) - how catalog prompts are authored
- [CMS Admin](docs/CMS_ADMIN.md) - products / genres / collections
- [Taxonomy](docs/TAXONOMY.md) - categories, styles, intensity, naming
- [Content Plan: First 100](docs/CONTENT_PLAN_100.md)
- [Asset Pipeline](docs/ASSET_PIPELINE.md)
- [Quality Checklist](docs/QUALITY_CHECKLIST.md) - 40-point gate
- [Handoff](docs/HANDOFF.md) - for the next AI / engineer
- [Residual backlog](RESIDUAL_BACKLOG.md) - open engineering debt

## Structure

```
content/prompts/{heroes,sections,landing-pages,special}/ # MDX source of truth
public/{assets,thumbnails,previews,manifest.json}
src/{app,components,config,lib,types,styles}
supabase/migrations/
scripts/validate-*.ts generate-*.ts seed.ts
docs/ legal/
```

See `docs/SCAFFOLDING.md` §2 for the full annotated tree.

## Environment

See `.env.example`. Supabase + Stripe keys required for gallery DB, auth, and checkout. The app boots without them (falls back to `manifest.json`, checkout disabled) - useful for local content authoring.

## License

Commercial license at `legal/LICENSE_COMMERCIAL.md`. Requires attorney review before public launch.
