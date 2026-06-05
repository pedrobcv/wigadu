import { GameCardContent } from './GameCardContent'

export function GameCard({
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
    <article className="studio-card">
      <GameCardContent
        game={game}
        shareUrl={shareUrl}
        createdAtLabel={createdAtLabel}
        fileSizeLabel={fileSizeLabel}
        duplicateBusy={duplicateBusy}
        statusBusy={statusBusy}
        onPreview={onPreview}
        onDuplicate={onDuplicate}
        onShare={onShare}
        onToggleStatus={onToggleStatus}
        onOpenHtml={onOpenHtml}
      />
    </article>
  )
}
