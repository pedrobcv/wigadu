export function DashboardStatsGrid({ stats }) {
  return (
    <div className="stats-grid">
      {stats.map((stat) => (
        <article key={stat.label}>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </article>
      ))}
    </div>
  )
}
