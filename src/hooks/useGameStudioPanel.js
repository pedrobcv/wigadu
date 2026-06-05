import { useState } from 'react'
import { db, firebaseReady, storage } from '../lib/firebase'
import { createEmptyGameForm } from '../lib/gameStudio'
import { useGameStudioActions } from './useGameStudioActions'
import { useGameStudioGames } from './useGameStudioGames'
import { useGameStudioPreview } from './useGameStudioPreview'
import { useGameStudioUpload } from './useGameStudioUpload'

export function useGameStudioPanel(user) {
  const [form, setForm] = useState(createEmptyGameForm)
  const [htmlFile, setHtmlFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [activeActionId, setActiveActionId] = useState('')

  const ready = firebaseReady && db && storage
  const { games, stats } = useGameStudioGames({ user, setError })
  const preview = useGameStudioPreview()

  const studioActions = useGameStudioActions({
    db,
    storage,
    ready,
    user,
    setMessage,
    setError,
    setActiveActionId,
    setPreviewGame: preview.setPreviewGame,
    setPreviewHtml: preview.setPreviewHtml,
    setPreviewBusy: preview.setPreviewBusy,
    setPreviewShareUrl: preview.setPreviewShareUrl,
  })

  const uploadGame = useGameStudioUpload({
    db,
    storage,
    ready,
    user,
    form,
    htmlFile,
    setForm,
    setHtmlFile,
    setBusy,
    setMessage,
    setError,
  })

  return {
    form,
    setForm,
    htmlFile,
    setHtmlFile,
    busy,
    message,
    error,
    activeActionId,
    ready,
    games,
    stats,
    uploadGame,
    preview,
    studioActions,
  }
}
