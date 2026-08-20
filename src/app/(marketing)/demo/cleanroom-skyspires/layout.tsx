import type { ReactNode } from "react";

/**
 * Match original one-viewport HUD width: no visible page scrollbar
 * (scrollbar steals ~15px and wrecks 100vw spacing). Wheel still works
 * for PSAVE pin-freeing into #skyspires-after.
 */
export default function CleanroomSkySpiresLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <style>{`
        html, body {
          overflow-x: hidden;
          scrollbar-width: none;
        }
        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
        body {
          font-family: Outfit, "Segoe UI", sans-serif;
        }
      `}</style>
      {children}
    </>
  );
}
