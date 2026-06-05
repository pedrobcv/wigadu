export function LoginSsoButton({ busyAction, isBusy, connectingLabel, ssoLabel, onClick }) {
  return (
    <button className={`sso-btn ${busyAction === 'sso' ? 'is-busy' : ''}`} type="button" disabled={isBusy} onClick={onClick}>
      {busyAction === 'sso' ? connectingLabel : ssoLabel}
    </button>
  )
}
