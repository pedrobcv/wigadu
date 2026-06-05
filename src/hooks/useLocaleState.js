import { useEffect, useState } from 'react'
import { defaultLocale, supportedLocales } from '../i18n/messages'

const STORAGE_KEY = 'wigadu-locale'

function detectInitialLocale() {
  if (typeof window === 'undefined') return defaultLocale
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && supportedLocales().includes(saved)) return saved
  const browserLang = window.navigator.language?.toLowerCase() ?? ''
  return browserLang.startsWith('en') ? 'en' : defaultLocale
}

export function useLocaleState() {
  const [locale, setLocale] = useState(detectInitialLocale)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  return [locale, setLocale]
}
