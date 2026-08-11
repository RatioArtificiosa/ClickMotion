"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const variants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  } as const,
  item: {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25 as const, 0.46, 0.45, 0.94] as any } },
  } as const,
};

function FloatingCard({ icon, title, desc, delay }: { icon: string; title: string; desc: string; delay: number }) {
  return (
    <motion.div
      className="rounded-2xl border border-white/20 bg-white/60 p-5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.06)] text-left w-[200px]"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className="mb-2 text-xl">{icon}</div>
      <div className="text-sm font-semibold text-[#2D3E35]">{title}</div>
      <div className="mt-1 text-xs leading-relaxed text-[#6B7F75]">{desc}</div>
    </motion.div>
  );
}

export default function AetherDemoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (reduced) return;
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* NAVBAR */}
      <header className="fixed top-0 z-50 w-full border-b border-[#7BA58F]/10 bg-[#FDFBF7]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-8">
          <span className="text-xl font-semibold tracking-wide text-[#2D3E35]" style={{ fontFamily: "Playfair Display, serif" }}>
            AETHER<span className="ml-1.5 inline-block h-2 w-2 rounded-full bg-[#7BA58F]" />
          </span>
          <nav className="hidden gap-1 md:flex">
            {["Meditate", "Sleep", "Breathe", "Stories", "Pricing"].map((l) => (
              <a key={l} href="#" className="rounded-full px-4 py-2 text-sm font-medium text-[#6B7F75] hover:text-[#2D3E35] transition-colors">
                {l}
              </a>
            ))}
          </nav>
          <a href="#" className="rounded-full bg-[#7BA58F] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#6A9A82] transition">
            Start Free Trial
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        {/* Video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/posters/aether-waves-v1.webp"
          className="absolute inset-0 h-full w-full object-cover"
          src="/assets/videos/aether-waves-web-v1.mp4"
        />
        {/* Warm overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(253,251,247,0.1) 0%, rgba(253,251,247,0.4) 100%)" }}
        />

        {/* Content */}
        <motion.div
          className="relative z-10 flex max-w-4xl flex-col items-center px-8 pt-16 text-center"
          variants={reduced ? undefined : variants.container}
          initial={reduced ? undefined : "hidden"}
          animate={reduced ? undefined : "visible"}
        >
          <motion.p
            variants={reduced ? undefined : variants.item}
            className="mb-6 text-xs font-semibold tracking-[0.2em] text-[#7BA58F]/70"
          >
            ✦ FIND YOUR CENTER
          </motion.p>

          <motion.h1
            variants={reduced ? undefined : variants.item}
            className="text-[3.5rem] font-semibold leading-[1.05] tracking-tight text-[#2D3E35] md:text-[6rem]"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Breathe.
          </motion.h1>
          <motion.p
            variants={reduced ? undefined : variants.item}
            className="text-[3rem] font-semibold leading-[1.05] tracking-tight text-[#7BA58F]/70 md:text-[5rem]"
            style={{ fontFamily: "Playfair Display, serif", marginTop: "-0.15em" }}
          >
            Be.
          </motion.p>

          <motion.p
            variants={reduced ? undefined : variants.item}
            className="mt-4 max-w-xl text-base font-light leading-relaxed text-[#6B7F75] md:text-lg"
          >
            Guided meditations, sleep stories, and breathwork designed to help you find calm in a chaotic world.
          </motion.p>

          <motion.div variants={reduced ? undefined : variants.item} className="mt-8">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-[#7BA58F] px-8 py-4 text-base font-medium text-white hover:bg-[#6A9A82] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7BA58F] focus-visible:ring-offset-2"
            >
              Start Your Journey →
            </a>
          </motion.div>

          {/* Floating cards */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <FloatingCard icon="🌊" title="Sleep Stories" desc="Drift off with dreamy narrations." delay={0} />
            <FloatingCard icon="🍃" title="Daily Calm" desc="10 min of mindful breathing." delay={0.15} />
            <FloatingCard icon="☁️" title="Focus Flow" desc="Stay present, get more done." delay={0.3} />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
