/** Minimal split helpers if Club GSAP SplitText is unavailable. */

export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";
  const words: HTMLElement[] = [];
  text.split(/(\s+)/).forEach((part) => {
    if (!part) return;
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.textContent = part;
    el.appendChild(span);
    if (part.trim()) words.push(span);
  });
  return words;
}

export function splitLines(el: HTMLElement): HTMLElement[] {
  // Word wrap then group by offsetTop
  const words = splitWords(el);
  if (!words.length) return [];
  const lines: HTMLElement[][] = [];
  let row: HTMLElement[] = [];
  let top = words[0].offsetTop;
  for (const w of words) {
    if (Math.abs(w.offsetTop - top) > 2) {
      lines.push(row);
      row = [];
      top = w.offsetTop;
    }
    row.push(w);
  }
  if (row.length) lines.push(row);

  el.textContent = "";
  return lines.map((lineWords) => {
    const line = document.createElement("span");
    line.style.display = "block";
    line.style.overflow = "hidden";
    const inner = document.createElement("span");
    inner.style.display = "block";
    lineWords.forEach((w, i) => {
      if (i) inner.appendChild(document.createTextNode(" "));
      const s = document.createElement("span");
      s.textContent = w.textContent;
      inner.appendChild(s);
    });
    // Use single line content for yPercent anim on line itself
    line.textContent = lineWords.map((w) => w.textContent).join(" ");
    const mask = document.createElement("span");
    mask.style.display = "block";
    mask.style.overflow = "hidden";
    const move = document.createElement("span");
    move.style.display = "block";
    move.textContent = line.textContent;
    mask.appendChild(move);
    el.appendChild(mask);
    return move;
  });
}

export function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? "";
  el.textContent = "";
  const chars: HTMLElement[] = [];
  for (const ch of text) {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.textContent = ch === " " ? "\u00a0" : ch;
    el.appendChild(span);
    chars.push(span);
  }
  return chars;
}

