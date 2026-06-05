import { ShellAuthActions } from './ShellAuthActions'
import { ShellBrand } from './ShellBrand'
import { ShellPrimaryNav } from './ShellPrimaryNav'

export function ShellTopbar({ user, isAdminUser, onSignOut }) {
  return (
    <header className="topbar kahoot-topbar">
      <ShellBrand />

      <nav className="nav kahoot-nav">
        <ShellPrimaryNav />
        <ShellAuthActions user={user} isAdminUser={isAdminUser} onSignOut={onSignOut} />
      </nav>
    </header>
  )
}
