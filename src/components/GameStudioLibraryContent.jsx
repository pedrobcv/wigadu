import { EmptyLibraryState } from './EmptyLibraryState'
import { GameStudioLibraryItem } from './GameStudioLibraryItem'

export function GameStudioLibraryContent({
  games,
  activeActionId,
  onPreview,
  onDuplicate,
  onShare,
  onToggleStatus,
  onOpenHtml,
}) {
  return (
    <div className="studio-list-items">
      {games.length === 0 ? (
        <EmptyLibraryState />
      ) : (
        games.map((game) => (
          <GameStudioLibraryItem
            key={game.id}
            game={game}
            activeActionId={activeActionId}
            onPreview={onPreview}
            onDuplicate={onDuplicate}
            onShare={onShare}
            onToggleStatus={onToggleStatus}
            onOpenHtml={onOpenHtml}
          />
        ))
      )}
    </div>
  )
}
