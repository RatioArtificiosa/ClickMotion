# Dopamine - start here

You are about to place a **complete fashion footer** on your site: dual navigation, exclusion wordmark, living hero figure, Lottie discount badge, letter scramble, subscribe form, and a credits panel - premium enough to close a campaign page.

You do not need to be a programmer. Your AI does the technical work.

## What is in this folder

| Item | For |
|------|-----|
| **PROMPT.md** | Give this to your AI. One instruction: build from this folder. |
| **CUSTOMIZATION.md** | Later: brand, figure, nav, copy, Lottie, colors. |
| **assets/** | Client media only (figure, mask backgrounds, Lottie). No storefront video. |
| **source/** | Production React footer + scramble + logo + CSS. |

## What you do (about 15 minutes)

1. Unzip this pack into a project folder (or open it next to your app).
2. Copy assets:
   - `assets/*` → `public/assets/dopamine/`
3. Copy `source/*` into your components folder (keep them together).
4. Install: `gsap`, `lottie-web`
5. Import CSS once (global or layout):

```tsx
import "./source/dopamine-footer.css";
```

6. Tell your AI:

```
Build Dopamine footer using only the files in this pack folder.
Read PROMPT.md and follow it exactly. Use the source and assets provided.
```

7. Scroll the footer into view: logo rises, figure enters, letters scramble, Lottie badge plays, form fades in.

## Default entry

```tsx
import "./source/dopamine-footer.css";
import { SiteFooter } from "./source/SiteFooter";

export default function Page() {
  return (
    <main>
      {/* your page content */}
      <div style={{ minHeight: "40vh" }} aria-hidden />
      <SiteFooter />
    </main>
  );
}
```

## What this pack is not

- Not a recording of our website UI
- Not storefront preview videos
- Not the film / lips-mask section (that is a separate product if sold)
- Just the complete footer system, ready to restage

## If something fails

Paste the error into the same AI and say:

> Fix this for me without asking me to write code. Keep the Dopamine footer motion (scramble, Lottie badge, logo rise, figure enter). Use dop-container, never Tailwind container.

ClickMotion · www.ClickMotion.dev
