import { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth, firebaseReady } from '../lib/firebase'
import { adminAllowlist, getAuthErrorMessage, providerFactories, syncUserProfile } from '../lib/authHelpers'

export function useLoginFlow({ copy, user }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState('signin')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [busyAction, setBusyAction] = useState('')

  const ready = firebaseReady && auth
  const isBusy = Boolean(busyAction)

  useEffect(() => {
    if (user?.displayName && !displayName) {
      setDisplayName(user.displayName)
    }
  }, [displayName, user])

  useEffect(() => {
    if (!user?.email) return

    const emailValue = user.email.toLowerCase()
    navigate(adminAllowlist.has(emailValue) ? '/admin' : '/dashboard', { replace: true })
  }, [navigate, user])

  function goToSignedInArea(authedUser) {
    const emailValue = authedUser?.email?.toLowerCase()
    navigate(emailValue && adminAllowlist.has(emailValue) ? '/admin' : '/dashboard', { replace: true })
  }

  async function handleEmailSubmit(event) {
    event.preventDefault()
    if (!ready) {
      setError(copy.auth.authMissing)
      return
    }

    const action = mode === 'signup' ? 'signup' : 'signin'
    setBusyAction(action)
    setError('')
    setStatus('')

    try {
      if (mode === 'signup') {
        const credential = await createUserWithEmailAndPassword(auth, email, password)
        if (displayName.trim()) {
          await updateProfile(credential.user, { displayName: displayName.trim() })
        }
        await syncUserProfile(credential.user, 'password', true)
        goToSignedInArea(credential.user)
      } else {
        const credential = await signInWithEmailAndPassword(auth, email, password)
        await syncUserProfile(credential.user, 'password', false)
        goToSignedInArea(credential.user)
      }
    } catch (authError) {
      setError(getAuthErrorMessage(authError, copy))
    } finally {
      setBusyAction('')
    }
  }

  async function handleProviderLogin(providerId) {
    if (!ready) {
      setError(copy.auth.authMissing)
      return
    }

    const factory = providerFactories[providerId]
    if (!factory) {
      setError(copy.auth.providers.find((item) => item.id === providerId)?.hint || copy.auth.authMissing)
      return
    }

    setBusyAction(providerId)
    setError('')
    setStatus('')

    try {
      const credential = await signInWithPopup(auth, factory())
      await syncUserProfile(credential.user, providerId, false)
      goToSignedInArea(credential.user)
    } catch (authError) {
      setError(getAuthErrorMessage(authError, copy, providerId))
    } finally {
      setBusyAction('')
    }
  }

  async function handleResetPassword() {
    if (!ready) {
      setError(copy.auth.authMissing)
      return
    }

    if (!email) {
      setError(copy.auth.needEmail)
      return
    }

    setBusyAction('reset')
    setError('')
    setStatus('')

    try {
      await sendPasswordResetEmail(auth, email)
      setStatus(copy.auth.resetSuccess)
    } catch (authError) {
      setError(getAuthErrorMessage(authError, copy))
    } finally {
      setBusyAction('')
    }
  }

  return {
    mode,
    setMode,
    displayName,
    setDisplayName,
    email,
    setEmail,
    password,
    setPassword,
    status,
    error,
    busyAction,
    ready,
    isBusy,
    handleEmailSubmit,
    handleProviderLogin,
    handleResetPassword,
  }
}
