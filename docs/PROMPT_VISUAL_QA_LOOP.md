# Prompt visual QA loop (product is the prompt)

**Law:** Fixing only the generated code is not enough. The **sold artifact is the prompt** (plus matching video/image assets). Code is the **proof** that the prompt works.

## Goal

See what a blind builder produces → tighten the **buyer prompt** until a clean-room rebuild matches the intended Motionsites-grade result.

## Loop (mandatory order)

```txt
1. CLEAN PROMPT     Buyer-only markdown (no MS shell knowledge)
2. CLEAN-ROOM BUILD Agent/builder sees ONLY that prompt + declared asset paths
3. SEE              Browser screenshot / network / a11y snapshot
4. SCORE            Checklist: type, layout, motion, ASSET MATCH, forbidden elements
5. EDIT PROMPT      Not "patch the React" as the source of truth
6. REBUILD          New clean-room run from updated prompt only
7. REPEAT           Until pass, then screen-record → CMS
```

Code patches during QA are allowed only to **preview** a theory. The durable fix must land in:

- `cleanroom/<slug>/BUYER_PROMPT.md` (and later catalog MDX / CMS body)
- Asset files under `public/assets/videos|posters|thumbnails` — **respect media vault roles** (see below)

### Client HD vs storefront capture (do not mix)

| During QA | Do |
|-----------|-----|
| Cleanroom demo uses | **Client HD** B-roll path from the prompt |
| CMS / gallery proof after pass | New **storefront** `*-preview*.mp4` only |
| Bad encode experiment | Copy to `tmp/` — **never** `-y` overwrite locked client HD or masters |

Full law: [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) · [`ASSET_PIPELINE.md`](./ASSET_PIPELINE.md).

## How we SEE the output

Prefer in this order:

1. **Chrome DevTools MCP** — `navigate_page` → `take_screenshot` → `list_network_requests` (media) → `take_snapshot`
2. **browser-harness** — CDP local Chrome if DevTools MCP is locked
3. **Playwright one-shot** — `node scripts/cleanroom-screenshot.mjs <url> <out.png>` (CI-friendly)
4. User screenshot (always welcome) — still run network check for which video URL loaded

### What to capture each SEE pass

| Capture | Why |
|---------|-----|
| Full viewport PNG | Layout, type, glass, video subject |
| Network media URLs | Which `previewVideo` / bg file actually loaded |
| Console errors | Autoplay blocked, 404 assets |
| A11y snapshot | Missing h1 / broken structure |

## Scorecard (every pass)

Mark **prompt gap** vs **asset gap** vs **builder miss**.

| # | Check | Fail means |
|---|--------|------------|
| 1 | Brand name + palette match design system | Prompt colors/type vague |
| 2 | Exact copy strings present | Content slots incomplete |
| 3 | Nav structure matches | Layout section incomplete |
| 4 | H1/sub hierarchy readable at a glance | Type scale underspecified |
| 5 | **Background video subject matches product** | **Asset wrong OR prompt asset contract weak** |
| 6 | No forbidden subjects in video | Prompt missing FORBIDDEN list |
| 7 | Motion feels premium (stagger, no jank) | Motion numbers missing |
| 8 | Mobile/reduced-motion rules | Responsive/a11y incomplete |
| 9 | No host MS chrome required by prompt | Prompt must say product is self-contained |

### Video is first-class product

Background video is **not** decoration. If wellness prompt plays a private jet, **the product fails** even if UI chrome is perfect.

Prompt must include:

- Exact public path (owned asset)
- **Required visual content** (shot, subject, palette, motion)
- **Forbidden content**
- Poster path
- Encode target (loop, mute, duration band)
- Paired **AI video generation prompt** block (regenerate if asset wrong)

## Clean-room paths

```
cleanroom/<slug>/
  BUYER_PROMPT.md          # product
  ASSET_CONTRACT.md        # optional hard video/image rules
  AetherHeroSection.tsx    # proof build (ephemeral until prompt stable)
src/app/(marketing)/demo/cleanroom-<slug>/page.tsx
```

Demo routes are for **visual QA only**, not the public catalog.

## Anti-patterns

- Editing React until it looks good, then never updating the prompt  
- Shipping CDN / random stock that contradicts the prompt story  
- Accepting “close enough” video because UI is pretty  
- Letting the builder invent aesthetic not in the prompt  

## Related

- `docs/PRODUCT_LAW.md` — product model  
- `docs/DEEPSEEK_PROMPT_PIPELINE.md` — authoring  
- `docs/ASSET_PIPELINE.md` — encode / naming  
