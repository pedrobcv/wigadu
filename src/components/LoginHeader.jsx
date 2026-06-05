import { Link } from 'react-router-dom'
import { LanguageSelector } from './LanguageSelector'

export function LoginHeader({ brandName }) {
  return (
    <header className="auth-header">
      <Link to="/" className="auth-brand">
        <span className="auth-brand-mark">W</span>
        <span className="auth-brand-name">{brandName}</span>
      </Link>
      <LanguageSelector variant="auth" />
    </header>
  )
}
