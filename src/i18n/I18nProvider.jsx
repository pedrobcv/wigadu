import { createContext, useContext, useMemo } from 'react'
import { getSiteCopy } from './messages'
import { useLocaleState } from '../hooks/useLocaleState'

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [locale, setLocale] = useLocaleState()

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
  }, [locale, setLocale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider')
  }
  return context
}
