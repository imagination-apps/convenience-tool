import { Layers, Sparkles, X } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { FREE_MAX_FILES } from '../config'

export default function LimitModal({ isOpen, attemptedCount, onClose, onGoPro, onContinueWithFirst }) {
  const { t } = useI18n()
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm" onClick={onClose} role="presentation">
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="limit-modal-title"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
            <Layers size={20} />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        <h2 id="limit-modal-title" className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
          {t('limitModal.title')}
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          {t('limitModal.body', { max: FREE_MAX_FILES, count: attemptedCount })}
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="button"
            onClick={onGoPro}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:from-indigo-500 hover:to-indigo-700"
          >
            <Sparkles size={15} />
            {t('limitModal.cta')}
          </button>
          <button
            type="button"
            onClick={onContinueWithFirst}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {t('limitModal.dismiss', { max: FREE_MAX_FILES })}
          </button>
        </div>
      </div>
    </div>
  )
}
