# Morphic Liquid Glass (M.A.C. / Triada recipe)

**Status:** Working recipe proven on Mirage cleanroom demo  
**Reference build:** `cleanroom/mirage-from-prompt/MirageAgencyHero.tsx`  
**Source of truth (read-only):** Triada monorepo — DockRobotCompanion + `.os-widget*` / `.lg-material*` / design tokens  
**Scope:** Use **inside product demos / sold product prompts only**. Not MS storefront chrome (see `PRODUCT_LAW.md`).

This is the glass that actually morphs: dark translucent fill + strong blur + chroma boost so **film/wallpaper shows through** and shifts as content moves behind the panel. Not white frosted glass. Not a solid dark card.

---

## 1. Mental model — three-layer stack

Never put text on the blur node. Structure:

```
shell (border-radius, outer shadow, overflow)
  └── glass layers  (absolute, pointer-events: none, z-index: 0)
        ├── fill      ← dark translucent + backdrop-filter
        └── specular  ← top-edge catch only (not a white wash)
  └── body          (relative, z-index: 1) ← all readable content
```

| Layer | Job |
|-------|-----|
| **Shell** | Shape, clip, depth shadow, hairline edge |
| **Fill** | Morphic material — tint + blur + saturate |
| **Specular** | Thin light catch on top edge / diagonal; sells “glass”, not “frost” |
| **Body** | Typography, chips, metrics — **above** the blur |

### DOM sketch

```tsx
<div className="sheet-shell">
  <div className="glass" aria-hidden>
    <div className="glass-fill" />
    <div className="glass-specular" />
  </div>
  <div className="body">{/* content */}</div>
</div>
```

---

## 2. Canonical fill (the morph)

```css
.glass-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  /* Dark translucent — NOT white, NOT near-opaque */
  background: rgba(28, 30, 42, 0.38);
  /* Strong blur + chroma boost so background color reads through */
  -webkit-backdrop-filter: blur(36px) saturate(190%) !important;
  backdrop-filter: blur(36px) saturate(190%) !important;
}
```

### Why these numbers

| Token | Working range | Notes |
|-------|---------------|--------|
| **RGB** `28, 30, 42` | Keep cool slate, not pure black | Matches Triada OS widget / M.A.C. |
| **Alpha** `0.36–0.42` | Sweet spot ~`0.38` | Lower = more morph / film show-through; higher = heavier card |
| **Blur** `32–40px` | Canonical `36px` | Below ~20px feels like a tint; 36px is morphic |
| **Saturate** `160–200%` | Canonical `190%` | Pulls desert / film chroma into the glass |

**Do not** use:

- White / light frosted fills (`rgba(255,255,255,0.1–0.25)`) for this look
- Alpha ≥ `0.7` (reads as solid dark plate)
- Blur without saturate (muddy grey, not liquid)
- Putting `backdrop-filter` on the same node as text (blurred type)

### Nested chips (glass-on-glass)

Smaller surfaces inside the body — lighter, no second heavy blur unless needed:

```css
.chip-surface {
  background: rgba(255, 255, 255, 0.08);
  border: 0.5px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
}
```

---

## 3. Specular (edge catch, not wash)

```css
.glass-specular {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    inset 0 -1px 0 rgba(0, 0, 0, 0.15);
  background: linear-gradient(
    155deg,
    rgba(255, 255, 255, 0.16) 0%,
    rgba(255, 255, 255, 0.04) 36%,
    transparent 58%
  );
}
```

Keep the highlight **local** (top / diagonal). A full-panel white gradient kills the dark morphic read.

### Shell shadow (depth)

```css
.sheet-shell {
  border-radius: 22px; /* or product radius */
  box-shadow:
    0 18px 52px rgba(0, 0, 0, 0.34),
    0 4px 14px rgba(0, 0, 0, 0.16),
    0 0 0 0.5px rgba(125, 211, 252, 0.12), /* optional brand hairline */
    inset 0 0.5px 0 rgba(255, 255, 255, 0.28);
}
```

---

## 4. Background must exist under the glass

Morphic glass is useless on a flat solid color. Need:

1. **Live film / wallpaper** behind the stack (full-bleed video or rich still)
2. Soft scrim only where type needs help — **do not** paint a heavy opaque veil under the cards
3. Subject / interesting chroma in the zone the glass sits over (Mirage: desert on the right, soft left scrim so type stays legible while glass still samples film)

If the card sits over pure `#07080f`, blur will only re-blur black → looks always-dark.

---

## 5. Critical OS / CSS traps (why cards went “always dark”)

### A. `prefers-reduced-transparency`

Windows **Settings → Personalization → Colors → Transparency effects: Off** sets:

```css
@media (prefers-reduced-transparency: reduce) { ... }
```

If you “respect” that by setting:

```css
background: rgba(28, 30, 42, 0.94);
backdrop-filter: none;
```

…every card becomes a **near-opaque black slab**. For a **liquid-glass product demo**, do **not** kill the material with that media query. Product is the glass.

Still OK: honor `prefers-reduced-motion` for scroll/animation. That is separate from transparency.

### B. `@supports not (backdrop-filter: …)` only

Fallback to denser fill **only** when the engine truly lacks backdrop-filter:

```css
@supports not (
  (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))
) {
  .glass-fill {
    background: rgba(28, 30, 42, 0.82) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}
```

### C. Browser / compositing

- Need a real browser with backdrop-filter (Chrome/Edge/Safari fine; older engines fail gracefully via B)
- Parent with `filter`, certain `transform` + `overflow` combos can break backdrop sampling — keep glass in a normal stacking context over the video
- Hard-refresh after CSS changes; restart Next if styles appear stuck (`npx next dev --port 3004`)

### D. Alpha too high during “debugging”

Raising fill alpha to “fix readability” destroys the morph. Fix readability with **body type color / scrim**, not by solidifying the fill.

---

## 6. Checklist — “is it morphic?”

- [ ] Stack is shell → fill + specular → body (content not on blur node)
- [ ] Fill ≈ `rgba(28, 30, 42, 0.38)` (not white, not 0.9+)
- [ ] `backdrop-filter: blur(36px) saturate(190%)` on fill
- [ ] Specular is edge/diagonal catch only
- [ ] Rich motion or still **behind** the panel; veil not opaque under cards
- [ ] No `prefers-reduced-transparency` kill switch on liquid-glass demos
- [ ] Nested chips lighter, not second full-opacity plates
- [ ] Live verify: scroll or film motion → glass color shifts with background

---

## 7. Where this was proven

| Item | Path |
|------|------|
| Demo component | `cleanroom/mirage-from-prompt/MirageAgencyHero.tsx` |
| Demo route | `/demo/cleanroom-mirage` (port 3004 in local MS) |
| Triada read-only refs | DockRobotCompanion, `.os-widget*`, `.lg-material*`, design tokens |
| Related product prep | `docs/prep/MS-HERO-PRSM01-PREP.md` (Prism multi-panel glass) |

---

## 8. One-liner for future agents

> **Morphic liquid glass = dark translucent slate fill (~0.38 alpha) + blur(36px) saturate(190%) + top specular + content above; never white frost; never kill with reduced-transparency; always put real film/chroma under it.**
