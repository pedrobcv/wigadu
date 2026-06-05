export function GameShareNotes({ shareUrl }) {
  return (
    <>
      <p className="muted small-note">
        Enlace actual: <code>{shareUrl}</code>
      </p>
      <p className="muted small-note">
        Si quieres que estudiantes entren sin login, este enlace usa la URL pública del HTML subido a Storage.
      </p>
    </>
  )
}
