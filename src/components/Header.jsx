import { ImageDown, Languages, Sparkles } from 'lucide-react'
import { useI18n } from '../i18n/I18nContext'
import { LANGUAGES } from '../i18n/dictionary'

export default function Header({ isPro, onGoPro }) {
  const { t, lang, setLang } = useI18n()

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80 sticky top-0 z-30">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 sm:h-9 sm:w-9">
            <ImageDown size={17} strokeWidth={2.25} />
          </div>
          <div className="min-w-0 leading-tight">
            <h1 className="truncate text-sm font-semibold tracking-tight sm:text-lg">{t('app.title')}</h1>
            <p className="hidden whitespace-nowrap text-xs text-slate-500 dark:text-slate-400 md:block">{t('app.tagline')}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <label className="relative flex items-center">
            <Languages size={14} className="pointer-events-none absolute left-2 text-slate-400 sm:left-2.5" />
            <select
              aria-label="Language"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="w-[5.5rem] appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-6 pr-1.5 text-xs text-slate-700 shadow-sm outline-none transition hover:border-slate-300 focus:ring-2 focus:ring-indigo-500/40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 sm:w-[7.5rem] sm:pl-7 sm:pr-2 sm:text-sm"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>

          {isPro ? (
            <span className="flex items-center gap-1 whitespace-nowrap rounded-lg bg-amber-100 px-2.5 py-1.5 text-xs font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 sm:px-3">
              <Sparkles size={13} />
              {t('header.proBadge')}
            </span>
          ) : (
            <button
              type="button"
              onClick={onGoPro}
              className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-lg bg-gradient-to-b from-indigo-500 to-indigo-600 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-indigo-600/30 transition hover:from-indigo-500 hover:to-indigo-700 active:scale-[0.98] sm:gap-1.5 sm:px-3.5 sm:text-sm"
            >
              <Sparkles size={13} />
              {t('header.goPro')}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
