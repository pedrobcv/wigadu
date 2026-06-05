export function PreviewModalActions({ onCopyShare, onDuplicate, game }) {
  return (
    <div className="preview-actions-row">
      <button className="button primary" type="button" onClick={onCopyShare}>
        Copiar enlace
      </button>
      <button className="button secondary" type="button" onClick={onDuplicate}>
        Duplicar
      </button>
      <a className="button secondary" href={game.htmlUrl} target="_blank" rel="noreferrer">
        Abrir HTML
      </a>
    </div>
  )
}
