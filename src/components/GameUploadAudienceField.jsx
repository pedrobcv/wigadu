import { GameUploadTextField } from './GameUploadTextField'

export function GameUploadAudienceField({ form, setForm }) {
  return (
    <GameUploadTextField
      label="Público"
      value={form.audience}
      onChange={(event) => setForm((current) => ({ ...current, audience: event.target.value }))}
    />
  )
}
