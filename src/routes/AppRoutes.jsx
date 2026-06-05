import { useLocation } from 'react-router-dom'
import { Shell } from '../components/Shell'
import { ScrollToHashEffect } from '../components/ScrollToHashEffect'
import { AppRoutesContent } from '../components/AppRoutesContent'
import { useAuthUser } from '../hooks/useAuthUser'
import { adminAllowlist } from '../lib/authHelpers'

export function AppRoutes() {
  const user = useAuthUser()
  const location = useLocation()
  const isAuthRoute = location.pathname.startsWith('/login')
  const isShareRoute = location.pathname.startsWith('/share/')
  const isAdminUser = Boolean(user?.email && adminAllowlist.has(user.email.toLowerCase()))

  return (
    <>
      <ScrollToHashEffect pathname={location.pathname} hash={location.hash} />
      {isAuthRoute || isShareRoute ? (
        <AppRoutesContent user={user} isAdminUser={isAdminUser} isAuthRoute={isAuthRoute} />
      ) : (
        <Shell user={user} isAdminUser={isAdminUser}>
          <AppRoutesContent user={user} isAdminUser={isAdminUser} isAuthRoute={isAuthRoute} />
        </Shell>
      )}
    </>
  )
}
