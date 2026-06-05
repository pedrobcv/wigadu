import { Navigate, Route, Routes } from 'react-router-dom'
import { GameDetailPage } from '../pages/GameDetailPage'
import { GameSharePage } from '../pages/GameSharePage'
import { LandingPage } from '../pages/LandingPage'
import { GamesPage as GamesPageView } from '../pages/GamesPage'
import { DashboardPage as DashboardPageView } from '../pages/DashboardPage'
import { AdminPage as AdminPageView } from '../pages/AdminPage'
import { LoginPage as LoginPageView } from '../pages/LoginPage'
import { auth } from '../lib/firebase'

export function AppRoutesContent({ user, isAdminUser, isAuthRoute }) {
  async function handleSignOut() {
    if (!auth) return
    const { signOut } = await import('firebase/auth')
    await signOut(auth)
  }

  if (isAuthRoute && user) {
    return <Navigate to={isAdminUser ? '/admin' : '/dashboard'} replace />
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/games" element={<GamesPageView />} />
      <Route path="/games/:slug" element={<GameDetailPage />} />
      <Route path="/login" element={<LoginPageView user={user} />} />
      <Route path="/dashboard" element={<DashboardPageView user={user} onSignOut={handleSignOut} />} />
      <Route path="/admin" element={<AdminPageView user={user} isAdminUser={isAdminUser} />} />
      <Route path="/share/:slug" element={<GameSharePage />} />
    </Routes>
  )
}
