import { useCallback, useEffect, useState } from 'react'
import DropZone from '../components/DropZone'
import QualitySlider from '../components/QualitySlider'
import FileList from '../components/FileList'
import LimitModal from '../components/LimitModal'
import { useProStatusContext } from '../context/ProStatusContext'
import { convertToWebp, webpFileName } from '../utils/convertToWebp'
import { downloadZip } from '../utils/downloadZip'
import { FREE_MAX_FILES, FREE_QUALITY } from '../config'

let nextId = 0
const makeId = () => `${Date.now()}-${nextId++}`

export default function ConverterPage() {
  const { isPro, openProModal } = useProStatusContext()

  const [items, setItems] = useState([])
  const [quality, setQuality] = useState(FREE_QUALITY)
  const [isConverting, setIsConverting] = useState(false)
  const [isZipping, setIsZipping] = useState(false)

  const [limitModal, setLimitModal] = useState({ open: false, attemptedCount: 0, pendingFiles: [] })

  // Free plan quality is locked regardless of prior slider state.
  useEffect(() => {
    if (!isPro) setQuality(FREE_QUALITY)
  }, [isPro])

  // Revoke object URLs on unmount to avoid leaking memory.
  useEffect(() => {
    return () => {
      items.forEach((item) => URL.revokeObjectURL(item.previewUrl))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addFiles = useCallback((files) => {
    const newItems = files.map((file) => ({
      id: makeId(),
      file,
      previewUrl: URL.createObjectURL(file),
      status: 'pending',
      originalSize: file.size,
      webpSize: null,
      webpBlob: null,
    }))
    setItems((prev) => [...prev, ...newItems])
  }, [])

  const handleFilesAdded = useCallback(
    (newFiles) => {
      // Deliberately reads `items.length` from the outer closure rather than a
      // setItems functional updater: React (StrictMode in particular) may
      // invoke an updater twice to check purity, and addFiles/setLimitModal
      // are side effects that must only run once per real user action.
      const total = items.length + newFiles.length
      if (!isPro && total > FREE_MAX_FILES) {
        setLimitModal({ open: true, attemptedCount: total, pendingFiles: newFiles })
        return
      }
      addFiles(newFiles)
    },
    [items.length, isPro, addFiles],
  )

  const handleContinueWithFirst = () => {
    const remaining = Math.max(0, FREE_MAX_FILES - items.length)
    addFiles(limitModal.pendingFiles.slice(0, remaining))
    setLimitModal({ open: false, attemptedCount: 0, pendingFiles: [] })
  }

  const handleRemove = (id) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id)
      if (target) URL.revokeObjectURL(target.previewUrl)
      return prev.filter((i) => i.id !== id)
    })
  }

  const handleClearAll = () => {
    items.forEach((item) => URL.revokeObjectURL(item.previewUrl))
    setItems([])
  }

  const handleConvertAll = async () => {
    const targets = items.filter((i) => i.status === 'pending')
    if (targets.length === 0) return

    setIsConverting(true)
    setItems((prev) => prev.map((i) => (i.status === 'pending' ? { ...i, status: 'converting' } : i)))

    await Promise.all(
      targets.map(async (target) => {
        try {
          const blob = await convertToWebp(target.file, quality)
          setItems((prev) => prev.map((i) => (i.id === target.id ? { ...i, status: 'done', webpBlob: blob, webpSize: blob.size } : i)))
        } catch {
          setItems((prev) => prev.map((i) => (i.id === target.id ? { ...i, status: 'error' } : i)))
        }
      }),
    )

    setIsConverting(false)
  }

  const handleDownloadSingle = (item) => {
    if (!item.webpBlob) return
    const url = URL.createObjectURL(item.webpBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = webpFileName(item.file.name)
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handleDownloadZip = async () => {
    const doneItems = items.filter((i) => i.status === 'done' && i.webpBlob)
    if (doneItems.length === 0) return
    setIsZipping(true)
    try {
      await downloadZip(doneItems.map((i) => ({ name: webpFileName(i.file.name), blob: i.webpBlob })))
    } finally {
      setIsZipping(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6">
      <DropZone onFilesAdded={handleFilesAdded} isPro={isPro} />

      <QualitySlider quality={quality} onChange={setQuality} isPro={isPro} onLockedClick={openProModal} />

      <FileList
        items={items}
        onRemove={handleRemove}
        onDownload={handleDownloadSingle}
        onClearAll={handleClearAll}
        onConvertAll={handleConvertAll}
        onDownloadZip={handleDownloadZip}
        isConverting={isConverting}
        isZipping={isZipping}
      />

      <LimitModal
        isOpen={limitModal.open}
        attemptedCount={limitModal.attemptedCount}
        onClose={() => setLimitModal({ open: false, attemptedCount: 0, pendingFiles: [] })}
        onGoPro={() => {
          setLimitModal({ open: false, attemptedCount: 0, pendingFiles: [] })
          openProModal()
        }}
        onContinueWithFirst={handleContinueWithFirst}
      />
    </div>
  )
}
