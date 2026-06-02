import { useI18n } from '../i18n/I18nProvider'

export function LanguageSelector({ variant = 'topbar' }) {
  const { locale, setLocale, copy } = useI18n()

  return (
    <label className={`language-selector language-${variant}`}>
      <span className="language-label">{copy.localeLabel}</span>
      <select value={locale} onChange={(event) => setLocale(event.target.value)}>
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </label>
  )
}
