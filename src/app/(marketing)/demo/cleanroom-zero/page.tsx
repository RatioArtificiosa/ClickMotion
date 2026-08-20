import ZeroEnergyGallery from "../../../../../cleanroom/zero-energy-from-prompt/ZeroEnergyGallery";

/**
 * Cleanroom — MS-HERO-ZERO01 ZERO ENERGY.
 * Immersive: site header/footer hidden via /demo/cleanroom-* allowlist.
 * Clock: Lenis infinite, autoRaf false. Lenis seeks the timeline (not ST.scrub).
 * Three: 0.161.0 exact, vendored. Do not bump to match k95 / MS 0.185.
 */
export default function CleanroomZeroPage() {
  return <ZeroEnergyGallery />;
}
