# Roadster - Studio Drive (MS-HERO-ROAD01)

**Product id:** `MS-HERO-ROAD01`  
**Demo:** `/demo/cleanroom-roadster` (alias `/demo/tesla-roadster`)  
**Package:** `public/packages/MS-HERO-ROAD01/`

## No Scroller hybrid

| Layer | Behavior |
| --- | --- |
| **Video** | Native `autoplay` + `muted` + `loop`. Never scrubbed. Not PSAVE. |
| **Drive** | Virtual progress on 13.3 viewports. No tall document spacer. |
| **Cards** | Enter, hold, exit story cards |
| **Sheet** | Last phase pulls black rounded specs sheet over the pinned film |
| **Pin freeing** | After g = 1 + down, page owns until dock |
| **3D** | GLB turntable, spin on vertical Y |
| **Type** | Dark ink on clean high-key studio; local white lift under type only |

## Client assets

- `/assets/roadster/studio-drive.mp4`
- `/assets/roadster/roadster.glb`

## Components

- `TeslaRoadsterPromo.tsx` - stage, panels, No Scroller pin, sheet
- `RoadsterSpecsSheet.tsx` - specs + CTAs
- `RoadsterTurntable.tsx` - R3F spinner

Not lab chrome. Production cleanroom for the paid hero pack.
