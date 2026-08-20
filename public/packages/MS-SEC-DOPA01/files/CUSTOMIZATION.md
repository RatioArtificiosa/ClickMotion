# Dopamine - make it yours

Speak to your AI in plain English. Keep the motion system. Change the brand surface.

---

## Rebrand the wordmark

```
Change the DOPAMINE wordmark text to [YOUR BRAND] in DopamineLogo.tsx.
Keep mix-blend-mode exclusion and full-width layout.
Update aria-label and copyright ©2026_ line to match.
```

---

## Swap the hero figure

```
Replace Woman1.png with my transparent fashion figure PNG.
1) Save as public/assets/dopamine/Woman1.png (or update the img src)
2) Keep height-driven CSS (desktop ~65rem)
3) Nudge left/bottom only if composition needs it
```

---

## Change navigation labels

```
Update SHOP_NAV and LEGAL_NAV arrays in SiteFooter.tsx to my labels.
Keep scramble on data-split text. Do not add external hrefs unless I ask.
```

---

## Subscribe copy

```
Change "Subscribe (latest news)" to [MY HEADLINE] and button to [MY CTA].
Keep the form validation client-side only.
```

---

## Lottie badge

```
Replace FOOTER_LOTTIE_v1.json with my Lottie JSON at the same path,
or hide .footer__discount if I do not want a badge.
```

---

## Colors

```
Keep the dark couture stage. Change accent red #ed3833 to [HEX] for error/credits emphasis.
Keep type readable on the masked background.
```

---

## Credits panel

```
Rewrite credits copy for [MY BRAND]. No third-party agency names unless I provide them.
Keep panel open/close.
```

---

## Mount with scroll runway

```
Leave at least ~40–55vh of page content above the footer so logo rise,
figure enter, scramble, and Lottie play when the footer scrolls into view.
Do not bury the footer above the fold with no room to enter.
```

---

## Soften or keep motion

```
Keep full enter motion by default. If I enable reduced motion in the OS,
the pack already settles without scramble thrash - do not remove that path.
```

---

## QA after restage

- [ ] Figure + wordmark composition still premium  
- [ ] Scramble still runs on nav / bottom  
- [ ] Lottie still loads (or intentionally removed)  
- [ ] Form validation works offline  
- [ ] No broken asset paths  
- [ ] No Tailwind `.container` regressions  
- [ ] No unexpected external links  
- [ ] Reduced-motion path still readable  

---

## Fix broken

```
Something is wrong: [DESCRIBE WHAT YOU SEE].
Keep Dopamine footer motion (logo rise, figure enter, scramble, Lottie).
Use dop-container. Do not ask me to write code.
```

ClickMotion · www.ClickMotion.dev
