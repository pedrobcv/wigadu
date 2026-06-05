import { GameUploadDescriptionTextarea } from './GameUploadDescriptionTextarea'

export function GameUploadDescriptionField({ form, setForm }) {
  return (
    <label>
      Descripción
      <GameUploadDescriptionTextarea form={form} setForm={setForm} />
    </label>
  )
}
