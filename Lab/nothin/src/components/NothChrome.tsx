/**
 * Stub of live noth.in fixed chrome.
 * Default: MENU only (clean plate view).
 * Pass showLogo / showSound when a fuller chrome is needed.
 */
export function NothChrome({
  showLogo = false,
  showSound = false,
}: {
  showLogo?: boolean;
  showSound?: boolean;
}) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] flex items-start justify-between px-5 py-5 md:px-8"
      data-noth-chrome
    >
      {showLogo ? (
        <span
          className="font-display text-[22px] font-medium tracking-tight text-white/95"
          aria-hidden
        >
          N′
        </span>
      ) : (
        <span className="w-0" aria-hidden />
      )}

      {showSound ? (
        <span
          className="flex items-center gap-2 rounded-full bg-black/80 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white ring-1 ring-white/25"
          aria-hidden
        >
          Sound
          <span className="relative h-3.5 w-7 rounded-full bg-white/25">
            <span className="absolute left-0.5 top-0.5 h-2.5 w-2.5 rounded-full bg-black" />
          </span>
        </span>
      ) : null}

      <button
        type="button"
        className="pointer-events-auto ml-auto font-sans text-[11px] uppercase tracking-[0.2em] text-white/90"
      >
        Menu ::
      </button>
    </div>
  );
}
