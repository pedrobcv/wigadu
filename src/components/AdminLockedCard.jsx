export function AdminLockedCard({ copy }) {
  return (
    <section className="section panel admin-page">
      <div className="access-card locked-card">
        <span className="eyebrow">{copy.admin.eyebrow}</span>
        <h1>{copy.admin.lockedTitle}</h1>
        <p>{copy.admin.lockedText}</p>
        <p className="muted small-note">{copy.admin.lockedHint}</p>
      </div>
    </section>
  )
}
