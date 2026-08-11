import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Floating lab chrome — does NOT affect document flow or pin start positions.
 * Use on every isolated section lab. Never put a layout runway before Hero.
 */

export const LAB_ROUTES = [
  { path: "/lab/hero", num: "01", label: "Hero", pin: "+=120%" },
  { path: "/lab/flavors", num: "02", label: "Flavors", pin: "3×vh" },
  { path: "/lab/inside", num: "03", label: "Inside", pin: "4×vh" },
  { path: "/lab/story", num: "04", label: "Story", pin: "(c-0.4)×vh" },
  { path: "/lab/press", num: "05", label: "Press", pin: "none" },
  { path: "/lab/stockists", num: "06a", label: "Stockists", pin: "none" },
  { path: "/lab/products", num: "06b", label: "Products", pin: "none" },
] as const;

export function LabChrome({
  sectionNum,
  sectionLabel,
  pinNote,
}: {
  sectionNum: string;
  sectionLabel: string;
  pinNote?: string;
}) {
  const { pathname } = useLocation();

  // Route changes remount sections; refresh ST + scroll to top so pin start is clean.
  useEffect(() => {
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[9999] flex flex-col gap-2 p-3 md:p-4"
      data-lab-chrome
    >
      <div className="pointer-events-auto flex flex-wrap items-center justify-between gap-2 rounded-lg border border-ink/15 bg-bone/92 px-3 py-2 shadow-[0_8px_32px_rgba(26,27,29,0.12)] backdrop-blur-md">
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-mist">
            ACTUALLY · Section Lab
          </p>
          <p className="truncate font-sans text-[12px] font-medium tracking-[0.04em] text-ink">
            <span className="tabular-nums text-alpine">{sectionNum}</span>
            <span className="mx-1.5 text-mist">/</span>
            {sectionLabel}
            {pinNote ? (
              <span className="ml-2 font-normal text-mist">· pin {pinNote}</span>
            ) : null}
          </p>
        </div>
        <Link
          to="/"
          className="shrink-0 font-sans text-[11px] uppercase tracking-[0.16em] text-ink/80 underline-offset-4 hover:underline"
        >
          ← Full page
        </Link>
      </div>

      <nav
        className="pointer-events-auto flex max-w-full flex-wrap gap-1.5 overflow-x-auto rounded-lg border border-ink/10 bg-ink/90 px-2 py-1.5 shadow-lg backdrop-blur-md"
        aria-label="Section labs"
      >
        {LAB_ROUTES.map((r) => {
          const active = pathname === r.path;
          return (
            <Link
              key={r.path}
              to={r.path}
              className={`rounded px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.14em] transition-colors ${
                active
                  ? "bg-bone text-ink"
                  : "text-bone/70 hover:bg-bone/10 hover:text-bone"
              }`}
            >
              <span className="tabular-nums opacity-70">{r.num}</span>{" "}
              {r.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

/** Compact after-strip so pin sections can unstick / be reviewed post-scrub. */
export function LabAfterStrip({
  note = "Lab end · pin released",
  minHeight = "50dvh",
  bg = "var(--color-bone)",
  color = "var(--color-mist)",
}: {
  note?: string;
  minHeight?: string;
  bg?: string;
  color?: string;
}) {
  return (
    <footer
      className="relative z-0 flex flex-col items-center justify-center gap-4 px-5 text-center"
      style={{ minHeight, background: bg, color }}
      data-lab-after
    >
      <p className="font-sans text-[10px] uppercase tracking-[0.22em] opacity-70">
        {note}
      </p>
      <Link
        to="/"
        className="font-sans text-[11px] uppercase tracking-[0.16em] underline-offset-4 hover:underline"
        style={{ color: "inherit", opacity: 0.85 }}
      >
        ← Back to full page
      </Link>
    </footer>
  );
}
