# Nomad Travel - make it yours

Speak to your AI with plain English. Keep free-play film, soft entrance, and desktop film parallax. Change the brand.

---

## Swap brand strings

```
Replace all Nomad Travel copy with my brand:
- Wordmark: [YOUR BRAND]
- Nav links: [list]
- Badge, H1, accent line, body, primary CTA, secondary CTA
- Nav buttons: [Sign in equivalent] and [Book equivalent]
- Stats: three quiet proofs ([number + label] x3)
Keep layout, motion, and film behavior identical.
```

---

## Swap colors (keep warm editorial)

```
Restage the palette but keep a warm luxury travel feel:
- Canvas (espresso void): [hex]
- Cream type: [hex]
- Accent (terracotta/clay/gold): [hex]
Do not introduce cyan, neon pink, or cold fintech blue as the primary system.
Keep cream-on-dark contrast readable on the film.
```

---

## Swap the background film

```
Use my film as the hero world.
1) Save MP4 as public/assets/videos/nomad-montage-v1.mp4 (or update NOMAD_VIDEO_SRC)
2) Save a poster still as public/assets/posters/nomad-montage-v1.webp (or update NOMAD_POSTER_SRC)
3) Keep autoPlay muted loop playsInline
4) Never scrub video.currentTime with scroll
5) Keep object-fit cover and the type-legibility gradients
```

Any empty-destination luxury travel film works. Prefer silent 16:9, 1080p+.

---

## Keep the included film

```
Keep assets/nomad-montage-v1.mp4 (served as /assets/videos/nomad-montage-v1.mp4).
Full loop. No trim required. No regrade unless I ask.
```

---

## Fonts

```
Load my display serif as --font-nomad-display and my UI sans as --font-nomad-body.
Keep large display H1 scale and Inter-like UI sizes if my fonts differ.
```

---

## Stats density

```
Change the three proof stats to [A], [B], [C]. Keep three max. Keep the quiet hairline rail.
```

---

## Mark / icon

```
Swap the Compass lucide icon for [my mark description or SVG]. Keep nav balance and cream/terracotta system.
```

---

## Stronger or softer parallax (desktop only)

```
Keep free-play film. Adjust film wrap scale end from 1.06 to [1.03 soft | 1.08 strong]
and scrub to [1.0 silkier | 1.5 snappier]. Never bind scroll to video time.
Mobile stays without parallax.
```

---

## Mount under a site header

```
Keep the same hero. Allow a fixed site header by adding top padding to the content column only.
Do not break full-bleed film or the fixed product nav unless I ask to remove the product nav.
```

---

## QA after restage

- [ ] Full-viewport film loops muted  
- [ ] Type remains legible (no full-frame grey wash)  
- [ ] Entrance still staggers softly  
- [ ] Desktop parallax scales film only; no video scrub  
- [ ] Mobile stacks CTAs; no parallax  
- [ ] Reduced motion: no parallax, simple fades  
- [ ] Film and poster paths resolve  

---

## Fix broken

```
Something is wrong: [DESCRIBE WHAT YOU SEE].
Keep free-play muted film loop, soft entrance, desktop film parallax only.
Do not scrub video.currentTime with scroll.
Do not ask me to write code.
```

ClickMotion · www.ClickMotion.dev
