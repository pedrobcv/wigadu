export function GameCardDuplicateButton({ game, duplicateBusy, onDuplicate }) {
  return (
    <button className="button secondary" type="button" onClick={() => onDuplicate(game)} disabled={duplicateBusy}>
      {duplicateBusy ? 'Duplicando...' : 'Duplicar'}
    </button>
  )
}
