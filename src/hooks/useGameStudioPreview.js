import { useEffect, useState } from 'react'

export function useGameStudioPreview() {
  const [previewGame, setPreviewGame] = useState(null)
  const [previewHtml, setPreviewHtml] = useState('')
  const [previewBusy, setPreviewBusy] = useState(false)
  const [previewShareUrl, setPreviewShareUrl] = useState('')

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setPreviewGame(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return {
    previewGame,
    previewHtml,
    previewBusy,
    previewShareUrl,
    setPreviewGame,
    setPreviewHtml,
    setPreviewBusy,
    setPreviewShareUrl,
    closePreview: () => setPreviewGame(null),
  }
}
