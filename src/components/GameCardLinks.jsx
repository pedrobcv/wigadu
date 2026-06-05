export function GameCardLinks({ slug, shareUrl }) {
  return (
    <div className="studio-card-links">
      <span>
        Slug: <code>{slug}</code>
      </span>
      <span>
        Share: <code>{shareUrl || '—'}</code>
      </span>
    </div>
  )
}
