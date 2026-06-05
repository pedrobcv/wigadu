import { ShellFooter } from './ShellFooter'
import { ShellTopbar } from './ShellTopbar'

export function Shell({ children, user, isAdminUser, onSignOut }) {
  return (
    <div className="app-shell app-shell-light">
      <ShellTopbar user={user} isAdminUser={isAdminUser} onSignOut={onSignOut} />

      <main>{children}</main>
      <ShellFooter />
    </div>
  )
}
