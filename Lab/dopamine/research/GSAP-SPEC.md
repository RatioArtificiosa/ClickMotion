# GSAP / Motion Spec — DOPAMINE film + footer

Source: `research/chunks/main.js` (`Ge`, `Ue`), `footer-anim.js`

## Film pin (`Ge`)

| Param | Value |
|-------|--------|
| trigger | `.motion-section__pin` |
| start | `top top` |
| endTrigger | `.footer` |
| end | `bottom bottom` |
| pinSpacing | `false` |
| maskW mobile | 90 → 1000 |
| maskW tablet | 60 → 500 |
| maskW desktop | 30 → 440 |
| video scale | 1.2 → 1 over progress 0…0.3 |
| play | pin `top 90%` |
| mask aspect | 254/343 |

## Film intro (`Ue`)

| Param | Value |
|-------|--------|
| trigger | `.motion-section` |
| start | `top 75%` |
| props | scaleY 0→1, origin bottom |
| duration | 0.7 |
| ease | source CustomEase `0.75,0,0.25,1` → clone `power3.out` |
| stagger lines | 0.06 |

## Footer enter (`footer-anim`)

| Target | Animation |
|--------|-----------|
| logo | yPercent 300→0, 1.2s power3.out |
| img | yPercent 100→0, 1.2s |
| form | opacity 0→1, 2s power2.out |
| title | scaleY 0→1 origin bottom, 0.8s @ 0.4 |
| ST | trigger footer, start `top 80%`, once |
| scramble | durationPerChar 0.18, stagger 0.04 |
| lottie enter | 0→0.5 desktop / 0→1 touch, ~0.9s |
| lottie hover | →1 / back to 0.5 |
