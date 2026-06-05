export function LoginPasswordField({ copy, password, isBusy, onChange }) {
  return (
    <label>
      {copy.auth.password}
      <div className="password-field">
        <input
          type="password"
          placeholder={copy.auth.passwordPlaceholder}
          value={password}
          onChange={onChange}
          disabled={isBusy}
        />
        <span className="eye-icon">👁</span>
      </div>
    </label>
  )
}
