import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'

const LEGAL_LINKS = [
  { to: '/tokushoho', key: 'footer.tokushoho' },
  { to: '/terms', key: 'footer.terms' },
  { to: '/privacy', key: 'footer.privacyPolicy' },
]

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="mx-auto max-w-5xl px-4 pb-10 pt-6 text-center text-xs text-slate-400 dark:text-slate-500 sm:px-6">
      <p>{t('footer.privacy')}</p>
      <nav className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5" aria-label="Legal">
        {LEGAL_LINKS.map((link, i) => (
          <span key={link.to} className="flex items-center gap-x-3">
            {i > 0 && <span className="text-slate-300 dark:text-slate-700">·</span>}
            <Link to={link.to} className="underline-offset-2 transition hover:text-slate-600 hover:underline dark:hover:text-slate-300">
              {t(link.key)}
            </Link>
          </span>
        ))}
      </nav>
    </footer>
  )
}
