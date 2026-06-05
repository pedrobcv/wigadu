import { GameStudioOverviewHeader } from './GameStudioOverviewHeader'
import { GameStudioStats } from './GameStudioStats'

export function GameStudioOverview({ stats }) {
  return (
    <>
      <GameStudioOverviewHeader />
      <GameStudioStats stats={stats} />
    </>
  )
}
