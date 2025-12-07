// scripts/optimize-video.mjs
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'

const execAsync = promisify(exec)

const CONFIG = {
  inputDir: './public/videos/raw',
  outputDir: './public/videos',
  formats: ['mp4', 'webm'],
  resolutions: [
    { name: '1080p', width: 1920, height: 1080 },
    { name: '720p', width: 1280, height: 720 },
    { name: '480p', width: 854, height: 480 }
  ]
}

async function optimizeVideo(inputPath, outputName) {
  console.log(`🎬 Optimizing ${outputName}...`)

  for (const res of CONFIG.resolutions) {
    const outputPath = path.join(
      CONFIG.outputDir,
      `${outputName}-${res.name}.mp4`
    )

    const command = `ffmpeg -i "${inputPath}" \
      -c:v libx264 \
      -crf 23 \
      -preset medium \
      -vf "scale=${res.width}:${res.height}" \
      -c:a aac \
      -b:a 128k \
      -y \
      "${outputPath}"`

    try {
      await execAsync(command)
      const stats = await fs.stat(outputPath)
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2)
      console.log(`  ✓ ${res.name}.mp4: ${sizeMB}MB`)
    } catch (error) {
      console.error(`  ✗ Failed: ${error.message}`)
    }
  }
}

async function main() {
  try {
    await fs.mkdir(CONFIG.inputDir, { recursive: true })
    await fs.mkdir(CONFIG.outputDir, { recursive: true })

    const files = await fs.readdir(CONFIG.inputDir)
    const videos = files.filter(file => /\.(mp4|mov|avi|mkv)$/i.test(file))

    console.log(`📁 Found ${videos.length} videos to optimize\n`)

    for (const video of videos) {
      const inputPath = path.join(CONFIG.inputDir, video)
      const outputName = path.basename(video, path.extname(video))
      await optimizeVideo(inputPath, outputName)
      console.log()
    }

    console.log('✨ Video optimization complete!')

  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

main()