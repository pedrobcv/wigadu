export function GameUploadSelectField({ label, value, onChange, children }) {
  return (
    <label>
      {label}
      <select value={value} onChange={onChange}>
        {children}
      </select>
    </label>
  )
}
