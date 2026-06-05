export function GameDetailPlayer({ copy }) {
  return (
    <div className="game-player">
      <div className="placeholder-stage">
        <strong>{copy.landing.gameDetail.playLabel}</strong>
        <p>{copy.landing.gameDetail.engineText}</p>
      </div>
      <div className="hero-actions">
        <button className="button primary" type="button">
          {copy.landing.gameDetail.open}
        </button>
        <button className="button secondary" type="button">
          {copy.landing.gameDetail.download}
        </button>
      </div>
    </div>
  )
}
