import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type CarouselApi = {
  index: number;
  previous: () => void;
  next: () => void;
  goTo: (i: number) => void;
  changed: {
    connect: (cb: (e: { index: number; previous: number }) => void) => void;
  };
};

const $ = <T extends Element = HTMLElement>(
  selector: string,
  parent: ParentNode = document,
) => parent.querySelector(selector) as T | null;

const $$ = <T extends Element = HTMLElement>(
  selector: string,
  parent: ParentNode = document,
) => Array.from(parent.querySelectorAll(selector)) as T[];

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const debounce = <T extends (...args: never[]) => void>(fn: T, ms = 150) => {
  let t: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => {
      fn(...args);
      t = null;
    }, ms);
  };
};

const bp = {
  mobile: window.matchMedia("(max-width: 991px)"),
};

const isMobile = () => bp.mobile.matches;
const isDesktop = () => !isMobile();

const createLinesMask = (
  el: Element,
  options: { stagger?: number; duration?: number; ease?: string } = {},
) => {
  const { stagger = 0.08, duration = 0.7, ease = "power3.out" } = options;
  const split = new SplitText(el, {
    type: "lines",
    mask: "lines",
    linesClass: "line",
  });
  gsap.set(split.lines, { yPercent: 110 });
  return {
    in: ({ delay = 0 } = {}) =>
      gsap.to(split.lines, {
        yPercent: 0,
        duration,
        ease,
        stagger,
        delay,
        overwrite: true,
      }),
    out: ({ delay = 0 } = {}) =>
      gsap.to(split.lines, {
        yPercent: -110,
        duration,
        ease,
        stagger,
        delay,
        overwrite: true,
      }),
    revert: () => split.revert(),
  };
};

const createCharsMask = (
  el: Element,
  options: { stagger?: number; duration?: number; ease?: string } = {},
) => {
  const { stagger = 0.01, duration = 0.6, ease = "power3.out" } = options;
  const split = new SplitText(el, {
    type: "lines,chars",
    mask: "lines",
    linesClass: "line",
  });
  gsap.set(split.chars, { yPercent: 110 });
  return {
    in: ({ delay = 0 } = {}) =>
      gsap.to(split.chars, {
        yPercent: 0,
        duration,
        ease,
        stagger,
        delay,
        overwrite: true,
      }),
    out: ({ delay = 0 } = {}) =>
      gsap.to(split.chars, {
        yPercent: -110,
        duration,
        ease,
        stagger,
        delay,
        overwrite: true,
      }),
    revert: () => split.revert(),
  };
};

export async function initHud() {
  const carousel = (window as unknown as { carousel?: CarouselApi }).carousel;
  const cleanups: Array<() => void> = [];

  document.body.style.setProperty("--loader-reveal", "0vh");
  if (document.fonts?.ready) await document.fonts.ready;

  const initCarouselText = () => {
    const slides = $$(".carousel_slide");
    const descs = $$(".carousel_desc");
    const titles = $$(".carousel_title-b");
    if (!slides.length || !carousel) return null;

    const createMultiReveal = (
      container: Element,
      selector: string,
      factory: (el: Element) => ReturnType<typeof createCharsMask>,
    ) => {
      const els = $$(selector, container);
      if (!els.length) return null;
      const instances = els.map((el) => factory(el));
      return {
        in: (opts?: { delay?: number }) =>
          instances.forEach((a) => a.in(opts)),
        out: (opts?: { delay?: number }) =>
          instances.forEach((a) => a.out(opts)),
      };
    };

    const descReveals = descs.map((desc) => {
      const lines = createMultiReveal(desc, '[data-anim="lines-mask"]', (el) =>
        createLinesMask(el),
      );
      const chars = createMultiReveal(desc, '[data-anim="chars-mask"]', (el) =>
        createCharsMask(el),
      );
      return {
        in: (opts?: { delay?: number }) => {
          lines?.in(opts);
          chars?.in(opts);
        },
        out: (opts?: { delay?: number }) => {
          lines?.out(opts);
          chars?.out(opts);
        },
      };
    });

    const titleReveals = titles.map((title) =>
      createMultiReveal(title, '[data-anim="chars-mask"]', (el) =>
        createCharsMask(el),
      ),
    );
    const slideReveals = slides.map((slide) =>
      createMultiReveal(slide, '[data-anim="chars-mask"]', (el) =>
        createCharsMask(el),
      ),
    );

    const fade = (els: Element[], activeIndex: number) => {
      els.forEach((el, i) => {
        gsap.to(el, {
          autoAlpha: i === activeIndex ? 1 : 0,
          duration: 0.5,
          ease: "power2.inOut",
          overwrite: true,
        });
      });
    };

    slides.forEach((el, i) =>
      gsap.set(el, { autoAlpha: i === carousel.index ? 1 : 0 }),
    );
    descs.forEach((el, i) =>
      gsap.set(el, { autoAlpha: i === carousel.index ? 1 : 0 }),
    );
    titles.forEach((el, i) =>
      gsap.set(el, { autoAlpha: i === carousel.index ? 1 : 0 }),
    );

    carousel.changed.connect(({ index, previous }) => {
      fade(slides, index);
      fade(descs, index);
      fade(titles, index);
      descReveals[previous]?.out();
      descReveals[index]?.in({ delay: 0.3 });
      titleReveals[previous]?.out();
      titleReveals[index]?.in({ delay: 0.3 });
      slideReveals[previous]?.out();
      slideReveals[index]?.in({ delay: 0.3 });
    });

    slideReveals[carousel.index]?.in({ delay: 0.3 });

    const api = {
      inActive: (opts?: { delay?: number }) => {
        descReveals[carousel.index]?.in(opts);
        titleReveals[carousel.index]?.in(opts);
      },
      outActive: (opts?: { delay?: number }) => {
        descReveals[carousel.index]?.out(opts);
        titleReveals[carousel.index]?.out(opts);
      },
    };
    (window as unknown as { carouselText?: typeof api }).carouselText = api;
    return api;
  };

  const initCarouselNav = () => {
    if (!carousel) return;
    const prev = $(".carousel_arrow.is-prev");
    const next = $(".carousel_arrow.is-next");
    prev?.addEventListener("click", () => carousel.previous());
    next?.addEventListener("click", () => carousel.next());
  };

  const initCarouselPagination = () => {
    const container = $(".carousel_pagination");
    if (!container || !carousel) return;
    const svg = $("svg", container);
    const dot = $(".carousel_pagination-dot", container);
    const slides = $$(".carousel_slide");
    const count = slides.length;
    if (!count || !svg || !dot) return;

    const viewBoxWidth = 1000;
    const padding = 20;
    const usable = viewBoxWidth - padding * 2;
    const indexToX = (i: number) =>
      padding + (usable / Math.max(count - 1, 1)) * i;
    const xToIndex = (x: number) =>
      Math.round(((x - padding) / usable) * (count - 1));

    gsap.set(dot, {
      attr: { cx: indexToX(carousel.index) },
      transformBox: "fill-box",
      transformOrigin: "50% 50%",
      x: 0,
    });

    let dotTl: gsap.core.Timeline | null = null;
    carousel.changed.connect(({ index, previous }) => {
      const delta = index - previous;
      const isWrap = Math.abs(delta) > count / 2;
      if (dotTl) dotTl.kill();
      gsap.killTweensOf(dot);
      if (isWrap) {
        const exitRight = previous > index;
        const slide = 150;
        const exitX = exitRight ? slide : -slide;
        const enterX = exitRight ? -slide : slide;
        dotTl = gsap.timeline();
        dotTl
          .to(dot, { x: exitX, scale: 0, duration: 0.3, ease: "power2.in" })
          .set(dot, { attr: { cx: indexToX(index) }, x: enterX })
          .to(dot, { x: 0, scale: 1, duration: 0.45, ease: "power3.out" });
      } else {
        dotTl = gsap.timeline();
        dotTl.to(dot, {
          attr: { cx: indexToX(index) },
          scale: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    });

    const getXFromEvent = (e: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      const ratio = (e.clientX - rect.left) / rect.width;
      return clamp(ratio * viewBoxWidth, padding, viewBoxWidth - padding);
    };

    let dragging = false;
    const updateFromPointer = (e: PointerEvent) => {
      const targetIndex = clamp(xToIndex(getXFromEvent(e)), 0, count - 1);
      if (targetIndex !== carousel.index) carousel.goTo(targetIndex);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      container.setPointerCapture(e.pointerId);
      updateFromPointer(e);
    };
    const onMove = (e: PointerEvent) => {
      if (dragging) updateFromPointer(e);
    };
    const onUp = () => {
      dragging = false;
    };
    container.addEventListener("pointerdown", onDown);
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerup", onUp);
    container.addEventListener("pointercancel", onUp);
    cleanups.push(() => {
      container.removeEventListener("pointerdown", onDown);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerup", onUp);
      container.removeEventListener("pointercancel", onUp);
    });
  };

  const initGammeGradient = () => {
    const gradient = $(".gamme_gradient");
    if (!gradient || !carousel) return;
    const slides = $$(".carousel_slide");
    if (!slides.length) return;
    const step = 360 / slides.length;
    let current = 0;
    gsap.set(gradient, { rotation: 0 });
    carousel.changed.connect(({ index, previous }) => {
      let delta = index - previous;
      if (delta > slides.length / 2) delta -= slides.length;
      if (delta < -slides.length / 2) delta += slides.length;
      current -= delta * step;
      gsap.to(gradient, {
        rotation: current,
        duration: 0.8,
        ease: "power2.inOut",
        overwrite: true,
      });
    });
  };

  const initCarouselColors = () => {
    const slides = $$<HTMLElement>(".carousel_slide");
    if (!slides.length || !carousel) return;
    const root = document.documentElement;
    const applyColors = (slide?: HTMLElement) => {
      if (!slide) return;
      const primary = slide.dataset.tastePrimary;
      const secondary = slide.dataset.tasteSecondary;
      if (primary)
        root.style.setProperty("--color-scheme-1--taste-primary", primary);
      if (secondary)
        root.style.setProperty("--color-scheme-1--taste-secondary", secondary);
    };
    applyColors(slides[carousel.index]);
    const apply = debounce((index: number) => applyColors(slides[index]), 150);
    carousel.changed.connect(({ index }) => apply(index));
  };

  const initCarouselArrowsHover = () => {
    if (!isDesktop()) return;
    $$(".carousel_arrow").forEach((arrow) => {
      const shapes = $$("svg path, svg rect", arrow);
      if (!shapes.length) return;
      gsap.set(shapes, { transformOrigin: "50% 50%" });
      let tl: gsap.core.Timeline | null = null;
      arrow.addEventListener("mouseenter", () => {
        if (tl) tl.kill();
        gsap.set(shapes, { scale: 1 });
        tl = gsap.timeline({ repeat: -1 });
        tl.to(shapes, {
          scale: 0.5,
          duration: 0.4,
          ease: "power2.inOut",
          stagger: { each: 0.08, from: "start" },
        }).to(shapes, {
          scale: 1,
          duration: 0.4,
          ease: "power2.inOut",
          stagger: { each: 0.08, from: "start" },
        });
      });
      arrow.addEventListener("mouseleave", () => {
        if (tl) tl.kill();
        tl = null;
        gsap.to(shapes, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      });
    });
  };

  const initSoundToggle = () => {
    const sound = $(".navbar_sound");
    if (!sound) return;
    const label = $("div:first-child", sound);
    const bars = $$("svg rect", sound);
    let isMuted = false;
    let playing = false;

    const animateBar = (bar: Element) => {
      if (!playing) return;
      const h = gsap.utils.random(2, 8, 0.1);
      gsap.to(bar, {
        attr: { height: h, y: (8 - h) / 2 },
        duration: gsap.utils.random(0.2, 0.5),
        ease: "power1.inOut",
        onComplete: () => animateBar(bar),
      });
    };
    const start = () => {
      playing = true;
      bars.forEach(animateBar);
    };
    const stop = () => {
      playing = false;
      gsap.killTweensOf(bars);
      gsap.to(bars, { attr: { height: 2, y: 3 }, duration: 0.3, ease: "power2.out" });
    };
    sound.addEventListener("click", () => {
      isMuted = !isMuted;
      sound.classList.toggle("is-muted", isMuted);
      if (label) label.textContent = isMuted ? "OFF" : "ON";
      isMuted ? stop() : start();
    });
    start();
  };

  const initMenuButton = () => {
    if (!isDesktop()) return;
    const button = $(".navbar_menu-button");
    if (!button) return;
    const circles = $$("svg circle", button);
    if (!circles.length) return;
    gsap.set(circles, { transformOrigin: "50% 50%" });
    let tl: gsap.core.Timeline | null = null;
    button.addEventListener("mouseenter", () => {
      if (tl) tl.kill();
      gsap.set(circles, { scale: 1 });
      tl = gsap.timeline({ repeat: -1 });
      tl.to(circles, {
        scale: 0.5,
        duration: 0.4,
        ease: "power2.inOut",
        stagger: { each: 0.1, from: "start" },
      }).to(circles, {
        scale: 1,
        duration: 0.4,
        ease: "power2.inOut",
        stagger: { each: 0.1, from: "start" },
      });
    });
    button.addEventListener("mouseleave", () => {
      if (tl) tl.kill();
      tl = null;
      gsap.to(circles, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: true,
      });
    });
  };

  const initMenuToggle = () => {
    const button = $(".navbar_menu-button");
    const menu = $(".navbar_menu");
    if (!button || !menu) return;
    const links = $$(".navbar_link", menu);
    const middle = $(".navbar_middle", menu);
    const bottom = $(".navbar_bottom", menu);
    const mobileExtras = [middle, bottom].filter(Boolean) as HTMLElement[];
    const linkReveals = links.map((link) =>
      createLinesMask(link, { duration: 0.6, stagger: 0.05 }),
    );

    let isOpen = false;
    let animating = false;
    const getOpenHeight = () => (isMobile() ? "100svh" : "auto");
    gsap.set(menu, { height: 0, opacity: 0, display: "none", overflow: "hidden" });
    gsap.set(mobileExtras, { autoAlpha: 0, y: 30 });

    const open = () => {
      if (animating || isOpen) return;
      animating = true;
      isOpen = true;
      button.classList.add("is-open");
      const mobile = isMobile();
      gsap.set(menu, { display: "flex" });
      gsap.to(menu, {
        height: getOpenHeight(),
        opacity: 1,
        duration: mobile ? 0.8 : 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          animating = false;
        },
      });
      linkReveals.forEach((reveal, i) => {
        reveal.in({ delay: (mobile ? 0.45 : 0.3) + i * (mobile ? 0.1 : 0.06) });
      });
    };

    const close = () => {
      if (animating || !isOpen) return;
      animating = true;
      isOpen = false;
      button.classList.remove("is-open");
      linkReveals.forEach((reveal, i) => reveal.out({ delay: i * 0.05 }));
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: isMobile() ? 0.7 : 0.5,
        ease: "power3.inOut",
        delay: isMobile() ? 0.45 : 0.3,
        onComplete: () => {
          gsap.set(menu, { display: "none" });
          animating = false;
        },
      });
    };

    button.addEventListener("click", () => (isOpen ? close() : open()));
    document.addEventListener("click", (e) => {
      if (!isOpen || isMobile()) return;
      const t = e.target as Node;
      if (menu.contains(t) || button.contains(t)) return;
      close();
    });
    links.forEach((link) => {
      link.addEventListener("click", () => {
        if (isOpen) close();
      });
    });
  };

  const initScrollIcon = () => {
    $$(".icon-scroll_wrapper").forEach((wrapper) => {
      const arrows = $$("svg > g", wrapper);
      if (arrows.length !== 3) return;
      const [first, middle, last] = arrows;
      gsap.set([first, middle, last], {
        opacity: 0,
        scale: 0,
        transformOrigin: "50% 50%",
      });
      gsap.set(first, { y: 100 });
      gsap.set(last, { y: -100 });
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });
      tl.to(first, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" })
        .to(middle, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .to(last, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .to(
          [first, middle, last],
          { opacity: 0, duration: 0.4, ease: "power2.in", stagger: 0.25 },
          "+=0.3",
        );
    });
  };

  const initSectionGamme = () => {
    const section = $(".section.is-gamme");
    if (!section) return;
    const tl = gsap.timeline({
      defaults: { duration: 0.5, ease: "power2.inOut" },
      scrollTrigger: {
        trigger: section,
        start: "bottom bottom",
        toggleActions: "play none none reverse",
      },
    });
    tl.to(
      ".carousel_pagination, .icon-scroll_wrapper, .carousel_arrow.is-prev, .scroll_discover, .gamme_gradient-wrapper",
      { autoAlpha: 0 },
    );
    if (isDesktop()) {
      tl.to(".carousel_title-collection", { autoAlpha: 0 }, "<");
      tl.to(".carousel_nav", { maxWidth: "55%" }, "<");
    }
    if (isMobile()) {
      tl.to(".carousel_arrow.is-next", { autoAlpha: 0 }, "<");
      tl.to(".carousel_title-collection", { y: "-2.5rem" }, "<");
    }
  };

  const initSectionProfile = () => {
    const section = $(".section.is-profile");
    if (!section) return;
    const container = $(".profile_container", section);
    if (!container) return;
    const gammeContainer = $(".gamme_container");
    const titleBis = $(".carousel_title-bis-wrapper");
    gsap.set(container, { autoAlpha: 0 });
    gsap.set(titleBis, { autoAlpha: 0 });

    gsap
      .timeline({
        defaults: { duration: 0.5, ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom bottom",
          toggleActions: "play reverse play reverse",
          onEnter: () => {
            document.body.classList.add("is-profile-active");
            (
              window as unknown as {
                carouselText?: { inActive: (o?: { delay?: number }) => void };
              }
            ).carouselText?.inActive({ delay: 0 });
          },
          onEnterBack: () => {
            (
              window as unknown as {
                carouselText?: { inActive: (o?: { delay?: number }) => void };
              }
            ).carouselText?.inActive({ delay: 0 });
            if (gammeContainer)
              gsap.to(gammeContainer, {
                autoAlpha: 1,
                duration: 0.5,
                ease: "power2.inOut",
              });
          },
          onLeave: () => {
            (
              window as unknown as {
                carouselText?: { outActive: () => void };
              }
            ).carouselText?.outActive();
            if (gammeContainer)
              gsap.to(gammeContainer, {
                autoAlpha: 0,
                duration: 0.5,
                ease: "power2.inOut",
              });
          },
          onLeaveBack: () => {
            document.body.classList.remove("is-profile-active");
            (
              window as unknown as {
                carouselText?: { outActive: () => void };
              }
            ).carouselText?.outActive();
          },
        },
      })
      .fromTo(container, { autoAlpha: 0 }, { autoAlpha: 1 })
      .fromTo(titleBis, { autoAlpha: 0 }, { autoAlpha: 1 }, "<");
  };

  const initBenefitsNav = () => {
    const nav = $(".benefits_nav");
    const sections = $$(".section.is-benefits");
    const profileSection = $(".section.is-profile");
    if (!nav || !sections.length || !profileSection) return;

    const icons = $$(".benefits_icon-wrapper", nav);
    gsap.set(nav, { autoAlpha: 0 });

    gsap
      .timeline({
        defaults: { duration: 0.5, ease: "power2.inOut" },
        scrollTrigger: {
          trigger: profileSection,
          start: "top bottom",
          endTrigger: sections[sections.length - 1],
          end: "bottom bottom",
          toggleActions: "play reverse play reverse",
        },
      })
      .fromTo(nav, { autoAlpha: 0 }, { autoAlpha: 1 });

    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom bottom",
        onToggle: ({ isActive }) =>
          icons[i]?.classList.toggle("is-active", isActive),
      });
    });

    const lenis = (
      window as unknown as {
        lenis?: { scrollTo: (el: Element, o?: object) => void };
      }
    ).lenis;
    icons.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        e.preventDefault();
        const href = icon.getAttribute("href");
        if (!href) return;
        const target = $(href);
        if (target) lenis?.scrollTo(target, { duration: 1.1 });
      });
    });
  };

  const initAnimations = (parent: ParentNode) => {
    const els = $$("[data-anim]", parent);
    if (!els.length) return null;
    const instances = els
      .map((el) => {
        const type = (el as HTMLElement).dataset.anim;
        if (type === "lines-mask") return createLinesMask(el);
        if (type === "chars-mask") return createCharsMask(el);
        return null;
      })
      .filter(Boolean) as Array<ReturnType<typeof createLinesMask>>;
    if (!instances.length) return null;
    return {
      in: (opts?: { delay?: number }) =>
        instances.forEach((a) => a.in(opts)),
      out: (opts?: { delay?: number }) =>
        instances.forEach((a) => a.out(opts)),
    };
  };

  const initSectionBenefits = () => {
    const sections = $$(".section.is-benefits");
    if (!sections.length) return;
    sections.forEach((section) => {
      const container = $(".benefits_container", section);
      if (!container) return;
      const reveal = initAnimations(section);
      gsap
        .timeline({
          defaults: { duration: 0.5, ease: "power2.inOut" },
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom bottom",
            toggleActions: "play reverse play reverse",
            onEnter: () => {
              reveal?.in({ delay: 0.35 });
              gsap.fromTo(
                section,
                { "--benefits-line": 0 },
                {
                  "--benefits-line": 1,
                  duration: 0.8,
                  ease: "power3.out",
                  delay: 1,
                },
              );
            },
            onEnterBack: () => {
              reveal?.in({ delay: 0.35 });
              gsap.fromTo(
                section,
                { "--benefits-line": 0 },
                {
                  "--benefits-line": 1,
                  duration: 0.8,
                  ease: "power3.out",
                  delay: 1,
                },
              );
            },
            onLeave: () => reveal?.out(),
            onLeaveBack: () => reveal?.out(),
          },
        })
        .fromTo(container, { autoAlpha: 0 }, { autoAlpha: 1, delay: 0.35 });
    });
  };

  const initSectionArgument = () => {
    const section = $(".section.is-argument");
    if (!section) return;
    const svgShapes = $$(
      ".argument_svg svg path, .argument_svg svg polygon",
      section,
    );
    const svgBlur = $(".argument_svg-blur", section);
    gsap.set(svgShapes, {
      autoAlpha: 0,
      scale: 0.6,
      transformOrigin: "50% 50%",
    });
    if (svgBlur) gsap.set(svgBlur, { autoAlpha: 0 });

    const animateSvgIn = () => {
      gsap.to(svgShapes, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: 0.04,
        delay: 0.4,
        overwrite: true,
      });
      if (svgBlur) {
        gsap.to(svgBlur, {
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out",
          delay: 1,
          overwrite: true,
        });
      }
    };
    const animateSvgOut = () => {
      gsap.to(svgShapes, {
        autoAlpha: 0,
        scale: 0.6,
        duration: 0.4,
        ease: "power2.in",
        overwrite: true,
      });
      if (svgBlur) {
        gsap.to(svgBlur, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.in",
          overwrite: true,
        });
      }
    };

    gsap
      .timeline({
        defaults: { duration: 0.5, ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom bottom",
          toggleActions: "play reverse play reverse",
          onEnter: animateSvgIn,
          onEnterBack: animateSvgIn,
          onLeave: animateSvgOut,
          onLeaveBack: animateSvgOut,
        },
      })
      .fromTo(".argument_container", { autoAlpha: 0 }, { autoAlpha: 1 })
      .fromTo(".gradient_overlay", { autoAlpha: 1 }, { autoAlpha: 0 }, "<");
  };

  const initSectionFullGamme = () => {
    const section = $(".section.is-full-gamme");
    if (!section) return;
    gsap.timeline({
      defaults: { duration: 0.5, ease: "power2.inOut" },
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom bottom",
        toggleActions: "play reverse play reverse",
        onEnter: () => document.body.classList.remove("is-profile-active"),
        onLeaveBack: () => document.body.classList.add("is-profile-active"),
      },
    });
  };

  const initSectionFaq = () => {
    if (!isMobile()) return;
    const section = $(".section.is-faq");
    if (!section) return;
    gsap.fromTo(
      ".hud_container",
      { autoAlpha: 1 },
      {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        },
      },
    );
  };

  const initFaqAccordion = () => {
    $$(".faq_accordion").forEach((acc) => {
      const question = $(".faq_question", acc);
      const answer = $(".faq_answer", acc);
      if (!question || !answer) return;
      gsap.set(answer, { height: 0, overflow: "hidden" });
      let open = false;
      const toggle = () => {
        open = !open;
        acc.classList.toggle("is-open", open);
        question.setAttribute("aria-expanded", open ? "true" : "false");
        gsap.to(answer, {
          height: open ? "auto" : 0,
          duration: 0.45,
          ease: "power3.inOut",
          overwrite: true,
        });
      };
      question.setAttribute("aria-expanded", "false");
      question.addEventListener("click", toggle);
    });
  };

  const scrollToHash = (hash: string) => {
    if (!hash.startsWith("#")) return;
    const target = $(hash);
    const lenis = (
      window as unknown as {
        lenis?: { scrollTo: (el: Element, o?: object) => void };
      }
    ).lenis;
    if (target) lenis?.scrollTo(target, { duration: 1.2 });
  };

  const initInternalNav = () => {
    $$(".navbar_link").forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (!href?.startsWith("#")) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        scrollToHash(href);
      });
    });
    $$("[data-scroll-to]").forEach((el) => {
      el.addEventListener("click", () => {
        const hash = el.getAttribute("data-scroll-to");
        if (hash) scrollToHash(hash);
      });
    });
  };

  initCarouselText();
  initCarouselNav();
  initCarouselPagination();
  initGammeGradient();
  initCarouselColors();
  initCarouselArrowsHover();
  initSoundToggle();
  initMenuButton();
  initMenuToggle();
  initScrollIcon();
  initSectionGamme();
  initSectionProfile();
  initSectionBenefits();
  initBenefitsNav();
  initSectionArgument();
  initSectionFullGamme();
  initSectionFaq();
  initFaqAccordion();
  initInternalNav();
  ScrollTrigger.refresh();
  const lenis = (window as unknown as { lenis?: { scrollTo: (n: number, o?: object) => void } })
    .lenis;
  lenis?.scrollTo(0, { immediate: true });
  window.scrollTo(0, 0);
  document.body.classList.add("is-hud-ready");

  return () => {
    document.body.classList.remove("is-hud-ready");
    cleanups.forEach((fn) => fn());
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}
