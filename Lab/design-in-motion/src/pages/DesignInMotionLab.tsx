import { DesignInMotion } from "../sections/home/DesignInMotion";

/**
 * Product-demo shell for Design in Motion (ClickMotion prep).
 * Section only — no runway, no site footer, no ORION chrome.
 */
export function DesignInMotionLab() {
  return (
    <div className="min-h-dvh bg-[#C3C3C3] text-[#0a0a0a]">
      <DesignInMotion />
    </div>
  );
}
