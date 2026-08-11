import sharp from 'sharp';
import fs from 'fs';

const missing = [
  { id: 'MS-HERO-LUMI01', colors: ['#1E140A', '#F59E0B', '#FEF3C7'], label: 'LUMINA' },
  { id: 'MS-HERO-TERR01', colors: ['#0B1A14', '#7BA58F', '#D4A373'], label: 'TERRA' },
  { id: 'MS-HERO-APEX01', colors: ['#070A1A', '#00D4FF', '#A855F7'], label: 'APEX QUANTUM' },
  { id: 'MS-HERO-VERV01', colors: ['#1A0A14', '#EC4899', '#F59E0B'], label: 'VERVE' },
  { id: 'MS-HERO-ORBI01', colors: ['#0F172A', '#F59E0B', '#E2E8F0'], label: 'ORBIT' },
  { id: 'MS-HERO-NOMA01', colors: ['#1C140A', '#C17A4A', '#FEF3C7'], label: 'NOMAD' },
];

for (const { id, colors, label } of missing) {
  const svg = `<svg width="1200" height="750" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="750" fill="${colors[0]}"/>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${colors[0]}"/>
        <stop offset="50%" stop-color="${colors[1]}"/>
        <stop offset="100%" stop-color="${colors[2]}"/>
      </linearGradient>
      <filter id="b"><feGaussianBlur stdDeviation="40"/></filter>
    </defs>
    <rect width="1200" height="750" fill="url(#g)" opacity="0.7"/>
    <ellipse cx="600" cy="320" rx="400" ry="280" fill="${colors[1]}" opacity="0.3" filter="url(#b)"/>
    <ellipse cx="800" cy="200" rx="300" ry="240" fill="${colors[2]}" opacity="0.2" filter="url(#b)"/>
    <text x="600" y="340" text-anchor="middle" font-family="sans-serif" font-size="38" font-weight="900" fill="white" letter-spacing="-1">${label}</text>
    <text x="600" y="375" text-anchor="middle" font-family="sans-serif" font-size="11" fill="white" opacity="0.6" letter-spacing="3">AWAITING VIDEO • ${id}</text>
  </svg>`;
  const buf = await sharp(Buffer.from(svg)).webp({ quality: 82 }).toBuffer();
  fs.writeFileSync(`public/thumbnails/${id}.webp`, buf);
  console.log(`✓ ${id}.webp ${(buf.length/1024).toFixed(0)}KB`);
}
console.log('Missing thumbs done — enterprise placeholder (honest empty state)');

// Mark NEON as honest too — its video doesn't exist (403), so update its thumb to same style
const neonSvg = `<svg width="1200" height="750" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="750" fill="#000"/>
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#000"/><stop offset="50%" stop-color="#00F0FF"/><stop offset="100%" stop-color="#FF006E"/>
    </linearGradient>
    <filter id="b"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>
  <rect width="1200" height="750" fill="url(#g)" opacity="0.6"/>
  <ellipse cx="600" cy="320" rx="400" ry="280" fill="#00F0FF" opacity="0.25" filter="url(#b)"/>
  <text x="600" y="340" text-anchor="middle" font-family="sans-serif" font-size="38" font-weight="900" fill="white" letter-spacing="-1">NEON FORGE</text>
  <text x="600" y="375" text-anchor="middle" font-family="sans-serif" font-size="11" fill="white" opacity="0.6" letter-spacing="3">AWAITING VIDEO • MS-HERO-NEON01</text>
</svg>`;
const neonBuf = await sharp(Buffer.from(neonSvg)).webp({ quality: 82 }).toBuffer();
fs.writeFileSync(`public/thumbnails/MS-HERO-NEON01.webp`, neonBuf);
console.log(`✓ Repaired MS-HERO-NEON01.webp as honest awaiting state`);

// Regenerate preview webps for those with real video — they already have real posters
console.log('Thumbs regenerated');
