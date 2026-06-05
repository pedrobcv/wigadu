import { Link } from 'react-router-dom'

export function ShellAuthLoggedInActions({ isAdminUser, onSignOut, nav }) {
  return (
    <>
      <Link to="/dashboard" className="nav-link nav-main-link">
        {nav.dashboard}
      </Link>
      {isAdminUser ? (
        <Link to="/admin" className="nav-link nav-main-link">
          {nav.admin}
        </Link>
      ) : null}
      <button className="nav-cta nav-button" type="button" onClick={onSignOut}>
        {nav.logout}
      </button>
    </>
  )
}
