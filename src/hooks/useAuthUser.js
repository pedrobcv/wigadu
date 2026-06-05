import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'

export function useAuthUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!auth) return undefined

    return onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser)
    })
  }, [])

  return user
}
