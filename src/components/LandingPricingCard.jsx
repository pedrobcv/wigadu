import { LandingPricingActions } from './LandingPricingActions'
import { LandingPricingMockup } from './LandingPricingMockup'

export function LandingPricingCard({ product, learnMoreHref, mockupQuestion, mockupOptions }) {
  return (
    <article className={`product-card accent-${product.accent}`}>
      <span className="product-badge">{product.badge}</span>
      <h3>{product.title}</h3>
      <p>{product.subtitle}</p>
      <p>{product.copy}</p>
      <div className="price-block">
        <strong>{product.price}</strong>
        <span>{product.offer}</span>
      </div>
      <LandingPricingActions learnMoreHref={learnMoreHref} cta={product.cta} learnMore={product.learnMore} />
      <LandingPricingMockup
        accent={product.accent}
        kind={product.mockup}
        question={mockupQuestion}
        options={mockupOptions}
      />
    </article>
  )
}
