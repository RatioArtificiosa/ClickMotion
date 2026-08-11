import { useEffect, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flavors } from "../../sections/Flavors";

gsap.registerPlugin(ScrollTrigger);

/**
 * Isolated #flavors lab — product-reveal demo cut.
 * Scroll-pinned three-SKU stage: Clear → Dawn → Dusk (snap 0 / ⅓ / ⅔ / 1).
 *
 * No LabChrome title/menu bar, no after-strip runway.
 * Tight top inset (no full site nav reserve) so the pin owns the viewport.
 *
 * Open: /lab/flavors
 * Shares real <Flavors /> — do not fork.
 */
export function FlavorsLab() {
  useEffect(() => {
    window.scrollTo(0, 0);
    const a = requestAnimationFrame(() => ScrollTrigger.refresh());
    const b = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      cancelAnimationFrame(a);
      window.clearTimeout(b);
    };
  }, []);

  const labStyle = {
    // Section uses --nav-h for header pad; lab has no site nav.
    ["--nav-h" as string]: "20px",
  } as CSSProperties;

  return (
    <div className="min-h-dvh bg-bone text-ink" style={labStyle}>
      <style>{`
        /* Pin spacer matches bone stage — no white flash under scrub */
        #flavors .pin-spacer,
        .pin-spacer {
          background: #efede6 !important;
        }
      `}</style>
      <main>
        <Flavors />
      </main>
    </div>
  );
}
