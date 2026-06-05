import { GameStudioLibraryCountBadge } from './GameStudioLibraryCountBadge'

export function GameStudioLibraryHeader({ count }) {
  return (
    <div className="studio-list-header">
      <h3>Biblioteca</h3>
      <GameStudioLibraryCountBadge count={count} />
    </div>
  )
}
