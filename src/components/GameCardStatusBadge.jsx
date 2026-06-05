import { gameStatusLabel } from '../lib/gameStudio'

export function GameCardStatusBadge({ game }) {
  return <span>{gameStatusLabel(game.status)}</span>
}
