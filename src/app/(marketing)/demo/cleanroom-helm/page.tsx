import type { Metadata } from "next";
import { Inter } from "next/font/google";
import HelmFaqSection from "../../../../../cleanroom/helm-from-prompt/HelmFaqSection";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-helm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HELM · Zebra FAQ",
  description:
    "Operator cleanroom for MS-SEC-FAQS03. Crop punch. Not for public catalog.",
};

/**
 * Operator proof only — MS-SEC-FAQS03 HELM.
 * Sidecar wow FAQ. Header/footer hidden via /demo/cleanroom-* .
 */
export default function CleanroomHelmPage() {
  return (
    <div
      className={`${sans.variable} min-h-dvh overflow-hidden bg-[#111] text-[#F5F5F5]`}
      style={{ fontFamily: "var(--font-helm), system-ui, sans-serif" }}
    >
      <HelmFaqSection />
    </div>
  );
}
