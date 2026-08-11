import { Link } from "react-router-dom";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  to?: string;
  href?: string;
  children: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
};

/** Dual-layer char split link — source nav/CTA pattern */
export function CharHoverLink({
  to,
  href,
  children,
  className = "",
  style,
  onClick,
}: Props) {
  const chars = Array.from(children);

  const inner = (
    <span className="relative inline-block overflow-hidden leading-none">
      <span className="text-layer original inline-flex" aria-hidden>
        {chars.map((c, i) => (
          <span
            key={`a-${i}`}
            className="char inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </span>
      <span
        className="text-layer clone absolute inset-0 inline-flex"
        aria-hidden
      >
        {chars.map((c, i) => (
          <span
            key={`b-${i}`}
            className="char inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
            style={{ transitionDelay: `${i * 18}ms` }}
          >
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );

  const cls = `group inline-flex items-center ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} style={style} onClick={onClick}>
        {inner}
      </Link>
    );
  }
  const external = href?.startsWith("http");
  return (
    <a
      href={href}
      className={cls}
      style={style}
      onClick={onClick}
      {...(external
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
    >
      {inner}
    </a>
  );
}

export function CharHoverButton({
  children,
  className = "",
  style,
  onClick,
  type = "button",
}: {
  children: string;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const chars = Array.from(children);
  return (
    <button type={type} className={`group ${className}`} style={style} onClick={onClick}>
      <span className="relative inline-block overflow-hidden leading-none">
        <span className="text-layer original inline-flex" aria-hidden>
          {chars.map((c, i) => (
            <span
              key={`a-${i}`}
              className="char inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full"
              style={{ transitionDelay: `${i * 18}ms` }}
            >
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </span>
        <span className="text-layer clone absolute inset-0 inline-flex" aria-hidden>
          {chars.map((c, i) => (
            <span
              key={`b-${i}`}
              className="char inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
              style={{ transitionDelay: `${i * 18}ms` }}
            >
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </span>
        <span className="sr-only">{children}</span>
      </span>
    </button>
  );
}
