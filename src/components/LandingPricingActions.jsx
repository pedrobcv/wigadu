import { Link } from 'react-router-dom'

export function LandingPricingActions({ learnMoreHref, cta, learnMore }) {
  return (
    <div className="hero-actions product-actions">
      <Link to="/login" className="button product-primary">
        {cta}
      </Link>
      <Link to={learnMoreHref} className="button product-secondary">
        {learnMore}
      </Link>
    </div>
  )
}
