export function ShellFooterBrand({ footer }) {
  return (
    <div className="footer-brand">
      <span className="brand-mark">W</span>
      <div>
        <strong>{footer.title}</strong>
        <p>{footer.text}</p>
        <span className="footer-tech">{footer.tech}</span>
      </div>
    </div>
  )
}
