# Lineup cleanroom - MS-SEC-LINE01

Production reference: **product line reveal** with a **data-driven N-SKU** 3D stage.

| | |
|--|--|
| Live demo | `/demo/cleanroom-lineup` |
| Product id | `MS-SEC-LINE01` |
| Prompt MDX | `content/prompts/sections/MS-SEC-LINE01.mdx` |
| Customization | **`CUSTOMIZATION.md`** |
| Buyer short | `BUYER_PROMPT.md` |

## No Scroller (pin-until-complete)

Not PSAVE. Desktop scroll aims virtual progress on **N viewports** (N = `PRODUCTS.length`). Snap on lift. After the last SKU the page owns until dock. Mobile uses horizontal snap cards.

- One `100dvh` stage in normal document flow
- Do **not** install lenis. Do **not** overflow-hidden the host page
- gsap stays for SKU cross-fade tweens only. No ScrollTrigger pin

## Entry

```tsx
import LineupSection from "./LineupSection";

export default function Page() {
  return (
    <>
      <LineupSection />
      {/* Next sibling may scroll in after the pin releases. */}
    </>
  );
}
```

## Files

- `lineup-data.ts` - products, chrome, specs
- `LineupSection.tsx` - desktop virtual progress + mobile cards
- `Can3D.tsx` / `InlineCan.tsx` - vessel
