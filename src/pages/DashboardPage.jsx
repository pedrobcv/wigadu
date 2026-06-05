import { useI18n } from '../i18n/I18nProvider'
import { AccessNotice } from '../components/AccessNotice'
import { DashboardHeader } from '../components/DashboardHeader'
import { DashboardSessionCard } from '../components/DashboardSessionCard'
import { DashboardStatsGrid } from '../components/DashboardStatsGrid'

export function DashboardPage({ user, onSignOut }) {
  const { copy } = useI18n()

  if (!user) {
    return (
      <AccessNotice
        eyebrow={copy.dashboard.eyebrow}
        title={copy.dashboard.gateTitle}
        text={copy.dashboard.gateText}
        ctaLabel={copy.dashboard.gateCta}
      />
    )
  }

  return (
    <section className="section panel dashboard">
      <div className="dashboard-header">
        <DashboardHeader copy={copy} />
        <DashboardSessionCard copy={copy} user={user} onSignOut={onSignOut} />
      </div>
      <DashboardStatsGrid stats={copy.dashboard.stats} />
    </section>
  )
}
