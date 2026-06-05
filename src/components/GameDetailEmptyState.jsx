import { Link } from 'react-router-dom'

export function GameDetailEmptyState({ copy }) {
  return (
    <section className="section panel">
      <h1>{copy.landing.catalog.empty}</h1>
      <p>{copy.landing.gameDetail.missingText}</p>
      <Link to="/games" className="button secondary">
        {copy.landing.catalog.back}
      </Link>
    </section>
  )
}
