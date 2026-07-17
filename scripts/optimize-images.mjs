import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const imagesDir = path.resolve('public/images')

const specs = {
  'hero.jpg': { width: 1920, quality: 78 },
  'about.jpg': { width: 1200, quality: 78 },
  'story.jpg': { width: 1200, quality: 78 },
  'gallery-06.jpg': { width: 1600, quality: 78 },
}

async function optimizeFile(file, width = 1000, quality = 78) {
  const input = path.join(imagesDir, file)
  const outName = file.replace(/\.(jpe?g|png|webp)$/i, '.webp')
  const output = path.join(imagesDir, outName)

  // Skip if already optimized in a previous run
  try {
    await fs.access(output)
    console.log(`skip existing ${outName}`)
    return outName
  } catch {
    // continue
  }

  const before = (await fs.stat(input)).size
  try {
    await sharp(input, { failOn: 'none' })
      .rotate()
      .resize({ width, height: width * 2, fit: 'inside', withoutEnlargement: true })
      .webp({ quality, effort: 4 })
      .toFile(output)
  } catch (err) {
    console.error(`FAILED ${file}:`, err.message)
    return null
  }

  const after = (await fs.stat(output)).size
  console.log(
    `${file} → ${outName}: ${(before / 1024 / 1024).toFixed(2)}MB → ${(after / 1024).toFixed(0)}KB`,
  )
  return outName
}

const files = (await fs.readdir(imagesDir)).filter(
  (f) =>
    /\.(jpe?g|png)$/i.test(f) &&
    !f.startsWith('icon-') &&
    f !== 'favicon.png' &&
    f !== 'story.png',
)

for (const file of files) {
  const spec = specs[file] ?? { width: 1000, quality: 78 }
  await optimizeFile(file, spec.width, spec.quality)
}

console.log('Done.')
