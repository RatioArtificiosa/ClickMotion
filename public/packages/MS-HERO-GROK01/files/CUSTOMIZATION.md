# Grok Bot - make it yours

Speak to your AI with plain English. Keep **dual process: PSAVE + No Scroller**. Scroll aims on 12 viewports. The whole film plays forward and reverse. The page does not physically scroll during the journey. Change brand and copy. Do not change the engine unless you are swapping the film.

---

## Swap brand strings

```
Replace Grok Bot with [YOUR BRAND] everywhere, including the nav wordmark.
Update SuperGrok Heavy to [MY HOUSE LINE].
Update nav links to [MY FOUR LINKS].
Update Sign in and Download labels.
Keep the ice canvas, amber emphasis, and HUD layout.
```

---

## Rewrite headlines and lead

```
Update the three-line title, Early beta kicker, and lead paragraph for my AI product.
Keep the ice / amber contrast on the last title line.
Do not invent partnership claims. Do not add a humanoid robot.
```

---

## Rewrite proofs, thread, ticker

```
Replace the three proof cards, the Inbox Bot thread (three messages), and the In flight ticker jobs with my product language.
Keep three proofs. Keep a short thread. Keep the ticker looping.
```

---

## Swap the film

```
Use my MP4 as the Grok Bot hero film.
1) Re-encode first (required):
   ffmpeg -y -i my-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset medium -crf 18 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart grokbot-sphere-v1.mp4
2) Save as public/assets/videos/grokbot-sphere-v1.mp4
3) Poster to public/assets/posters/grokbot-sphere-v1.webp
4) Keep PSAVE: scroll aims, the whole film plays forward at 1.2x and reverse every 3rd frame, leftover dest plus 0.55s dest floor on lift
5) Keep the 12 viewport aim track unless two flicks dump the film (then raise) or the new film is much shorter (then smoke two flicks before lowering)
6) Prefer a 50-70s silent 16:9 night-city or product-reveal film, 25fps
Do not use a storefront preview as the hero. Do not skip the GOP 3 remaster. Do not cut the film to a highlight loop.
```

---

## Colors

```
Keep near-black canvas + ice + one amber accent.
Change #eef4ff, #f0d7a8, and #0a0c12 to [ICE], [AMBER], [PRIMARY].
Keep frost at 3-6% white. Keep thin blur 12 and heavy blur 18 on the thread only.
No neon primary system.
```

---

## Fonts

```
Load my display sans as --font-gb-display and my UI sans as --font-gb-body.
Keep Syne-class heavy display and Outfit-class light body unless I name replacements.
```

---

## Make it work on phones

```
Improve the mobile layout so headlines never clip, center nav links hide under 768px, CTAs stack cleanly, the thread does not overflow, safe padding stays at least 2rem, and the stage stays one pinned viewport. Dual process must still hold: page does not physically scroll during the journey. The whole film still plays.
```

---

## QA after restage

- [ ] Page does not physically scroll during the journey (`scrollY` stays 0)
- [ ] Tiny wheel click creeps a few frames (no jump)
- [ ] Fling plays the movie to the aim (destination may leap; picture does not)
- [ ] Lift mid-film: film keeps going a little, then eases to a stop
- [ ] Reverse walks every 3rd frame; no stall-then-jump to the start
- [ ] The whole film plays. It is not a 8-second highlight
- [ ] HUD sheen, ice trip, marquee, orb keep looping
- [ ] Scroll badge hides about 5 seconds after first real scroll
- [ ] After last frame, one more down-scroll may move the host page
- [ ] Reduced motion: still frame + HUD
- [ ] Paths resolve
- [ ] No Optimus. No partnership claim. Sphere is setting only.

---

## Fix broken

```
Something is wrong: [DESCRIBE].
Keep dual process: PSAVE plus No Scroller.
Scroll aims on 12 viewports. Down plays the whole film at 1.2x. Up reverses every 3rd frame.
Leftover dest plus 0.55s dest floor on lift. Never jump a frame.
HUD loops stay. Do not restore gsap or a tall sticky track.
Do not reduce to wallpaper only. Do not cut the film.
Do not ask me to write code.
```

ClickMotion · www.ClickMotion.dev
