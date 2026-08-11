# Lineup cleanroom — MS-SEC-LINE01

Production reference implementation of the **product line scroll reveal** section.

| | |
|--|--|
| Live demo | `/demo/cleanroom-lineup` |
| Package | `/packages/MS-SEC-LINE01/Lineup-package-l7n3e9k2m4p8.pdf` |
| Prompt MDX | `content/prompts/sections/MS-SEC-LINE01.mdx` |
| Customization | **`CUSTOMIZATION.md`** (AI expand / any product) |
| Buyer short | `BUYER_PROMPT.md` |

## Entry

```tsx
import LineupSection from "./LineupSection";
// wrap with SmoothScroll when Lenis is not already on the page
```

## Data-driven N products

Edit **`lineup-data.ts` only** to change count, copy, colors, specs.  
`LineupSection` maps `PRODUCTS` for pin length, snap, tabs, blooms, ghosts, and mobile cards.

## Capture storefront previews

```bash
# Next storefront must serve /demo/cleanroom-lineup
node scripts/capture-lineup-preview.mjs
```

Outputs:

- `public/assets/videos/lineup-reveal-preview-v1.mp4`
- `public/assets/videos/lineup-reveal-preview-fs-v1.mp4`
- `public/assets/posters/lineup-reveal-preview-v1.webp`
- `public/thumbnails/MS-SEC-LINE01.webp`
