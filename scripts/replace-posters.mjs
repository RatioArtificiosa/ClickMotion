import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Source AI images are high-quality beach and globe — use as real posters (16:9 already)
// Image 2 = aether beach, Image 3 = vertex globe
const sources = [
  { src: 'C:/Users/Usuario/.grok/sessions/E%3A%5CProducts%5CMS/019fde97-c4b7-7d81-9804-355851cc0c6d/images/2.jpg', id: 'aether-waves-v1', heroId: 'MS-HERO-AETH01' },
  { src: 'C:/Users/Usuario/.grok/sessions/E%3A%5CProducts%5CMS/019fde97-c4b7-7d81-9804-355851cc0c6d/images/3.jpg', id: 'vertex-globe-v1', heroId: 'MS-HERO-VERT01' },
];

for (const { src, id, heroId } of sources) {
  if (!fs.existsSync(src)) { console.log(`Missing ${src}`); continue; }

  // Poster: 1920x1080 WebP <150KB
  const posterBuf = await sharp(src).resize(1920, 1080, { fit: 'cover' }).webp({ quality: 78 }).toBuffer();
  fs.writeFileSync(`public/assets/posters/${id}.webp`, posterBuf);
  console.log(`✓ Poster ${id}.webp ${(posterBuf.length/1024).toFixed(0)}KB`);

  // Thumbnail: 1200x750 (same aspect as gallery) WebP
  const thumbBuf = await sharp(src).resize(1200, 750, { fit: 'cover', position: 'center' }).webp({ quality: 82 }).toBuffer();
  fs.writeFileSync(`public/thumbnails/${heroId}.webp`, thumbBuf);
  console.log(`✓ Thumb ${heroId}.webp ${(thumbBuf.length/1024).toFixed(0)}KB`);

  // Preview thumbnail (used as fallback when video not ready)
  const previewBuf = await sharp(src).resize(1280, 720, { fit: 'cover' }).webp({ quality: 80 }).toBuffer();
  fs.writeFileSync(`public/previews/${heroId}.webp`, previewBuf);
  console.log(`✓ Preview ${heroId}.webp`);
}

console.log('Posters replaced — no more gradients for AETH + VERT');
