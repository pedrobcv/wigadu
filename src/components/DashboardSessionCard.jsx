export function DashboardSessionCard({ copy, user, onSignOut }) {
  return (
    <div className="session-card">
      <strong>{user.displayName || copy.dashboard.accountLabel}</strong>
      <span>{user.email}</span>
      <button className="button secondary" type="button" onClick={onSignOut}>
        {copy.nav.logout}
      </button>
    </div>
  )
}
