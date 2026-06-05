import { Link } from 'react-router-dom'

export function AccessNotice({ eyebrow, title, text, ctaLabel, ctaTo = '/login' }) {
  return (
    <section className="section panel access-card">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
      <Link className="button primary" to={ctaTo}>
        {ctaLabel}
      </Link>
    </section>
  )
}
