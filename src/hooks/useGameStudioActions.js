import { useCallback } from 'react'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth } from '../lib/firebase'
import { GAMES_COLLECTION, buildGameShareUrl, gameFileName, slugifyGameName } from '../lib/gameStudio'
import { cloneGameQuestions } from '../lib/gameQuestions'

async function fetchHtmlText(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`No se pudo leer el HTML (${response.status}).`)
  }
  return response.text()
}

async function uploadGameHtml({ storage, file, slug }) {
  if (!storage) {
    throw new Error('Firebase Storage no está configurado.')
  }

  const storagePath = `games/${gameFileName({ slug, originalName: file.name })}`
  const fileRef = ref(storage, storagePath)
  await uploadBytes(fileRef, file, { contentType: 'text/html' })
  const htmlUrl = await getDownloadURL(fileRef)
  return { storagePath, htmlUrl }
}

export function useGameStudioActions({
  db,
  storage,
  ready,
  user,
  setMessage,
  setError,
  setActiveActionId,
  setPreviewGame,
  setPreviewHtml,
  setPreviewBusy,
  setPreviewShareUrl,
}) {
  const copyText = useCallback(async (value) => {
    if (!value) return false
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      return false
    }
  }, [])

  const openPreview = useCallback(
    async (game) => {
      setPreviewGame(game)
      setPreviewHtml('')
      setPreviewBusy(true)
      try {
        const html = await fetchHtmlText(game.htmlUrl)
        setPreviewHtml(html)
        setPreviewShareUrl(buildGameShareUrl(game))
      } catch (fetchError) {
        setPreviewHtml(`<html><body style="font-family:sans-serif;padding:24px;">No se pudo cargar la previsualización: ${fetchError.message}</body></html>`)
        setPreviewShareUrl(buildGameShareUrl(game))
      } finally {
        setPreviewBusy(false)
      }
    },
    [setPreviewBusy, setPreviewGame, setPreviewHtml, setPreviewShareUrl],
  )

  const duplicateGame = useCallback(
    async (game) => {
      if (!ready) {
        setError('Activa Firebase para duplicar juegos.')
        return
      }

      setActiveActionId(`duplicate-${game.id}`)
      setMessage('')
      setError('')

      try {
        const html = await fetchHtmlText(game.htmlUrl)
        const duplicatedTitle = `Copia de ${game.title}`
        const duplicatedSlugBase = slugifyGameName(`${duplicatedTitle} ${Date.now()}`)
        const file = new File([html], `${duplicatedSlugBase}.html`, { type: 'text/html' })
        const { storagePath, htmlUrl } = await uploadGameHtml({ storage, file, slug: duplicatedSlugBase })

        const duplicatedGameRef = await addDoc(collection(db, GAMES_COLLECTION), {
          title: duplicatedTitle,
          slug: duplicatedSlugBase,
          description: game.description || '',
          audience: game.audience || 'Docentes y estudiantes',
          engine: game.engine || 'HTML + JS',
          library: game.library || '',
          tags: game.tags || [],
          status: game.status || 'published',
          storagePath,
          htmlUrl,
          sourceFileName: file.name,
          sourceStoragePath: game.storagePath || '',
          duplicatedFrom: game.id,
          fileSize: html.length,
          createdBy: user?.uid || auth?.currentUser?.uid || '',
          createdByEmail: user?.email || auth?.currentUser?.email || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })

        const clonedQuestions = await cloneGameQuestions(db, game.id, duplicatedGameRef.id)
        setMessage(`Se duplicó “${game.title}”${clonedQuestions ? ` y ${clonedQuestions} preguntas` : ''}.`)
      } catch (duplicateError) {
        setError(duplicateError?.message || 'No se pudo duplicar el juego.')
      } finally {
        setActiveActionId('')
      }
    },
    [db, ready, setActiveActionId, setError, setMessage, storage, user?.email, user?.uid],
  )

  const shareGame = useCallback(
    async (game) => {
      const shareUrl = buildGameShareUrl(game)
      if (!shareUrl) {
        setError('No hay enlace compartible para este juego.')
        return
      }

      const copied = await copyText(shareUrl)
      setMessage(copied ? `Enlace copiado para “${game.title}”.` : `Abre y copia este enlace: ${shareUrl}`)
      if (navigator.share) {
        try {
          await navigator.share({ title: game.title, text: game.description || game.title, url: shareUrl })
        } catch {
          // ignore share cancellation
        }
      }
    },
    [copyText, setError, setMessage],
  )

  const openDirectHtml = useCallback(async (game) => {
    if (!game?.htmlUrl) return
    window.open(game.htmlUrl, '_blank', 'noopener,noreferrer')
  }, [])

  const toggleStatus = useCallback(
    async (game) => {
      if (!db) return
      setActiveActionId(`status-${game.id}`)
      try {
        await updateDoc(doc(db, GAMES_COLLECTION, game.id), {
          status: game.status === 'draft' ? 'published' : 'draft',
          updatedAt: serverTimestamp(),
        })
        setMessage(`Estado actualizado para “${game.title}”.`)
      } catch (statusError) {
        setError(statusError?.message || 'No se pudo actualizar el estado.')
      } finally {
        setActiveActionId('')
      }
    },
    [db, setActiveActionId, setError, setMessage],
  )

  return {
    copyText,
    openPreview,
    duplicateGame,
    shareGame,
    openDirectHtml,
    toggleStatus,
  }
}
