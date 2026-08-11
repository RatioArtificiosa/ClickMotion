# TOKENS — drinkstill.nz design system verbatim → ACTUALLY

Source: `raw/main.css` + `raw/still_raw.html` + fonts. Verified 2026-08-09.

## Framework

- **Next.js 15 App Router + Turbopack + React 19 + Tailwind v4 + Vercel** — `Server: Vercel` `X-Nextjs-Prerender: 1` `data-dpl-id` asset cache bust `?dpl=dpl_HSeafWev...`
- **Single CSS chunk** `16ly9bvo21f.k.css` (37KB), no Google Fonts, no external CDN, no analytics gtag, inline SVG icons only.

## Colors

```css
:root{ --color-bone:#efede6; --color-ink:#1a1b1d; --color-mist:#6a6965; --color-alpine:#1e423e; }
--nav-h:72px; @media(max-width:767px){:root{--nav-h:56px}}
```
- Accent tints: `#bcd3d8` (Clear / icy blue-grey — rule 72px, blob 60vh, scroll dot, dot on wordmark alt), `#e8c9a0` (Dawn warm sand), `#c9b5c8` (Dusk mauve). Opacity variants `30` `14` e.g. `radial-gradient 72%85% at66%52% #bcd3d830→#bcd3d814→transparent72%`
- Overlays: `bg-bone/15`, `bg-ink/10`, `text-bone/50–80`, `border-bone/15`, `border-ink/10`, `text-mist/50`
- `theme-color: #efede6` matches bone, `::selection { background: var(--color-ink); color: var(--color-bone); }`

## Fonts (Klim Type Foundry, self-hosted woff2, font-display:swap)

| Family | File | Weight |
|--------|------|--------|
| Test Söhne | test-soehne-buch.woff2 | 400 |
| Test Söhne | test-soehne-buch-kursiv.woff2 | 400 italic |
| Test Söhne | test-soehne-kraftig.woff2 | 500 |
| Test Söhne | test-soehne-halbfett.woff2 | 600 |
| Test Söhne | test-soehne-extrafett.woff2 | 800 |
| Test Söhne Breit | test-soehne-breit-extrafett.woff2 | 800 + 900 |
| Test Tiempos Headline | test-tiempos-headline-light.woff2 | 300 |
| Test Tiempos Headline | test-tiempos-headline-regular.woff2 | 400 |
| Test Tiempos Text | test-tiempos-text-regular.woff2 | 400 |
| Test Tiempos Text | test-tiempos-text-regular-italic.woff2 | 400 italic |

Tokens:
```
--font-sans:"Test Söhne", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
--font-serif:"Test Tiempos Text", Georgia, serif;
--font-display:"Test Tiempos Headline", Georgia, serif;
--font-wordmark:"Test Söhne Breit", "Test Söhne", -apple-system, sans-serif;
--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
```
Utilities: `font-sans` / `font-serif` / `font-display` / `font-wordmark` map to above.

Body: `font-family:var(--font-sans); -webkit-font-smoothing:antialiased; line-height:1.65; font-weight:400;`
All H2 that are editorial = **Tiempos Headline 300**; all H2 that are headers (press/stockists/CTA) + wordmarks = **Söhne Breit 800/900** uppercase. See per-section H3 tables.

## Type scale (hero example, verbatim inline styles trump utilities)

- H1 wordmark: `font-wordmark font-[800] leading-[0.78] tracking[-0.03em] text-ink font-size:23vw` (~330px @1440). Nav wordmark `22px 900 -0.5px` + `8×8px bg-alpine` dot.
- Eyebrow: `font-sans 12px tracking 0.2em uppercase` (`01 / The formula`) with `01` bone / `/` bone/40.
- H2 hero: `clamp(28px, 2.8vw, 44px) 300 leading 1.08 tracking -0.01em text-bone`
- Body hero: `16px leading 1.65 text-bone/80 max-w 42ch`
- Stats: `17px tabular-nums font-display text-bone` + labels `13px text-bone/60`
- Flavor H2: `clamp(32px, min(4.6vw, 6.5vh), 64px) 300 leading 1.0 tracking -0.02em`
- Flavor H3 Clear.: `clamp(52px, min(7.6vw, 12vh), 128px) 300 leading 0.92 tracking -0.015em` with `.` in `#bcd3d8`
- Ingredient H3: `clamp(32px, 4vw, 48px) wordmark 900 leading 0.9 tracking -0.02em` uppercased
- Caps nav: `14px 400 tracking 0.04em text-mist hover:text-ink duration 250ms` + `nav-underline` (`:after height1px scaleX 0→1 transform-origin 0 duration .3s`)

## Layout

- Nav: `fixed z-50 h:var(--nav-h) bg transparent backdrop none border transparent` → on scroll `bg-bone + blur 8px + border-bone` + hide via `translateY`. Inner `max-w-[1440px] mx-auto px-5 md:px-8` (`20px` mobile, `32px` desktop). `gap-8` between links. Mobile drawer `fixed inset-0 z-[60] bg-bone opacity0` with `gap-9` vertical links `32px 600 -0.005em`.
- Section widths: `max-w-[1440px]` nav+flavors+inside+story inner, `max-w-[1280px]` press inner, `px clamp(24px,4vw,64px)` hero bottom, `px clamp(24px,6vw,120px)` flavors/story, `py-24 md:py-[140px]` press.
- Grids: flavors `minmax(320px, 5fr) minmax(0, 7fr)` 12-col feel; inside `12-col 4+5+3` (stack to 1-col mobile); shop stockists `md:grid-cols-3 gap-12` 15 items; shop cards `md:grid-cols-3 gap-12` 3 SKUs.
- Breakpoint: **`md:768px` only** — no lg/xl. `hidden md:flex` / `md:hidden`.

## Motion / Grain / Cursor

- **Authoritative motion:** `notes/GSAP-ANIMATIONS.md` (solo re-audit). GSAP **3.15.0** + ScrollTrigger + SplitText + DrawSVGPlugin.
- SmoothScroll: `Lenis({lerp:.1,smoothWheel:true})` + `lenis.on("scroll",ScrollTrigger.update)` + `gsap.ticker.add(t=>lenis.raf(1000*t))` + `lagSmoothing(0)`.
- Hero: `clip-path:circle(0px at 50% 48%)` driven by ticker `d=170*entrance+swell+breath*entrance+scrollBoost` (see GSAP doc); pin `+=120%` desktop only.
- Nav chrome (corrected): when `scrollY>80` or mobile → bg `rgba(239,237,230,0.92)`, **`backdrop-filter:blur(20px)`**, border `1px solid rgba(140,139,134,0.4)`; transform hide **400ms ease-out** after hero leaves viewport (bottom≤100). Magnetic links strength **.3**, quickTo **.4 power2.out**. Link color transition **250ms**.
- Grain: `<div class="grain-overlay" aria-hidden>` fixed `z-90 opacity .04` SVG turbulence `baseFrequency=0.82` numOctaves 2, `background-size 160px`.
- **Two cursors:** (1) Global dual cursor `z-[200]`: 6px white dot quickTo **.08** + 36px ring quickTo **.45**, modes 36/56/76. (2) Hero-only **459px** radial ring (clip follower) — not the same component.
- Scrollbar hidden: `[&::-webkit-scrollbar]:hidden`, overflow-x clip.
- Bloom CSS: hero **soft** 60vh opacity .85 blur **6**; strong = .92 blur **2**. WebGL canvases separate (hero/flavors/inside).

## ACTUALLY swap

Keep all tokens; only rename `STILL` → `ACTUALLY` where rendered. Nav wordmark: `<span>ACTUALLY</span><span class="bg-alpine 8×8 ml-2"></span>` same `22px 900 -0.5px`. Do not change hex, font files, or sizes.
