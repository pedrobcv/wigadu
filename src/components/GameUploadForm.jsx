import { GameUploadFormFields } from './GameUploadFormFields'
import { GameUploadFormStatus } from './GameUploadFormStatus'
import { GameUploadFormHeader } from './GameUploadFormHeader'

export function GameUploadForm({
  form,
  setForm,
  setHtmlFile,
  busy,
  message,
  error,
  ready,
  onSubmit,
}) {
  return (
    <form className="studio-form panel" onSubmit={onSubmit}>
      <GameUploadFormHeader />

      <GameUploadFormFields form={form} setForm={setForm} setHtmlFile={setHtmlFile} />

      <GameUploadFormStatus busy={busy} message={message} error={error} ready={ready} />
    </form>
  )
}
