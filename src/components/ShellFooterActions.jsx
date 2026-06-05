import { Link } from 'react-router-dom'

export function ShellFooterActions({ nav }) {
  return (
    <div className="footer-actions">
      <Link to="/login" className="button secondary">
        {nav.startFree ?? 'Empezar gratis'}
      </Link>
    </div>
  )
}
