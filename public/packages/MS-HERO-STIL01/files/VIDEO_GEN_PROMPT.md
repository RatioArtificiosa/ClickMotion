# STILL - generate a new background film

**Role:** Client HD only (pure world, no website UI).  
**Shipped film:** transformation arc already provided. Use this only for a replacement.  
**After export you MUST re-encode GOP 3 / no B-frames** or reverse will stall.

---

## Paste-ready prompt

```
Cinematic ultra-premium 4K continuous journey, 24 to 40 seconds, 24fps, silent.

ARC (must feel like one emotional growth):
1) Arid desert under a vast starfield and giant planets - solitude, tension, dry beauty
2) Soft greening: moss, ferns, a living path appear as life returns
3) Lush cosmic valley: deep emerald ground, teal-cyan glowing planets, hopeful night sky

Optional: a single distant figure in flowing pale fabric, back to camera, arms open to the sky - never faces as hero product, no readable brand marks.

CAMERA: slow elevated glide or gentle push, locked horizon language, one continuous move or invisible morphs. Contemplative prestige pace. EVEN time: the world grows steadily. Not a late action kick.

LOOK: deep night #070b12 family voids, mint-teal planet glow, cream moonlight edges, gentle film grain. Calm app cinema x high-end nature documentary. Not neon cyberpunk, not corporate stock office meditation.

FORBIDDEN: logos, UI, captions, watermarks, overcrowded tourist scenes, harsh teal-orange blockbuster grade, jump cuts, handheld chaos.

TECH: 16:9, 3840x2160 preferred or 1920x1080 min, silent, seamless emotional arc for PSAVE (scroll aims, film plays forward and reverse).
```

---

## After export (required)

A normal MP4 with one I-frame every 1-2 seconds will **stall mid-reverse** then jump. PSAVE reverse seeks every 0.125s. You must remaster:

```
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart still-cosmos-v1.mp4
```

Then:

```
Save as public/assets/videos/still-cosmos-v1.mp4
Poster still public/assets/posters/still-cosmos-v1.webp
Keep PSAVE wiring: 12 viewport aim, 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor on lift
Keep 24fps, or tell your AI to set PSAVE_FRAME = 1/fps and keep a 3-frame reverse stride
Do not extract PNG frames
Do not use a storefront preview as the hero
Do not restore hybrid idle or wallpaper-only as primary mode
```

If the new film is much shorter than 30s, smoke two natural flicks before you lower the 12 viewport track. Two flicks must not dump a chapter.

ClickMotion · www.ClickMotion.dev
