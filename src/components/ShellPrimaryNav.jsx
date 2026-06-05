import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'

export function ShellPrimaryNav() {
  const { copy } = useI18n()
  const { nav } = copy

  return (
    <div className="nav-primary">
      <Link to="/#juegos" className="nav-link nav-main-link">
        {nav.games}
      </Link>
      <Link to="/#precios" className="nav-link nav-main-link">
        {nav.prices}
      </Link>
      <Link to="/#historias" className="nav-link nav-main-link">
        {nav.stories}
      </Link>
      <Link to="/#acerca" className="nav-link nav-main-link">
        {nav.about}
      </Link>
    </div>
  )
}
