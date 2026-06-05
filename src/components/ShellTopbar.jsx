import { LanguageSelector } from './LanguageSelector'
import { ShellAuthActions } from './ShellAuthActions'
import { ShellBrand } from './ShellBrand'
import { ShellPrimaryNav } from './ShellPrimaryNav'

export function ShellTopbar({ user, isAdminUser, onSignOut }) {
  return (
    <header className="topbar kahoot-topbar">
      <ShellBrand />

      <nav className="nav kahoot-nav">
        <ShellPrimaryNav />
        <div className="nav-utility">
          <ShellAuthActions user={user} isAdminUser={isAdminUser} onSignOut={onSignOut} />
          <LanguageSelector variant="topbar" />
        </div>
      </nav>
    </header>
  )
}
