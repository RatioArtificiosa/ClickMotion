import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { getLenis } from "../lib/lenis";
import { useIsMobile } from "../lib/hooks";

const LINKS = [
  { label: "Flavors", target: "#flavors" },
  { label: "Inside", target: "#inside" },
  { label: "Story", target: "#story" },
  { label: "Stockists", target: "#stockists" },
];

function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const qx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power2.out" });
    const qy = gsap.quickTo(el, "y", { duration: 0.4, ease: "power2.out" });
    const move = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      qx((e.clientX - (b.left + b.width / 2)) * strength);
      qy((e.clientY - (b.top + b.height / 2)) * strength);
    };
    const leave = () => {
      qx(0);
      qy(0);
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [menu, setMenu] = useState(false);
  const mobile = useIsMobile();
  const leftHero = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      const hero = document.getElementById("hero");
      if (hero && hero.getBoundingClientRect().bottom > 100) {
        leftHero.current = false;
        setVisible(true);
        return;
      }
      if (!leftHero.current) {
        leftHero.current = true;
        setVisible(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menu]);

  const go =
    (target: string) =>
    (e: React.MouseEvent) => {
      e.preventDefault();
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { duration: 1.2 });
      else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      setMenu(false);
    };

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
    setMenu(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,transform] duration-[400ms] ease-out"
        style={{
          height: "var(--nav-h)",
          transform: !visible || menu || mobile ? "translateY(0)" : "translateY(-100%)",
          backgroundColor:
            scrolled || mobile ? "rgba(239, 237, 230, 0.92)" : "transparent",
          backdropFilter: scrolled || mobile ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom:
            scrolled
              ? "1px solid rgba(140, 139, 134, 0.4)"
              : "1px solid transparent",
        }}
      >
        <div className="mx-auto h-full max-w-[1440px] flex items-center px-5 md:px-8">
          <div className="flex-1 md:flex-none">
            <a
              href="/"
              onClick={toTop}
              className="inline-flex items-baseline font-wordmark text-ink leading-none"
              style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.5px" }}
              aria-label="ACTUALLY. — back to top"
            >
              <span>ACTUALLY</span>
              <span
                aria-hidden
                className="inline-block bg-alpine align-baseline"
                style={{ width: 8, height: 8, marginLeft: 2 }}
              />
            </a>
          </div>

          <ul className="hidden md:flex items-center gap-8 flex-1 justify-center">
            {LINKS.map((l) => (
              <li key={l.target}>
                <Magnetic strength={0.3}>
                  <a
                    href={l.target}
                    onClick={go(l.target)}
                    className="nav-underline font-sans text-mist hover:text-ink transition-colors duration-[250ms]"
                    style={{ fontSize: 14, fontWeight: 400, letterSpacing: "0.04em" }}
                  >
                    {l.label}
                  </a>
                </Magnetic>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-5 md:flex-none">
            <Magnetic strength={0.3} className="hidden md:inline-block">
              <a
                href="#shop"
                onClick={go("#shop")}
                className="inline-flex items-center font-sans text-ink group"
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  gap: 6,
                }}
              >
                Shop
                <span
                  aria-hidden
                  className="inline-block transition-transform duration-[250ms] ease-out group-hover:translate-x-1"
                  style={{ fontSize: 12 }}
                >
                  →
                </span>
              </a>
            </Magnetic>

            <button
              type="button"
              onClick={() => setMenu(true)}
              className="md:hidden flex items-center justify-center w-11 h-11 -mr-2.5"
              aria-label="Open menu"
            >
              <span className="flex flex-col justify-center w-[18px] h-[14px]">
                <span className="block bg-ink" style={{ height: 1, marginBottom: 4 }} />
                <span className="block bg-ink" style={{ height: 1, marginBottom: 4 }} />
                <span className="block bg-ink" style={{ height: 1 }} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[60] bg-bone transition-opacity duration-300 ${
          menu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!menu}
      >
        <button
          type="button"
          onClick={() => setMenu(false)}
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-ink"
          aria-label="Close menu"
        >
          ✕
        </button>
        <ul className="absolute inset-0 flex flex-col items-center justify-center gap-9">
          {LINKS.map((l) => (
            <li key={l.target}>
              <a
                href={l.target}
                onClick={go(l.target)}
                className="font-sans text-ink"
                style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-0.005em" }}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#shop"
              onClick={go("#shop")}
              className="font-sans text-ink"
              style={{ fontSize: 32, fontWeight: 600 }}
            >
              Shop
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
