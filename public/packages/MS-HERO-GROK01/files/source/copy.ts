/** Product language from https://x.ai/news/introducing-grok-bot (11 Aug 2026).
 *  Sphere video is setting only - not an xAI partnership claim. */

export const BRAND = "Grok Bot";
export const HOUSE = "SuperGrok Heavy";

export const NAV = [
  { id: "product", label: "Product" },
  { id: "how", label: "How it works" },
  { id: "safety", label: "Safety" },
  { id: "enterprise", label: "Enterprise" },
] as const;

export const HERO = {
  kicker: "Early beta",
  line1: "Finish",
  line2: "the",
  line3: "swing.",
  lead: "Always-on agents with their own computer. They sign into the tools you already use, work 24/7, and only come back when something needs you.",
  cta: "Meet your first Bot",
  secondary: "Download for macOS",
};

export const PROOFS = [
  { k: "Own computer", v: "Jobs do not stall when you step away." },
  { k: "Your stack", v: "CRM, inbox, sites - even tools with no API." },
  { k: "A real team", v: "Bots work in parallel. You are not the middleman." },
] as const;

export const THREAD = [
  { who: "you" as const, text: "Close Q3 inbound." },
  { who: "bot" as const, text: "Signed into the CRM. Scoring 142 leads." },
  { who: "bot" as const, text: "18 drafts ready. Need you on the top five." },
];

export const TICKER = [
  "Sales outbound",
  "Inbox to zero",
  "Bug reproduction",
  "New-hire seating",
  "Invoice run",
  "Follow-ups",
  "Marketing campaigns",
];

export const PLACE = "Sphere · Las Vegas";
