import type { Metadata } from "next";
import { Inter, Birthstone } from "next/font/google";
import IssueFeaturesSection from "../../../../../cleanroom/issue-from-prompt/IssueFeaturesSection";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-issue-sans",
  display: "swap",
});

const wordmark = Birthstone({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-issue-wordmark",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ISSUE · Editorial features section",
  description:
    "Operator cleanroom for MS-SEC-FEAT02. Helix-adjacent capability spread. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FEAT02 ISSUE.
 * Sidecar gold features section. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomIssuePage() {
  return (
    <div
      className={`${sans.variable} ${wordmark.variable} min-h-dvh bg-[#C3C3C3] text-[#1A1A1A]`}
      style={{ fontFamily: "var(--font-issue-sans), system-ui, sans-serif" }}
    >
      <IssueFeaturesSection />
    </div>
  );
}
