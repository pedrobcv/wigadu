import { Link } from 'react-router-dom'

export function ShellAuthLoggedOutActions({ nav }) {
  return (
    <>
      <Link to="/login" className="nav-cta nav-button">
        {nav.startFree}
      </Link>
      <Link to="/login" className="nav-link nav-main-link">
        {nav.login}
      </Link>
    </>
  )
}
