import fs from 'fs';
import path from 'path';

const urls = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_031824_0c85e1e9-fe2b-4d52-8cde-25b0c2b5e8a2.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260221_085953_8463b46e-ba85-4bb7-912a-1feaf346e970.mp4',
];

const heroMap = {
  'hf_20260324_031824_0c85e1e9-fe2b-4d52-8cde-25b0c2b5e8a2.mp4': '01-neon-forge-studio',
  'hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4': '02-aether-wellness',
  'hf_20260221_085953_8463b46e-ba85-4bb7-912a-1feaf346e970.mp4': '03-vertex-security',
};

const outDir = path.join(process.cwd(), 'public/assets/videos/originals');
fs.mkdirSync(outDir, { recursive: true });

const manifest = [];
let ok = 0, fail = 0;

for (const url of urls) {
  const filename = path.basename(new URL(url).pathname);
  const hero = heroMap[filename] || filename;
  const dest = path.join(outDir, filename);
  const heroDest = path.join(outDir, `${hero}.mp4`);
  console.log(`\n▶ ${hero}`);
  console.log(`  URL: ${url}`);
  console.log(`  → ${dest}`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    // also copy to hero-named file for convenience
    fs.copyFileSync(dest, heroDest);
    const mb = (buf.length / 1024 / 1024).toFixed(2);
    console.log(`  ✓ ${mb} MB`);
    manifest.push({ hero, filename, heroFile: `${hero}.mp4`, url, bytes: buf.length, mb: Number(mb), savedAt: new Date().toISOString() });
    ok++;
  } catch (e) {
    console.error(`  ✗ FAILED: ${e.message}`);
    manifest.push({ hero, filename, url, error: e.message, savedAt: new Date().toISOString() });
    fail++;
  }
}

const manifestPath = path.join(outDir, '_manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify({ generatedAt: new Date().toISOString(), ok, fail, assets: manifest }, null, 2));
console.log(`\nDone: ${ok} ok, ${fail} failed`);
console.log(`Manifest: ${manifestPath}`);
