export function GameDetailHero({ game, copy }) {
  return (
    <div>
      <span className="eyebrow">{copy.landing.gameDetail.viewLabel}</span>
      <h1>{game.title}</h1>
      <p>{game.description}</p>
      <div className="hero-badges">
        <span>{game.type}</span>
        <span>{game.mode}</span>
        <span>{game.palette}</span>
      </div>
    </div>
  )
}
