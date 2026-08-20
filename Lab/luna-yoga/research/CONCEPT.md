# CONCEPT - BLOOM yoga course + app hero

**Product ID (planned):** `MS-HERO-BLOM01`  
**Type:** hero  
**Category (planned):** health / wellness (or education - lock at MDX)  
**Price tier (intended):** pro  
**Mode:** V free-play film (~45s 1080p loop) + soft entrance + age path + course modules  

---

## 1A. One-line promise

A sunlit multi-girl yoga class hero that sells an **interactive online course and mobile app** for kids and teen girls - soft, premium, and impossible not to join.

## 1A. Who + desire

| Who | Desire |
|-----|--------|
| Girls ~7-12 | Fun class energy, animal/soft flows, feel proud |
| Teens ~13-17 | Calm without cringe, real confidence, school-day reset |
| Parents (buyer of course) | Safe, beautiful, easy start, not a gimmick |

## 1A. Signature behavior (plain English)

The hero film **plays as a living class**. Type and course UI float over soft scrims. Visitor picks **Kids** or **Teens** and the copy + module labels restage. Dual CTAs push free class + app download. Optional light phone card shows “today’s flow.”

## 1A. Film subject (required / forbidden)

**Required:** stylized diverse girls in a bright yoga class (operator film already delivers).  
**Forbidden as primary:** empty mat only, adult dark spa only, neon cyber yoga, stock office stretch, body-shame fitness.

## 1A. No temporary infrastructure notes in concept

Paths locked under vault names above. No DNS/admin notes in buyer prompt later.

---

## Layout sketch (hero)

```text
┌─────────────────────────────────────────────────────────┐
│ BLOOM    Classes  App  Ages     [Sign in] [Get the app] │
│ ──────────────────────────────── progress optional ─── │
│                                                         │
│  [ Kids | Teens ]                                       │
│                                                         │
│  Soft strength.                                         │
│  Big smiles.                     ┌─────────────┐        │
│                                  │ phone glass │        │
│  Short classes. Real calm.       │ Today's flow│        │
│  Join the circle.                └─────────────┘        │
│                                                         │
│  [ Breathe ] [ Stretch ] [ Flow ] [ Wind-down ]         │
│                                                         │
│  [ Start free class ]  [ Get the app ]                  │
│  120+ classes · Ages 7-17 · Parent-friendly             │
└─────────────────────────────────────────────────────────┘
         ↑ free-play class film full-bleed under soft scrims
```

---

## Module data (starter board)

```ts
// draft - cleanroom will own real file
type AgePath = "kids" | "teens";

const MODULES = {
  kids: [
    { id: "breathe", label: "Breathe", minutes: 5 },
    { id: "stretch", label: "Stretch", minutes: 8 },
    { id: "animals", label: "Animal flows", minutes: 10 },
    { id: "wind", label: "Wind-down", minutes: 7 },
  ],
  teens: [
    { id: "focus", label: "Focus", minutes: 8 },
    { id: "flow", label: "Flow", minutes: 15 },
    { id: "soft", label: "Soft strength", minutes: 12 },
    { id: "sleep", label: "Sleep wind-down", minutes: 10 },
  ],
};
```

---

## Success criteria (lab → cleanroom)

1. Film feels inviting and premium (not cheap cartoon site)  
2. Kids vs Teens toggle is obvious and delightful  
3. CTAs make download/join the obvious next step  
4. Parent can trust the page in one glance  
5. Differentiated from STILL / adult wellness heroes  

---

## Out of scope for lab

- Full cleanroom build  
- CMS publish  
- Package zip/PDF  
- Storefront dual capture  
- Age-gated real auth / real app store links (use `#` or placeholders until brand URLs exist)
