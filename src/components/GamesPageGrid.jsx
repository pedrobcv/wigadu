import { Link } from 'react-router-dom'

export function GamesPageGrid({ games }) {
  return (
    <div className="game-grid">
      {games.map((game) => (
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
  )
}
