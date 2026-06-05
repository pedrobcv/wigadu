import { Link } from 'react-router-dom'

export function LandingCtaSection({ landing, copy }) {
  return (
    <section className="section panel cta">
      <div>
        <span className="eyebrow">{copy.brand.name}</span>
        <h2>{copy.brand.tagline}</h2>
      </div>
      <Link to="/login" className="button primary">
        {landing.heroCtas.primary}
      </Link>
    </section>
  )
}
