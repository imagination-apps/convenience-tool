import { useState } from 'react'
import { Check, ChevronDown, ExternalLink, Sparkles, X } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { STRIPE_PAYMENT_LINK } from '../config'

export default function ProModal({ isOpen, onClose, isPro, onActivateCode }) {
  const { t } = useI18n()
  const [showCodeField, setShowCodeField] = useState(false)
  const [code, setCode] = useState('')
  const [feedback, setFeedback] = useState(null) // 'success' | 'invalid' | null

  if (!isOpen) return null

  const handleApplyCode = () => {
    const ok = onActivateCode(code)
    setFeedback(ok ? 'success' : 'invalid')
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pro-modal-title"
      >
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-sm">
            <Sparkles size={20} />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('proModal.close')}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          >
            <X size={18} />
          </button>
        </div>

        {isPro ? (
          <>
            <h2 id="pro-modal-title" className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              {t('proModal.alreadyPro')}
            </h2>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{t('proModal.alreadyProBody')}</p>
          </>
        ) : (
          <>
            <h2 id="pro-modal-title" className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              {t('proModal.title')}
            </h2>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{t('proModal.subtitle')}</p>

            <ul className="mt-4 space-y-2">
              {['featureBatch', 'featureQuality', 'featureFuture'].map((key) => (
                <li key={key} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {t(`proModal.${key}`)}
                </li>
              ))}
            </ul>

            <a
              href={STRIPE_PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:from-indigo-500 hover:to-indigo-700 active:scale-[0.99]"
            >
              {t('proModal.buy')}
              <ExternalLink size={15} />
            </a>
            <p className="mt-1.5 text-center text-xs text-slate-400 dark:text-slate-500">{t('proModal.buyHint')}</p>

            {/* Hidden-by-default manual license/promo entry, for buyers returning without the auto-activation query params. */}
            <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShowCodeField((v) => !v)}
                className="flex w-full items-center justify-between text-xs font-medium text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
              >
                {t('proModal.or')}
                <ChevronDown size={14} className={`transition-transform ${showCodeField ? 'rotate-180' : ''}`} />
              </button>

              {showCodeField && (
                <div className="mt-3 animate-fade-in">
                  <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">{t('proModal.licenseLabel')}</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => {
                        setCode(e.target.value)
                        setFeedback(null)
                      }}
                      placeholder={t('proModal.licensePlaceholder')}
                      className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 dark:border-slate-700 dark:bg-slate-800"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCode}
                      className="shrink-0 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                    >
                      {t('proModal.licenseApply')}
                    </button>
                  </div>
                  {feedback === 'invalid' && <p className="mt-1.5 text-xs text-red-500">{t('proModal.licenseInvalid')}</p>}
                  {feedback === 'success' && <p className="mt-1.5 text-xs text-emerald-600 dark:text-emerald-400">{t('proModal.licenseSuccess')}</p>}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
