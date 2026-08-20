import { Link } from "react-router-dom";

export function Hub() {
  return (
    <div className="hub">
      <p className="hub__eyebrow">Dopamine · Port 3040</p>
      <h1 className="hub__title">
        Film
        <br />
        + Footer
      </h1>
      <p className="hub__sub">
        Ultra-premium port of serotoninn.com’s pre-footer film section and full
        footer — GSAP pin mask, discover cursor, Lottie badge, letter scramble.
        Brand: DOPAMINE.
      </p>
      <div className="hub__links">
        <Link className="hub__link" to="/lab/film-footer">
          <span>Film + Footer (sign-off)</span>
          <span>→</span>
        </Link>
        <Link className="hub__link" to="/lab/film">
          <span>Film only</span>
          <span>→</span>
        </Link>
        <Link className="hub__link" to="/lab/footer">
          <span>Footer only</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
