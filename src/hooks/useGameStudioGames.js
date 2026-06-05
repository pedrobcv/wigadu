import { useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { GAMES_COLLECTION, nowLabel } from '../lib/gameStudio'

export function useGameStudioGames({ user, setError }) {
  const [games, setGames] = useState([])

  useEffect(() => {
    if (!db) return undefined

    const gamesQuery = query(collection(db, GAMES_COLLECTION), orderBy('updatedAt', 'desc'))
    return onSnapshot(
      gamesQuery,
      (snapshot) => {
        setGames(
          snapshot.docs.map((item) => ({
            id: item.id,
            ...item.data(),
          })),
        )
      },
      (snapshotError) => {
        setError(snapshotError?.message || 'No se pudo cargar la biblioteca de juegos.')
      },
    )
  }, [setError])

  const stats = useMemo(() => {
    const published = games.filter((game) => game.status !== 'draft').length
    const drafts = games.length - published
    return [
      { label: 'Juegos cargados', value: games.length },
      { label: 'Publicados', value: published },
      { label: 'Borradores', value: drafts },
      { label: 'Última sesión', value: nowLabel(user?.metadata?.lastSignInTime) },
    ]
  }, [games, user?.metadata?.lastSignInTime])

  return { games, stats }
}
