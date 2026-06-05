import { LoginAuthFormContent } from './LoginAuthFormContent'

export function LoginAuthForm({
  mode,
  email,
  password,
  displayName,
  isBusy,
  busyAction,
  copy,
  onEmailChange,
  onPasswordChange,
  onDisplayNameChange,
  onSubmit,
  onResetPassword,
  onToggleMode,
}) {
  return (
    <>
      <div className="auth-divider">
        <span>{copy.auth.or}</span>
      </div>

      <form className="auth-form" onSubmit={onSubmit}>
        <LoginAuthFormContent
          mode={mode}
          email={email}
          password={password}
          displayName={displayName}
          isBusy={isBusy}
          busyAction={busyAction}
          copy={copy}
          onEmailChange={onEmailChange}
          onPasswordChange={onPasswordChange}
          onDisplayNameChange={onDisplayNameChange}
          onResetPassword={onResetPassword}
          onToggleMode={onToggleMode}
        />
      </form>
    </>
  )
}
