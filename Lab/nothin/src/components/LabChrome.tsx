import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const LAB_ROUTES = [
  {
    path: "/lab/phobic-objects",
    num: "02",
    label: "Phobic",
  },
  {
    path: "/lab/studio-sequence",
    num: "01",
    label: "Studio",
  },
] as const;

export function LabChrome({
  sectionNum,
  sectionLabel,
  note,
}: {
  sectionNum: string;
  sectionLabel: string;
  note?: string;
}) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[200] flex flex-col gap-2 p-3 md:p-4">
      <div className="pointer-events-auto mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-2 rounded-xl border border-white/15 bg-black/80 px-3 py-2 shadow-2xl backdrop-blur-md">
        <div>
          <p className="text-[9px] uppercase tracking-[0.22em] text-white/50">
            NOTHIN′ · Section Lab
          </p>
          <p className="text-[12px] text-white/90">
            <span className="tabular-nums text-white/60">{sectionNum}</span>
            <span className="mx-1.5 text-white/30">/</span>
            {sectionLabel}
            {note ? (
              <span className="ml-2 text-[10px] text-white/40">· {note}</span>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {LAB_ROUTES.map((r) => {
            const active = pathname === r.path;
            return (
              <Link
                key={r.path}
                to={r.path}
                className={`rounded-md px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${
                  active
                    ? "bg-white text-black"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {r.num} {r.label}
              </Link>
            );
          })}
          <Link
            to="/"
            className="rounded-md px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/60 hover:text-white"
          >
            Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
