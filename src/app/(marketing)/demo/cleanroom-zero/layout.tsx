import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZERO ENERGY · 3D range gallery",
  description:
    "A private tasting of your range: six vessels on one 3D stage you turn by hand, then a scroll that earns the proof.",
};

const SHEETS = [
  "/assets/zero-energy/css/zero-energy.webflow.shared.55683c78d.min.css",
  "/assets/zero-energy/css/inline-0.css",
  "/assets/zero-energy/css/inline-1.css",
  "/assets/zero-energy/css/inline-2.css",
  "/assets/zero-energy/css/inline-4.css",
  "/assets/zero-energy/css/zero-energy.css",
] as const;

/**
 * Immersive demo shell. Styles load as route-local <link>s so they
 * unmount when the operator leaves (do not JS-import the Webflow sheet).
 */
export default function CleanroomZeroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {SHEETS.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
      {children}
    </>
  );
}
