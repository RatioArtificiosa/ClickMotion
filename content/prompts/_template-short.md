---
id: "MS-SEC-FEAT-000"
title: "Template Section - Short Template (Copy Me)"
slug: "template-section-short"
description: "Brief description of this modular section."
version: "1.0.0"
created: "2026-08-07"
updated: "2026-08-07"
author: "MS Team"
status: "draft"
type: "section"
category: "saas"
subcategory: "ai-product"
styleTags: ["minimal"]
technicalTags: ["css-only"]
motionIntensity: "subtle"
difficulty: "beginner"
priceTier: "starter"
frameworksSupported: ["react", "html"]
thumbnail: "/thumbnails/MS-SEC-FEAT-000.webp"
dependencies:
 - name: "framer-motion"
 version: "^11.0.0"
 required: true
 - name: "tailwindcss"
 version: "^4.0.0"
 required: true
estimatedTokens: 1800
useCases: ["feature-grid", "saas-landing"]
compatibleWith: ["MS-HERO-001"]
positionInPage: "middle"
---

## Design System

- Background: `#FFFFFF` / Dark: `#0A0A0F`
- Primary: `#6366F1`, Text: `#0F172A` / `#F8FAFC`
- Font: `Inter` - 16px body, 32px section heading
- Spacing: 8px base, section padding 80px

---

## Layout Structure

- 3-column grid on desktop (gap 24px), 1 column on mobile.
- Each card: icon top, title, description, optional link.
- Max width 1280px centered.

---

## Content Slots

| Slot | Default | Max | Notes |
|------|---------|-----|-------|
| heading | "Features" | 40 chars | H2 |
| cards | 3-6 items | 80 chars desc each | Icon + title + desc |

---

## Motion Specification

```js
const card = {
 hidden: { opacity: 0, y: 16 },
 show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
// Stagger 0.08s via container staggerChildren
```

No GSAP. IntersectionObserver triggers `whileInView`.

---

## Video / Media Integration

None. Icons are Lucide or inline SVG.

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|--------|
| ≥1024px | 3 columns |
| ≥768px | 2 columns |
| <768px | 1 column, stack |

---

## Accessibility

- `prefers-reduced-motion`: fade only, no y movement.
- Cards are semantic `<article>` or `<li>`, heading hierarchy correct.
- Focus rings on links.

---

## Performance Notes

- <15KB JS. No video, no heavy deps.
- Icons inline, no extra network requests.

---

## AI Tool Instructions

Generate as a single React component. Use `motion.div` with `whileInView`. Keep it simple - this is a short template.

---

## Expected Output

A single React component that renders a responsive feature grid with subtle entrance animation, fully accessible and performant.
