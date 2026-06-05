import { GameCardDuplicateButton } from './GameCardDuplicateButton'
import { GameCardOpenHtmlButton } from './GameCardOpenHtmlButton'
import { GameCardPreviewButton } from './GameCardPreviewButton'
import { GameCardShareButton } from './GameCardShareButton'
import { GameCardToggleStatusButton } from './GameCardToggleStatusButton'

export function GameCardActions({
  game,
  duplicateBusy,
  statusBusy,
  onPreview,
  onDuplicate,
  onShare,
  onToggleStatus,
  onOpenHtml,
}) {
  return (
    <div className="studio-actions">
      <GameCardPreviewButton game={game} onPreview={onPreview} />
      <GameCardDuplicateButton game={game} duplicateBusy={duplicateBusy} onDuplicate={onDuplicate} />
      <GameCardShareButton game={game} onShare={onShare} />
      <GameCardToggleStatusButton game={game} statusBusy={statusBusy} onToggleStatus={onToggleStatus} />
      <GameCardOpenHtmlButton game={game} onOpenHtml={onOpenHtml} />
    </div>
  )
}
