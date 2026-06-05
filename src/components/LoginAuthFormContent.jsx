import { LoginDisplayNameField } from './LoginDisplayNameField'
import { LoginEmailField } from './LoginEmailField'
import { LoginPasswordField } from './LoginPasswordField'
import { LoginAuthActions } from './LoginAuthActions'

export function LoginAuthFormContent({
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
  onResetPassword,
  onToggleMode,
}) {
  return (
    <>
      {mode === 'signup' ? (
        <LoginDisplayNameField copy={copy} displayName={displayName} isBusy={isBusy} onChange={onDisplayNameChange} />
      ) : null}

      <LoginEmailField copy={copy} email={email} isBusy={isBusy} onChange={onEmailChange} />

      <LoginPasswordField copy={copy} password={password} isBusy={isBusy} onChange={onPasswordChange} />

      <LoginAuthActions
        mode={mode}
        email={email}
        password={password}
        isBusy={isBusy}
        busyAction={busyAction}
        copy={copy}
        onResetPassword={onResetPassword}
        onToggleMode={onToggleMode}
      />
    </>
  )
}
