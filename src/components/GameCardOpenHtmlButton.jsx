export function GameCardOpenHtmlButton({ game, onOpenHtml }) {
  return (
    <button className="button secondary" type="button" onClick={() => onOpenHtml(game)}>
      Abrir HTML
    </button>
  )
}
