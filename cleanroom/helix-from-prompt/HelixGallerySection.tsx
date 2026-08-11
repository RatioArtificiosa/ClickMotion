"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, ScrollTrigger } from "./gsap-register";
import { OrbitHelix } from "./OrbitHelix";

registerGsap();

/**
 * HELIX — helical design gallery carousel section (MS-SEC-HELI01).
 *
 * Scroll-pinned mid-page section: WebGL cylindrical card helix, crossing
 * "Design in" / "motion" titles, ClickMotion wordmark lockup. No background
 * film. Pin ends when titles leave the frame (helix phase only).
 */
export default function HelixGallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const topWordRef = useRef<HTMLDivElement>(null);
  const bottomWordRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const helixProgress = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let ctx: ReturnType<typeof gsap.context> | null = null;

    if (topWordRef.current) {
      gsap.set(topWordRef.current, { x: "-100vw", force3D: true });
    }
    if (bottomWordRef.current) {
      gsap.set(bottomWordRef.current, { x: "100vw", force3D: true });
    }

    if (reduce) {
      helixProgress.current = 0.45;
      gsap.set(topWordRef.current, { x: 0 });
      gsap.set(bottomWordRef.current, { x: 0 });
      return;
    }

    const pinMetrics = () => {
      const mobile = window.innerWidth < 768;
      const ew = mobile ? 3 : 5;
      return { pinPx: window.innerHeight * ew };
    };

    const TITLE_PEAK_G = 0.18;
    const setTitles = (g: number) => {
      const titleT =
        g <= TITLE_PEAK_G
          ? gsap.utils.mapRange(0, TITLE_PEAK_G, 0, 0.5, g)
          : gsap.utils.mapRange(TITLE_PEAK_G, 1, 0.5, 1, Math.min(g, 1));
      if (topWordRef.current) {
        gsap.set(topWordRef.current, {
          x: `${-100 + titleT * 200}vw`,
          force3D: true,
        });
      }
      if (bottomWordRef.current) {
        gsap.set(bottomWordRef.current, {
          x: `${100 - titleT * 200}vw`,
          force3D: true,
        });
      }
    };

    helixProgress.current = 0;
    setTitles(0);

    ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: "helix-gallery-pin",
        trigger: pin,
        start: "top top",
        end: () => `+=${pinMetrics().pinPx}`,
        pin: true,
        pinType: "fixed",
        anticipatePin: 1,
        scrub: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onUpdate(self) {
          const g = gsap.utils.clamp(0, 1, self.progress);
          helixProgress.current = g;
          setTitles(g);

          if (subtitleRef.current) {
            const eg = 0.55;
            const H = gsap.utils.clamp(0, 1, (g - eg) / (1 - eg || 1));
            subtitleRef.current.style.opacity = String(
              Math.max(0, 1 - 4 * H),
            );
          }
        },
      });
    }, section);

    ScrollTrigger.refresh();

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="helix-gallery"
      data-product="MS-SEC-HELI01"
      className="relative z-30 bg-[#C3C3C3] text-[#0a0a0a]"
      style={{ backgroundColor: "#C3C3C3" }}
    >
      <div
        ref={pinRef}
        className="relative z-30 -mt-px h-dvh min-h-dvh w-full overflow-hidden bg-[#C3C3C3] pt-20 pb-16 lg:py-20"
        style={{ isolation: "isolate", backgroundColor: "#C3C3C3" }}
      >
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-0 z-0 select-none overflow-visible"
        >
          <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 overflow-visible whitespace-nowrap">
            <div className="flex w-full flex-col items-center overflow-visible">
              <div
                ref={topWordRef}
                className="relative will-change-transform"
              >
                <h2
                  className="relative whitespace-nowrap font-[family-name:var(--font-helix-display)] text-[clamp(3.25rem,13vw,9.5rem)] uppercase leading-[0.8] tracking-[-0.04em] text-[#1a1a1a]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  Design in
                </h2>
              </div>

              <div
                ref={subtitleRef}
                className="relative mx-auto my-3 flex flex-col items-center text-center"
              >
                <p
                  className="mb-3"
                  aria-label="ClickMotion"
                  style={{
                    fontFamily: "var(--font-helix-wordmark), cursive",
                    fontSize: "clamp(1.85rem, 3.6vw, 2.75rem)",
                    fontWeight: 400,
                    color: "#0a0a0a",
                    whiteSpace: "nowrap",
                    lineHeight: 1,
                    letterSpacing: "0.02em",
                  }}
                >
                  ClickMotion
                </p>
                <p className="font-[family-name:var(--font-helix-display)] text-[12px] uppercase tracking-[0.08em] text-[#1a1a1a] md:text-[13px]">
                  Exploring ideas through
                  <br />
                  daily design practice.
                </p>
              </div>

              <div
                ref={bottomWordRef}
                className="relative will-change-transform"
              >
                <h2
                  className="relative whitespace-nowrap font-[family-name:var(--font-helix-display)] text-[clamp(3.25rem,13vw,9.5rem)] uppercase leading-[0.8] tracking-[-0.04em] text-[#1a1a1a]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  motion
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto flex w-full max-w-[1440px] justify-start px-5 pb-10 md:px-10 md:pb-14">
          <p className="max-w-[16rem] text-left text-[13px] leading-relaxed text-[#0a0a0a]/80 md:text-[14px]">
            Concepts, explorations, and interface
            <br />
            experiments shared openly as part of
            <br />
            our creative process.
          </p>
        </div>

        <OrbitHelix
          progressRef={helixProgress}
          className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        />
      </div>
    </section>
  );
}
