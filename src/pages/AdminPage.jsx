import { GameStudioPanel } from '../components/GameStudio'
import { AdminHeader } from '../components/AdminHeader'
import { AdminInfoCards } from '../components/AdminInfoCards'
import { AdminLockedCard } from '../components/AdminLockedCard'
import { AccessNotice } from '../components/AccessNotice'
import { useI18n } from '../i18n/I18nProvider'

export function AdminPage({ user, isAdminUser }) {
  const { copy } = useI18n()

  if (!user) {
    return (
      <AccessNotice
        eyebrow={copy.admin.eyebrow}
        title={copy.admin.gateTitle}
        text={copy.admin.gateText}
        ctaLabel={copy.admin.gateCta}
      />
    )
  }

  if (!isAdminUser) {
    return <AdminLockedCard copy={copy} />
  }

  return (
    <section className="section panel admin-page">
      <AdminHeader copy={copy} />
      <AdminInfoCards copy={copy} user={user} />
      <GameStudioPanel user={user} />
    </section>
  )
}
