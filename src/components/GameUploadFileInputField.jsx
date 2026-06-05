export function GameUploadFileInputField({ label, accept, onChange }) {
  return (
    <label>
      {label}
      <input type="file" accept={accept} onChange={onChange} />
    </label>
  )
}
