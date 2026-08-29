import { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { FREE_MAX_FILES } from '../config'

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/tiff', 'image/webp']

export default function DropZone({ onFilesAdded, isPro }) {
  const { t } = useI18n()
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  const filterImages = (fileList) => Array.from(fileList).filter((f) => ACCEPTED_TYPES.includes(f.type) || /\.(png|jpe?g|gif|bmp|tiff?|webp)$/i.test(f.name))

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = filterImages(e.dataTransfer.files)
    if (files.length) onFilesAdded(files)
  }

  const handleSelect = (e) => {
    const files = filterImages(e.target.files)
    if (files.length) onFilesAdded(files)
    e.target.value = ''
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault()
        setIsDragging(true)
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-12 text-center transition ${
        isDragging
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10'
          : 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-indigo-50/40 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-500 dark:hover:bg-indigo-500/5'
      }`}
    >
      <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleSelect} />
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full transition ${
          isDragging ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400'
        }`}
      >
        <UploadCloud size={26} strokeWidth={1.75} />
      </div>
      <p className="text-base font-medium text-slate-800 dark:text-slate-100">{t('dropzone.title')}</p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{t('dropzone.subtitle')}</p>
      <span className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition group-hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:group-hover:bg-slate-200">
        {t('dropzone.button')}
      </span>
      {!isPro && <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">{t('dropzone.hint', { max: FREE_MAX_FILES })}</p>}
    </div>
  )
}
