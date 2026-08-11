import sharp from 'sharp';
import fs from 'fs';

const outDir = 'public/previews';
fs.mkdirSync(outDir, { recursive: true });

async function generatePreview(id, colors, title) {
  const svg = `<svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
    <rect width="1280" height="720" fill="${colors[0]}"/>
    <rect width="1280" height="720" fill="url(#g)" opacity="0.8"/>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colors[0]}"/>
        <stop offset="50%" stop-color="${colors[1]}"/>
        <stop offset="100%" stop-color="${colors[2]}"/>
      </linearGradient>
      <filter id="b"><feGaussianBlur stdDeviation="40"/></filter>
    </defs>
    <ellipse cx="640" cy="360" rx="500" ry="350" fill="${colors[1]}" opacity="0.4" filter="url(#b)"/>
    <ellipse cx="850" cy="250" rx="350" ry="280" fill="${colors[2]}" opacity="0.3" filter="url(#b)"/>
    <text x="640" y="340" text-anchor="middle" font-family="sans-serif" font-size="42" font-weight="900" fill="white" letter-spacing="-1">${title}</text>
    <text x="640" y="380" text-anchor="middle" font-family="sans-serif" font-size="13" fill="white" opacity="0.7" letter-spacing="3">PREVIEW • ${id}</text>
  </svg>`;
  const webpPath = `public/thumbnails/${id}.webp`;
  fs.mkdirSync('public/thumbnails', { recursive: true });
  await sharp(Buffer.from(svg)).webp({ quality: 80 }).toFile(webpPath);
  const stat = fs.statSync(webpPath);
  console.log(`✓ ${webpPath} — ${(stat.size/1024).toFixed(0)} KB`);

  // Also generate a WebP for preview (since no MP4 yet)
  const previewWebp = `${outDir}/${id}.webp`;
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(previewWebp);
  console.log(`  + ${previewWebp}`);
}

await generatePreview('MS-HERO-NEON01', ['#000000', '#00F0FF', '#FF006E'], 'NEON FORGE');
await generatePreview('MS-HERO-AETH01', ['#FDFBF7', '#7BA58F', '#D4A373'], 'AETHER');
await generatePreview('MS-HERO-VERT01', ['#000000', '#E2E8F0', '#334155'], 'VERTEX');
await generatePreview('MS-HERO-NEXU01', ['#07080F', '#00D4FF', '#FF006E'], 'NEXUS AI');
console.log('All previews done');
