import { Link } from 'react-router-dom'

export function LandingGamesSection({ copy }) {
  return (
    <section id="juegos" className="section panel games-section">
      <div className="section-heading row-between">
        <div>
          <span className="eyebrow">{copy.landing.catalog.eyebrow}</span>
          <h2>{copy.landing.catalog.title}</h2>
          <p>{copy.landing.gameDetail.intro}</p>
        </div>
        <Link to="/games" className="button secondary">
          {copy.landing.catalog.cta}
        </Link>
      </div>
      <div className="game-grid">
        {copy.games.map((game) => (
          <Link key={game.slug} to={`/games/${game.slug}`} className="game-card">
            <span className="game-tag">{game.type}</span>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <div className="game-meta">
              <span>{game.mode}</span>
              <span>{game.palette}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
