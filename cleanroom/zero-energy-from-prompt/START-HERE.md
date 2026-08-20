# ZERO ENERGY — start here

**SKU:** `MS-HERO-ZERO01`  
**Status:** first production pass. Demo `/demo/cleanroom-zero`. Pack / PDF / zip / CMS published.  
**Lab (frozen machine):** `Lab/zero-energy/app` · port **3071**

## What this is

One shared module: `sections/can-gallery/CanGallery.tsx`

3D can carousel (six flavors) → profile → 4 benefits → ZERO BULLSHIT → packshot → 9 FAQ → closer.

`/home` redirects to the gallery on purpose. Do not assemble a separate Home unless a human reopens.

## Stack (locked)

| Piece | Pin |
|-------|-----|
| Vite + React 19 + TS | Lab |
| three | **0.161.0 exact** — do not bump |
| lenis | ^1.3 — `infinite`, `autoRaf: false` |
| gsap | ^3.13 + ScrollTrigger + SplitText (real plugin) |
| R3F | **No** — raw Three module |

**Clock:** Lenis scroll seeks the timeline. Not `ScrollTrigger.scrub`.

## Do not

- Fork the lab scene
- Add mailto, https, Google Fonts, CDN, fetch, socials
- "Fix" the logo Z (designed italic cut)
- Bump Three to match other MS products
- Convert this to a tall multi-vh sticky ScrollTrigger track

## Read next

1. `BUYER_PROMPT.md`
2. `CUSTOMIZATION.md`
3. `README.md`
