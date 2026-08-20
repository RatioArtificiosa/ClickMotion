# VERVE SOCIAL — generate the client culture film

**Product:** MS-HERO-VERV01 · VERVE SOCIAL  
**Role:** **Client** background film only (buyer pack + cleanroom `src`)  
**Law:** Pure world — **no website UI, no text, no logos, no hashtags burned into pixels**  
**Prep:** `docs/prep/MS-HERO-VERV01-PREP.md`

Shipped pack will later include this film under `assets/`. This file is for **generation now**.

---

## What platinum looks like

A **seamless cinematic culture montage** of human presence — nights out, small circles, real laughter — graded for a premium Gen-Z / creator social product. Warm plum shadows, hot rose rim light, amber practicals. Editorial music-video intimacy × high-end brand film. **Not** TikTok stickers, **not** neon cyberpunk city, **not** empty gradient wallpaper, **not** phone UI chrome.

| Spec | Target |
|------|--------|
| Aspect | 16:9 |
| Resolution | **3840×2160 preferred** · 1920×1080 minimum |
| Length | **22–30 seconds** loop-friendly (sweet spot **~24s**) |
| Frame rate | 24fps film feel (or 30fps if tool locks it) |
| Audio | **Silent** |
| Motion | Slow intentional camera; soft morphs OK; no whip-pan chaos |
| Faces | **Allowed** as lifestyle (candid, flattering, diverse) — not influencer product-hold |
| Loop | End composition should rejoin start (or soft fade morph) |

---

## Paste-ready prompt (video AI)

Copy **everything inside the fence** into Runway, Kling, Luma, Veo, Grok Imagine, Pika, or similar.  
If the tool has separate **negative prompt**, paste the FORBIDDEN block there too.

```
Cinematic ultra-premium 4K seamless loop, 24 seconds, 24fps film feel, silent, 16:9.

PRODUCT WORLD: Premium Gen-Z / creator social network brand film named VERVE — the feeling of being present with your people. High-end lifestyle culture cinema, not an app demo, not a tech explainer.

SUBJECT (one coherent world family — continuous take OR soft invisible morphs between 2-3 related beats of the SAME night/energy):

Beat A — GOLDEN HOUR ARRIVAL: Slow cinematic push toward a small circle of young adults on a warm rooftop or balcony at magic hour. Shallow depth of field. Soft laughter mid-conversation, genuine eye contact, casual elevated fashion (no logos readable). City bokeh behind them as amber and rose lights. Plum-ink shadows in clothing folds and architecture. Intimate, expensive, alive.

Beat B — NIGHT PRESENCE: Soft dolly through a dim stylish indoor gathering — low practical lamps, amber bulbs, pink neon edge light only as practical rim (not cyberpunk cityscape). Hands gesturing mid-story, glasses catching light, faces half-lit, motion blur on background dancers only. Camera stays calm and premium. No phones as hero props; if a phone appears it is secondary, screen unreadable soft glow only.

Beat C — CLOSE HUMAN DETAIL (optional third morph): Extreme shallow DOF detail of connection — a smile, a high-five freeze, shoulders leaning in, hair moving in breeze — then pull back slightly to the group silhouette against warm night. Always human, never UI.

CAMERA: Continuous slow cinema language — locked or gently stabilized horizon, one smooth move per beat (push-in, lateral glide, or soft orbit). No handheld chaos, no FPV freestyle, no snap zooms, no whip pans, no jump-cut music-video epilepsy. Think Apple diversity brand film meets elevated nightlife editorial, not club promo trash.

MOTION ENERGY: Contemplative but alive. People breathe and laugh; light crawls; bokeh breathes. Perfect seamless loop: final frame compositionally compatible with first so the night can repeat forever.

LOOK / GRADE: Plum-black shadows (#1A0A14 family), cream skin highlights, hot rose (#EC4899) rim and accent practicals, amber (#F59E0B) lamps and city glow. Controlled bloom, gentle fine film grain, anamorphic-adjacent softness. Rich, warm, modern. NOT teal-orange blockbuster cliche. NOT cold blue fintech. NOT cyan/magenta cyberpunk rain city. NOT pure white wellness spa. NOT candy TikTok saturation.

MOOD: Belonging. Presence. Soft chaos of real friends. Premium social energy without ugliness. "Be present. Be together."

COMPOSITION FOR UI OVERLAY (critical): Keep large darker voids or soft out-of-focus regions on the LEFT third and LOWER third so white/cream website type can sit legibly later. Do not pack every face into the center forever; allow breathing negative space.

ABSOLUTELY FORBIDDEN:
- Any readable text, captions, subtitles, watermarks, logos, app icons, brand marks
- Smartphone UI, social feed chrome, stories rings, like hearts as graphics, stickers, emoji as 3D objects, hashtag characters in the image
- Neon cyberpunk streets as the hero world, flying cars, matrix code
- Pure abstract gradient mesh with zero human culture
- Stock "laptop SaaS handshake" office scenes as the main subject
- Pornographic, violent, or demeaning framing
- Camera shake, seizure-fast cuts, 3D title cards, lower-thirds

TECH: 16:9, 3840x2160 preferred (1920x1080 minimum), seamless loop, silent, photoreal cinematic, 22-30 seconds (target 24).
```

### Negative prompt (if separate field)

```
text, subtitles, captions, watermark, logo, brand, UI, HUD, smartphone interface, social media feed, Instagram, TikTok stickers, emoji, hashtags, neon cyberpunk city, matrix code, pure abstract gradient only, office laptop stock, violence, gore, explicit nudes, shaky cam, jump cuts, title cards
```

---

## Generation tips (operator)

1. Prefer **one continuous world** over random stock mashup.  
2. If faces warp, regenerate; platinum rejects melted faces.  
3. If the model burns text into frame, discard.  
4. Export highest quality; we will encode silent client HD + poster.  
5. If you get two strong 12s clips of the same grade, we can soft-crossfade in ffmpeg later — still no UI.

---

## After you have a film file

Drop the master in the repo (or hand to agent) and say:

```
VERVE SOCIAL film is ready: [path or attachment]

Lock as client HD:
1) Master → public/assets/videos/originals/verve-presence-master-v1.mp4
2) Client silent 1080p → public/assets/videos/verve-presence-v1.mp4
3) Poster still → public/assets/posters/verve-presence-v1.webp
4) Continue cleanroom build from docs/prep/MS-HERO-VERV01-PREP.md
```

---

## Subject checklist (quick)

**Required**

- [ ] Human presence / social culture energy  
- [ ] Plum + rose + amber grade  
- [ ] Dark voids for left/lower type  
- [ ] Silent seamless loop ~24s  
- [ ] No text / UI / logos  

**Forbidden**

- [ ] Feed chrome, stickers, hashtags in pixels  
- [ ] Cyberpunk rain city as hero  
- [ ] Empty mesh-only wallpaper  
- [ ] Competitor brands  

---

ClickMotion · www.ClickMotion.dev
