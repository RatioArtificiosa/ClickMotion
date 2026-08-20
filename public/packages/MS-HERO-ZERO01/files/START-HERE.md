# ZERO ENERGY - start here

You are about to place a **3D range gallery** on your site: six vessels on one dark stage that visitors turn by hand, then a scroll journey through flavor, proof, closer, pack, and FAQ.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: swap brand, six labels, copy, colors, pace. |
| **assets/** | Client rebuild media only: GLB, HDR, six labels, logo, fonts, audio, CSS. |
| **source/** | Production React components, data, and the WebGL scene. |

## What you do (about 15 minutes)

1. Unzip this pack into a project folder (or open it next to your app).
2. Copy assets into your app (keep the folder names):
   - `assets/webgl/` → `public/assets/zero-energy/webgl/`
   - `assets/textures/` → `public/assets/zero-energy/textures/`
   - `assets/img/` → `public/assets/zero-energy/img/`
   - `assets/fonts/` → `public/assets/zero-energy/fonts/`
   - `assets/audio/` → `public/assets/zero-energy/audio/`
   - `assets/css/` → `public/assets/zero-energy/css/`
3. Copy `source/` into your components folder. Keep the relative tree (`data/`, `lib/`, `sections/can-gallery/`).
4. Install peer libraries if missing. Versions are locked:
   - `three@0.161.0` (exact. Do not bump.)
   - `lenis@^1.3.0`
   - `gsap@^3.13.0` (ScrollTrigger + real SplitText)
5. Load these CSS files on the page (route-local links are fine):

```
/assets/zero-energy/css/zero-energy.webflow.shared.55683c78d.min.css
/assets/zero-energy/css/inline-0.css
/assets/zero-energy/css/inline-1.css
/assets/zero-energy/css/inline-2.css
/assets/zero-energy/css/inline-4.css
/assets/zero-energy/css/zero-energy.css
```

6. Open your AI coding tool and say:

```
Build ZERO ENERGY using only the files in this pack folder.
Read START-HERE.md and PROMPT.md. Use source/ and assets/ as provided.
This is my brand, not Zero Energy. Swap the six labels, the logo, and every line of copy.
Keep the 3D range, Three 0.161.0, and the Lenis timeline clock.
Do not build a tall sticky scroll track. Do not add React Three Fiber.
```

7. Confirm: grab turns the six cans. Scroll opens flavor, proof, and close on a **fixed** stage.

## Default entry

```tsx
import ZeroEnergyGallery from "./source/ZeroEnergyGallery";

export default function Page() {
  return <ZeroEnergyGallery />;
}
```

Use a full-viewport page with no site header or footer over the gallery (immersive).

## What this pack is not

- Not a recording of our website UI.
- Not a multi-video dump of previews, thumbs, or admin assets.
- Not a background-film product. The client media is the 3D pack.
- Just what you need to rebuild the experience and make it yours.

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep six cans on one 3D stage. Keep Three at 0.161.0. Keep Lenis seeking the timeline (not ScrollTrigger.scrub). Keep the stage pinned until the journey completes. Do not add React Three Fiber.

ClickMotion · www.ClickMotion.dev
