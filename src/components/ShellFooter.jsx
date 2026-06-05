import { useI18n } from '../i18n/I18nProvider'
import { ShellFooterActions } from './ShellFooterActions'
import { ShellFooterBrand } from './ShellFooterBrand'
import { ShellFooterLinks } from './ShellFooterLinks'

export function ShellFooter() {
  const { copy } = useI18n()
  const nav = copy.nav ?? {}
  const footer = copy.footer ?? {
    title: copy.brand?.name ?? 'Wigadu',
    text: copy.brand?.tagline ?? 'Aprendizaje interactivo para educación y capacitación.',
    tech: 'React + Vite',
  }

  return (
    <footer className="footer site-footer">
      <ShellFooterBrand footer={footer} />
      <ShellFooterLinks nav={nav} />
      <ShellFooterActions nav={nav} />
    </footer>
  )
}
