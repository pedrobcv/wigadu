export function LoginFeedbackPanel({ firebaseReady, copy, providers, status, error }) {
  return (
    <div className="auth-feedback">
      <p className="muted">{firebaseReady ? copy.auth.authReady : copy.auth.authMissing}</p>
      {providers.map((item) => (
        <p key={item.id} className="muted small-note">
          {item.hint}
        </p>
      ))}
      {status ? <p className="status success">{status}</p> : null}
      {error ? <p className="status error">{error}</p> : null}
    </div>
  )
}
