export function GameCardShareButton({ game, onShare }) {
  return (
    <button className="button secondary" type="button" onClick={() => onShare(game)}>
      Compartir
    </button>
  )
}
