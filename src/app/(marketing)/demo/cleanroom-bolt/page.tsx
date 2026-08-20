import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BoltStatsSection from "../../../../../cleanroom/bolt-from-prompt/BoltStatsSection";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-bolt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BOLT · Optical press stats",
  description:
    "Operator cleanroom for MS-SEC-STAT04. Duotone knockout. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-STAT04 BOLT.
 * Sidecar wow stats. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomBoltPage() {
  return (
    <div
      className={`${sans.variable} min-h-dvh overflow-hidden bg-[#F5F5F5] text-[#111]`}
      style={{ fontFamily: "var(--font-bolt), system-ui, sans-serif" }}
    >
      <BoltStatsSection />
    </div>
  );
}
