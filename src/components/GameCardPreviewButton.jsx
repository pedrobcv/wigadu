export function GameCardPreviewButton({ game, onPreview }) {
  return (
    <button className="button secondary" type="button" onClick={() => onPreview(game)}>
      Probar
    </button>
  )
}
