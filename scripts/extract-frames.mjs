import fs from 'fs';
import path from 'path';

// Use sharp-free extraction: just copy video to public for browser playback
// and generate a single poster frame via canvas fallback if no ffmpeg
const src = 'C:/Users/Usuario/Pictures/07.08.2026_19.22.00_REC.mp4';
const dest = 'public/motionsites-rec.mp4';
fs.copyFileSync(src, dest);
const stat = fs.statSync(dest);
console.log(`Copied ${src} -> ${dest} ${(stat.size/1024/1024).toFixed(1)}MB`);
console.log('Video ready for video_to_frames extraction via image_gen');
