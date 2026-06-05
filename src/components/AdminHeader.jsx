export function AdminHeader({ copy }) {
  return (
    <div>
      <span className="eyebrow">{copy.admin.eyebrow}</span>
      <h1>{copy.admin.title}</h1>
      <p>{copy.admin.text}</p>
    </div>
  )
}
