import { GameUploadDescriptionField } from './GameUploadDescriptionField'
import { GameUploadLibraryField } from './GameUploadLibraryField'
import { GameUploadTagsField } from './GameUploadTagsField'

export function GameUploadDetailsFields({ form, setForm }) {
  return (
    <>
      <GameUploadDescriptionField form={form} setForm={setForm} />

      <GameUploadLibraryField form={form} setForm={setForm} />

      <GameUploadTagsField form={form} setForm={setForm} />
    </>
  )
}
