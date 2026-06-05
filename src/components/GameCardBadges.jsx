import { GameCardStatusBadge } from './GameCardStatusBadge'
import { GameCardEngineBadge } from './GameCardEngineBadge'

export function GameCardBadges({ game, fileSizeLabel }) {
  return (
    <div className="studio-badges">
      <GameCardStatusBadge game={game} />
      <GameCardEngineBadge game={game} />
      <span>{fileSizeLabel}</span>
    </div>
  )
}
