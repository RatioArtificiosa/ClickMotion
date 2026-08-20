/** Locked SkySpires overlay copy. Source film was Gemini-garbled.
 *  Do not restore Nexora. Do not invent extra pages from film morphs. */

export const BRAND = "SkySpires";

export const NAV = [
  { id: "home", label: "Home", current: true },
  { id: "about", label: "About" },
  { id: "process", label: "Process", menu: true },
  { id: "community", label: "Community" },
  { id: "news", label: "News" },
  { id: "students", label: "Students" },
  { id: "contact", label: "Contact" },
] as const;

export const HERO = {
  kicker: "AI-Powered Design Studio",
  line1: "Design",
  line2: "without",
  accent: "limits.",
  body: "We blend human creativity with artificial intelligence to build digital experiences that inspire and perform.",
  cta: "Start Your Project",
  secondary: "See Case Studies",
};

export const STATS = [
  { icon: "chart", value: "987+", label: "Projects Completed" },
  { icon: "people", value: "98%", label: "Client Satisfaction" },
  { icon: "orb", value: "28+", label: "Years of Experience" },
] as const;

export const GAUGE = {
  rings: [
    { value: "98%", caption: "NPS" },
    { value: "28+", caption: "Years" },
    { value: "987+", caption: "Projects" },
  ],
  open: "2 retainers open",
  facts: [
    { k: "Reply", v: "4 hrs" },
    { k: "Last launch", v: "11 days" },
    { k: "Retained", v: "91%" },
  ],
  path: ["Discover", "Make", "Ship"],
  city: "CDMX",
  next: "Next kickoff · 8 Sep",
};

export const STEPS = [
  {
    id: "strategy",
    n: "01",
    title: "Strategy",
    body: "We help you define the right life.",
    tone: "cyan",
  },
  {
    id: "design",
    n: "02",
    title: "Design",
    body: "Beautiful interfaces that connect.",
    tone: "teal",
  },
  {
    id: "develop",
    n: "03",
    title: "Develop",
    body: "Clean, scalable and future-ready code.",
    tone: "violet",
  },
  {
    id: "launch",
    n: "04",
    title: "Launch",
    body: "We launch and optimize for real impact.",
    tone: "magenta",
  },
] as const;

export const CYCLE_MS = 2600;
