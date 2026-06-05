export function PreviewModalHeader({ game, onClose }) {
  return (
    <div className="preview-modal-header">
      <div>
        <span className="eyebrow">Probar juego</span>
        <h3>{game.title}</h3>
        <p>{game.description}</p>
      </div>
      <button className="button secondary" type="button" onClick={onClose}>
        Cerrar
      </button>
    </div>
  )
}
