import { GameUploadTextField } from './GameUploadTextField'

export function GameUploadTagsField({ form, setForm }) {
  return (
    <GameUploadTextField
      label="Etiquetas separadas por coma"
      value={form.tags}
      onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
      placeholder="matemáticas, primaria, trivia, arcade"
    />
  )
}
