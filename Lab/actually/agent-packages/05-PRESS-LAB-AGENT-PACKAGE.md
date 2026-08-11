# 05 — PRESS Lab — Platinum Agent Package

**Section id:** `#press`  
**Eyebrow:** `05 / Press`  
**H2:** `Quietly noticed.`  
**Lab URL:** `http://localhost:3010/lab/press`  
**Background:** ink  
**Pin:** **NONE**  
**Runway before:** **NONE**  
**Runway after:** **NONE** (section stands alone; natural document height)

---

## 0. Mission

Isolate press quotes (line reveals) + dual marquee (solid + outline) with **velocity-linked skew and timeScale**. No pin physics — simplest isolation after data load.

**Shell:** `00-LAB-SHELL.md`  
**Authority:** GSAP §7 · `notes/05-PRESS.md` · `sections/Press.tsx` (~285 lines) · `data/press.ts`

---

## 1. Files to copy

| # | Path | Role |
|---|------|------|
| 1 | `pages/labs/PressLab.tsx` | Lab shell |
| 2 | `sections/Press.tsx` | Section |
| 3 | `data/press.ts` | PRESS_QUOTES, PRESS_OUTLETS |
| 4 | `components/TextReveal.tsx` | H2 lines |
| 5 | `lib/splitFallback.ts` | if TextReveal needs it |
| 6 | `components/LabChrome.tsx` | chrome |
| 7 | `components/SmoothScroll.tsx` | shell (velocity still via ST) |
| 8 | `index.css` | tokens |

### Assets

None required (typography-only section). Optional Bloom if notes mention — verify source Press.tsx (current: quotes + marquee only).

---

## 2. npm deps (minimum)

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^7",
    "gsap": "^3.13.0",
    "lenis": "^1.3.11"
  }
}
```

---

## 3. Data contract

```ts
PRESS_QUOTES: Array<{
  quote: string,
  attribution: string,  // e.g. Meridian, Foldout, Quiet Hours
  // any extra fields in source
}>

PRESS_OUTLETS: string[]
// Expected names (live): Meridian, The Long Lunch, Foldout, Salt Journal, Quiet Hours
// (confirm data/press.ts — do not invent outlets)
```

---

## 4. Lab shell

```tsx
<div className="min-h-dvh bg-ink text-bone">
  <LabChrome sectionNum="05" sectionLabel="Press · Quietly noticed"
    pinNote="none · marquee velocity" />
  <main><Press /></main>
  {/* no LabAfterStrip */}
</div>
```

Floating chrome only. Scroll the section itself.

---

## 5. Motion contracts

### 5.1 Quotes

```js
// per figure index i:
// Prefer SplitText lines mask (or soft block rise in current implementation):
fromTo lines {yPercent:115}→{0} duration .85 power2.out stagger .09 delay .12*i
  scrollTrigger: { trigger: figure, start: "top 85%", once: true }
// figcaption: {opacity:0,y:12}→{1,0} duration .6 power2.out delay .45+.12*i same ST
```

**Implementation note:** Current `Press.tsx` may use soft block rise (keeps natural wrap) rather than hard line masks — match **source file**, not older notes if they conflict. Gates: staggered entrance, once, start top 85%.

H2: `TextReveal` lines default (yPercent 115, .9, stagger .09, top 85%).

### 5.2 Marquee + velocity (critical)

```js
const a = gsap.to(rowSolid, { xPercent: -50, duration: 38, ease: "none", repeat: -1 })
const b = gsap.fromTo(rowOutline, { xPercent: -50 }, { xPercent: 0, duration: 52, ease: "none", repeat: -1 })
const skewObj = { skew: 0 }
const setSkew = gsap.quickSetter(track, "skewX", "deg")
const clampSkew = gsap.utils.clamp(-6, 6)

ScrollTrigger.create({
  trigger: section,
  start: "top bottom",
  end: "bottom top",
  onUpdate: (self) => {
    const v = self.getVelocity()
    const sk = clampSkew(-(v / 420))
    if (Math.abs(sk) > Math.abs(skewObj.skew)) {
      skewObj.skew = sk
      gsap.to(skewObj, { skew: 0, duration: 0.9, ease: "power2.out", overwrite: true,
        onUpdate: () => setSkew(skewObj.skew) })
    }
    const ts = gsap.utils.clamp(1, 4, 1 + Math.abs(v) / 1200)
    ;[a, b].forEach((tw) => {
      gsap.to(tw, { timeScale: ts, duration: 0.4, ease: "power1.out", overwrite: "auto" })
      gsap.to(tw, { timeScale: 1, duration: 1.4, delay: 0.4, ease: "power2.out", overwrite: false })
    })
  }
})
```

### Typography tokens (marquees)

| Row | Size | Color / stroke |
|-----|------|----------------|
| Solid | clamp(28px, 3.4vw, 50px) | bone **0.85** fill |
| Outline | clamp(22px, 2.6vw, 38px) | transparent + stroke bone **0.35** |
| Dots solid | 6px | `#bcd3d8` |
| Dots outline | 4px | clear @ 0.5 |

Duplicate each row content **twice** (xPercent -50 loop seamless).

---

## 6. DOM structure

```
section#press.bg-ink
  eyebrow + H2 TextReveal
  figures × N quotes
  marquee track
    solid row (dup content)
    outline row (dup content, opposite direction)
```

---

## 7. Acceptance gates

- [ ] Quotes stagger in on scroll (once) near top 85%  
- [ ] Captions follow with delay  
- [ ] Dual marquees continuous opposite directions  
- [ ] Fast scroll → skew within **±6°**, recovers in **0.9s**  
- [ ] Fast scroll → timeScale up to **4**, returns to 1 after **1.4s** (delay 0.4)  
- [ ] Solid duration **38s**, outline **52s** base  
- [ ] Outlet names match data (Meridian, The Long Lunch, Foldout, Salt Journal, Quiet Hours — verify file)  
- [ ] No pin-spacer in DOM  
- [ ] LabChrome links work; no after-strip  
- [ ] reduce: marquees may static-set; quotes visible  

---

## 8. Forbidden mistakes

1. Single marquee only  
2. Same duration both rows (must be **38** vs **52**)  
3. Forgetting content duplication (gap jump every loop)  
4. Skew clamp wrong (±12 or uncapped)  
5. Velocity divisors wrong (420 skew, 1200 speed)  
6. Adding pin “for polish”  
7. Before/after runways  

---

## 9. Cross-links

- Prev: 04 · Next: 06 · Shell: 00 · GSAP §7 · notes/05-PRESS.md  

---

*End of 05 Press platinum package.*
