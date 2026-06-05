export function GamesPageHeader({ copy }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{copy.landing.catalog.eyebrow}</span>
      <h1>{copy.landing.catalog.title}</h1>
      <p>{copy.landing.gameDetail.intro}</p>
    </div>
  )
}
