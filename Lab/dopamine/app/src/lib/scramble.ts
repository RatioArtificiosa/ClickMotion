import gsap from "gsap";

const ALPHA = "abcdefghijklmnopqrstuvwxyz";

/** Port of footer-anim.js letter roll — A→target letter per char node */
export function scrambleChars(
  chars: Element[] | NodeListOf<Element>,
  { durationPerChar = 0.18, stagger = 0.04, paused = false } = {},
) {
  const tl = gsap.timeline({ paused });
  if (!chars || !chars.length) return tl;

  Array.from(chars).forEach((c, b) => {
    const el = c as HTMLElement;
    const m = el.textContent || "";
    const i = m.match(/[a-z]/i);
    const l = b * stagger;
    if (!i) {
      tl.set(el, { opacity: 1 }, l);
      tl.call(() => {
        el.textContent = m;
      }, undefined, l);
      return;
    }
    const y = i[0];
    const x = y.toLowerCase();
    const S = ALPHA.indexOf(x);
    if (S === -1) {
      tl.set(el, { opacity: 1 }, l);
      tl.call(() => {
        el.textContent = m;
      }, undefined, l);
      return;
    }
    const upper = y === y.toUpperCase();
    const g = { progress: 0 };
    tl.set(el, { opacity: 1 }, l);
    tl.to(
      g,
      {
        progress: 1,
        duration: durationPerChar,
        ease: "none",
        onStart() {
          let h = ALPHA[0];
          if (upper) h = h.toUpperCase();
          el.textContent = m.replace(y, h);
        },
        onUpdate() {
          const h = S + 1;
          let u = Math.floor(g.progress * h);
          if (u < 0) u = 0;
          if (u > S) u = S;
          let w = ALPHA[u];
          if (upper) w = w.toUpperCase();
          el.textContent = m.replace(y, w);
        },
        onComplete() {
          el.textContent = m;
        },
      },
      l,
    );
  });
  return tl;
}

/** Split text into .char spans (preserves non-letters as single nodes) */
export function splitToChars(el: HTMLElement) {
  const text = el.textContent ?? "";
  el.textContent = "";
  const frag = document.createDocumentFragment();
  for (const ch of text) {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = ch === " " ? "\u00A0" : ch;
    frag.appendChild(span);
  }
  el.appendChild(frag);
  return el.querySelectorAll(".char");
}
