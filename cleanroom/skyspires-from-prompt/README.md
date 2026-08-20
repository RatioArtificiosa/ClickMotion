# SkySpires - sunrise cinematic HUD (cleanroom)

**Mode:** Dual process = **PSAVE + No Scroller**  
**Demo:** `/demo/cleanroom-skyspires`  
**Film:** `/assets/videos/skyspires-sunrise-v1.mp4` (GOP 3, 25.04s, 24fps)  
**Poster:** `/assets/posters/skyspires-sunrise-v1.webp`  
**SKU:** MS-HERO-SKYS01

Source clone `E:\website-tests\skyspires-clone` is **FROZEN**. Do not edit those shipped files.

## Law

- One `100dvh` stage. No tall spacer. No GSAP. No Lenis.
- Scroll aims virtual dest on **12 viewports** (25.04s even sunrise).
- Film plays the whole movie. Forward 1.2x. Reverse 3-frame steps.
- HUD loops stay: CTA 12.5s, dock sheen 6.4s, dock gold 12s, stats 10s, rings 2.8s, CDMX clock.
- Do not retune `.lg-fill` / `.lg-spec` on dock, CTA, Log In, stats.
- Pin freeing: after the picture arrives at the last frame + down, the page owns until dock.
- Brand is **SkySpires**. Not Nexora. Sphere/Grok Bot is a different product.

## Files

- `SkySpiresHero.tsx` - HUD + PSAVE chase
- `hero.css` - frost liquid glass (locked fills)
- `copy.ts` - locked product language
