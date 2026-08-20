# PRISM - generate a new background film

**Role:** Client HD only (pure world, no website UI).  
**Shipped film:** multi-face sculpture already provided. Use this only for a replacement.  
**After export you MUST re-encode GOP 3 / no B-frames** or reverse will stall.

---

## Paste-ready prompt

```
Cinematic ultra-premium 4K continuous sculpture study, 24 to 50 seconds, 24fps, silent.

SUBJECT (must stay CENTERED with empty left and right thirds):
A floating multi-face identity sculpture that morphs and fragments across the duration.
Materials shift: carved stone, porcelain, iridescent paint, cool metal, living color.
Faces turn, split, and recombine. Always one object, never a crowd.
Soft cool-gray studio mist. No floor grid. No logos.

ARC (must feel like one even transformation, not a late action kick):
1) Quiet stone and porcelain faces in cool light
2) Fracture and color: painted spectra, layered profiles
3) Whole again, luminous, every face held in one form

CAMERA: slow locked-horizon orbit or gentle push. Contemplative gallery pace. EVEN time. Not a late smash.

LOOK: studio mist #E8EAEF family, violet and cyan edge light, cream specular on porcelain, gentle film grain. Gallery installation cinema. Not neon cyberpunk, not fashion runway flash, not office stock.

FORBIDDEN: logos, UI, captions, watermarks, readable type on the sculpture, left-locked single portrait that fills the frame, crowded group, harsh teal-orange blockbuster grade, jump cuts, handheld chaos.

TECH: 16:9, 3840x2160 preferred or 1920x1080 min, silent, seamless emotional arc for PSAVE (scroll aims, film plays forward and reverse). Keep left and right thirds relatively empty so liquid glass can sit over mist, not over a face.
```

---

## After export (required)

A normal MP4 with one I-frame every 1-2 seconds will **stall mid-reverse** then jump. PSAVE reverse seeks every 0.125s. You must remaster:

```
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart prism-faces-v1.mp4
```

Then:

```
Save as public/assets/videos/prism-faces-v1.mp4
Poster still public/assets/posters/prism-faces-v1.webp
Keep PSAVE wiring: 12 viewport aim, 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor on lift
Keep 24fps, or tell your AI to set PSAVE_FRAME = 1/fps and keep a 3-frame reverse stride
Do not extract PNG frames
Do not use a storefront preview as the hero
Do not restore GSAP scrub or wallpaper-only as primary mode
```

If the new film is much shorter than 48s, smoke two natural flicks before you lower the 12 viewport track. Two flicks must not dump an act.

ClickMotion · www.ClickMotion.dev
