import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const ffmpegPath = path.join(process.cwd(), 'node_modules/ffmpeg-static/ffmpeg.exe');
if (!fs.existsSync(ffmpegPath)) {
  // try js
  const alt = path.join(process.cwd(), 'node_modules/ffmpeg-static/ffmpeg');
  if (fs.existsSync(alt)) {
    // use alt
  }
  console.log('ffmpeg path check:', ffmpegPath, fs.existsSync(ffmpegPath));
}

const video = 'C:/Users/Usuario/Pictures/07.08.2026_19.22.00_REC.mp4';
const outDir = 'E:/Products/MS/public/motionsites-frames';
fs.mkdirSync(outDir, { recursive: true });

import { spawn } from 'child_process';

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args);
    let stderr = '';
    p.stderr.on('data', d => stderr += d.toString());
    p.on('close', code => {
      if (code !== 0) reject(new Error(`exit ${code}: ${stderr.slice(-2000)}`));
      else resolve(stderr);
    });
  });
}

// Extract frames at key timestamps
const timestamps = ['00:00:01', '00:00:03', '00:00:05', '00:00:08', '00:00:12', '00:00:18'];
console.log('Extracting frames at', timestamps.join(', '));

for (let i = 0; i < timestamps.length; i++) {
  const ts = timestamps[i];
  const out = path.join(outDir, `frame-${String(i+1).padStart(2,'0')}-${ts.replace(/:/g,'-')}.jpg`);
  console.log(`Frame ${i+1}: ${ts} -> ${out}`);
  try {
    await run(ffmpegPath, ['-ss', ts, '-i', video, '-vframes', '1', '-q:v', '2', '-y', out]);
    const stat = fs.statSync(out);
    console.log(`  ✓ ${(stat.size/1024).toFixed(0)}KB`);
  } catch(e) {
    console.error(`  Failed: ${e.message}`);
  }
}

// Also extract a poster for the gallery
const probeArgs = ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,duration,codec_name', '-of', 'default=nw=1', video];
try {
  const p = spawn(ffmpegPath, ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,duration,codec_name', '-of', 'default=nw=1', video]);
  let out = '';
  p.stdout.on('data', d => out += d);
  await new Promise(r => p.on('close', r));
  console.log('Probe:', out.slice(0, 500));
} catch {}

console.log('Done. Frames in', outDir);
const files = fs.readdirSync(outDir);
console.log(files.join('\n'));
