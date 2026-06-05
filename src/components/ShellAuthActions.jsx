import { useI18n } from '../i18n/I18nProvider'
import { ShellAuthLoggedInActions } from './ShellAuthLoggedInActions'
import { ShellAuthLoggedOutActions } from './ShellAuthLoggedOutActions'

export function ShellAuthActions({ user, isAdminUser, onSignOut }) {
  const { copy } = useI18n()
  const { nav } = copy

  return (
    <div className="nav-actions">
      {user ? (
        <ShellAuthLoggedInActions isAdminUser={isAdminUser} onSignOut={onSignOut} nav={nav} />
      ) : (
        <ShellAuthLoggedOutActions nav={nav} />
      )}
    </div>
  )
}
