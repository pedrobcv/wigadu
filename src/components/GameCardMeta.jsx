export function GameCardMeta({ game, createdAtLabel }) {
  return (
    <div className="studio-card-meta">
      <span>{game.audience || '—'}</span>
      <span>{game.library || 'Sin librerías declaradas'}</span>
      <span>{createdAtLabel}</span>
    </div>
  )
}
