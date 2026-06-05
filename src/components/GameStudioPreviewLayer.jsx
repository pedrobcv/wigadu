import { StudioPreviewModal } from './StudioPreviewModal'

export function GameStudioPreviewLayer({ preview, studioActions }) {
  return (
    <StudioPreviewModal
      game={preview.previewGame}
      html={preview.previewBusy ? '' : preview.previewHtml}
      shareUrl={preview.previewShareUrl}
      onClose={preview.closePreview}
      onDuplicate={() => preview.previewGame && studioActions.duplicateGame(preview.previewGame)}
      onCopyShare={() => preview.previewGame && studioActions.shareGame(preview.previewGame)}
    />
  )
}
