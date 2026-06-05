export function DashboardHeader({ copy }) {
  return (
    <div>
      <span className="eyebrow">{copy.dashboard.eyebrow}</span>
      <h1>{copy.dashboard.title}</h1>
      <p>{copy.dashboard.text}</p>
    </div>
  )
}
