import sharp from 'sharp';
import fs from 'fs';

const outDir = 'public/assets/posters';
fs.mkdirSync(outDir, { recursive: true });

// Generate simple gradient posters as placeholders (since no ffmpeg for frame extraction)
async function generatePoster(name, colors) {
  const svg = `<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${colors[0]}"/>
      <stop offset="50%" stop-color="${colors[1]}"/>
      <stop offset="100%" stop-color="${colors[2]}"/>
    </linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="60"/></filter>
  </defs>
  <rect width="1920" height="1080" fill="${colors[0]}"/>
  <rect width="1920" height="1080" fill="url(#g)" opacity="0.8"/>
  <ellipse cx="960" cy="540" rx="700" ry="500" fill="${colors[1]}" opacity="0.4" filter="url(#blur)"/>
  <ellipse cx="1200" cy="380" rx="500" ry="400" fill="${colors[2]}" opacity="0.3" filter="url(#blur)"/>
</svg>`;
  const webpPath = `${outDir}/${name}.webp`;
  await sharp(Buffer.from(svg)).webp({ quality: 82 }).toFile(webpPath);
  const stat = fs.statSync(webpPath);
  console.log(`✓ ${webpPath} — ${(stat.size/1024).toFixed(1)} KB`);
}

await generatePoster('aether-waves-v1', ['#FDFBF7', '#7BA58F', '#D4A373']);
await generatePoster('vertex-globe-v1', ['#000000', '#334155', '#64748B']);
await generatePoster('neon-forge-city-v1', ['#000000', '#00F0FF', '#FF006E']);
console.log('Posters done');
