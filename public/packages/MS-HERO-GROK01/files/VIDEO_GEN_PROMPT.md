# Grok Bot - optional new Sphere film

Use this with any video AI. Then remaster GOP 3 before wiring. Pure world. No UI. No captions.

```
Cinematic ultra-premium 4K continuous night-city film, 50 to 70 seconds, 25fps, silent.
SUBJECT: Las Vegas Sphere at blue hour and night. A smooth white Grok Bot face (two oval eyes, no mouth) fills the dome. Surrounding hotels, desert-city lights, deep blue sky.
ARC: (1) dark open, city silhouette; (2) Sphere face resolves, calm and huge; (3) slow orbit or gentle push past hotels; (4) Sphere show continues, even time, not a late kick.
CAMERA: elevated glide or slow push, prestige pace, locked horizon. EVEN time across the whole clip.
LOOK: night blue, warm hotel tungsten, white dome, gentle film grain. Ice-glass world, not neon cyberpunk.
FORBIDDEN: logos other than the dome face, UI, captions, watermarks, Optimus or any humanoid robot, title cards, partnership language, jump cuts, harsh teal-orange grade.
TECH: 16:9, 3840x2160 preferred or 1920x1080 min, silent.
```

After export, remaster before you wire it:

```
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset medium -crf 18 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart grokbot-sphere-v1.mp4
```

Save as `public/assets/videos/grokbot-sphere-v1.mp4`. Cut a poster still of the Sphere (not the black open) to `public/assets/posters/grokbot-sphere-v1.webp`.

Keep PSAVE: 12 vh aim, 1.2x forward, reverse every 3rd frame, leftover dest plus 0.55s dest floor. The whole film plays. Never wallpaper-only.

ClickMotion · www.ClickMotion.dev
