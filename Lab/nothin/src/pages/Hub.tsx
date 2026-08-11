import { Link } from "react-router-dom";
import { LAB_ROUTES } from "../components/LabChrome";

/**
 * Clone hub — not a full Home assemble. Labs only for v1.
 */
export function Hub() {
  return (
    <div className="min-h-dvh bg-black px-6 py-16 text-white md:px-12">
      <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-white/40">
        website-tests · nothin-clone · port 3030
      </p>
      <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] tracking-[-0.03em]">
        NOTHIN′
      </h1>
      <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/55">
        Two isolated sections from{" "}
        <a
          href="https://www.noth.in/"
          className="underline decoration-white/25 underline-offset-4 hover:text-white"
          target="_blank"
          rel="noreferrer"
        >
          noth.in
        </a>
        . Lab-first. Full site not assembled.
      </p>

      <div className="mt-12 grid max-w-2xl gap-4">
        <Link
          to="/lab/studio-sequence"
          className="group rounded-2xl border border-white/12 bg-white/[0.03] p-6 transition hover:border-white/30 hover:bg-white/[0.06]"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
            01 · Studio Sequence
          </p>
          <p className="mt-2 font-display text-[22px] tracking-[-0.02em] group-hover:text-white">
            Pink balloon macro → gallery screen
          </p>
          <p className="mt-2 text-[13px] text-white/45">
            Scroll-pinned cinematic · /lab/studio-sequence
          </p>
        </Link>
        <Link
          to="/lab/phobic-objects"
          className="group rounded-2xl border border-white/12 bg-white/[0.03] p-6 transition hover:border-white/30 hover:bg-white/[0.06]"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
            02 · Phobic Objects
          </p>
          <p className="mt-2 font-display text-[22px] tracking-[-0.02em]">
            Mouse-repelling floaters on black
          </p>
          <p className="mt-2 text-[13px] text-white/45">
            Pointer physics · /lab/phobic-objects
          </p>
        </Link>
      </div>

      <p className="mt-16 font-sans text-[11px] text-white/30">
        Also in catalog: actually-clone :3010 · orion-clone :3020 (frozen)
      </p>
      {/* keep LAB_ROUTES referenced for tree-shaking clarity */}
      <span className="hidden">{LAB_ROUTES.length}</span>
    </div>
  );
}
