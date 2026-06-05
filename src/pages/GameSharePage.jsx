import { useI18n } from '../i18n/I18nProvider'
import { GameShareHeader } from '../components/GameShareHeader'
import { GameShareNotes } from '../components/GameShareNotes'
import { GameSharePreview } from '../components/GameSharePreview'
import { useGameSharePage } from '../hooks/useGameSharePage'

export function GameSharePage() {
  const { copy } = useI18n()
  const { html, error, loading, shareUrl, src, copyShare } = useGameSharePage()

  return (
    <section className="section panel share-page">
      <GameShareHeader copy={copy} src={src} onCopyShare={copyShare} />

      <GameSharePreview loading={loading} error={error} html={html} title={copy.brand.name} copy={copy} />

      <GameShareNotes shareUrl={shareUrl || window.location.href} />
    </section>
  )
}
