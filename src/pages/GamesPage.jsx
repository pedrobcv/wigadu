import { useI18n } from '../i18n/I18nProvider'
import { GamesPageGrid } from '../components/GamesPageGrid'
import { GamesPageHeader } from '../components/GamesPageHeader'

export function GamesPage() {
  const { copy } = useI18n()

  return (
    <section className="section panel">
      <GamesPageHeader copy={copy} />
      <GamesPageGrid games={copy.games} />
    </section>
  )
}
