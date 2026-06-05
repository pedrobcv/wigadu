export function LandingStoriesSection({ landing, copy }) {
  return (
    <section id="historias" className="section panel stories-section">
      <div className="section-heading section-heading-wide">
        <span className="eyebrow">{copy.nav.stories}</span>
        <h2>{landing.stories.title}</h2>
        <p>{landing.stories.text}</p>
      </div>
      <div className="story-grid">
        {landing.stories.items.map((story) => (
          <article key={story.author} className="story-card">
            <div className="story-quote">“{story.quote}”</div>
            <div className="story-footer">
              <div>
                <strong>{story.author}</strong>
                <span>{story.role}</span>
              </div>
              <span className="story-result">{story.result}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
