import { LandingPricingCard } from './LandingPricingCard'

export function LandingPricingSection({ copy, landing }) {
  return (
    <section id="precios" className="section panel pricing-section">
      <div className="section-heading section-heading-wide">
        <span className="eyebrow">{copy.nav.prices}</span>
        <h2>{landing.pricing.title}</h2>
        <p>{landing.pricing.text}</p>
      </div>
      <div className="product-row">
        {landing.productCards.map((product, index) => (
          <LandingPricingCard
            key={product.title}
            product={product}
            learnMoreHref={index === 1 ? `/games/${copy.games[0].slug}` : '/games'}
            mockupQuestion={
              product.mockup === 'quiz'
                ? copy.landing.mockups.quizQuestion
                : product.mockup === 'chart'
                  ? copy.landing.mockups.chartQuestion
                  : ''
            }
            mockupOptions={copy.landing.mockups.quizOptions}
          />
        ))}
      </div>
    </section>
  )
}
