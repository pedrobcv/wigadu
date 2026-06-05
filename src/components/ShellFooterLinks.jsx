import { Link } from 'react-router-dom'

export function ShellFooterLinks({ nav }) {
  return (
    <div className="footer-links" aria-label="Enlaces del pie de página">
      <Link to="/#juegos">{nav.games ?? 'Juegos'}</Link>
      <Link to="/#precios">{nav.prices ?? 'Precios'}</Link>
      <Link to="/#historias">{nav.stories ?? 'Historias'}</Link>
      <Link to="/#acerca">{nav.about ?? 'Acerca'}</Link>
    </div>
  )
}
