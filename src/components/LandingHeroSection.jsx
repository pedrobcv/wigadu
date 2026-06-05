export function LandingHeroSection({ landing }) {
  return (
    <section className="hero kahoot-hero">
      <div className="hero-copy kahoot-hero-copy">
        <h1>{landing.heroTitle}</h1>
        <p>{landing.heroText}</p>
        <div className="hero-badges kahoot-badges">
          {landing.heroBadges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
