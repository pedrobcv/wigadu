import { GameStudioLibraryHeader } from './GameStudioLibraryHeader'
import { GameStudioLibraryContent } from './GameStudioLibraryContent'

export function GameStudioLibrary({
  games,
  activeActionId,
  onPreview,
  onDuplicate,
  onShare,
  onToggleStatus,
  onOpenHtml,
}) {
  return (
    <div className="studio-list panel">
      <GameStudioLibraryHeader count={games.length} />

      <GameStudioLibraryContent
        games={games}
        activeActionId={activeActionId}
        onPreview={onPreview}
        onDuplicate={onDuplicate}
        onShare={onShare}
        onToggleStatus={onToggleStatus}
        onOpenHtml={onOpenHtml}
      />
    </div>
  )
}
