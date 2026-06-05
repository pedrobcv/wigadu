import { GameCardActions } from './GameCardActions'
import { GameCardBadges } from './GameCardBadges'
import { GameCardLinks } from './GameCardLinks'
import { GameCardMeta } from './GameCardMeta'
import { GameCardSummary } from './GameCardSummary'

export function GameCardContent({
  game,
  shareUrl,
  createdAtLabel,
  fileSizeLabel,
  duplicateBusy,
  statusBusy,
  onPreview,
  onDuplicate,
  onShare,
  onToggleStatus,
  onOpenHtml,
}) {
  return (
    <>
      <div className="studio-card-main">
        <GameCardSummary game={game} />
        <GameCardBadges game={game} fileSizeLabel={fileSizeLabel} />
      </div>

      <GameCardMeta game={game} createdAtLabel={createdAtLabel} />

      <GameCardActions
        game={game}
        duplicateBusy={duplicateBusy}
        statusBusy={statusBusy}
        onPreview={onPreview}
        onDuplicate={onDuplicate}
        onShare={onShare}
        onToggleStatus={onToggleStatus}
        onOpenHtml={onOpenHtml}
      />

      <GameCardLinks slug={game.slug} shareUrl={shareUrl} />
    </>
  )
}
