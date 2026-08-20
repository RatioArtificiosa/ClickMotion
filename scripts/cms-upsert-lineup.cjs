/**
 * Upsert MS-SEC-LINE01 from content/prompts/sections/MS-SEC-LINE01.mdx into CMS store.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(
  path.join(root, "content/prompts/sections/MS-SEC-LINE01.mdx"),
  "utf8"
);
const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!fmMatch) throw new Error("no frontmatter");
const fm = fmMatch[1];
const body = fmMatch[2].trim();

function get(key) {
  const m = fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, "m"));
  return m ? m[1].replace(/^"|"$/g, "") : null;
}
function getArr(key) {
  const m = fm.match(new RegExp(`${key}:\\s*\\[([^\\]]+)\\]`));
  if (!m) return [];
  return m[1].split(",").map((s) => s.trim().replace(/^"|"$/g, ""));
}

const GOLD_DESC =
  "Your products enter one by one as the visitor scrolls - a living 3D vessel, soft copy, and a quiet stage that can hold any line from two SKUs to a full collection.";
const desc = get("description");
if (desc !== GOLD_DESC) {
  throw new Error("Lineup description bar drifted from gold");
}
if (!desc || desc.length > 230) {
  throw new Error(`description length ${desc?.length} exceeds 230`);
}
if (desc.includes("—") || desc.includes("–")) {
  throw new Error("description has em/en dash");
}
if (!/pin-until-complete/i.test(body) || !/No Scroller/.test(body)) {
  throw new Error("MDX body missing pin-until-complete / No Scroller");
}
if (!/page owns/i.test(body) || !/docks/i.test(body)) {
  throw new Error("MDX body missing pin freeing");
}
if (!/Responsive Behavior/.test(body) || !/Accessibility/.test(body)) {
  throw new Error("MDX missing Responsive / Accessibility sections");
}
if (/\blenis\b/i.test(fm)) {
  throw new Error("frontmatter still lists lenis as a dependency");
}
if ((get("version") || "") !== "2.1.0") {
  throw new Error("Lineup Platinum backend pack must stay on version 2.1.0");
}
if ((get("status") || "") !== "published") throw new Error("status must be published");
if ((get("priceTier") || "") !== "pro") throw new Error("priceTier must be pro");
if (!/lineup-reveal-preview-v1\.webm/.test(get("previewVideo") || "")) {
  throw new Error("page+browse preview must stay lineup-reveal-preview-v1.webm");
}

const packDir = path.join(root, "public/packages/MS-SEC-LINE01");
const requiredPack = [
  "files/START-HERE.md",
  "files/PROMPT.md",
  "files/CUSTOMIZATION.md",
  "files/source/LineupSection.tsx",
  "files/source/lineup-data.ts",
  "files/assets/can.glb",
  "Lineup-files-l7n3e9k2m4p8-q3n7w2.zip",
  "Lineup-package-l7n3e9k2m4p8-q3n7w2.pdf",
];
for (const rel of requiredPack) {
  if (!fs.existsSync(path.join(packDir, rel))) {
    throw new Error("missing pack file " + rel);
  }
}
const src = fs.readFileSync(
  path.join(packDir, "files/source/LineupSection.tsx"),
  "utf8"
);
if (!/pageOwns/.test(src) || !/pinDocked/.test(src)) {
  throw new Error("Lineup source missing pin freeing");
}
if (/from ["']gsap\/ScrollTrigger["']/.test(src) || /ScrollTrigger\.create/.test(src)) {
  throw new Error("LineupSection still pins with ScrollTrigger");
}

const leftoverBanned = [
  path.join(packDir, "files/source/SmoothScroll.tsx"),
  path.join(packDir, "files/source/lenis-bridge.ts"),
  path.join(packDir, "files/source/gsap-register.ts"),
  path.join(root, "cleanroom/lineup-from-prompt/SmoothScroll.tsx"),
  path.join(root, "cleanroom/lineup-from-prompt/lenis-bridge.ts"),
  path.join(root, "cleanroom/lineup-from-prompt/gsap-register.ts"),
];
for (const p of leftoverBanned) {
  if (fs.existsSync(p)) throw new Error("banned leftover " + path.basename(p));
}
const can3d = fs.readFileSync(
  path.join(packDir, "files/source/Can3D.tsx"),
  "utf8"
);
if (/ScrollTrigger/.test(can3d)) {
  throw new Error("Can3D still imports or uses ScrollTrigger");
}

const product = {
  id: get("id"),
  slug: get("slug"),
  title: get("title"),
  description: desc,
  type: get("type"),
  genreId: get("category"),
  styleTags: getArr("styleTags"),
  motionIntensity: get("motionIntensity"),
  difficulty: get("difficulty"),
  priceTier: get("priceTier"),
  status: get("status"),
  body,
  previewVideo: get("previewVideo"),
  previewVideoFullscreen:
    get("previewVideoFullscreen") ||
    "/assets/videos/lineup-reveal-preview-fs-v1.mp4",
  thumbnail: get("thumbnail"),
  poster: get("poster") || "/assets/posters/lineup-reveal-preview-v1.webp",
  liveDemo: get("liveDemo"),
  videoBackgrounds: [],
  frameworksSupported: getArr("frameworksSupported"),
  useCases: getArr("useCases"),
  compatibleWith: getArr("compatibleWith"),
  positionInPage: get("positionInPage"),
  estimatedTokens: Number(get("estimatedTokens") || 16000),
  createdAt: `${get("created")}T00:00:00.000Z`,
  updatedAt: new Date().toISOString(),
  author: get("author"),
  version: get("version"),
  technicalTags: getArr("technicalTags"),
  subcategory: get("subcategory"),
  aiToolsRating: {
    cursor: 5,
    lovable: 3,
    bolt: 3,
    claude: 5,
    "grok-build": 5,
  },
  dependencies: [
    { name: "gsap", version: "^3.12.0", required: true },
    { name: "three", version: "^0.170.0", required: true },
    { name: "@react-three/fiber", version: "^9.0.0", required: true },
    { name: "@react-three/drei", version: "^10.0.0", required: true },
    { name: "tailwindcss", version: "^3.4.0", required: false },
  ],
  aiTools: ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
  sortOrder: 22,
};

const storePath = path.join(root, "data/cms/store.json");
const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
const idx = store.products.findIndex((p) => p.id === product.id);
if (idx >= 0) {
  const prev = store.products[idx];
  store.products[idx] = {
    ...prev,
    ...product,
    sortOrder: prev.sortOrder ?? product.sortOrder,
    likes: prev.likes,
  };
} else {
  store.products.push(product);
}
fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
console.log(
  "CMS",
  product.id,
  product.priceTier,
  "desc",
  product.description.length,
  "body",
  product.body.length,
  idx >= 0 ? "updated" : "added"
);
