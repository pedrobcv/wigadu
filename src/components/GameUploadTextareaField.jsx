export function GameUploadTextareaField({ label, value, onChange, placeholder, rows = 4 }) {
  return (
    <label>
      {label}
      <textarea rows={rows} value={value} onChange={onChange} placeholder={placeholder} />
    </label>
  )
}
