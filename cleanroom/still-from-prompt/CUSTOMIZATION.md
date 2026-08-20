# STILL - make it yours

Speak to your AI with plain English. Keep **dual process: PSAVE + No Scroller**. Scroll aims on 12 viewports. The film plays forward and reverse. The page does not physically scroll during the journey. Change brand and chapters. Do not change the engine unless you are swapping the film.

---

## Swap brand strings

```
Replace STILL with [YOUR BRAND] everywhere, including the nav wordmark.
Update nav links to [MY FOUR LINKS].
Update Sign in and Begin free labels.
Keep the night canvas, mint accent, and five-chapter layout.
```

---

## Rewrite chapters

```
Update the five chapters (eyebrow, two title lines, body, whisper) for my mindfulness brand.
Keep five progress bands roughly 0-0.14, 0.14-0.34, 0.34-0.56, 0.56-0.78, 0.78-1.01.
Keep Calm/Headspace-class soft language. No medical claims.
Do not add a sixth chapter. Do not add a mode chip.
```

---

## Swap the film

```
Use my MP4 as the STILL hero film.
1) Re-encode first (required):
   ffmpeg -y -i my-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset slow -crf 16 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart still-cosmos-v1.mp4
2) Save as public/assets/videos/still-cosmos-v1.mp4
3) Poster to public/assets/posters/still-cosmos-v1.webp
4) Keep PSAVE: scroll aims, film plays forward at 1.2x and reverse every 3rd frame, leftover dest plus 0.55s dest floor on lift
5) Keep the 12 viewport aim track unless two flicks dump a chapter (then raise) or the new film is much shorter (then smoke two flicks before lowering)
6) Prefer a 24-40s silent 16:9 transformation arc, 24fps
Do not use a storefront preview as the hero. Do not skip the GOP 3 remaster.
```

---

## Colors

```
Keep deep night + moon cream + one soft mint (or lavender) accent.
Change #070b12, #eef6f4, #8fd0c8 to [CANVAS], [CREAM], [ACCENT].
Keep readable cream-on-night contrast. No neon primary system.
```

---

## CTA / stats

```
Change final CTAs and three stats to [MY CTAS] and [A] [B] [C].
Keep them only in the final chapter band.
```

---

## Fonts

```
Load my display serif as --font-still-display and my UI sans as --font-still-body.
Keep large two-line chapter titles and quiet body scale.
```

---

## Make it work on phones

```
Improve the mobile layout so headlines never clip, center nav links hide under 768px, CTAs stack cleanly, safe padding stays at least 2rem, and the stage stays one pinned viewport. Dual process must still hold: page does not physically scroll during the journey.
```

---

## QA after restage

- [ ] Page does not physically scroll during the journey (`scrollY` stays 0)
- [ ] Tiny wheel click creeps a few frames (no jump)
- [ ] Fling plays the movie to the aim (destination may leap; picture does not)
- [ ] Lift mid-chapter: film keeps going a little, then eases to a stop
- [ ] Reverse walks every 3rd frame; no stall-then-jump to the start
- [ ] Five chapters + whispers + mint bar follow the picture
- [ ] End CTAs + three stats only in the last chapter
- [ ] No mode chip. No 5s idle free-play. No gsap.
- [ ] After last frame, one more down-scroll may move the host page
- [ ] Reduced motion: still frame + chapter 1
- [ ] Paths resolve

---

## Fix broken

```
Something is wrong: [DESCRIBE].
Keep dual process: PSAVE plus No Scroller.
Scroll aims on 12 viewports. Down plays at 1.2x. Up reverses every 3rd frame.
Leftover dest plus 0.55s dest floor on lift. Never jump a frame.
Do not restore gsap, a 960vh sticky track, or 5s idle free-play.
Do not reduce to wallpaper only.
Do not ask me to write code.
```

ClickMotion · www.ClickMotion.dev
