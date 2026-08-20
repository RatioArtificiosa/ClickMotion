import { Link } from "react-router-dom";

export function LabChrome({ label }: { label: string }) {
  return (
    <div className="lab-chrome">
      <Link to="/">← Dopamine</Link>
      <span style={{ margin: "0 0.6rem", opacity: 0.4 }}>·</span>
      <span style={{ opacity: 0.7 }}>{label}</span>
    </div>
  );
}
