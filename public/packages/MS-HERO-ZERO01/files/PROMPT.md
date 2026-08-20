# ZERO ENERGY - 3D range gallery

Build a premium full-page **3D range gallery** for a beverage or physical product family.

## Promise

Visitors see **six labeled vessels on one dark stage**. They grab the can they want and turn the whole range by hand. Scroll then opens flavor, four proof beats, a hard closer, the pack, and FAQ. It must feel like a private tasting of the lineup, never a photo slider and never a single-can hero.

## Media (required)

Place under `public/assets/zero-energy/`:

| File | Role |
|------|------|
| `webgl/can.glb` | Primary can mesh |
| `webgl/base.glb` | Stage / base mesh |
| `webgl/hdri2.hdr` | Studio reflections |
| `textures/zero-energy_texture_*.webp` | Six flavor labels, source order |
| `img/zero-energy_logo.webp` | Navbar lockup. The Z cut is designed. |
| `img/zero-bullshit-mask.svg` | Closer mark |
| `fonts/*.woff2` | Geist + Franklin Gothic ATF Black Italic |
| `audio/*.mp3` | UI sounds |
| `css/*.css` | Gallery sheets |

Prefer integrating pack source over rewriting:

- `ZeroEnergyGallery.tsx` (default export)
- `sections/can-gallery/CanGallery.tsx`
- `lib/webgl-scene.js`
- `lib/hud-init.ts`
- `data/flavors.ts`
- `data/copy.ts`

## Architecture (non-negotiable)

1. **Pin-until-complete.** One fixed viewport stage. Wheel / trackpad / touch drive virtual progress. No traditional long-page scrollbar. Do not build a tall multi-vh sticky ScrollTrigger track.
2. **Clock:** Lenis `{ infinite: true, autoRaf: false }`. Lenis scroll **seeks** the GSAP timeline. **Not** `ScrollTrigger.scrub`.
3. **Three 0.161.0 exact.** Raw Three module. **No React Three Fiber. No drei.** Do not bump Three.
4. **One carousel.** Six labels. Spacing `3.5`. Camera FOV `20`. Grab + arrows + liquid pager stay in sync.
5. **Journey order:** carousel → flavor profile → four benefits → ZERO BULLSHIT → packshot → nine FAQ → closer.
6. **Local only.** No `mailto`, no outbound `https`, no Google Fonts, no CDN, no `fetch`.
7. **Logo Z.** Designed italic cut. Do not "fix" it.
8. **Reduced motion:** settle on chapter 1. Readable cans. No timeline thrash.
9. **Cleanup:** dispose WebGL, composer, textures, and animation frame on unmount.
10. **Embed:** if this sits inside a longer site, pin until the closer finishes, then release.

## Look and feel

- Pure black canvas `#000`.
- Geist for UI. Franklin Gothic ATF Black Italic for display. Local woff2 only.
- Six flavor color pairs drive lights, pager, and HUD (see `data/flavors.ts`).
- No frosted glass cards. No purple mesh. No Motionsites pill dock.

## Layout

- Immersive full viewport. Nav: logo + Gamme / Benefices / FAQ. Contact jumps to `#FAQ`.
- HUD around the stage on desktop. Compressed chrome on phones. Touch targets at least 44px.
- Safe side padding so type never touches the edges.

## Technical

- React + TypeScript client components.
- `three@0.161.0`, `lenis@^1.3.0`, `gsap@^3.13.0` + ScrollTrigger + real SplitText.
- Asset base path `/assets/zero-energy` (already wired in `webgl-scene.js`).
- Isolate this Three from any host copy of Three 0.185 or R3F.

## Quality bar

Must feel like opening a private tasting room: one stage, a living range, a hand that chooses, then a scroll that earns the proof. Not a template carousel. Not a single hero can. Not a tall sticky page.

## Dependencies

```
three@0.161.0
lenis@^1.3.0
gsap@^3.13.0
```

## Entry

```tsx
import ZeroEnergyGallery from "./source/ZeroEnergyGallery";

export default function Page() {
  return <ZeroEnergyGallery />;
}
```

ClickMotion · www.ClickMotion.dev
