import type { BenefitCopy } from "../../data/copy";

export function BenefitsCopy({ strike, titleLines, body }: BenefitCopy) {
  return (
    <div className="benefits_container">
      <div className="padding-global">
        <div className="container-large">
          <div className="padding-section-medium">
            <div className="benefits_text">
              <div className="benefits_max-width">
                <div className="margin-bottom margin-small">
                  <div className="subhead_wrapper align-center">
                    <div className="subhead">
                      <div className="subhead_icon">
                        <div>×</div>
                      </div>
                      <div className="subhead_text">
                        <div data-anim="chars-mask">{strike}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="margin-bottom margin-xsmall">
                  <h2 data-anim="chars-mask">
                    {titleLines.map((line, i) => (
                      <span key={line}>
                        {i > 0 ? <br /> : null}
                        {line}
                      </span>
                    ))}
                  </h2>
                </div>
                <p data-anim="lines-mask">{body}</p>
                <div className="max-width-xsmall" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
