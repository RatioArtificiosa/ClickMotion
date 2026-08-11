import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "../components/TextReveal";
import { PRESS_OUTLETS, PRESS_QUOTES } from "../data/press";

gsap.registerPlugin(ScrollTrigger);

function MarqueeRow({
  variant,
}: {
  variant: "solid" | "outline";
}) {
  const solid = variant === "solid";
  return (
    <>
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-baseline">
          {PRESS_OUTLETS.map((name) => (
            <span key={`${dup}-${name}`} className="flex items-baseline">
              <span
                className="font-display font-[300] tracking-[-0.01em] whitespace-nowrap"
                style={
                  solid
                    ? {
                        fontSize: "clamp(28px, 3.4vw, 50px)",
                        color: "rgba(239,237,230,0.85)",
                      }
                    : {
                        fontSize: "clamp(22px, 2.6vw, 38px)",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(239,237,230,0.35)",
                      }
                }
              >
                {name}
              </span>
              <span
                className="mx-[clamp(20px,3vw,44px)] inline-block rounded-full"
                style={{
                  width: solid ? 6 : 4,
                  height: solid ? 6 : 4,
                  backgroundColor: solid
                    ? "#bcd3d8"
                    : "rgba(188,211,216,0.5)",
                }}
              />
            </span>
          ))}
        </div>
      ))}
    </>
  );
}

/**
 * #press — quote line reveals + dual marquee with velocity skew/speed.
 */
export function Press() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const solidRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const figureRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const solid = solidRef.current;
    const outline = outlineRef.current;
    if (!section || !track || !solid || !outline) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      // Quote figures — soft block rise (keeps natural text wrap; no hard line masks)
      figureRefs.current.forEach((fig, i) => {
        if (!fig) return;
        gsap.set(fig, { opacity: 1 });
        const visual = fig.querySelector(
          "[data-quote-visual]",
        ) as HTMLElement | null;
        const cap = fig.querySelector("figcaption");

        if (visual) {
          if (reduce) {
            gsap.set(visual, { opacity: 1, y: 0 });
          } else {
            gsap.fromTo(
              visual,
              { y: 28, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power2.out",
                delay: 0.12 * i,
                scrollTrigger: {
                  trigger: fig,
                  start: "top 85%",
                  once: true,
                },
              },
            );
          }
        }

        if (cap) {
          if (reduce) {
            gsap.set(cap, { opacity: 1, y: 0 });
          } else {
            gsap.fromTo(
              cap,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                delay: 0.35 + 0.12 * i,
                scrollTrigger: {
                  trigger: fig,
                  start: "top 85%",
                  once: true,
                },
              },
            );
          }
        }
      });

      if (reduce) return;

      // Dual marquee loops
      const a = gsap.to(solid, {
        xPercent: -50,
        duration: 38,
        ease: "none",
        repeat: -1,
      });
      const b = gsap.fromTo(
        outline,
        { xPercent: -50 },
        { xPercent: 0, duration: 52, ease: "none", repeat: -1 },
      );

      const skewObj = { skew: 0 };
      const setSkew = gsap.quickSetter(track, "skewX", "deg");
      const clampSkew = gsap.utils.clamp(-6, 6);

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          const sk = clampSkew(-(v / 420));
          if (Math.abs(sk) > Math.abs(skewObj.skew)) {
            skewObj.skew = sk;
            gsap.to(skewObj, {
              skew: 0,
              duration: 0.9,
              ease: "power2.out",
              overwrite: true,
              onUpdate: () => setSkew(skewObj.skew),
            });
          }
          const ts = gsap.utils.clamp(1, 4, 1 + Math.abs(v) / 1200);
          [a, b].forEach((tw) => {
            gsap.to(tw, {
              timeScale: ts,
              duration: 0.4,
              ease: "power1.out",
              overwrite: "auto",
            });
            gsap.to(tw, {
              timeScale: 1,
              duration: 1.4,
              delay: 0.4,
              ease: "power2.out",
              overwrite: false,
            });
          });
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="press"
      className="relative w-full bg-ink overflow-hidden py-24 md:py-[140px]"
    >
      <div className="mx-auto w-full max-w-[1440px] px-[clamp(24px,6vw,120px)]">
        <div className="font-sans text-[12px] tracking-[0.2em] uppercase text-bone/50">
          <span className="text-bone">05</span>
          <span className="mx-2 text-bone/30">/</span>
          Press
        </div>
        <TextReveal
          as="h2"
          split="lines"
          className="mt-4 font-wordmark uppercase leading-[0.95] text-bone"
          style={{
            fontSize: "clamp(30px, 4.2vw, 56px)",
            fontWeight: 900,
            letterSpacing: "-0.02em",
          }}
        >
          Quietly noticed.
        </TextReveal>
      </div>

      <div className="mx-auto mt-14 md:mt-20 w-full max-w-[1440px] px-[clamp(24px,6vw,120px)] grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {PRESS_QUOTES.map((q, i) => (
          <figure
            key={q.source}
            ref={(el) => {
              figureRefs.current[i] = el;
            }}
            className="flex flex-col"
            style={{ opacity: 0 }}
          >
            <blockquote
              className="font-serif italic text-bone/90 leading-[1.45]"
              style={{
                fontSize: "clamp(17px, 1.4vw, 20px)",
                maxWidth: "36ch",
                // pretty wrap when supported (Chrome 117+)
                ...({ textWrap: "pretty" } as object),
              }}
            >
              <span className="sr-only">“{q.text}”</span>
              <span
                data-quote-visual
                aria-hidden
                className="block"
                style={{ opacity: 0 }}
              >
                “{q.text}”
              </span>
            </blockquote>
            <figcaption
              className="mt-5 font-sans text-[11px] tracking-[0.24em] uppercase text-bone/60"
              style={{ opacity: 0 }}
            >
              {q.source}
            </figcaption>
          </figure>
        ))}
      </div>

      <div
        ref={trackRef}
        className="mt-16 md:mt-24 border-y border-bone/15 py-6 md:py-8 will-change-transform"
      >
        <div
          ref={solidRef}
          className="flex w-max items-baseline whitespace-nowrap will-change-transform"
          aria-hidden
        >
          <MarqueeRow variant="solid" />
        </div>
        <div
          ref={outlineRef}
          className="mt-4 flex w-max items-baseline whitespace-nowrap will-change-transform"
          aria-hidden
        >
          <MarqueeRow variant="outline" />
        </div>
      </div>

      <p className="sr-only">
        As featured in {PRESS_OUTLETS.join(", ")}.
      </p>
    </section>
  );
}
