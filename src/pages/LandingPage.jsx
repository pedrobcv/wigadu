import { useI18n } from '../i18n/I18nProvider'
import { LandingAboutSection } from '../components/LandingAboutSection'
import { LandingCtaSection } from '../components/LandingCtaSection'
import { LandingGamesSection } from '../components/LandingGamesSection'
import { LandingHeroSection } from '../components/LandingHeroSection'
import { LandingPricingSection } from '../components/LandingPricingSection'
import { LandingStoriesSection } from '../components/LandingStoriesSection'

export function LandingPage() {
  const { copy } = useI18n()
  const { landing } = copy

  return (
    <>
      <LandingHeroSection landing={landing} />
      <LandingPricingSection copy={copy} landing={landing} />
      <LandingGamesSection copy={copy} />
      <LandingStoriesSection landing={landing} copy={copy} />
      <LandingAboutSection landing={landing} copy={copy} />
      <LandingCtaSection landing={landing} copy={copy} />
    </>
  )
}
