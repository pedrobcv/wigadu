import { GameCardDescription } from './GameCardDescription'

export function GameCardSummary({ game }) {
  return (
    <div>
      <h4>{game.title}</h4>
      <GameCardDescription game={game} />
    </div>
  )
}
