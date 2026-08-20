import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Source CustomEase "0.75,0,0.25,1" ≈ power2/power3 blend (open GSAP) */
const MOTION_EASE = "power3.out";

const MASK_RANGES = {
  mobile: { from: 90, to: 1000 },
  tablet: { from: 60, to: 500 },
  desktop: { from: 30, to: 440 },
} as const;

const MASK_ASPECT = 254 / 343;

function rangeForWidth(w: number) {
  if (w < 768) return MASK_RANGES.mobile;
  if (w < 1024) return MASK_RANGES.tablet;
  return MASK_RANGES.desktop;
}

type Props = {
  /** When true, pin endTrigger is external footer; when false uses internal spacer */
  coupleWithFooter?: boolean;
};

export function FilmMotion({ coupleWithFooter = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const pin = pinRef.current;
    const bottom = bottomRef.current;
    const video = videoRef.current;
    const cursor = cursorRef.current;
    const tip = tipRef.current;
    if (!root || !pin || !bottom) return;

    const easeName = MOTION_EASE;

    // ── Intro scaleY reveals (Ue) ──
    const subtitle = root.querySelector(".motion-section__subtitle");
    const title = root.querySelector(".motion-section__title");
    const icons = root.querySelector(".motion-section__icons");
    const textEl = root.querySelector(".motion-section__text") as HTMLElement | null;

    const intro = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 75%",
        once: true,
      },
    });
    gsap.set([subtitle, title, icons, textEl], {
      scaleY: 0,
      transformOrigin: "bottom center",
    });
    intro
      .to(subtitle, { scaleY: 1, duration: 0.7, ease: easeName }, 0)
      .to(textEl, { scaleY: 1, duration: 0.7, ease: easeName }, 0.06)
      .to(title, { scaleY: 1, duration: 0.7, ease: easeName }, 0)
      .to(icons, { scaleY: 1, duration: 0.7, ease: easeName }, 0);

    // ── Pin + mask (Ge) ──
    const endTrigger =
      coupleWithFooter
        ? (document.querySelector(".footer") as HTMLElement | null)
        : spacerRef.current;

    let maskW = rangeForWidth(window.innerWidth).from;
    const setMask = (progress: number) => {
      const { from, to } = rangeForWidth(window.innerWidth);
      maskW = from + (to - from) * progress;
      bottom.style.setProperty("--maskW", `${maskW}%`);
    };
    setMask(0);

    const prepareVideo = () => {
      if (!video) return;
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      try {
        video.load();
      } catch {
        /* ignore */
      }
    };
    const playVideo = () => {
      if (!video) return;
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    const pauseVideo = () => {
      if (!video) return;
      try {
        video.pause();
      } catch {
        /* ignore */
      }
    };

    const triggers: ScrollTrigger[] = [];

    if (endTrigger) {
      triggers.push(
        ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          endTrigger,
          end: "bottom bottom",
          pin: pin,
          pinSpacing: false,
        }),
      );
      triggers.push(
        ScrollTrigger.create({
          trigger: pin,
          start: "top top",
          endTrigger,
          end: "bottom bottom",
          onUpdate: (self) => {
            pinProgress = self.progress;
            setMask(self.progress);
            // Fade tip as mask opens
            if (tip) {
              const o = Math.max(0, 1 - self.progress / 0.22);
              tip.style.opacity = String(o);
            }
          },
        }),
      );

      if (video) {
        gsap.set(video, { scale: 1.2, transformOrigin: "50% 50%" });
        triggers.push(
          ScrollTrigger.create({
            trigger: pin,
            start: "top top",
            endTrigger,
            end: "bottom bottom",
            onUpdate: (self) => {
              const v = Math.max(0, Math.min(1, self.progress / 0.3));
              const b = 1.2 + (1 - 1.2) * v;
              gsap.set(video, { scale: b });
            },
          }),
        );
        let playing = false;
        triggers.push(
          ScrollTrigger.create({
            trigger: pin,
            start: "top 90%",
            onEnter: () => {
              prepareVideo();
              playVideo();
              playing = true;
            },
            onLeaveBack: () => {
              if (playing) {
                pauseVideo();
                playing = false;
              }
            },
          }),
        );
      }
    }

    // ── Discover cursor ──
    let halfW = 0;
    let halfH = 0;
    const measureCursor = () => {
      if (!cursor) return;
      const a = cursor.getBoundingClientRect();
      halfW = a.width / 2;
      halfH = a.height / 2;
    };
    const inMask = (cx: number, cy: number) => {
      const E = bottom.getBoundingClientRect();
      const D = cx - E.left;
      const I = cy - E.top;
      const C = E.width * (maskW / 100);
      const X = C * MASK_ASPECT;
      const H = (E.width - C) / 2;
      const J = (E.height - X) / 2;
      return D >= H && D <= H + C && I >= J && I <= J + X;
    };
    const moveCursor = (cx: number, cy: number) => {
      if (!cursor) return;
      const E = bottom.getBoundingClientRect();
      cursor.style.transform = `translate3d(${cx - E.left - halfW}px, ${cy - E.top - halfH}px, 0)`;
    };
    const show = () => {
      cursor?.classList.add("visible");
      bottom.style.cursor = "none";
    };
    const hide = () => {
      cursor?.classList.remove("visible");
      bottom.style.cursor = "";
    };

    const onEnter = (e: MouseEvent) => {
      measureCursor();
      moveCursor(e.clientX, e.clientY);
      if (inMask(e.clientX, e.clientY)) show();
      else hide();
    };
    const onMove = (e: MouseEvent) => {
      moveCursor(e.clientX, e.clientY);
      if (inMask(e.clientX, e.clientY)) show();
      else hide();
    };
    const onLeave = () => hide();
    let pinProgress = 0;
    const onResize = () => {
      measureCursor();
      setMask(pinProgress);
    };

    bottom.addEventListener("mouseenter", onEnter);
    bottom.addEventListener("mousemove", onMove);
    bottom.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    // Autoplay attempt once
    prepareVideo();
    playVideo();

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      bottom.removeEventListener("mouseenter", onEnter);
      bottom.removeEventListener("mousemove", onMove);
      bottom.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      intro.kill();
      triggers.forEach((t) => t.kill());
    };
  }, [coupleWithFooter]);

  return (
    <>
      <section className="motion-section" ref={rootRef}>
        <div className="dop-container">
          <div className="motion-section__header">
            <h2 className="motion-section__title">07. dopamine film</h2>
            <p className="motion-section__subtitle">
              A Vision in Motion
              <img src="/assets/film/dot_icon.webp" alt="" />
            </p>
            <div className="motion-section__icons">
              <img src="/assets/film/bold_icon_1.svg" alt="" />
              <img src="/assets/film/bold_icon_2.svg" alt="" />
            </div>
            <p className="motion-section__text">
              Experience the essence of <strong>Dopamine</strong> through film.
              Our <strong>cinematic</strong> journey brings to life the bold,
              artistic spirit behind each collection. <strong>Watch</strong> as
              our designs move, <strong>inspire,</strong> and tell stories of
              individuality, strength, and rebellion.
            </p>
          </div>
        </div>

        <div className="motion-section__pin" ref={pinRef}>
          <a href="#campaign" onClick={(e) => e.preventDefault()}>
            <div className="motion-section__bottom" ref={bottomRef}>
              <div className="motion-section__cursor" ref={cursorRef}>
                <div>
                  <strong>[ </strong>
                  DISCOVER
                  <strong> ]</strong>
                </div>
              </div>
              <video
                ref={videoRef}
                className="motion-section__video"
                loop
                muted
                playsInline
                autoPlay
                poster="/assets/film/motion_poster.webp"
                preload="auto"
              >
                <source src="/assets/film/StrangeSurreal.mp4" type="video/mp4" />
              </video>
            </div>
          </a>
          <p className="motion-section__scroll" ref={tipRef}>
            <strong>tip:</strong> scroll to dive
          </p>
        </div>
      </section>
      {!coupleWithFooter && (
        <div
          ref={spacerRef}
          className="film-pin-spacer"
          style={{ height: "180vh", background: "#fff9f7" }}
          aria-hidden
        />
      )}
    </>
  );
}
