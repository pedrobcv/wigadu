import { LoginAuthForm } from './LoginAuthForm'
import { LoginFeedbackPanel } from './LoginFeedbackPanel'
import { LoginSocialLoginGrid } from './LoginSocialLoginGrid'
import { LoginSsoButton } from './LoginSsoButton'

export function LoginWindowContent({
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
    <>
      <LoginSocialLoginGrid
        providers={copy.auth.providers}
        busyAction={busyAction}
        isBusy={isBusy}
        connectingLabel={copy.auth.connecting}
        onProviderLogin={onProviderLogin}
      />

      <LoginSsoButton
        busyAction={busyAction}
        isBusy={isBusy}
        connectingLabel={copy.auth.connecting}
        ssoLabel={copy.auth.sso}
      />

      <LoginAuthForm
        mode={mode}
        email={email}
        password={password}
        displayName={displayName}
        isBusy={isBusy}
        busyAction={busyAction}
        copy={copy}
        onEmailChange={(event) => setEmail(event.target.value)}
        onPasswordChange={(event) => setPassword(event.target.value)}
        onDisplayNameChange={(event) => setDisplayName(event.target.value)}
        onSubmit={onEmailSubmit}
        onResetPassword={onResetPassword}
        onToggleMode={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
      />

      <LoginFeedbackPanel
        firebaseReady={ready}
        copy={copy}
        providers={copy.auth.providers}
        status={status}
        error={error}
      />
    </>
  )
}
