# SkySpires - make it yours

Speak to your AI with plain English. Keep **dual process: PSAVE + No Scroller**. Scroll aims on 12 viewports. The whole film plays forward and reverse. The page does not physically scroll during the journey. HUD loops stay. Do not retune locked glass fills.

---

## Swap brand strings

```
Replace SkySpires with [YOUR BRAND] everywhere, including the nav wordmark.
Update nav links to [MY SEVEN LINKS]. Keep the chevron on the Process-equivalent item only.
Update Sign Up and Log In labels.
Keep frost glass, gold edges, and HUD layout.
```

---

## Rewrite headlines

```
Update Design / without / limits., the kicker, and the body for my studio.
Keep the italic gradient on the last title word.
Do not restore Nexora. Do not invent extra pages from film morphs.
```

---

## Rewrite stats and dock

```
Replace the three list stats, the three ring captions, and the four dock steps with my studio language.
Keep list 10s then gauge. Keep four dock steps. Keep Discover · Make · Ship unless I rename the path.
```

---

## Swap the film

```
Use my MP4 as the SkySpires hero film.
1) Re-encode first (required):
   ffmpeg -y -i my-film.mp4 -an -c:v libx264 -pix_fmt yuv420p -preset medium -crf 18 -g 3 -keyint_min 3 -bf 0 -sc_threshold 0 -movflags +faststart skyspires-sunrise-v1.mp4
2) Save as public/assets/videos/skyspires-sunrise-v1.mp4
3) Poster to public/assets/posters/skyspires-sunrise-v1.webp
4) Keep PSAVE: scroll aims, the whole film plays forward at 1.2x and reverse every 3rd frame, leftover dest plus 0.55s dest floor on lift
5) Keep the 12 viewport aim track unless two flicks dump the film (then raise)
6) Prefer a 20-30s silent 16:9 sunrise, 24fps
Do not use a storefront preview as the hero. Do not skip the GOP 3 remaster.
```

---

## Colors

```
Keep ink + gold + one peach/violet accent.
Do not retune .lg-fill or .lg-spec on dock, CTA, Log In, or stats.
Keep stats side edges #f6e2a8, 2px, static. No pulse.
```

---

## Fonts

```
Load my display serif as --font-sky-display and my UI sans as --font-sky-body.
Keep italic on the last title word.
```

---

## Make it work on phones

```
Improve the mobile layout so headlines never clip, center nav and stats hide under 820px, the dock becomes a readable 2x2, safe padding stays, and the stage stays one pinned viewport. Dual process must still hold. The whole film still plays.
```

---

## QA after restage

- [ ] Page does not physically scroll during the journey
- [ ] Tiny wheel click creeps a few frames (no jump)
- [ ] Fling plays the movie to the aim
- [ ] Lift mid-film: film keeps going a little, then eases to a stop
- [ ] Reverse walks every 3rd frame
- [ ] The whole film plays
- [ ] HUD sheen, gold trip, stats, rings keep looping
- [ ] Glass fills on dock / CTA / Log In / stats unchanged
- [ ] After last frame, one more down-scroll may move the host page
- [ ] Reduced motion: still frame + HUD
- [ ] No Nexora. No filament.

---

## Fix broken

```
Something is wrong: [DESCRIBE].
Keep dual process: PSAVE plus No Scroller.
Scroll aims on 12 viewports. Down plays the whole film at 1.2x. Up reverses every 3rd frame.
Leftover dest plus 0.55s dest floor on lift. Never jump a frame.
HUD loops stay. Do not retune locked glass fills.
Do not restore gsap, filament, or Nexora.
Do not ask me to write code.
```

ClickMotion · www.ClickMotion.dev
