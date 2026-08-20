import { useEffect } from "react";
import { BENEFITS } from "../../data/copy";
import { FLAVORS } from "../../data/flavors";
import { ArgumentMark } from "./ArgumentMark";
import { BenefitsCopy } from "./BenefitsCopy";
import { BenefitsNav } from "./BenefitsNav";
import { FaqSection } from "./FaqSection";

const CORNER = {
  tl: "M0.5 8.5L0.499999 2.5C0.499998 1.39543 1.39543 0.500001 2.5 0.500001L8.5 0.499999",
  tr: "M0.5 0.5L6.5 0.499999C7.60457 0.499999 8.5 1.39543 8.5 2.5L8.5 8.5",
  bl: "M8.5 8.5L2.5 8.5C1.39543 8.5 0.5 7.60457 0.5 6.5L0.499999 0.5",
  br: "M8.5 0.5L8.5 6.5C8.5 7.60457 7.60457 8.5 6.5 8.5L0.500001 8.5",
} as const;

function Corner({ d }: { d: string }) {
  return (
    <div className="icon-embed-xtiny w-embed">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 9 9"
        fill="none"
      >
        <path d={d} stroke="currentColor" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function ScrollMarks() {
  return (
    <div className="icon-scroll_wrapper">
      <div className="code-embed w-embed">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 35 146"
        >
          <g>
            <path
              fill="currentColor"
              fillOpacity="0.6"
              d="M7.6,9.1c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z"
            />
            <path
              fill="currentColor"
              d="M15.1,15.7c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z"
            />
            <path
              fill="currentColor"
              fillOpacity="0.6"
              d="M22.6,9.1c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z"
            />
            <path
              fill="currentColor"
              fillOpacity="0.3"
              d="M30.2,2.4C30.2,1.1,31.3,0,32.6,0s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z"
            />
            <path
              fill="currentColor"
              fillOpacity="0.3"
              d="M2.4,0h0C3.7,0,4.8,1.1,4.8,2.4h0c0,1.3-1.1,2.4-2.4,2.4h0C1.1,4.8,0,3.7,0,2.4H0C0,1.1,1.1,0,2.4,0Z"
            />
          </g>
          <g>
            <path
              fill="currentColor"
              fillOpacity="0.6"
              d="M7.6,73c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z"
            />
            <path
              fill="currentColor"
              d="M15.1,79.7c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z"
            />
            <path
              fill="currentColor"
              fillOpacity="0.6"
              d="M22.6,73c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z"
            />
            <path
              fill="currentColor"
              fillOpacity="0.3"
              d="M30.2,66.4c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z"
            />
            <path
              fill="currentColor"
              fillOpacity="0.3"
              d="M2.4,64h0c1.3,0,2.4,1.1,2.4,2.4h0c0,1.3-1.1,2.4-2.4,2.4h0C1.1,68.7,0,67.7,0,66.4H0C0,65,1.1,64,2.4,64Z"
            />
          </g>
          <g>
            <path
              fill="currentColor"
              fillOpacity="0.6"
              d="M7.6,137c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z"
            />
            <path
              fill="currentColor"
              d="M15.1,143.7c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z"
            />
            <path
              fill="currentColor"
              fillOpacity="0.6"
              d="M22.6,137c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z"
            />
            <path
              fill="currentColor"
              fillOpacity="0.3"
              d="M30.2,130.3c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4-1.1,2.4-2.4,2.4-2.4-1.1-2.4-2.4Z"
            />
            <path
              fill="currentColor"
              fillOpacity="0.3"
              d="M2.4,128h0c1.3,0,2.4,1.1,2.4,2.4h0c0,1.3-1.1,2.4-2.4,2.4h0C1.1,132.7,0,131.6,0,130.3H0C0,129,1.1,128,2.4,128Z"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export function CanGallery() {
  useEffect(() => {
    let cancelled = false;
    let disposeHud: (() => void) | undefined;
    const boot = async () => {
      await import("../../lib/webgl-scene.js");
      if (cancelled) return;
      document.body.style.setProperty("--loader-reveal", "0vh");
      const loader = (
        window as unknown as { loader?: { play: () => Promise<void> } }
      ).loader;
      await loader?.play?.();
      if (cancelled) return;
      const { initHud } = await import("../../lib/hud-init");
      if (cancelled) return;
      disposeHud = await initHud();
    };
    void boot();
    return () => {
      cancelled = true;
      disposeHud?.();
    };
  }, []);

  return (
    <div className="page-wrapper">
      <main className="main-wrapper">
        <div className="navbar">
          <div className="navbar_content">
            <div className="scroll_component">
              <div className="scroll_point" />
              <div className="scroll_wrapper">
                <div className="scroll_indicator">
                  <div className="scroll_indicator__core" />
                  <div className="scroll_indicator__mid" />
                  <div className="scroll_indicator__halo" />
                  <div className="scroll_indicator__hotspot" />
                </div>
              </div>
              <div className="scroll_point" />
            </div>
            <div className="navbar_container">
              <div className="navbar_sound-wrapper">
                <div className="navbar_sound">
                  <div>ON</div>
                  <div>
                    <div className="icon-embed-xsmall w-embed">
                      <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 14 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="2" height="8" rx="1" fill="currentColor" />
                        <rect
                          x="4"
                          width="2"
                          height="8"
                          rx="1"
                          fill="currentColor"
                        />
                        <rect
                          x="8"
                          width="2"
                          height="8"
                          rx="1"
                          fill="currentColor"
                        />
                        <rect
                          x="12"
                          width="2"
                          height="8"
                          rx="1"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <a href="/" aria-current="page" className="navbar_logo-link w-nav-brand w--current">
                <img
                  loading="lazy"
                  src="/img/zero-energy_logo.webp"
                  alt="Zero Energy"
                  className="navbar_logo"
                />
              </a>
              <div className="navbar_menu-wrapper">
                <div className="navbar_relative">
                  <div className="navbar_menu-button">
                    <div className="navbar_menu-button-wrapper">
                      <div>
                        <div className="icon-embed-tiny w-embed">
                          <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 8 8"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle fill="currentColor" cx="1" cy="1" r="1" />
                            <circle fill="currentColor" cx="7" cy="1" r="1" />
                            <circle fill="currentColor" cx="7" cy="7" r="1" />
                            <circle fill="currentColor" cx="1" cy="7" r="1" />
                            <circle
                              className="navbar_menu-circle-closed"
                              fill="currentColor"
                              cx="4"
                              cy="4"
                              r="1"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-block">MENU</div>
                    </div>
                  </div>
                  <div className="navbar_menu">
                    <div className="navbar_link-list">
                      <a href="#gamme" className="navbar_link">
                        Gamme
                      </a>
                      <a href="#benefits-1" className="navbar_link">
                        Bénéfices
                      </a>
                      <a href="#FAQ" className="navbar_link">
                        FAQ
                      </a>
                    </div>
                    <div className="navbar_middle" />
                    <div className="navbar_bottom">
                      <div className="navbar_button">
                        <button
                          type="button"
                          data-scroll-to="#FAQ"
                          className="button is-full"
                        >
                          <div>Contact</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  data-scroll-to="#FAQ"
                  className="button is-small hide-tablet"
                >
                  <div>Contact</div>
                </button>
              </div>
            </div>
          </div>
          <div className="navbar_overlay" />
        </div>

        <section id="gamme" className="section is-gamme">
          <div className="gamme_container">
            <div className="padding-global">
              <div className="container-large">
                <div className="padding-bottom padding-medium">
                  <div className="max-width-medium align-center">
                    <div className="gamme_gradient-wrapper">
                      <div className="gamme_gradient-position">
                        <div className="gamme_gradient" />
                      </div>
                      <div className="gamme_gradient-blur" />
                    </div>
                    <div>
                      <div className="w-embed">
                        <h1
                          style={{
                            position: "absolute",
                            width: 1,
                            height: 1,
                            padding: 0,
                            margin: -1,
                            overflow: "hidden",
                            clip: "rect(0,0,0,0)",
                            whiteSpace: "nowrap",
                            border: 0,
                          }}
                        >
                          Zero Energy – L&apos;energy drink parfaite
                        </h1>
                      </div>
                      <div className="carousel_title-collection w-dyn-list">
                        <div
                          role="list"
                          className="carousel_list is-hero w-dyn-items"
                        >
                          {FLAVORS.map((f) => (
                            <div
                              key={f.id}
                              data-taste-secondary={f.secondary}
                              data-taste-primary={f.primary}
                              role="listitem"
                              className="carousel_slide w-dyn-item"
                            >
                              <div className="carousel_title">
                                <div className="carousel_title-embed w-embed">
                                  <div className="heading-style-h2">
                                    <span data-anim="chars-mask">
                                      {f.title[0]}
                                    </span>
                                    <span data-anim="chars-mask">
                                      {f.title[1]}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="carousel_nav">
                        <div className="carousel_arrow is-prev">
                          <div className="icon-embed-custom w-embed">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                              viewBox="0 0 17 32"
                              fill="none"
                            >
                              <path
                                d="M2.11495 13.4458C3.28298 13.4458 4.22986 14.3927 4.22986 15.5607C4.22986 16.7287 3.28298 17.6756 2.11495 17.6756C0.946913 17.6756 3.33786e-05 16.7287 3.33786e-05 15.5607C3.33786e-05 14.3927 0.946913 13.4458 2.11495 13.4458Z"
                                fill="currentColor"
                              />
                              <path
                                d="M8.04854 6.77686C9.21657 6.77686 10.1635 7.72373 10.1635 8.89177C10.1635 10.0598 9.21657 11.0067 8.04854 11.0067C6.88051 11.0067 5.93363 10.0598 5.93363 8.89177C5.93363 7.72373 6.88051 6.77686 8.04854 6.77686Z"
                                fill="currentColor"
                                fillOpacity="0.6"
                              />
                              <path
                                d="M8.04854 20.1143C9.21657 20.1143 10.1635 21.0611 10.1635 22.2292C10.1635 23.3972 9.21657 24.3441 8.04854 24.3441C6.88051 24.3441 5.93363 23.3972 5.93363 22.2292C5.93363 21.0611 6.88051 20.1143 8.04854 20.1143Z"
                                fill="currentColor"
                                fillOpacity="0.6"
                              />
                              <path
                                d="M13.9823 26.8911C15.1503 26.8911 16.0972 27.838 16.0972 29.006C16.0972 30.1741 15.1503 31.1209 13.9823 31.1209C12.8142 31.1209 11.8673 30.1741 11.8673 29.006C11.8673 27.838 12.8142 26.8911 13.9823 26.8911Z"
                                fill="currentColor"
                                fillOpacity="0.3"
                              />
                              <rect
                                x="16.0972"
                                y="7.03622e-07"
                                width="4.22982"
                                height="4.22983"
                                rx="2.11491"
                                transform="rotate(90 16.0972 7.03622e-07)"
                                fill="currentColor"
                                fillOpacity="0.3"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="carousel_arrow is-next">
                          <div className="icon-embed-custom w-embed">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="100%"
                              height="100%"
                              viewBox="0 0 17 32"
                              fill="none"
                            >
                              <path
                                d="M13.9822 13.4458C12.8142 13.4458 11.8673 14.3927 11.8673 15.5607C11.8673 16.7287 12.8142 17.6756 13.9822 17.6756C15.1503 17.6756 16.0971 16.7287 16.0971 15.5607C16.0971 14.3927 15.1503 13.4458 13.9822 13.4458Z"
                                fill="currentColor"
                              />
                              <path
                                d="M8.04863 6.77686C6.8806 6.77686 5.93372 7.72373 5.93372 8.89177C5.93372 10.0598 6.8806 11.0067 8.04863 11.0067C9.21666 11.0067 10.1635 10.0598 10.1635 8.89177C10.1635 7.72373 9.21666 6.77686 8.04863 6.77686Z"
                                fill="currentColor"
                                fillOpacity="0.6"
                              />
                              <path
                                d="M8.04863 20.1143C6.8806 20.1143 5.93372 21.0611 5.93372 22.2292C5.93372 23.3972 6.8806 24.3441 8.04863 24.3441C9.21666 24.3441 10.1635 23.3972 10.1635 22.2292C10.1635 21.0611 9.21666 20.1143 8.04863 20.1143Z"
                                fill="currentColor"
                                fillOpacity="0.6"
                              />
                              <path
                                d="M2.11491 26.8911C0.946879 26.8911 0 27.838 0 29.006C0 30.1741 0.946879 31.1209 2.11491 31.1209C3.28295 31.1209 4.22983 30.1741 4.22983 29.006C4.22983 27.838 3.28295 26.8911 2.11491 26.8911Z"
                                fill="currentColor"
                                fillOpacity="0.3"
                              />
                              <rect
                                width="4.22982"
                                height="4.22983"
                                rx="2.11491"
                                transform="matrix(0 1 1 -4.37114e-08 0 7.03622e-07)"
                                fill="currentColor"
                                fillOpacity="0.3"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="carousel_pagination">
                        <div className="w-embed">
                          <svg
                            className="carousel_pagination-svg"
                            viewBox="0 0 1000 40"
                            preserveAspectRatio="none"
                          >
                            <defs>
                              <filter id="liquid">
                                <feGaussianBlur
                                  in="SourceGraphic"
                                  stdDeviation="4"
                                  result="blur"
                                />
                                <feColorMatrix
                                  in="blur"
                                  mode="matrix"
                                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
                                />
                              </filter>
                              <linearGradient
                                id="bar-gradient"
                                x1="0"
                                y1="0"
                                x2="1000"
                                y2="0"
                                gradientUnits="userSpaceOnUse"
                              >
                                <stop offset="0%" stopColor="#9089D3" />
                                <stop offset="20%" stopColor="#00A6E2" />
                                <stop offset="40%" stopColor="#71BD96" />
                                <stop offset="60%" stopColor="#EEB169" />
                                <stop offset="80%" stopColor="#E59DE6" />
                                <stop offset="100%" stopColor="#FF659D" />
                              </linearGradient>
                            </defs>
                            <g
                              filter="url(#liquid)"
                              style={{
                                filter:
                                  "url(#liquid) drop-shadow(0 0 12px rgba(0, 0, 0, 0.25))",
                              }}
                            >
                              <rect
                                className="carousel_pagination-bar"
                                x="0"
                                y="16"
                                width="1000"
                                height="8"
                                rx="4"
                                fill="url(#bar-gradient)"
                              />
                              <circle
                                className="carousel_pagination-dot"
                                cx="0"
                                cy="20"
                                r="18"
                                fill="url(#bar-gradient)"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      <div className="scroll_discover">
                        Scroller pour découvrir
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section is-profile">
          <div className="profile_container">
            <div className="padding-global height-100">
              <div className="container-large height-100">
                <div className="padding-section-medium height-100 position-relative">
                  <div className="carousel_desc-collection w-dyn-list">
                    <div
                      role="list"
                      className="carousel_list is-desc w-dyn-items"
                    >
                      {FLAVORS.map((f) => (
                        <div
                          key={f.id}
                          role="listitem"
                          className="carousel_desc w-dyn-item"
                        >
                          <div className="max-width-custom">
                            <div className="margin-bottom margin-large hide-tablet">
                              <div className="carousel_title-embed w-embed">
                                <div className="heading-style-h2">
                                  <span data-anim="chars-mask">{f.title[0]}</span>
                                  <span data-anim="chars-mask">{f.title[1]}</span>
                                </div>
                              </div>
                            </div>
                            <div className="profile_desc">
                              <div className="corner-left">
                                <Corner d={CORNER.tl} />
                              </div>
                              <p data-anim="lines-mask">{f.desc}</p>
                              <div className="corner-right">
                                <Corner d={CORNER.br} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits-1" className="section is-benefits">
          <BenefitsCopy {...BENEFITS[0]} />
          <div className="div-block">
            <BenefitsNav />
          </div>
        </section>
        <section id="benefits-2" className="section is-benefits">
          <BenefitsCopy {...BENEFITS[1]} />
        </section>
        <section id="benefits-3" className="section is-benefits">
          <BenefitsCopy {...BENEFITS[2]} />
        </section>
        <section id="benefits-4" className="section is-benefits">
          <BenefitsCopy {...BENEFITS[3]} />
        </section>
        <section id="argument" className="section is-argument">
          <div className="argument_container">
            <div className="padding-global">
              <div className="padding-section-medium" />
            </div>
            <div className="argument_media-container">
              <div className="argument_svg-container">
                <div className="argument_svg w-embed">
                  <ArgumentMark />
                </div>
                <div className="argument_svg-blur" />
              </div>
            </div>
          </div>
        </section>
        <section id="full-gamme" className="section is-full-gamme">
          <div className="full-gamme_container">
            <div className="padding-global">
              <div className="padding-section-medium" />
            </div>
          </div>
        </section>
        <FaqSection />
        <section className="section is-last-copy" />
        <section className="section is-last" />

        <div className="carousel_title-bis-wrapper">
          <div className="carousel_title-bis-collection w-dyn-list">
            <div role="list" className="carousel_list is-desc w-dyn-items">
              {FLAVORS.map((f) => (
                <div
                  key={f.id}
                  role="listitem"
                  className="carousel_title-b w-dyn-item"
                >
                  <div data-anim="chars-mask">{f.title[0]}</div>
                  <div data-anim="chars-mask">{f.title[1]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hud">
          <div className="gradient_overlay" />
          <div className="hud_container">
            <div className="hud_left">
              <div className="hud_left-top">
                <Corner d={CORNER.tl} />
                <div>C</div>
              </div>
              <div className="hud_left-bottom">
                <div className="hud_left-bottom-top">
                  <div>E</div>
                  <div>_</div>
                </div>
                <ScrollMarks />
                <Corner d={CORNER.bl} />
              </div>
            </div>
            <div className="hud_right">
              <div className="hud_right-top">
                <Corner d={CORNER.tr} />
                <div className="hud_right-top-bottom">
                  <div>_</div>
                  <div className="hide">/</div>
                </div>
              </div>
              <div className="hud_right-bottom">
                <ScrollMarks />
                <div>_</div>
                <Corner d={CORNER.br} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
