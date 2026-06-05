import { PreviewModalHeader } from './PreviewModalHeader'
import { PreviewModalActions } from './PreviewModalActions'
import { PreviewModalFrame } from './PreviewModalFrame'

export function StudioPreviewModal({ game, html, shareUrl, onClose, onDuplicate, onCopyShare }) {
  if (!game) return null

  return (
    <div className="preview-modal" role="dialog" aria-modal="true" aria-label={`Previsualización de ${game.title}`}>
      <div className="preview-modal-card panel">
        <PreviewModalHeader game={game} onClose={onClose} />

        <PreviewModalActions game={game} onCopyShare={onCopyShare} onDuplicate={onDuplicate} />

        <PreviewModalFrame game={game} html={html} />
        <p className="muted small-note">
          Enlace compartible: <code>{shareUrl}</code>
        </p>
      </div>
    </div>
  )
}
