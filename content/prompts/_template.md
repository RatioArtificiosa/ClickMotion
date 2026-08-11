---
id: "MS-HERO-000"
title: "Template Hero - Full Master Template (Copy Me)"
slug: "template-hero-full-master"
description: "Brief compelling description of what this prompt creates - the promise the user sees before buying."
version: "1.0.0"
created: "2026-08-07"
updated: "2026-08-07"
author: "MS Team"
status: "draft"
type: "hero"
category: "saas"
subcategory: "ai-product"
styleTags: ["dark-cinematic", "gradient-mesh"]
technicalTags: ["video-background", "parallax"]
motionIntensity: "aggressive"
difficulty: "intermediate"
priceTier: "pro"
aiToolsRating:
 cursor: 5
 lovable: 4
 bolt: 4
 claude: 4
 grok-build: 5
frameworksSupported: ["react", "html"]
previewVideo: "/previews/MS-HERO-000.mp4"
previewGif: "/previews/MS-HERO-000.gif"
thumbnail: "/thumbnails/MS-HERO-000.webp"
liveDemo: "/demos/MS-HERO-000"
videoBackgrounds:
 - file: "/assets/videos/template-mesh-v1.mp4"
 format: "mp4"
 duration: "12s"
 loop: true
 sizeMb: 3.2
 poster: "/assets/posters/template-mesh-v1.webp"
dependencies:
 - name: "framer-motion"
 version: "^11.0.0"
 required: true
 - name: "gsap"
 version: "^3.12.0"
 required: true
 - name: "tailwindcss"
 version: "^4.0.0"
 required: true
estimatedTokens: 4200
useCases: ["saas-homepage", "ai-product-launch"]
compatibleWith: ["MS-SEC-FEAT-001"]
positionInPage: "top"
---

## Design System

**Colors:**
- Background: `#0A0A0F` (deep space black)
- Primary: `#6366F1` (indigo)
- Accent: `#22D3EE` (cyan glow)
- Text Primary: `#F8FAFC` (near white)
- Text Secondary: `#94A3B8` (slate 400)
- Gradient: `linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #22D3EE 100%)`

**Typography:**
- Heading: `Inter, system-ui, sans-serif` - 72px / 800 weight / -0.02em tracking
- Subheading: `Inter` - 20px / 400 weight / 1.6 line-height
- CTA: `Inter` - 16px / 600 weight

**Spacing:** 8px base unit. Section padding: 120px top/bottom. Max content width: 1280px.

**Aesthetic Direction:** Dark cinematic with gradient mesh accents. Premium, confident, slightly futuristic. Generous whitespace, strong hierarchy.

---

## Layout Structure

- **Header:** 64px height, logo left, nav center, CTA right. Sticky, backdrop-blur on scroll.
- **Hero area:** Two-column (60/40) on desktop - headline + subheadline + dual CTA left, visual (gradient orb + product screenshot) right.
- **Visual element:** 480px gradient orb behind screenshot, offset 40px top/right.
- **CTA placement:** Primary (gradient) + secondary (outline) side-by-side, 16px gap.
- **Max width:** 1280px centered, 24px horizontal padding on mobile.

---

## Content Slots

| Slot | Default Text | Max Length | Notes |
|------|-------------|------------|-------|
| headline | "Build the Future" | 60 chars | Main H1 |
| subheadline | "Description text that explains the value proposition." | 160 chars | Below H1 |
| cta_primary | "Get Started" | 20 chars | Gradient button |
| cta_secondary | "Watch Demo" | 20 chars | Outline button |
| visual_src | "/images/hero-product.png" | - | Product screenshot |

---

## Motion Specification

### Entrance Sequence (Framer Motion)

```js
const container = {
 hidden: { opacity: 0 },
 show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
 hidden: { opacity: 0, y: 24 },
 show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};
```

Order: headline → subheadline → CTAs → visual (stagger 0.12s). Total entrance: ~1.0s.

### Scroll Animations (GSAP ScrollTrigger)

```js
gsap.to('.bg-orb', {
 y: -80,
 scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: 1.2 },
});
```

### Hover

- CTA primary: scale 1.02 + glow spread, 150ms easeOut.
- CTA secondary: border color shift + subtle lift (y: -2px).

### Parallax

- Background orb: speed 0.4 vertical.

---

## Video / Media Integration

- **Format:** MP4 H.264, 1920×1080, 12s loop, <5MB. No audio.
- **Poster:** WebP 1920×1080 <150KB at `/assets/posters/template-mesh-v1.webp`.
- **Loading:** Poster renders immediately; video `preload="metadata"` `autoplay muted loop playsInline`. Off-screen deferred via IntersectionObserver.
- **Fallback:** If video fails, poster remains; no broken state. `onError` hides video element.

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|--------|
| ≥1536px (2xl) | Full layout, max orb size |
| ≥1280px (xl) | Default layout |
| ≥1024px (lg) | Reduce parallax to 0.3, orb 400px |
| ≥768px (md) | Stack to single column, visual below CTAs |
| <768px (sm) | Single column, minimal motion (fade only), CTAs full-width stacked |

---

## Accessibility

- `prefers-reduced-motion`: Disable parallax + reduce entrance to single fade (no y movement).
- All images: descriptive alt text via slot.
- CTAs: focus ring `ring-2 ring-ring ring-offset-2`, keyboard navigable, `aria-label` if icon-only.
- Color contrast: ≥4.5:1 for text, ≥3:1 for large text.
- Semantic HTML: `<section>`, `<h1>`, `<nav>`, `<button>`.

---

## Performance Notes

- JS budget: <45KB (Framer Motion + GSAP shared; this component adds ~8KB).
- Images: WebP, `loading="lazy"` below fold, `fetchpriority="high"` for hero image.
- Video: poster <150KB, video async, not render-blocking.
- Fonts: `font-display: swap`, preload Inter if not system font.
- `will-change: transform, opacity` only on animated elements, removed after entrance.

---

## AI Tool Instructions

**For Cursor/Claude:** Generate as a single React component file (`HeroSection.tsx`) with Tailwind classes. Include Framer Motion variants inline. Use `useEffect` + `gsap.registerPlugin(ScrollTrigger)` for scroll effects.

**For Lovable/Bolt:** Generate as a complete page component. Ensure all imports at top. Use `motion` from `framer-motion` and `gsap` + `@gsap/react`.

**For v0:** Generate as a shadcn-compatible component. Keep Tailwind classes; v0 will handle the rest.

---

## Expected Output

A single React component (`HeroSection.tsx`) that:

1. Exports a default function component.
2. Uses Tailwind CSS for all styling.
3. Uses Framer Motion for entrance animations (stagger container + item variants).
4. Uses GSAP ScrollTrigger for parallax (orb moves on scroll).
5. Is fully responsive (stacks on mobile, dual-column on desktop).
6. Handles `prefers-reduced-motion` (CSS media query + JS check).
7. Accepts content via props or clearly marked string literals for easy editing.
