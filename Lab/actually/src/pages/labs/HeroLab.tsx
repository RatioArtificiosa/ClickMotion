import { Hero } from "../../sections/Hero";

/**
 * Isolated #hero lab — product-demo cut.
 * No LabChrome title/menu bar, no after-strip runway.
 * Section only so pin start: "top top" owns the viewport.
 *
 * Open: /lab/hero
 * Shares real <Hero /> — do not fork.
 */
export function HeroLab() {
  return (
    <div className="min-h-dvh bg-ink text-bone">
      <main>
        <Hero />
      </main>
    </div>
  );
}
