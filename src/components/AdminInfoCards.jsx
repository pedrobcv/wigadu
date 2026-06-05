export function AdminInfoCards({ copy, user }) {
  return (
    <div className="admin-columns">
      <article className="info-card">
        <h3>{copy.admin.users}</h3>
        <p>{copy.admin.usersText}</p>
        <p className="muted small-note">{user ? `${copy.admin.sessionLabel}: ${user.email || user.uid}` : copy.admin.usersHint}</p>
      </article>
      <article className="info-card">
        <h3>{copy.admin.games}</h3>
        <p>{copy.admin.gamesText}</p>
      </article>
      <article className="info-card">
        <h3>{copy.admin.firebase}</h3>
        <p>{copy.admin.firebaseReady ? copy.admin.firebaseReady : copy.admin.firebaseMissing}</p>
      </article>
    </div>
  )
}
