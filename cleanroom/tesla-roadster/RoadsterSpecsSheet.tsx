"use client";

/**
 * Tesla-style Roadster specs sheet content.
 * Parent owns the pull-up motion (sheet lives inside the pinned film stage).
 */

import dynamic from "next/dynamic";
import { forwardRef, type CSSProperties } from "react";

const RoadsterTurntable = dynamic(() => import("./RoadsterTurntable"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="text-[11px] tracking-[0.28em] text-white/25">
        ROADSTER
      </span>
    </div>
  ),
});

const DRIVE_SPECS = [
  { label: "Acceleration 0-60 mph", value: "1.9 s" },
  { label: "Acceleration 0-100 mph", value: "4.2 s" },
  { label: "Acceleration 1/4 mile", value: "8.8 s" },
  { label: "Top Speed", value: "Over 250 mph" },
  { label: "Wheel Torque", value: "10,000 Nm" },
] as const;

const MORE_SPECS = [
  { label: "Mile Range", value: "620 miles" },
  { label: "Seating", value: "4" },
  { label: "Drive", value: "All-Wheel Drive" },
  { label: "Base Reservation", value: "$50,000" },
] as const;

type Props = {
  reduced?: boolean;
  style?: CSSProperties;
  className?: string;
  /** When sheet is docked enough, enable WebGL turntable. */
  turntableActive?: boolean;
};

const RoadsterSpecsSheet = forwardRef<HTMLDivElement, Props>(
  function RoadsterSpecsSheet(
    { reduced = false, style, className = "", turntableActive = true },
    ref
  ) {
    return (
      <div
        ref={ref}
        id="reserve"
        className={[
          "will-change-transform absolute inset-x-0 bottom-0 z-[60]",
          "flex h-[min(94dvh,920px)] w-full flex-col overflow-hidden",
          "rounded-t-[1.75rem] bg-black text-white",
          "shadow-[0_-28px_90px_rgba(0,0,0,0.5)]",
          "sm:rounded-t-[2rem] md:rounded-t-[2.25rem]",
          className,
        ].join(" ")}
        style={style}
        aria-label="Roadster specifications"
      >
        {/* Grab affordance */}
        <div className="flex shrink-0 justify-center pb-1 pt-3" aria-hidden>
          <span className="h-1 w-10 rounded-full bg-white/20" />
        </div>

        <div className="mx-auto flex min-h-0 w-full max-w-[1100px] flex-1 flex-col px-6 pb-8 pt-4 sm:px-10 sm:pb-10 sm:pt-6 lg:px-14">
          <div className="shrink-0">
            <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-medium tracking-[-0.02em] text-white">
              Roadster Specs
            </h2>

            <h3 className="mt-8 text-[15px] font-medium text-white sm:mt-10 sm:text-[16px]">
              Drive
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
              {DRIVE_SPECS.map((s) => (
                <div key={s.label}>
                  <p className="text-[11px] font-normal leading-snug text-white/40 sm:text-[12px]">
                    {s.label}
                  </p>
                  <p className="mt-1.5 text-[14px] font-medium tracking-[-0.01em] text-white sm:text-[15px]">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 lg:gap-x-8">
              {MORE_SPECS.map((s) => (
                <div key={s.label}>
                  <p className="text-[11px] font-normal leading-snug text-white/40 sm:text-[12px]">
                    {s.label}
                  </p>
                  <p className="mt-1.5 text-[14px] font-medium tracking-[-0.01em] text-white sm:text-[15px]">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto my-2 min-h-0 w-full max-w-[560px] flex-1 sm:my-3">
            <RoadsterTurntable
              reduced={reduced}
              active={turntableActive}
              className="h-full min-h-[280px] sm:min-h-[340px] md:min-h-[380px]"
            />
          </div>

          <div className="shrink-0 text-center">
            <h3 className="text-[clamp(1.35rem,2.5vw,1.75rem)] font-medium tracking-[-0.02em] text-white">
              Roadster
            </h3>
            <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-white/50 sm:text-[14px]">
              Reserve yours or sign up to get updates.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3">
              <a
                href="#reserve"
                className="inline-flex min-w-[12.5rem] items-center justify-center rounded-sm border border-white px-8 py-2.5 text-[13px] font-medium tracking-wide text-white transition hover:bg-white hover:text-black"
              >
                Reserve Now
              </a>
              <a
                href="#reserve"
                className="inline-flex min-w-[12.5rem] items-center justify-center rounded-sm bg-[#3a3a3a] px-8 py-2.5 text-[13px] font-medium tracking-wide text-white transition hover:bg-[#4a4a4a]"
              >
                Get Updates
              </a>
            </div>
            <p className="mx-auto mt-6 max-w-lg text-[10px] leading-relaxed text-white/25">
              Performance figures are illustrative targets for presentation.
              Restage brand, specs, and CTAs for your product.
            </p>
          </div>
        </div>
      </div>
    );
  }
);

export default RoadsterSpecsSheet;
