"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_LINKS = ["Meditate", "Sleep", "Breathe", "Stories", "Pricing"] as const;

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const reducedContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const reducedItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

const playfairStyle = {
  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
} as const;

const interStyle = {
  fontFamily: "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif",
} as const;

export default function AetherHeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Pause / resume video when offscreen
  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  // GSAP video scale parallax — skip on reduced motion / mobile
  useEffect(() => {
    if (prefersReducedMotion || isMobile) return;
    const videoEl = videoWrapRef.current;
    const heroEl = heroRef.current;
    if (!videoEl || !heroEl) return;

    const tween = gsap.to(videoEl, {
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: heroEl,
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [prefersReducedMotion, isMobile]);

  const reduce = !!prefersReducedMotion;
  const container = reduce ? reducedContainer : containerVariants;

  return (
    <div
      className="relative min-h-screen bg-[#FDFBF7] text-[#2D3E35]"
      style={interStyle}
    >
      {/* Navbar — fixed glass, h-16; safe insets so CTA never clips */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between gap-4 border-b border-white/30 bg-white/[0.42] px-8 backdrop-blur-md sm:px-10 md:px-12 lg:px-16"
        role="banner"
      >
        <a
          href="#hero"
          className="flex min-w-0 shrink-0 items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7BA58F]"
          style={playfairStyle}
        >
          <span className="text-lg font-semibold tracking-tight text-[#2D3E35]">
            AETHER
          </span>
          <span
            className="inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-[#7BA58F]"
            aria-hidden
          />
        </a>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-6 lg:gap-8 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="shrink-0 text-sm font-medium text-[#5C6B63] transition-colors hover:text-[#2D3E35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7BA58F]"
            >
              {link}
            </a>
          ))}
        </nav>

        <a
          href="#trial"
          className="shrink-0 whitespace-nowrap rounded-full bg-[#7BA58F] px-5 py-2.5 text-sm font-medium text-[#FDFBF7] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7BA58F]"
        >
          Start Free Trial
        </a>
      </header>

      {/* Hero — 100vh */}
      <section
        id="hero"
        ref={heroRef}
        className="relative h-screen overflow-hidden"
        aria-label="AETHER hero"
      >
        {/* Background video */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 origin-center will-change-transform"
        >
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/assets/videos/aether-waves-web-v1.mp4"
            poster="/assets/posters/aether-waves-v1.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
          />
        </div>

        {/* Light cream wash — waves must stay visible */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, rgba(253,251,247,0.15) 0%, rgba(253,251,247,0.35) 55%, rgba(253,251,247,0.5) 100%)",
          }}
          aria-hidden
        />

        {/* Centered hero content */}
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-8 text-center sm:px-10 md:px-12">
          <motion.div
            className="flex w-full min-w-0 max-w-[56rem] flex-col items-center"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.span
              variants={
                reduce
                  ? reducedItem
                  : {
                      hidden: { y: -20, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.7, ease: easeOut },
                      },
                    }
              }
              className="mb-6 inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[#7BA58F]"
            >
              ✦ FIND YOUR CENTER
            </motion.span>

            {/* H1 + Be. stack */}
            <div className="flex flex-col items-center">
              {/* Hierarchy: Breathe. is always the largest; Be. is ~0.58× H1 */}
              <motion.h1
                variants={
                  reduce
                    ? reducedItem
                    : {
                        hidden: { y: 40, opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: { duration: 0.8, ease: easeOut },
                        },
                      }
                }
                className="font-semibold leading-[1.05] tracking-tight text-[#2D3E35]"
                style={{
                  ...playfairStyle,
                  fontSize: "clamp(2.8rem, 7.5vw, 6.75rem)",
                }}
              >
                Breathe.
              </motion.h1>

              <motion.p
                variants={
                  reduce
                    ? reducedItem
                    : {
                        hidden: { y: 40, opacity: 0 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: {
                            duration: 0.8,
                            delay: 0.1,
                            ease: easeOut,
                          },
                        },
                      }
                }
                className="font-semibold leading-[1.05] tracking-tight text-[#7BA58F]"
                style={{
                  ...playfairStyle,
                  marginTop: "-0.18em",
                  fontSize: "clamp(1.62rem, 4.35vw, 3.9rem)",
                }}
                aria-hidden
              >
                Be.
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              variants={
                reduce
                  ? reducedItem
                  : {
                      hidden: { y: 30, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.7, ease: easeOut },
                      },
                    }
              }
              className="mt-6 max-w-xl text-base font-normal leading-[1.6] text-[#5C6B63] md:line-clamp-2 md:text-lg"
            >
              Guided meditations, sleep stories, and breathwork designed to help
              you find calm in a chaotic world.
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              variants={
                reduce
                  ? reducedItem
                  : {
                      hidden: { y: 20, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.7, ease: easeOut },
                      },
                    }
              }
              className="mt-10 flex w-full flex-col items-center"
            >
              <a
                href="#journey"
                className="inline-flex min-h-[44px] w-auto max-w-[280px] items-center justify-center gap-2 rounded-full bg-[#7BA58F] px-8 py-3.5 text-[15px] font-medium text-[#FDFBF7] transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7BA58F]"
              >
                Start Your Journey
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
