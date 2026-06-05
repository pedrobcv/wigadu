import { useParams } from 'react-router-dom'
import { useI18n } from '../i18n/I18nProvider'
import { GameDetailEmptyState } from '../components/GameDetailEmptyState'
import { GameDetailHero } from '../components/GameDetailHero'
import { GameDetailPlayer } from '../components/GameDetailPlayer'

export function GameDetailPage() {
  const { slug } = useParams()
  const { copy } = useI18n()
  const game = copy.games.find((item) => item.slug === slug)

  if (!game) {
    return <GameDetailEmptyState copy={copy} />
  }

  return (
    <section className="section panel game-detail">
      <GameDetailHero game={game} copy={copy} />
      <GameDetailPlayer copy={copy} />
    </section>
  )
}
