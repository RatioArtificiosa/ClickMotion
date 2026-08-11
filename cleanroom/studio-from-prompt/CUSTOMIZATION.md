# Studio Sequence — Ultra Customization Guide (MS-SEC-STUDIO01)

**Audience:** buyer’s AI coding tool (Cursor, Claude, Grok Build, Codex, Lovable, Bolt).  
**Goal:** drop **any video** into a world-scale camera pull-out on a street billboard — full film length, no cuts, premium scroll feel.

---

## 1. File map (what to edit)

| File | Role |
|------|------|
| **`studio-data.ts`** | **Primary.** `videoSrc`, plate, billboard rect, pin, scrub, loop policy. Start here. |
| `StudioSequence.tsx` | Camera math + ScrollTrigger. Only touch for advanced motion changes. |
| `SmoothScroll.tsx` | Lenis bridge — leave unless host page already has Lenis. |
| `gsap-register.ts` | GSAP plugins — leave. |

**Rule:** media URLs and pin feel live in `studio-data.ts` (or props). Never hardcode a brand film path inside camera math.

---

## 2. Swap the billboard video (keep everything else)

Paste this prompt to your AI:

```
Restage Studio Sequence (MS-SEC-STUDIO01) with my film.

1) Put my video at public path: /assets/videos/[MY-FILM].mp4
2) In studio-data.ts set:
   videoSrc: "/assets/videos/[MY-FILM].mp4"
   posterSrc: optional first-frame still
3) Keep playFullLength: true, loop: true, muted: true, preload: "auto"
4) Do NOT trim the file, do NOT add #t= media fragments, do NOT seek currentTime
   with scroll. Scroll only drives the camera pull-out.
5) Do NOT add CSS filters (contrast/saturate/brightness) unless I ask.
6) Keep object-fit: cover on the billboard so any aspect ratio fills the board.
7) Keep pin end +=280% and four-edge cover scale around the billboard center.
```

**Any video works:** product launch film, brand manifesto, campaign loop, AI-generated b-roll, real estate walkthrough, fashion lookbook reel. Prefer **H.264 + yuv420p + faststart** MP4 for widest browser autoplay.

---

## 3. Use the included Surreal Studio film (default)

Default package film (pure billboard content — **no UI frames**):

| Role | Path |
|------|------|
| Client HD / billboard | `/assets/videos/studio-surreal-v1.mp4` |
| Lab source (operator) | `Lab/nothin/public/assets/studio/surreal.mp4` |
| Backgrounds library tile | `/assets/videos/backgrounds/studio-surreal-bg-v1.mp4` |
| Pure film poster | `/assets/posters/studio-surreal-v1.webp` |

```
Keep the default Surreal Studio pure film on the NY billboard.
videoSrc stays /assets/videos/studio-surreal-v1.mp4
Play full length end-to-end with loop. Do not cut or regrade.
```

---

## 4. Generate a new film with AI video tools

1. Generate a **16:9** (or taller — cover will crop) loop that reads well as a **full-bleed open** and still looks rich when small on a street board.  
2. Export H.264 MP4, full duration you want visitors to feel (60s–180s is luxury; longer is fine — the section never trims).  
3. Ask your coding AI:

```
Add my new film as public/assets/videos/[slug]-v1.mp4
Set STUDIO_DEFAULTS.videoSrc to that path in studio-data.ts
Optional posterSrc still from second 2–5 of the film
Keep full-length loop; no CSS grade; no scroll-linked seek
```

---

## 5. Swap the street plate (NY → your city / facade)

```
Replace the stage plate:
1) Add my still at /assets/images/studio/[my-plate].png (prefer 1920×1080+)
2) studio-data.ts: plateSrc, plateWidth, plateHeight
3) Re-measure the billboard gray rect as 0–1 fractions of the plate:
   billboard: { left, top, width, height }
4) Measure the INNER content area of the screen (not the white frame)
5) Keep four-edge coverScale so t=0 is still full-bleed film
```

If the board is roughly centered, default fractions are a good start. Off-center boards need careful measure or the open shot will show street rim.

---

## 6. Props API (no file edit)

```tsx
import StudioSequence from "./StudioSequence";

<StudioSequence
  videoSrc="/assets/videos/my-campaign.mp4"
  posterSrc="/assets/posters/my-campaign.webp"
  plateSrc="/assets/images/studio/ny.png"
  pinEnd="+=320%"
  scrub={1.2}
/>
```

Partial props merge over `STUDIO_DEFAULTS`.

---

## 7. Motion / feel knobs (still data-only)

| Field | Default | Effect |
|-------|---------|--------|
| `pinEnd` | `+=280%` | Longer = slower camera pull-out |
| `scrub` | `1.15` | Higher = silkier lag |
| `holdIn` | `0.06` | Hold full-bleed film at start |
| `holdOut` | `0.9` | Settle on street before unpin |
| `video.loop` | `true` | Full file repeats after last frame |
| `video.cssFilter` | off | Appearance lock |

---

## 8. Full-length law (do not break)

1. **Never** cut the delivered MP4 for the section runtime.  
2. **Never** bind `video.currentTime` to scroll progress.  
3. **Never** use media fragments (`video.mp4#t=10,40`).  
4. Camera scale is the only scroll-driven transform.  
5. Film plays from `0` to `duration` (then loops if `loop: true`).

This is the wow factor: long, uninterrupted billboard cinema while the world pulls out.

---

## 9. Stack

| Package | Role |
|---------|------|
| `react` 19 | UI |
| `gsap` + ScrollTrigger | Pin + scrub camera |
| `lenis` | Smooth scroll shell (optional) |
| No Three.js / R3F | DOM + video only |

---

## 10. QA checklist after restage

- [ ] At pin start: full-bleed film, no street rim  
- [ ] Scroll: world pulls out; film stays glued to the facade board  
- [ ] End: street readable; film still playing on the board  
- [ ] Film runs full duration (check Network + video.duration)  
- [ ] Loop restarts at frame 0 without a hard cut artifact if source is loop-friendly  
- [ ] No CSS color grade unless requested  
- [ ] Mobile: muted autoplay works; pointer not required  
