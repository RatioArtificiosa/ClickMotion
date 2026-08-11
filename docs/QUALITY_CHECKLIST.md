# MS Quality Checklist — 40 Points

Every prompt must pass all applicable points before `status: published`. CI enforces the automatable ones; human review covers the rest.

> **Full production gate (prompt + media + package PDF + CMS + vault):**  
> **[`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md)** — ultra-thorough master protocol.  
> Meridian package PDF is the **prompt gold standard** for buyer delivery.

## 1. Motion Quality (10 pts)

| # | Check | How to verify |
|---|---|---|
| 1 | Easing is not `easeOut` everywhere — uses spring or custom bezier where appropriate | Read motion spec |
| 2 | Stagger values are 0.05–0.2s (not 0.5s+ which feels sluggish) | Read motion spec |
| 3 | ScrollTrigger `scrub` is `true` or `0.5–2` (not `5` which feels laggy) | Read motion spec |
| 4 | Parallax speed is `0.2–0.8` vertical, never >1.0 | Read motion spec |
| 5 | `prefers-reduced-motion` disables/reduces all animations | Code + manual test |
| 6 | No layout shift (CLS) from animations — uses `transform`/`opacity` only | Lighthouse |
| 7 | Animations run at 60fps (no long tasks >50ms during animation) | Chrome DevTools Performance |
| 8 | Entrance sequence completes in <1.2s total | Manual |
| 9 | Hover states are specified and feel responsive (<100ms) | Manual |
| 10 | Motion intensity matches declared level (subtle ≠ 12 animations) | Count animations |

## 2. Code Quality (10 pts)

| # | Check | How to verify |
|---|---|---|
| 11 | Single React component file, default export, no extra files needed | Read Expected Output |
| 12 | Imports are correct and pinned to declared dependency versions | `validate:prompts` |
| 13 | Tailwind only — no inline styles, no CSS modules | Read prompt body |
| 14 | No `any` types if TypeScript; props are typed | `typecheck` |
| 15 | No hardcoded lorem — placeholders use `{{slot}}` or clearly marked defaults | Read Content Slots |
| 16 | `compatibleWith` IDs exist and are valid | `validate:prompts` |
| 17 | Frontmatter passes Zod schema (IDs, slugs, enums, arrays) | `validate:prompts` |
| 18 | All 8 body sections present | `validateBodySections` |
| 19 | AI Tool Instructions cover at least Cursor + Lovable/Bolt | Read section |
| 20 | Expected Output checklist is numbered and testable | Read section |

## 3. Responsiveness (8 pts)

| # | Check | How to verify |
|---|---|---|
| 21 | 5 breakpoints documented and behavior is distinct per breakpoint | Read Responsive table |
| 22 | No horizontal scroll at 320px | Manual / Playwright |
| 23 | Touch targets ≥44×44px | Manual |
| 24 | Text remains readable at 320px (no tiny fonts) | Manual |
| 25 | Images/videos scale or hide appropriately on mobile | Manual |
| 26 | Navigation collapses to hamburger or stack on mobile | Manual |
| 27 | Motion is reduced on mobile (less parallax, simpler staggers) | Read motion spec |
| 28 | Tested in Chrome, Safari, Firefox (or Playwright) | CI / manual |

## 4. Performance (6 pts)

| # | Check | How to verify |
|---|---|---|
| 29 | JS budget stated and <50KB (sections) / <150KB (3D heroes) | Read Performance Notes |
| 30 | Images are WebP/AVIF, lazy-loaded below fold | Read Performance Notes |
| 31 | Video poster shown immediately, video async | Read Video Integration |
| 32 | Fonts use `font-display: swap` and are preloaded if critical | Read Performance Notes |
| 33 | `will-change` only on animated elements, removed after animation | Read motion spec |
| 34 | Lighthouse Performance ≥90 on generated output (estimated) | Lighthouse |

## 5. Commercial Readiness (6 pts)

| # | Check | How to verify |
|---|---|---|
| 35 | Copy is production-ready; no "Lorem ipsum" outside slot defaults | Read all sections |
| 36 | Content Slots table has max lengths and notes | Read Content Slots |
| 37 | Thumbnail + **storefront** preview video exist (or placeholder noted for draft) | `validate:assets` |
| 37b | **Client HD** (B-roll) is a **separate** locked file from storefront captures; correct folder/role (ASSET_PIPELINE) | Path review + vault law |
| 37c | Client HD has **no burnt MS UI** (Scroll badge, cursor, shell); demos may use HTML overlays only | Visual / file role |
| 37d | Capture / ffmpeg never overwrote master or client HD in place (copy-out only); client not moved/renamed after prep | Process / git history |
| 37e | Product page shell follows PRODUCT_LAW layout: main **~960×540**, meta height-matched, rail **3** cards space-between, rail titles flush left; genre gallery below unchanged | Product page visual / `PromptProductView` |
| 37f | Paths recorded in MDX + CMS + `owner-designs` (flagships); new assets use naming protocol; legacy names not force-renamed | ASSET_PIPELINE §3–§4–§8 |
| 37g | Publish media complete: **preview video + thumbnail + poster** (storefront) + **client HD** + **Product Package PDF** registered | Admin Preview media + `/admin/packages` + PRODUCT_PACKAGE.md |
| 38 | `priceTier` matches value (free = simple, agency = premium/3D) | Manual |
| 39 | Storefront description compelling; soft ≤160 / hard ≤180 chars (PRODUCT_LAW) | Zod + manual |
| 40 | License header / commercial-use note present | Read prompt footer |

## Publishing Gate

```
validate:prompts  ✓
validate:assets   ✓  (warn allowed for drafts)
typecheck         ✓
manual review     ✓  (required for motionIntensity: extreme)
```

Only then set `status: published`.
