export function GameUploadSubmitRow({ busy }) {
  return (
    <div className="studio-submit-row">
      <button className="button primary" type="submit" disabled={busy}>
        {busy ? 'Subiendo...' : 'Subir juego'}
      </button>
      <p className="muted small-note">
        El archivo debe ser un único HTML autocontenido; si usa recursos externos, mejor que vengan embebidos o por CDN.
      </p>
    </div>
  )
}
