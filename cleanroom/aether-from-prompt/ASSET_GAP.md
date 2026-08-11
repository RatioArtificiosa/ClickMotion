# AETHER asset gap (blocks product pass)

**Status:** UPDATED · 2026-08-08  

## Action taken

Replaced `public/assets/videos/aether-waves-v1.mp4` (and `originals/02-aether-wellness.mp4`) with:

`test videos/14506495_3840_2160_30fps.mp4` (~226 MB source).

Public path for the product (client HD / web encode): `/assets/videos/aether-waves-web-v1.mp4`  
(Master / large archive may still live as `aether-waves-v1.mp4` under masters/legacy.)

## Residual

| Item | Notes |
|------|--------|
| File size | Source is 4K 30fps ~226MB — **re-encode** to 1080p H.264 silent 8–14s &lt;5–10MB before production CDN |
| Poster | Refresh `public/assets/posters/aether-waves-v1.webp` from a good frame of the new clip |
| Visual QA | Re-screenshot cleanroom demo; confirm subject matches wellness (waves/nature), not aircraft |
