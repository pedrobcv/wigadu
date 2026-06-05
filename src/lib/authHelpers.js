import { GoogleAuthProvider, OAuthProvider } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './firebase'

export const providerFactories = {
  google: () => new GoogleAuthProvider(),
  microsoft: () => new OAuthProvider('microsoft.com'),
  apple: () => new OAuthProvider('apple.com'),
}

export const adminAllowlist = new Set(
  (import.meta.env.VITE_ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
)

export function getAuthErrorMessage(authError, copy, providerId) {
  const providerHint = copy.auth.providers.find((item) => item.id === providerId)?.hint || copy.auth.authMissing

  switch (authError?.code) {
    case 'auth/unauthorized-domain':
      return copy.auth.unauthorizedDomain
    case 'auth/popup-blocked':
      return copy.auth.popupBlocked
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return copy.auth.popupClosed
    case 'auth/operation-not-allowed':
      return providerHint
    default:
      return authError?.message || copy.auth.authMissing
  }
}

export function syncUserProfile(user, providerId, created = false) {
  if (!db || !user) return Promise.resolve()

  return setDoc(
    doc(db, 'users', user.uid),
    {
      uid: user.uid,
      email: user.email ?? '',
      displayName: user.displayName ?? '',
      photoURL: user.photoURL ?? '',
      providerId,
      role: 'teacher',
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...(created ? { createdAt: serverTimestamp() } : {}),
    },
    { merge: true },
  )
}
