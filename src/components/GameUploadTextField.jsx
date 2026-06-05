export function GameUploadTextField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label>
      {label}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </label>
  )
}
