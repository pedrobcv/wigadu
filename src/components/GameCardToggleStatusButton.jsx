export function GameCardToggleStatusButton({ game, statusBusy, onToggleStatus }) {
  return (
    <button className="button secondary" type="button" onClick={() => onToggleStatus(game)} disabled={statusBusy}>
      {game.status === 'draft' ? 'Publicar' : 'Ocultar'}
    </button>
  )
}
