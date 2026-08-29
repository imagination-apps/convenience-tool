import { Archive, ImagePlus, Loader2, Trash2 } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import FileItem from './FileItem'

export default function FileList({ items, onRemove, onDownload, onClearAll, onConvertAll, onDownloadZip, isConverting, isZipping }) {
  const { t } = useI18n()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-12 text-center text-sm text-slate-400 dark:border-slate-800 dark:text-slate-500">
        <ImagePlus size={22} className="mb-2 opacity-60" />
        {t('list.empty')}
      </div>
    )
  }

  const doneCount = items.filter((i) => i.status === 'done').length
  const pendingCount = items.filter((i) => i.status === 'pending').length
  const hasDone = doneCount > 0

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/40">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('list.heading', { count: items.length })}</h2>
        <button
          type="button"
          onClick={onClearAll}
          className="flex items-center gap-1 text-xs font-medium text-slate-400 transition hover:text-red-500"
        >
          <Trash2 size={13} />
          {t('list.clear')}
        </button>
      </div>

      <ul className="thin-scrollbar flex max-h-[26rem] flex-col gap-2 overflow-y-auto pr-1">
        {items.map((item) => (
          <FileItem key={item.id} item={item} onRemove={onRemove} onDownload={onDownload} />
        ))}
      </ul>

      <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4 dark:border-slate-800 sm:flex-row">
        <button
          type="button"
          onClick={onConvertAll}
          disabled={isConverting || pendingCount === 0}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/25 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none dark:disabled:bg-slate-700"
        >
          {isConverting && <Loader2 size={16} className="animate-spin" />}
          {isConverting ? t('actions.converting') : t('actions.convertAll')}
        </button>

        <button
          type="button"
          onClick={onDownloadZip}
          disabled={!hasDone || isZipping}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:disabled:text-slate-600"
        >
          {isZipping ? <Loader2 size={16} className="animate-spin" /> : <Archive size={16} />}
          {isZipping ? t('actions.preparingZip') : t('actions.downloadZip')}
        </button>
      </div>
    </div>
  )
}
