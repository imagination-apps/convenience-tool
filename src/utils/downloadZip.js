import JSZip from 'jszip'

/**
 * Bundles converted WebP results into a single ZIP and triggers a browser download.
 * @param {{ name: string, blob: Blob }[]} items
 * @param {(progressPercent: number) => void} [onProgress]
 */
export async function downloadZip(items, onProgress) {
  const zip = new JSZip()

  // Guard against duplicate output filenames (e.g. "photo.png" and "photo.jpg"
  // both becoming "photo.webp") by suffixing repeats.
  const usedNames = new Map()
  for (const { name, blob } of items) {
    let finalName = name
    if (usedNames.has(name)) {
      const count = usedNames.get(name) + 1
      usedNames.set(name, count)
      const dot = name.lastIndexOf('.')
      finalName = dot > 0 ? `${name.slice(0, dot)} (${count})${name.slice(dot)}` : `${name} (${count})`
    } else {
      usedNames.set(name, 0)
    }
    zip.file(finalName, blob)
  }

  const content = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' }, (metadata) => {
    onProgress?.(metadata.percent)
  })

  const url = URL.createObjectURL(content)
  const a = document.createElement('a')
  a.href = url
  a.download = `webp-images-${new Date().toISOString().slice(0, 10)}.zip`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
