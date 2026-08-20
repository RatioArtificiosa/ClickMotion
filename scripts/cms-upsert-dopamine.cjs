const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const raw = fs.readFileSync(
  path.join(root, "content/prompts/sections/MS-SEC-DOPA01.mdx"),
  "utf8",
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

const product = {
  id: get("id"),
  slug: get("slug"),
  title: get("title"),
  description: get("description"),
  type: get("type"),
  genreId: get("category"),
  styleTags: getArr("styleTags"),
  motionIntensity: get("motionIntensity"),
  difficulty: get("difficulty"),
  priceTier: get("priceTier"),
  status: get("status"),
  body,
  previewVideo: get("previewVideo"),
  previewVideoFullscreen: get("previewVideoFullscreen"),
  thumbnail: get("thumbnail"),
  liveDemo: get("liveDemo"),
  videoBackgrounds: [],
  frameworksSupported: getArr("frameworksSupported"),
  useCases: getArr("useCases"),
  compatibleWith: getArr("compatibleWith"),
  positionInPage: get("positionInPage"),
  estimatedTokens: Number(get("estimatedTokens") || 11000),
  createdAt: `${get("created")}T00:00:00.000Z`,
  updatedAt: `${get("updated")}T00:00:00.000Z`,
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
    { name: "lottie-web", version: "^5.12.0", required: true },
  ],
};

const storePath = path.join(root, "data/cms/store.json");
const store = JSON.parse(fs.readFileSync(storePath, "utf8"));
const idx = store.products.findIndex((p) => p.id === product.id);
if (idx >= 0) store.products[idx] = { ...store.products[idx], ...product };
else store.products.push(product);
fs.writeFileSync(storePath, JSON.stringify(store, null, 2));
console.log(
  "CMS",
  product.id,
  product.priceTier,
  "desc",
  product.description.length,
  idx >= 0 ? "updated" : "added",
);
