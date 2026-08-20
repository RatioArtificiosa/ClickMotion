"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import lottie, { type AnimationItem } from "lottie-web";
import { scrambleChars, splitToChars } from "../lib/scramble";
import { DopamineLogo } from "../components/DopamineLogo";

gsap.registerPlugin(ScrollTrigger);

const SHOP_NAV = [
  { label: "Shop all", href: "#" },
  { label: "Categories", href: "#" },
  { label: "who we are", href: "#" },
  { label: "campaign", href: "#" },
  { label: "contact", href: "#" },
  { label: "collections", href: "#" },
  { label: "sale", href: "#" },
  { label: "5-ht", href: "#", disable: true },
];

const LEGAL_NAV = [
  { label: "Return", href: "#" },
  { label: "Impressum", href: "#" },
  { label: "Shipping and Payment", href: "#" },
  { label: "FAQ", href: "#" },
];

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function useLottieFrameAnim() {
  const raf = useRef(0);
  const gen = useRef(0);
  const kill = () => {
    gen.current += 1;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = 0;
  };
  const animate = (
    anim: AnimationItem | null,
    fromNorm: number,
    toNorm: number,
    duration = 0.6,
  ) => {
    if (!anim) return { kill };
    const total = anim.totalFrames || 0;
    if (total < 2) return { kill };
    const from = clamp(Math.round(fromNorm * (total - 1)), 0, total - 1);
    const to = clamp(Math.round(toNorm * (total - 1)), 0, total - 1);
    if (from === to) {
      anim.goToAndStop(to, true);
      return { kill };
    }
    kill();
    const g = gen.current;
    const start = performance.now();
    const ms = Math.max(0.001, duration) * 1000;
    anim.goToAndStop(from, true);
    const tick = (now: number) => {
      if (g !== gen.current) return;
      const u = clamp((now - start) / ms, 0, 1);
      const e = easeOutCubic(u);
      const frame = Math.round(from + (to - from) * e);
      anim.goToAndStop(frame, true);
      if (u < 1) raf.current = requestAnimationFrame(tick);
      else raf.current = 0;
    };
    raf.current = requestAnimationFrame(tick);
    return { kill };
  };
  return { animate, kill };
}

export function SiteFooter() {
  const rootRef = useRef<HTMLElement>(null);
  const discountRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const imgRef = useRef<HTMLPictureElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const lottieApi = useLottieFrameAnim();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Split text for scramble (still readable if motion is reduced)
    const splitTargets = root.querySelectorAll("[data-split]");
    splitTargets.forEach((el) => splitToChars(el as HTMLElement));

    const canHover =
      typeof window !== "undefined" &&
      window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

    let anim: AnimationItem | null = null;
    let loaded = false;
    let loadPromise: Promise<void> | null = null;
    let playedOnce = false;

    const ensureLottie = () => {
      if (!discountRef.current || anim) return;
      // Prefer loading into a dedicated host so the hit button stays on top
      let host = discountRef.current.querySelector(
        ".footer__discount-lottie",
      ) as HTMLElement | null;
      if (!host) {
        host = document.createElement("div");
        host.className = "footer__discount-lottie";
        host.style.cssText =
          "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1";
        discountRef.current.insertBefore(host, discountRef.current.firstChild);
      }
      anim = lottie.loadAnimation({
        container: host,
        renderer: "canvas",
        loop: false,
        autoplay: false,
        path: "/assets/lottie/FOOTER_LOTTIE_v1.json",
        rendererSettings: {
          clearCanvas: true,
          progressiveLoad: true,
          preserveAspectRatio: "xMidYMid meet",
        },
      });
      anim.setSubframe?.(false);
    };

    const waitLoad = () => {
      ensureLottie();
      if (!anim) return Promise.reject();
      if (loadPromise) return loadPromise;
      loadPromise = new Promise<void>((resolve) => {
        if (loaded) {
          resolve();
          return;
        }
        let done = false;
        const finish = () => {
          if (done) return;
          if ((anim?.totalFrames || 0) <= 1) return;
          done = true;
          loaded = true;
          anim?.goToAndStop(0, true);
          resolve();
        };
        anim!.addEventListener("DOMLoaded", finish);
        anim!.addEventListener("data_ready", finish);
        gsap.delayedCall(0.2, finish);
        gsap.delayedCall(0.5, finish);
        gsap.delayedCall(1.2, finish);
        finish();
      });
      return loadPromise;
    };

    // Prefetch lottie so enter is snappy
    ensureLottie();
    void waitLoad().catch(() => {});

    const progressOf = (a: AnimationItem) => {
      const o = a.totalFrames || 1;
      const c = typeof a.currentFrame === "number" ? a.currentFrame : 0;
      return o > 1 ? c / (o - 1) : 0;
    };

    // Reduced motion: settled composition, no entrance thrash / scramble
    if (reduceMotion) {
      const logo = logoRef.current;
      const img = imgRef.current;
      const form = formRef.current;
      const title = titleRef.current;
      if (logo) gsap.set(logo, { yPercent: 0 });
      if (img) gsap.set(img, { yPercent: 0 });
      if (form) gsap.set(form, { opacity: 1 });
      if (title) gsap.set(title, { scaleY: 1, transformOrigin: "50% 100%" });
      void waitLoad()
        .then(() => {
          if (anim) anim.goToAndStop(anim.totalFrames > 1 ? anim.totalFrames - 1 : 0, true);
        })
        .catch(() => {});
      return () => {
        lottieApi.kill();
        anim?.destroy();
      };
    }

    const playEnter = async () => {
      if (playedOnce) return;
      playedOnce = true;
      try {
        await waitLoad();
      } catch {
        return;
      }
      if (!anim) return;
      if (!canHover) {
        lottieApi.animate(anim, 0, 1, 0.9);
        return;
      }
      lottieApi.animate(anim, 0, 0.5, 0.9);
    };

    const onEnterLottie = async () => {
      try {
        await waitLoad();
      } catch {
        return;
      }
      if (!anim) return;
      lottieApi.animate(anim, progressOf(anim), 1, 0.6);
    };
    const onLeaveLottie = async () => {
      try {
        await waitLoad();
      } catch {
        return;
      }
      if (!anim) return;
      lottieApi.animate(anim, progressOf(anim), 0.5, 0.6);
    };

    const btn = discountRef.current?.querySelector("button");
    if (btn && canHover) {
      btn.addEventListener("mouseenter", onEnterLottie);
      btn.addEventListener("mouseleave", onLeaveLottie);
    }

    const logo = logoRef.current;
    const img = imgRef.current;
    const form = formRef.current;
    const title = titleRef.current;
    const navLinks = root.querySelectorAll(".footer__nav li a");
    const bottomChildren = bottomRef.current
      ? Array.from(bottomRef.current.children)
      : [];

    if (logo) gsap.set(logo, { yPercent: 300 });
    if (img) gsap.set(img, { yPercent: 100 });
    if (form) gsap.set(form, { opacity: 0 });
    if (title) gsap.set(title, { scaleY: 0, transformOrigin: "50% 100%" });

    const master = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 80%",
        once: true,
      },
    });

    if (logo)
      master.to(logo, { yPercent: 0, duration: 1.2, ease: "power3.out" }, 0);
    if (img)
      master.to(img, { yPercent: 0, duration: 1.2, ease: "power3.out" }, 0);
    master.call(() => {
      void playEnter();
    }, undefined, 0);
    if (form)
      master.to(form, { opacity: 1, duration: 2, ease: "power2.out" }, 0);
    if (title)
      master.to(title, { scaleY: 1, duration: 0.8, ease: "power3.out" }, 0.4);

    const navTl = gsap.timeline();
    navLinks.forEach((link, i) => {
      const chars = link.querySelectorAll(".char");
      if (!chars.length) return;
      const c = scrambleChars(chars, {
        durationPerChar: 0.18,
        stagger: 0.04,
        paused: false,
      });
      navTl.add(c, i * 0.04);
    });
    master.add(navTl, 0);

    const bottomTl = gsap.timeline();
    bottomChildren.forEach((child, i) => {
      const chars = child.querySelectorAll(".char");
      if (!chars.length) return;
      const c = scrambleChars(chars, {
        durationPerChar: 0.18,
        stagger: 0.04,
        paused: false,
      });
      bottomTl.add(c, i * 0.04);
    });
    master.add(bottomTl, 0.5);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      master.kill();
      lottieApi.kill();
      if (btn && canHover) {
        btn.removeEventListener("mouseenter", onEnterLottie);
        btn.removeEventListener("mouseleave", onLeaveLottie);
      }
      anim?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    const input = form?.querySelector(
      'input[name="email"]',
    ) as HTMLInputElement | null;
    if (!input || !input.checkValidity()) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
    setSubmitted(true);
  };

  return (
    <footer className="footer" ref={rootRef}>
      <picture className="footer__bg">
        <source
          media="(min-width: 1024px)"
          srcSet="/assets/footer/footer_bg_desk-scaled.webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/assets/footer/footer_bg_tablet.webp"
        />
        <img src="/assets/footer/footer_bg_mob.webp" alt="" />
      </picture>

      <picture className="footer__img" ref={imgRef}>
        <img src="/assets/footer/Woman1.png" alt="" />
      </picture>

      <div
        className="footer__discount"
        ref={discountRef}
        data-lottie="/assets/lottie/FOOTER_LOTTIE_v1.json"
      >
        <button type="button" aria-label="Discount animation" />
      </div>

      <div className="dop-container">
        <div className="footer__top">
          <ul className="footer__nav">
            {SHOP_NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={item.disable ? "disable" : ""}
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="hover-lottie" aria-hidden />
                  <span data-split>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <ul className="footer__nav">
            {LEGAL_NAV.map((item) => (
              <li key={item.label}>
                <a href={item.href} onClick={(e) => e.preventDefault()}>
                  <span className="hover-lottie" aria-hidden />
                  <span data-split>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__mid">
          <a
            href="#"
            className="footer__logo"
            ref={logoRef}
            onClick={(e) => e.preventDefault()}
            aria-label="Dopamine home"
          >
            <DopamineLogo />
          </a>
          <p className="footer__title" ref={titleRef}>
            Subscribe{" "}
            <span>
              <strong>(</strong>latest news<strong>)</strong>
            </span>
          </p>

          <form
            className="footer__form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
          >
            <label className="footer__label input">
              <span className="input__label">
                {submitted ? "You're in" : "Email"}
              </span>
              <span
                className="input__error"
                style={{ display: emailError ? "block" : "none" }}
              >
                Invalid email, please enter a valid one
              </span>
              <input
                type="email"
                name="email"
                placeholder="."
                required
                autoComplete="email"
                onInput={() => emailError && setEmailError(false)}
              />
            </label>
            <button type="submit" className="footer__submit">
              <span className="hover-lottie" aria-hidden />
              <span className="submit-label">Subscribe</span>
            </button>
          </form>
        </div>

        <div className="footer__bottom" ref={bottomRef}>
          <p data-split>©2026_DOPAMINE</p>
          <a href="#" onClick={(e) => e.preventDefault()}>
            <span className="hover-lottie" aria-hidden />
            <span data-split>PRIVACY POLICY (DSGVO)</span>
          </a>
          <button
            type="button"
            className="footer__dev"
            onClick={() => setCreditsOpen(true)}
          >
            <span className="hover-lottie" aria-hidden />
            <span data-split>Credits</span>
          </button>
          <span className="footer__bottom-item">
            <span className="hover-lottie" aria-hidden />
            <span data-split>IG</span>
          </span>
        </div>
      </div>

      <div
        className={`footer__credits-panel${creditsOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Credits"
        aria-hidden={!creditsOpen}
        inert={!creditsOpen ? true : undefined}
      >
        <div className="footer__credits-inner">
          <h3>Credits</h3>
          <p>
            Brand{" "}
            <span className="footer__credit-name">DOPAMINE</span>
          </p>
          <p>
            Footer{" "}
            <span className="footer__credit-name">motion system</span>
          </p>
          <p>A couture close · restage for your brand</p>
          <button
            type="button"
            className="footer__credits-close"
            onClick={() => setCreditsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </footer>
  );
}
