import { Link } from "react-router-dom";

export function Hub() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        padding: "3rem 1.5rem",
        fontFamily: "Geist, system-ui, sans-serif",
        background: "#050505",
        color: "#f4f4f4",
      }}
    >
      <p style={{ letterSpacing: "0.2em", fontSize: 11, opacity: 0.6 }}>
        ZERO ENERGY · PORT 3070
      </p>
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 4rem)", margin: "0.4em 0" }}>
        Zero Energy
      </h1>
      <p style={{ maxWidth: 560, opacity: 0.75, lineHeight: 1.5 }}>
        L’energy drink parfaite. The 3D gallery lab is the shipped experience.
        Status: FROZEN. Local-only — no outbound servers.
      </p>
      <ul style={{ marginTop: "2rem", lineHeight: 2 }}>
        <li>
          <Link to="/lab/can-gallery" style={{ color: "#7ec8ff" }}>
            /lab/can-gallery
          </Link>{" "}
          — 3D carousel, bénéfices, FAQ
        </li>
      </ul>
    </main>
  );
}
