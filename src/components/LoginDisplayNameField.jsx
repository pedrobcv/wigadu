export function LoginDisplayNameField({ copy, displayName, isBusy, onChange }) {
  return (
    <label>
      {copy.auth.displayName}
      <input
        type="text"
        placeholder={copy.auth.displayNamePlaceholder}
        value={displayName}
        onChange={onChange}
        disabled={isBusy}
      />
    </label>
  )
}
