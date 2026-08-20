# Studio Sequence cleanroom - MS-SEC-STUDIO01

Production reference: **world-scale camera pull-out** with a **dynamic full-length** billboard film.

| | |
|--|--|
| Live demo | `/demo/cleanroom-studio` |
| Product id | `MS-SEC-STUDIO01` |
| Prompt MDX | `content/prompts/sections/MS-SEC-STUDIO01.mdx` |
| Customization | **`CUSTOMIZATION.md`** |
| Buyer short | `BUYER_PROMPT.md` |
| Lab source | `Lab/nothin` → `/lab/studio-sequence` |

## No Scroller (pin-until-complete)

Not PSAVE. The film **free-plays**. Scroll aims the camera only.

- One `100dvh` stage in normal document flow
- Virtual earn: **4 viewports desktop / 3 mobile**
- Camera follows progress 1:1 (holdIn 0.06 / holdOut 0.9 / smootherstep)
- Release at 0 + up or 1 + down
- After release at the end, the **page owns** until the stage docks (`top >= -2`)
- Do **not** install gsap or lenis. Do **not** overflow-hidden the host page.

## Dynamic video

| Role | Path | Notes |
|------|------|--------|
| Client HD / billboard | `/assets/videos/studio-surreal-v1.mp4` | Pure Surreal film. No UI frames. Full length. |
| Lab pure source | `Lab/nothin/public/assets/studio/surreal.mp4` | Operator master for backgrounds encode |
| Backgrounds tile | `/assets/videos/backgrounds/studio-surreal-bg-v1.mp4` | Small library encode of pure film |
| Storefront page | `/assets/videos/studio-sequence-preview-v1.webm` | Operator screenshot WebM. Keep WebM. Do not recapture. |
| Storefront FS | `/assets/videos/studio-sequence-preview-fs-v1.mp4` | Premiere FS (full length) |

Swap any brand film via `studio-data.ts` → `videoSrc` or `<StudioSequence videoSrc="…" />`.

## Entry

```tsx
import StudioSequence from "./StudioSequence";

export default function Page() {
  return (
    <>
      <StudioSequence />
      {/* Next sibling may scroll in after the pin releases. Do not overflow-hidden the page. */}
    </>
  );
}
```

## Full-length law

Scroll never seeks the video. The MP4 plays **0 → duration** (loop optional). Do not cut delivery files for runtime. Do not add PSAVE.

## Files

- `studio-data.ts` - config + media map
- `StudioSequence.tsx` - section (virtual progress + pageOwns)
