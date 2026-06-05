export function LoginAuthActions({ mode, email, password, isBusy, busyAction, copy, onResetPassword, onToggleMode }) {
  return (
    <>
      <button className="trouble-link" type="button" onClick={onResetPassword} disabled={isBusy}>
        {busyAction === 'reset' ? copy.auth.connecting : copy.auth.trouble}
      </button>

      <button className={`login-btn ${isBusy ? 'is-busy' : ''}`} type="submit" disabled={isBusy || !email || !password}>
        <span className="button-label">
          {busyAction === 'signup'
            ? copy.auth.creatingUser
            : busyAction === 'signin'
              ? copy.auth.signingIn
              : mode === 'signup'
                ? copy.auth.createUser
                : copy.auth.login}
        </span>
        {isBusy ? <span className="button-spinner" aria-hidden="true" /> : null}
      </button>

      <p className="signup-text">
        {mode === 'signin' ? copy.auth.signupPrompt : copy.auth.signin}
        {' '}
        <button className="link-button" type="button" onClick={onToggleMode}>
          {mode === 'signin' ? copy.auth.createAccount : copy.auth.signin}
        </button>
      </p>

      <p className="legal-text">{copy.auth.terms}</p>
    </>
  )
}
