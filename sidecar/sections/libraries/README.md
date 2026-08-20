# Libraries (factory)

Machine-readable catalogs for agents. Not a public aisle.

| File | What |
|------|------|
| `schema.json` | JSON Schema for the catalogs |
| `motion-primitives.json` | Named signature motion recipes with numbers |
| `enter-recipes.json` | Section enter landings (56). Human index: `ENTER.md` |
| `WOW.md` | Wow register index: 10 languages, 20 themes, 50 primitives |
| `design-languages.json` | V1 eight languages |
| `token-themes.json` | Palettes, type, space, radius, timing |
| `composition-rules.json` | Legal mixes and hard bans |

Status values: `canonical` (use), `stub` (shape only, fill before SKU), `banned-as-default` (exists so agents know to avoid).

When merging: add Zod + `scripts/validate-libraries.ts`. Until then, treat schema.json as the contract.

Sold prompts must cite `designLanguage`, `tokenTheme`, and `motionPrimitive` ids. If an id is `stub`, do not ship a SKU on it. Fill the stub first.
