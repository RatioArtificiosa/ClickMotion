# PRISM — Video generation / source notes

**Product:** MS-HERO-PRSM01 · Prism  
**Source deliverable:** `test videos/FacesFacesFaces.mp4`  
**Master:** `public/assets/videos/originals/prism-faces-master-v1.mp4`

| Role | Path |
|------|------|
| Master | `public/assets/videos/originals/prism-faces-master-v1.mp4` |
| Client HD | `public/assets/videos/prism-faces-v1.mp4` |
| Poster | `public/assets/posters/prism-faces-v1.webp` |
| Backgrounds | `public/assets/videos/backgrounds/prism-faces-bg-v1.mp4` |

## Film description

Cinematic surreal multi-persona sculpture on a soft cool-gray studio field: overlapping human faces (stone, porcelain, painted spectra) morph, crack, and fragment while remaining centered. Long empty margins left and right — ideal for floating UI. Silent. ~48s @ ~24fps, 1920-class.

## Regeneration prompt (if re-authoring)

```
Cinematic 4K silent 24fps studio film, soft cool gray seamless backdrop.
Center: a floating multi-face identity sculpture — overlapping profiles and frontal faces,
materials mixing cracked stone, porcelain, and iridescent painted skin (violet, coral, teal).
Faces morph and gently fragment with floating debris, always centered, never full-bleed text overlays.
Generous empty negative space on left and right thirds for UI glass panels.
No logos, no readable UI, no watermarks. Premium gallery / AI-identity aesthetic.
```

## Encode notes

- Client HD: 1920×1080 pad, libx264 CRF ~23, no audio, faststart
- Backgrounds: 640×360 CRF ~30 small encode only
- Never ship master or client HD as backgrounds tile
