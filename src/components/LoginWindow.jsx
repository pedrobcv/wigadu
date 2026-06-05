import { LoginWindowContent } from './LoginWindowContent'

export function LoginWindow({
  copy,
  mode,
  setMode,
  displayName,
  setDisplayName,
  email,
  setEmail,
  password,
  setPassword,
  status,
  error,
  busyAction,
  ready,
  isBusy,
  onEmailSubmit,
  onProviderLogin,
  onResetPassword,
}) {
  return (
    <main className="auth-main">
      <section className="auth-window">
        <h1>{copy.auth.title}</h1>

        <LoginWindowContent
          copy={copy}
          mode={mode}
          setMode={setMode}
          displayName={displayName}
          setDisplayName={setDisplayName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          status={status}
          error={error}
          busyAction={busyAction}
          ready={ready}
          isBusy={isBusy}
          onEmailSubmit={onEmailSubmit}
          onProviderLogin={onProviderLogin}
          onResetPassword={onResetPassword}
        />
      </section>
    </main>
  )
}
