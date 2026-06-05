export function GameShareHeader({ copy, src, onCopyShare }) {
  return (
    <div className="share-page-header">
      <div>
        <span className="eyebrow">{copy.brand.name}</span>
        <h1>Juego compartido</h1>
        <p>{copy.footer?.text ?? copy.brand.tagline}</p>
      </div>
      <div className="hero-actions">
        <button className="button secondary" type="button" onClick={onCopyShare}>
          Copiar enlace
        </button>
        <a className="button primary" href={src} target="_blank" rel="noreferrer">
          Abrir HTML
        </a>
      </div>
    </div>
  )
}
