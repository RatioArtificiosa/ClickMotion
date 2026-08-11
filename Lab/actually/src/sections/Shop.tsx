import { useEffect, useRef, useState, type FormEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "../components/ScrollReveal";
import { TextReveal } from "../components/TextReveal";
import {
  COMING_SOON,
  SHOP_PRODUCTS,
  STOCKIST_CITIES,
  type ShopProduct,
} from "../data/shop";
import { useIsMobile } from "../lib/hooks";

gsap.registerPlugin(ScrollTrigger);

function ProductCard({
  product,
  fitContent = false,
}: {
  product: ShopProduct;
  fitContent?: boolean;
}) {
  const [pack, setPack] = useState<"4-pack" | "12-pack">("4-pack");
  const [added, setAdded] = useState(false);
  const price = pack === "4-pack" ? product.fourPack : product.twelvePack;

  return (
    <article
      className={`group flex flex-col transition-[transform,box-shadow] duration-[400ms] ease-out hover:-translate-y-1 ${fitContent ? "" : "h-full"}`}
      style={{
        backgroundColor: "var(--color-bone)",
        border: "1px solid rgba(140, 139, 134, 0.4)",
        padding: 32,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(26, 27, 29, 0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="w-full relative transition-transform duration-500 ease-out group-hover:scale-[1.04] will-change-transform"
        style={{
          ...(fitContent
            ? { height: "min(36vh, 280px)" }
            : { aspectRatio: "4 / 5" }),
          backgroundColor: "rgba(26, 27, 29, 0.025)",
        }}
      >
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            bottom: "8%",
            width: "40%",
            height: "5%",
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(26, 27, 29, 0.25) 0%, transparent 70%)",
          }}
        />
        <img
          src={product.image}
          alt={`${product.number} ${product.name} can`}
          className="absolute inset-0 h-full w-full object-contain"
          style={{ transform: "scale(1.12)" }}
          draggable={false}
        />
      </div>

      <div className="mt-6 flex items-baseline whitespace-nowrap" style={{ gap: 8 }}>
        <span
          className="font-wordmark text-ink"
          style={{
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: "-1px",
            lineHeight: 1,
          }}
        >
          {product.number}
        </span>
        <span className="text-mist" style={{ fontSize: 18 }}>
          ·
        </span>
        <span
          className="font-display text-ink"
          style={{ fontSize: 24, fontWeight: 300, lineHeight: 1 }}
        >
          {product.name}
        </span>
      </div>
      <p
        className="mt-2 font-sans uppercase text-mist"
        style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.22em" }}
      >
        {product.flavor}
      </p>
      <p
        className="mt-3 font-sans text-ink"
        style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.5 }}
      >
        {product.blurb}
      </p>
      <div className="flex-1" style={{ minHeight: 24 }} />

      <div className="flex" style={{ gap: 8 }}>
        {(["4-pack", "12-pack"] as const).map((p) => {
          const on = pack === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => setPack(p)}
              className="font-sans uppercase transition-colors duration-200"
              style={{
                height: 36,
                padding: "0 16px",
                borderRadius: 18,
                border: "1px solid var(--color-ink)",
                backgroundColor: on ? "var(--color-ink)" : "transparent",
                color: on ? "var(--color-bone)" : "var(--color-ink)",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.33em",
              }}
            >
              {p.toUpperCase()}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-baseline" style={{ gap: 8 }}>
        <span
          className="font-wordmark text-ink tabular-nums"
          style={{ fontSize: 28, fontWeight: 900, lineHeight: 1 }}
        >
          ${price}
        </span>
        <span
          className="font-sans text-mist"
          style={{ fontSize: 16, fontWeight: 400, letterSpacing: "0.02em" }}
        >
          NZD
        </span>
      </div>
      <p className="mt-1 font-serif italic text-mist" style={{ fontSize: 13 }}>
        Subscribe and save 15%
      </p>

      <button
        type="button"
        onClick={() => {
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1600);
        }}
        className="mt-4 w-full font-sans uppercase transition-colors duration-300 ease-out"
        style={{
          height: 48,
          backgroundColor: "var(--color-ink)",
          color: "var(--color-bone)",
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: "0.46em",
        }}
        aria-label="Add to cart"
      >
        {added ? "ADDED" : "ADD TO CART"}
      </button>
      <button
        type="button"
        className="mt-2 inline-flex items-baseline font-sans transition-colors duration-200 group/sublink self-start hover:text-ink"
        style={{
          fontSize: 13,
          fontWeight: 400,
          color: "rgba(26, 27, 29, 0.6)",
        }}
      >
        Subscribe instead
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 ease-out group-hover/sublink:translate-x-1"
          style={{ marginLeft: 6 }}
        >
          →
        </span>
      </button>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 06a — STOCKISTS / Where available
 * ═══════════════════════════════════════════════════════════════════════════ */

/**
 * #stockists — city columns + coming soon.
 * Lab: /lab/stockists · Full page: composed inside <Shop />.
 */
export function Stockists({
  standalone = true,
}: {
  /** When false, omit outer section (parent Shop owns #shop shell). */
  standalone?: boolean;
}) {
  const mobile = useIsMobile();
  const rootRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cityRefs = useRef<(HTMLDivElement | null)[]>([]);
  const comingRef = useRef<HTMLDivElement>(null);
  const [openCity, setOpenCity] = useState<string | null>("Wellington");

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const n = mobile ? 0.7 : 1;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (eyebrowRef.current) {
        if (reduce) gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
        else
          gsap.fromTo(
            eyebrowRef.current,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: root,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          );
      }

      if (titleRef.current) {
        if (reduce) gsap.set(titleRef.current, { opacity: 1 });
        else {
          gsap.set(titleRef.current, { opacity: 1 });
          gsap.fromTo(
            titleRef.current,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: "power2.out",
              scrollTrigger: {
                trigger: root,
                start: "top 80%",
                once: true,
              },
            },
          );
        }
      }

      cityRefs.current.forEach((col, i) => {
        if (!col) return;
        if (reduce) {
          gsap.set(col, { opacity: 1, y: 0 });
          gsap.set(col.querySelectorAll("[data-stockist-item]"), {
            opacity: 1,
            y: 0,
          });
          return;
        }
        gsap.fromTo(
          col,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.15 * i * n,
            scrollTrigger: {
              trigger: col,
              start: "top 85%",
              once: true,
            },
          },
        );
        const items = col.querySelectorAll("[data-stockist-item]");
        gsap.fromTo(
          items,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.06 * n,
            delay: 0.15 * i * n + 0.25,
            scrollTrigger: {
              trigger: col,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      if (comingRef.current) {
        if (reduce) gsap.set(comingRef.current, { opacity: 1, y: 0 });
        else
          gsap.fromTo(
            comingRef.current,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              delay: 0.45 * n,
              scrollTrigger: {
                trigger: comingRef.current,
                start: "top 90%",
                once: true,
              },
            },
          );
      }
    }, root);

    return () => ctx.revert();
  }, [mobile]);

  const header = (
    <div>
      <div
        ref={eyebrowRef}
        className="font-sans text-[12px] tracking-[0.2em] uppercase text-mist"
        style={{ opacity: 0 }}
      >
        <span className="text-ink">06</span>
        <span className="mx-2 text-mist/50">/</span>
        Where available
      </div>
      <h2
        ref={titleRef}
        className="mt-4 font-wordmark uppercase text-ink leading-[1.02]"
        style={{
          fontSize: "clamp(28px, 3.6vw, 48px)",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          maxWidth: 980,
          opacity: 0,
        }}
      >
        {standalone
          ? "Find ACTUALLY in store."
          : "Find ACTUALLY in store, or order direct."}
      </h2>
    </div>
  );

  const body = (
    <>
      <div
        id={standalone ? undefined : "stockists"}
        className="mt-12 md:mt-[80px] grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-16"
      >
        {STOCKIST_CITIES.map((col, i) => {
          const open = openCity === col.city;
          return (
            <div
              key={col.city}
              ref={(el) => {
                cityRefs.current[i] = el;
              }}
              style={{ opacity: 0 }}
            >
              <button
                type="button"
                onClick={() => setOpenCity(open ? null : col.city)}
                className="w-full flex items-center justify-between md:pointer-events-none"
              >
                <h3
                  className="font-sans text-ink"
                  style={{
                    fontSize: "clamp(24px, 6vw, 32px)",
                    fontWeight: 600,
                    letterSpacing: "-0.3px",
                    lineHeight: 1.1,
                  }}
                >
                  {col.city}
                </h3>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  width={18}
                  height={18}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  className={`md:hidden text-mist transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                >
                  <path d="M6 9 L12 15 L18 9" />
                </svg>
              </button>
              <div
                className="mt-4"
                style={{
                  height: 1,
                  backgroundColor: "rgba(26, 27, 29, 0.2)",
                }}
              />
              <ul
                className={`mt-5 flex-col md:flex ${open ? "flex" : "hidden"}`}
              >
                {col.locations.map((loc, li) => (
                  <li
                    key={loc.name}
                    data-stockist-item
                    className="group relative"
                    style={{
                      borderBottom:
                        li === col.locations.length - 1
                          ? "none"
                          : "1px solid rgba(140, 139, 134, 0.3)",
                      opacity: 0,
                    }}
                  >
                    <span
                      aria-hidden
                      className="absolute -inset-x-3 inset-y-0 bg-ink origin-bottom scale-y-0 transition-transform duration-[350ms] ease-out group-hover:scale-y-100"
                    />
                    <div className="relative z-10 flex items-baseline justify-between gap-4 py-4 px-0 transition-transform duration-[350ms] group-hover:translate-x-3">
                      <span className="flex flex-col min-w-0">
                        <span
                          className="font-sans text-ink transition-colors duration-[350ms] group-hover:text-bone"
                          style={{
                            fontSize: 16,
                            fontWeight: 500,
                            letterSpacing: "0.005em",
                          }}
                        >
                          {loc.name}
                        </span>
                        <span
                          className="mt-1 font-sans text-mist transition-colors duration-[350ms] group-hover:text-bone/60"
                          style={{ fontSize: 14, fontWeight: 400 }}
                        >
                          {loc.address}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="shrink-0 font-sans text-bone opacity-0 -translate-x-2 transition-all duration-[350ms] group-hover:opacity-100 group-hover:translate-x-0"
                        style={{ fontSize: 14 }}
                      >
                        →
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div
        ref={comingRef}
        className="mt-20 md:mt-[80px] text-center"
        style={{ opacity: 0 }}
      >
        <div
          className="font-sans uppercase text-mist"
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.6em",
          }}
        >
          COMING SOON
        </div>
        <div
          className="mt-4 flex flex-wrap items-center justify-center"
          style={{ gap: "16px 12px" }}
        >
          {COMING_SOON.map((city, i) => (
            <span key={city} className="contents">
              {i > 0 && (
                <span
                  aria-hidden
                  className="font-sans"
                  style={{
                    color: "var(--color-alpine)",
                    fontSize: 18,
                    fontWeight: 500,
                  }}
                >
                  ·
                </span>
              )}
              <span
                className="font-sans text-ink"
                style={{ fontSize: 18, fontWeight: 400, opacity: 0.7 }}
              >
                {city}
              </span>
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (!standalone) {
    return (
      <div ref={rootRef as React.RefObject<HTMLDivElement>}>
        {header}
        {body}
      </div>
    );
  }

  return (
    <section
      ref={rootRef as React.RefObject<HTMLElement>}
      id="stockists"
      className="relative w-full bg-bone"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8 py-20 md:py-[120px]">
        {header}
        {body}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * 06b — PRODUCTS / Price boxes (order direct)
 * ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Product price cards + mobile range modal.
 * Lab: /lab/products · Full page: composed inside <Shop />.
 */
export function ShopProducts({
  standalone = true,
}: {
  standalone?: boolean;
}) {
  const mobile = useIsMobile();
  const rootRef = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ruleLRef = useRef<HTMLDivElement>(null);
  const ruleRRef = useRef<HTMLDivElement>(null);
  const directLabelRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [modal, setModal] = useState<ShopProduct | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const n = mobile ? 0.7 : 1;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (standalone && eyebrowRef.current) {
        if (reduce) gsap.set(eyebrowRef.current, { opacity: 1, y: 0 });
        else
          gsap.fromTo(
            eyebrowRef.current,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: root,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          );
      }

      if (standalone && titleRef.current) {
        if (reduce) gsap.set(titleRef.current, { opacity: 1 });
        else {
          gsap.set(titleRef.current, { opacity: 1 });
          gsap.fromTo(
            titleRef.current,
            { y: 28, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: "power2.out",
              scrollTrigger: {
                trigger: root,
                start: "top 80%",
                once: true,
              },
            },
          );
        }
      }

      if (ruleLRef.current && ruleRRef.current && directLabelRef.current) {
        if (reduce) {
          gsap.set([ruleLRef.current, ruleRRef.current], { scaleX: 1 });
          gsap.set(directLabelRef.current, { opacity: 1 });
        } else {
          gsap.fromTo(
            [ruleLRef.current, ruleRRef.current],
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: directLabelRef.current,
                start: "top 88%",
                once: true,
              },
            },
          );
          gsap.fromTo(
            directLabelRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.15,
              scrollTrigger: {
                trigger: directLabelRef.current,
                start: "top 88%",
                once: true,
              },
            },
          );
        }
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        if (reduce) {
          gsap.set(card, { opacity: 1, y: 0, scale: 1 });
          return;
        }
        gsap.fromTo(
          card,
          { y: 80, scale: 0.96, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.2 * i * n,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [mobile, standalone]);

  useEffect(() => {
    if (!modal) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modal]);

  const divider = (
    <div
      className={`flex items-center justify-center ${standalone ? "mt-4 md:mt-8" : "mt-[100px]"}`}
      style={{ gap: 20 }}
    >
      <div
        ref={ruleLRef}
        className="origin-right"
        style={{
          width: 80,
          height: 1,
          backgroundColor: "var(--color-mist)",
          transform: "scaleX(0)",
        }}
      />
      <span
        ref={directLabelRef}
        className="font-sans uppercase text-mist whitespace-nowrap"
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.6em",
          opacity: 0,
        }}
      >
        OR ORDER DIRECT
      </span>
      <div
        ref={ruleRRef}
        className="origin-left"
        style={{
          width: 80,
          height: 1,
          backgroundColor: "var(--color-mist)",
          transform: "scaleX(0)",
        }}
      />
    </div>
  );

  const products = (
    <>
      {divider}

      {/* Desktop product grid */}
      <div className="mt-[80px] hidden md:grid md:grid-cols-3 gap-8">
        {SHOP_PRODUCTS.map((p, i) => (
          <div
            key={p.sku}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{ opacity: 0 }}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* Mobile range */}
      <div className="md:hidden mt-14 text-center">
        <ScrollReveal>
          <div
            className="font-sans uppercase text-mist"
            style={{ fontSize: 12, letterSpacing: "0.4em" }}
          >
            THE RANGE
          </div>
        </ScrollReveal>
        <TextReveal
          as="h3"
          split="chars"
          className="mt-2 font-display text-ink"
          style={{ fontSize: 26, fontWeight: 300 }}
        >
          Order direct.
        </TextReveal>
      </div>
      <div className="mt-5 flex justify-center gap-3 md:hidden">
        {SHOP_PRODUCTS.map((p, i) => (
          <ScrollReveal
            key={p.sku}
            delay={0.12 * i}
            className="w-[28vw] max-w-[150px]"
          >
            <button
              type="button"
              onClick={() => setModal(p)}
              className="w-full flex flex-col items-center text-center active:opacity-80 transition-opacity"
              style={{
                border: "1px solid rgba(140,139,134,0.4)",
                padding: "12px 8px 14px",
                backgroundColor: "var(--color-bone)",
              }}
            >
              <div className="relative w-full" style={{ aspectRatio: "3 / 4" }}>
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(58% 48% at 50% 46%, ${p.accent} 0%, transparent 70%)`,
                    opacity: 0.5,
                  }}
                />
                <img
                  src={p.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain"
                  style={{ transform: "scale(1.08)" }}
                  draggable={false}
                />
              </div>
              <span
                className="mt-1 font-display text-ink leading-none"
                style={{ fontSize: 15, fontWeight: 300 }}
              >
                {p.name}
              </span>
              <span
                className="mt-1 font-sans tabular-nums text-mist"
                style={{ fontSize: 12 }}
              >
                ${p.fourPack}
              </span>
              <span
                className="mt-2 inline-flex items-center gap-1 font-sans uppercase text-bone"
                style={{
                  fontSize: 9,
                  letterSpacing: "0.18em",
                  backgroundColor: "var(--color-ink)",
                  borderRadius: 999,
                  padding: "4px 10px",
                }}
              >
                View
                <svg
                  viewBox="0 0 24 24"
                  width={9}
                  height={9}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 5 L16 12 L9 19" />
                </svg>
              </span>
            </button>
          </ScrollReveal>
        ))}
      </div>
    </>
  );

  const modalEl = modal ? (
    <div
      className="fixed inset-0 z-[80] md:hidden flex flex-col bg-bone"
      role="dialog"
      aria-label={`${modal.number} ${modal.name}`}
    >
      <div className="flex justify-end px-5 pt-5">
        <button
          type="button"
          onClick={() => setModal(null)}
          className="w-11 h-11 flex items-center justify-center text-ink"
          aria-label="Close"
        >
          <svg
            viewBox="0 0 24 24"
            width={22}
            height={22}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M5 5 L19 19 M19 5 L5 19" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 pb-10">
        <ProductCard product={modal} fitContent />
      </div>
    </div>
  ) : null;

  if (!standalone) {
    return (
      <div ref={rootRef as React.RefObject<HTMLDivElement>}>
        {products}
        {modalEl}
      </div>
    );
  }

  return (
    <section
      ref={rootRef as React.RefObject<HTMLElement>}
      id="shop"
      className="relative w-full bg-bone"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8 py-20 md:py-[120px]">
        <div>
          <div
            ref={eyebrowRef}
            className="font-sans text-[12px] tracking-[0.2em] uppercase text-mist"
            style={{ opacity: 0 }}
          >
            <span className="text-ink">06</span>
            <span className="mx-2 text-mist/50">/</span>
            Order direct
          </div>
          <h2
            ref={titleRef}
            className="mt-4 font-wordmark uppercase text-ink leading-[1.02]"
            style={{
              fontSize: "clamp(28px, 3.6vw, 48px)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              maxWidth: 980,
              opacity: 0,
            }}
          >
            The range. Order direct.
          </h2>
        </div>
        {products}
      </div>
      {modalEl}
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
 * Combined Shop (full page) — stockists + products, original single section
 * ═══════════════════════════════════════════════════════════════════════════ */

/**
 * #shop / #stockists — full combined block for Home.
 * Labs use Stockists + ShopProducts separately.
 */
export function Shop() {
  return (
    <section id="shop" className="relative w-full bg-bone">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8 py-20 md:py-[120px]">
        <Stockists standalone={false} />
        <ShopProducts standalone={false} />
      </div>
    </section>
  );
}

/** Minimal footer — closes the page after shop. */
export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [msg, setMsg] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("done");
      setMsg("You're on the list.");
      setEmail("");
    }, 600);
  };

  return (
    <footer className="relative w-full bg-bone overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)] pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12">
          <div className="md:col-span-6">
            <div className="font-sans text-[12px] tracking-[0.2em] uppercase text-mist">
              Newsletter
            </div>
            <TextReveal
              as="h2"
              split="lines"
              className="mt-4 font-display font-[300] leading-[1.05] tracking-[-0.01em] text-ink"
              style={{ fontSize: "clamp(30px, 3.6vw, 52px)" }}
            >
              Get notified when we ship to your city.
            </TextReveal>
          </div>
          <div className="md:col-span-6 flex flex-col justify-end">
            <form
              onSubmit={onSubmit}
              className="flex items-end gap-4 border-b border-ink/30 pb-3"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") setStatus("idle");
                }}
                placeholder="Email address"
                className="flex-1 bg-transparent font-sans text-[16px] text-ink placeholder:text-mist focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="font-sans text-[13px] tracking-[0.12em] uppercase text-ink hover:text-mist transition-colors duration-300 disabled:opacity-50"
              >
                {status === "sending" ? "Sending" : "Sign up"}
              </button>
            </form>
            <p
              aria-live="polite"
              className="mt-3 min-h-[20px] font-sans text-[13px] text-mist"
            >
              {msg}
            </p>
          </div>
        </div>

        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-12 gap-y-10 md:gap-x-12 border-t border-ink/10 pt-10">
          <div className="md:col-span-4">
            <div
              className="flex items-baseline font-wordmark text-ink leading-none"
              style={{
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: "-0.02em",
              }}
            >
              <span>ACTUALLY</span>
              <span
                aria-hidden
                className="inline-block ml-[2px]"
                style={{
                  width: 6,
                  height: 6,
                  backgroundColor: "#bcd3d8",
                }}
              />
            </div>
            <p className="mt-4 font-sans text-[13px] leading-[1.6] text-mist max-w-[32ch]">
              A nootropic blend for sustained natural focus. Caffeine-free.
            </p>
          </div>
          <div className="md:col-span-3">
            <div className="font-sans text-[11px] tracking-[0.24em] uppercase text-mist">
              Site
            </div>
            <ul className="mt-4 flex flex-col gap-2 font-sans text-[14px] text-ink">
              {(
                [
                  ["Flavors", "#flavors"],
                  ["Inside", "#inside"],
                  ["Story", "#story"],
                  ["Stockists", "#stockists"],
                  ["Shop", "#shop"],
                ] as const
              ).map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="hover:text-mist transition-colors duration-300"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 md:col-start-11">
            <div className="font-sans text-[11px] tracking-[0.24em] uppercase text-mist">
              Legal
            </div>
            <ul className="mt-4 flex flex-col gap-2 font-sans text-[14px] text-ink">
              <li>
                <a
                  href="#privacy"
                  className="hover:text-mist transition-colors duration-300"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  className="hover:text-mist transition-colors duration-300"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between font-sans text-[12px] text-mist">
          <span>© {new Date().getFullYear()} ACTUALLY.</span>
          <span className="tracking-[0.12em] uppercase">New York City</span>
        </div>
      </div>
    </footer>
  );
}
