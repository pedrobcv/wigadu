import { GameUploadForm } from './GameUploadForm'
import { GameStudioLibrary } from './GameStudioLibrary'

export function GameStudioMainLayout({ formProps, libraryProps }) {
  return (
    <div className="studio-layout">
      <GameUploadForm {...formProps} />
      <GameStudioLibrary {...libraryProps} />
    </div>
  )
}
