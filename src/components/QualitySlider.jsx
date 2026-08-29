import { Lock, SlidersHorizontal } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'

export default function QualitySlider({ quality, onChange, isPro, onLockedClick }) {
  const { t } = useI18n()
  const percent = Math.round(quality * 100)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          <SlidersHorizontal size={15} className="text-slate-400" />
          {t('quality.label')}
        </div>
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-sm font-semibold tabular-nums text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {percent}%
        </span>
      </div>

      <div className="relative mt-4">
        <input
          type="range"
          min={10}
          max={100}
          step={1}
          value={percent}
          disabled={!isPro}
          onClick={!isPro ? onLockedClick : undefined}
          onChange={(e) => isPro && onChange(Number(e.target.value) / 100)}
          className={`h-2 w-full appearance-none rounded-full bg-slate-200 accent-indigo-600 dark:bg-slate-700 ${
            isPro ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
          }`}
        />
      </div>

      {!isPro && (
        <button
          type="button"
          onClick={onLockedClick}
          className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 transition hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
        >
          <Lock size={12} />
          {t('quality.locked', { value: percent })} · {t('quality.unlock')}
        </button>
      )}
    </div>
  )
}
