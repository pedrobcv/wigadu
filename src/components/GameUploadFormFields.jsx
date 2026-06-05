import { GameUploadMetadataFields } from './GameUploadMetadataFields'
import { GameUploadDetailsFields } from './GameUploadDetailsFields'
import { GameUploadStatusField } from './GameUploadStatusField'
import { GameUploadFileField } from './GameUploadFileField'

export function GameUploadFormFields({ form, setForm, setHtmlFile }) {
  return (
    <>
      <GameUploadMetadataFields form={form} setForm={setForm} />
      <GameUploadDetailsFields form={form} setForm={setForm} />
      <GameUploadStatusField form={form} setForm={setForm} />
      <GameUploadFileField setHtmlFile={setHtmlFile} />
    </>
  )
}
