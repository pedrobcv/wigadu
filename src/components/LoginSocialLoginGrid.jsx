export function LoginSocialLoginGrid({ providers, busyAction, isBusy, connectingLabel, onProviderLogin }) {
  return (
    <div className="social-login-grid">
      {providers.map((item) => (
        <button
          key={item.id}
          className={`social-btn social-${item.id} ${busyAction === item.id ? 'is-busy' : ''}`}
          type="button"
          onClick={() => onProviderLogin(item.id)}
          disabled={isBusy}
          aria-busy={busyAction === item.id}
        >
          <span className="social-icon" aria-hidden="true">
            {busyAction === item.id ? <span className="button-spinner" /> : (
              <>
                {item.id === 'google' && 'G'}
                {item.id === 'microsoft' && '□'}
                {item.id === 'apple' && ''}
                {item.id === 'clever' && 'C'}
              </>
            )}
          </span>
          <span>{busyAction === item.id ? connectingLabel : item.label}</span>
        </button>
      ))}
    </div>
  )
}
