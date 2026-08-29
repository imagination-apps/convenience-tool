import { AlertCircle, Check, Download, Loader2, X } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { formatBytes } from '../utils/convertToWebp'

const STATUS_STYLES = {
  pending: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
  converting: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
  done: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  error: 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400',
}

export default function FileItem({ item, onRemove, onDownload }) {
  const { t } = useI18n()
  const { previewUrl, file, status, originalSize, webpSize } = item

  const diffPercent = webpSize != null ? Math.round((1 - webpSize / originalSize) * 100) : null

  return (
    <li className="animate-fade-in flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
      <img src={previewUrl} alt="" className="h-12 w-12 shrink-0 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-800" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{file.name}</p>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLES[status]}`}>
            {status === 'converting' && <Loader2 size={11} className="mr-1 inline animate-spin" />}
            {status === 'done' && <Check size={11} className="mr-1 inline" />}
            {status === 'error' && <AlertCircle size={11} className="mr-1 inline" />}
            {t(`list.status.${status}`)}
          </span>
        </div>

        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className={`h-full rounded-full transition-all duration-500 ${status === 'error' ? 'bg-red-400' : 'bg-indigo-500'} ${
              status === 'converting' ? 'animate-pulse' : ''
            }`}
            style={{ width: status === 'pending' ? '0%' : status === 'converting' ? '55%' : '100%' }}
          />
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>
            {t('list.original')}: {formatBytes(originalSize)}
          </span>
          {webpSize != null && (
            <>
              <span className="text-slate-300 dark:text-slate-700">→</span>
              <span>
                {t('list.converted')}: {formatBytes(webpSize)}
              </span>
              <span className={diffPercent >= 0 ? 'font-medium text-emerald-600 dark:text-emerald-400' : 'font-medium text-amber-600 dark:text-amber-400'}>
                ({diffPercent >= 0 ? t('list.saved', { percent: diffPercent }) : t('list.larger', { percent: Math.abs(diffPercent) })})
              </span>
            </>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        {status === 'done' && (
          <button
            type="button"
            onClick={() => onDownload(item)}
            aria-label={t('list.download')}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
          >
            <Download size={16} />
          </button>
        )}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={t('list.remove')}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
        >
          <X size={16} />
        </button>
      </div>
    </li>
  )
}
