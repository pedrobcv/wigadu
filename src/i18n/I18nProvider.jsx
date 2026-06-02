import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultLocale, getSiteCopy, supportedLocales } from './messages'

const I18nContext = createContext(null)
const STORAGE_KEY = 'wigadu-locale'

function detectInitialLocale() {
  if (typeof window === 'undefined') return defaultLocale
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && supportedLocales().includes(saved)) return saved
  const browserLang = window.navigator.language?.toLowerCase() ?? ''
  return browserLang.startsWith('en') ? 'en' : defaultLocale
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(detectInitialLocale)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo(() => {
    const copy = getSiteCopy(locale)
    return {
      locale,
      copy,
      setLocale,
      toggleLocale: () => setLocale((current) => (current === 'es' ? 'en' : 'es')),
      isEnglish: locale === 'en',
      isSpanish: locale === 'es',
    }
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider')
  }
  return context
}
