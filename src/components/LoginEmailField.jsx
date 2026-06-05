export function LoginEmailField({ copy, email, isBusy, onChange }) {
  return (
    <label>
      {copy.auth.email}
      <input
        type="email"
        placeholder={copy.auth.emailPlaceholder}
        value={email}
        onChange={onChange}
        disabled={isBusy}
      />
    </label>
  )
}
