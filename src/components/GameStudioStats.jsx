import { GameStudioOverviewStatCard } from './GameStudioOverviewStatCard'

export function GameStudioStats({ stats }) {
  return (
    <div className="studio-stats-grid">
      {stats.map((stat) => (
        <GameStudioOverviewStatCard key={stat.label} stat={stat} />
      ))}
    </div>
  )
}
