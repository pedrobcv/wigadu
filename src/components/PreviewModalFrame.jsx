export function PreviewModalFrame({ game, html }) {
  return (
    <div className="preview-frame-wrap">
      {html ? (
        <iframe
          title={`Vista previa ${game.title}`}
          className="preview-frame"
          sandbox="allow-scripts allow-forms allow-popups allow-modals allow-same-origin"
          srcDoc={html}
        />
      ) : (
        <div className="preview-loading">Cargando previsualización…</div>
      )}
    </div>
  )
}
