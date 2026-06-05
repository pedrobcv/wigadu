import { GameUploadTextareaField } from './GameUploadTextareaField'

export function GameUploadDescriptionTextarea({ form, setForm }) {
  return (
    <GameUploadTextareaField
      label="Descripción"
      value={form.description}
      onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
      placeholder="Describe el objetivo, dinámica y tema general del juego"
    />
  )
}
