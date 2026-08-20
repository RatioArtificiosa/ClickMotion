/**
 * Build Dopamine footer cleanroom + product folder source/assets from lab.
 * MS-SEC-DOPA01 · client media under /assets/dopamine/
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const labCss = fs.readFileSync(
  path.join(root, "Lab/dopamine/app/src/index.css"),
  "utf8",
);

const startFooter = labCss.indexOf("/* ───────── Footer");
const endFooter = labCss.indexOf("/* Labs / hub chrome");
if (startFooter < 0 || endFooter < 0) {
  throw new Error("Could not find footer CSS block in lab index.css");
}
let footerBlock = labCss.slice(startFooter, endFooter);
footerBlock = footerBlock.replaceAll("/assets/footer/", "/assets/dopamine/");

const base = `/* Dopamine footer — buyer / cleanroom CSS (fluid rem + section)
 * Import once in host app. Paths assume assets under /assets/dopamine/
 */
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;600;800&display=swap");

:root {
  --White-Main: #fff;
  --Red-Main: #ed3833;
  --Cream: #fff9f7;
  --inner-vh: 100vh;
  --lvh: 100vh;
  font-size: 2.6666666667vw;
  color-scheme: light;
}
@media (min-width: 768px) {
  :root { font-size: 1.3020833333vw; }
}
@media (min-width: 1024px) {
  :root { font-size: 0.6944444444vw; }
}
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; }
button, input { font: inherit; color: inherit; background: none; border: none; cursor: pointer; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; margin: 0; padding: 0; }

/* MUST use this — never Tailwind .container */
.dop-container { width: 100%; max-width: none; padding: 0 1.6rem; }
@media (min-width: 768px) {
  .dop-container { padding: 0 3.2rem; }
}
@media (min-width: 1024px) {
  .dop-container { padding: 0 3.5rem; }
}

`;

const outCss = base + footerBlock;
const dirs = [
  "cleanroom/dopamine-from-prompt",
  "public/packages/MS-SEC-DOPA01/files/source",
  "public/packages/MS-SEC-DOPA01/files/assets",
];
for (const d of dirs) fs.mkdirSync(path.join(root, d), { recursive: true });

fs.writeFileSync(
  path.join(root, "cleanroom/dopamine-from-prompt/dopamine-footer.css"),
  outCss,
);
fs.writeFileSync(
  path.join(root, "public/packages/MS-SEC-DOPA01/files/source/dopamine-footer.css"),
  outCss,
);

function prepTsx(src) {
  return src
    .replaceAll("/assets/footer/", "/assets/dopamine/")
    .replaceAll(
      "/assets/lottie/FOOTER_LOTTIE_v1.json",
      "/assets/dopamine/FOOTER_LOTTIE_v1.json",
    )
    .replace('from "../lib/scramble"', 'from "./scramble"')
    .replace('from "../components/DopamineLogo"', 'from "./DopamineLogo"');
}

const footer = fs.readFileSync(
  path.join(root, "Lab/dopamine/app/src/sections/SiteFooter.tsx"),
  "utf8",
);
const scramble = fs.readFileSync(
  path.join(root, "Lab/dopamine/app/src/lib/scramble.ts"),
  "utf8",
);
const logo = fs.readFileSync(
  path.join(root, "Lab/dopamine/app/src/components/DopamineLogo.tsx"),
  "utf8",
);
const outFooter = prepTsx(footer);

for (const baseDir of [
  "cleanroom/dopamine-from-prompt",
  "public/packages/MS-SEC-DOPA01/files/source",
]) {
  const dir = path.join(root, baseDir);
  fs.writeFileSync(path.join(dir, "SiteFooter.tsx"), outFooter);
  fs.writeFileSync(path.join(dir, "scramble.ts"), scramble);
  fs.writeFileSync(path.join(dir, "DopamineLogo.tsx"), logo);
}

const assets = [
  "Woman1.png",
  "footer_bg_mob.webp",
  "footer_bg_tablet.webp",
  "footer_bg_desk.webp",
  "footer_bg_desk-scaled.webp",
  "FOOTER_LOTTIE_v1.json",
];
for (const a of assets) {
  fs.copyFileSync(
    path.join(root, "public/assets/dopamine", a),
    path.join(root, "public/packages/MS-SEC-DOPA01/files/assets", a),
  );
}

console.log("css bytes", outCss.length);
console.log("woman path", outFooter.includes("/assets/dopamine/Woman1.png"));
console.log("lottie path", outFooter.includes("/assets/dopamine/FOOTER_LOTTIE"));
console.log("no ../lib", !outFooter.includes("../lib"));
console.log("DONE");
