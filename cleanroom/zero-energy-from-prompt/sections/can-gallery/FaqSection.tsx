import { CLOSER, FAQ } from "../../data/copy";

function FaqDots() {
  return (
    <div className="faq_icon-wrapper">
      <div className="icon-embed-small w-embed">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M8 12C8 11.4477 8.44772 11 9 11C9.55228 11 10 11.4477 10 12C10 12.5523 9.55228 13 9 13C8.44772 13 8 12.5523 8 12Z"
            fill="currentColor"
            fillOpacity="0.6"
          />
          <path
            d="M11 15C11 14.4477 11.4477 14 12 14C12.5523 14 13 14.4477 13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15Z"
            fill="currentColor"
          />
          <path
            d="M14 12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13C14.4477 13 14 12.5523 14 12Z"
            fill="currentColor"
            fillOpacity="0.6"
          />
          <path
            d="M17 9C17 8.44772 17.4477 8 18 8C18.5523 8 19 8.44772 19 9C19 9.55228 18.5523 10 18 10C17.4477 10 17 9.55228 17 9Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <rect
            x="5"
            y="8"
            width="2"
            height="2"
            rx="1"
            fill="currentColor"
            fillOpacity="0.3"
          />
        </svg>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="FAQ" className="section is-faq">
      <div className="faq_container">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="faq_component">
                <div className="margin-bottom margin-xxlarge">
                  <div className="text-align-center">
                    <div className="margin-bottom margin-small">
                      <h2 className="heading-style-custom-2">
                        FOIRE&nbsp;AUX
                        <br />
                        QUESTIONS
                      </h2>
                    </div>
                    <div className="max-width-large align-center" />
                  </div>
                </div>
                <div className="max-width-large align-center">
                  <div className="w-dyn-list">
                    <div role="list" className="faq_list w-dyn-items">
                      {FAQ.map((item) => (
                        <div key={item.q} role="listitem" className="w-dyn-item">
                          <div className="faq_separator" />
                          <div className="faq_accordion">
                            <button
                              type="button"
                              className="faq_question"
                              aria-expanded="false"
                            >
                              <div className="heading-style-h5">{item.q}</div>
                              <FaqDots />
                            </button>
                            <div className="faq_answer" style={{ width: "100%", height: 0 }}>
                              <div className="margin-bottom margin-small">
                                <p className="text-size-medium">{item.a}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="faq_separator" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="newsletter_container">
        <div className="padding-global">
          <div className="container-large">
            <div className="padding-section-large">
              <div className="max-width-medium align-center">
                <div className="text-align-center">
                  <p className="heading-style-h2 text-align-center">
                    {CLOSER.kicker}
                  </p>
                  <div className="margin-top margin-small">
                    <p className="text-align-center">{CLOSER.line}</p>
                  </div>
                </div>
              </div>
              <div className="margin-vertical margin-xhuge">
                <div className="text-align-center">
                  <div className="text-size-tiny">{CLOSER.copyright}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
