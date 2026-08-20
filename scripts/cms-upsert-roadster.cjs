/**
 * Upsert MS-HERO-ROAD01 from content/prompts/heroes/MS-HERO-ROAD01.mdx.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(
  path.join(root, "content/prompts/heroes/MS-HERO-ROAD01.mdx"),
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
  "Looping studio film, scroll-paced product cards, and a black specs sheet that pulls up with a spinning 3D model. Hybrid motion that stays bright, catalog-grade, and restageable.";
const desc = get("description");
if (desc !== GOLD_DESC) throw new Error("Roadster description bar drifted from gold");
if (!desc || desc.length > 230) throw new Error(`description length ${desc?.length}`);
if (desc.includes("—") || desc.includes("–")) throw new Error("description has em/en dash");
if (!/pin-until-complete/i.test(body) || !/No Scroller/.test(body)) {
  throw new Error("MDX missing No Scroller");
}
if (!/page owns/i.test(body) || !/docks/i.test(body)) {
  throw new Error("MDX missing pin freeing");
}
if (!/Responsive Behavior/.test(body) || !/Accessibility/.test(body)) {
  throw new Error("MDX missing Responsive / Accessibility sections");
}
if (/\blenis\b/i.test(fm) || /\bgsap\b/i.test(fm)) {
  throw new Error("frontmatter still lists gsap or lenis");
}
if ((get("version") || "") !== "2.1.0") {
  throw new Error("Roadster Platinum backend pack must stay on version 2.1.0");
}
if ((get("status") || "") !== "published") throw new Error("status must be published");
if ((get("priceTier") || "") !== "pro") throw new Error("priceTier must be pro");
if (!/roadster-studio-drive-preview-v1\.mp4/.test(get("previewVideo") || "")) {
  throw new Error("preview must stay roadster-studio-drive-preview-v1.mp4");
}

const packDir = path.join(root, "public/packages/MS-HERO-ROAD01");
for (const rel of [
  "files/START-HERE.md",
  "files/PROMPT.md",
  "files/CUSTOMIZATION.md",
  "files/source/TeslaRoadsterPromo.tsx",
  "files/assets/studio-drive.mp4",
  "files/assets/roadster.glb",
  "Roadster-files-r0ad8t3r5k2m-rd7n4x.zip",
  "Roadster-package-r0ad8t3r5k2m-rd7n4x.pdf",
]) {
  if (!fs.existsSync(path.join(packDir, rel))) throw new Error("missing " + rel);
}

const src = fs.readFileSync(
  path.join(packDir, "files/source/TeslaRoadsterPromo.tsx"),
  "utf8"
);
if (!/pageOwns/.test(src) || !/pinDocked/.test(src)) {
  throw new Error("TeslaRoadsterPromo missing pin freeing");
}
if (/from ["']gsap\/ScrollTrigger["']/.test(src) || /ScrollTrigger\.create/.test(src)) {
  throw new Error("TeslaRoadsterPromo still pins with ScrollTrigger");
}
if (/\bfrom ["']gsap["']/.test(src)) {
  throw new Error("TeslaRoadsterPromo still imports gsap");
}

const promptMd = fs.readFileSync(
  path.join(packDir, "files/PROMPT.md"),
  "utf8"
);
if (!/page owns/i.test(promptMd) || !/docks/i.test(promptMd)) {
  throw new Error("pack PROMPT missing pin freeing");
}
if (promptMd.split(/\r?\n/).length < 140) {
  throw new Error("pack PROMPT too thin for Platinum");
}
if (/ScrollTrigger on one pin/i.test(promptMd)) {
  throw new Error("pack PROMPT still teaches ScrollTrigger pin");
}

const leftoverBanned = [
  path.join(packDir, "files/source/SmoothScroll.tsx"),
  path.join(packDir, "files/source/gsap-register.ts"),
  path.join(root, "cleanroom/tesla-roadster/SmoothScroll.tsx"),
  path.join(root, "cleanroom/tesla-roadster/gsap-register.ts"),
];
for (const p of leftoverBanned) {
  if (fs.existsSync(p)) throw new Error("banned leftover " + path.basename(p));
}

const buyer = fs.readFileSync(
  path.join(root, "cleanroom/tesla-roadster/BUYER_PROMPT.md"),
  "utf8"
);
if (/scroll pin scrub/i.test(buyer) || /ScrollTrigger pin \+/.test(buyer)) {
  throw new Error("BUYER_PROMPT still teaches old pin");
}
if (!/rd7n4x/.test(buyer)) {
  throw new Error("BUYER_PROMPT missing salted pack names");
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
    "/assets/videos/roadster-studio-drive-preview-fs-v1.mp4",
  thumbnail: get("thumbnail"),
  poster: get("poster") || "/assets/posters/roadster-studio-drive-v1.webp",
  liveDemo: get("liveDemo"),
  videoBackgrounds: [],
  frameworksSupported: getArr("frameworksSupported"),
  useCases: getArr("useCases"),
  compatibleWith: getArr("compatibleWith"),
  positionInPage: get("positionInPage"),
  estimatedTokens: Number(get("estimatedTokens") || 17000),
  createdAt: `${get("created")}T00:00:00.000Z`,
  updatedAt: new Date().toISOString(),
  author: get("author"),
  version: get("version"),
  technicalTags: getArr("technicalTags"),
  subcategory: get("subcategory"),
  aiToolsRating: { cursor: 5, lovable: 3, bolt: 3, claude: 5, "grok-build": 5 },
  dependencies: [
    { name: "three", version: "^0.170.0", required: true },
    { name: "@react-three/fiber", version: "^9.0.0", required: true },
    { name: "@react-three/drei", version: "^10.0.0", required: true },
    { name: "tailwindcss", version: "^3.4.0", required: false },
  ],
  aiTools: ["Cursor", "Claude", "Grok Build", "Lovable", "Bolt"],
  sortOrder: 21,
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
} else store.products.push(product);
fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
console.log("CMS", product.id, "desc", product.description.length, "body", product.body.length);
