export function LandingAboutSection({ landing, copy }) {
  return (
    <section id="acerca" className="section panel about-section">
      <div className="section-heading section-heading-wide">
        <span className="eyebrow">{copy.brand.name}</span>
        <h2>{landing.about.title}</h2>
        <p>{landing.about.text}</p>
      </div>
      <div className="about-layout">
        <div className="about-copy">
          <div className="hero-badges about-badges">
            {landing.about.badges.map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
          <div className="timeline about-timeline">
            {landing.steps.map((step, index) => (
              <div key={step} className="timeline-item">
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="about-grid">
          {landing.about.cards.map((item) => (
            <article key={item.title} className="about-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
