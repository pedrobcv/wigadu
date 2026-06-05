export function GameUploadReadyNotice({ ready }) {
  return (
    <p className="muted small-note">{ready ? 'Firebase Storage y Firestore listos.' : 'Falta configurar Firebase.'}</p>
  )
}
