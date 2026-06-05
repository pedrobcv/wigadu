export function LandingPricingMockup({ accent, kind, question, options }) {
  return (
    <div className={`mockup mockup-${accent}`}>
      {kind === 'season' ? (
        <div className="mockup-content mockup-plus">
          <div className="mockup-season" />
        </div>
      ) : kind === 'quiz' ? (
        <div className="mockup-content mockup-one">
          <div className="mockup-question">{question}</div>
          <div className="mockup-grid-quiz">
            {options.map((option) => (
              <span key={option}>{option}</span>
            ))}
          </div>
        </div>
      ) : (
        <div className="mockup-content mockup-360">
          <div className="mockup-question">{question}</div>
          <div className="mockup-chart">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}
    </div>
  )
}
