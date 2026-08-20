# ClickMotion Brand Specs

**Status:** Locked for product packages + site wordmark · 2026-08-08  
**Related:** [`PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) · [`PRODUCT_LAW.md`](./PRODUCT_LAW.md)

---

## Name and web

| Item | Value |
|------|--------|
| **Wordmark text** | `ClickMotion` (one word, capital C and M) |
| **Website** | `https://www.ClickMotion.dev` (display as www.ClickMotion.dev) |
| **Support** | Use website contact when live; optional email later |
| **Logo mark** | **None for V1** - wordmark only (no icon required) |

Internal repo may still use folder names like `MS`; **customer-facing** name is ClickMotion.

---

## Wordmark type

| Spec | Value |
|------|--------|
| **Font** | [Birthstone](https://fonts.google.com/specimen/Birthstone) (Google Fonts, designed by Robert Leuschke) |
| **File (repo)** | `public/fonts/Birthstone-Regular.ttf` |
| **Weight** | Regular 400 |
| **Usage** | Wordmark only (header, PDF cover/footer). Not for long body copy. |
| **On dark / black** | White (or near-white cream) fill + **soft white glow** (Grok-style): e.g. `text-shadow: 0 0 20px rgba(255,255,255,0.45), 0 0 40px rgba(255,255,255,0.2)` |
| **On light** | Near-black fill; glow off or very subtle |
| **Sizing** | **Always fit the container** - change font size (down from a max, never below a min floor) so the full wordmark never clips, truncates, or wraps. Prefer one line. Clipping/ellipsis is forbidden for the wordmark. |

### Site implementation

- Component: `src/components/brand/FitWordmark.tsx`
- Measures container width + string width; binary-searches rem size between min and max.
- `ResizeObserver` re-fits on layout change (nav collapse, viewport resize).
- Glow via multi-layer `text-shadow` (white, soft).

```css
/* Glow only; size is set in JS so it always fits */
.wordmark-clickmotion {
  font-family: var(--font-wordmark), cursive;
  font-weight: 400;
  color: #ffffff;
  white-space: nowrap;
  text-shadow:
    0 0 12px rgba(255, 255, 255, 0.55),
    0 0 28px rgba(255, 255, 255, 0.28),
    0 0 48px rgba(255, 255, 255, 0.12);
}
```

### PDF reference

- Register Birthstone TTF in the package generator (`scripts/generate-product-package-pdf.py`).
- Draw wordmark in **pure white** core; multi-pass soft **white** glow (Grok-style bloom; never cream/gray fill for the brand name).
- Cover lockup: sit wordmark close to the gold L-corner with a little right margin (not full content width).
- Footer mini wordmark uses the **same** white + glow treatment.
- **Fit always:** `fit_font_size()` measures string width; reduce point size until it fits the max width (min size floor e.g. 14pt). Same law for product titles and long URLs.

---

## Voice (customer PDFs and marketing)

- Speak **to the buyer** (you / your).
- **No em dash** characters. Use comma, period, or ` - `.
- **No backend leaks:** no thumbnails, storefront captures, CMS, MDX paths, admin, scaffolds, internal IDs unless needed for support.
- **No jargon without help:** do not assume they know React. Tell them to **ask their AI** to do technical work.
- Customization = plain English: “Ask your AI to change X to Y” with fill-in blanks.

### Storefront product descriptions (gallery + product page)

**Gold standard:** Helix (`MS-SEC-HELI01`) — write every description at this quality from now on.

| Do | Don’t |
|----|--------|
| Spatial, calm, specific craft language | Tech stack laundry lists (GSAP, ScrollTrigger, Three…) |
| What the visitor experiences + what the buyer gains | Negative-only framing (“no background film”) when a positive reframe exists |
| Brand ownership / customization (“your work”, “made for your brand”) | Hype clichés (“wow”, “stunning”, “next-level”) |
| Soft ≤200 / hard ≤230 characters | Em dash; scaffold or internal notes |

Canonical rule: [`PRODUCT_LAW.md`](./PRODUCT_LAW.md) · gate: [`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md) §1C.12.

---

## Product package (PDF + files zip — summary)

See [`PRODUCT_PACKAGE.md`](./PRODUCT_PACKAGE.md) (full law; **§10 = files zip protocol**). Customer delivery includes:

### Product Package PDF
1. ClickMotion wordmark + www.ClickMotion.dev  
2. Simple steps  
3. Video link alone + video inside each AI prompt (when film product)  
4. One ready-to-paste prompt per tool (Cursor, Claude, Grok Build, Lovable, Codex / ChatGPT, Bolt, Your Smart AI Agent), adjusted per tool if needed  
5. Customize by telling the AI what to change  
6. Optional video recreation prompt for a video AI  

### Files zip (rebuild flagships)
1. `START-HERE.md` — ClickMotion steps; what is / is not in the pack  
2. `PROMPT.md` + `CUSTOMIZATION.md` — buyer voice, no backend leaks  
3. `source/` + `assets/` — production code + **client** rebuild media only  
4. Opaque name: `{Product}-files-{OpaqueId}[-{PaidSalt}].zip`  
5. **Get Full Prompt** prefers zip over PDF when registered  

**Meridian package PDF is the gold standard** for PDF layout.  
**Studio Sequence product folder + files zip is the gold standard** for rebuild tree shape.  
**Ship entry:** [`SHIP_FOR_SALE.md`](./SHIP_FOR_SALE.md) · **Full gate:** [`PRODUCTION_READY_CHECKLIST.md`](./PRODUCTION_READY_CHECKLIST.md).

---

*Update when domain DNS or support email goes live.*
