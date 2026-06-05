import { GameUploadFormHeaderNote } from './GameUploadFormHeaderNote'
import { GameUploadFormHeaderTitle } from './GameUploadFormHeaderTitle'

export function GameUploadFormHeader() {
  return (
    <div className="studio-form-header">
      <GameUploadFormHeaderTitle />
      <GameUploadFormHeaderNote />
    </div>
  )
}
