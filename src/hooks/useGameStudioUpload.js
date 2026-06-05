import { useCallback } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth } from '../lib/firebase'
import { GAMES_COLLECTION, createEmptyGameForm, gameFileName, guessTitleFromFilename, readHtmlFile, slugifyGameName } from '../lib/gameStudio'

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

function joinTags(tagsText) {
  return (tagsText || '')
    .split(/[,\n]/)
    .map((tag) => tag.trim())
    .filter(Boolean)
}

export function useGameStudioUpload({
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
}) {
  return useCallback(
    async (event) => {
      event.preventDefault()
      setMessage('')
      setError('')

      if (!ready) {
        setError('Firebase aún no está listo. Revisa las variables de entorno.')
        return
      }

      if (!htmlFile) {
        setError('Selecciona un archivo HTML.')
        return
      }

      if (!htmlFile.name.toLowerCase().endsWith('.html')) {
        setError('El archivo debe ser un .html único y autocontenido.')
        return
      }

      setBusy(true)
      try {
        const title = form.title.trim() || guessTitleFromFilename(htmlFile.name) || 'Juego sin título'
        const slug = slugifyGameName(form.slug || title || htmlFile.name)
        const html = await readHtmlFile(htmlFile)
        const { storagePath, htmlUrl } = await uploadGameHtml({ storage, file: htmlFile, slug })
        const tags = joinTags(form.tags)

        await addDoc(collection(db, GAMES_COLLECTION), {
          title,
          slug,
          description: form.description.trim(),
          audience: form.audience,
          engine: form.engine,
          library: form.library,
          tags,
          status: form.status,
          storagePath,
          htmlUrl,
          sourceFileName: htmlFile.name,
          fileSize: htmlFile.size,
          createdBy: user?.uid || auth?.currentUser?.uid || '',
          createdByEmail: user?.email || auth?.currentUser?.email || '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          htmlLength: html.length,
        })

        setForm(createEmptyGameForm())
        setHtmlFile(null)
        event.target.reset()
        setMessage(`Se subió “${title}” correctamente.`)
      } catch (uploadError) {
        setError(uploadError?.message || 'No se pudo subir el juego.')
      } finally {
        setBusy(false)
      }
    },
    [db, form, htmlFile, ready, setBusy, setError, setForm, setHtmlFile, setMessage, storage, user?.email, user?.uid],
  )
}
