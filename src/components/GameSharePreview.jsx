export function GameSharePreview({ loading, error, html, title, copy }) {
  return (
    <div className="preview-frame-wrap share-frame-wrap">
      {loading ? <div className="preview-loading">Cargando juego…</div> : null}
      {error ? <div className="preview-loading error">{error}</div> : null}
      {!loading && !error && html ? (
        <iframe
          title={title}
          className="preview-frame"
          sandbox="allow-scripts allow-forms allow-popups allow-modals allow-same-origin"
          srcDoc={html}
        />
      ) : null}
    </div>
  )
}
