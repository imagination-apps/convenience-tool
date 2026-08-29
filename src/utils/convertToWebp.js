/**
 * Converts a single image File to a WebP Blob using an off-DOM canvas.
 * Everything happens locally — the file is never sent anywhere.
 *
 * @param {File} file - source image (PNG/JPEG/GIF/etc.)
 * @param {number} quality - 0.1–1.0 encoding quality passed to canvas.toBlob
 * @returns {Promise<Blob>}
 */
export function convertToWebp(file, quality) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight

        const ctx = canvas.getContext('2d')
        if (!ctx) {
          throw new Error('Canvas 2D context unavailable')
        }
        ctx.drawImage(img, 0, 0)

        canvas.toBlob(
          (blob) => {
            URL.revokeObjectURL(objectUrl)
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('WebP encoding failed'))
            }
          },
          'image/webp',
          quality,
        )
      } catch (err) {
        URL.revokeObjectURL(objectUrl)
        reject(err)
      }
    }

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error(`Could not load image: ${file.name}`))
    }

    img.src = objectUrl
  })
}

export function webpFileName(originalName) {
  const dot = originalName.lastIndexOf('.')
  const base = dot > 0 ? originalName.slice(0, dot) : originalName
  return `${base}.webp`
}

export function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / 1024 ** i
  return `${i === 0 ? value : value.toFixed(1)} ${units[i]}`
}
