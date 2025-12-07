// scripts/create-video-placeholders.js
import fs from 'fs';
import path from 'path';

const videoFiles = [
  'hero-bg.mp4',
  'particles-loop.mp4', 
  'box-unboxing.mp4',
  'seal-break.mp4',
  'lid-reveal.mp4',
  'watch-rise.mp4',
  'exploded-animation.mp4',
  'finale-polish.mp4'
];

const videosDir = path.join(process.cwd(), 'public', 'videos');

// Create videos directory if it doesn't exist
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
}

// Create placeholder text files
videoFiles.forEach(file => {
  const filePath = path.join(videosDir, file);
  const placeholderText = `This is a placeholder for ${file}\nAdd your actual video file here.`;
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath.replace('.mp4', '.txt'), placeholderText);
    console.log(`Created placeholder for: ${file}`);
  }
});

console.log('✅ Video placeholders created!');
console.log('\n📁 Actual video files needed:');
videoFiles.forEach(file => {
  console.log(`  - /public/videos/${file}`);
});
console.log('\n🔗 Using Mixkit fallback videos as shown in components.');