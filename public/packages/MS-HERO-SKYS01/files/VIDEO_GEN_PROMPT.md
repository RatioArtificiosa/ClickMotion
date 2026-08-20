# SkySpires - optional new sunrise film

Pure world. No UI. No captions. Then remaster GOP 3.

```
Cinematic ultra-premium 4K continuous sunrise, 20 to 30 seconds, 24fps, silent.
SUBJECT: sky architecture at first light. Warm cloud, gold rim, peach haze, deep blue above. Optional distant towers or spires as silhouette only.
CAMERA: slow elevated glide or gentle push. EVEN time, not a late kick.
LOOK: editorial sunrise prestige. Not neon cyberpunk. Not office stock.
FORBIDDEN: logos, UI, captions, watermarks, Nexora wordmark, jump cuts.
TECH: 16:9, 1920x1080 min. After export:
ffmpeg -y -i your-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset medium -crf 18 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart skyspires-sunrise-v1.mp4
```

Keep PSAVE: 12 vh, 1.2x, reverse every 3rd frame, 0.55s dest floor. The whole film plays.

ClickMotion · www.ClickMotion.dev
