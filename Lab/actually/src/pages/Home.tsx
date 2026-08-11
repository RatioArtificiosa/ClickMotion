import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Hero } from "../sections/Hero";
import { Flavors } from "../sections/Flavors";
import { Inside } from "../sections/Inside";
import { Story } from "../sections/Story";
import { Press } from "../sections/Press";
import { Shop, Footer } from "../sections/Shop";
import { LAB_ROUTES } from "../components/LabChrome";

/**
 * Full single-page rebuild: Hero → Flavors → Inside → Story → Press → Shop.
 * Isolated labs live at /lab/* — same section components, no forks.
 */
export function Home() {
  return (
    <>
      <div className="grain-overlay" aria-hidden />
      <Nav />
      {/* Dev-only lab index strip — does not affect production motion */}
      <div className="pointer-events-none fixed bottom-3 left-3 right-3 z-[9998] flex justify-center md:justify-start">
        <nav
          className="pointer-events-auto flex max-w-full flex-wrap items-center gap-1.5 rounded-lg border border-ink/15 bg-bone/90 px-2 py-1.5 shadow-lg backdrop-blur-md"
          aria-label="Open section labs"
        >
          <span className="px-1.5 font-sans text-[9px] uppercase tracking-[0.2em] text-mist">
            Labs
          </span>
          {LAB_ROUTES.map((r) => (
            <Link
              key={r.path}
              to={r.path}
              className="rounded px-2 py-1 font-sans text-[10px] uppercase tracking-[0.12em] text-ink/80 hover:bg-ink hover:text-bone"
            >
              {r.num}
            </Link>
          ))}
        </nav>
      </div>
      <main>
        <Hero />
        <Flavors />
        <Inside />
        <Story />
        <Press />
        <Shop />
      </main>
      <Footer />
    </>
  );
}
