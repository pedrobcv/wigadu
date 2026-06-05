import { GameCard } from './GameCard'
import { buildGameShareUrl, humanFileSize, nowLabel } from '../lib/gameStudio'

export function GameStudioLibraryItem({ game, activeActionId, onPreview, onDuplicate, onShare, onToggleStatus, onOpenHtml }) {
  const shareUrl = buildGameShareUrl(game)

  return (
    <GameCard
      game={game}
      shareUrl={shareUrl}
      createdAtLabel={nowLabel(game.createdAt?.toDate?.() ?? game.createdAt)}
      fileSizeLabel={humanFileSize(game.fileSize)}
      duplicateBusy={activeActionId === `duplicate-${game.id}`}
      statusBusy={activeActionId === `status-${game.id}`}
      onPreview={onPreview}
      onDuplicate={onDuplicate}
      onShare={onShare}
      onToggleStatus={onToggleStatus}
      onOpenHtml={onOpenHtml}
    />
  )
}
