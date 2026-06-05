import { useEffect } from 'react'

export function ScrollToHashEffect({ pathname, hash }) {
  useEffect(() => {
    if (!hash) return undefined

    const timeoutId = window.setTimeout(() => {
      const target = document.querySelector(hash)
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [pathname, hash])

  return null
}
