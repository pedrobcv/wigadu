import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'

export function ShellBrand() {
  const { copy } = useI18n()

  return (
    <Link to="/" className="brand kahoot-brand">
      <span className="brand-mark">W</span>
      <span>
        <strong>{copy.brand.name}</strong>
        <small>{copy.brand.tagline}</small>
      </span>
    </Link>
  )
}
