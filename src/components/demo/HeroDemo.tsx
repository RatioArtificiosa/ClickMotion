"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { DemoHero } from "@/lib/demo-heroes";

const container = {
 hidden: { opacity: 0 },
 visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
 hidden: { y: 30, opacity: 0 },
 visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as any } },
};

export function HeroDemo({ hero }: { hero: DemoHero }) {
 const videoRef = useRef<HTMLVideoElement>(null);
 const [reduced, setReduced] = useState(false);
 const hasVideo = Boolean(hero.video);

 useEffect(() => {
 setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
 }, []);

 useEffect(() => {
 const v = videoRef.current;
 if (!v || !hasVideo || reduced) return;
 const io = new IntersectionObserver(([e]) => {
 if (e.isIntersecting) v.play().catch(() => {});
 else v.pause();
 });
 io.observe(v);
 return () => io.disconnect();
 }, [hasVideo, reduced]);

 const isLight = hero.category === "health";
 const bgColor = hero.colors.bg;
 const fgColor = hero.colors.fg;

 return (
 <section
 className="relative flex h-[90vh] min-h-[540px] items-center overflow-hidden"
 style={{ background: bgColor, color: fgColor }}
 >
 {/* Video or poster */}
 {hasVideo ? (
 <>
 <video
 ref={videoRef}
 autoPlay={!reduced}
 muted
 loop
 playsInline
 preload="metadata"
 poster={hero.poster}
 src={hero.video!}
 className="absolute inset-0 h-full w-full object-cover"
 />
 {/* Overlay tuned per hero */}
 <div
 className="absolute inset-0"
 style={{
 background:
 hero.id === "MS-HERO-AETH01"
 ? "linear-gradient(180deg, rgba(253,251,247,0.1) 0%, rgba(253,251,247,0.45) 100%)"
 : hero.id === "MS-HERO-VERT01"
 ? "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)"
 : "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.6) 100%)",
 }}
 />
 </>
 ) : (
 <>
 {/* eslint-disable-next-line @next/next/no-img-element */}
 <img src={hero.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
 </>
 )}

 <div className="absolute top-0 flex h-16 w-full items-center justify-between px-8 text-[11px] font-semibold tracking-[0.18em]" style={{ zIndex: 20 }}>
 <span className="text-sm tracking-tight" style={{ fontFamily: hero.fontHead, letterSpacing: "-0.02em", fontWeight: 700 }}>
 {hero.title.split(" - ")[0]}{" "}
 <span style={{ color: hero.colors.primary, textShadow: hero.id === "MS-HERO-NEON01" ? "0 0 12px currentColor" : undefined }}>●</span>
 </span>
 <span className="hidden gap-6 md:flex opacity-60">
 {["Work", "Features", "Pricing"].map((l) => (
 <span key={l}>{l}</span>
 ))}
 </span>
 <span className="flex items-center gap-2">
 <span
 className="hidden rounded-full px-4 py-2 md:inline"
 style={{ background: hero.colors.primary, color: bgColor === "#000" || bgColor === "#07080F" || bgColor === "#070A1A" ? "#000" : "#fff" }}
 >
 {hero.ctas[0]}
 </span>
 </span>
 </div>

 <motion.div
 className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col px-8 pt-8"
 variants={reduced ? undefined : container}
 initial={reduced ? undefined : "hidden"}
 animate={reduced ? undefined : "visible"}
 >
 <motion.p
 variants={reduced ? undefined : item}
 className="mb-4 text-xs font-semibold tracking-[0.2em] opacity-70"
 >
 {hero.badge}
 </motion.p>

 <motion.h1
 variants={reduced ? undefined : item}
 className="text-[2.8rem] font-black leading-[0.85] tracking-tighter md:text-[5rem] lg:text-[6rem]"
 style={{ fontFamily: hero.fontHead }}
 >
 {hero.headline}
 </motion.h1>

 <motion.p
 variants={reduced ? undefined : { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as any, delay: 0.1 } } }}
 className="text-[2.2rem] font-black leading-[0.85] tracking-tighter md:text-[4rem] lg:text-[5rem]"
 style={{ fontFamily: hero.fontHead, color: hero.colors.primary === fgColor ? fgColor : hero.colors.primary, marginTop: "-0.08em", opacity: 0.9 }}
 >
 {hero.subheadline}
 </motion.p>

 <motion.p
 variants={reduced ? undefined : { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as any } } }}
 className="mt-6 max-w-xl text-base font-light leading-relaxed opacity-70 md:text-lg"
 >
 {hero.description}
 </motion.p>

 <motion.div
 variants={reduced ? undefined : { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}
 className="mt-8 flex flex-wrap gap-3"
 >
 <a
 href="#"
 className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
 style={{ background: hero.colors.primary, color: bgColor === "#FDFBF7" ? "#fff" : bgColor === "#000" ? "#000" : hero.colors.bg === "#FDFBF7" ? "#2D3E35" : "#000" }}
 >
 {hero.ctas[0]} →
 </a>
 {hero.ctas[1] && (
 <a
 href="#"
 className="inline-flex items-center gap-2 rounded-full border bg-white/5 px-7 py-3.5 text-sm font-medium backdrop-blur transition hover:bg-white/10"
 style={{ borderColor: "rgba(255,255,255,0.15)" }}
 >
 {hero.ctas[1]}
 </a>
 )}
 </motion.div>

 </motion.div>
 </section>
 );
}
