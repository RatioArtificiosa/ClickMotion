# MIRAGE - AI build prompt

**Product:** MIRAGE (No Scroller agency desert glass hero)  
**SKU:** MS-HERO-MIRA01  
**Brand:** ClickMotion · www.ClickMotion.dev  

You are an expert front-end engineer. Build this hero **exactly** as specified using **only the files in this pack**. Prefer integrating `source/MirageAgencyHero.tsx` over rewriting from scratch.

---

## User will say

> Build MIRAGE using the files in this folder. Read PROMPT.md and follow it exactly.

---

## What you are building

A full-viewport **advertising-agency hero** (not a mid-page section):

1. One **pinned `100dvh` stage** `#mirage-hero` in normal document flow.
2. **No Scroller (pin-until-complete):** wheel / trackpad / touch / keys aim **virtual progress `g` 0→1**. The page does not physically scroll during the viewing.
3. Earn: **`max(2.4, sheets × 1.55)` viewports**. At five sheets that is **7.75** viewport heights of wheel distance. `virtualDistance = earn × window.innerHeight`. Progress += deltaPx / virtualDistance. No wheel gain.
4. At progress **0 + scroll up** or progress **1 + scroll down**, **release** so the host page can continue.
5. **Pin freeing (mandatory):** after release at **g = 1 + down**, the **page owns** wheel / touch / keys until the stage docks (`getBoundingClientRect().top >= -2`). Pointer on the next sibling never drives the cards.
6. Looping muted **desert film** under a soft left veil. Subject held on the **right** (`object-position: 72% center`). **Never** scrub `video.currentTime`. Film does not rewind.
7. Five **morphic dark liquid-glass** story cards (hidden deck) with one-way `rotateX` journey: **+64° → face (0°) → −64°**. Sheet 0 starts near face-on (`from ~0.38`) so the hero never opens empty.
8. Left rail: kicker, two-line large headline, card deck, centered progress footer.
9. `prefers-reduced-motion`: static stacked cards, gradient fallback, no video chase.
10. Capture helper: `window.__msScrollNarrative = { setProgress, getProgress, getTarget, pageOwns, productId: "MS-HERO-MIRA01" }`. Root: `data-mirage-drive="pin"`. After release: `data-mirage-owns="page"`. While the pin owns: `data-mirage-owns="pin"`.

**Hard ban:** Framer `useScroll` on a tall document spacer.  
**Hard ban:** a 5 × 1.55 vh **document spacer** as the method (those numbers are **virtual earn** only).  
**Hard ban:** keeping the pin armed after release so up-scroll in the next section rewinds the cards.  
**Hard ban:** PSAVE / GOP 3 / reverse film. Mirage film free-plays. Do not add PSAVE.  
**Hard ban:** mapping scroll to `video.currentTime`.  
**Hard ban:** `overflow: hidden` on the host page.  
**Hard ban:** installing `gsap` or `lenis`.

---

## Files to use

```
START-HERE.md
PROMPT.md
CUSTOMIZATION.md
assets/
  mirage-desert-v1.mp4
  mirage-desert-v1.webp
source/
  MirageAgencyHero.tsx
```

Place media:

- `public/assets/videos/mirage-desert-v1.mp4`
- `public/assets/posters/mirage-desert-v1.webp` (optional poster)

---

## Asset contract

| Field | Value |
|-------|--------|
| Film | `/assets/videos/mirage-desert-v1.mp4` (silent loop) |
| Poster | `/assets/posters/mirage-desert-v1.webp` (pure film still) |
| Attributes | muted autoPlay loop playsInline preload auto, object-fit cover, object-position 72% center |
| Mode | No Scroller virtual progress + glass pivot. Never video scrub. Never PSAVE. |

### FORBIDDEN

- Tall multi-vh page scroll track
- Storefront `*-preview*` files in the buyer build
- Scrubbing film with progress
- Reverse-played video / PSAVE
- White frosted cards or opaque black plates
- Motionsites pill nav
- Empty sparse marketing cards
- Em dashes in customer-facing copy
- Host ClickMotion marketing shell inside the hero

---

## Design system

| Token | Value |
|-------|--------|
| Stage ink | `#07080F` |
| Glass fill | `rgba(28, 30, 42, 0.38)` |
| Glass blur | `blur(36px) saturate(190%)` |
| Type | `#FAF8F5` / `rgba(255,255,255,0.94)` |
| Gold accent | `#FDE68A` |
| Cyan accent | `#7DD3FC` |
| Chip surface | `rgba(255,255,255,0.08)` |
| Display | Syne 600, tracking `-0.04em`, two-line H1 |
| Body | DM Sans / clean sans, 13px, line-height 1.55 |

**Morphic liquid glass (mandatory, content NEVER on the blur node):**

1. Shell: radius ~22px, hairline rim, depth shadow
2. Fill: dark translucent slate + `backdrop-filter: blur(36px) saturate(190%)`
3. Specular: top-edge catch + diagonal highlight only (not a white wash)
4. Body content **above** glass layers
5. Nested chips: light translucent surfaces
6. Do **not** kill glass via `prefers-reduced-transparency` (Windows transparency-off was producing solid dark slabs). Reduced-motion remains static cards.

---

## Default content (starting board)

**Kicker:** Advertising · Brand · Growth  
**Headline two lines exactly:**

```
Creative that
survives the heat.
```

| # | Eyebrow | Title |
|---|---------|-------|
| 01 | Brand thesis | Find the idea that outlasts the feed. |
| 02 | Creative systems | Campaigns built like products, not one-offs. |
| 03 | Media craft | Put every dollar where attention is honest. |
| 04 | Always-on | A studio cadence, not a campaign panic. |
| 05 | Growth proof | Outcomes the board can audit. |

Prefer the dense block content already in `source/MirageAgencyHero.tsx` (metrics, rows, lists, chips, quote).

Nav (text only): Work, Method, Clients, Culture, Contact.

---

## Rebuild algorithm (mandatory)

1. One `100dvh` section `#mirage-hero` in normal flow. Next sibling is the buyer's page, not a fake footer inside the component.
2. Listen to wheel (non-passive), touch, and keys while the section is in view **and** the pointer is on the stage.
3. Map delta onto `max(2.4, sheets × 1.55)` viewports. Write `g` 0…1.
4. Apply card `rotateX` / opacity / scale / y maps from `g` immediately (old `useScroll` feel).
5. Pin freeing:

```
pageOwns = false
on each gesture:
  if stage.top >= -2: pageOwns = false
  if pageOwns: do not preventDefault; return
  if g >= 1 and delta > 0: pageOwns = true; do not preventDefault; return
  if g <= 0 and delta < 0: do not preventDefault; return
  else: apply delta to g; preventDefault
```

6. Film plays on its own clock. Never seek. Never reverse.
7. Do not set `overflow: hidden` on the host page.

React + TypeScript + Framer Motion (`useMotionValue`, `useTransform`, `useReducedMotion`). Tailwind optional. **No GSAP. No ScrollTrigger. No Lenis. Do not add PSAVE.**

---

## Confirm after build

- Page scrollY stays 0 while two desktop 1800px flicks advance `g` (two flicks on 7.75 × 900 ≈ 0.516, card 03)
- Film is playing and does not seek
- After `g` hits 1, one more down-scroll moves the page
- After that release, scrolling up in the next section moves the page. `g` stays at 1 until the stage docks
- After the stage docks at the top, one more up-scroll may rewind the cards
- Pointer on the next sibling never changes `g`
- Reduced motion shows static stacked cards
- No pin-spacer, no gsap, no lenis in the bundle for this hero

ClickMotion · www.ClickMotion.dev
