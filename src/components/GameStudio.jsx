import { StudioPreviewModal } from './StudioPreviewModal'
import { GameUploadForm } from './GameUploadForm'
import { GameStudioOverview } from './GameStudioOverview'
import { GameStudioLibrary } from './GameStudioLibrary'
import { GameStudioMainLayout } from './GameStudioMainLayout'
import { GameStudioPreviewLayer } from './GameStudioPreviewLayer'
import { useGameStudioPanel } from '../hooks/useGameStudioPanel'

export function GameStudioPanel({ user }) {
  const { form, setForm, setHtmlFile, busy, message, error, activeActionId, ready, games, stats, uploadGame, preview, studioActions } = useGameStudioPanel(user)

  const formProps = { form, setForm, setHtmlFile, busy, message, error, ready, onSubmit: uploadGame }
  const libraryProps = {
    games,
    activeActionId,
    onPreview: studioActions.openPreview,
    onDuplicate: studioActions.duplicateGame,
    onShare: studioActions.shareGame,
    onToggleStatus: studioActions.toggleStatus,
    onOpenHtml: studioActions.openDirectHtml,
  }

  return (
    <section className="section panel games-studio">
      <GameStudioOverview stats={stats} />
      <GameStudioMainLayout formProps={formProps} libraryProps={libraryProps} />
      <GameStudioPreviewLayer preview={preview} studioActions={studioActions} />
    </section>
  )
}
