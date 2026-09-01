import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { useProStatusContext } from '../context/ProStatusContext'
import { trackPurchaseOnce } from '../utils/analytics'

export default function Success() {
  const { t } = useI18n()
  const { isPro } = useProStatusContext()

  useEffect(() => {
    trackPurchaseOnce()
  }, [])

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
        <CheckCircle2 size={32} strokeWidth={2} />
      </div>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">{t('success.heading')}</h1>
      <p className="mt-3 text-lg font-medium text-slate-600 dark:text-slate-300">{t('success.subheading')}</p>

      <div className="mt-5 flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1.5 text-sm font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
        <Sparkles size={14} />
        {isPro ? t('success.badgeActive') : t('success.badgePending')}
      </div>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">{t('success.body')}</p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-indigo-500 to-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:from-indigo-500 hover:to-indigo-700 active:scale-[0.99]"
      >
        {t('success.cta')}
        <ArrowRight size={18} />
      </Link>
    </div>
  )
}
