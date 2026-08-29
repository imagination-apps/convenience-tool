import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { dictionary } from './dictionary'

const STORAGE_KEY = 'webp_converter_lang'
const DEFAULT_LANG = 'en'

const I18nContext = createContext(null)

function detectInitialLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && dictionary[stored]) return stored
  } catch {
    // localStorage unavailable (private mode, etc.) — fall through to default
  }
  return DEFAULT_LANG
}

// Resolves `path` (e.g. "list.status.done") inside the given language table,
// falling back to English, then to the raw path so a typo is visible instead of blank.
function resolve(lang, path) {
  const lookup = (table) => path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), table)
  return lookup(dictionary[lang]) ?? lookup(dictionary[DEFAULT_LANG]) ?? path
}

function interpolate(str, vars) {
  if (!vars) return str
  return Object.entries(vars).reduce((acc, [key, value]) => acc.replaceAll(`{${key}}`, String(value)), str)
}

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLang)

  const setLang = useCallback((next) => {
    if (!dictionary[next]) return
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore write failures — language just won't persist across reloads
    }
  }, [])

  const t = useCallback(
    (path, vars) => interpolate(resolve(lang, path), vars),
    [lang],
  )

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
