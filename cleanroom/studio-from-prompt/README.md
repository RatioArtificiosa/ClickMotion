# Studio Sequence cleanroom — MS-SEC-STUDIO01

Production reference: **world-scale camera pull-out** with a **dynamic full-length** billboard film.

| | |
|--|--|
| Live demo | `/demo/cleanroom-studio` |
| Product id | `MS-SEC-STUDIO01` |
| Prompt MDX | `content/prompts/sections/MS-SEC-STUDIO01.mdx` |
| Customization | **`CUSTOMIZATION.md`** |
| Buyer short | `BUYER_PROMPT.md` |
| Lab source | `Lab/nothin` → `/lab/studio-sequence` |

## Dynamic video

| Role | Path | Notes |
|------|------|--------|
| Client HD / billboard | `/assets/videos/studio-surreal-v1.mp4` | Pure Surreal film — **no UI frames**. Full length. |
| Lab pure source | `Lab/nothin/public/assets/studio/surreal.mp4` | Operator master for backgrounds encode |
| Backgrounds tile | `/assets/videos/backgrounds/studio-surreal-bg-v1.mp4` | Small library encode of pure film |
| Storefront page | `/assets/videos/studio-sequence-preview-v1.mp4` | Premiere small (full length) |
| Storefront FS | `/assets/videos/studio-sequence-preview-fs-v1.mp4` | Premiere FS (full length) |

Swap any brand film via `studio-data.ts` → `videoSrc` or `<StudioSequence videoSrc="…" />`.

## Entry

```tsx
import StudioSequence from "./StudioSequence";
import { SmoothScroll } from "./SmoothScroll";

export default function Page() {
  return (
    <SmoothScroll>
      <StudioSequence />
    </SmoothScroll>
  );
}
```

## Full-length law

Scroll never seeks the video. The MP4 plays **0 → duration** (loop optional). Do not cut delivery files for runtime.

## Files

- `studio-data.ts` — config + media map  
- `StudioSequence.tsx` — section  
- `SmoothScroll.tsx` / `gsap-register.ts` — shell  
