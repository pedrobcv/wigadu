import { GameUploadStatusOptions } from './GameUploadStatusOptions'
import { GameUploadSelectField } from './GameUploadSelectField'

export function GameUploadStatusField({ form, setForm }) {
  return (
    <GameUploadSelectField
      label="Estado"
      value={form.status}
      onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
    >
      <GameUploadStatusOptions />
    </GameUploadSelectField>
  )
}
