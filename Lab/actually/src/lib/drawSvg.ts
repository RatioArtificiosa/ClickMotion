import gsap from "gsap";

/**
 * Club DrawSVGPlugin stand-in: animate stroke-dashoffset 0%→100% (or reverse).
 * Paths must be SVGGeometryElement (path/line/polyline/etc).
 */
export function drawSvgPaths(
  nodes: ArrayLike<Element>,
  {
    from = "0%",
    to = "100%",
    duration = 0.9,
    ease = "power1.inOut",
    stagger = 0.08,
    delay = 0,
    overwrite = "auto" as gsap.TweenVars["overwrite"],
  } = {},
) {
  const els = Array.from(nodes).filter(
    (n): n is SVGGeometryElement =>
      n instanceof SVGGeometryElement && typeof n.getTotalLength === "function",
  );
  if (!els.length) return null;

  const parse = (v: string) => {
    const n = parseFloat(v);
    if (v.endsWith("%")) return Math.min(1, Math.max(0, n / 100));
    return Math.min(1, Math.max(0, n));
  };
  const f = parse(from);
  const t = parse(to);

  els.forEach((el) => {
    const len = el.getTotalLength();
    el.style.strokeDasharray = `${len}`;
    el.style.strokeDashoffset = `${len * (1 - f)}`;
  });

  return gsap.to(els, {
    strokeDashoffset: (i, el) => {
      const len = (el as SVGGeometryElement).getTotalLength();
      return len * (1 - t);
    },
    duration,
    ease,
    stagger,
    delay,
    overwrite,
  });
}
