import type { Metadata } from "next";
import PhobiaSection from "../../../../../cleanroom/phobia-from-prompt/PhobiaSection";

export const metadata: Metadata = {
  title: "Phobia · Cursor-Fleeing Forms Section",
  description:
    "MS-SEC-PHOB01. Black void, photo cutouts and letter debris that flee the pointer with elastic return. Premium white-glow cursor.",
};

/**
 * Production cleanroom demo for MS-SEC-PHOB01 (Phobia).
 * No site chrome — section only.
 */
export default function CleanroomPhobiaPage() {
  return (
    <div className="min-h-dvh bg-black text-white">
      <PhobiaSection />
    </div>
  );
}
