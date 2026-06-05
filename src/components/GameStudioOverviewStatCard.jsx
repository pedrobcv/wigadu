export function GameStudioOverviewStatCard({ stat }) {
  return (
    <article className="studio-stat-card">
      <strong>{stat.value}</strong>
      <span>{stat.label}</span>
    </article>
  )
}
