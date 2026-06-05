import { LoginHeader } from '../components/LoginHeader'
import { LoginWindow } from '../components/LoginWindow'
import { useI18n } from '../i18n/I18nProvider'
import { useLoginFlow } from '../hooks/useLoginFlow'

export function LoginPage({ user }) {
  const { copy } = useI18n()
  const {
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
    handleEmailSubmit,
    handleProviderLogin,
    handleResetPassword,
  } = useLoginFlow({ copy, user })

  return (
    <div className="auth-page">
      <LoginHeader brandName={copy.brand.name} />
      <LoginWindow
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
        onEmailSubmit={handleEmailSubmit}
        onProviderLogin={handleProviderLogin}
        onResetPassword={handleResetPassword}
      />
    </div>
  )
}
