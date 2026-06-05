import { useEffect, useState } from 'react'

export function useGameSharePage() {
  const [html, setHtml] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [shareUrl, setShareUrl] = useState('')
  const params = new URLSearchParams(window.location.search)
  const src = params.get('src') || ''

  useEffect(() => {
    if (!src) {
      setError('Este enlace no tiene la URL del juego.')
      setLoading(false)
      return undefined
    }

    setShareUrl(window.location.href)
    setLoading(true)
    fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`No se pudo leer el HTML (${response.status}).`)
        }
        return response.text()
      })
      .then((content) => setHtml(content))
      .catch((fetchError) => setError(fetchError?.message || 'No se pudo cargar el juego compartido.'))
      .finally(() => setLoading(false))
  }, [src])

  async function copyShare() {
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      // noop
    }
  }

  return { html, error, loading, shareUrl, src, copyShare }
}
